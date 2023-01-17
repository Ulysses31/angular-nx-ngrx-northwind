import { UsersEntity } from './users.models';
import * as UsersSelectors from './users.selectors';

describe('Users Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getUsersId = (it: UsersEntity) => it.id;
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

  const createUsersState = {
    users: [
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
        'Test B',
        'Test B',
        true,
        'Test B',
        'Test B'
      )
    ],
    user: createUsersEntity(
      '103',
      'Test A',
      'Test C',
      'Test C',
      true,
      'Test C',
      'Test C'
    ),
    loaded: true,
    error: ERROR_MSG
  };

  describe('Users Selectors', () => {
    it('getAllUsers() should return the list of Users', () => {
      const results = UsersSelectors.selectAllUsers({
        users: createUsersState
      });
      const selId = getUsersId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected User', () => {
      const result = UsersSelectors.selectUser({
        users: createUsersState
      });
      const selId = getUsersId(result);
      expect(selId).toBe('103');
    });

    it('getUsersLoaded() should return the current "loaded" status', () => {
      const result = UsersSelectors.selectUsersLoaded({
        users: createUsersState
      });

      expect(result).toBe(true);
    });

    it('getUsersError() should return the current "error" state', () => {
      const result = UsersSelectors.selectUsersError({
        users: createUsersState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
