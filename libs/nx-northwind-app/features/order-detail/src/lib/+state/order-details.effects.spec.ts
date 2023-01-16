import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as OrderDetailsActions from './order-details.actions';
import { OrderDetailsEffects } from './order-details.effects';

describe('OrderDetailsEffects', () => {
  let effects: OrderDetailsEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        OrderDetailsEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(OrderDetailsEffects);
  });

  describe('initOrderDetails$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: OrderDetailsActions.initOrderDetails()
      });
      const expected = hot('', {
        a: OrderDetailsActions.loadOrderDetailsSuccess({
          orderDetails: []
        })
      });
      expect(effects.initOrderDetails$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: OrderDetailsActions.initOrderDetails()
      });
      const expected = hot('-a-|', {
        a: OrderDetailsActions.loadOrderDetailsFailure({
          error: 'Failed'
        })
      });
      expect(effects.initOrderDetails$).not.toBeObservable(expected);
    });
  });

  describe('initOrderDetail$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: OrderDetailsActions.initOrderDetail({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: OrderDetailsActions.loadOrderDetailSuccess({
          orderDetail: {
            orderID: '100',
            productID: '1',
            unitPrice: 0,
            quantity: 0,
            discount: 0
          }
        })
      });
      expect(effects.initOrderDetails$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: OrderDetailsActions.initOrderDetail({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: OrderDetailsActions.loadOrderDetailFailure({
          error: 'Failed'
        })
      });
      expect(effects.initOrderDetail$).toBeObservable(expected);
    });
  });

  describe('postOrderDetail$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: OrderDetailsActions.postOrderDetail({
          newOrderDetail: {
            orderID: '100',
            productID: '1',
            unitPrice: 0,
            quantity: 0,
            discount: 0
          }
        })
      });
      const expected = hot('---|', {
        a: OrderDetailsActions.postOrderDetailSuccess({
          orderDetail: {
            orderID: '100',
            productID: '1',
            unitPrice: 0,
            quantity: 0,
            discount: 0
          }
        })
      });
      expect(effects.postOrderDetail$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: OrderDetailsActions.postOrderDetail({
          newOrderDetail: {
            orderID: '100',
            productID: '1',
            unitPrice: 0,
            quantity: 0,
            discount: 0
          }
        })
      });
      const expected = hot('---|', {
        a: OrderDetailsActions.postOrderDetailFailure({
          error: 'Failed'
        })
      });
      expect(effects.initOrderDetail$).toBeObservable(expected);
    });
  });

  describe('putOrderDetail$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: OrderDetailsActions.putOrderDetail({
          selectedId: '110',
          putOrderDetail: {
            orderID: '100',
            productID: '1',
            unitPrice: 0,
            quantity: 0,
            discount: 0
          }
        })
      });
      const expected = hot('---|', {
        a: OrderDetailsActions.putOrderDetailSuccess({
          orderDetail: {
            orderID: '100',
            productID: '1',
            unitPrice: 0,
            quantity: 0,
            discount: 0
          }
        })
      });
      expect(effects.putOrderDetail$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: OrderDetailsActions.putOrderDetail({
          selectedId: '110',
          putOrderDetail: {
            orderID: '100',
            productID: '1',
            unitPrice: 0,
            quantity: 0,
            discount: 0
          }
        })
      });
      const expected = hot('---|', {
        a: OrderDetailsActions.putOrderDetailFailure({
          error: 'Failed'
        })
      });
      expect(effects.putOrderDetail$).toBeObservable(expected);
    });
  });

  describe('deleteOrderDetail$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: OrderDetailsActions.deleteOrderDetail({
          delOrderDetail: {
            orderID: '100',
            productID: '1',
            unitPrice: 0,
            quantity: 0,
            discount: 0
          }
        })
      });
      const expected = hot('---|', {
        a: OrderDetailsActions.deleteOrderDetailSuccess()
      });
      expect(effects.deleteOrderDetail$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: OrderDetailsActions.deleteOrderDetail({
          delOrderDetail: {
            orderID: '100',
            productID: '1',
            unitPrice: 0,
            quantity: 0,
            discount: 0
          }
        })
      });
      const expected = hot('---|', {
        a: OrderDetailsActions.deleteOrderDetailFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteOrderDetail$).toBeObservable(expected);
    });
  });
});
