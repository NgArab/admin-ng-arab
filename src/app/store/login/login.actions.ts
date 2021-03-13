import { createAction, props } from '@ngrx/store';
import { Admin } from '@shared/models/admin';

export const tryLogin = createAction('[Login] Try Login', props<Admin>());

export const tryLoginSuccess = createAction('[Login] Try Login Success', props<{ token: string }>());
export const tryLoginFailed = createAction('[Login] Try Login Failed', props<{ error: any }>());
