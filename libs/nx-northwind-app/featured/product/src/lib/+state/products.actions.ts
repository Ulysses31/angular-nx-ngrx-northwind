/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import {
  ProductBrowserDto,
  ProductLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT PRODUCTS *************************************//
export const initProducts = createAction('[Products Page] Init');

export const loadProductsSuccess = createAction(
  '[Products/API] Load Products Success',
  props<{ products: ProductBrowserDto[] }>()
);

export const loadProductsFailure = createAction(
  '[Products/API] Load Products Failure',
  props<{ error: any }>()
);

// *********** SELECTED PRODUCT ***********************************//
export const initProduct = createAction(
  '[Product Page] Init',
  props<{ selectedId: string }>()
);

export const loadProductSuccess = createAction(
  '[Products/API] Load Product Success',
  props<{ product: ProductLoaderDto }>()
);

export const loadProductFailure = createAction(
  '[Products/API] Load Product Failure',
  props<{ error: any }>()
);

// *********** POST PRODUCT **************************************//
export const postProduct = createAction(
  '[Product Page] Post',
  props<{ newProduct: ProductLoaderDto }>()
);

export const postProductSuccess = createAction(
  '[Products/API] Post Product Success',
  props<{ product: ProductLoaderDto }>()
);

export const postProductFailure = createAction(
  '[Products/API] Post Product Failure',
  props<{ error: any }>()
);

// *********** PUT PRODUCT ***************************************//
export const putProduct = createAction(
  '[Product Page] Put',
  props<{ selectedId: string; putProduct: ProductLoaderDto }>()
);

export const putProductSuccess = createAction(
  '[Products/API] Put Product Success',
  props<{ product: ProductLoaderDto }>()
);

export const putProductFailure = createAction(
  '[Products/API] Put Product Failure',
  props<{ error: any }>()
);

// *********** DELETE PRODUCT ************************************//
export const deleteProduct = createAction(
  '[Product Page] Delete',
  props<{ delProduct: ProductLoaderDto }>()
);

export const deleteProductSuccess = createAction(
  '[Products/API] Delete Product Success'
);

export const deleteProductFailure = createAction(
  '[Products/API] Delete Product Failure',
  props<{ error: any }>()
);
