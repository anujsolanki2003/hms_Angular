import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/interfaces/user.data';

export const loadUserById = createAction(
  '[User] Load User By ID',
  props<{ id: number }>()
);
export const loadUserByIdSuccess = createAction(
  '[User] Load User By ID Success',
  props<{ user: User }>()
);
export const loadUserByIdFailure = createAction(
  '[User] Load User By ID Failure',
  props<{ error: any }>()
);
