/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { OrderDetailDto } from '@nx-northwind/nx-northwind-app/entities';

import * as OrderDetailsActions from './order-details.actions';

export const ORDER_DETAILS_FEATURE_KEY = 'orderDetails';

export interface OrderDetailsState {
  orderDetails: OrderDetailDto[];
  orderDetail: OrderDetailDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialOrderDetailsState: OrderDetailsState = {
  orderDetails: [],
  orderDetail: null,
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialOrderDetailsState,
  // *********** INIT ORDER DETAILS ******************************//
  on(OrderDetailsActions.initOrderDetails, (state) => ({
    ...state,
    orderDetail: null,
    loaded: false,
    error: null
  })),
  on(
    OrderDetailsActions.loadOrderDetailsSuccess,
    (state, { orderDetails }) => ({
      ...state,
      orderDetails,
      orderDetail: null,
      loaded: true,
      error: null
    })
  ),
  on(
    OrderDetailsActions.loadOrderDetailsFailure,
    (state, { error }) => ({
      ...state,
      orderDetails: [],
      orderDetail: null,
      loaded: true,
      error
    })
  ),
  // *********** SELECTED ORDER DETAIL ****************************//
  on(OrderDetailsActions.initOrderDetail, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    OrderDetailsActions.loadOrderDetailSuccess,
    (state, { orderDetail }) => ({
      ...state,
      orderDetail,
      loaded: true,
      error: null
    })
  ),
  on(
    OrderDetailsActions.loadOrderDetailFailure,
    (state, { error }) => ({
      ...state,
      orderDetail: null,
      loaded: true,
      error
    })
  ),
  // *********** POST ORDER DETAIL *******************************//
  on(
    OrderDetailsActions.postOrderDetail,
    (state, { newOrderDetail }) => ({
      ...state,
      orderDetail: newOrderDetail,
      loaded: false,
      error: null
    })
  ),
  on(
    OrderDetailsActions.postOrderDetailSuccess,
    (state, { orderDetail }) => ({
      ...state,
      orderDetail,
      loaded: true,
      error: null
    })
  ),
  on(
    OrderDetailsActions.postOrderDetailFailure,
    (state, { error }) => ({
      ...state,
      loaded: true,
      error
    })
  ),
  // *********** PUT ORDER DETAIL *******************************//
  on(
    OrderDetailsActions.putOrderDetail,
    (state, { putOrderDetail }) => ({
      ...state,
      orderDetail: putOrderDetail,
      loaded: false,
      error: null
    })
  ),
  on(
    OrderDetailsActions.putOrderDetailSuccess,
    (state, { orderDetail }) => ({
      ...state,
      orderDetail,
      loaded: true,
      error: null
    })
  ),
  on(
    OrderDetailsActions.putOrderDetailFailure,
    (state, { error }) => ({
      ...state,
      loaded: true,
      error
    })
  ),
  // *********** DELETE ORDER DETAIL ****************************//
  on(
    OrderDetailsActions.deleteOrderDetail,
    (state, { delOrderDetail }) => ({
      ...state,
      orderDetail: delOrderDetail,
      loaded: false,
      error: null
    })
  ),
  on(OrderDetailsActions.deleteOrderDetailSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(
    OrderDetailsActions.deleteOrderDetailFailure,
    (state, { error }) => ({
      ...state,
      loaded: true,
      error
    })
  )
);

export function orderDetailsReducer(
  state: OrderDetailsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
