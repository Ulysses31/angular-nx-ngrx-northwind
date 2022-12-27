/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as OrdersActions from './orders.actions';
import * as OrdersFeature from './orders.reducer';

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions) as any;

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.initOrders),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return OrdersActions.loadOrdersSuccess({ orders: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return OrdersActions.loadOrdersFailure({ error });
        }
      })
    )
  );
}
