/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { OrderDetailDto } from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT ORDER DETAILS *************************************//
export const initOrderDetails = createAction(
  '[OrderDetails Page] Init'
);

export const loadOrderDetailsSuccess = createAction(
  '[OrderDetails/API] Load OrderDetails Success',
  props<{ orderDetails: OrderDetailDto[] }>()
);

export const loadOrderDetailsFailure = createAction(
  '[OrderDetails/API] Load OrderDetails Failure',
  props<{ error: any }>()
);

// *********** SELECTED ORDER DETAIL ***********************************//
export const initOrderDetail = createAction(
  '[OrderDetail Page] Init',
  props<{ selectedId: string }>()
);

export const loadOrderDetailSuccess = createAction(
  '[OrderDetails/API] Load OrderDetail Success',
  props<{ orderDetail: OrderDetailDto }>()
);

export const loadOrderDetailFailure = createAction(
  '[OrderDetails/API] Load OrderDetail Failure',
  props<{ error: any }>()
);

// *********** POST ORDER DETAIL **************************************//
export const postOrderDetail = createAction(
  '[OrderDetail Page] Post',
  props<{ newOrderDetail: OrderDetailDto }>()
);

export const postOrderDetailSuccess = createAction(
  '[OrderDetails/API] Post OrderDetail Success',
  props<{ orderDetail: OrderDetailDto }>()
);

export const postOrderDetailFailure = createAction(
  '[OrderDetails/API] Post OrderDetail Failure',
  props<{ error: any }>()
);

// *********** PUT ORDER DETAIL ***************************************//
export const putOrderDetail = createAction(
  '[OrderDetail Page] Put',
  props<{ selectedId: string; putOrderDetail: OrderDetailDto }>()
);

export const putOrderDetailSuccess = createAction(
  '[OrderDetails/API] Put OrderDetail Success',
  props<{ orderDetail: OrderDetailDto }>()
);

export const putOrderDetailFailure = createAction(
  '[OrderDetails/API] Put OrderDetail Failure',
  props<{ error: any }>()
);

// *********** DELETE ORDER DETAIL ************************************//
export const deleteOrderDetail = createAction(
  '[OrderDetail Page] Delete',
  props<{ delOrderDetail: OrderDetailDto }>()
);

export const deleteOrderDetailSuccess = createAction(
  '[OrderDetails/API] Delete OrderDetail Success'
);

export const deleteOrderDetailFailure = createAction(
  '[OrderDetails/API] Delete OrderDetail Failure',
  props<{ error: any }>()
);
