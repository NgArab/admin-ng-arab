import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';

export const loginFeatureKey = 'login';
import { Admin } from '@shared/models/admin';

export const initialState: Admin = { email: '', password: '' };

export const reducer = createReducer(
  initialState,

  on(LoginActions.tryLogin, (state) => state),
  on(LoginActions.tryLoginSuccess, (state, payload) => state),
  on(LoginActions.tryLoginFailed, (state, payload) => state)
);
