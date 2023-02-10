/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import {
  OrderDetailBrowserDto,
  OrderDetailLoaderDto,
  OrderMasterDetailBrowserDto,
  OrderMasterDetailLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

import * as OrdersActions from './orders-master-detail.actions';

export const ORDERS_MASTER_DETAIL_FEATURE_KEY = 'ordersMasterDetail';

export interface OrdersMasterDetailState {
  orders: OrderMasterDetailBrowserDto[];
  order: OrderMasterDetailLoaderDto | any;
  orderDetails: OrderDetailBrowserDto[];
  orderDetail: OrderDetailLoaderDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialOrdersState: OrdersMasterDetailState = {
  orders: [],
  order: null,
  orderDetails: [],
  orderDetail: null,
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialOrdersState,
  // *********** INIT ORDERS ******************************//
  on(OrdersActions.initOrders, (state) => ({
    ...state,
    order: null,
    orderDetails: [],
    orderDetail: null,
    loaded: false,
    error: null
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    order: null,
    orderDetails: [],
    orderDetail: null,
    loaded: true,
    error: null
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    orders: [],
    order: null,
    orderDetails: [],
    orderDetail: null,
    loaded: true,
    error
  })),
  // *********** SELECTED ORDER ****************************//
  on(OrdersActions.initOrder, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(OrdersActions.loadOrderSuccess, (state, { order }) => ({
    ...state,
    order,
    loaded: true,
    error: null
  })),
  on(OrdersActions.loadOrderFailure, (state, { error }) => ({
    ...state,
    order: null,
    loaded: true,
    error
  })),
  // *********** POST ORDER *******************************//
  on(OrdersActions.postOrder, (state, { newOrder }) => ({
    ...state,
    order: newOrder,
    loaded: false,
    error: null
  })),
  on(OrdersActions.postOrderSuccess, (state, { order }) => ({
    ...state,
    order,
    loaded: true,
    error: null
  })),
  on(OrdersActions.postOrderFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT ORDER *******************************//
  on(OrdersActions.putOrder, (state, { putOrder }) => ({
    ...state,
    order: putOrder,
    loaded: false,
    error: null
  })),
  on(OrdersActions.putOrderSuccess, (state, { order }) => ({
    ...state,
    order,
    loaded: true,
    error: null
  })),
  on(OrdersActions.putOrderFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE ORDER ****************************//
  on(OrdersActions.deleteOrder, (state, { delOrder }) => ({
    ...state,
    order: delOrder,
    loaded: false,
    error: null
  })),
  on(OrdersActions.deleteOrderSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(OrdersActions.deleteOrderFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),

  // *********** INIT ORDER DETAILS ******************************//
  on(OrdersActions.initOrderDetails, (state) => ({
    ...state,
    orderDetail: null,
    loaded: false,
    error: null
  })),
  on(
    OrdersActions.loadOrderDetailsSuccess,
    (state, { orderDetails }) => ({
      ...state,
      orderDetails,
      orderDetail: null,
      loaded: true,
      error: null
    })
  ),
  on(OrdersActions.loadOrderDetailsFailure, (state, { error }) => ({
    ...state,
    orderDetails: [],
    orderDetail: null,
    loaded: true,
    error
  })),
  // *********** SELECTED ORDER DETAIL ****************************//
  on(OrdersActions.initOrderDetail, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    OrdersActions.loadOrderDetailSuccess,
    (state, { orderDetail }) => ({
      ...state,
      orderDetail,
      loaded: true,
      error: null
    })
  ),
  on(OrdersActions.loadOrderDetailFailure, (state, { error }) => ({
    ...state,
    orderDetail: null,
    loaded: true,
    error
  })),
  // *********** POST ORDER DETAIL *******************************//
  on(OrdersActions.postOrderDetail, (state, { newOrderDetail }) => ({
    ...state,
    orderDetail: newOrderDetail,
    loaded: false,
    error: null
  })),
  on(
    OrdersActions.postOrderDetailSuccess,
    (state, { orderDetail }) => ({
      ...state,
      orderDetail,
      loaded: true,
      error: null
    })
  ),
  on(OrdersActions.postOrderDetailFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT ORDER DETAIL *******************************//
  on(OrdersActions.putOrderDetail, (state, { putOrderDetail }) => ({
    ...state,
    orderDetail: putOrderDetail,
    loaded: false,
    error: null
  })),
  on(
    OrdersActions.putOrderDetailSuccess,
    (state, { orderDetail }) => ({
      ...state,
      orderDetail,
      loaded: true,
      error: null
    })
  ),
  on(OrdersActions.putOrderDetailFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE ORDER DETAIL ****************************//
  on(
    OrdersActions.deleteOrderDetail,
    (state, { delOrderDetail }) => ({
      ...state,
      orderDetail: delOrderDetail,
      loaded: false,
      error: null
    })
  ),
  on(OrdersActions.deleteOrderDetailSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(OrdersActions.deleteOrderDetailFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  }))
);

export function ordersMasterDetailReducer(
  state: OrdersMasterDetailState | undefined,
  action: Action
) {
  return reducer(state, action);
}
