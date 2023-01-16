/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { SupplierDto } from '@nx-northwind/nx-northwind-app/entities';

import * as SuppliersActions from './suppliers.actions';

export const SUPPLIERS_FEATURE_KEY = 'suppliers';

export interface SuppliersState {
  suppliers: SupplierDto[];
  supplier: SupplierDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialSuppliersState: SuppliersState = {
  suppliers: [],
  supplier: {},
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialSuppliersState,
  // *********** INIT SUPPLIERS ******************************//
  on(SuppliersActions.initSuppliers, (state) => ({
    ...state,
    supplier: {},
    loaded: false,
    error: null
  })),
  on(
    SuppliersActions.loadSuppliersSuccess,
    (state, { suppliers }) => ({
      ...state,
      suppliers,
      supplier: {},
      loaded: true,
      error: null
    })
  ),
  on(SuppliersActions.loadSuppliersFailure, (state, { error }) => ({
    ...state,
    suppliers: [],
    supplier: {},
    loaded: true,
    error
  })),
  // *********** SELECTED SUPPLIER ****************************//
  on(SuppliersActions.initSupplier, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(SuppliersActions.loadSupplierSuccess, (state, { supplier }) => ({
    ...state,
    supplier,
    loaded: true,
    error: null
  })),
  on(SuppliersActions.loadSupplierFailure, (state, { error }) => ({
    ...state,
    supplier: {},
    loaded: true,
    error
  })),
  // *********** POST SUPPLIER *******************************//
  on(SuppliersActions.postSupplier, (state, { newSupplier }) => ({
    ...state,
    supplier: newSupplier,
    loaded: false,
    error: null
  })),
  on(SuppliersActions.postSupplierSuccess, (state, { supplier }) => ({
    ...state,
    supplier,
    loaded: true,
    error: null
  })),
  on(SuppliersActions.postSupplierFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT SUPPLIER *******************************//
  on(SuppliersActions.putSupplier, (state, { putSupplier }) => ({
    ...state,
    supplier: putSupplier,
    loaded: false,
    error: null
  })),
  on(SuppliersActions.putSupplierSuccess, (state, { supplier }) => ({
    ...state,
    supplier,
    loaded: true,
    error: null
  })),
  on(SuppliersActions.putSupplierFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE SUPPLIER ****************************//
  on(SuppliersActions.deleteSupplier, (state, { delSupplier }) => ({
    ...state,
    supplier: delSupplier,
    loaded: false,
    error: null
  })),
  on(SuppliersActions.deleteSupplierSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(SuppliersActions.deleteSupplierFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  }))
);

export function suppliersReducer(
  state: SuppliersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
