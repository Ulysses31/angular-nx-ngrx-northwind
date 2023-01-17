import { ProductsEntity } from './products.models';
import * as ProductsSelectors from './products.selectors';

describe('Products Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProductsId = (it: ProductsEntity) => it.id;
  const createProductsEntity = (
    id: string,
    productID: string,
    productName: string,
    supplierID: string,
    quantityPerUnit: number,
    unitPrice: number,
    unitsInStock: number,
    unitsOnOrder: number,
    reorderLevel: string,
    discontinued: boolean
  ): ProductsEntity => ({
    id,
    productID: id,
    productName: productName || `name-${id}`,
    supplierID,
    quantityPerUnit,
    unitPrice,
    unitsInStock,
    unitsOnOrder,
    reorderLevel,
    discontinued
  });

  const createProductsState = {
    products: [
      createProductsEntity(
        '100',
        'Test A',
        'Test A',
        'Test A',
        0,
        0,
        0,
        0,
        'Test A',
        false
      ),
      createProductsEntity(
        '101',
        'Test B',
        'Test B',
        'Test B',
        0,
        0,
        0,
        0,
        'Test B',
        false
      )
    ],
    product: createProductsEntity(
      '103',
      'Test C',
      'Test C',
      'Test C',
      0,
      0,
      0,
      0,
      'Test C',
      false
    ),
    loaded: true,
    error: ERROR_MSG
  };

  describe('Products Selectors', () => {
    it('getAllProducts() should return the list of Products', () => {
      const results = ProductsSelectors.selectAllProducts({
        products: createProductsState
      });
      const selId = getProductsId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected Product', () => {
      const result = ProductsSelectors.selectProduct({
        products: createProductsState
      });
      const selId = getProductsId(result);
      expect(selId).toBe('103');
    });

    it('getProductsLoaded() should return the current "loaded" status', () => {
      const result = ProductsSelectors.selectProductsLoaded({
        products: createProductsState
      });

      expect(result).toBe(true);
    });

    it('getProductsError() should return the current "error" state', () => {
      const result = ProductsSelectors.selectProductsError({
        products: createProductsState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
