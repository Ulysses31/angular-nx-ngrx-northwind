import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ORDERS_FEATURE_KEY,
  OrdersState,
  ordersAdapter
} from './orders.reducer';

// Lookup the 'Orders' feature state managed by NgRx
export const getOrdersState = createFeatureSelector<OrdersState>(
  ORDERS_FEATURE_KEY
);

const { selectAll, selectEntities } = ordersAdapter.getSelectors();

export const getOrdersLoaded = createSelector(
  getOrdersState,
  (state: OrdersState) => state.loaded
);

export const getOrdersError = createSelector(
  getOrdersState,
  (state: OrdersState) => state.error
);

export const getAllOrders = createSelector(
  getOrdersState,
  (state: OrdersState) => selectAll(state)
);

export const getOrdersEntities = createSelector(
  getOrdersState,
  (state: OrdersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getOrdersState,
  (state: OrdersState) => state.selectedId
);

export const getSelected = createSelector(
  getOrdersEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId ? entities[selectedId] : undefined
);
