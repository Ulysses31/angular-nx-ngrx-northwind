/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderDetailService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as OrderDetailsActions from './order-details.actions';
import { OrderDetailsState } from './order-details.reducer';

@Injectable()
export class OrderDetailsEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(OrderDetailService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT ORDER DETAILS *************************************//
  initOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailsActions.initOrderDetails),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: OrderDetailsState) => {
            data.orderDetails.map((item) => {
              item.CreatedAt = item.CreatedAt
                ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
                : '';
              item.UpdatedAt = item.UpdatedAt
                ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
                : '';
            });
            return data;
          }),
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
              orderDetail: data.orderDetails[0]
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

  successPostOrderDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderDetailsActions.postOrderDetailSuccess),
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

  successPutOrderDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderDetailsActions.putOrderDetailSuccess),
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

  // ******** DELETE ORDER DETAIL **********************************//
  deleteOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailsActions.deleteOrderDetail),
      switchMap((action) =>
        this.service.delete(action.delOrderDetail.OrderID).pipe(
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

  successDeleteOrderDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderDetailsActions.deleteOrderDetailSuccess),
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
