import { createReducer, on } from '@ngrx/store';

import { UserState } from 'src/app/core/interfaces/user.state';
import {
  loadUserById,
  loadUserByIdFailure,
  loadUserByIdSuccess,
} from '../actions/user.action';

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loadUserById, (state) => ({ ...state, loading: true })),
  on(loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
  })),
  on(loadUserByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
export { UserState };
