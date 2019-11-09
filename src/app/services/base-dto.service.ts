import {AngularFirestore, AngularFirestoreCollection, DocumentReference, QueryDocumentSnapshot, QueryFn} from '@angular/fire/firestore';
import {BehaviorSubject, forkJoin, from, Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {IModel} from '../models/model.interface';

export interface IDto {
  id: string;
  uid: string;
}

export abstract class BaseDtoService<T extends IModel, T_DTO extends IDto> {
  private collection: (queryFn?: QueryFn) => AngularFirestoreCollection<T_DTO>;
  private dataSjt: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  protected constructor(protected afs: AngularFirestore, private auth: AuthService, collection: string) {
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

  new(obj: T) {
    const dto = this.toDto(obj);
    delete dto.id;
    return from(this.collection().add(dto).catch(err => console.error(err)));
  }

  update(obj: T) {
    const dto = this.toDto(obj);
    delete dto.id;
    return from(this.collection().doc(obj.id).set(obj).catch(err => console.error(err)));
  }

  delete(id: string) {
    return from(this.collection().doc(id).delete().catch(err => console.error(err)));
  }
}
