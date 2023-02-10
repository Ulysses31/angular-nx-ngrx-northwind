/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SupplierService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as SuppliersActions from './suppliers.actions';
import { SuppliersState } from './suppliers.reducer';

@Injectable()
export class SuppliersEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(SupplierService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT SUPPLIERS *************************************//
  initSuppliers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliersActions.initSuppliers),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: SuppliersState) => {
            // data.suppliers.map((item) => {
            //   item.CreatedAt = item.CreatedAt
            //     ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            //   item.UpdatedAt = item.UpdatedAt
            //     ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            // });
            return data;
          }),
          map((data: SuppliersState) =>
            SuppliersActions.loadSuppliersSuccess({
              suppliers: data.suppliers
            })
          ),
          catchError((error) =>
            of(SuppliersActions.loadSuppliersFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT SUPPLIER *************************************//
  initSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliersActions.initSupplier),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: SuppliersState) =>
            SuppliersActions.loadSupplierSuccess({
              supplier: data.suppliers[0]
            })
          ),
          catchError((error) =>
            of(SuppliersActions.loadSupplierFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST SUPPLIER *************************************//
  postSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliersActions.postSupplier),
      switchMap((action) =>
        this.service.create(action.newSupplier).pipe(
          tap((data: any) => console.log(data)),
          map((data: SuppliersState) =>
            SuppliersActions.postSupplierSuccess({
              supplier: data.supplier
            })
          ),
          catchError((error) =>
            of(SuppliersActions.postSupplierFailure({ error }))
          )
        )
      )
    )
  );

  successPostSupplier$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SuppliersActions.postSupplierSuccess),
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

  // ******** PUT SUPPLIER *************************************//
  putSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliersActions.putSupplier),
      switchMap((action) =>
        this.service
          .update(action.selectedId, action.putSupplier)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: SuppliersState) =>
              SuppliersActions.putSupplierSuccess({
                supplier: data.supplier
              })
            ),
            catchError((error) =>
              of(SuppliersActions.putSupplierFailure({ error }))
            )
          )
      )
    )
  );

  successPutSupplier$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SuppliersActions.putSupplierSuccess),
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

  // ******** DELETE SUPPLIER **********************************//
  deleteSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliersActions.deleteSupplier),
      switchMap((action) =>
        this.service.delete(action.delSupplier.Id).pipe(
          tap((data: any) => console.log(data)),
          map(() => SuppliersActions.deleteSupplierSuccess()),
          catchError((error) =>
            of(SuppliersActions.deleteSupplierFailure({ error }))
          )
        )
      )
    )
  );

  successDeleteSupplier$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SuppliersActions.deleteSupplierSuccess),
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
