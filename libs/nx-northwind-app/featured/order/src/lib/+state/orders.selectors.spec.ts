import { OrdersEntity } from './orders.models';
import * as OrdersSelectors from './orders.selectors';

describe('Orders Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getOrdersId = (it: OrdersEntity) => it.id;
  const createOrdersEntity = (
    id: string,
    orderID: string,
    customerID: string,
    employeeID: string,
    orderDate: Date,
    requiredDate: Date,
    shippedDate: Date,
    shipVia: string,
    freight: string,
    shipName: string,
    shipAddress: string,
    shipCity: string,
    shipRegion: string,
    shipPostalCode: string,
    shipCountry: string
  ): OrdersEntity => ({
    id,
    orderID: id,
    customerID,
    employeeID,
    orderDate,
    requiredDate,
    shippedDate,
    shipVia,
    freight,
    shipName,
    shipAddress,
    shipCity,
    shipRegion,
    shipPostalCode,
    shipCountry
  });

  const createOrdersState = {
    orders: [
      createOrdersEntity(
        '100',
        '1',
        '2',
        'Test A',
        new Date(),
        new Date(),
        new Date(),
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        'Test A'
      ),
      createOrdersEntity(
        '101',
        '1',
        '2',
        'Test B',
        new Date(),
        new Date(),
        new Date(),
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
    order: createOrdersEntity(
      '103',
      '1',
      '2',
      'Test C',
      new Date(),
      new Date(),
      new Date(),
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

  describe('Orders Selectors', () => {
    it('getAllOrders() should return the list of Orders', () => {
      const results = OrdersSelectors.selectAllOrders({
        orders: createOrdersState
      });
      const selId = getOrdersId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected Order', () => {
      const result = OrdersSelectors.selectOrder({
        orders: createOrdersState
      });
      const selId = getOrdersId(result);
      expect(selId).toBe('103');
    });

    it('getOrdersLoaded() should return the current "loaded" status', () => {
      const result = OrdersSelectors.selectOrdersLoaded({
        orders: createOrdersState
      });

      expect(result).toBe(true);
    });

    it('getOrdersError() should return the current "error" state', () => {
      const result = OrdersSelectors.selectOrdersError({
        orders: createOrdersState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
