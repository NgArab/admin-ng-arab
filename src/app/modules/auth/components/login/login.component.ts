import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Admin } from '@shared/models/admin';
import * as LoginActions from '@store/login/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  constructor(private store: Store<Admin>, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('admin_token')) {
      this.router.navigateByUrl('/');
    }
  }
  onSubmit(): void {
    this.store.dispatch(LoginActions.tryLogin(this.loginForm.value));
  }
}
