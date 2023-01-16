import { Action } from '@ngrx/store';

import * as RegionsActions from './regions.actions';
import { RegionsEntity } from './regions.models';
import {
  initialRegionsState,
  regionsReducer,
  RegionsState
} from './regions.reducer';

describe('Regions Reducer', () => {
  const createRegionsEntity = (
    id: string,
    regionDescription: string
  ): RegionsEntity => ({
    id,
    regionID: id,
    regionDescription
  });

  describe('valid Regions actions', () => {
    it('loadRegionsSuccess should return the list of known Regions', () => {
      const regions = [
        createRegionsEntity('100', 'Test A'),
        createRegionsEntity('101', 'Test B')
      ];
      const action = RegionsActions.loadRegionsSuccess({
        regions
      });

      const result: RegionsState = regionsReducer(
        initialRegionsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.regions.length).toBe(2);
    });
  });

  describe('valid selected region action', () => {
    it('loadRegionSuccess should return a Region', () => {
      const region = createRegionsEntity('102', 'Test A');

      const action = RegionsActions.loadRegionSuccess({
        region
      });

      const result: RegionsState = regionsReducer(
        initialRegionsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.region).not.toBeNull();
      expect(result.region.regionID).toMatch('102');
    });
  });

  describe('valid post region action', () => {
    it('postRegion should post a Region', () => {
      const newRegion = createRegionsEntity('103', 'Test A');

      const action = RegionsActions.postRegion({
        newRegion
      });

      const result: RegionsState = regionsReducer(
        initialRegionsState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.region).not.toBeNull();
      expect(result.region.regionID).toMatch('103');
    });
  });

  describe('valid post success region action', () => {
    it('postRegionSuccess should success post a Region', () => {
      const region = createRegionsEntity('104', 'Test A');

      const action = RegionsActions.postRegionSuccess({
        region
      });

      const result: RegionsState = regionsReducer(
        initialRegionsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.region).not.toBeNull();
      expect(result.region.regionID).toMatch('104');
    });
  });

  describe('valid put region action', () => {
    it('putRegion should put a Region', () => {
      const putRegion = createRegionsEntity('104', 'Test A');

      const action = RegionsActions.putRegion({
        selectedId: '104',
        putRegion
      });

      const result: RegionsState = regionsReducer(
        initialRegionsState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.region).not.toBeNull();
      expect(result.region.regionID).toMatch('104');
    });
  });

  describe('valid put success region action', () => {
    it('putRegionSuccess should success put a Region', () => {
      const region = createRegionsEntity('104', 'Test A');

      const action = RegionsActions.putRegionSuccess({
        region
      });

      const result: RegionsState = regionsReducer(
        initialRegionsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.region).not.toBeNull();
      expect(result.region.regionID).toMatch('104');
    });
  });

  describe('valid delete region action', () => {
    it('deleteRegion should delete a Region', () => {
      const delRegion = createRegionsEntity('104', 'Test A');

      const action = RegionsActions.deleteRegion({
        delRegion
      });

      const result: RegionsState = regionsReducer(
        initialRegionsState,
        action
      );

      expect(result.region).not.toBeNull();
      expect(result.region.regionID).toMatch('104');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = regionsReducer(initialRegionsState, action);

      expect(result).toBe(initialRegionsState);
    });
  });
});
