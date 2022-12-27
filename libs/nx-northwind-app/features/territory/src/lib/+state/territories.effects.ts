/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as TerritoriesActions from './territories.actions';
import * as TerritoriesFeature from './territories.reducer';

@Injectable()
export class TerritoriesEffects {
  private actions$ = inject(Actions) as any;

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TerritoriesActions.initTerritories),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return TerritoriesActions.loadTerritoriesSuccess({
            territories: []
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return TerritoriesActions.loadTerritoriesFailure({ error });
        }
      })
    )
  );
}
