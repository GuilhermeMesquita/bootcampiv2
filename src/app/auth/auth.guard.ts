import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this._auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedin => {
        if (!loggedin) {
          this._router.navigate(['login'])
        }
      })
    )
  }

}