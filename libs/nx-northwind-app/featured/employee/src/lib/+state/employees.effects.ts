/* eslint-disable @typescript-eslint/no-explicit-any */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as EmployeesActions from './employees.actions';
import { EmployeesState } from './employees.reducer';

@Injectable()
export class EmployeesEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(EmployeeService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT EMPLOYEES *************************************//
  initEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.initEmployees),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: EmployeesState) => {
            data.employees.map((item) => {
              item.Notes = item.Notes ? item.Notes.substring(0, 10)+'...' : '';
              item.BirthDate = item.BirthDate
                ? moment(item.BirthDate).format('DD/MM/YYYY')
                : '';
              item.HireDate = item.HireDate
                ? moment(item.HireDate).format('DD/MM/YYYY')
                : '';
              // item.CreatedAt = item.CreatedAt
              //   ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
              //   : '';
              // item.UpdatedAt = item.UpdatedAt
              //   ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
              //   : '';
            });
            return data;
          }),
          map((data: EmployeesState) =>
            EmployeesActions.loadEmployeesSuccess({
              employees: data.employees
            })
          ),
          catchError((error) =>
            of(EmployeesActions.loadEmployeesFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT EMPLOYEE *************************************//
  initEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.initEmployee),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: EmployeesState) =>
            EmployeesActions.loadEmployeeSuccess({
              employee: data.employees[0]
            })
          ),
          catchError((error) =>
            of(EmployeesActions.loadEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST EMPLOYEE *************************************//
  postEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.postEmployee),
      switchMap((action) =>
        this.service.create(action.newEmployee).pipe(
          tap((data: any) => console.log(data)),
          map((data: EmployeesState) =>
            EmployeesActions.postEmployeeSuccess({
              employee: data.employee
            })
          ),
          catchError((error) =>
            of(EmployeesActions.postEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  successPostEmployee$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActions.postEmployeeSuccess),
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

  // ******** PUT EMPLOYEE *************************************//
  putEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.putEmployee),
      switchMap((action) =>
        this.service
          .update(action.selectedId, action.putEmployee)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: EmployeesState) =>
              EmployeesActions.putEmployeeSuccess({
                employee: data.employee
              })
            ),
            catchError((error) =>
              of(EmployeesActions.putEmployeeFailure({ error }))
            )
          )
      )
    )
  );

  successPutEmployee$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActions.putEmployeeSuccess),
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

  // ******** DELETE EMPLOYEE **********************************//
  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.deleteEmployee),
      switchMap((action) =>
        this.service.delete(action.delEmployee.EmployeeID).pipe(
          tap((data: any) => console.log(data)),
          map(() => EmployeesActions.deleteEmployeeSuccess()),
          catchError((error) =>
            of(EmployeesActions.deleteEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  successDeleteEmployee$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActions.deleteEmployeeSuccess),
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
