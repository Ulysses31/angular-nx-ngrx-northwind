import { SuppliersEntity } from './suppliers.models';
import * as SuppliersSelectors from './suppliers.selectors';

describe('Suppliers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSuppliersId = (it: SuppliersEntity) => it.id;
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

  const createSuppliersState = {
    suppliers: [
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
        'Test B',
        'Test B',
        'Test B',
        'Test B',
        'Test B',
        'Test B',
        'Test B',
        'Test B',
        'Test B',
        'Test B',
        'Test B'
      )
    ],
    supplier: createSuppliersEntity(
      '103',
      'Test C',
      'Test C',
      'Test C',
      'Test C',
      'Test C',
      'Test C',
      'Test C',
      'Test C',
      'Test C',
      'Test C',
      'Test C'
    ),
    loaded: true,
    error: ERROR_MSG
  };

  describe('Suppliers Selectors', () => {
    it('getAllSuppliers() should return the list of Suppliers', () => {
      const results = SuppliersSelectors.selectAllSuppliers({
        suppliers: createSuppliersState
      });
      const selId = getSuppliersId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected Supplier', () => {
      const result = SuppliersSelectors.selectSupplier({
        suppliers: createSuppliersState
      });
      const selId = getSuppliersId(result);
      expect(selId).toBe('103');
    });

    it('getSuppliersLoaded() should return the current "loaded" status', () => {
      const result = SuppliersSelectors.selectSuppliersLoaded({
        suppliers: createSuppliersState
      });

      expect(result).toBe(true);
    });

    it('getSuppliersError() should return the current "error" state', () => {
      const result = SuppliersSelectors.selectSuppliersError({
        suppliers: createSuppliersState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
