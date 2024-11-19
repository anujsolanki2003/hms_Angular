import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { createEffect } from '@ngrx/effects';

import { UserService } from '../../services/user.service';
import {
  loadUserById,
  loadUserByIdFailure,
  loadUserByIdSuccess,
} from '../actions/user.action';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserById),
      mergeMap(({ id }) =>
        this.userService.getUserById(id).pipe(
          map((user) => loadUserByIdSuccess({ user })),

          catchError((error) => of(loadUserByIdFailure({ error })))
        )
      )
    )
  );
}
