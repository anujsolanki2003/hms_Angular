import { createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = (state: any) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
