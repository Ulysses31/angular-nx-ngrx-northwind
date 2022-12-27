import { RegionsEntity } from './regions.models';
import {
  regionsAdapter,
  RegionsPartialState,
  initialRegionsState
} from './regions.reducer';
import * as RegionsSelectors from './regions.selectors';

describe('Regions Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRegionsId = (it: RegionsEntity) => it.id;
  const createRegionsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as RegionsEntity);

  let state: RegionsPartialState;

  beforeEach(() => {
    state = {
      regions: regionsAdapter.setAll(
        [
          createRegionsEntity('PRODUCT-AAA'),
          createRegionsEntity('PRODUCT-BBB'),
          createRegionsEntity('PRODUCT-CCC')
        ],
        {
          ...initialRegionsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Regions Selectors', () => {
    it('getAllRegions() should return the list of Regions', () => {
      const results = RegionsSelectors.getAllRegions(state);
      const selId = getRegionsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = RegionsSelectors.getSelected(
        state
      ) as RegionsEntity;
      const selId = getRegionsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getRegionsLoaded() should return the current "loaded" status', () => {
      const result = RegionsSelectors.getRegionsLoaded(state);

      expect(result).toBe(true);
    });

    it('getRegionsError() should return the current "error" state', () => {
      const result = RegionsSelectors.getRegionsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
