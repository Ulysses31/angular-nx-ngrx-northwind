/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CustomersActions from './customers.actions';
import * as CustomersFeature from './customers.reducer';

@Injectable()
export class CustomersEffects {
  private actions$ = inject(Actions) as any;

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.initCustomers),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CustomersActions.loadCustomersSuccess({
            customers: []
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return CustomersActions.loadCustomersFailure({ error });
        }
      })
    )
  );
}
