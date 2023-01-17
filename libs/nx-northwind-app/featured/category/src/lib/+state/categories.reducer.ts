/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { CategoryDto } from '@nx-northwind/nx-northwind-app/entities';

import * as CategoriesActions from './categories.actions';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface CategoriesState {
  categories: CategoryDto[];
  category: CategoryDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialCategoriesState: CategoriesState = {
  categories: [],
  category: {},
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialCategoriesState,
  // *********** INIT CATEGORIES ******************************//
  on(CategoriesActions.initCategories, (state) => ({
    ...state,
    category: {},
    loaded: false,
    error: null
  })),
  on(
    CategoriesActions.loadCategoriesSuccess,
    (state, { categories }) => ({
      ...state,
      categories,
      category: {},
      loaded: true,
      error: null
    })
  ),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    categories: [],
    category: {},
    loaded: true,
    error
  })),
  // *********** SELECTED CATEGORY ****************************//
  on(CategoriesActions.initCategory, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    CategoriesActions.loadCategorySuccess,
    (state, { category }) => ({
      ...state,
      category,
      loaded: true,
      error: null
    })
  ),
  on(CategoriesActions.loadCategoryFailure, (state, { error }) => ({
    ...state,
    category: {},
    loaded: true,
    error
  })),
  // *********** POST CATEGORY *******************************//
  on(CategoriesActions.postCategory, (state, { newCategory }) => ({
    ...state,
    category: newCategory,
    loaded: false,
    error: null
  })),
  on(
    CategoriesActions.postCategorySuccess,
    (state, { category }) => ({
      ...state,
      category,
      loaded: true,
      error: null
    })
  ),
  on(CategoriesActions.postCategoryFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT CATEGORY *******************************//
  on(CategoriesActions.putCategory, (state, { putCategory }) => ({
    ...state,
    category: putCategory,
    loaded: false,
    error: null
  })),
  on(CategoriesActions.putCategorySuccess, (state, { category }) => ({
    ...state,
    category,
    loaded: true,
    error: null
  })),
  on(CategoriesActions.putCategoryFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE CATEGORY ****************************//
  on(CategoriesActions.deleteCategory, (state, { delCategory }) => ({
    ...state,
    category: delCategory,
    loaded: false,
    error: null
  })),
  on(CategoriesActions.deleteCategorySuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(CategoriesActions.deleteCategoryFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  }))
);

export function categoriesReducer(
  state: CategoriesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
