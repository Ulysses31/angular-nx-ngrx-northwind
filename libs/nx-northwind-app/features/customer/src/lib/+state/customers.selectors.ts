import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CustomersState,
  CUSTOMERS_FEATURE_KEY
} from './customers.reducer';

export const selectCustomersState =
  createFeatureSelector<CustomersState>(CUSTOMERS_FEATURE_KEY);

export const selectCustomersLoaded = createSelector(
  selectCustomersState,
  (state: CustomersState) => {
    return state.loaded;
  }
);

export const selectCustomersError = createSelector(
  selectCustomersState,
  (state: CustomersState) => {
    return state.error;
  }
);

export const selectAllCustomers = createSelector(
  selectCustomersState,
  (state: CustomersState) => {
    return state.customers
  }
);

export const selectCustomer = createSelector(
  selectCustomersState,
  (state: CustomersState) => {
    return state.customer;
  }
);

// export const selectSelectedCustomer = createSelector(
//   selectAllCustomers,
//   selectSelectedId,
//   (customers, selectedId) =>
//     selectedId
//       ? customers.find((item) => item.id === selectedId)
//       : undefined
// );
