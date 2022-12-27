import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as SuppliersActions from './suppliers.actions';
import { SuppliersEffects } from './suppliers.effects';

describe('SuppliersEffects', () => {
  let actions: Observable<Action>;
  let effects: SuppliersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SuppliersEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(SuppliersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SuppliersActions.initSuppliers() });

      const expected = hot('-a-|', {
        a: SuppliersActions.loadSuppliersSuccess({ suppliers: [] })
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
