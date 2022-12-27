import { ShippersEntity } from './shippers.models';
import {
  shippersAdapter,
  ShippersPartialState,
  initialShippersState
} from './shippers.reducer';
import * as ShippersSelectors from './shippers.selectors';

describe('Shippers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getShippersId = (it: ShippersEntity) => it.id;
  const createShippersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ShippersEntity);

  let state: ShippersPartialState;

  beforeEach(() => {
    state = {
      shippers: shippersAdapter.setAll(
        [
          createShippersEntity('PRODUCT-AAA'),
          createShippersEntity('PRODUCT-BBB'),
          createShippersEntity('PRODUCT-CCC')
        ],
        {
          ...initialShippersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Shippers Selectors', () => {
    it('getAllShippers() should return the list of Shippers', () => {
      const results = ShippersSelectors.getAllShippers(state);
      const selId = getShippersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ShippersSelectors.getSelected(
        state
      ) as ShippersEntity;
      const selId = getShippersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getShippersLoaded() should return the current "loaded" status', () => {
      const result = ShippersSelectors.getShippersLoaded(state);

      expect(result).toBe(true);
    });

    it('getShippersError() should return the current "error" state', () => {
      const result = ShippersSelectors.getShippersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
