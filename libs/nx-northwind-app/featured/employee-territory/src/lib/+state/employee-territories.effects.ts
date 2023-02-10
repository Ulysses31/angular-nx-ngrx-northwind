/* eslint-disable @typescript-eslint/no-explicit-any */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeTerritoryService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as EmployeeTerritoriesActions from './employee-territories.actions';
import { EmployeeTerritoriesState } from './employee-territories.reducer';

@Injectable()
export class EmployeeTerritoriesEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(EmployeeTerritoryService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT EMPLOYEE TERRITORIES *************************************//
  initEmployeeTerritories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeTerritoriesActions.initEmployeeTerritories),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: EmployeeTerritoriesState) => {
            // data.employeeTerritories.map((item) => {
            //   item.CreatedAt = item.CreatedAt
            //     ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            //   item.UpdatedAt = item.UpdatedAt
            //     ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            // });
            return data;
          }),
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
              employeeTerritory: data.employeeTerritories[0]
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

  successPostEmployeeTerritory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          EmployeeTerritoriesActions.postEmployeeTerritorySuccess
        ),
        pipe(
          tap(() => {
            this.snackBar.open('Record saved...', 'Close', {
              duration: 3000
            });
            const path =
              this.route.snapshot.pathFromRoot[0].queryParams[
                'backUrl'
              ];
            this.router.navigate([path]);
          })
        )
      ),
    { dispatch: false }
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

  successPutEmployeeTerritory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          EmployeeTerritoriesActions.putEmployeeTerritorySuccess
        ),
        pipe(
          tap(() => {
            // const path =
            //   this.route.snapshot.pathFromRoot[0].queryParams[
            //     'backUrl'
            //   ];
            // this.router.navigate([path]);
            this.snackBar.open('Record updated...', 'Close', {
              duration: 3000
            });
          })
        )
      ),
    { dispatch: false }
  );

  // ******** DELETE EMPLOYEE TERRITORY **********************************//
  deleteEmployeeTerritory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeTerritoriesActions.deleteEmployeeTerritory),
      switchMap((action) =>
        this.service
          .delete(action.delEmployeeTerritory.Id || '')
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

  successDeleteEmployeeTerritory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          EmployeeTerritoriesActions.deleteEmployeeTerritorySuccess
        ),
        pipe(
          tap(() => {
            const path =
              this.route.snapshot.pathFromRoot[0].queryParams[
                'backUrl'
              ];
            this.router.navigate([path]);
            this.snackBar.open('Record deleted...', 'Close', {
              duration: 3000
            });
          })
        )
      ),
    { dispatch: false }
  );
}
