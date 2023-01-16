import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TerritoriesActions from './territories.actions';
import { TerritoriesEffects } from './territories.effects';

describe('TerritoriesEffects', () => {
  let effects: TerritoriesEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        TerritoriesEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(TerritoriesEffects);
  });

  describe('initTerritories$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: TerritoriesActions.initTerritories()
      });
      const expected = hot('', {
        a: TerritoriesActions.loadTerritoriesSuccess({
          territories: []
        })
      });
      expect(effects.initTerritories$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: TerritoriesActions.initTerritories()
      });
      const expected = hot('-a-|', {
        a: TerritoriesActions.loadTerritoriesFailure({
          error: 'Failed'
        })
      });
      expect(effects.initTerritories$).not.toBeObservable(expected);
    });
  });

  describe('initTerritory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: TerritoriesActions.initTerritory({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: TerritoriesActions.loadTerritorySuccess({
          territory: {
            territoryID: '100',
            territoryDescription: 'Test A',
            regionID: '1'
          }
        })
      });
      expect(effects.initTerritories$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: TerritoriesActions.initTerritory({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: TerritoriesActions.loadTerritoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.initTerritory$).toBeObservable(expected);
    });
  });

  describe('postTerritory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: TerritoriesActions.postTerritory({
          newTerritory: {
            territoryID: '105',
            territoryDescription: 'Test A',
            regionID: '1'
          }
        })
      });
      const expected = hot('---|', {
        a: TerritoriesActions.postTerritorySuccess({
          territory: {
            territoryID: '105',
            territoryDescription: 'Test A',
            regionID: '1'
          }
        })
      });
      expect(effects.postTerritory$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: TerritoriesActions.postTerritory({
          newTerritory: {
            territoryID: '105',
            territoryDescription: 'Test A',
            regionID: '1'
          }
        })
      });
      const expected = hot('---|', {
        a: TerritoriesActions.postTerritoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.initTerritory$).toBeObservable(expected);
    });
  });

  describe('putTerritory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: TerritoriesActions.putTerritory({
          selectedId: '110',
          putTerritory: {
            territoryID: '110',
            territoryDescription: 'Test A',
            regionID: '1'
          }
        })
      });
      const expected = hot('---|', {
        a: TerritoriesActions.putTerritorySuccess({
          territory: {
            territoryID: '110',
            territoryDescription: 'Test A',
            regionID: '1'
          }
        })
      });
      expect(effects.putTerritory$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: TerritoriesActions.putTerritory({
          selectedId: '110',
          putTerritory: {
            territoryID: '110',
            territoryDescription: 'Test A',
            regionID: '1'
          }
        })
      });
      const expected = hot('---|', {
        a: TerritoriesActions.putTerritoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.putTerritory$).toBeObservable(expected);
    });
  });

  describe('deleteTerritory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: TerritoriesActions.deleteTerritory({
          delTerritory: {
            territoryID: '110',
            territoryDescription: 'Test A',
            regionID: '1'
          }
        })
      });
      const expected = hot('---|', {
        a: TerritoriesActions.deleteTerritorySuccess()
      });
      expect(effects.deleteTerritory$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: TerritoriesActions.deleteTerritory({
          delTerritory: {
            territoryID: '110',
            territoryDescription: 'Test A',
            regionID: '1'
          }
        })
      });
      const expected = hot('---|', {
        a: TerritoriesActions.deleteTerritoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteTerritory$).toBeObservable(expected);
    });
  });
});
