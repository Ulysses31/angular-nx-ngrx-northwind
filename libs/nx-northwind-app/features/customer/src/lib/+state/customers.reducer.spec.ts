import { Action } from '@ngrx/store';

import * as CustomersActions from './customers.actions';
import { CustomersEntity } from './customers.models';
import {
  customersReducer, CustomersState,
  initialCustomersState
} from './customers.reducer';

describe('Customers Reducer', () => {
  const createCustomersEntity = (
    id: string,
    companyName: string,
    contactName: string,
    contactTitle: string,
    address: string,
    city: string,
    region: string,
    postalCode: string,
    country: string,
    phone: string,
    fax: string
  ): CustomersEntity => ({
    id,
    customerID: id,
    companyName: companyName || `name-${id}`,
    contactName,
    contactTitle,
    address,
    city,
    region,
    postalCode,
    country,
    phone,
    fax
  });

  describe('valid Customers actions', () => {
    it('loadCustomersSuccess should return the list of known Customers', () => {
      const customers = [
        createCustomersEntity(
          '100',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A'
        ),
        createCustomersEntity(
          '101',
          'Test B',
          'Test B',
          'Test B',
          'Test B',
          'Test B',
          'Test B',
          'Test B',
          'Test B',
          'Test B',
          'Test B'
        )
      ];
      const action = CustomersActions.loadCustomersSuccess({
        customers
      });

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.customers.length).toBe(2);
    });
  });

  describe('valid selected customer action', () => {
    it('loadCustomerSuccess should return a Customer', () => {
      const customer = createCustomersEntity(
        '102',
        'Test C',
        'Test C',
        'Test C',
        'Test C',
        'Test C',
        'Test C',
        'Test C',
        'Test C',
        'Test C',
        'Test C'
      );

      const action = CustomersActions.loadCustomerSuccess({
        customer
      });

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.customer).not.toBeNull();
      expect(result.customer.customerID).toMatch('102');
    });
  });

  describe('valid post customer action', () => {
    it('postCustomer should post a Customer', () => {
      const newCustomer = createCustomersEntity(
        '103',
        'Test D',
        'Test D',
        'Test D',
        'Test D',
        'Test D',
        'Test D',
        'Test D',
        'Test D',
        'Test D',
        'Test D'
      );

      const action = CustomersActions.postCustomer({
        newCustomer
      });

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.customer).not.toBeNull();
      expect(result.customer.customerID).toMatch('103');
    });
  });

  describe('valid post success customer action', () => {
    it('postCustomerSuccess should success post a Customer', () => {
      const customer = createCustomersEntity(
        '104',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E'
      );

      const action = CustomersActions.postCustomerSuccess({
        customer
      });

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.customer).not.toBeNull();
      expect(result.customer.customerID).toMatch('104');
    });
  });

  describe('valid put customer action', () => {
    it('putCustomer should put a Customer', () => {
      const putCustomer = createCustomersEntity(
        '104',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E'
      );

      const action = CustomersActions.putCustomer({
        selectedId: '104',
        putCustomer
      });

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.customer).not.toBeNull();
      expect(result.customer.customerID).toMatch('104');
    });
  });

  describe('valid put success customer action', () => {
    it('putCustomerSuccess should success put a Customer', () => {
      const customer = createCustomersEntity(
        '104',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E'
      );

      const action = CustomersActions.putCustomerSuccess({
        customer
      });

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.customer).not.toBeNull();
      expect(result.customer.customerID).toMatch('104');
    });
  });

  describe('valid delete customer action', () => {
    it('deleteCustomer should delete a Customer', () => {
      const delCustomer = createCustomersEntity(
        '104',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E'
      );

      const action = CustomersActions.deleteCustomer({
        delCustomer
      });

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result.customer).not.toBeNull();
      expect(result.customer.customerID).toMatch('104');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = customersReducer(initialCustomersState, action);

      expect(result).toBe(initialCustomersState);
    });
  });
});
