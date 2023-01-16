/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { ShipperDto } from '@nx-northwind/nx-northwind-app/entities';

import * as ShippersActions from './shippers.actions';

export const SHIPPERS_FEATURE_KEY = 'shippers';

export interface ShippersState {
  shippers: ShipperDto[];
  shipper: ShipperDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialShippersState: ShippersState = {
  shippers: [],
  shipper: {},
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialShippersState,
  // *********** INIT SHIPPERS ******************************//
  on(ShippersActions.initShippers, (state) => ({
    ...state,
    shipper: {},
    loaded: false,
    error: null
  })),
  on(ShippersActions.loadShippersSuccess, (state, { shippers }) => ({
    ...state,
    shippers,
    shipper: {},
    loaded: true,
    error: null
  })),
  on(ShippersActions.loadShippersFailure, (state, { error }) => ({
    ...state,
    shippers: [],
    shipper: {},
    loaded: true,
    error
  })),
  // *********** SELECTED SHIPPER ****************************//
  on(ShippersActions.initShipper, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(ShippersActions.loadShipperSuccess, (state, { shipper }) => ({
    ...state,
    shipper,
    loaded: true,
    error: null
  })),
  on(ShippersActions.loadShipperFailure, (state, { error }) => ({
    ...state,
    shipper: {},
    loaded: true,
    error
  })),
  // *********** POST SHIPPER *******************************//
  on(ShippersActions.postShipper, (state, { newShipper }) => ({
    ...state,
    shipper: newShipper,
    loaded: false,
    error: null
  })),
  on(ShippersActions.postShipperSuccess, (state, { shipper }) => ({
    ...state,
    shipper,
    loaded: true,
    error: null
  })),
  on(ShippersActions.postShipperFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT SHIPPER *******************************//
  on(ShippersActions.putShipper, (state, { putShipper }) => ({
    ...state,
    shipper: putShipper,
    loaded: false,
    error: null
  })),
  on(ShippersActions.putShipperSuccess, (state, { shipper }) => ({
    ...state,
    shipper,
    loaded: true,
    error: null
  })),
  on(ShippersActions.putShipperFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE SHIPPER ****************************//
  on(ShippersActions.deleteShipper, (state, { delShipper }) => ({
    ...state,
    shipper: delShipper,
    loaded: false,
    error: null
  })),
  on(ShippersActions.deleteShipperSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(ShippersActions.deleteShipperFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  }))
);

export function shippersReducer(
  state: ShippersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
