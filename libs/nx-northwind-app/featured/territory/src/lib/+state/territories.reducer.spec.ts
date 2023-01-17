import { Action } from '@ngrx/store';

import * as TerritoriesActions from './territories.actions';
import { TerritoriesEntity } from './territories.models';
import {
  initialTerritoriesState,
  territoriesReducer,
  TerritoriesState
} from './territories.reducer';

describe('Territories Reducer', () => {
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

  describe('valid Territories actions', () => {
    it('loadTerritoriesSuccess should return the list of known Territories', () => {
      const territories = [
        createTerritoriesEntity('100', 'Test A', '1'),
        createTerritoriesEntity('101', 'Test A', '1')
      ];
      const action = TerritoriesActions.loadTerritoriesSuccess({
        territories
      });

      const result: TerritoriesState = territoriesReducer(
        initialTerritoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.territories.length).toBe(2);
    });
  });

  describe('valid selected territory action', () => {
    it('loadTerritorySuccess should return a Territory', () => {
      const territory = createTerritoriesEntity('102', 'Test A', '1');

      const action = TerritoriesActions.loadTerritorySuccess({
        territory
      });

      const result: TerritoriesState = territoriesReducer(
        initialTerritoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.territory).not.toBeNull();
      expect(result.territory.territoryID).toMatch('102');
    });
  });

  describe('valid post territory action', () => {
    it('postTerritory should post a Territory', () => {
      const newTerritory = createTerritoriesEntity(
        '103',
        'Test A',
        '1'
      );

      const action = TerritoriesActions.postTerritory({
        newTerritory
      });

      const result: TerritoriesState = territoriesReducer(
        initialTerritoriesState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.territory).not.toBeNull();
      expect(result.territory.territoryID).toMatch('103');
    });
  });

  describe('valid post success territory action', () => {
    it('postTerritorySuccess should success post a Territory', () => {
      const territory = createTerritoriesEntity('104', 'Test A', '1');

      const action = TerritoriesActions.postTerritorySuccess({
        territory
      });

      const result: TerritoriesState = territoriesReducer(
        initialTerritoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.territory).not.toBeNull();
      expect(result.territory.territoryID).toMatch('104');
    });
  });

  describe('valid put territory action', () => {
    it('putTerritory should put a Territory', () => {
      const putTerritory = createTerritoriesEntity(
        '104',
        'Test A',
        '1'
      );

      const action = TerritoriesActions.putTerritory({
        selectedId: '104',
        putTerritory
      });

      const result: TerritoriesState = territoriesReducer(
        initialTerritoriesState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.territory).not.toBeNull();
      expect(result.territory.territoryID).toMatch('104');
    });
  });

  describe('valid put success territory action', () => {
    it('putTerritorySuccess should success put a Territory', () => {
      const territory = createTerritoriesEntity('104', 'Test A', '1');

      const action = TerritoriesActions.putTerritorySuccess({
        territory
      });

      const result: TerritoriesState = territoriesReducer(
        initialTerritoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.territory).not.toBeNull();
      expect(result.territory.territoryID).toMatch('104');
    });
  });

  describe('valid delete territory action', () => {
    it('deleteTerritory should delete a Territory', () => {
      const delTerritory = createTerritoriesEntity(
        '104',
        'Test A',
        '1'
      );

      const action = TerritoriesActions.deleteTerritory({
        delTerritory
      });

      const result: TerritoriesState = territoriesReducer(
        initialTerritoriesState,
        action
      );

      expect(result.territory).not.toBeNull();
      expect(result.territory.territoryID).toMatch('104');
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
