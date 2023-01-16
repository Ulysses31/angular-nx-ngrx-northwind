import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  OrderDetailsState,
  ORDER_DETAILS_FEATURE_KEY
} from './order-details.reducer';

export const selectOrderDetailsState =
  createFeatureSelector<OrderDetailsState>(ORDER_DETAILS_FEATURE_KEY);

export const selectOrderDetailsLoaded = createSelector(
  selectOrderDetailsState,
  (state: OrderDetailsState) => {
    return state.loaded;
  }
);

export const selectOrderDetailsError = createSelector(
  selectOrderDetailsState,
  (state: OrderDetailsState) => {
    return state.error;
  }
);

export const selectAllOrderDetails = createSelector(
  selectOrderDetailsState,
  (state: OrderDetailsState) => {
    return state.orderDetails;
  }
);

export const selectOrderDetail = createSelector(
  selectOrderDetailsState,
  (state: OrderDetailsState) => {
    return state.orderDetail;
  }
);

// export const selectSelectedOrderDetail = createSelector(
//   selectAllOrderDetails,
//   selectSelectedId,
//   (orderDetails, selectedId) =>
//     selectedId
//       ? orderDetails.find((item) => item.id === selectedId)
//       : undefined
// );
