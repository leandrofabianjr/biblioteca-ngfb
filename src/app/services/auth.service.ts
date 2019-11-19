import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {forkJoin, from, Observable, of} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {auth} from 'firebase';

export interface IAppUserDTO {
  uid: string;
  email: string;
  name: string;
  photoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<IAppUserDTO|null>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => user
        ? this.afs.doc<IAppUserDTO>(`users/${user.uid}`).valueChanges()
        : of(null)
      ));
  }

  googleLogin() {
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user))
      .catch(err => console.error(err)));
  }


  private updateUserData(user) {
    return this.afs.doc(`users/${user.uid}`).set({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoUrl: user.photoURL
      }, { merge: true })
      .then(u => [u, this.createUsersStatsIfNotExists(user.uid).toPromise()])
      .then(([u, _]) => u);
  }

  private createUsersStatsIfNotExists(uid: string): Observable<void> {
    const newDoc = (stat: string) => of(this.afs.doc(`users/${uid}/stats/${stat}`). set({count: 0}));
    return this.afs.collection('users').doc(uid).collection('stats', r => r.limit(1)).get().pipe(
      flatMap(ss => {
        if (ss.size) { return of(); }
        return forkJoin([
          newDoc('items'),
          newDoc('authors'),
          newDoc('genres'),
          newDoc('locations'),
          newDoc('publishers')
        ]).pipe(map(() => null));
      })
    );
  }


  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate(['/login'], ));
  }

}
