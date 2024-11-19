import { createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

// Step 1: Select the feature state (user state)
export const selectUserState = (state: any) => state.user;

// Step 2: Create the selector for the user data
export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

// Step 4: Create the selector for loading state
export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

// Step 5: Create the selector for error state
export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
