/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import {
  SupplierBrowserDto,
  SupplierLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT SUPPLIERS *************************************//
export const initSuppliers = createAction('[Suppliers Page] Init');

export const loadSuppliersSuccess = createAction(
  '[Suppliers/API] Load Suppliers Success',
  props<{ suppliers: SupplierBrowserDto[] }>()
);

export const loadSuppliersFailure = createAction(
  '[Suppliers/API] Load Suppliers Failure',
  props<{ error: any }>()
);

// *********** SELECTED SUPPLIER ***********************************//
export const initSupplier = createAction(
  '[Supplier Page] Init',
  props<{ selectedId: string }>()
);

export const loadSupplierSuccess = createAction(
  '[Suppliers/API] Load Supplier Success',
  props<{ supplier: SupplierLoaderDto }>()
);

export const loadSupplierFailure = createAction(
  '[Suppliers/API] Load Supplier Failure',
  props<{ error: any }>()
);

// *********** POST SUPPLIER **************************************//
export const postSupplier = createAction(
  '[Supplier Page] Post',
  props<{ newSupplier: SupplierLoaderDto }>()
);

export const postSupplierSuccess = createAction(
  '[Suppliers/API] Post Supplier Success',
  props<{ supplier: SupplierLoaderDto }>()
);

export const postSupplierFailure = createAction(
  '[Suppliers/API] Post Supplier Failure',
  props<{ error: any }>()
);

// *********** PUT SUPPLIER ***************************************//
export const putSupplier = createAction(
  '[Supplier Page] Put',
  props<{ selectedId: string; putSupplier: SupplierLoaderDto }>()
);

export const putSupplierSuccess = createAction(
  '[Suppliers/API] Put Supplier Success',
  props<{ supplier: SupplierLoaderDto }>()
);

export const putSupplierFailure = createAction(
  '[Suppliers/API] Put Supplier Failure',
  props<{ error: any }>()
);

// *********** DELETE SUPPLIER ************************************//
export const deleteSupplier = createAction(
  '[Supplier Page] Delete',
  props<{ delSupplier: SupplierLoaderDto }>()
);

export const deleteSupplierSuccess = createAction(
  '[Suppliers/API] Delete Supplier Success'
);

export const deleteSupplierFailure = createAction(
  '[Suppliers/API] Delete Supplier Failure',
  props<{ error: any }>()
);
