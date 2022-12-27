import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TerritoriesActions from './territories.actions';
import { TerritoriesEffects } from './territories.effects';

describe('TerritoriesEffects', () => {
  let actions: Observable<Action>;
  let effects: TerritoriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TerritoriesEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(TerritoriesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: TerritoriesActions.initTerritories()
      });

      const expected = hot('-a-|', {
        a: TerritoriesActions.loadTerritoriesSuccess({
          territories: []
        })
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
