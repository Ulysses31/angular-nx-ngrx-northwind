import { OrdersEntity } from './orders.models';
import {
  ordersAdapter,
  OrdersPartialState,
  initialOrdersState
} from './orders.reducer';
import * as OrdersSelectors from './orders.selectors';

describe('Orders Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getOrdersId = (it: OrdersEntity) => it.id;
  const createOrdersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as OrdersEntity);

  let state: OrdersPartialState;

  beforeEach(() => {
    state = {
      orders: ordersAdapter.setAll(
        [
          createOrdersEntity('PRODUCT-AAA'),
          createOrdersEntity('PRODUCT-BBB'),
          createOrdersEntity('PRODUCT-CCC')
        ],
        {
          ...initialOrdersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Orders Selectors', () => {
    it('getAllOrders() should return the list of Orders', () => {
      const results = OrdersSelectors.getAllOrders(state);
      const selId = getOrdersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = OrdersSelectors.getSelected(
        state
      ) as OrdersEntity;
      const selId = getOrdersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getOrdersLoaded() should return the current "loaded" status', () => {
      const result = OrdersSelectors.getOrdersLoaded(state);

      expect(result).toBe(true);
    });

    it('getOrdersError() should return the current "error" state', () => {
      const result = OrdersSelectors.getOrdersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
