import { Action } from '@ngrx/store';

import * as TerritoriesActions from './territories.actions';
import { TerritoriesEntity } from './territories.models';
import {
  TerritoriesState,
  initialTerritoriesState,
  territoriesReducer
} from './territories.reducer';

describe('Territories Reducer', () => {
  const createTerritoriesEntity = (
    id: string,
    name = ''
  ): TerritoriesEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid Territories actions', () => {
    it('loadTerritoriesSuccess should return the list of known Territories', () => {
      const territories = [
        createTerritoriesEntity('PRODUCT-AAA'),
        createTerritoriesEntity('PRODUCT-zzz')
      ];
      const action = TerritoriesActions.loadTerritoriesSuccess({
        territories
      });

      const result: TerritoriesState = territoriesReducer(
        initialTerritoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = territoriesReducer(
        initialTerritoriesState,
        action
      );

      expect(result).toBe(initialTerritoriesState);
    });
  });
});
