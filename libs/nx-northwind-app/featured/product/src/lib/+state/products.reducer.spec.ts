import { Action } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { ProductsEntity } from './products.models';
import {
  initialProductsState,
  productsReducer,
  ProductsState
} from './products.reducer';

describe('Products Reducer', () => {
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

  describe('valid Products actions', () => {
    it('loadProductsSuccess should return the list of known Products', () => {
      const products = [
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
          'Test A',
          'Test A',
          'Test A',
          0,
          0,
          0,
          0,
          'Test A',
          false
        )
      ];
      const action = ProductsActions.loadProductsSuccess({
        products
      });

      const result: ProductsState = productsReducer(
        initialProductsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.products.length).toBe(2);
    });
  });

  describe('valid selected product action', () => {
    it('loadProductSuccess should return a Product', () => {
      const product = createProductsEntity(
        '102',
        'Test A',
        'Test A',
        'Test A',
        0,
        0,
        0,
        0,
        'Test A',
        false
      );

      const action = ProductsActions.loadProductSuccess({
        product
      });

      const result: ProductsState = productsReducer(
        initialProductsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.product).not.toBeNull();
      expect(result.product.productID).toMatch('102');
    });
  });

  describe('valid post product action', () => {
    it('postProduct should post a Product', () => {
      const newProduct = createProductsEntity(
        '103',
        'Test A',
        'Test A',
        'Test A',
        0,
        0,
        0,
        0,
        'Test A',
        false
      );

      const action = ProductsActions.postProduct({
        newProduct
      });

      const result: ProductsState = productsReducer(
        initialProductsState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.product).not.toBeNull();
      expect(result.product.productID).toMatch('103');
    });
  });

  describe('valid post success product action', () => {
    it('postProductSuccess should success post a Product', () => {
      const product = createProductsEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        0,
        0,
        0,
        0,
        'Test A',
        false
      );

      const action = ProductsActions.postProductSuccess({
        product
      });

      const result: ProductsState = productsReducer(
        initialProductsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.product).not.toBeNull();
      expect(result.product.productID).toMatch('104');
    });
  });

  describe('valid put product action', () => {
    it('putProduct should put a Product', () => {
      const putProduct = createProductsEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        0,
        0,
        0,
        0,
        'Test A',
        false
      );

      const action = ProductsActions.putProduct({
        selectedId: '104',
        putProduct
      });

      const result: ProductsState = productsReducer(
        initialProductsState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.product).not.toBeNull();
      expect(result.product.productID).toMatch('104');
    });
  });

  describe('valid put success product action', () => {
    it('putProductSuccess should success put a Product', () => {
      const product = createProductsEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        0,
        0,
        0,
        0,
        'Test A',
        false
      );

      const action = ProductsActions.putProductSuccess({
        product
      });

      const result: ProductsState = productsReducer(
        initialProductsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.product).not.toBeNull();
      expect(result.product.productID).toMatch('104');
    });
  });

  describe('valid delete product action', () => {
    it('deleteProduct should delete a Product', () => {
      const delProduct = createProductsEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        0,
        0,
        0,
        0,
        'Test A',
        false
      );

      const action = ProductsActions.deleteProduct({
        delProduct
      });

      const result: ProductsState = productsReducer(
        initialProductsState,
        action
      );

      expect(result.product).not.toBeNull();
      expect(result.product.productID).toMatch('104');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = productsReducer(initialProductsState, action);

      expect(result).toBe(initialProductsState);
    });
  });
});
