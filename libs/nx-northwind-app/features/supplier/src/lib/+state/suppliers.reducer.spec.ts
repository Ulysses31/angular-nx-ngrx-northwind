import { Action } from '@ngrx/store';

import * as SuppliersActions from './suppliers.actions';
import { SuppliersEntity } from './suppliers.models';
import {
  initialSuppliersState,
  suppliersReducer,
  SuppliersState
} from './suppliers.reducer';

describe('Suppliers Reducer', () => {
  const createSuppliersEntity = (
    id: string,
    companyName: string,
    contactName: string,
    contactTitle: string,
    address: string,
    city: string,
    region: string,
    postalCode: string,
    country: string,
    phone: string,
    fax: string,
    homePage: string
  ): SuppliersEntity => ({
    id,
    companyName: companyName || `name-${id}`,
    contactName,
    contactTitle,
    address,
    city,
    region,
    postalCode,
    country,
    phone,
    fax,
    homePage
  });

  describe('valid Suppliers actions', () => {
    it('loadSuppliersSuccess should return the list of known Suppliers', () => {
      const suppliers = [
        createSuppliersEntity(
          '100',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A'
        ),
        createSuppliersEntity(
          '101',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A',
          'Test A'
        )
      ];
      const action = SuppliersActions.loadSuppliersSuccess({
        suppliers
      });

      const result: SuppliersState = suppliersReducer(
        initialSuppliersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.suppliers.length).toBe(2);
    });
  });

  describe('valid selected supplier action', () => {
    it('loadSupplierSuccess should return a Supplier', () => {
      const supplier = createSuppliersEntity(
        '102',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = SuppliersActions.loadSupplierSuccess({
        supplier
      });

      const result: SuppliersState = suppliersReducer(
        initialSuppliersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.supplier).not.toBeNull();
      expect(result.supplier.supplierID).toMatch('102');
    });
  });

  describe('valid post supplier action', () => {
    it('postSupplier should post a Supplier', () => {
      const newSupplier = createSuppliersEntity(
        '103',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = SuppliersActions.postSupplier({
        newSupplier
      });

      const result: SuppliersState = suppliersReducer(
        initialSuppliersState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.supplier).not.toBeNull();
      expect(result.supplier.supplierID).toMatch('103');
    });
  });

  describe('valid post success supplier action', () => {
    it('postSupplierSuccess should success post a Supplier', () => {
      const supplier = createSuppliersEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = SuppliersActions.postSupplierSuccess({
        supplier
      });

      const result: SuppliersState = suppliersReducer(
        initialSuppliersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.supplier).not.toBeNull();
      expect(result.supplier.supplierID).toMatch('104');
    });
  });

  describe('valid put supplier action', () => {
    it('putSupplier should put a Supplier', () => {
      const putSupplier = createSuppliersEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = SuppliersActions.putSupplier({
        selectedId: '104',
        putSupplier
      });

      const result: SuppliersState = suppliersReducer(
        initialSuppliersState,
        action
      );

      //expect(result.loaded).toBe(true);
      expect(result.supplier).not.toBeNull();
      expect(result.supplier.supplierID).toMatch('104');
    });
  });

  describe('valid put success supplier action', () => {
    it('putSupplierSuccess should success put a Supplier', () => {
      const supplier = createSuppliersEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = SuppliersActions.putSupplierSuccess({
        supplier
      });

      const result: SuppliersState = suppliersReducer(
        initialSuppliersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.supplier).not.toBeNull();
      expect(result.supplier.supplierID).toMatch('104');
    });
  });

  describe('valid delete supplier action', () => {
    it('deleteSupplier should delete a Supplier', () => {
      const delSupplier = createSuppliersEntity(
        '104',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      );

      const action = SuppliersActions.deleteSupplier({
        delSupplier
      });

      const result: SuppliersState = suppliersReducer(
        initialSuppliersState,
        action
      );

      expect(result.supplier).not.toBeNull();
      expect(result.supplier.supplierID).toMatch('104');
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = suppliersReducer(initialSuppliersState, action);

      expect(result).toBe(initialSuppliersState);
    });
  });
});
