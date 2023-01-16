import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EmployeeTerritoriesState,
  EMPLOYEE_TERRITORIES_FEATURE_KEY
} from './employee-territories.reducer';

export const selectEmployeeTerritoriesState =
  createFeatureSelector<EmployeeTerritoriesState>(
    EMPLOYEE_TERRITORIES_FEATURE_KEY
  );

export const selectEmployeeTerritoriesLoaded = createSelector(
  selectEmployeeTerritoriesState,
  (state: EmployeeTerritoriesState) => {
    return state.loaded;
  }
);

export const selectEmployeeTerritoriesError = createSelector(
  selectEmployeeTerritoriesState,
  (state: EmployeeTerritoriesState) => {
    return state.error;
  }
);

export const selectAllEmployeeTerritories = createSelector(
  selectEmployeeTerritoriesState,
  (state: EmployeeTerritoriesState) => {
    return state.employeeTerritories;
  }
);

export const selectEmployeeTerritory = createSelector(
  selectEmployeeTerritoriesState,
  (state: EmployeeTerritoriesState) => {
    return state.employeeTerritory;
  }
);

// export const selectSelectedEmployeeTerritory = createSelector(
//   selectAllEmployeeTerritories,
//   selectSelectedId,
//   (employeeTerritories, selectedId) =>
//     selectedId
//       ? employeeTerritories.find((item) => item.id === selectedId)
//       : undefined
// );
