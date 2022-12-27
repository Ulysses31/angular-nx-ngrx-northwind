import { OrderDetailsEntity } from './order-details.models';
import {
  orderDetailsAdapter,
  OrderDetailsPartialState,
  initialOrderDetailsState
} from './order-details.reducer';
import * as OrderDetailsSelectors from './order-details.selectors';

describe('OrderDetails Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getOrderDetailsId = (it: OrderDetailsEntity) => it.id;
  const createOrderDetailsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as OrderDetailsEntity);

  let state: OrderDetailsPartialState;

  beforeEach(() => {
    state = {
      orderDetails: orderDetailsAdapter.setAll(
        [
          createOrderDetailsEntity('PRODUCT-AAA'),
          createOrderDetailsEntity('PRODUCT-BBB'),
          createOrderDetailsEntity('PRODUCT-CCC')
        ],
        {
          ...initialOrderDetailsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('OrderDetails Selectors', () => {
    it('getAllOrderDetails() should return the list of OrderDetails', () => {
      const results = OrderDetailsSelectors.getAllOrderDetails(state);
      const selId = getOrderDetailsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = OrderDetailsSelectors.getSelected(
        state
      ) as OrderDetailsEntity;
      const selId = getOrderDetailsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getOrderDetailsLoaded() should return the current "loaded" status', () => {
      const result =
        OrderDetailsSelectors.getOrderDetailsLoaded(state);

      expect(result).toBe(true);
    });

    it('getOrderDetailsError() should return the current "error" state', () => {
      const result =
        OrderDetailsSelectors.getOrderDetailsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
