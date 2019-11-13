import {AngularFirestore, AngularFirestoreCollection, FieldPath, QueryFn} from '@angular/fire/firestore';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {IModel} from '../models/model.interface';
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {flatMap, map} from 'rxjs/operators';

export interface IDto {
  id: string;
  uid: string;
}

export abstract class BaseDtoService<T extends IModel, T_DTO extends IDto> {
  private readonly COLLECTION_PATH;
  private collection: (queryFn?: QueryFn) => AngularFirestoreCollection<T_DTO>;
  private dataSjt: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  protected constructor(protected afs: AngularFirestore, private auth: AuthService, collection: string) {
    this.COLLECTION_PATH = collection;
    this.collection = (fn?) => afs.collection<T_DTO>(collection, fn);
  }

  get data(): Observable<T[]> {
    return this.dataSjt.asObservable();
  }

  protected abstract toModel(dto: T_DTO): Promise<T>;
  protected abstract toDto(obj: T): T_DTO;

  load(limit = 10, orderBy = 'uid') {
    this.auth.user.subscribe(u => {
      if (!u) { return; }
      this.collection(ref => ref
        .where('uid', '==', u.uid)
        .orderBy(orderBy, 'asc')
      ).get().subscribe(r => {
        Promise.all(r.docs.map(d => this.toModel({id: d.id, ...d.data()} as T_DTO)))
          .then(objs => this.dataSjt.next(objs));
      });
    }, error => console.error(error));
  }

  findOneWhere(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: any): Observable<T|null> {
    return this.auth.user.pipe(
      map(u => {
        if (!u) { throw Error(); }
        return u.uid;
      }),
      flatMap(uid => uid
        ? this.collection(ref => ref
          .where('uid', '==', uid)
          .where(fieldPath, opStr, value)
          .limit(1)
          ).get()
        : null
      ),
      flatMap((ss) => {
        if (!ss) { return of(null); }
        const doc = ss.docs[0];
        return from(this.toModel({id: doc.id, ...doc.data()} as T_DTO));
      })
    );
  }

  new(obj: T): Observable<T> {
    return this.auth.user.pipe(
      map(u => {
        if (!u) { throw Error(); }
        return u.uid;
      }),
      flatMap(uid => {
        obj.uid = uid;
        const dto = this.toDto(obj);
        delete dto.id;
        return from(this.collection().add(dto)
          .then(ref => ref.get())
          .then(ss => this.toModel({id: ss.id, ...ss.data()} as T_DTO)));
      })
    );
  }

  update(obj: T): Observable<T> {
    return this.auth.user.pipe(
      map(u => {
        if (!u) { throw Error(); }
        return u.uid;
      }),
      flatMap(uid => {
        obj.uid = uid;
        const dto = this.toDto(obj);
        delete dto.id;
        return from(this.collection().doc(obj.id).update(dto).then(() => obj));
      })
    );
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
