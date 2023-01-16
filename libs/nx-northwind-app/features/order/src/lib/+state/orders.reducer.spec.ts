import { Action } from '@ngrx/store';

import * as OrdersActions from './orders.actions';
import { OrdersEntity } from './orders.models';
import {
  initialOrdersState,
  ordersReducer,
  OrdersState
} from './orders.reducer';

describe('Orders Reducer', () => {
  const createOrdersEntity = (
    id: string,
    orderID: string,
    customerID: string,
    employeeID: string,
    orderDate: Date,
    requiredDate: Date,
    shippedDate: Date,
    shipVia: string,
    freight: string,
    shipName: string,
    shipAddress: string,
    shipCity: string,
    shipRegion: string,
    shipPostalCode: string,
    shipCountry: string
  ): OrdersEntity => ({
    id,
    orderID: id,
    customerID,
    employeeID,
    orderDate,
    requiredDate,
    shippedDate,
    shipVia,
    freight,
    shipName,
    shipAddress,
    shipCity,
    shipRegion,
    shipPostalCode,
    shipCountry
  });

  describe('valid Orders actions', () => {
    it('loadOrdersSuccess should return the list of known Orders', () => {
      const orders = [
        createOrdersEntity(
          '100',
          '1',
          '2',
          'Test A',
          new Date(),
          new Date(),
          new Date(),
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A'
        ),
        createOrdersEntity(
          '101',
          '1',
          '2',
          'Test B',
          new Date(),
          new Date(),
          new Date(),
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
      const action = OrdersActions.loadOrdersSuccess({
        orders
      });

      const result: OrdersState = ordersReducer(
        initialOrdersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.orders.length).toBe(2);
    });
  });

  describe('valid selected order action', () => {
    it('loadOrderSuccess should return a Order', () => {
      const order = createOrdersEntity(
        '102',
        '1',
        '2',
        'Test C',
        new Date(),
        new Date(),
        new Date(),
        'Test C',
        'Test C',
        'Test C',
        'Test C',
        'Test C',
        'Test C',
        'Test C',
        'Test C'
      );

      const action = OrdersActions.loadOrderSuccess({
        order
      });

      const result: OrdersState = ordersReducer(
        initialOrdersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.order).not.toBeNull();
      expect(result.order.orderID).toMatch('102');
    });
  });

  describe('valid post order action', () => {
    it('postOrder should post a Order', () => {
      const newOrder = createOrdersEntity(
        '103',
        '1',
        '2',
        'Test D',
        new Date(),
        new Date(),
        new Date(),
        'Test D',
        'Test D',
        'Test D',
        'Test D',
        'Test D',
        'Test D',
        'Test D',
        'Test D'
      );

      const action = OrdersActions.postOrder({
        newOrder
      });

      const result: OrdersState = ordersReducer(
        initialOrdersState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.order).not.toBeNull();
      expect(result.order.orderID).toMatch('103');
    });
  });

  describe('valid post success order action', () => {
    it('postOrderSuccess should success post a Order', () => {
      const order = createOrdersEntity(
        '104',
        '1',
        '2',
        'Test E',
        new Date(),
        new Date(),
        new Date(),
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E',
        'Test E'
      );

      const action = OrdersActions.postOrderSuccess({
        order
      });

      const result: OrdersState = ordersReducer(
        initialOrdersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.order).not.toBeNull();
      expect(result.order.orderID).toMatch('104');
    });
  });

  describe('valid put order action', () => {
    it('putOrder should put a Order', () => {
      const putOrder = createOrdersEntity(
        '104',
        '1',
        '2',
        'Test F',
        new Date(),
        new Date(),
        new Date(),
        'Test F',
        'Test F',
        'Test F',
        'Test F',
        'Test F',
        'Test F',
        'Test F',
        'Test F'
      );

      const action = OrdersActions.putOrder({
        selectedId: '104',
        putOrder
      });

      const result: OrdersState = ordersReducer(
        initialOrdersState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.order).not.toBeNull();
      expect(result.order.orderID).toMatch('104');
    });
  });

  describe('valid put success order action', () => {
    it('putOrderSuccess should success put a Order', () => {
      const order = createOrdersEntity(
        '104',
        '1',
        '2',
        'Test G',
        new Date(),
        new Date(),
        new Date(),
        'Test G',
        'Test G',
        'Test G',
        'Test G',
        'Test G',
        'Test G',
        'Test G',
        'Test G'
      );

      const action = OrdersActions.putOrderSuccess({
        order
      });

      const result: OrdersState = ordersReducer(
        initialOrdersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.order).not.toBeNull();
      expect(result.order.orderID).toMatch('104');
    });
  });

  describe('valid delete order action', () => {
    it('deleteOrder should delete a Order', () => {
      const delOrder = createOrdersEntity(
        '104',
        '1',
        '2',
        'Test G',
        new Date(),
        new Date(),
        new Date(),
        'Test G',
        'Test G',
        'Test G',
        'Test G',
        'Test G',
        'Test G',
        'Test G',
        'Test G'
      );

      const action = OrdersActions.deleteOrder({
        delOrder
      });

      const result: OrdersState = ordersReducer(
        initialOrdersState,
        action
      );

      expect(result.order).not.toBeNull();
      expect(result.order.orderID).toMatch('104');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = ordersReducer(initialOrdersState, action);

      expect(result).toBe(initialOrdersState);
    });
  });
});
