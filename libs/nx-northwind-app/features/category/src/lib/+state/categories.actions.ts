/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAction, props } from '@ngrx/store';
import { CategoriesEntity } from './categories.models';

export const initCategories = createAction('[Categories Page] Init');

export const loadCategoriesSuccess = createAction(
  '[Categories/API] Load Categories Success',
  props<{ categories: CategoriesEntity[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories/API] Load Categories Failure',
  props<{ error: any }>()
);
