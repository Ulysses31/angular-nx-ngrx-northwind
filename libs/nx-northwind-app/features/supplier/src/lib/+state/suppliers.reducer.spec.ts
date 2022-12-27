import { Action } from '@ngrx/store';

import * as SuppliersActions from './suppliers.actions';
import { SuppliersEntity } from './suppliers.models';
import {
  SuppliersState,
  initialSuppliersState,
  suppliersReducer
} from './suppliers.reducer';

describe('Suppliers Reducer', () => {
  const createSuppliersEntity = (
    id: string,
    name = ''
  ): SuppliersEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid Suppliers actions', () => {
    it('loadSuppliersSuccess should return the list of known Suppliers', () => {
      const suppliers = [
        createSuppliersEntity('PRODUCT-AAA'),
        createSuppliersEntity('PRODUCT-zzz')
      ];
      const action = SuppliersActions.loadSuppliersSuccess({
        suppliers
      });

      const result: SuppliersState = suppliersReducer(
        initialSuppliersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = suppliersReducer(initialSuppliersState, action);

      expect(result).toBe(initialSuppliersState);
    });
  });
});
