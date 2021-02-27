import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = {
      Accept: 'application/json',
      'Content-Type': ' application/json',
      Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
    };

    request = request.clone({ setHeaders: headers });
    return next.handle(request);
  }
}
