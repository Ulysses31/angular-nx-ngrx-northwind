/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { EmployeeTerritoryDto } from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT EMPLOYEE TERRITORIES *************************************//
export const initEmployeeTerritories = createAction(
  '[EmployeeTerritories Page] Init'
);

export const loadEmployeeTerritoriesSuccess = createAction(
  '[EmployeeTerritories/API] Load EmployeeTerritories Success',
  props<{ employeeTerritories: EmployeeTerritoryDto[] }>()
);

export const loadEmployeeTerritoriesFailure = createAction(
  '[EmployeeTerritories/API] Load EmployeeTerritories Failure',
  props<{ error: any }>()
);

// *********** SELECTED EMPLOYEE TERRITORY ***********************************//
export const initEmployeeTerritory = createAction(
  '[EmployeeTerritory Page] Init',
  props<{ selectedId: string }>()
);

export const loadEmployeeTerritorySuccess = createAction(
  '[EmployeeTerritories/API] Load EmployeeTerritory Success',
  props<{ employeeTerritory: EmployeeTerritoryDto }>()
);

export const loadEmployeeTerritoryFailure = createAction(
  '[EmployeeTerritories/API] Load EmployeeTerritory Failure',
  props<{ error: any }>()
);

// *********** POST EMPLOYEE TERRITORY **************************************//
export const postEmployeeTerritory = createAction(
  '[EmployeeTerritory Page] Post',
  props<{ newEmployeeTerritory: EmployeeTerritoryDto }>()
);

export const postEmployeeTerritorySuccess = createAction(
  '[EmployeeTerritories/API] Post EmployeeTerritory Success',
  props<{ employeeTerritory: EmployeeTerritoryDto }>()
);

export const postEmployeeTerritoryFailure = createAction(
  '[EmployeeTerritories/API] Post EmployeeTerritory Failure',
  props<{ error: any }>()
);

// *********** PUT EMPLOYEE TERRITORY ***************************************//
export const putEmployeeTerritory = createAction(
  '[EmployeeTerritory Page] Put',
  props<{
    selectedId: string;
    putEmployeeTerritory: EmployeeTerritoryDto;
  }>()
);

export const putEmployeeTerritorySuccess = createAction(
  '[EmployeeTerritories/API] Put EmployeeTerritory Success',
  props<{ employeeTerritory: EmployeeTerritoryDto }>()
);

export const putEmployeeTerritoryFailure = createAction(
  '[EmployeeTerritories/API] Put EmployeeTerritory Failure',
  props<{ error: any }>()
);

// *********** DELETE EMPLOYEE TERRITORY ************************************//
export const deleteEmployeeTerritory = createAction(
  '[EmployeeTerritory Page] Delete',
  props<{ delEmployeeTerritory: EmployeeTerritoryDto }>()
);

export const deleteEmployeeTerritorySuccess = createAction(
  '[EmployeeTerritories/API] Delete EmployeeTerritory Success'
);

export const deleteEmployeeTerritoryFailure = createAction(
  '[EmployeeTerritories/API] Delete EmployeeTerritory Failure',
  props<{ error: any }>()
);
