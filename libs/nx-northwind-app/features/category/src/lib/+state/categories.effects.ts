/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CategoriesActions from './categories.actions';
import * as CategoriesFeature from './categories.reducer';

@Injectable()
export class CategoriesEffects {
  private actions$ = inject(Actions) as any;

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.initCategories),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CategoriesActions.loadCategoriesSuccess({
            categories: []
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return CategoriesActions.loadCategoriesFailure({ error });
        }
      })
    )
  );
}
