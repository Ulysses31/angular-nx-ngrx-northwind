import { Action } from '@ngrx/store';

import * as CustomersActions from './customers.actions';
import { CustomersEntity } from './customers.models';
import {
  CustomersState,
  initialCustomersState,
  customersReducer
} from './customers.reducer';

describe('Customers Reducer', () => {
  const createCustomersEntity = (
    id: string,
    name = ''
  ): CustomersEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid Customers actions', () => {
    it('loadCustomersSuccess should return the list of known Customers', () => {
      const customers = [
        createCustomersEntity('PRODUCT-AAA'),
        createCustomersEntity('PRODUCT-zzz')
      ];
      const action = CustomersActions.loadCustomersSuccess({
        customers
      });

      const result: CustomersState = customersReducer(
        initialCustomersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
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
