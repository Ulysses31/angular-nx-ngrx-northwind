/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import {
  CategoryBrowserDto,
  ProductBrowserDto,
  ProductLoaderDto,
  SupplierBrowserDto
} from '@nx-northwind/nx-northwind-app/entities';

import * as ProductsActions from './products.actions';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState {
  products: ProductBrowserDto[];
  product: ProductLoaderDto | any;
  suppliers: SupplierBrowserDto[];
  categories: CategoryBrowserDto[];
  loaded: boolean;
  error?: string | null;
}

export const initialProductsState: ProductsState = {
  products: [],
  product: {},
  suppliers: [],
  categories: [],
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialProductsState,
  // *********** INIT SUPPLIERS ******************************//
  on(ProductsActions.initProductSuppliers, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    ProductsActions.loadProductSuppliersSuccess,
    (state, { suppliers }) => ({
      ...state,
      suppliers,
      loaded: true,
      error: null
    })
  ),
  on(
    ProductsActions.loadProductSuppliersFailure,
    (state, { error }) => ({
      ...state,
      suppliers: [],
      loaded: true,
      error
    })
  ),
  // *********** INIT CATEGORIES ******************************//
  on(ProductsActions.initProductCategories, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    ProductsActions.loadProductCategoriesSuccess,
    (state, { categories }) => ({
      ...state,
      categories,
      loaded: true,
      error: null
    })
  ),
  on(
    ProductsActions.loadProductCategoriesFailure,
    (state, { error }) => ({
      ...state,
      categories: [],
      loaded: true,
      error
    })
  ),
  // *********** INIT PRODUCTS ******************************//
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
  // *********** SELECTED PRODUCT ****************************//
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
  // *********** POST PRODUCT *******************************//
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
  // *********** PUT PRODUCT *******************************//
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
  // *********** DELETE PRODUCT ****************************//
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
