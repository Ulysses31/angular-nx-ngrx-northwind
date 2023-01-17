import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ShippersActions from './shippers.actions';
import { ShippersEffects } from './shippers.effects';

describe('ShippersEffects', () => {
  let effects: ShippersEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ShippersEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ShippersEffects);
  });

  describe('initShippers$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: ShippersActions.initShippers()
      });
      const expected = hot('', {
        a: ShippersActions.loadShippersSuccess({ shippers: [] })
      });
      expect(effects.initShippers$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: ShippersActions.initShippers()
      });
      const expected = hot('-a-|', {
        a: ShippersActions.loadShippersFailure({
          error: 'Failed'
        })
      });
      expect(effects.initShippers$).not.toBeObservable(expected);
    });
  });

  describe('initShipper$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: ShippersActions.initShipper({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: ShippersActions.loadShipperSuccess({
          shipper: {
            shipperID: '100',
            companyName: 'Test A',
            phone: 'Test A'
          }
        })
      });
      expect(effects.initShippers$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: ShippersActions.initShipper({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: ShippersActions.loadShipperFailure({
          error: 'Failed'
        })
      });
      expect(effects.initShipper$).toBeObservable(expected);
    });
  });

  describe('postShipper$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: ShippersActions.postShipper({
          newShipper: {
            shipperID: '105',
            companyName: 'Test A',
            phone: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: ShippersActions.postShipperSuccess({
          shipper: {
            shipperID: '105',
            companyName: 'Test A',
            phone: 'Test A'
          }
        })
      });
      expect(effects.postShipper$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: ShippersActions.postShipper({
          newShipper: {
            shipperID: '105',
            companyName: 'Test A',
            phone: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: ShippersActions.postShipperFailure({
          error: 'Failed'
        })
      });
      expect(effects.initShipper$).toBeObservable(expected);
    });
  });

  describe('putShipper$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: ShippersActions.putShipper({
          selectedId: '110',
          putShipper: {
            shipperID: '110',
            companyName: 'Test A',
            phone: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: ShippersActions.putShipperSuccess({
          shipper: {
            shipperID: '110',
            companyName: 'Test A',
            phone: 'Test A'
          }
        })
      });
      expect(effects.putShipper$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: ShippersActions.putShipper({
          selectedId: '110',
          putShipper: {
            shipperID: '110',
            companyName: 'Test A',
            phone: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: ShippersActions.putShipperFailure({
          error: 'Failed'
        })
      });
      expect(effects.putShipper$).toBeObservable(expected);
    });
  });

  describe('deleteShipper$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: ShippersActions.deleteShipper({
          delShipper: {
            shipperID: '110',
            companyName: 'Test A',
            phone: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: ShippersActions.deleteShipperSuccess()
      });
      expect(effects.deleteShipper$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: ShippersActions.deleteShipper({
          delShipper: {
            shipperID: '110',
            companyName: 'Test A',
            phone: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: ShippersActions.deleteShipperFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteShipper$).toBeObservable(expected);
    });
  });
});
