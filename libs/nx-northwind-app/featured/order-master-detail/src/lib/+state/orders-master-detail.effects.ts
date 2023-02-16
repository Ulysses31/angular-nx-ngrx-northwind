import { OrderDetailLoaderDto } from '@nx-northwind/nx-northwind-app/entities';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  OrderDetailService,
  OrderService
} from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as OrdersMasterDetailActions from './orders-master-detail.actions';
import { OrdersMasterDetailState } from './orders-master-detail.reducer';

@Injectable()
export class OrdersEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(OrderService);
  private serviceDetails = inject(OrderDetailService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT ORDERS *************************************//
  initOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersMasterDetailActions.initOrders),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersMasterDetailState) => {
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
          map((data: OrdersMasterDetailState) =>
            OrdersMasterDetailActions.loadOrdersSuccess({
              orders: data.orders
            })
          ),
          catchError((error) =>
            of(OrdersMasterDetailActions.loadOrdersFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT ORDER *************************************//
  initOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersMasterDetailActions.initOrder),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersMasterDetailState) =>
            OrdersMasterDetailActions.loadOrderSuccess({
              order: data.orders[0]
            })
          ),
          catchError((error) =>
            of(OrdersMasterDetailActions.loadOrderFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST ORDER *************************************//
  postOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersMasterDetailActions.postOrder),
      switchMap((action) =>
        this.service.create(action.newOrder).pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersMasterDetailState) =>
            OrdersMasterDetailActions.postOrderSuccess({
              order: data.order
            })
          ),
          catchError((error) =>
            of(OrdersMasterDetailActions.postOrderFailure({ error }))
          )
        )
      )
    )
  );

  successPostOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersMasterDetailActions.postOrderSuccess),
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
      ofType(OrdersMasterDetailActions.putOrder),
      switchMap((action) =>
        this.service.update(action.selectedId, action.putOrder).pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersMasterDetailState) =>
            OrdersMasterDetailActions.putOrderSuccess({
              order: data.order
            })
          ),
          catchError((error) =>
            of(OrdersMasterDetailActions.putOrderFailure({ error }))
          )
        )
      )
    )
  );

  successPutOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersMasterDetailActions.putOrderSuccess),
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
      ofType(OrdersMasterDetailActions.deleteOrder),
      switchMap((action) =>
        this.service.delete(action.delOrder.OrderID).pipe(
          tap((data: any) => console.log(data)),
          map(() => OrdersMasterDetailActions.deleteOrderSuccess()),
          catchError((error) =>
            of(
              OrdersMasterDetailActions.deleteOrderFailure({ error })
            )
          )
        )
      )
    )
  );

  successDeleteOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersMasterDetailActions.deleteOrderSuccess),
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

  //-----------------------------------------------------------------------------//

  // ******** INIT ORDER DETAILS *************************************//
  initOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersMasterDetailActions.initOrderDetails),
      switchMap(() =>
        this.serviceDetails.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersMasterDetailState) => {
            // data.orderDetails.map((item) => {
            //   item.CreatedAt = item.CreatedAt
            //     ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            //   item.UpdatedAt = item.UpdatedAt
            //     ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            // });
            return data;
          }),
          map((data: OrdersMasterDetailState) =>
            OrdersMasterDetailActions.loadOrderDetailsSuccess({
              orderDetails: data.orderDetails
            })
          ),
          catchError((error) =>
            of(
              OrdersMasterDetailActions.loadOrderDetailsFailure({
                error
              })
            )
          )
        )
      )
    )
  );

  // ******** INIT ORDER DETAIL *************************************//
  initOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersMasterDetailActions.initOrderDetail),
      switchMap((action) =>
        this.serviceDetails.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersMasterDetailState) =>
            OrdersMasterDetailActions.loadOrderDetailSuccess({
              orderDetail: data.orderDetails[0]
            })
          ),
          catchError((error) =>
            of(
              OrdersMasterDetailActions.loadOrderDetailFailure({
                error
              })
            )
          )
        )
      )
    )
  );

  // ******** INIT ORDERS DETAILS BY ORDERID ************************//
  initOrdersDetailsByOrderId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersMasterDetailActions.initOrderDetailsByOrderId),
      switchMap((action) =>
        this.serviceDetails
          .browseByOrderId(action.selectedOrderId)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: OrdersMasterDetailState) =>
              OrdersMasterDetailActions.loadOrderDetailsByOrderIdSuccess(
                {
                  orderDetails: data.orderDetails
                }
              )
            ),
            catchError((error) =>
              of(
                OrdersMasterDetailActions.loadOrderDetailsByOrderIdFailure(
                  { error }
                )
              )
            )
          )
      )
    )
  );

  // ******** POST ORDER DETAIL *************************************//
  postOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersMasterDetailActions.postOrderDetail),
      switchMap((action) =>
        this.serviceDetails.create(action.newOrderDetail).pipe(
          tap((data: any) => console.log(data)),
          map((data: OrdersMasterDetailState) =>
            OrdersMasterDetailActions.postOrderDetailSuccess({
              orderDetail: data.orderDetail
            })
          ),
          catchError((error) =>
            of(
              OrdersMasterDetailActions.postOrderDetailFailure({
                error
              })
            )
          )
        )
      )
    )
  );

  successPostOrderDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersMasterDetailActions.postOrderDetailSuccess),
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
      ofType(OrdersMasterDetailActions.putOrderDetail),
      switchMap((action) =>
        this.serviceDetails
          .update(action.selectedId, action.putOrderDetail)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: OrdersMasterDetailState) =>
              OrdersMasterDetailActions.putOrderDetailSuccess({
                orderDetail: data.orderDetail
              })
            ),
            catchError((error) =>
              of(
                OrdersMasterDetailActions.putOrderDetailFailure({
                  error
                })
              )
            )
          )
      )
    )
  );

  successPutOrderDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersMasterDetailActions.putOrderDetailSuccess),
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
      ofType(OrdersMasterDetailActions.deleteOrderDetail),
      switchMap((action) =>
        this.serviceDetails
          .delete(action.delOrderDetail.OrderID)
          .pipe(
            tap((data: any) => console.log(data)),
            map(() =>
              OrdersMasterDetailActions.deleteOrderDetailSuccess()
            ),
            catchError((error) =>
              of(
                OrdersMasterDetailActions.deleteOrderDetailFailure({
                  error
                })
              )
            )
          )
      )
    )
  );

  successDeleteOrderDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersMasterDetailActions.deleteOrderDetailSuccess),
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
