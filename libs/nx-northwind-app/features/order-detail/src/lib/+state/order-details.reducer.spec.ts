import { Action } from '@ngrx/store';

import * as OrderDetailsActions from './order-details.actions';
import { OrderDetailsEntity } from './order-details.models';
import {
  initialOrderDetailsState,
  orderDetailsReducer,
  OrderDetailsState
} from './order-details.reducer';

describe('OrderDetails Reducer', () => {
  const createOrderDetailsEntity = (
    id: string,
    productID: string,
    unitPrice: number,
    quantity: number,
    discount: number
  ): OrderDetailsEntity => ({
    id,
    orderID: id,
    productID,
    unitPrice,
    quantity,
    discount
  });

  describe('valid OrderDetails actions', () => {
    it('loadOrderDetailsSuccess should return the list of known OrderDetails', () => {
      const orderDetails = [
        createOrderDetailsEntity('100', '1', 0, 0, 0),
        createOrderDetailsEntity('101', '1', 0, 0, 0)
      ];
      const action = OrderDetailsActions.loadOrderDetailsSuccess({
        orderDetails
      });

      const result: OrderDetailsState = orderDetailsReducer(
        initialOrderDetailsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.orderDetails.length).toBe(2);
    });
  });

  describe('valid selected orderDetail action', () => {
    it('loadOrderDetailSuccess should return a OrderDetail', () => {
      const orderDetail = createOrderDetailsEntity(
        '102',
        '1',
        0,
        0,
        0
      );

      const action = OrderDetailsActions.loadOrderDetailSuccess({
        orderDetail
      });

      const result: OrderDetailsState = orderDetailsReducer(
        initialOrderDetailsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.orderDetail).not.toBeNull();
      expect(result.orderDetail.orderDetailID).toMatch('102');
    });
  });

  describe('valid post orderDetail action', () => {
    it('postOrderDetail should post a OrderDetail', () => {
      const newOrderDetail = createOrderDetailsEntity(
        '103',
        '1',
        0,
        0,
        0
      );

      const action = OrderDetailsActions.postOrderDetail({
        newOrderDetail
      });

      const result: OrderDetailsState = orderDetailsReducer(
        initialOrderDetailsState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.orderDetail).not.toBeNull();
      expect(result.orderDetail.orderDetailID).toMatch('103');
    });
  });

  describe('valid post success orderDetail action', () => {
    it('postOrderDetailSuccess should success post a OrderDetail', () => {
      const orderDetail = createOrderDetailsEntity(
        '104',
        '1',
        0,
        0,
        0
      );

      const action = OrderDetailsActions.postOrderDetailSuccess({
        orderDetail
      });

      const result: OrderDetailsState = orderDetailsReducer(
        initialOrderDetailsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.orderDetail).not.toBeNull();
      expect(result.orderDetail.orderDetailID).toMatch('104');
    });
  });

  describe('valid put orderDetail action', () => {
    it('putOrderDetail should put a OrderDetail', () => {
      const putOrderDetail = createOrderDetailsEntity(
        '104',
        '1',
        0,
        0,
        0
      );

      const action = OrderDetailsActions.putOrderDetail({
        selectedId: '104',
        putOrderDetail
      });

      const result: OrderDetailsState = orderDetailsReducer(
        initialOrderDetailsState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.orderDetail).not.toBeNull();
      expect(result.orderDetail.orderDetailID).toMatch('104');
    });
  });

  describe('valid put success orderDetail action', () => {
    it('putOrderDetailSuccess should success put a OrderDetail', () => {
      const orderDetail = createOrderDetailsEntity(
        '104',
        '1',
        0,
        0,
        0
      );

      const action = OrderDetailsActions.putOrderDetailSuccess({
        orderDetail
      });

      const result: OrderDetailsState = orderDetailsReducer(
        initialOrderDetailsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.orderDetail).not.toBeNull();
      expect(result.orderDetail.orderDetailID).toMatch('104');
    });
  });

  describe('valid delete orderDetail action', () => {
    it('deleteOrderDetail should delete a OrderDetail', () => {
      const delOrderDetail = createOrderDetailsEntity(
        '104',
        '1',
        0,
        0,
        0
      );

      const action = OrderDetailsActions.deleteOrderDetail({
        delOrderDetail
      });

      const result: OrderDetailsState = orderDetailsReducer(
        initialOrderDetailsState,
        action
      );

      expect(result.orderDetail).not.toBeNull();
      expect(result.orderDetail.orderDetailID).toMatch('104');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = orderDetailsReducer(
        initialOrderDetailsState,
        action
      );

      expect(result).toBe(initialOrderDetailsState);
    });
  });
});
