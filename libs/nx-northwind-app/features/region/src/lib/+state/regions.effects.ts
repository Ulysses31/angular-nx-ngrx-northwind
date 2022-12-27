import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as RegionsActions from './regions.actions';
import * as RegionsFeature from './regions.reducer';

@Injectable()
export class RegionsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionsActions.initRegions),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return RegionsActions.loadRegionsSuccess({ regions: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return RegionsActions.loadRegionsFailure({ error });
        }
      })
    )
  );
}
