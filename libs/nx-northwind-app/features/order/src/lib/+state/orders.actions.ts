/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { OrderDto } from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT ORDERS *************************************//
export const initOrders = createAction('[Orders Page] Init');

export const loadOrdersSuccess = createAction(
  '[Orders/API] Load Orders Success',
  props<{ orders: OrderDto[] }>()
);

export const loadOrdersFailure = createAction(
  '[Orders/API] Load Orders Failure',
  props<{ error: any }>()
);

// *********** SELECTED ORDER ***********************************//
export const initOrder = createAction(
  '[Order Page] Init',
  props<{ selectedId: string }>()
);

export const loadOrderSuccess = createAction(
  '[Orders/API] Load Order Success',
  props<{ order: OrderDto }>()
);

export const loadOrderFailure = createAction(
  '[Orders/API] Load Order Failure',
  props<{ error: any }>()
);

// *********** POST ORDER **************************************//
export const postOrder = createAction(
  '[Order Page] Post',
  props<{ newOrder: OrderDto }>()
);

export const postOrderSuccess = createAction(
  '[Orders/API] Post Order Success',
  props<{ order: OrderDto }>()
);

export const postOrderFailure = createAction(
  '[Orders/API] Post Order Failure',
  props<{ error: any }>()
);

// *********** PUT ORDER ***************************************//
export const putOrder = createAction(
  '[Order Page] Put',
  props<{ selectedId: string; putOrder: OrderDto }>()
);

export const putOrderSuccess = createAction(
  '[Orders/API] Put Order Success',
  props<{ order: OrderDto }>()
);

export const putOrderFailure = createAction(
  '[Orders/API] Put Order Failure',
  props<{ error: any }>()
);

// *********** DELETE ORDER ************************************//
export const deleteOrder = createAction(
  '[Order Page] Delete',
  props<{ delOrder: OrderDto }>()
);

export const deleteOrderSuccess = createAction(
  '[Orders/API] Delete Order Success'
);

export const deleteOrderFailure = createAction(
  '[Orders/API] Delete Order Failure',
  props<{ error: any }>()
);
