import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as SuppliersActions from './suppliers.actions';
import { SuppliersEntity } from './suppliers.models';

export const SUPPLIERS_FEATURE_KEY = 'suppliers';

export interface SuppliersState extends EntityState<SuppliersEntity> {
  selectedId?: string | number; // which Suppliers record has been selected
  loaded: boolean; // has the Suppliers list been loaded
  error?: string | null; // last known error (if any)
}

export interface SuppliersPartialState {
  readonly [SUPPLIERS_FEATURE_KEY]: SuppliersState;
}

export const suppliersAdapter: EntityAdapter<SuppliersEntity> =
  createEntityAdapter<SuppliersEntity>();

export const initialSuppliersState: SuppliersState =
  suppliersAdapter.getInitialState({
    // set initial required properties
    loaded: false
  });

const reducer = createReducer(
  initialSuppliersState,
  on(SuppliersActions.initSuppliers, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(SuppliersActions.loadSuppliersSuccess, (state, { suppliers }) =>
    suppliersAdapter.setAll(suppliers, { ...state, loaded: true })
  ),
  on(SuppliersActions.loadSuppliersFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function suppliersReducer(
  state: SuppliersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
