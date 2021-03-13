import { Admin } from '@shared/models/admin';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as LoginActions from './login.actions';
import { AuthService } from '@core/auth.service';

import { Router } from '@angular/router';
import { LoadingService } from '@shared/services/loading.service';

@Injectable()
export class LoginEffects {
  loadLogins$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.tryLogin),
      concatMap((payload: Admin & { type: string }) =>
        this.authService.login({ email: payload.email, password: payload.password }).pipe(
          map((data) => {
            localStorage.setItem('admin_token', data.access_token);
            this.router.navigate(['/questions']);
            this.loadingService.isLoggedIn = localStorage.getItem('admin_token');
            return LoginActions.tryLoginSuccess({ token: data.access_token });
          }),
          catchError((err) => of(LoginActions.tryLoginFailed(err)))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}
}
