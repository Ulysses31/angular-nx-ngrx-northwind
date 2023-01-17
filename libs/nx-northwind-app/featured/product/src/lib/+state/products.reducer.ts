/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { ProductDto } from '@nx-northwind/nx-northwind-app/entities';

import * as ProductsActions from './products.actions';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState {
  products: ProductDto[];
  product: ProductDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialProductsState: ProductsState = {
  products: [],
  product: {},
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialProductsState,
  // *********** INIT CATEGORIES ******************************//
  on(ProductsActions.initProducts, (state) => ({
    ...state,
    product: {},
    loaded: false,
    error: null
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    product: {},
    loaded: true,
    error: null
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    products: [],
    product: {},
    loaded: true,
    error
  })),
  // *********** SELECTED CATEGORY ****************************//
  on(ProductsActions.initProduct, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(ProductsActions.loadProductSuccess, (state, { product }) => ({
    ...state,
    product,
    loaded: true,
    error: null
  })),
  on(ProductsActions.loadProductFailure, (state, { error }) => ({
    ...state,
    product: {},
    loaded: true,
    error
  })),
  // *********** POST CATEGORY *******************************//
  on(ProductsActions.postProduct, (state, { newProduct }) => ({
    ...state,
    product: newProduct,
    loaded: false,
    error: null
  })),
  on(ProductsActions.postProductSuccess, (state, { product }) => ({
    ...state,
    product,
    loaded: true,
    error: null
  })),
  on(ProductsActions.postProductFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT CATEGORY *******************************//
  on(ProductsActions.putProduct, (state, { putProduct }) => ({
    ...state,
    product: putProduct,
    loaded: false,
    error: null
  })),
  on(ProductsActions.putProductSuccess, (state, { product }) => ({
    ...state,
    product,
    loaded: true,
    error: null
  })),
  on(ProductsActions.putProductFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE CATEGORY ****************************//
  on(ProductsActions.deleteProduct, (state, { delProduct }) => ({
    ...state,
    product: delProduct,
    loaded: false,
    error: null
  })),
  on(ProductsActions.deleteProductSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(ProductsActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  }))
);

export function productsReducer(
  state: ProductsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
