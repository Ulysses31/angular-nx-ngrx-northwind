import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ProductsActions from './products.actions';
import { ProductsEffects } from './products.effects';

describe('ProductsEffects', () => {
  let effects: ProductsEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ProductsEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ProductsEffects);
  });

  describe('initProducts$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: ProductsActions.initProducts()
      });
      const expected = hot('', {
        a: ProductsActions.loadProductsSuccess({ products: [] })
      });
      expect(effects.initProducts$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: ProductsActions.initProducts()
      });
      const expected = hot('-a-|', {
        a: ProductsActions.loadProductsFailure({
          error: 'Failed'
        })
      });
      expect(effects.initProducts$).not.toBeObservable(expected);
    });
  });

  describe('initProduct$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: ProductsActions.initProduct({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: ProductsActions.loadProductSuccess({
          product: {
            productID: '100',
            productName: 'Test A',
            supplierID: 'Test A',
            quantityPerUnit: 0,
            unitPrice: 0,
            unitsInStock: 0,
            unitsOnOrder: 0,
            reorderLevel: 'Test A',
            discontinued: false
          }
        })
      });
      expect(effects.initProducts$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: ProductsActions.initProduct({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: ProductsActions.loadProductFailure({
          error: 'Failed'
        })
      });
      expect(effects.initProduct$).toBeObservable(expected);
    });
  });

  describe('postProduct$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: ProductsActions.postProduct({
          newProduct: {
            productID: '105',
            productName: 'Test A',
            supplierID: 'Test A',
            quantityPerUnit: 0,
            unitPrice: 0,
            unitsInStock: 0,
            unitsOnOrder: 0,
            reorderLevel: 'Test A',
            discontinued: false
          }
        })
      });
      const expected = hot('---|', {
        a: ProductsActions.postProductSuccess({
          product: {
            productID: '105',
            productName: 'Test A',
            supplierID: 'Test A',
            quantityPerUnit: 0,
            unitPrice: 0,
            unitsInStock: 0,
            unitsOnOrder: 0,
            reorderLevel: 'Test A',
            discontinued: false
          }
        })
      });
      expect(effects.postProduct$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: ProductsActions.postProduct({
          newProduct: {
            productID: '105',
            productName: 'Test A',
            supplierID: 'Test A',
            quantityPerUnit: 0,
            unitPrice: 0,
            unitsInStock: 0,
            unitsOnOrder: 0,
            reorderLevel: 'Test A',
            discontinued: false
          }
        })
      });
      const expected = hot('---|', {
        a: ProductsActions.postProductFailure({
          error: 'Failed'
        })
      });
      expect(effects.initProduct$).toBeObservable(expected);
    });
  });

  describe('putProduct$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: ProductsActions.putProduct({
          selectedId: '110',
          putProduct: {
            productID: '110',
            productName: 'Test A',
            supplierID: 'Test A',
            quantityPerUnit: 0,
            unitPrice: 0,
            unitsInStock: 0,
            unitsOnOrder: 0,
            reorderLevel: 'Test A',
            discontinued: false
          }
        })
      });
      const expected = hot('---|', {
        a: ProductsActions.putProductSuccess({
          product: {
            productID: '110',
            productName: 'Test A',
            supplierID: 'Test A',
            quantityPerUnit: 0,
            unitPrice: 0,
            unitsInStock: 0,
            unitsOnOrder: 0,
            reorderLevel: 'Test A',
            discontinued: false
          }
        })
      });
      expect(effects.putProduct$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: ProductsActions.putProduct({
          selectedId: '110',
          putProduct: {
            productID: '110',
            productName: 'Test A',
            supplierID: 'Test A',
            quantityPerUnit: 0,
            unitPrice: 0,
            unitsInStock: 0,
            unitsOnOrder: 0,
            reorderLevel: 'Test A',
            discontinued: false
          }
        })
      });
      const expected = hot('---|', {
        a: ProductsActions.putProductFailure({
          error: 'Failed'
        })
      });
      expect(effects.putProduct$).toBeObservable(expected);
    });
  });

  describe('deleteProduct$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: ProductsActions.deleteProduct({
          delProduct: {
            productID: '110',
            productName: 'Test A',
            supplierID: 'Test A',
            quantityPerUnit: 0,
            unitPrice: 0,
            unitsInStock: 0,
            unitsOnOrder: 0,
            reorderLevel: 'Test A',
            discontinued: false
          }
        })
      });
      const expected = hot('---|', {
        a: ProductsActions.deleteProductSuccess()
      });
      expect(effects.deleteProduct$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: ProductsActions.deleteProduct({
          delProduct: {
            productID: '110',
            productName: 'Test A',
            supplierID: 'Test A',
            quantityPerUnit: 0,
            unitPrice: 0,
            unitsInStock: 0,
            unitsOnOrder: 0,
            reorderLevel: 'Test A',
            discontinued: false
          }
        })
      });
      const expected = hot('---|', {
        a: ProductsActions.deleteProductFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteProduct$).toBeObservable(expected);
    });
  });
});
