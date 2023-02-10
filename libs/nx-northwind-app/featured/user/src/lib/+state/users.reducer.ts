/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import {
  UserBrowserDto,
  UserLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  users: UserBrowserDto[];
  user: UserLoaderDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialUsersState: UsersState = {
  users: [],
  user: {},
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialUsersState,
  // *********** INIT USERS ******************************//
  on(UsersActions.initUsers, (state) => ({
    ...state,
    user: {},
    loaded: false,
    error: null
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    user: {},
    loaded: true,
    error: null
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    users: [],
    user: {},
    loaded: true,
    error
  })),
  // *********** SELECTED USER ****************************//
  on(UsersActions.initUser, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(UsersActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loaded: true,
    error: null
  })),
  on(UsersActions.loadUserFailure, (state, { error }) => ({
    ...state,
    user: {},
    loaded: true,
    error
  })),
  // *********** POST USER *******************************//
  on(UsersActions.postUser, (state, { newUser }) => ({
    ...state,
    user: newUser,
    loaded: false,
    error: null
  })),
  on(UsersActions.postUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loaded: true,
    error: null
  })),
  on(UsersActions.postUserFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT USER *******************************//
  on(UsersActions.putUser, (state, { putUser }) => ({
    ...state,
    user: putUser,
    loaded: false,
    error: null
  })),
  on(UsersActions.putUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loaded: true,
    error: null
  })),
  on(UsersActions.putUserFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE USER ****************************//
  on(UsersActions.deleteUser, (state, { delUser }) => ({
    ...state,
    user: delUser,
    loaded: false,
    error: null
  })),
  on(UsersActions.deleteUserSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(UsersActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  }))
);

export function usersReducer(
  state: UsersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
