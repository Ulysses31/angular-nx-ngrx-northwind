import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as UsersActions from './users.actions';
import { UsersEffects } from './users.effects';

describe('UsersEffects', () => {
  let effects: UsersEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UsersEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(UsersEffects);
  });

  describe('initUsers$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: UsersActions.initUsers()
      });
      const expected = hot('', {
        a: UsersActions.loadUsersSuccess({ users: [] })
      });
      expect(effects.initUsers$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: UsersActions.initUsers()
      });
      const expected = hot('-a-|', {
        a: UsersActions.loadUsersFailure({
          error: 'Failed'
        })
      });
      expect(effects.initUsers$).not.toBeObservable(expected);
    });
  });

  describe('initUser$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: UsersActions.initUser({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: UsersActions.loadUserSuccess({
          user: {
            id: '100',
            username: 'Test A',
            password: 'Test A',
            email: 'Test A',
            is_Active: true,
            sccess_Token: 'Test A',
            refresh_Token: 'Test A'
          }
        })
      });
      expect(effects.initUsers$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: UsersActions.initUser({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: UsersActions.loadUserFailure({
          error: 'Failed'
        })
      });
      expect(effects.initUser$).toBeObservable(expected);
    });
  });

  describe('postUser$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: UsersActions.postUser({
          newUser: {
            id: '105',
            username: 'Test A',
            password: 'Test A',
            email: 'Test A',
            is_Active: true,
            sccess_Token: 'Test A',
            refresh_Token: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: UsersActions.postUserSuccess({
          user: {
            id: '105',
            username: 'Test A',
            password: 'Test A',
            email: 'Test A',
            is_Active: true,
            sccess_Token: 'Test A',
            refresh_Token: 'Test A'
          }
        })
      });
      expect(effects.postUser$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: UsersActions.postUser({
          newUser: {
            id: '105',
            username: 'Test A',
            password: 'Test A',
            email: 'Test A',
            is_Active: true,
            sccess_Token: 'Test A',
            refresh_Token: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: UsersActions.postUserFailure({
          error: 'Failed'
        })
      });
      expect(effects.initUser$).toBeObservable(expected);
    });
  });

  describe('putUser$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: UsersActions.putUser({
          selectedId: '110',
          putUser: {
            id: '110',
            username: 'Test A',
            password: 'Test A',
            email: 'Test A',
            is_Active: true,
            sccess_Token: 'Test A',
            refresh_Token: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: UsersActions.putUserSuccess({
          user: {
            id: '110',
            username: 'Test A',
            password: 'Test A',
            email: 'Test A',
            is_Active: true,
            sccess_Token: 'Test A',
            refresh_Token: 'Test A'
          }
        })
      });
      expect(effects.putUser$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: UsersActions.putUser({
          selectedId: '110',
          putUser: {
            id: '110',
            username: 'Test A',
            password: 'Test A',
            email: 'Test A',
            is_Active: true,
            sccess_Token: 'Test A',
            refresh_Token: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: UsersActions.putUserFailure({
          error: 'Failed'
        })
      });
      expect(effects.putUser$).toBeObservable(expected);
    });
  });

  describe('deleteUser$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: UsersActions.deleteUser({
          delUser: {
            id: '110',
            username: 'Test A',
            password: 'Test A',
            email: 'Test A',
            is_Active: true,
            sccess_Token: 'Test A',
            refresh_Token: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: UsersActions.deleteUserSuccess()
      });
      expect(effects.deleteUser$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: UsersActions.deleteUser({
          delUser: {
            id: '110',
            username: 'Test A',
            password: 'Test A',
            email: 'Test A',
            is_Active: true,
            sccess_Token: 'Test A',
            refresh_Token: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: UsersActions.deleteUserFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteUser$).toBeObservable(expected);
    });
  });
});
