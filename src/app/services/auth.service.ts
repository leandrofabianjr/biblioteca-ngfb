/* Exemplo: https://angularfirebase.com/lessons/google-user-auth-with-firestore-custom-data/ */

import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {first, switchMap, tap} from 'rxjs/operators';
import {auth} from 'firebase';

export interface AppUser {
  uid: string;
  email: string;
  name: string;
  photoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<AppUser|null>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<AppUser>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      }));
  }

  googleLogin() {
    return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((credential) => {
        this.updateUserData(credential.user);
      }).catch(err => console.error(err)));
  }


  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: AppUser = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoUrl: user.photoURL,
    };
    return userRef.set(data, { merge: true });
  }


  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

}
