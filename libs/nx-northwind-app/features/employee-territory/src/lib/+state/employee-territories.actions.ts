import { createAction, props } from '@ngrx/store';
import { EmployeeTerritoriesEntity } from './employee-territories.models';

export const initEmployeeTerritories = createAction(
  '[EmployeeTerritories Page] Init'
);

export const loadEmployeeTerritoriesSuccess = createAction(
  '[EmployeeTerritories/API] Load EmployeeTerritories Success',
  props<{ employeeTerritories: EmployeeTerritoriesEntity[] }>()
);

export const loadEmployeeTerritoriesFailure = createAction(
  '[EmployeeTerritories/API] Load EmployeeTerritories Failure',
  props<{ error: any }>()
);
