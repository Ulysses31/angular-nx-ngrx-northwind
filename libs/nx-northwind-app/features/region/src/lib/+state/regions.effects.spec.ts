import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as RegionsActions from './regions.actions';
import { RegionsEffects } from './regions.effects';

describe('RegionsEffects', () => {
  let actions: Observable<Action>;
  let effects: RegionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RegionsEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(RegionsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RegionsActions.initRegions() });

      const expected = hot('-a-|', {
        a: RegionsActions.loadRegionsSuccess({ regions: [] })
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
