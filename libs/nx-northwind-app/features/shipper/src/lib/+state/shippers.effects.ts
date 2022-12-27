/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ShippersActions from './shippers.actions';
import * as ShippersFeature from './shippers.reducer';

@Injectable()
export class ShippersEffects {
  private actions$ = inject(Actions) as any;

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShippersActions.initShippers),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ShippersActions.loadShippersSuccess({
            shippers: []
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ShippersActions.loadShippersFailure({ error });
        }
      })
    )
  );
}
