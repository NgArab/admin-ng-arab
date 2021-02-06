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
    const params = new HttpParams({
      fromObject: { email: credentials.email, password: credentials.password },
    });

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
      }),
    };
    this.http
      .post(
        `${environment.baseURL}/auth/login`,
        { email: credentials.email, password: credentials.password },
        httpOptions
      )
      .subscribe((response) => {
        console.log('response ', response);
      });
    // ajax({
    //   url: `${environment.baseURL}/auth/login`,
    //   method: 'POST',
    //   body: {
    //     email: credentials.email,
    //     password: credentials.password,
    //   },
    //   headers: {},
    // }).subscribe((response) => {
    //   console.log('response ', response);
    // });
  }
}
