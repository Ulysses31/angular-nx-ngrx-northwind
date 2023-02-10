/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import {
  OrderBrowserDto,
  OrderLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

import * as OrdersActions from './orders.actions';

export const ORDERS_FEATURE_KEY = 'orders';

export interface OrdersState {
  orders: OrderBrowserDto[];
  order: OrderLoaderDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialOrdersState: OrdersState = {
  orders: [],
  order: null,
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialOrdersState,
  // *********** INIT CATEGORIES ******************************//
  on(OrdersActions.initOrders, (state) => ({
    ...state,
    order: null,
    loaded: false,
    error: null
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    order: null,
    loaded: true,
    error: null
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    orders: [],
    order: null,
    loaded: true,
    error
  })),
  // *********** SELECTED CATEGORY ****************************//
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
  // *********** POST CATEGORY *******************************//
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
  // *********** PUT CATEGORY *******************************//
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
  // *********** DELETE CATEGORY ****************************//
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
  }))
);

export function ordersReducer(
  state: OrdersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
