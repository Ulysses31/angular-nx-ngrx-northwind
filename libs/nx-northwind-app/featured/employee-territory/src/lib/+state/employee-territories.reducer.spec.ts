import { Action } from '@ngrx/store';

import * as EmployeeTerritoriesActions from './employee-territories.actions';
import { EmployeeTerritoriesEntity } from './employee-territories.models';
import {
  employeeTerritoriesReducer,
  EmployeeTerritoriesState,
  initialEmployeeTerritoriesState
} from './employee-territories.reducer';

describe('EmployeeTerritories Reducer', () => {
  const createEmployeeTerritoriesEntity = (
    id: string,
    employeeID: string,
    territoryID: string
  ): EmployeeTerritoriesEntity => ({
    id,
    employeeID: id,
    territoryID
  });

  describe('valid EmployeeTerritories actions', () => {
    it('loadEmployeeTerritoriesSuccess should return the list of known EmployeeTerritories', () => {
      const employeeTerritories = [
        createEmployeeTerritoriesEntity('100', '1', '2'),
        createEmployeeTerritoriesEntity('101', '1', '2')
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
      expect(result.employeeTerritories.length).toBe(2);
    });
  });

  describe('valid selected employeeTerritory action', () => {
    it('loadEmployeeTerritorySuccess should return a EmployeeTerritory', () => {
      const employeeTerritory = createEmployeeTerritoriesEntity(
        '102',
        '1',
        '2'
      );

      const action =
        EmployeeTerritoriesActions.loadEmployeeTerritorySuccess({
          employeeTerritory
        });

      const result: EmployeeTerritoriesState =
        employeeTerritoriesReducer(
          initialEmployeeTerritoriesState,
          action
        );

      expect(result.loaded).toBe(true);
      expect(result.employeeTerritory).not.toBeNull();
      expect(result.employeeTerritory.employeeTerritoryID).toMatch(
        '102'
      );
    });
  });

  describe('valid post employeeTerritory action', () => {
    it('postEmployeeTerritory should post a EmployeeTerritory', () => {
      const newEmployeeTerritory = createEmployeeTerritoriesEntity(
        '103',
        '1',
        '2'
      );

      const action = EmployeeTerritoriesActions.postEmployeeTerritory(
        {
          newEmployeeTerritory
        }
      );

      const result: EmployeeTerritoriesState =
        employeeTerritoriesReducer(
          initialEmployeeTerritoriesState,
          action
        );

      //expect(result.loaded).toBe(true);
      expect(result.employeeTerritory).not.toBeNull();
      expect(result.employeeTerritory.employeeTerritoryID).toMatch(
        '103'
      );
    });
  });

  describe('valid post success employeeTerritory action', () => {
    it('postEmployeeTerritorySuccess should success post a EmployeeTerritory', () => {
      const employeeTerritory = createEmployeeTerritoriesEntity(
        '104',
        '1',
        '2'
      );

      const action =
        EmployeeTerritoriesActions.postEmployeeTerritorySuccess({
          employeeTerritory
        });

      const result: EmployeeTerritoriesState =
        employeeTerritoriesReducer(
          initialEmployeeTerritoriesState,
          action
        );

      expect(result.loaded).toBe(true);
      expect(result.employeeTerritory).not.toBeNull();
      expect(result.employeeTerritory.employeeTerritoryID).toMatch(
        '104'
      );
    });
  });

  describe('valid put employeeTerritory action', () => {
    it('putEmployeeTerritory should put a EmployeeTerritory', () => {
      const putEmployeeTerritory = createEmployeeTerritoriesEntity(
        '104',
        '1',
        '2'
      );

      const action = EmployeeTerritoriesActions.putEmployeeTerritory({
        selectedId: '104',
        putEmployeeTerritory
      });

      const result: EmployeeTerritoriesState =
        employeeTerritoriesReducer(
          initialEmployeeTerritoriesState,
          action
        );

      //expect(result.loaded).toBe(true);
      expect(result.employeeTerritory).not.toBeNull();
      expect(result.employeeTerritory.employeeTerritoryID).toMatch(
        '104'
      );
    });
  });

  describe('valid put success employeeTerritory action', () => {
    it('putEmployeeTerritorySuccess should success put a EmployeeTerritory', () => {
      const employeeTerritory = createEmployeeTerritoriesEntity(
        '104',
        '1',
        '2'
      );

      const action =
        EmployeeTerritoriesActions.putEmployeeTerritorySuccess({
          employeeTerritory
        });

      const result: EmployeeTerritoriesState =
        employeeTerritoriesReducer(
          initialEmployeeTerritoriesState,
          action
        );

      expect(result.loaded).toBe(true);
      expect(result.employeeTerritory).not.toBeNull();
      expect(result.employeeTerritory.employeeTerritoryID).toMatch(
        '104'
      );
    });
  });

  describe('valid delete employeeTerritory action', () => {
    it('deleteEmployeeTerritory should delete a EmployeeTerritory', () => {
      const delEmployeeTerritory = createEmployeeTerritoriesEntity(
        '104',
        '1',
        '2'
      );

      const action =
        EmployeeTerritoriesActions.deleteEmployeeTerritory({
          delEmployeeTerritory
        });

      const result: EmployeeTerritoriesState =
        employeeTerritoriesReducer(
          initialEmployeeTerritoriesState,
          action
        );

      expect(result.employeeTerritory).not.toBeNull();
      expect(result.employeeTerritory.employeeTerritoryID).toMatch(
        '104'
      );
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
