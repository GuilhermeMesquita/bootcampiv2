import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
    private _auth_service: AuthService,
    private router: Router,
  ) { }

  googleLogin() {
    this._auth_service.googleLogin()
      .then(() => this.router.navigateByUrl('home'));
  }
}