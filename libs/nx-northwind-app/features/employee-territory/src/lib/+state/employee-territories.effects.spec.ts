import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as EmployeeTerritoriesActions from './employee-territories.actions';
import { EmployeeTerritoriesEffects } from './employee-territories.effects';

describe('EmployeeTerritoriesEffects', () => {
  let actions: Observable<Action>;
  let effects: EmployeeTerritoriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        EmployeeTerritoriesEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(EmployeeTerritoriesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: EmployeeTerritoriesActions.initEmployeeTerritories()
      });

      const expected = hot('-a-|', {
        a: EmployeeTerritoriesActions.loadEmployeeTerritoriesSuccess({
          employeeTerritories: []
        })
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
