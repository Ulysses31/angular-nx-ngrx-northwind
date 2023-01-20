/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as ProductsActions from './products.actions';
import { ProductsState } from './products.reducer';
import * as moment from 'moment';

@Injectable()
export class ProductsEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(ProductService);

  // ******** INIT PRODUCTS *************************************//
  initProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.initProducts),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: ProductsState) => {
            data.products.map((item) => {
              item.CreatedAt = item.CreatedAt ? moment(item.CreatedAt).format('DD/MM/YYYY HH:MM') : '';
              item.UpdatedAt = item.UpdatedAt ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:MM') : '';
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
                product: data.product.body
              })
            ),
            catchError((error) =>
              of(ProductsActions.putProductFailure({ error }))
            )
          )
      )
    )
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
}
