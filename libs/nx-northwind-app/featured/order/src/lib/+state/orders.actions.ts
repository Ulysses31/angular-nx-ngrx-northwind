/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import {
  OrderBrowserDto,
  OrderLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT ORDERS *************************************//
export const initOrders = createAction('[Orders Page] Init');

export const loadOrdersSuccess = createAction(
  '[Orders/API] Load Orders Success',
  props<{ orders: OrderBrowserDto[] }>()
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
  props<{ order: OrderLoaderDto }>()
);

export const loadOrderFailure = createAction(
  '[Orders/API] Load Order Failure',
  props<{ error: any }>()
);

// *********** POST ORDER **************************************//
export const postOrder = createAction(
  '[Order Page] Post',
  props<{ newOrder: OrderLoaderDto }>()
);

export const postOrderSuccess = createAction(
  '[Orders/API] Post Order Success',
  props<{ order: OrderLoaderDto }>()
);

export const postOrderFailure = createAction(
  '[Orders/API] Post Order Failure',
  props<{ error: any }>()
);

// *********** PUT ORDER ***************************************//
export const putOrder = createAction(
  '[Order Page] Put',
  props<{ selectedId: string; putOrder: OrderLoaderDto }>()
);

export const putOrderSuccess = createAction(
  '[Orders/API] Put Order Success',
  props<{ order: OrderLoaderDto }>()
);

export const putOrderFailure = createAction(
  '[Orders/API] Put Order Failure',
  props<{ error: any }>()
);

// *********** DELETE ORDER ************************************//
export const deleteOrder = createAction(
  '[Order Page] Delete',
  props<{ delOrder: OrderLoaderDto }>()
);

export const deleteOrderSuccess = createAction(
  '[Orders/API] Delete Order Success'
);

export const deleteOrderFailure = createAction(
  '[Orders/API] Delete Order Failure',
  props<{ error: any }>()
);
