/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomersState } from './customers.reducer';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as CustomersActions from './customers.actions';
import * as moment from 'moment';

@Injectable()
export class CustomersEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(CustomerService);

  // ******** INIT CUSTOMERS *************************************//
  initCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.initCustomers),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: CustomersState) => {
            data.customers.map((item) => {
              item.CreatedAt = item.CreatedAt ? moment(item.CreatedAt).format('DD/MM/YYYY HH:MM') : '';
              item.UpdatedAt = item.UpdatedAt ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:MM') : '';
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
                customer: data.customer.body
              })
            ),
            catchError((error) =>
              of(CustomersActions.putCustomerFailure({ error }))
            )
          )
      )
    )
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
}
