import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState, ORDERS_FEATURE_KEY } from './orders.reducer';

export const selectOrdersState = createFeatureSelector<OrdersState>(
  ORDERS_FEATURE_KEY
);

export const selectOrdersLoaded = createSelector(
  selectOrdersState,
  (state: OrdersState) => {
    return state.loaded;
  }
);

export const selectOrdersError = createSelector(
  selectOrdersState,
  (state: OrdersState) => {
    return state.error;
  }
);

export const selectAllOrders = createSelector(
  selectOrdersState,
  (state: OrdersState) => {
    return state.orders;
  }
);

export const selectOrder = createSelector(
  selectOrdersState,
  (state: OrdersState) => {
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
