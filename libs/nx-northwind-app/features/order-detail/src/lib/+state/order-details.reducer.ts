import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as OrderDetailsActions from './order-details.actions';
import { OrderDetailsEntity } from './order-details.models';

export const ORDER_DETAILS_FEATURE_KEY = 'orderDetails';

export interface OrderDetailsState
  extends EntityState<OrderDetailsEntity> {
  selectedId?: string | number; // which OrderDetails record has been selected
  loaded: boolean; // has the OrderDetails list been loaded
  error?: string | null; // last known error (if any)
}

export interface OrderDetailsPartialState {
  readonly [ORDER_DETAILS_FEATURE_KEY]: OrderDetailsState;
}

export const orderDetailsAdapter: EntityAdapter<OrderDetailsEntity> =
  createEntityAdapter<OrderDetailsEntity>();

export const initialOrderDetailsState: OrderDetailsState =
  orderDetailsAdapter.getInitialState({
    // set initial required properties
    loaded: false
  });

const reducer = createReducer(
  initialOrderDetailsState,
  on(OrderDetailsActions.initOrderDetails, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    OrderDetailsActions.loadOrderDetailsSuccess,
    (state, { orderDetails }) =>
      orderDetailsAdapter.setAll(orderDetails, {
        ...state,
        loaded: true
      })
  ),
  on(
    OrderDetailsActions.loadOrderDetailsFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function orderDetailsReducer(
  state: OrderDetailsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
