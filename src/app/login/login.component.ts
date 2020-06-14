import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../interfaces/user';
import { DataService } from '../services/data.service';
import { LoginService } from '../services/login.service';
import { loginRespond } from '../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  login: FormGroup;
  user: user;
  showErrorRespond: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private lg: LoginService) {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void { }

  Signin() {
    if (this.login.valid) {
      this.user = this.login.value;

      this.lg.checkAuthorization(this.user)
        .subscribe((res: loginRespond) => {
          if (res.isAuthorized) {
            console.log("user authorized")
            this.router.navigate(['home']);
          } else {
            this.showErrorRespond = res.error;
          }
      }, e => this.showErrorRespond = 'Server is down');
    }
  }
  
}
