/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import {
  UserBrowserDto,
  UserLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT USERS *************************************//
export const initUsers = createAction('[Users Page] Init');

export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: UserBrowserDto[] }>()
);

export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: any }>()
);

// *********** SELECTED USER ***********************************//
export const initUser = createAction(
  '[User Page] Init',
  props<{ selectedId: string }>()
);

export const loadUserSuccess = createAction(
  '[Users/API] Load User Success',
  props<{ user: UserLoaderDto }>()
);

export const loadUserFailure = createAction(
  '[Users/API] Load User Failure',
  props<{ error: any }>()
);

// *********** POST USER **************************************//
export const postUser = createAction(
  '[User Page] Post',
  props<{ newUser: UserLoaderDto }>()
);

export const postUserSuccess = createAction(
  '[Users/API] Post User Success',
  props<{ user: UserLoaderDto }>()
);

export const postUserFailure = createAction(
  '[Users/API] Post User Failure',
  props<{ error: any }>()
);

// *********** PUT USER ***************************************//
export const putUser = createAction(
  '[User Page] Put',
  props<{ selectedId: string; putUser: UserLoaderDto }>()
);

export const putUserSuccess = createAction(
  '[Users/API] Put User Success',
  props<{ user: UserLoaderDto }>()
);

export const putUserFailure = createAction(
  '[Users/API] Put User Failure',
  props<{ error: any }>()
);

// *********** DELETE USER ************************************//
export const deleteUser = createAction(
  '[User Page] Delete',
  props<{ delUser: UserLoaderDto }>()
);

export const deleteUserSuccess = createAction(
  '[Users/API] Delete User Success'
);

export const deleteUserFailure = createAction(
  '[Users/API] Delete User Failure',
  props<{ error: any }>()
);
