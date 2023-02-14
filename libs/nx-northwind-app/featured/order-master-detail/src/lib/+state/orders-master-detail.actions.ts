/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import {
  OrderDetailBrowserDto,
  OrderDetailLoaderDto,
  OrderMasterDetailBrowserDto,
  OrderMasterDetailLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT ORDERS *************************************//
export const initOrders = createAction('[Orders Page] Init');

export const loadOrdersSuccess = createAction(
  '[Orders/API] Load Orders Success',
  props<{ orders: OrderMasterDetailBrowserDto[] }>()
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
  props<{ order: OrderMasterDetailLoaderDto }>()
);

export const loadOrderFailure = createAction(
  '[Orders/API] Load Order Failure',
  props<{ error: any }>()
);

// *********** POST ORDER **************************************//
export const postOrder = createAction(
  '[Order Page] Post',
  props<{ newOrder: OrderMasterDetailLoaderDto }>()
);

export const postOrderSuccess = createAction(
  '[Orders/API] Post Order Success',
  props<{ order: OrderMasterDetailLoaderDto }>()
);

export const postOrderFailure = createAction(
  '[Orders/API] Post Order Failure',
  props<{ error: any }>()
);

// *********** PUT ORDER ***************************************//
export const putOrder = createAction(
  '[Order Page] Put',
  props<{
    selectedId: string;
    putOrder: OrderMasterDetailLoaderDto;
  }>()
);

export const putOrderSuccess = createAction(
  '[Orders/API] Put Order Success',
  props<{ order: OrderMasterDetailLoaderDto }>()
);

export const putOrderFailure = createAction(
  '[Orders/API] Put Order Failure',
  props<{ error: any }>()
);

// *********** DELETE ORDER ************************************//
export const deleteOrder = createAction(
  '[Order Page] Delete',
  props<{ delOrder: OrderMasterDetailLoaderDto }>()
);

export const deleteOrderSuccess = createAction(
  '[Orders/API] Delete Order Success'
);

export const deleteOrderFailure = createAction(
  '[Orders/API] Delete Order Failure',
  props<{ error: any }>()
);

// *********** INIT ORDER DETAILS *************************************//
export const initOrderDetails = createAction(
  '[OrderDetails Page] Init'
);

export const loadOrderDetailsSuccess = createAction(
  '[OrderDetails/API] Load OrderDetails Success',
  props<{ orderDetails: OrderDetailBrowserDto[] }>()
);

export const loadOrderDetailsFailure = createAction(
  '[OrderDetails/API] Load OrderDetails Failure',
  props<{ error: any }>()
);

// *********** SELECTED ORDERS DETAILS By ORDERID  ********************//
export const initOrderDetailsByOrderId = createAction(
  '[OrderDetail Page] Init By OrderID',
  props<{ selectedOrderId: number }>()
);

export const loadOrderDetailsByOrderIdSuccess = createAction(
  '[OrderDetails/API] Load OrderDetail By OrderID Success',
  props<{ orderDetails: OrderDetailLoaderDto[] }>()
);

export const loadOrderDetailsByOrderIdFailure = createAction(
  '[OrderDetails/API] Load OrderDetail By OrderID Failure',
  props<{ error: any }>()
);

// *********** SELECTED ORDER DETAIL ***********************************//
export const initOrderDetail = createAction(
  '[OrderDetail Page] Init',
  props<{ selectedId: string }>()
);

export const loadOrderDetailSuccess = createAction(
  '[OrderDetails/API] Load OrderDetail Success',
  props<{ orderDetail: OrderDetailLoaderDto }>()
);

export const loadOrderDetailFailure = createAction(
  '[OrderDetails/API] Load OrderDetail Failure',
  props<{ error: any }>()
);

// *********** POST ORDER DETAIL **************************************//
export const postOrderDetail = createAction(
  '[OrderDetail Page] Post',
  props<{ newOrderDetail: OrderDetailLoaderDto }>()
);

export const postOrderDetailSuccess = createAction(
  '[OrderDetails/API] Post OrderDetail Success',
  props<{ orderDetail: OrderDetailLoaderDto }>()
);

export const postOrderDetailFailure = createAction(
  '[OrderDetails/API] Post OrderDetail Failure',
  props<{ error: any }>()
);

// *********** PUT ORDER DETAIL ***************************************//
export const putOrderDetail = createAction(
  '[OrderDetail Page] Put',
  props<{
    selectedId: string;
    putOrderDetail: OrderDetailLoaderDto;
  }>()
);

export const putOrderDetailSuccess = createAction(
  '[OrderDetails/API] Put OrderDetail Success',
  props<{ orderDetail: OrderDetailLoaderDto }>()
);

export const putOrderDetailFailure = createAction(
  '[OrderDetails/API] Put OrderDetail Failure',
  props<{ error: any }>()
);

// *********** DELETE ORDER DETAIL ************************************//
export const deleteOrderDetail = createAction(
  '[OrderDetail Page] Delete',
  props<{ delOrderDetail: OrderDetailLoaderDto }>()
);

export const deleteOrderDetailSuccess = createAction(
  '[OrderDetails/API] Delete OrderDetail Success'
);

export const deleteOrderDetailFailure = createAction(
  '[OrderDetails/API] Delete OrderDetail Failure',
  props<{ error: any }>()
);
