import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EmployeesState,
  EMPLOYEES_FEATURE_KEY
} from './employees.reducer';

export const selectEmployeesState =
  createFeatureSelector<EmployeesState>(EMPLOYEES_FEATURE_KEY);

export const selectEmployeesLoaded = createSelector(
  selectEmployeesState,
  (state: EmployeesState) => {
    return state.loaded;
  }
);

export const selectEmployeesError = createSelector(
  selectEmployeesState,
  (state: EmployeesState) => {
    return state.error;
  }
);

export const selectAllEmployees = createSelector(
  selectEmployeesState,
  (state: EmployeesState) => {
    return state.employees;
  }
);

export const selectEmployee = createSelector(
  selectEmployeesState,
  (state: EmployeesState) => {
    return state.employee;
  }
);

// export const selectSelectedEmployee = createSelector(
//   selectAllEmployees,
//   selectSelectedId,
//   (employees, selectedId) =>
//     selectedId
//       ? employees.find((item) => item.id === selectedId)
//       : undefined
// );
