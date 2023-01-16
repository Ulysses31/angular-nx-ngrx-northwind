import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as EmployeeTerritoriesActions from './employee-territories.actions';
import { EmployeeTerritoriesEffects } from './employee-territories.effects';

describe('EmployeeTerritoriesEffects', () => {
  let effects: EmployeeTerritoriesEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        EmployeeTerritoriesEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(EmployeeTerritoriesEffects);
  });

  describe('initEmployeeTerritories$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: EmployeeTerritoriesActions.initEmployeeTerritories()
      });
      const expected = hot('', {
        a: EmployeeTerritoriesActions.loadEmployeeTerritoriesSuccess({
          employeeTerritories: []
        })
      });
      expect(effects.initEmployeeTerritories$).toBeObservable(
        expected
      );
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: EmployeeTerritoriesActions.initEmployeeTerritories()
      });
      const expected = hot('-a-|', {
        a: EmployeeTerritoriesActions.loadEmployeeTerritoriesFailure({
          error: 'Failed'
        })
      });
      expect(effects.initEmployeeTerritories$).not.toBeObservable(
        expected
      );
    });
  });

  describe('initEmployeeTerritory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: EmployeeTerritoriesActions.initEmployeeTerritory({
          selectedId: '100'
        })
      });
      const expected = hot('---|', {
        a: EmployeeTerritoriesActions.loadEmployeeTerritorySuccess({
          employeeTerritory: {
            id: '100',
            employeeID: '1',
            territoryID: '2'
          }
        })
      });
      expect(effects.initEmployeeTerritories$).toBeObservable(
        expected
      );
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: EmployeeTerritoriesActions.initEmployeeTerritory({
          selectedId: '100'
        })
      });
      const expected = hot('---|', {
        a: EmployeeTerritoriesActions.loadEmployeeTerritoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.initEmployeeTerritory$).toBeObservable(expected);
    });
  });

  describe('postEmployeeTerritory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: EmployeeTerritoriesActions.postEmployeeTerritory({
          newEmployeeTerritory: {
            id: '105',
            employeeID: '1',
            territoryID: '2'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeeTerritoriesActions.postEmployeeTerritorySuccess({
          employeeTerritory: {
            id: '105',
            employeeID: '1',
            territoryID: '2'
          }
        })
      });
      expect(effects.postEmployeeTerritory$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: EmployeeTerritoriesActions.postEmployeeTerritory({
          newEmployeeTerritory: {
            id: '105',
            employeeID: '1',
            territoryID: '2'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeeTerritoriesActions.postEmployeeTerritoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.initEmployeeTerritory$).toBeObservable(expected);
    });
  });

  describe('putEmployeeTerritory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: EmployeeTerritoriesActions.putEmployeeTerritory({
          selectedId: '110',
          putEmployeeTerritory: {
            id: '110',
            employeeID: '1',
            territoryID: '2'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeeTerritoriesActions.putEmployeeTerritorySuccess({
          employeeTerritory: {
            id: '110',
            employeeID: '1',
            territoryID: '2'
          }
        })
      });
      expect(effects.putEmployeeTerritory$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: EmployeeTerritoriesActions.putEmployeeTerritory({
          selectedId: '110',
          putEmployeeTerritory: {
            id: '110',
            employeeID: '1',
            territoryID: '2'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeeTerritoriesActions.putEmployeeTerritoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.putEmployeeTerritory$).toBeObservable(expected);
    });
  });

  describe('deleteEmployeeTerritory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: EmployeeTerritoriesActions.deleteEmployeeTerritory({
          delEmployeeTerritory: {
            id: '110',
            employeeID: '1',
            territoryID: '2'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeeTerritoriesActions.deleteEmployeeTerritorySuccess()
      });
      expect(effects.deleteEmployeeTerritory$).toBeObservable(
        expected
      );
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: EmployeeTerritoriesActions.deleteEmployeeTerritory({
          delEmployeeTerritory: {
            id: '110',
            employeeID: '1',
            territoryID: '2'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeeTerritoriesActions.deleteEmployeeTerritoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteEmployeeTerritory$).toBeObservable(
        expected
      );
    });
  });
});
