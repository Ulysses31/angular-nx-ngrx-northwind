import { Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';
import {
  initialUsersState,
  usersReducer,
  UsersState
} from './users.reducer';

describe('Users Reducer', () => {
  const createUsersEntity = (
    id: string,
    username: string,
    password: string,
    email: string,
    is_Active: boolean,
    sccess_Token: string,
    refresh_Token: string
  ): UsersEntity => ({
    id,
    username,
    password,
    email,
    is_Active,
    sccess_Token,
    refresh_Token
  });

  describe('valid Users actions', () => {
    it('loadUsersSuccess should return the list of known Users', () => {
      const users = [
        createUsersEntity(
          '100',
          'Test A',
          'Test A',
          'Test A',
          true,
          'Test A',
          'Test A'
        ),
        createUsersEntity(
          '101',
          'Test A',
          'Test A',
          'Test A',
          true,
          'Test A',
          'Test A'
        )
      ];
      const action = UsersActions.loadUsersSuccess({
        users
      });

      const result: UsersState = usersReducer(
        initialUsersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.users.length).toBe(2);
    });
  });

  describe('valid selected user action', () => {
    it('loadUserSuccess should return a User', () => {
      const user = createUsersEntity(
        '102',
        'Test A',
        'Test A',
        'Test A',
        true,
        'Test A',
        'Test A'
      );

      const action = UsersActions.loadUserSuccess({
        user
      });

      const result: UsersState = usersReducer(
        initialUsersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.user).not.toBeNull();
      expect(result.user.userID).toMatch('102');
    });
  });

  describe('valid post user action', () => {
    it('postUser should post a User', () => {
      const newUser = createUsersEntity(
        '103',
        'Test A',
        'Test A',
        'Test A',
        true,
        'Test A',
        'Test A'
      );

      const action = UsersActions.postUser({
        newUser
      });

      const result: UsersState = usersReducer(
        initialUsersState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.user).not.toBeNull();
      expect(result.user.userID).toMatch('103');
    });
  });

  describe('valid post success user action', () => {
    it('postUserSuccess should success post a User', () => {
      const user = createUsersEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        true,
        'Test A',
        'Test A'
      );

      const action = UsersActions.postUserSuccess({
        user
      });

      const result: UsersState = usersReducer(
        initialUsersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.user).not.toBeNull();
      expect(result.user.userID).toMatch('104');
    });
  });

  describe('valid put user action', () => {
    it('putUser should put a User', () => {
      const putUser = createUsersEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        true,
        'Test A',
        'Test A'
      );

      const action = UsersActions.putUser({
        selectedId: '104',
        putUser
      });

      const result: UsersState = usersReducer(
        initialUsersState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.user).not.toBeNull();
      expect(result.user.userID).toMatch('104');
    });
  });

  describe('valid put success user action', () => {
    it('putUserSuccess should success put a User', () => {
      const user = createUsersEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        true,
        'Test A',
        'Test A'
      );

      const action = UsersActions.putUserSuccess({
        user
      });

      const result: UsersState = usersReducer(
        initialUsersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.user).not.toBeNull();
      expect(result.user.userID).toMatch('104');
    });
  });

  describe('valid delete user action', () => {
    it('deleteUser should delete a User', () => {
      const delUser = createUsersEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        true,
        'Test A',
        'Test A'
      );

      const action = UsersActions.deleteUser({
        delUser
      });

      const result: UsersState = usersReducer(
        initialUsersState,
        action
      );

      expect(result.user).not.toBeNull();
      expect(result.user.userID).toMatch('104');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = usersReducer(initialUsersState, action);

      expect(result).toBe(initialUsersState);
    });
  });
});
