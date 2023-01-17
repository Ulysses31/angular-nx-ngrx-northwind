import { TerritoriesEntity } from './territories.models';
import * as TerritoriesSelectors from './territories.selectors';

describe('Territories Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTerritoriesId = (it: TerritoriesEntity) => it.id;
  const createTerritoriesEntity = (
    id: string,
    territoryDescription: string,
    regionID: string
  ): TerritoriesEntity => ({
    id,
    territoryID: id,
    territoryDescription,
    regionID
  });

  const createTerritoriesState = {
    territories: [
      createTerritoriesEntity('100', 'Test A', '1'),
      createTerritoriesEntity('101', 'Test B', '1')
    ],
    territory: createTerritoriesEntity('103', 'Test C', '1'),
    loaded: true,
    error: ERROR_MSG
  };

  describe('Territories Selectors', () => {
    it('getAllTerritories() should return the list of Territories', () => {
      const results = TerritoriesSelectors.selectAllTerritories({
        territories: createTerritoriesState
      });
      const selId = getTerritoriesId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected Territory', () => {
      const result = TerritoriesSelectors.selectTerritory({
        territories: createTerritoriesState
      });
      const selId = getTerritoriesId(result);
      expect(selId).toBe('103');
    });

    it('getTerritoriesLoaded() should return the current "loaded" status', () => {
      const result = TerritoriesSelectors.selectTerritoriesLoaded({
        territories: createTerritoriesState
      });

      expect(result).toBe(true);
    });

    it('getTerritoriesError() should return the current "error" state', () => {
      const result = TerritoriesSelectors.selectTerritoriesError({
        territories: createTerritoriesState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
