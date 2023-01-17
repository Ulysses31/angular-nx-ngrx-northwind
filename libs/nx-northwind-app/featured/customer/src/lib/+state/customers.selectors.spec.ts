import { CustomersEntity } from './customers.models';
import * as CustomersSelectors from './customers.selectors';

describe('Customers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCustomersId = (it: CustomersEntity) => it.id;
  const createCustomersEntity = (
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
    fax: string
  ): CustomersEntity => ({
    id,
    customerID: id,
    companyName: companyName || `name-${id}`,
    contactName,
    contactTitle,
    address,
    city,
    region,
    postalCode,
    country,
    phone,
    fax
  });

  const createCustomersState = {
    customers: [
      createCustomersEntity(
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
        'Test A'
      ),
      createCustomersEntity(
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
        'Test B'
      )
    ],
    customer: createCustomersEntity(
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
      'Test C'
    ),
    loaded: true,
    error: ERROR_MSG
  };

  describe('Customers Selectors', () => {
    it('getAllCustomers() should return the list of Customers', () => {
      const results = CustomersSelectors.selectAllCustomers({
        customers: createCustomersState
      });
      const selId = getCustomersId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected Customer', () => {
      const result = CustomersSelectors.selectCustomer({
        customers: createCustomersState
      });
      const selId = getCustomersId(result);
      expect(selId).toBe('103');
    });

    it('getCustomersLoaded() should return the current "loaded" status', () => {
      const result = CustomersSelectors.selectCustomersLoaded({
        customers: createCustomersState
      });

      expect(result).toBe(true);
    });

    it('getCustomersError() should return the current "error" state', () => {
      const result = CustomersSelectors.selectCustomersError({
        customers: createCustomersState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
