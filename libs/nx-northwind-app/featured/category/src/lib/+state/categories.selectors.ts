import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CategoriesState, CATEGORIES_FEATURE_KEY
} from './categories.reducer';

export const selectCategoriesState =
  createFeatureSelector<CategoriesState>(CATEGORIES_FEATURE_KEY);

export const selectCategoriesLoaded = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => {
    return state.loaded;
  }
);

export const selectCategoriesError = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => {
    return state.error;
  }
);

export const selectAllCategories = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => {
    return state.categories;
  }
);

export const selectCategory = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => {
    return state.category;
  }
);

// export const selectSelectedCategory = createSelector(
//   selectAllCategories,
//   selectSelectedId,
//   (categories, selectedId) =>
//     selectedId
//       ? categories.find((item) => item.id === selectedId)
//       : undefined
// );
