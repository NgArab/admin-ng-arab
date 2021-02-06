import { ajax } from 'rxjs/ajax';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials): void {
    ajax({
      url: `${environment.baseURL}/auth/login`,
      method: 'POST',
      body: {
        email: credentials.email,
        password: credentials.password,
      },
      headers: {},
    }).subscribe((response) => {
      console.log('response ', response);
    });
  }
}
