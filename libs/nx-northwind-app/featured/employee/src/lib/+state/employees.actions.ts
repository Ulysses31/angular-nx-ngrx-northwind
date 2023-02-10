/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import {
  EmployeeBrowserDto,
  EmployeeLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT EMPLOYEES *************************************//
export const initEmployees = createAction('[Employees Page] Init');

export const loadEmployeesSuccess = createAction(
  '[Employees/API] Load Employees Success',
  props<{ employees: EmployeeBrowserDto[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employees/API] Load Employees Failure',
  props<{ error: any }>()
);

// *********** SELECTED EMPLOYEE ***********************************//
export const initEmployee = createAction(
  '[Employee Page] Init',
  props<{ selectedId: string }>()
);

export const loadEmployeeSuccess = createAction(
  '[Employees/API] Load Employee Success',
  props<{ employee: EmployeeLoaderDto }>()
);

export const loadEmployeeFailure = createAction(
  '[Employees/API] Load Employee Failure',
  props<{ error: any }>()
);

// *********** POST EMPLOYEE **************************************//
export const postEmployee = createAction(
  '[Employee Page] Post',
  props<{ newEmployee: EmployeeLoaderDto }>()
);

export const postEmployeeSuccess = createAction(
  '[Employees/API] Post Employee Success',
  props<{ employee: EmployeeLoaderDto }>()
);

export const postEmployeeFailure = createAction(
  '[Employees/API] Post Employee Failure',
  props<{ error: any }>()
);

// *********** PUT EMPLOYEE ***************************************//
export const putEmployee = createAction(
  '[Employee Page] Put',
  props<{ selectedId: string; putEmployee: EmployeeLoaderDto }>()
);

export const putEmployeeSuccess = createAction(
  '[Employees/API] Put Employee Success',
  props<{ employee: EmployeeLoaderDto }>()
);

export const putEmployeeFailure = createAction(
  '[Employees/API] Put Employee Failure',
  props<{ error: any }>()
);

// *********** DELETE EMPLOYEE ************************************//
export const deleteEmployee = createAction(
  '[Employee Page] Delete',
  props<{ delEmployee: EmployeeLoaderDto }>()
);

export const deleteEmployeeSuccess = createAction(
  '[Employees/API] Delete Employee Success'
);

export const deleteEmployeeFailure = createAction(
  '[Employees/API] Delete Employee Failure',
  props<{ error: any }>()
);
