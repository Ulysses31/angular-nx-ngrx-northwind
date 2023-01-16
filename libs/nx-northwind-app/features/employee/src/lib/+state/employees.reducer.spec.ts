import { Action } from '@ngrx/store';

import * as EmployeesActions from './employees.actions';
import { EmployeesEntity } from './employees.models';
import {
  employeesReducer,
  EmployeesState,
  initialEmployeesState
} from './employees.reducer';

describe('Employees Reducer', () => {
  const createEmployeesEntity = (
    id: string,
    lastName: string,
    firstName: string,
    title: string,
    titleOfCourtesy: string,
    birthDate: Date,
    hireDate: Date,
    address: string,
    city: string,
    region: string,
    postalCode: string,
    country: string,
    homePhone: string,
    extension: string,
    notes: string,
    reportsTo: string,
    photoPath: string
  ): EmployeesEntity => ({
    id,
    employeeID: id,
    lastName: lastName || `name-${id}`,
    firstName,
    title,
    titleOfCourtesy,
    birthDate,
    hireDate,
    address,
    city,
    region,
    postalCode,
    country,
    homePhone,
    extension,
    notes,
    reportsTo,
    photoPath
  });

  describe('valid Employees actions', () => {
    it('loadEmployeesSuccess should return the list of known Employees', () => {
      const employees = [
        createEmployeesEntity(
          '100',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          new Date(),
          new Date(),
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A'
        ),
        createEmployeesEntity(
          '101',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          new Date(),
          new Date(),
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A'
        )
      ];
      const action = EmployeesActions.loadEmployeesSuccess({
        employees
      });

      const result: EmployeesState = employeesReducer(
        initialEmployeesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.employees.length).toBe(2);
    });
  });

  describe('valid selected employee action', () => {
    it('loadEmployeeSuccess should return a Employee', () => {
      const employee = createEmployeesEntity(
        '102',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        new Date(),
        new Date(),
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = EmployeesActions.loadEmployeeSuccess({
        employee
      });

      const result: EmployeesState = employeesReducer(
        initialEmployeesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.employee).not.toBeNull();
      expect(result.employee.employeeID).toMatch('102');
    });
  });

  describe('valid post employee action', () => {
    it('postEmployee should post a Employee', () => {
      const newEmployee = createEmployeesEntity(
        '103',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        new Date(),
        new Date(),
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = EmployeesActions.postEmployee({
        newEmployee
      });

      const result: EmployeesState = employeesReducer(
        initialEmployeesState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.employee).not.toBeNull();
      expect(result.employee.employeeID).toMatch('103');
    });
  });

  describe('valid post success employee action', () => {
    it('postEmployeeSuccess should success post a Employee', () => {
      const employee = createEmployeesEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        new Date(),
        new Date(),
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = EmployeesActions.postEmployeeSuccess({
        employee
      });

      const result: EmployeesState = employeesReducer(
        initialEmployeesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.employee).not.toBeNull();
      expect(result.employee.employeeID).toMatch('104');
    });
  });

  describe('valid put employee action', () => {
    it('putEmployee should put a Employee', () => {
      const putEmployee = createEmployeesEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        new Date(),
        new Date(),
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = EmployeesActions.putEmployee({
        selectedId: '104',
        putEmployee
      });

      const result: EmployeesState = employeesReducer(
        initialEmployeesState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.employee).not.toBeNull();
      expect(result.employee.employeeID).toMatch('104');
    });
  });

  describe('valid put success employee action', () => {
    it('putEmployeeSuccess should success put a Employee', () => {
      const employee = createEmployeesEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        new Date(),
        new Date(),
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = EmployeesActions.putEmployeeSuccess({
        employee
      });

      const result: EmployeesState = employeesReducer(
        initialEmployeesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.employee).not.toBeNull();
      expect(result.employee.employeeID).toMatch('104');
    });
  });

  describe('valid delete employee action', () => {
    it('deleteEmployee should delete a Employee', () => {
      const delEmployee = createEmployeesEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        new Date(),
        new Date(),
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = EmployeesActions.deleteEmployee({
        delEmployee
      });

      const result: EmployeesState = employeesReducer(
        initialEmployeesState,
        action
      );

      expect(result.employee).not.toBeNull();
      expect(result.employee.employeeID).toMatch('104');
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
