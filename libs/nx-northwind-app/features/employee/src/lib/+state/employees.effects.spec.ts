import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as EmployeesActions from './employees.actions';
import { EmployeesEffects } from './employees.effects';

describe('EmployeesEffects', () => {
  let actions: Observable<Action>;
  let effects: EmployeesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        EmployeesEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(EmployeesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EmployeesActions.initEmployees() });

      const expected = hot('-a-|', {
        a: EmployeesActions.loadEmployeesSuccess({ employees: [] })
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
