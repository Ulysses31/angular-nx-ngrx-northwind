/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import {
  EmployeeLoaderDto,
  EmployeeTerritoryBrowserDto,
  EmployeeTerritoryLoaderDto,
  TerritoryLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

import * as EmployeeTerritoriesActions from './employee-territories.actions';

export const EMPLOYEE_TERRITORIES_FEATURE_KEY = 'employeeTerritories';

export interface EmployeeTerritoriesState {
  employeeTerritories: EmployeeTerritoryBrowserDto[];
  employeeTerritory: EmployeeTerritoryLoaderDto | any;
  employees: EmployeeLoaderDto[];
  territories: TerritoryLoaderDto[];
  loaded: boolean;
  error?: string | null;
}

export const initialEmployeeTerritoriesState: EmployeeTerritoriesState =
  {
    employeeTerritories: [],
    employeeTerritory: null,
    employees: [],
    territories: [],
    loaded: false,
    error: null
  };

const reducer = createReducer(
  initialEmployeeTerritoriesState,
  // *********** INIT EMPLOYEES ******************************//
  on(
    EmployeeTerritoriesActions.initEmployeeTerritoriesEmployees,
    (state) => ({
      ...state,
      employees: [],
      loaded: false,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.loadEmployeeTerritoriesEmployeesSuccess,
    (state, { employees }) => ({
      ...state,
      employees,
      loaded: true,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.loadEmployeeTerritoriesEmployeesFailure,
    (state, { error }) => ({
      ...state,
      employees: [],
      loaded: true,
      error
    })
  ),
  // *********** INIT TERRITORIES *****************************//
  on(
    EmployeeTerritoriesActions.initEmployeeTerritoriesTerritories,
    (state) => ({
      ...state,
      territories: [],
      loaded: false,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.loadEmployeeTerritoriesTerritoriesSuccess,
    (state, { territories }) => ({
      ...state,
      territories,
      loaded: true,
      error: null
    })
  ),
  on(
    EmployeeTerritoriesActions.loadEmployeeTerritoriesTerritoriesFailure,
    (state, { error }) => ({
      ...state,
      territories: [],
      loaded: true,
      error
    })
  ),
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
