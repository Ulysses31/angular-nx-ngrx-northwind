import { Action } from '@ngrx/store';

import * as EmployeeTerritoriesActions from './employee-territories.actions';
import { EmployeeTerritoriesEntity } from './employee-territories.models';
import {
  EmployeeTerritoriesState,
  initialEmployeeTerritoriesState,
  employeeTerritoriesReducer
} from './employee-territories.reducer';

describe('EmployeeTerritories Reducer', () => {
  const createEmployeeTerritoriesEntity = (
    id: string,
    name = ''
  ): EmployeeTerritoriesEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid EmployeeTerritories actions', () => {
    it('loadEmployeeTerritoriesSuccess should return the list of known EmployeeTerritories', () => {
      const employeeTerritories = [
        createEmployeeTerritoriesEntity('PRODUCT-AAA'),
        createEmployeeTerritoriesEntity('PRODUCT-zzz')
      ];
      const action =
        EmployeeTerritoriesActions.loadEmployeeTerritoriesSuccess({
          employeeTerritories
        });

      const result: EmployeeTerritoriesState =
        employeeTerritoriesReducer(
          initialEmployeeTerritoriesState,
          action
        );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = employeeTerritoriesReducer(
        initialEmployeeTerritoriesState,
        action
      );

      expect(result).toBe(initialEmployeeTerritoriesState);
    });
  });
});
