import { RegionsEntity } from './regions.models';
import * as RegionsSelectors from './regions.selectors';

describe('Regions Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRegionsId = (it: RegionsEntity) => it.id;
  const createRegionsEntity = (
    id: string,
    regionDescription: string
  ): RegionsEntity => ({
    id,
    regionID: id,
    regionDescription
  });

  const createRegionsState = {
    regions: [
      createRegionsEntity('100', 'Test A'),
      createRegionsEntity('101', 'Test B')
    ],
    region: createRegionsEntity('103', 'Test C'),
    loaded: true,
    error: ERROR_MSG
  };

  describe('Regions Selectors', () => {
    it('getAllRegions() should return the list of Regions', () => {
      const results = RegionsSelectors.selectAllRegions({
        regions: createRegionsState
      });
      const selId = getRegionsId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected Region', () => {
      const result = RegionsSelectors.selectRegion({
        regions: createRegionsState
      });
      const selId = getRegionsId(result);
      expect(selId).toBe('103');
    });

    it('getRegionsLoaded() should return the current "loaded" status', () => {
      const result = RegionsSelectors.selectRegionsLoaded({
        regions: createRegionsState
      });

      expect(result).toBe(true);
    });

    it('getRegionsError() should return the current "error" state', () => {
      const result = RegionsSelectors.selectRegionsError({
        regions: createRegionsState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
