import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as OrderDetailsActions from './order-details.actions';
import { OrderDetailsEffects } from './order-details.effects';

describe('OrderDetailsEffects', () => {
  let actions: Observable<Action>;
  let effects: OrderDetailsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OrderDetailsEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(OrderDetailsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: OrderDetailsActions.initOrderDetails()
      });

      const expected = hot('-a-|', {
        a: OrderDetailsActions.loadOrderDetailsSuccess({
          orderDetails: []
        })
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
