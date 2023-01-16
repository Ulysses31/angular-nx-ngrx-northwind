import { CategoriesEntity } from './categories.models';
import * as CategoriesSelectors from './categories.selectors';

describe('Categories Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCategoriesId = (it: CategoriesEntity) => it.id;
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

  const createCategoriesState = {
    categories: [
      createCategoriesEntity('100', 'Test A', 'Test A'),
      createCategoriesEntity('101', 'Test B', 'Test B...')
    ],
    category: createCategoriesEntity('103', 'Test C', 'Test C...'),
    loaded: true,
    error: ERROR_MSG
  };

  describe('Categories Selectors', () => {
    it('getAllCategories() should return the list of Categories', () => {
      const results = CategoriesSelectors.selectAllCategories({
        categories: createCategoriesState
      });
      const selId = getCategoriesId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected Category', () => {
      const result = CategoriesSelectors.selectCategory({
        categories: createCategoriesState
      });
      const selId = getCategoriesId(result);
      expect(selId).toBe('103');
    });

    it('getCategoriesLoaded() should return the current "loaded" status', () => {
      const result = CategoriesSelectors.selectCategoriesLoaded({
        categories: createCategoriesState
      });

      expect(result).toBe(true);
    });

    it('getCategoriesError() should return the current "error" state', () => {
      const result = CategoriesSelectors.selectCategoriesError({
        categories: createCategoriesState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
