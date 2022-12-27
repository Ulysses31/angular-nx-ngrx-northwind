/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as OrderDetailsActions from './order-details.actions';
import * as OrderDetailsFeature from './order-details.reducer';

@Injectable()
export class OrderDetailsEffects {
  private actions$ = inject(Actions) as any;

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailsActions.initOrderDetails),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return OrderDetailsActions.loadOrderDetailsSuccess({
            orderDetails: []
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return OrderDetailsActions.loadOrderDetailsFailure({
            error
          });
        }
      })
    )
  );
}
