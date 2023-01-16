/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderDetailService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as OrderDetailsActions from './order-details.actions';
import { OrderDetailsState } from './order-details.reducer';

@Injectable()
export class OrderDetailsEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(OrderDetailService);

  // ******** INIT ORDER DETAILS *************************************//
  initOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailsActions.initOrderDetails),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: OrderDetailsState) =>
            OrderDetailsActions.loadOrderDetailsSuccess({
              orderDetails: data.orderDetails
            })
          ),
          catchError((error) =>
            of(OrderDetailsActions.loadOrderDetailsFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT ORDER DETAIL *************************************//
  initOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailsActions.initOrderDetail),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: OrderDetailsState) =>
            OrderDetailsActions.loadOrderDetailSuccess({
              orderDetail: data.orderDetail
            })
          ),
          catchError((error) =>
            of(OrderDetailsActions.loadOrderDetailFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST ORDER DETAIL *************************************//
  postOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailsActions.postOrderDetail),
      switchMap((action) =>
        this.service.create(action.newOrderDetail).pipe(
          tap((data: any) => console.log(data)),
          map((data: OrderDetailsState) =>
            OrderDetailsActions.postOrderDetailSuccess({
              orderDetail: data.orderDetail
            })
          ),
          catchError((error) =>
            of(OrderDetailsActions.postOrderDetailFailure({ error }))
          )
        )
      )
    )
  );

  // ******** PUT ORDER DETAIL *************************************//
  putOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailsActions.putOrderDetail),
      switchMap((action) =>
        this.service
          .update(action.selectedId, action.putOrderDetail)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: OrderDetailsState) =>
              OrderDetailsActions.putOrderDetailSuccess({
                orderDetail: data.orderDetail
              })
            ),
            catchError((error) =>
              of(OrderDetailsActions.putOrderDetailFailure({ error }))
            )
          )
      )
    )
  );

  // ******** DELETE ORDER DETAIL **********************************//
  deleteOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailsActions.deleteOrderDetail),
      switchMap((action) =>
        this.service.delete(action.delOrderDetail.orderID).pipe(
          tap((data: any) => console.log(data)),
          map(() => OrderDetailsActions.deleteOrderDetailSuccess()),
          catchError((error) =>
            of(
              OrderDetailsActions.deleteOrderDetailFailure({ error })
            )
          )
        )
      )
    )
  );
}
