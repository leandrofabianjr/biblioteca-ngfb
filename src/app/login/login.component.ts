import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError = false;

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
    this.auth.user.subscribe(u => {
      if (u) {
      console.log('Já logado');
      } else {
        console.log('Não logado');
      }
    });
  }

  googleLogin() {
    this.auth
      .googleLogin()
      .subscribe(null, error => {
        this.loginError = true;
        console.error(error);
      });
  }
}
