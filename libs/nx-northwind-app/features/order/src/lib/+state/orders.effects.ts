/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as OrdersActions from './orders.actions';
import { OrdersState } from './orders.reducer';

@Injectable()
export class OrdersEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(OrderService);

  // ******** INIT ORDERS *************************************//
  initOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.initOrders),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
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
              order: data.order
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

  // ******** DELETE ORDER **********************************//
  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.deleteOrder),
      switchMap((action) =>
        this.service.delete(action.delOrder.orderID).pipe(
          tap((data: any) => console.log(data)),
          map(() => OrdersActions.deleteOrderSuccess()),
          catchError((error) =>
            of(OrdersActions.deleteOrderFailure({ error }))
          )
        )
      )
    )
  );
}
