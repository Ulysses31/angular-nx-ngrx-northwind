/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { EmployeeDto } from '@nx-northwind/nx-northwind-app/entities';

import * as EmployeesActions from './employees.actions';

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface EmployeesState {
  employees: EmployeeDto[];
  employee: EmployeeDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialEmployeesState: EmployeesState = {
  employees: [],
  employee: {},
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialEmployeesState,
  // *********** INIT EMPLOYEES ******************************//
  on(EmployeesActions.initEmployees, (state) => ({
    ...state,
    employee: {},
    loaded: false,
    error: null
  })),
  on(
    EmployeesActions.loadEmployeesSuccess,
    (state, { employees }) => ({
      ...state,
      employees,
      employee: {},
      loaded: true,
      error: null
    })
  ),
  on(EmployeesActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    employees: [],
    employee: {},
    loaded: true,
    error
  })),
  // *********** SELECTED EMPLOYEE ****************************//
  on(EmployeesActions.initEmployee, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(EmployeesActions.loadEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employee,
    loaded: true,
    error: null
  })),
  on(EmployeesActions.loadEmployeeFailure, (state, { error }) => ({
    ...state,
    employee: {},
    loaded: true,
    error
  })),
  // *********** POST EMPLOYEE *******************************//
  on(EmployeesActions.postEmployee, (state, { newEmployee }) => ({
    ...state,
    employee: newEmployee,
    loaded: false,
    error: null
  })),
  on(EmployeesActions.postEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employee,
    loaded: true,
    error: null
  })),
  on(EmployeesActions.postEmployeeFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT EMPLOYEE *******************************//
  on(EmployeesActions.putEmployee, (state, { putEmployee }) => ({
    ...state,
    employee: putEmployee,
    loaded: false,
    error: null
  })),
  on(EmployeesActions.putEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employee,
    loaded: true,
    error: null
  })),
  on(EmployeesActions.putEmployeeFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE EMPLOYEE ****************************//
  on(EmployeesActions.deleteEmployee, (state, { delEmployee }) => ({
    ...state,
    employee: delEmployee,
    loaded: false,
    error: null
  })),
  on(EmployeesActions.deleteEmployeeSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(EmployeesActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  }))
);

export function employeesReducer(
  state: EmployeesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
