import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {CollectionType} from './base-dto.service';

export interface CollectionStats {
  count: number;
}

export class StatsService {
  private uid: string;
  private statsSjt: BehaviorSubject<CollectionStats> = new BehaviorSubject<CollectionStats>(null);
  private path = (collectionName: string) => `/users/${this.uid}/stats/${collectionName}`;

  constructor(private afs: AngularFirestore, collectionType: CollectionType) {
    // @ts-ignore
    this.uid = afs.firestore._credentials.currentUser.uid.toString();
    if (!this.uid) { throw Error('Usuário não encontrado'); }

    this.afs.doc(this.path(collectionType)).valueChanges()
      .subscribe((stats: CollectionStats) => this.statsSjt.next(stats));
  }

  get(): Observable<CollectionStats> {
    return this.statsSjt.asObservable();
  }

  set(collectionName: string, stats: CollectionStats): Observable<boolean> {
    return from(this.afs.doc(this.path(collectionName)).update(stats)
      .then(() => true));
  }
}
