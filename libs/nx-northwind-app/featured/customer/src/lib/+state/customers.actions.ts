/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { CustomerDto } from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT CUSTOMERS *************************************//
export const initCustomers = createAction('[Customers Page] Init');

export const loadCustomersSuccess = createAction(
  '[Customers/API] Load Customers Success',
  props<{ customers: CustomerDto[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customers/API] Load Customers Failure',
  props<{ error: any }>()
);

// *********** SELECTED CUSTOMER ***********************************//
export const initCustomer = createAction(
  '[Customer Page] Init',
  props<{ selectedId: string }>()
);

export const loadCustomerSuccess = createAction(
  '[Customers/API] Load Customer Success',
  props<{ customer: CustomerDto }>()
);

export const loadCustomerFailure = createAction(
  '[Customers/API] Load Customer Failure',
  props<{ error: any }>()
);

// *********** POST CUSTOMER **************************************//
export const postCustomer = createAction(
  '[Customer Page] Post',
  props<{ newCustomer: CustomerDto }>()
);

export const postCustomerSuccess = createAction(
  '[Customers/API] Post Customer Success',
  props<{ customer: CustomerDto }>()
);

export const postCustomerFailure = createAction(
  '[Customers/API] Post Customer Failure',
  props<{ error: any }>()
);

// *********** PUT CUSTOMER ***************************************//
export const putCustomer = createAction(
  '[Customer Page] Put',
  props<{ selectedId: string; putCustomer: CustomerDto }>()
);

export const putCustomerSuccess = createAction(
  '[Customers/API] Put Customer Success',
  props<{ customer: CustomerDto }>()
);

export const putCustomerFailure = createAction(
  '[Customers/API] Put Customer Failure',
  props<{ error: any }>()
);

// *********** DELETE CUSTOMER ************************************//
export const deleteCustomer = createAction(
  '[Customer Page] Delete',
  props<{ delCustomer: CustomerDto }>()
);

export const deleteCustomerSuccess = createAction(
  '[Customers/API] Delete Customer Success'
);

export const deleteCustomerFailure = createAction(
  '[Customers/API] Delete Customer Failure',
  props<{ error: any }>()
);
