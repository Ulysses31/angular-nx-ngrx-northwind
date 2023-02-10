/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import {
  EmployeeTerritoryBrowserDto,
  EmployeeTerritoryLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

import * as EmployeeTerritoriesActions from './employee-territories.actions';

export const EMPLOYEE_TERRITORIES_FEATURE_KEY = 'employeeTerritories';

export interface EmployeeTerritoriesState {
  employeeTerritories: EmployeeTerritoryBrowserDto[];
  employeeTerritory: EmployeeTerritoryLoaderDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialEmployeeTerritoriesState: EmployeeTerritoriesState =
  {
    employeeTerritories: [],
    employeeTerritory: null,
    loaded: false,
    error: null
  };

const reducer = createReducer(
  initialEmployeeTerritoriesState,
  // *********** INIT EMPLOYEETERRITORIES ******************************//
  on(EmployeeTerritoriesActions.initEmployeeTerritories, (state) => ({
    ...state,
    employeeTerritory: null,
    loaded: false,
    error: null
  })),
  on(
    EmployeeTerritoriesActions.loadEmployeeTerritoriesSuccess,
    (state, { employeeTerritories }) => ({
      ...state,
      employeeTerritories,
      employeeTerritory: null,
      loaded: true,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.loadEmployeeTerritoriesFailure,
    (state, { error }) => ({
      ...state,
      employeeTerritories: [],
      employeeTerritory: null,
      loaded: true,
      error
    })
  ),
  // *********** SELECTED EMPLOYEETERRITORY ****************************//
  on(EmployeeTerritoriesActions.initEmployeeTerritory, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    EmployeeTerritoriesActions.loadEmployeeTerritorySuccess,
    (state, { employeeTerritory }) => ({
      ...state,
      employeeTerritory,
      loaded: true,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.loadEmployeeTerritoryFailure,
    (state, { error }) => ({
      ...state,
      employeeTerritory: null,
      loaded: true,
      error
    })
  ),
  // *********** POST EMPLOYEETERRITORY *******************************//
  on(
    EmployeeTerritoriesActions.postEmployeeTerritory,
    (state, { newEmployeeTerritory }) => ({
      ...state,
      employeeTerritory: newEmployeeTerritory,
      loaded: false,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.postEmployeeTerritorySuccess,
    (state, { employeeTerritory }) => ({
      ...state,
      employeeTerritory,
      loaded: true,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.postEmployeeTerritoryFailure,
    (state, { error }) => ({
      ...state,
      loaded: true,
      error
    })
  ),
  // *********** PUT EMPLOYEETERRITORY *******************************//
  on(
    EmployeeTerritoriesActions.putEmployeeTerritory,
    (state, { putEmployeeTerritory }) => ({
      ...state,
      employeeTerritory: putEmployeeTerritory,
      loaded: false,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.putEmployeeTerritorySuccess,
    (state, { employeeTerritory }) => ({
      ...state,
      employeeTerritory,
      loaded: true,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.putEmployeeTerritoryFailure,
    (state, { error }) => ({
      ...state,
      loaded: true,
      error
    })
  ),
  // *********** DELETE EMPLOYEETERRITORY ****************************//
  on(
    EmployeeTerritoriesActions.deleteEmployeeTerritory,
    (state, { delEmployeeTerritory }) => ({
      ...state,
      employeeTerritory: delEmployeeTerritory,
      loaded: false,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.deleteEmployeeTerritorySuccess,
    (state) => ({
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.deleteEmployeeTerritoryFailure,
    (state, { error }) => ({
      ...state,
      loaded: true,
      error
    })
  )
);

export function employeeTerritoriesReducer(
  state: EmployeeTerritoriesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
