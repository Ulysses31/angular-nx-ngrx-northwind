import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ProductsState,
  PRODUCTS_FEATURE_KEY
} from './products.reducer';

export const selectProductsState =
  createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

export const selectProductsLoaded = createSelector(
  selectProductsState,
  (state: ProductsState) => {
    return state.loaded;
  }
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => {
    return state.error;
  }
);

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => {
    return state.products;
  }
);

export const selectProduct = createSelector(
  selectProductsState,
  (state: ProductsState) => {
    return state.product;
  }
);

export const selectProductSuppliers = createSelector(
  selectProductsState,
  (state: ProductsState) => {
    return state.suppliers;
  }
);

export const selectProductCategories = createSelector(
  selectProductsState,
  (state: ProductsState) => {
    return state.categories;
  }
);

// export const selectSelectedProduct = createSelector(
//   selectAllProducts,
//   selectSelectedId,
//   (products, selectedId) =>
//     selectedId
//       ? products.find((item) => item.id === selectedId)
//       : undefined
// );
