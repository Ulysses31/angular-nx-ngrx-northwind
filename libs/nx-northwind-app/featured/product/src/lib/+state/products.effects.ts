/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as ProductsActions from './products.actions';
import { ProductsState } from './products.reducer';

@Injectable()
export class ProductsEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(ProductService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT PRODUCTS *************************************//
  initProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.initProducts),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: ProductsState) => {
            data.products.map((item) => {
              item.CreatedAt = item.CreatedAt
                ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
                : '';
              item.UpdatedAt = item.UpdatedAt
                ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
                : '';
            });
            return data;
          }),
          map((data: ProductsState) =>
            ProductsActions.loadProductsSuccess({
              products: data.products
            })
          ),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT PRODUCT *************************************//
  initProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.initProduct),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: ProductsState) =>
            ProductsActions.loadProductSuccess({
              product: data.products[0]
            })
          ),
          catchError((error) =>
            of(ProductsActions.loadProductFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST PRODUCT *************************************//
  postProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.postProduct),
      switchMap((action) =>
        this.service.create(action.newProduct).pipe(
          tap((data: any) => console.log(data)),
          map((data: ProductsState) =>
            ProductsActions.postProductSuccess({
              product: data.product
            })
          ),
          catchError((error) =>
            of(ProductsActions.postProductFailure({ error }))
          )
        )
      )
    )
  );

  successPostProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.postProductSuccess),
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

  // ******** PUT PRODUCT *************************************//
  putProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.putProduct),
      switchMap((action) =>
        this.service
          .update(action.selectedId, action.putProduct)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: ProductsState) =>
              ProductsActions.putProductSuccess({
                product: data.product
              })
            ),
            catchError((error) =>
              of(ProductsActions.putProductFailure({ error }))
            )
          )
      )
    )
  );

  successPutProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.putProductSuccess),
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

  // ******** DELETE PRODUCT **********************************//
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      switchMap((action) =>
        this.service.delete(action.delProduct.ProductID).pipe(
          tap((data: any) => console.log(data)),
          map(() => ProductsActions.deleteProductSuccess()),
          catchError((error) =>
            of(ProductsActions.deleteProductFailure({ error }))
          )
        )
      )
    )
  );

  successDeleteProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.deleteProductSuccess),
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
