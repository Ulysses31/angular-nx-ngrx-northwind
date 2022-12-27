import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as EmployeesActions from './employees.actions';
import { EmployeesEntity } from './employees.models';

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface EmployeesState extends EntityState<EmployeesEntity> {
  selectedId?: string | number; // which Employees record has been selected
  loaded: boolean; // has the Employees list been loaded
  error?: string | null; // last known error (if any)
}

export interface EmployeesPartialState {
  readonly [EMPLOYEES_FEATURE_KEY]: EmployeesState;
}

export const employeesAdapter: EntityAdapter<EmployeesEntity> =
  createEntityAdapter<EmployeesEntity>();

export const initialEmployeesState: EmployeesState =
  employeesAdapter.getInitialState({
    // set initial required properties
    loaded: false
  });

const reducer = createReducer(
  initialEmployeesState,
  on(EmployeesActions.initEmployees, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(EmployeesActions.loadEmployeesSuccess, (state, { employees }) =>
    employeesAdapter.setAll(employees, { ...state, loaded: true })
  ),
  on(EmployeesActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function employeesReducer(
  state: EmployeesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
