/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { CustomersState } from './customers.reducer';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as CustomersActions from './customers.actions';

@Injectable()
export class CustomersEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(CustomerService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT CUSTOMERS *************************************//
  initCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.initCustomers),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: CustomersState) => {
            data.customers.map((item) => {
              item.CreatedAt = item.CreatedAt
                ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
                : '';
              item.UpdatedAt = item.UpdatedAt
                ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
                : '';
            });
            return data;
          }),
          map((data: CustomersState) =>
            CustomersActions.loadCustomersSuccess({
              customers: data.customers
            })
          ),
          catchError((error) =>
            of(CustomersActions.loadCustomersFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT CUSTOMER *************************************//
  initCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.initCustomer),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: CustomersState) =>
            CustomersActions.loadCustomerSuccess({
              customer: data.customers[0]
            })
          ),
          catchError((error) =>
            of(CustomersActions.loadCustomerFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST CUSTOMER *************************************//
  postCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.postCustomer),
      switchMap((action) =>
        this.service.create(action.newCustomer).pipe(
          tap((data: any) => console.log(data)),
          map((data: CustomersState) =>
            CustomersActions.postCustomerSuccess({
              customer: data.customer
            })
          ),
          catchError((error) =>
            of(CustomersActions.postCustomerFailure({ error }))
          )
        )
      )
    )
  );

  successPostCustomer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CustomersActions.postCustomerSuccess),
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

  // ******** PUT CUSTOMER *************************************//
  putCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.putCustomer),
      switchMap((action) =>
        this.service
          .update(action.selectedId, action.putCustomer)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: CustomersState) =>
              CustomersActions.putCustomerSuccess({
                customer: data.customer
              })
            ),
            catchError((error) =>
              of(CustomersActions.putCustomerFailure({ error }))
            )
          )
      )
    )
  );

  successPutCustomer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CustomersActions.putCustomerSuccess),
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

  // ******** DELETE CUSTOMER **********************************//
  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.deleteCustomer),
      switchMap((action) =>
        this.service.delete(action.delCustomer.CustomerID).pipe(
          tap((data: any) => console.log(data)),
          map(() => CustomersActions.deleteCustomerSuccess()),
          catchError((error) =>
            of(CustomersActions.deleteCustomerFailure({ error }))
          )
        )
      )
    )
  );

  successDeleteCustomer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CustomersActions.deleteCustomerSuccess),
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
