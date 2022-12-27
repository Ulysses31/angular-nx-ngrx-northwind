/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EmployeesActions from './employees.actions';
import * as EmployeesFeature from './employees.reducer';

@Injectable()
export class EmployeesEffects {
  private actions$ = inject(Actions) as any;

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.initEmployees),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EmployeesActions.loadEmployeesSuccess({
            employees: []
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EmployeesActions.loadEmployeesFailure({ error });
        }
      })
    )
  );
}
