import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CategoriesActions from './categories.actions';
import { CategoriesEntity } from './categories.models';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface CategoriesState
  extends EntityState<CategoriesEntity> {
  selectedId?: string | number; // which Categories record has been selected
  loaded: boolean; // has the Categories list been loaded
  error?: string | null; // last known error (if any)
}

export interface CategoriesPartialState {
  readonly [CATEGORIES_FEATURE_KEY]: CategoriesState;
}

export const categoriesAdapter: EntityAdapter<CategoriesEntity> =
  createEntityAdapter<CategoriesEntity>();

export const initialCategoriesState: CategoriesState =
  categoriesAdapter.getInitialState({
    // set initial required properties
    loaded: false
  });

const reducer = createReducer(
  initialCategoriesState,
  on(CategoriesActions.initCategories, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    CategoriesActions.loadCategoriesSuccess,
    (state, { categories }) =>
      categoriesAdapter.setAll(categories, { ...state, loaded: true })
  ),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function categoriesReducer(
  state: CategoriesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
