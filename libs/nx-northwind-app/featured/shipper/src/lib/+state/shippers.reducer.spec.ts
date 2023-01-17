import { Action } from '@ngrx/store';

import * as ShippersActions from './shippers.actions';
import { ShippersEntity } from './shippers.models';
import {
  initialShippersState,
  shippersReducer,
  ShippersState
} from './shippers.reducer';

describe('Shippers Reducer', () => {
  const createShippersEntity = (
    id: string,
    companyName: string,
    phone: string
  ): ShippersEntity => ({
    id,
    shipperID: id,
    companyName: companyName || `name-${id}`,
    phone
  });

  describe('valid Shippers actions', () => {
    it('loadShippersSuccess should return the list of known Shippers', () => {
      const shippers = [
        createShippersEntity('100', 'Test A', 'Test A'),
        createShippersEntity('101', 'Test B', 'Test B')
      ];
      const action = ShippersActions.loadShippersSuccess({
        shippers
      });

      const result: ShippersState = shippersReducer(
        initialShippersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.shippers.length).toBe(2);
    });
  });

  describe('valid selected shipper action', () => {
    it('loadShipperSuccess should return a Shipper', () => {
      const shipper = createShippersEntity('102', 'Test A', 'Test A');

      const action = ShippersActions.loadShipperSuccess({
        shipper
      });

      const result: ShippersState = shippersReducer(
        initialShippersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.shipper).not.toBeNull();
      expect(result.shipper.shipperID).toMatch('102');
    });
  });

  describe('valid post shipper action', () => {
    it('postShipper should post a Shipper', () => {
      const newShipper = createShippersEntity(
        '103',
        'Test A',
        'Test A'
      );

      const action = ShippersActions.postShipper({
        newShipper
      });

      const result: ShippersState = shippersReducer(
        initialShippersState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.shipper).not.toBeNull();
      expect(result.shipper.shipperID).toMatch('103');
    });
  });

  describe('valid post success shipper action', () => {
    it('postShipperSuccess should success post a Shipper', () => {
      const shipper = createShippersEntity('104', 'Test A', 'Test A');

      const action = ShippersActions.postShipperSuccess({
        shipper
      });

      const result: ShippersState = shippersReducer(
        initialShippersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.shipper).not.toBeNull();
      expect(result.shipper.shipperID).toMatch('104');
    });
  });

  describe('valid put shipper action', () => {
    it('putShipper should put a Shipper', () => {
      const putShipper = createShippersEntity(
        '104',
        'Test A',
        'Test A'
      );

      const action = ShippersActions.putShipper({
        selectedId: '104',
        putShipper
      });

      const result: ShippersState = shippersReducer(
        initialShippersState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.shipper).not.toBeNull();
      expect(result.shipper.shipperID).toMatch('104');
    });
  });

  describe('valid put success shipper action', () => {
    it('putShipperSuccess should success put a Shipper', () => {
      const shipper = createShippersEntity('104', 'Test A', 'Test A');

      const action = ShippersActions.putShipperSuccess({
        shipper
      });

      const result: ShippersState = shippersReducer(
        initialShippersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.shipper).not.toBeNull();
      expect(result.shipper.shipperID).toMatch('104');
    });
  });

  describe('valid delete shipper action', () => {
    it('deleteShipper should delete a Shipper', () => {
      const delShipper = createShippersEntity(
        '104',
        'Test A',
        'Test A'
      );

      const action = ShippersActions.deleteShipper({
        delShipper
      });

      const result: ShippersState = shippersReducer(
        initialShippersState,
        action
      );

      expect(result.shipper).not.toBeNull();
      expect(result.shipper.shipperID).toMatch('104');
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
