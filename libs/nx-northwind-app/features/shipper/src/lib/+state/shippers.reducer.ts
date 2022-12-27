import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ShippersActions from './shippers.actions';
import { ShippersEntity } from './shippers.models';

export const SHIPPERS_FEATURE_KEY = 'shippers';

export interface ShippersState extends EntityState<ShippersEntity> {
  selectedId?: string | number; // which Shippers record has been selected
  loaded: boolean; // has the Shippers list been loaded
  error?: string | null; // last known error (if any)
}

export interface ShippersPartialState {
  readonly [SHIPPERS_FEATURE_KEY]: ShippersState;
}

export const shippersAdapter: EntityAdapter<ShippersEntity> =
  createEntityAdapter<ShippersEntity>();

export const initialShippersState: ShippersState =
  shippersAdapter.getInitialState({
    // set initial required properties
    loaded: false
  });

const reducer = createReducer(
  initialShippersState,
  on(ShippersActions.initShippers, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(ShippersActions.loadShippersSuccess, (state, { shippers }) =>
    shippersAdapter.setAll(shippers, { ...state, loaded: true })
  ),
  on(ShippersActions.loadShippersFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function shippersReducer(
  state: ShippersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
