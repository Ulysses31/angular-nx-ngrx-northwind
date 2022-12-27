/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EmployeeTerritoriesActions from './employee-territories.actions';
import * as EmployeeTerritoriesFeature from './employee-territories.reducer';

@Injectable()
export class EmployeeTerritoriesEffects {
  private actions$ = inject(Actions) as any;

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeTerritoriesActions.initEmployeeTerritories),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EmployeeTerritoriesActions.loadEmployeeTerritoriesSuccess(
            { employeeTerritories: [] }
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EmployeeTerritoriesActions.loadEmployeeTerritoriesFailure(
            { error }
          );
        }
      })
    )
  );
}
