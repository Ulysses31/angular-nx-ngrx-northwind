import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EMPLOYEE_TERRITORIES_FEATURE_KEY,
  EmployeeTerritoriesState,
  employeeTerritoriesAdapter
} from './employee-territories.reducer';

// Lookup the 'EmployeeTerritories' feature state managed by NgRx
export const getEmployeeTerritoriesState =
  createFeatureSelector<EmployeeTerritoriesState>(
    EMPLOYEE_TERRITORIES_FEATURE_KEY
  );

const { selectAll, selectEntities } =
  employeeTerritoriesAdapter.getSelectors();

export const getEmployeeTerritoriesLoaded = createSelector(
  getEmployeeTerritoriesState,
  (state: EmployeeTerritoriesState) => state.loaded
);

export const getEmployeeTerritoriesError = createSelector(
  getEmployeeTerritoriesState,
  (state: EmployeeTerritoriesState) => state.error
);

export const getAllEmployeeTerritories = createSelector(
  getEmployeeTerritoriesState,
  (state: EmployeeTerritoriesState) => selectAll(state)
);

export const getEmployeeTerritoriesEntities = createSelector(
  getEmployeeTerritoriesState,
  (state: EmployeeTerritoriesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getEmployeeTerritoriesState,
  (state: EmployeeTerritoriesState) => state.selectedId
);

export const getSelected = createSelector(
  getEmployeeTerritoriesEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId ? entities[selectedId] : undefined
);
