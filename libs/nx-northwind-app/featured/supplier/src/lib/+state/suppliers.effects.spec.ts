import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as SuppliersActions from './suppliers.actions';
import { SuppliersEffects } from './suppliers.effects';

describe('SuppliersEffects', () => {
  let effects: SuppliersEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        SuppliersEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(SuppliersEffects);
  });

  describe('initSuppliers$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: SuppliersActions.initSuppliers()
      });
      const expected = hot('', {
        a: SuppliersActions.loadSuppliersSuccess({ suppliers: [] })
      });
      expect(effects.initSuppliers$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: SuppliersActions.initSuppliers()
      });
      const expected = hot('-a-|', {
        a: SuppliersActions.loadSuppliersFailure({
          error: 'Failed'
        })
      });
      expect(effects.initSuppliers$).not.toBeObservable(expected);
    });
  });

  describe('initSupplier$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: SuppliersActions.initSupplier({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: SuppliersActions.loadSupplierSuccess({
          supplier: {
            id: '100',
            companyName: 'Test A',
            contactName: 'Test A',
            contactTitle: 'Test A',
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            phone: 'Test A',
            fax: 'Test A',
            homePage: 'Test A'
          }
        })
      });
      expect(effects.initSuppliers$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: SuppliersActions.initSupplier({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: SuppliersActions.loadSupplierFailure({
          error: 'Failed'
        })
      });
      expect(effects.initSupplier$).toBeObservable(expected);
    });
  });

  describe('postSupplier$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: SuppliersActions.postSupplier({
          newSupplier: {
            id: '105',
            companyName: 'Test A',
            contactName: 'Test A',
            contactTitle: 'Test A',
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            phone: 'Test A',
            fax: 'Test A',
            homePage: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: SuppliersActions.postSupplierSuccess({
          supplier: {
            id: '105',
            companyName: 'Test A',
            contactName: 'Test A',
            contactTitle: 'Test A',
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            phone: 'Test A',
            fax: 'Test A',
            homePage: 'Test A'
          }
        })
      });
      expect(effects.postSupplier$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: SuppliersActions.postSupplier({
          newSupplier: {
            id: '105',
            companyName: 'Test A',
            contactName: 'Test A',
            contactTitle: 'Test A',
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            phone: 'Test A',
            fax: 'Test A',
            homePage: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: SuppliersActions.postSupplierFailure({
          error: 'Failed'
        })
      });
      expect(effects.initSupplier$).toBeObservable(expected);
    });
  });

  describe('putSupplier$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: SuppliersActions.putSupplier({
          selectedId: '110',
          putSupplier: {
            id: '110',
            companyName: 'Test A',
            contactName: 'Test A',
            contactTitle: 'Test A',
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            phone: 'Test A',
            fax: 'Test A',
            homePage: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: SuppliersActions.putSupplierSuccess({
          supplier: {
            id: '110',
            companyName: 'Test A',
            contactName: 'Test A',
            contactTitle: 'Test A',
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            phone: 'Test A',
            fax: 'Test A',
            homePage: 'Test A'
          }
        })
      });
      expect(effects.putSupplier$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: SuppliersActions.putSupplier({
          selectedId: '110',
          putSupplier: {
            id: '110',
            companyName: 'Test A',
            contactName: 'Test A',
            contactTitle: 'Test A',
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            phone: 'Test A',
            fax: 'Test A',
            homePage: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: SuppliersActions.putSupplierFailure({
          error: 'Failed'
        })
      });
      expect(effects.putSupplier$).toBeObservable(expected);
    });
  });

  describe('deleteSupplier$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: SuppliersActions.deleteSupplier({
          delSupplier: {
            id: '110',
            companyName: 'Test A',
            contactName: 'Test A',
            contactTitle: 'Test A',
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            phone: 'Test A',
            fax: 'Test A',
            homePage: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: SuppliersActions.deleteSupplierSuccess()
      });
      expect(effects.deleteSupplier$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: SuppliersActions.deleteSupplier({
          delSupplier: {
            id: '110',
            companyName: 'Test A',
            contactName: 'Test A',
            contactTitle: 'Test A',
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            phone: 'Test A',
            fax: 'Test A',
            homePage: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: SuppliersActions.deleteSupplierFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteSupplier$).toBeObservable(expected);
    });
  });
});
