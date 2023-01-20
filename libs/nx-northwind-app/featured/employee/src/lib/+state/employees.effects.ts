/* eslint-disable @typescript-eslint/no-explicit-any */

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as EmployeesActions from './employees.actions';
import { EmployeesState } from './employees.reducer';
import * as moment from 'moment';

@Injectable()
export class EmployeesEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(EmployeeService);

  // ******** INIT EMPLOYEES *************************************//
  initEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.initEmployees),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: EmployeesState) => {
            data.employees.map((item) => {
              item.CreatedAt = item.CreatedAt ? moment(item.CreatedAt).format('DD/MM/YYYY HH:MM') : '';
              item.UpdatedAt = item.UpdatedAt ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:MM') : '';
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

  // ******** INIT CATEGORY *************************************//
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

  // ******** POST CATEGORY *************************************//
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

  // ******** PUT CATEGORY *************************************//
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
                employee: data.employee.body
              })
            ),
            catchError((error) =>
              of(EmployeesActions.putEmployeeFailure({ error }))
            )
          )
      )
    )
  );

  // ******** DELETE CATEGORY **********************************//
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
}
