/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as OrdersActions from './orders.actions';
import { OrdersState } from './orders.reducer';

@Injectable()
export class OrdersEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(OrderService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT ORDERS *************************************//
  initOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.initOrders),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersState) => {
            data.orders.map((item) => {
              item.OrderDate = item.OrderDate
                ? moment(item.OrderDate).format('DD/MM/YYYY HH:mm')
                : '';
              item.RequiredDate = item.RequiredDate
                ? moment(item.RequiredDate).format('DD/MM/YYYY HH:mm')
                : '';
              item.ShippedDate = item.ShippedDate
                ? moment(item.ShippedDate).format('DD/MM/YYYY HH:mm')
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
          map((data: OrdersState) =>
            OrdersActions.loadOrdersSuccess({
              orders: data.orders
            })
          ),
          catchError((error) =>
            of(OrdersActions.loadOrdersFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT ORDER *************************************//
  initOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.initOrder),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersState) =>
            OrdersActions.loadOrderSuccess({
              order: data.orders[0]
            })
          ),
          catchError((error) =>
            of(OrdersActions.loadOrderFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST ORDER *************************************//
  postOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.postOrder),
      switchMap((action) =>
        this.service.create(action.newOrder).pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersState) =>
            OrdersActions.postOrderSuccess({
              order: data.order
            })
          ),
          catchError((error) =>
            of(OrdersActions.postOrderFailure({ error }))
          )
        )
      )
    )
  );

  successPostOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.postOrderSuccess),
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

  // ******** PUT ORDER *************************************//
  putOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.putOrder),
      switchMap((action) =>
        this.service.update(action.selectedId, action.putOrder).pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersState) =>
            OrdersActions.putOrderSuccess({
              order: data.order
            })
          ),
          catchError((error) =>
            of(OrdersActions.putOrderFailure({ error }))
          )
        )
      )
    )
  );

  successPutOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.putOrderSuccess),
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

  // ******** DELETE ORDER **********************************//
  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.deleteOrder),
      switchMap((action) =>
        this.service.delete(action.delOrder.OrderID).pipe(
          tap((data: any) => console.log(data)),
          map(() => OrdersActions.deleteOrderSuccess()),
          catchError((error) =>
            of(OrdersActions.deleteOrderFailure({ error }))
          )
        )
      )
    )
  );

  successDeleteOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.deleteOrderSuccess),
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
