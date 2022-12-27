import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CUSTOMERS_FEATURE_KEY,
  CustomersState,
  customersAdapter
} from './customers.reducer';

// Lookup the 'Customers' feature state managed by NgRx
export const getCustomersState =
  createFeatureSelector<CustomersState>(CUSTOMERS_FEATURE_KEY);

const { selectAll, selectEntities } = customersAdapter.getSelectors();

export const getCustomersLoaded = createSelector(
  getCustomersState,
  (state: CustomersState) => state.loaded
);

export const getCustomersError = createSelector(
  getCustomersState,
  (state: CustomersState) => state.error
);

export const getAllCustomers = createSelector(
  getCustomersState,
  (state: CustomersState) => selectAll(state)
);

export const getCustomersEntities = createSelector(
  getCustomersState,
  (state: CustomersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCustomersState,
  (state: CustomersState) => state.selectedId
);

export const getSelected = createSelector(
  getCustomersEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId ? entities[selectedId] : undefined
);
