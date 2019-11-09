import {AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, QueryFn} from '@angular/fire/firestore';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {AuthService} from './auth.service';

export interface IBaseDTO {
  id: string;
  uid: string;
}

export class BaseDTOService<T extends IBaseDTO> {
  private collection: (queryFn?: QueryFn) => AngularFirestoreCollection<T>;
  private dataSjt: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(private afs: AngularFirestore, private auth: AuthService, collection: string) {
    this.collection = (fn?) => afs.collection<T>(collection, fn);
  }

  get data(): Observable<T[]> {
    return this.dataSjt.asObservable();
  }

  protected buildModel(d: QueryDocumentSnapshot<any>) {
    return { id: d.id, ...d.data()} as T;
  }

  load(limit = 10, orderBy = 'uid') {
    this.auth.user.subscribe(u => {
      this.collection(ref => ref
        .where('uid', '==', u.uid)
        .orderBy(orderBy, 'asc')
      ).get().subscribe(r =>
        this.dataSjt
          .next(r.docs.map(d => this.buildModel(d)))
      );
    }, error => console.error(error));
  }

  new(obj: T) {
    delete obj.id;
    return from(this.collection().add(obj).catch(err => console.error(err)));
  }

  update(obj: T) {
    const id = obj.id;
    delete obj.id;
    return from(this.collection().doc(id).set(obj).catch(err => console.error(err)));
  }

  delete(id: string) {
    return from(this.collection().doc(id).delete().catch(err => console.error(err)));
  }
}
