import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials): void {
    ajax({
      url: `${environment.baseURL}/auth/login`,
      method: 'POST',
      body: {
        email: credentials.email,
        password: credentials.password,
      },
      headers: {},
    }).subscribe((res: AjaxResponse) => {
      localStorage.setItem('admin_token', res.response.access_token);
      this.router.navigate(['/questions']);
    });
  }
}
