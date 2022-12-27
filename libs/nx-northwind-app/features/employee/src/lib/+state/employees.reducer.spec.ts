import { Action } from '@ngrx/store';

import * as EmployeesActions from './employees.actions';
import { EmployeesEntity } from './employees.models';
import {
  EmployeesState,
  initialEmployeesState,
  employeesReducer
} from './employees.reducer';

describe('Employees Reducer', () => {
  const createEmployeesEntity = (
    id: string,
    name = ''
  ): EmployeesEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid Employees actions', () => {
    it('loadEmployeesSuccess should return the list of known Employees', () => {
      const employees = [
        createEmployeesEntity('PRODUCT-AAA'),
        createEmployeesEntity('PRODUCT-zzz')
      ];
      const action = EmployeesActions.loadEmployeesSuccess({
        employees
      });

      const result: EmployeesState = employeesReducer(
        initialEmployeesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = employeesReducer(initialEmployeesState, action);

      expect(result).toBe(initialEmployeesState);
    });
  });
});
