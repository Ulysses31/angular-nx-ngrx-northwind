import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EMPLOYEES_FEATURE_KEY,
  EmployeesState,
  employeesAdapter
} from './employees.reducer';

// Lookup the 'Employees' feature state managed by NgRx
export const getEmployeesState =
  createFeatureSelector<EmployeesState>(EMPLOYEES_FEATURE_KEY);

const { selectAll, selectEntities } = employeesAdapter.getSelectors();

export const getEmployeesLoaded = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.loaded
);

export const getEmployeesError = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.error
);

export const getAllEmployees = createSelector(
  getEmployeesState,
  (state: EmployeesState) => selectAll(state)
);

export const getEmployeesEntities = createSelector(
  getEmployeesState,
  (state: EmployeesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.selectedId
);

export const getSelected = createSelector(
  getEmployeesEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId ? entities[selectedId] : undefined
);
