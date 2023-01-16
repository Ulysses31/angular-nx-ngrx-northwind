import { Action } from '@ngrx/store';

import * as CategoriesActions from './categories.actions';
import { CategoriesEntity } from './categories.models';
import {
  CategoriesState,
  initialCategoriesState,
  categoriesReducer
} from './categories.reducer';

describe('Categories Reducer', () => {
  const createCategoriesEntity = (
    id: string,
    categoryName: string,
    description: string
  ): CategoriesEntity => ({
    id,
    categoryID: id,
    categoryName: categoryName || `name-${id}`,
    description
  });

  describe('valid Categories actions', () => {
    it('loadCategoriesSuccess should return the list of known Categories', () => {
      const categories = [
        createCategoriesEntity(
          '100',
          'Test Category',
          'This is a test category'
        ),
        createCategoriesEntity(
          '101',
          'Test Category 2',
          'This is a test category 2'
        )
      ];
      const action = CategoriesActions.loadCategoriesSuccess({
        categories
      });

      const result: CategoriesState = categoriesReducer(
        initialCategoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.categories.length).toBe(2);
    });
  });

  describe('valid selected category action', () => {
    it('loadCategorySuccess should return a Category', () => {
      const category = createCategoriesEntity(
        '102',
        'Selected Category',
        'Test selected category'
      );

      const action = CategoriesActions.loadCategorySuccess({
        category
      });

      const result: CategoriesState = categoriesReducer(
        initialCategoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.category).not.toBeNull();
      expect(result.category.categoryID).toMatch('102');
    });
  });

  describe('valid post category action', () => {
    it('postCategory should post a Category', () => {
      const newCategory = createCategoriesEntity(
        '103',
        'New Category',
        'New Test category'
      );

      const action = CategoriesActions.postCategory({
        newCategory
      });

      const result: CategoriesState = categoriesReducer(
        initialCategoriesState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.category).not.toBeNull();
      expect(result.category.categoryID).toMatch('103');
    });
  });

  describe('valid post success category action', () => {
    it('postCategorySuccess should success post a Category', () => {
      const category = createCategoriesEntity(
        '104',
        'New Category',
        'New Test category'
      );

      const action = CategoriesActions.postCategorySuccess({
        category
      });

      const result: CategoriesState = categoriesReducer(
        initialCategoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.category).not.toBeNull();
      expect(result.category.categoryID).toMatch('104');
    });
  });

  describe('valid put category action', () => {
    it('putCategory should put a Category', () => {
      const putCategory = createCategoriesEntity(
        '104',
        'New Category',
        'New Test category'
      );

      const action = CategoriesActions.putCategory({
        selectedId: '104',
        putCategory
      });

      const result: CategoriesState = categoriesReducer(
        initialCategoriesState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.category).not.toBeNull();
      expect(result.category.categoryID).toMatch('104');
    });
  });

  describe('valid put success category action', () => {
    it('putCategorySuccess should success put a Category', () => {
      const category = createCategoriesEntity(
        '104',
        'New Category',
        'New Test category'
      );

      const action = CategoriesActions.putCategorySuccess({
        category
      });

      const result: CategoriesState = categoriesReducer(
        initialCategoriesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.category).not.toBeNull();
      expect(result.category.categoryID).toMatch('104');
    });
  });

  describe('valid delete category action', () => {
    it('deleteCategory should delete a Category', () => {
      const delCategory = createCategoriesEntity(
        '104',
        'New Category',
        'New Test category'
      );

      const action = CategoriesActions.deleteCategory({
        delCategory
      });

      const result: CategoriesState = categoriesReducer(
        initialCategoriesState,
        action
      );

      expect(result.category).not.toBeNull();
      expect(result.category.categoryID).toMatch('104');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = categoriesReducer(
        initialCategoriesState,
        action
      );

      expect(result).toBe(initialCategoriesState);
    });
  });
});
