import { createAction, props } from '@ngrx/store';
import { OrderDetailsEntity } from './order-details.models';

export const initOrderDetails = createAction(
  '[OrderDetails Page] Init'
);

export const loadOrderDetailsSuccess = createAction(
  '[OrderDetails/API] Load OrderDetails Success',
  props<{ orderDetails: OrderDetailsEntity[] }>()
);

export const loadOrderDetailsFailure = createAction(
  '[OrderDetails/API] Load OrderDetails Failure',
  props<{ error: any }>()
);
