import { CustomersEntity } from './customers.models';
import {
  customersAdapter,
  CustomersPartialState,
  initialCustomersState
} from './customers.reducer';
import * as CustomersSelectors from './customers.selectors';

describe('Customers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCustomersId = (it: CustomersEntity) => it.id;
  const createCustomersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as CustomersEntity);

  let state: CustomersPartialState;

  beforeEach(() => {
    state = {
      customers: customersAdapter.setAll(
        [
          createCustomersEntity('PRODUCT-AAA'),
          createCustomersEntity('PRODUCT-BBB'),
          createCustomersEntity('PRODUCT-CCC')
        ],
        {
          ...initialCustomersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Customers Selectors', () => {
    it('getAllCustomers() should return the list of Customers', () => {
      const results = CustomersSelectors.getAllCustomers(state);
      const selId = getCustomersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CustomersSelectors.getSelected(
        state
      ) as CustomersEntity;
      const selId = getCustomersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getCustomersLoaded() should return the current "loaded" status', () => {
      const result = CustomersSelectors.getCustomersLoaded(state);

      expect(result).toBe(true);
    });

    it('getCustomersError() should return the current "error" state', () => {
      const result = CustomersSelectors.getCustomersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
