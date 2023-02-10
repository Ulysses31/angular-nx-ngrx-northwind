/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShipperService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as ShippersActions from './shippers.actions';
import { ShippersState } from './shippers.reducer';

@Injectable()
export class ShippersEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(ShipperService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT SHIPPERS *************************************//
  initShippers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShippersActions.initShippers),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: ShippersState) => {
            // data.shippers.map((item) => {
            //   item.CreatedAt = item.CreatedAt
            //     ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            //   item.UpdatedAt = item.UpdatedAt
            //     ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            // });
            return data;
          }),
          map((data: ShippersState) =>
            ShippersActions.loadShippersSuccess({
              shippers: data.shippers
            })
          ),
          catchError((error) =>
            of(ShippersActions.loadShippersFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT SHIPPER *************************************//
  initShipper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShippersActions.initShipper),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: ShippersState) =>
            ShippersActions.loadShipperSuccess({
              shipper: data.shippers[0]
            })
          ),
          catchError((error) =>
            of(ShippersActions.loadShipperFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST SHIPPER *************************************//
  postShipper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShippersActions.postShipper),
      switchMap((action) =>
        this.service.create(action.newShipper).pipe(
          tap((data: any) => console.log(data)),
          map((data: ShippersState) =>
            ShippersActions.postShipperSuccess({
              shipper: data.shipper
            })
          ),
          catchError((error) =>
            of(ShippersActions.postShipperFailure({ error }))
          )
        )
      )
    )
  );

  successPostShipper$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShippersActions.postShipperSuccess),
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

  // ******** PUT SHIPPER *************************************//
  putShipper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShippersActions.putShipper),
      switchMap((action) =>
        this.service
          .update(action.selectedId, action.putShipper)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: ShippersState) =>
              ShippersActions.putShipperSuccess({
                shipper: data.shipper
              })
            ),
            catchError((error) =>
              of(ShippersActions.putShipperFailure({ error }))
            )
          )
      )
    )
  );

  successPutShipper$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShippersActions.putShipperSuccess),
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

  // ******** DELETE SHIPPER **********************************//
  deleteShipper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShippersActions.deleteShipper),
      switchMap((action) =>
        this.service.delete(action.delShipper.ShipperID).pipe(
          tap((data: any) => console.log(data)),
          map(() => ShippersActions.deleteShipperSuccess()),
          catchError((error) =>
            of(ShippersActions.deleteShipperFailure({ error }))
          )
        )
      )
    )
  );

  successDeleteShipper$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShippersActions.deleteShipperSuccess),
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
