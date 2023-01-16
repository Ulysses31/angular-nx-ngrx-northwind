import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CategoriesActions from './categories.actions';
import { CategoriesEffects } from './categories.effects';

describe('CategoriesEffects', () => {
  let effects: CategoriesEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        CategoriesEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(CategoriesEffects);
  });

  describe('initCategories$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: CategoriesActions.initCategories()
      });
      const expected = hot('', {
        a: CategoriesActions.loadCategoriesSuccess({ categories: [] })
      });
      expect(effects.initCategories$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: CategoriesActions.initCategories()
      });
      const expected = hot('-a-|', {
        a: CategoriesActions.loadCategoriesFailure({
          error: 'Failed'
        })
      });
      expect(effects.initCategories$).not.toBeObservable(expected);
    });
  });

  describe('initCategory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: CategoriesActions.initCategory({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: CategoriesActions.loadCategorySuccess({
          category: {
            categoryID: '100',
            categoryName: 'Test A',
            description: 'Test'
          }
        })
      });
      expect(effects.initCategories$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: CategoriesActions.initCategory({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: CategoriesActions.loadCategoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.initCategory$).toBeObservable(expected);
    });
  });

  describe('postCategory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: CategoriesActions.postCategory({
          newCategory: {
            categoryID: '105',
            categoryName: 'New Cat',
            description: 'new Cat Descr'
          }
        })
      });
      const expected = hot('---|', {
        a: CategoriesActions.postCategorySuccess({
          category: {
            categoryID: '105',
            categoryName: 'New Cat',
            description: 'new Cat Descr'
          }
        })
      });
      expect(effects.postCategory$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: CategoriesActions.postCategory({
          newCategory: {
            categoryID: '105',
            categoryName: 'New Cat',
            description: 'new Cat Descr'
          }
        })
      });
      const expected = hot('---|', {
        a: CategoriesActions.postCategoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.initCategory$).toBeObservable(expected);
    });
  });

  describe('putCategory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: CategoriesActions.putCategory({
          selectedId: '110',
          putCategory: {
            categoryID: '110',
            categoryName: 'Update Cat',
            description: 'Update Cat Descr'
          }
        })
      });
      const expected = hot('---|', {
        a: CategoriesActions.putCategorySuccess({
          category: {
            categoryID: '110',
            categoryName: 'Update Cat',
            description: 'Update Cat Descr'
          }
        })
      });
      expect(effects.putCategory$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: CategoriesActions.putCategory({
          selectedId: '110',
          putCategory: {
            categoryID: '110',
            categoryName: 'Update Cat',
            description: 'Update Cat Descr'
          }
        })
      });
      const expected = hot('---|', {
        a: CategoriesActions.putCategoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.putCategory$).toBeObservable(expected);
    });
  });

  describe('deleteCategory$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: CategoriesActions.deleteCategory({
          delCategory: {
            categoryID: '110',
            categoryName: 'Delete Cat',
            description: 'Delete Cat Descr'
          }
        })
      });
      const expected = hot('---|', {
        a: CategoriesActions.deleteCategorySuccess()
      });
      expect(effects.deleteCategory$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: CategoriesActions.deleteCategory({
          delCategory: {
            categoryID: '110',
            categoryName: 'Delete Cat',
            description: 'Delete Cat Descr'
          }
        })
      });
      const expected = hot('---|', {
        a: CategoriesActions.deleteCategoryFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteCategory$).toBeObservable(expected);
    });
  });
});
