import { OrderDetailsEntity } from './order-details.models';
import * as OrderDetailsSelectors from './order-details.selectors';

describe('OrderDetails Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getOrderDetailsId = (it: OrderDetailsEntity) => it.id;
  const createOrderDetailsEntity = (
    id: string,
    productID: string,
    unitPrice: number,
    quantity: number,
    discount: number
  ): OrderDetailsEntity => ({
    id,
    orderID: id,
    productID,
    unitPrice,
    quantity,
    discount
  });

  const createOrderDetailsState = {
    orderDetails: [
      createOrderDetailsEntity('100', '1', 0, 0, 0),
      createOrderDetailsEntity('101', '1', 0, 0, 0)
    ],
    orderDetail: createOrderDetailsEntity('103', '1', 0, 0, 0),
    loaded: true,
    error: ERROR_MSG
  };

  describe('OrderDetails Selectors', () => {
    it('getAllOrderDetails() should return the list of OrderDetails', () => {
      const results = OrderDetailsSelectors.selectAllOrderDetails({
        orderDetails: createOrderDetailsState
      });
      const selId = getOrderDetailsId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected OrderDetail', () => {
      const result = OrderDetailsSelectors.selectOrderDetail({
        orderDetails: createOrderDetailsState
      });
      const selId = getOrderDetailsId(result);
      expect(selId).toBe('103');
    });

    it('getOrderDetailsLoaded() should return the current "loaded" status', () => {
      const result = OrderDetailsSelectors.selectOrderDetailsLoaded({
        orderDetails: createOrderDetailsState
      });

      expect(result).toBe(true);
    });

    it('getOrderDetailsError() should return the current "error" state', () => {
      const result = OrderDetailsSelectors.selectOrderDetailsError({
        orderDetails: createOrderDetailsState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
