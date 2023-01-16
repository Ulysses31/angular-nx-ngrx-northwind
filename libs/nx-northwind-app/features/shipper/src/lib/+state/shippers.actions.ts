/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { ShipperDto } from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT SHIPPERS *************************************//
export const initShippers = createAction('[Shippers Page] Init');

export const loadShippersSuccess = createAction(
  '[Shippers/API] Load Shippers Success',
  props<{ shippers: ShipperDto[] }>()
);

export const loadShippersFailure = createAction(
  '[Shippers/API] Load Shippers Failure',
  props<{ error: any }>()
);

// *********** SELECTED SHIPPER ***********************************//
export const initShipper = createAction(
  '[Shipper Page] Init',
  props<{ selectedId: string }>()
);

export const loadShipperSuccess = createAction(
  '[Shippers/API] Load Shipper Success',
  props<{ shipper: ShipperDto }>()
);

export const loadShipperFailure = createAction(
  '[Shippers/API] Load Shipper Failure',
  props<{ error: any }>()
);

// *********** POST SHIPPER **************************************//
export const postShipper = createAction(
  '[Shipper Page] Post',
  props<{ newShipper: ShipperDto }>()
);

export const postShipperSuccess = createAction(
  '[Shippers/API] Post Shipper Success',
  props<{ shipper: ShipperDto }>()
);

export const postShipperFailure = createAction(
  '[Shippers/API] Post Shipper Failure',
  props<{ error: any }>()
);

// *********** PUT SHIPPER ***************************************//
export const putShipper = createAction(
  '[Shipper Page] Put',
  props<{ selectedId: string; putShipper: ShipperDto }>()
);

export const putShipperSuccess = createAction(
  '[Shippers/API] Put Shipper Success',
  props<{ shipper: ShipperDto }>()
);

export const putShipperFailure = createAction(
  '[Shippers/API] Put Shipper Failure',
  props<{ error: any }>()
);

// *********** DELETE SHIPPER ************************************//
export const deleteShipper = createAction(
  '[Shipper Page] Delete',
  props<{ delShipper: ShipperDto }>()
);

export const deleteShipperSuccess = createAction(
  '[Shippers/API] Delete Shipper Success'
);

export const deleteShipperFailure = createAction(
  '[Shippers/API] Delete Shipper Failure',
  props<{ error: any }>()
);
