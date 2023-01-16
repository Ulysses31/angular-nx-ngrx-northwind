/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { CategoryDto } from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT CATEGORIES *************************************//
export const initCategories = createAction('[Categories Page] Init');

export const loadCategoriesSuccess = createAction(
  '[Categories/API] Load Categories Success',
  props<{ categories: CategoryDto[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories/API] Load Categories Failure',
  props<{ error: any }>()
);

// *********** SELECTED CATEGORY ***********************************//
export const initCategory = createAction(
  '[Category Page] Init',
  props<{ selectedId: string }>()
);

export const loadCategorySuccess = createAction(
  '[Categories/API] Load Category Success',
  props<{ category: CategoryDto }>()
);

export const loadCategoryFailure = createAction(
  '[Categories/API] Load Category Failure',
  props<{ error: any }>()
);

// *********** POST CATEGORY **************************************//
export const postCategory = createAction(
  '[Category Page] Post',
  props<{ newCategory: CategoryDto }>()
);

export const postCategorySuccess = createAction(
  '[Categories/API] Post Category Success',
  props<{ category: CategoryDto }>()
);

export const postCategoryFailure = createAction(
  '[Categories/API] Post Category Failure',
  props<{ error: any }>()
);

// *********** PUT CATEGORY ***************************************//
export const putCategory = createAction(
  '[Category Page] Put',
  props<{ selectedId: string; putCategory: CategoryDto }>()
);

export const putCategorySuccess = createAction(
  '[Categories/API] Put Category Success',
  props<{ category: CategoryDto }>()
);

export const putCategoryFailure = createAction(
  '[Categories/API] Put Category Failure',
  props<{ error: any }>()
);

// *********** DELETE CATEGORY ************************************//
export const deleteCategory = createAction(
  '[Category Page] Delete',
  props<{ delCategory: CategoryDto }>()
);

export const deleteCategorySuccess = createAction(
  '[Categories/API] Delete Category Success'
);

export const deleteCategoryFailure = createAction(
  '[Categories/API] Delete Category Failure',
  props<{ error: any }>()
);
