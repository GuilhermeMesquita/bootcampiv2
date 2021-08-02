import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(
    private _fireAuth: AngularFireAuth,
    private _fireStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this._fireAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this._fireStore.doc(`usuarios/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }
}
