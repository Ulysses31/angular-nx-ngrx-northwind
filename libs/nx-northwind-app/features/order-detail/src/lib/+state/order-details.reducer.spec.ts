import { Action } from '@ngrx/store';

import * as OrderDetailsActions from './order-details.actions';
import { OrderDetailsEntity } from './order-details.models';
import {
  OrderDetailsState,
  initialOrderDetailsState,
  orderDetailsReducer
} from './order-details.reducer';

describe('OrderDetails Reducer', () => {
  const createOrderDetailsEntity = (
    id: string,
    name = ''
  ): OrderDetailsEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid OrderDetails actions', () => {
    it('loadOrderDetailsSuccess should return the list of known OrderDetails', () => {
      const orderDetails = [
        createOrderDetailsEntity('PRODUCT-AAA'),
        createOrderDetailsEntity('PRODUCT-zzz')
      ];
      const action = OrderDetailsActions.loadOrderDetailsSuccess({
        orderDetails
      });

      const result: OrderDetailsState = orderDetailsReducer(
        initialOrderDetailsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = orderDetailsReducer(
        initialOrderDetailsState,
        action
      );

      expect(result).toBe(initialOrderDetailsState);
    });
  });
});
