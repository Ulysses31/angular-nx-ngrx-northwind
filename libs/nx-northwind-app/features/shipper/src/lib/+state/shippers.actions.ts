import { createAction, props } from '@ngrx/store';
import { ShippersEntity } from './shippers.models';

export const initShippers = createAction('[Shippers Page] Init');

export const loadShippersSuccess = createAction(
  '[Shippers/API] Load Shippers Success',
  props<{ shippers: ShippersEntity[] }>()
);

export const loadShippersFailure = createAction(
  '[Shippers/API] Load Shippers Failure',
  props<{ error: any }>()
);
