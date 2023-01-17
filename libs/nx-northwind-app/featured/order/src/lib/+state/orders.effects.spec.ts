import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as OrdersActions from './orders.actions';
import { OrdersEffects } from './orders.effects';

describe('OrdersEffects', () => {
  let effects: OrdersEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        OrdersEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(OrdersEffects);
  });

  describe('initOrders$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: OrdersActions.initOrders()
      });
      const expected = hot('', {
        a: OrdersActions.loadOrdersSuccess({ orders: [] })
      });
      expect(effects.initOrders$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: OrdersActions.initOrders()
      });
      const expected = hot('-a-|', {
        a: OrdersActions.loadOrdersFailure({
          error: 'Failed'
        })
      });
      expect(effects.initOrders$).not.toBeObservable(expected);
    });
  });

  describe('initOrder$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: OrdersActions.initOrder({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: OrdersActions.loadOrderSuccess({
          order: {
            orderID: '100',
            customerID: '1',
            employeeID: '2',
            orderDate: new Date(),
            requiredDate: new Date(),
            shippedDate: new Date(),
            shipVia: 'Test A',
            freight: 'Test A',
            shipName: 'Test A',
            shipAddress: 'Test A',
            shipCity: 'Test A',
            shipRegion: 'Test A',
            shipPostalCode: 'Test A',
            shipCountry: 'Test A'
          }
        })
      });
      expect(effects.initOrders$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: OrdersActions.initOrder({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: OrdersActions.loadOrderFailure({
          error: 'Failed'
        })
      });
      expect(effects.initOrder$).toBeObservable(expected);
    });
  });

  describe('postOrder$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: OrdersActions.postOrder({
          newOrder: {
            orderID: '105',
            customerID: '1',
            employeeID: '2',
            orderDate: new Date(),
            requiredDate: new Date(),
            shippedDate: new Date(),
            shipVia: 'Test A',
            freight: 'Test A',
            shipName: 'Test A',
            shipAddress: 'Test A',
            shipCity: 'Test A',
            shipRegion: 'Test A',
            shipPostalCode: 'Test A',
            shipCountry: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: OrdersActions.postOrderSuccess({
          order: {
            orderID: '105',
            customerID: '1',
            employeeID: '2',
            orderDate: new Date(),
            requiredDate: new Date(),
            shippedDate: new Date(),
            shipVia: 'Test A',
            freight: 'Test A',
            shipName: 'Test A',
            shipAddress: 'Test A',
            shipCity: 'Test A',
            shipRegion: 'Test A',
            shipPostalCode: 'Test A',
            shipCountry: 'Test A'
          }
        })
      });
      expect(effects.postOrder$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: OrdersActions.postOrder({
          newOrder: {
            orderID: '105',
            customerID: '1',
            employeeID: '2',
            orderDate: new Date(),
            requiredDate: new Date(),
            shippedDate: new Date(),
            shipVia: 'Test A',
            freight: 'Test A',
            shipName: 'Test A',
            shipAddress: 'Test A',
            shipCity: 'Test A',
            shipRegion: 'Test A',
            shipPostalCode: 'Test A',
            shipCountry: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: OrdersActions.postOrderFailure({
          error: 'Failed'
        })
      });
      expect(effects.initOrder$).toBeObservable(expected);
    });
  });

  describe('putOrder$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: OrdersActions.putOrder({
          selectedId: '110',
          putOrder: {
            orderID: '110',
            customerID: '1',
            employeeID: '2',
            orderDate: new Date(),
            requiredDate: new Date(),
            shippedDate: new Date(),
            shipVia: 'Update A',
            freight: 'Update A',
            shipName: 'Update A',
            shipAddress: 'Update A',
            shipCity: 'Update A',
            shipRegion: 'Update A',
            shipPostalCode: 'Update A',
            shipCountry: 'Update A'
          }
        })
      });
      const expected = hot('---|', {
        a: OrdersActions.putOrderSuccess({
          order: {
            orderID: '110',
            customerID: '1',
            employeeID: '2',
            orderDate: new Date(),
            requiredDate: new Date(),
            shippedDate: new Date(),
            shipVia: 'Update A',
            freight: 'Update A',
            shipName: 'Update A',
            shipAddress: 'Update A',
            shipCity: 'Update A',
            shipRegion: 'Update A',
            shipPostalCode: 'Update A',
            shipCountry: 'Update A'
          }
        })
      });
      expect(effects.putOrder$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: OrdersActions.putOrder({
          selectedId: '110',
          putOrder: {
            orderID: '110',
            customerID: '1',
            employeeID: '2',
            orderDate: new Date(),
            requiredDate: new Date(),
            shippedDate: new Date(),
            shipVia: 'Update A',
            freight: 'Update A',
            shipName: 'Update A',
            shipAddress: 'Update A',
            shipCity: 'Update A',
            shipRegion: 'Update A',
            shipPostalCode: 'Update A',
            shipCountry: 'Update A'
          }
        })
      });
      const expected = hot('---|', {
        a: OrdersActions.putOrderFailure({
          error: 'Failed'
        })
      });
      expect(effects.putOrder$).toBeObservable(expected);
    });
  });

  describe('deleteOrder$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: OrdersActions.deleteOrder({
          delOrder: {
            orderID: '110',
            customerID: '1',
            employeeID: '2',
            orderDate: new Date(),
            requiredDate: new Date(),
            shippedDate: new Date(),
            shipVia: 'Test A',
            freight: 'Test A',
            shipName: 'Test A',
            shipAddress: 'Test A',
            shipCity: 'Test A',
            shipRegion: 'Test A',
            shipPostalCode: 'Test A',
            shipCountry: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: OrdersActions.deleteOrderSuccess()
      });
      expect(effects.deleteOrder$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: OrdersActions.deleteOrder({
          delOrder: {
            orderID: '110',
            customerID: '1',
            employeeID: '2',
            orderDate: new Date(),
            requiredDate: new Date(),
            shippedDate: new Date(),
            shipVia: 'Test A',
            freight: 'Test A',
            shipName: 'Test A',
            shipAddress: 'Test A',
            shipCity: 'Test A',
            shipRegion: 'Test A',
            shipPostalCode: 'Test A',
            shipCountry: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: OrdersActions.deleteOrderFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteOrder$).toBeObservable(expected);
    });
  });
});
