import {AngularFirestore, AngularFirestoreCollection, FieldPath, QueryDocumentSnapshot, QueryFn} from '@angular/fire/firestore';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {IModel} from '../models/model.interface';
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {flatMap, map} from 'rxjs/operators';
import OrderByDirection = firebase.firestore.OrderByDirection;

export interface IDto {
  id: string;
  uid: string;
}

class PaginationData<T_DTO> {
  firstDoc: QueryDocumentSnapshot<any>;
  lastDoc: QueryDocumentSnapshot<any>;
  limit: number;
  orderBy: string;
  orderDirection: OrderByDirection;
  where: [ string | FieldPath, WhereFilterOp, any];

  constructor(
    limit: number,
    orderBy: string,
    orderDirection: OrderByDirection,
    where: [(string | FieldPath), firebase.firestore.WhereFilterOp, any]) {
    this.limit = limit;
    this.orderBy = orderBy;
    this.orderDirection = orderDirection;
    this.where = where;
  }
}

export abstract class BaseDtoService<T extends IModel, T_DTO extends IDto> {
  private readonly COLLECTION_PATH;
  private collection: (queryFn?: QueryFn) => AngularFirestoreCollection<T_DTO>;
  private dataSjt: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private pd: PaginationData<T_DTO>;
  readonly uid: string;

  private loadQueryFn = (ref) => {
    const r = ref
      .where('uid', '==', this.uid)
      // .limit(this.pd.limit)
      .orderBy(this.pd.orderBy, this.pd.orderDirection);
    return this.pd.where ? r.where(this.pd.where[0], this.pd.where[1], this.pd.where[2]) : r;
  }

  protected constructor(protected afs: AngularFirestore, collection: string) {
    this.COLLECTION_PATH = collection;
    this.collection = (fn?) => afs.collection<T_DTO>(collection, fn);
    // @ts-ignore
    this.uid = afs.firestore._credentials.currentUser.uid.toString();
    if (!this.uid) { throw Error('Usuário não encontrado'); }
  }

  get data(): Observable<T[]> {
    return this.dataSjt.asObservable();
  }

  protected abstract toModel(dto: T_DTO): Promise<T>;
  protected abstract toDto(obj: T): T_DTO;

  load(limit = 5, orderBy = 'uid', orderDirection: 'asc'|'desc' = 'asc', where: [ string | FieldPath, WhereFilterOp, any] = null) {
    this.pd = new PaginationData<T_DTO>(limit, orderBy, orderDirection, where);
    this.collection(this.loadQueryFn).snapshotChanges()
      .subscribe(res => {
        if (!res.length) { return; }
        this.pd.firstDoc = res[0].payload.doc;
        this.pd.lastDoc = res[res.length - 1].payload.doc;
        console.log(res.length);
        Promise.all(res.map(d => this.toModel({id: d.payload.doc.id, ...d.payload.doc.data()} as T_DTO)))
          .then(objs => this.dataSjt.next(objs));
      });
  }

  loadNext() {
    this.collection(ref => this.loadQueryFn(ref).startAfter(this.pd.firstDoc)).get().subscribe(res => {
      if (!res.docs.length) { return; }
      this.pd.firstDoc = res.docs[0];
      this.pd.firstDoc = res.docs[res.docs.length - 1];
      Promise.all(res.docs.map(d => this.toModel({id: d.id, ...d.data()} as T_DTO)))
        .then(objs => this.dataSjt.next(objs));
    });
  }

  new(obj: T): Observable<T> {
    obj.uid = this.uid;
    const dto = this.toDto(obj);
    delete dto.id;
    return from(this.collection().add(dto)
      .then(ref => {

        return ref;
      })
      .then(ref => ref.get())
      .then(ss => this.toModel({id: ss.id, ...ss.data()} as T_DTO)));
  }

  update(obj: T): Observable<T> {
    obj.uid = this.uid;
    const dto = this.toDto(obj);
    delete dto.id;
    return from(this.collection().doc(obj.id).update(dto).then(() => obj));
  }

  delete(id: string): Observable<boolean> {
    return from(this.collection().doc(id).delete()
      .then(() => true));
  }

  save(obj: T): Observable<T> {
    return obj.id
      ? this.update(obj)
      : this.new(obj);
  }

  get(id: string): Observable<T> {
    return from(this.collection().doc(id).get().pipe(
      flatMap((ss) => {
        if (!ss) { return of(null); }
        return from(this.toModel({id: ss.id, ...ss.data()} as T_DTO));
      })
    ));
  }
}
