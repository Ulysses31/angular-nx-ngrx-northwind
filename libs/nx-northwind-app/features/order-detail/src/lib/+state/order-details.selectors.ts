import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ORDER_DETAILS_FEATURE_KEY,
  OrderDetailsState,
  orderDetailsAdapter
} from './order-details.reducer';

// Lookup the 'OrderDetails' feature state managed by NgRx
export const getOrderDetailsState =
  createFeatureSelector<OrderDetailsState>(ORDER_DETAILS_FEATURE_KEY);

const { selectAll, selectEntities } =
  orderDetailsAdapter.getSelectors();

export const getOrderDetailsLoaded = createSelector(
  getOrderDetailsState,
  (state: OrderDetailsState) => state.loaded
);

export const getOrderDetailsError = createSelector(
  getOrderDetailsState,
  (state: OrderDetailsState) => state.error
);

export const getAllOrderDetails = createSelector(
  getOrderDetailsState,
  (state: OrderDetailsState) => selectAll(state)
);

export const getOrderDetailsEntities = createSelector(
  getOrderDetailsState,
  (state: OrderDetailsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getOrderDetailsState,
  (state: OrderDetailsState) => state.selectedId
);

export const getSelected = createSelector(
  getOrderDetailsEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId ? entities[selectedId] : undefined
);
