import { AngularFirestore, AngularFirestoreCollection, FieldPath, QueryDocumentSnapshot, QueryFn} from '@angular/fire/firestore';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {IModel} from '../models/model.interface';
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {first, map} from 'rxjs/operators';
import OrderByDirection = firebase.firestore.OrderByDirection;
import {CollectionStats, StatsService} from './stats.service';

export enum CollectionType {
  Items = 'items',
  Authors = 'authors',
  Genres = 'genres',
  Locations = 'locations',
  Publishers = 'publishers',
}

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
    where: [(string | FieldPath), WhereFilterOp, any]) {
    this.limit = limit;
    this.orderBy = orderBy;
    this.orderDirection = orderDirection;
    this.where = where;
  }
}

export abstract class BaseDtoService<T extends IModel, T_DTO extends IDto> {
  private readonly collectionType;
  private collection: (queryFn?: QueryFn) => AngularFirestoreCollection<T_DTO>;
  private dataSjt: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private pd: PaginationData<T_DTO>;
  private statsSrv: StatsService;
  readonly uid: string;
  stats: Observable<CollectionStats>;

  private collectionData: T[] = [];

  private loadQueryFn = (ref) => {
    const r = ref
      .where('uid', '==', this.uid)
      .limit(this.pd.limit)
      .orderBy(this.pd.orderBy, this.pd.orderDirection);
    return this.pd.where ? r.where(this.pd.where[0], this.pd.where[1], this.pd.where[2]) : r;
  }

  protected constructor(protected afs: AngularFirestore, collectionType: CollectionType) {
    this.collectionType = collectionType;
    this.collection = (fn?) => afs.collection<T_DTO>(collectionType, fn);

    // @ts-ignore
    this.uid = afs.firestore._credentials.currentUser.uid.toString();
    if (!this.uid) { throw Error('Usuário não encontrado'); }

    this.statsSrv = new StatsService(afs, this.collectionType);
    this.stats = this.statsSrv.get();
  }

  get data(): Observable<T[]> {
    return this.dataSjt.asObservable();
  }

  protected abstract toModel(dto: T_DTO): T;
  protected abstract toDto(obj: T): T_DTO;

  loadData(): Observable<void> {
    return this.collection(ref => ref.
      where('uid', '==', this.uid)
    ).stateChanges().pipe(map(actions => {
      actions.map(a => {
        const obj = this.toModel({id: a.payload.doc.id, ...a.payload.doc.data()} as T_DTO);
        switch (a.type) {
          case 'added':
            this.collectionData.splice(a.payload.newIndex, 0, obj);
            break;
          case 'modified':
            this.collectionData[a.payload.newIndex] = obj;
            break;
          case 'removed':
            this.collectionData.splice(a.payload.oldIndex, 1);
            break;
        }
      });
      this.dataSjt.next(this.collectionData);
    }));
  }

  new(obj: T): Observable<T> {
    obj.uid = this.uid;
    const dto = this.toDto(obj);
    delete dto.id;
    return from(this.collection().add(dto)
      .then(ref => ref.get())
      .then(ss =>
        this.stats.pipe(first()).pipe(map(stats => {
          ++stats.count;
          const newObj = this.toModel({id: ss.id, ...ss.data()} as T_DTO);
          return [newObj, stats];
        })).toPromise()
      )
      .then(([newObj , stats]: [T, CollectionStats]) => Promise.all([
        newObj,
        this.statsSrv.set(this.collectionType, stats).toPromise()
          .catch(err => console.error('Erro ao atualizar stats', err))
      ]))
      .then(([newObj, _]) => newObj));
  }

  update(obj: T): Observable<T> {
    obj.uid = this.uid;
    const dto = this.toDto(obj);
    delete dto.id;
    return from(this.collection().doc(obj.id).update(dto).then(() => obj));
  }

  delete(id: string): Observable<boolean> {
    return from(this.collection().doc(id).delete()
      .then(() => this.stats.pipe(first()).pipe(map(stats => {
        ++stats.count;
        console.log(stats);
        return stats;
      })).toPromise())
      .then(stats => this.statsSrv.set(this.collectionType, stats).toPromise()
        .catch(err => console.error('Erro ao atualizar stats', err)))
      .then(() => true));
  }

  save(obj: T): Observable<T> {
    return obj.id
      ? this.update(obj)
      : this.new(obj);
  }

  get(id: string): T {
    return this.collectionData.find(obj => obj.id === id);
  }
}
