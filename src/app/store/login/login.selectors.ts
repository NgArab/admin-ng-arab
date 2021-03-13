import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogin from './login.reducer';
import { Admin } from '@shared/models/admin';

export const selectLoginState = createFeatureSelector<Admin>(fromLogin.loginFeatureKey);
