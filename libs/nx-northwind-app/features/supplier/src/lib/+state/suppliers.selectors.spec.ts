import { SuppliersEntity } from './suppliers.models';
import {
  suppliersAdapter,
  SuppliersPartialState,
  initialSuppliersState
} from './suppliers.reducer';
import * as SuppliersSelectors from './suppliers.selectors';

describe('Suppliers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSuppliersId = (it: SuppliersEntity) => it.id;
  const createSuppliersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as SuppliersEntity);

  let state: SuppliersPartialState;

  beforeEach(() => {
    state = {
      suppliers: suppliersAdapter.setAll(
        [
          createSuppliersEntity('PRODUCT-AAA'),
          createSuppliersEntity('PRODUCT-BBB'),
          createSuppliersEntity('PRODUCT-CCC')
        ],
        {
          ...initialSuppliersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Suppliers Selectors', () => {
    it('getAllSuppliers() should return the list of Suppliers', () => {
      const results = SuppliersSelectors.getAllSuppliers(state);
      const selId = getSuppliersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SuppliersSelectors.getSelected(
        state
      ) as SuppliersEntity;
      const selId = getSuppliersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSuppliersLoaded() should return the current "loaded" status', () => {
      const result = SuppliersSelectors.getSuppliersLoaded(state);

      expect(result).toBe(true);
    });

    it('getSuppliersError() should return the current "error" state', () => {
      const result = SuppliersSelectors.getSuppliersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
