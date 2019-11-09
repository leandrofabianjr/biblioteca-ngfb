import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
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
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: IAppUserDTO = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoUrl: user.photoURL,
    };
    return userRef.set(data, { merge: true });
  }


  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate(['/']));
  }

}
