import { Action } from '@ngrx/store';

import * as RegionsActions from './regions.actions';
import { RegionsEntity } from './regions.models';
import {
  RegionsState,
  initialRegionsState,
  regionsReducer
} from './regions.reducer';

describe('Regions Reducer', () => {
  const createRegionsEntity = (
    id: string,
    name = ''
  ): RegionsEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid Regions actions', () => {
    it('loadRegionsSuccess should return the list of known Regions', () => {
      const regions = [
        createRegionsEntity('PRODUCT-AAA'),
        createRegionsEntity('PRODUCT-zzz')
      ];
      const action = RegionsActions.loadRegionsSuccess({ regions });

      const result: RegionsState = regionsReducer(
        initialRegionsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
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
