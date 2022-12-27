/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as SuppliersActions from './suppliers.actions';
import * as SuppliersFeature from './suppliers.reducer';

@Injectable()
export class SuppliersEffects {
  private actions$ = inject(Actions) as any;

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliersActions.initSuppliers),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SuppliersActions.loadSuppliersSuccess({
            suppliers: []
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SuppliersActions.loadSuppliersFailure({ error });
        }
      })
    )
  );
}
