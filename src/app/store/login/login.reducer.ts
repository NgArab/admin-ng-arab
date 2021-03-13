import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';

export const loginFeatureKey = 'login';
import { Admin } from '@shared/models/admin';

export const initialState: Admin = { email: '', password: '' };

export const loginReducer = createReducer(
  initialState,

  on(LoginActions.tryLogin, (state) => state),
  on(LoginActions.tryLoginSuccess, (state, payload) => {
    console.log('payload in reducer', payload);
    return state;
  }),
  on(LoginActions.tryLoginFailed, (state, payload) => {
    console.log(payload.error.message);
    return state;
  })
);
