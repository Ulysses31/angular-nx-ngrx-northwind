/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as UsersActions from './users.actions';
import { UsersState } from './users.reducer';

@Injectable()
export class UsersEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(UserService);

  // ******** INIT USERS *************************************//
  initUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.initUsers),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: UsersState) => {
            // data.users.map((item) => {
            //   item.CreatedAt = item.CreatedAt ? moment(item.CreatedAt).format('DD/MM/YYYY HH:MM') : '';
            //   item.UpdatedAt = item.UpdatedAt ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:MM') : '';
            // });
            return data;
          }),
          map((data: UsersState) =>
            UsersActions.loadUsersSuccess({
              users: data.users
            })
          ),
          catchError((error) =>
            of(UsersActions.loadUsersFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT USER *************************************//
  initUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.initUser),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: UsersState) =>
            UsersActions.loadUserSuccess({
              user: data.users[0]
            })
          ),
          catchError((error) =>
            of(UsersActions.loadUserFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST USER *************************************//
  postUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.postUser),
      switchMap((action) =>
        this.service.create(action.newUser).pipe(
          tap((data: any) => console.log(data)),
          map((data: UsersState) =>
            UsersActions.postUserSuccess({
              user: data.user
            })
          ),
          catchError((error) =>
            of(UsersActions.postUserFailure({ error }))
          )
        )
      )
    )
  );

  // ******** PUT USER *************************************//
  putUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.putUser),
      switchMap((action) =>
        this.service.update(action.selectedId, action.putUser).pipe(
          tap((data: any) => console.log(data)),
          map((data: UsersState) =>
            UsersActions.putUserSuccess({
              user: data.user.body
            })
          ),
          catchError((error) =>
            of(UsersActions.putUserFailure({ error }))
          )
        )
      )
    )
  );

  // ******** DELETE USER **********************************//
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap((action) =>
        this.service.delete(action.delUser.Id).pipe(
          tap((data: any) => console.log(data)),
          map(() => UsersActions.deleteUserSuccess()),
          catchError((error) =>
            of(UsersActions.deleteUserFailure({ error }))
          )
        )
      )
    )
  );
}
