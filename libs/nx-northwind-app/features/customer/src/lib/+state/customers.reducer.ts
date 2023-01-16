/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { CustomerDto } from '@nx-northwind/nx-northwind-app/entities';

import * as CustomersActions from './customers.actions';

export const CUSTOMERS_FEATURE_KEY = 'customers';

export interface CustomersState {
  customers: CustomerDto[];
  customer?: CustomerDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialCustomersState: CustomersState = {
  customers: [],
  customer: {},
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialCustomersState,
  // *********** INIT CUSTOMERS ******************************//
  on(CustomersActions.initCustomers, (state) => ({
    ...state,
    customer: {},
    loaded: false,
    error: null
  })),
  on(
    CustomersActions.loadCustomersSuccess,
    (state, { customers }) => ({
      ...state,
      customers,
      customer: {},
      loaded: true,
      error: null
    })
  ),
  on(CustomersActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    customers: [],
    customer: {},
    loaded: true,
    error
  })),
  // *********** SELECTED CUSTOMER ****************************//
  on(CustomersActions.initCustomer, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(CustomersActions.loadCustomerSuccess, (state, { customer }) => ({
    ...state,
    customer,
    loaded: true,
    error: null
  })),
  on(CustomersActions.loadCustomerFailure, (state, { error }) => ({
    ...state,
    customer: {},
    loaded: true,
    error
  })),
  // *********** POST CUSTOMER *******************************//
  on(CustomersActions.postCustomer, (state, { newCustomer }) => ({
    ...state,
    customer: newCustomer,
    loaded: false,
    error: null
  })),
  on(CustomersActions.postCustomerSuccess, (state, { customer }) => ({
    ...state,
    customer,
    loaded: true,
    error: null
  })),
  on(CustomersActions.postCustomerFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT CUSTOMER *******************************//
  on(CustomersActions.putCustomer, (state, { putCustomer }) => ({
    ...state,
    customer: putCustomer,
    loaded: false,
    error: null
  })),
  on(CustomersActions.putCustomerSuccess, (state, { customer }) => ({
    ...state,
    customer,
    loaded: true,
    error: null
  })),
  on(CustomersActions.putCustomerFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE CUSTOMER ****************************//
  on(CustomersActions.deleteCustomer, (state, { delCustomer }) => ({
    ...state,
    customer: delCustomer,
    loaded: false,
    error: null
  })),
  on(CustomersActions.deleteCustomerSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(CustomersActions.deleteCustomerFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  }))
);

export function customersReducer(
  state: CustomersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
