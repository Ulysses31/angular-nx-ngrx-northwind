import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CustomersActions from './customers.actions';
import { CustomersEffects } from './customers.effects';

describe('CustomersEffects', () => {
  let effects: CustomersEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        CustomersEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(CustomersEffects);
  });

  describe('initCustomers$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: CustomersActions.initCustomers()
      });
      const expected = hot('', {
        a: CustomersActions.loadCustomersSuccess({ customers: [] })
      });
      expect(effects.initCustomers$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: CustomersActions.initCustomers()
      });
      const expected = hot('-a-|', {
        a: CustomersActions.loadCustomersFailure({
          error: 'Failed'
        })
      });
      expect(effects.initCustomers$).not.toBeObservable(expected);
    });
  });

  describe('initCustomer$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: CustomersActions.initCustomer({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: CustomersActions.loadCustomerSuccess({
          customer: {
            customerID: '100',
            companyName: 'Test A',
            contactName: 'Test A',
            contactTitle: 'Test A',
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            phone: 'Test A',
            fax: 'Test A'
          }
        })
      });
      expect(effects.initCustomers$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: CustomersActions.initCustomer({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: CustomersActions.loadCustomerFailure({
          error: 'Failed'
        })
      });
      expect(effects.initCustomer$).toBeObservable(expected);
    });
  });

  describe('postCustomer$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: CustomersActions.postCustomer({
          newCustomer: {
            customerID: '105',
            companyName: 'New Test A',
            contactName: 'New Test A',
            contactTitle: 'New Test A',
            address: 'New Test A',
            city: 'New Test A',
            region: 'New Test A',
            postalCode: 'New Test A',
            country: 'New Test A',
            phone: 'New Test A',
            fax: 'New Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: CustomersActions.postCustomerSuccess({
          customer: {
            customerID: '105',
            companyName: 'New Test A',
            contactName: 'New Test A',
            contactTitle: 'New Test A',
            address: 'New Test A',
            city: 'New Test A',
            region: 'New Test A',
            postalCode: 'New Test A',
            country: 'New Test A',
            phone: 'New Test A',
            fax: 'New Test A'
          }
        })
      });
      expect(effects.postCustomer$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: CustomersActions.postCustomer({
          newCustomer: {
            customerID: '105',
            companyName: 'New Test A',
            contactName: 'New Test A',
            contactTitle: 'New Test A',
            address: 'New Test A',
            city: 'New Test A',
            region: 'New Test A',
            postalCode: 'New Test A',
            country: 'New Test A',
            phone: 'New Test A',
            fax: 'New Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: CustomersActions.postCustomerFailure({
          error: 'Failed'
        })
      });
      expect(effects.initCustomer$).toBeObservable(expected);
    });
  });

  describe('putCustomer$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: CustomersActions.putCustomer({
          selectedId: '110',
          putCustomer: {
            customerID: '110',
            companyName: 'Update Test A',
            contactName: 'Update Test A',
            contactTitle: 'Update Test A',
            address: 'Update Test A',
            city: 'Update Test A',
            region: 'Update Test A',
            postalCode: 'Update Test A',
            country: 'Update Test A',
            phone: 'Update Test A',
            fax: 'Update Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: CustomersActions.putCustomerSuccess({
          customer: {
            customerID: '110',
            companyName: 'Update Test A',
            contactName: 'Update Test A',
            contactTitle: 'Update Test A',
            address: 'Update Test A',
            city: 'Update Test A',
            region: 'Update Test A',
            postalCode: 'Update Test A',
            country: 'Update Test A',
            phone: 'Update Test A',
            fax: 'Update Test A'
          }
        })
      });
      expect(effects.putCustomer$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: CustomersActions.putCustomer({
          selectedId: '110',
          putCustomer: {
            customerID: '110',
            companyName: 'Update Test A',
            contactName: 'Update Test A',
            contactTitle: 'Update Test A',
            address: 'Update Test A',
            city: 'Update Test A',
            region: 'Update Test A',
            postalCode: 'Update Test A',
            country: 'Update Test A',
            phone: 'Update Test A',
            fax: 'Update Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: CustomersActions.putCustomerFailure({
          error: 'Failed'
        })
      });
      expect(effects.putCustomer$).toBeObservable(expected);
    });
  });

  describe('deleteCustomer$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: CustomersActions.deleteCustomer({
          delCustomer: {
            customerID: '110',
            companyName: 'Delete Test A',
            contactName: 'Delete Test A',
            contactTitle: 'Delete Test A',
            address: 'Delete Test A',
            city: 'Delete Test A',
            region: 'Delete Test A',
            postalCode: 'Delete Test A',
            country: 'Delete Test A',
            phone: 'Delete Test A',
            fax: 'Delete Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: CustomersActions.deleteCustomerSuccess()
      });
      expect(effects.deleteCustomer$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: CustomersActions.deleteCustomer({
          delCustomer: {
            customerID: '110',
            companyName: 'Delete Test A',
            contactName: 'Delete Test A',
            contactTitle: 'Delete Test A',
            address: 'Delete Test A',
            city: 'Delete Test A',
            region: 'Delete Test A',
            postalCode: 'Delete Test A',
            country: 'Delete Test A',
            phone: 'Delete Test A',
            fax: 'Delete Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: CustomersActions.deleteCustomerFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteCustomer$).toBeObservable(expected);
    });
  });
});
