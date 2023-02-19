import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  OrdersMasterDetailState,
  ORDERS_MASTER_DETAIL_FEATURE_KEY
} from './orders-master-detail.reducer';

export const selectOrdersMasterDetailState =
  createFeatureSelector<OrdersMasterDetailState>(
    ORDERS_MASTER_DETAIL_FEATURE_KEY
  );

//##########  ORDERS ###############################//
export const selectOrdersLoaded = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.loaded;
  }
);

export const selectOrdersError = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.error;
  }
);

export const selectAllOrders = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.orders;
  }
);

export const selectOrder = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.order;
  }
);

// export const selectSelectedOrder = createSelector(
//   selectAllOrders,
//   selectSelectedId,
//   (categories, selectedId) =>
//     selectedId
//       ? categories.find((item) => item.id === selectedId)
//       : undefined
// );

//##########  ORDER DETAILS ###############################//
export const selectOrderDetailsLoaded = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.loaded;
  }
);

export const selectOrderDetailsError = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.error;
  }
);

export const selectAllOrderDetails = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.orderDetails;
  }
);

export const selectOrderDetail = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.orderDetail;
  }
);

//##########  EMPLOYEES - CUSTOMERS - SHIPPERS - REGIONS - PRODUCTS ###########//
export const selectAllOrderEmployees = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.employees;
  }
);

export const selectAllOrderCustomers = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.customers;
  }
);

export const selectAllOrderShippers = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.shippers;
  }
);

export const selectAllOrderProducts = createSelector(
  selectOrdersMasterDetailState,
  (state: OrdersMasterDetailState) => {
    return state.products;
  }
);
