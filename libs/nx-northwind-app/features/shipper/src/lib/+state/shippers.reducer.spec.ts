import { Action } from '@ngrx/store';

import * as ShippersActions from './shippers.actions';
import { ShippersEntity } from './shippers.models';
import {
  ShippersState,
  initialShippersState,
  shippersReducer
} from './shippers.reducer';

describe('Shippers Reducer', () => {
  const createShippersEntity = (
    id: string,
    name = ''
  ): ShippersEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid Shippers actions', () => {
    it('loadShippersSuccess should return the list of known Shippers', () => {
      const shippers = [
        createShippersEntity('PRODUCT-AAA'),
        createShippersEntity('PRODUCT-zzz')
      ];
      const action = ShippersActions.loadShippersSuccess({
        shippers
      });

      const result: ShippersState = shippersReducer(
        initialShippersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = shippersReducer(initialShippersState, action);

      expect(result).toBe(initialShippersState);
    });
  });
});
