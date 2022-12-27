import { TerritoriesEntity } from './territories.models';
import {
  territoriesAdapter,
  TerritoriesPartialState,
  initialTerritoriesState
} from './territories.reducer';
import * as TerritoriesSelectors from './territories.selectors';

describe('Territories Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTerritoriesId = (it: TerritoriesEntity) => it.id;
  const createTerritoriesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as TerritoriesEntity);

  let state: TerritoriesPartialState;

  beforeEach(() => {
    state = {
      territories: territoriesAdapter.setAll(
        [
          createTerritoriesEntity('PRODUCT-AAA'),
          createTerritoriesEntity('PRODUCT-BBB'),
          createTerritoriesEntity('PRODUCT-CCC')
        ],
        {
          ...initialTerritoriesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Territories Selectors', () => {
    it('getAllTerritories() should return the list of Territories', () => {
      const results = TerritoriesSelectors.getAllTerritories(state);
      const selId = getTerritoriesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = TerritoriesSelectors.getSelected(
        state
      ) as TerritoriesEntity;
      const selId = getTerritoriesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getTerritoriesLoaded() should return the current "loaded" status', () => {
      const result = TerritoriesSelectors.getTerritoriesLoaded(state);

      expect(result).toBe(true);
    });

    it('getTerritoriesError() should return the current "error" state', () => {
      const result = TerritoriesSelectors.getTerritoriesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
