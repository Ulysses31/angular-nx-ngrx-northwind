/* eslint-disable @typescript-eslint/no-explicit-any */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeTerritoryService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as EmployeeTerritoriesActions from './employee-territories.actions';
import { EmployeeTerritoriesState } from './employee-territories.reducer';

@Injectable()
export class EmployeeTerritoriesEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(EmployeeTerritoryService);

  // ******** INIT EMPLOYEE TERRITORIES *************************************//
  initEmployeeTerritories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeTerritoriesActions.initEmployeeTerritories),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: EmployeeTerritoriesState) =>
            EmployeeTerritoriesActions.loadEmployeeTerritoriesSuccess(
              {
                employeeTerritories: data.employeeTerritories
              }
            )
          ),
          catchError((error) =>
            of(
              EmployeeTerritoriesActions.loadEmployeeTerritoriesFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  // ******** INIT EMPLOYEE TERRITORY *************************************//
  initEmployeeTerritory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeTerritoriesActions.initEmployeeTerritory),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: EmployeeTerritoriesState) =>
            EmployeeTerritoriesActions.loadEmployeeTerritorySuccess({
              employeeTerritory: data.employeeTerritory
            })
          ),
          catchError((error) =>
            of(
              EmployeeTerritoriesActions.loadEmployeeTerritoryFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  // ******** POST EMPLOYEE TERRITORY *************************************//
  postEmployeeTerritory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeTerritoriesActions.postEmployeeTerritory),
      switchMap((action) =>
        this.service.create(action.newEmployeeTerritory).pipe(
          tap((data: any) => console.log(data)),
          map((data: EmployeeTerritoriesState) =>
            EmployeeTerritoriesActions.postEmployeeTerritorySuccess({
              employeeTerritory: data.employeeTerritory
            })
          ),
          catchError((error) =>
            of(
              EmployeeTerritoriesActions.postEmployeeTerritoryFailure(
                { error }
              )
            )
          )
        )
      )
    )
  );

  // ******** PUT EMPLOYEE TERRITORY *************************************//
  putEmployeeTerritory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeTerritoriesActions.putEmployeeTerritory),
      switchMap((action) =>
        this.service
          .update(action.selectedId, action.putEmployeeTerritory)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: EmployeeTerritoriesState) =>
              EmployeeTerritoriesActions.putEmployeeTerritorySuccess({
                employeeTerritory: data.employeeTerritory
              })
            ),
            catchError((error) =>
              of(
                EmployeeTerritoriesActions.putEmployeeTerritoryFailure(
                  { error }
                )
              )
            )
          )
      )
    )
  );

  // ******** DELETE EMPLOYEE TERRITORY **********************************//
  deleteEmployeeTerritory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeTerritoriesActions.deleteEmployeeTerritory),
      switchMap((action) =>
        this.service
          .delete(action.delEmployeeTerritory.employeeID)
          .pipe(
            tap((data: any) => console.log(data)),
            map(() =>
              EmployeeTerritoriesActions.deleteEmployeeTerritorySuccess()
            ),
            catchError((error) =>
              of(
                EmployeeTerritoriesActions.deleteEmployeeTerritoryFailure(
                  { error }
                )
              )
            )
          )
      )
    )
  );
}
