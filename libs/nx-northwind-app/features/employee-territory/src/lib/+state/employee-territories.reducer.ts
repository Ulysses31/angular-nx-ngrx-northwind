import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EmployeeTerritoriesActions from './employee-territories.actions';
import { EmployeeTerritoriesEntity } from './employee-territories.models';

export const EMPLOYEE_TERRITORIES_FEATURE_KEY = 'employeeTerritories';

export interface EmployeeTerritoriesState
  extends EntityState<EmployeeTerritoriesEntity> {
  selectedId?: string | number; // which EmployeeTerritories record has been selected
  loaded: boolean; // has the EmployeeTerritories list been loaded
  error?: string | null; // last known error (if any)
}

export interface EmployeeTerritoriesPartialState {
  readonly [EMPLOYEE_TERRITORIES_FEATURE_KEY]: EmployeeTerritoriesState;
}

export const employeeTerritoriesAdapter: EntityAdapter<EmployeeTerritoriesEntity> =
  createEntityAdapter<EmployeeTerritoriesEntity>();

export const initialEmployeeTerritoriesState: EmployeeTerritoriesState =
  employeeTerritoriesAdapter.getInitialState({
    // set initial required properties
    loaded: false
  });

const reducer = createReducer(
  initialEmployeeTerritoriesState,
  on(EmployeeTerritoriesActions.initEmployeeTerritories, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    EmployeeTerritoriesActions.loadEmployeeTerritoriesSuccess,
    (state, { employeeTerritories }) =>
      employeeTerritoriesAdapter.setAll(employeeTerritories, {
        ...state,
        loaded: true
      })
  ),
  on(
    EmployeeTerritoriesActions.loadEmployeeTerritoriesFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function employeeTerritoriesReducer(
  state: EmployeeTerritoriesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
