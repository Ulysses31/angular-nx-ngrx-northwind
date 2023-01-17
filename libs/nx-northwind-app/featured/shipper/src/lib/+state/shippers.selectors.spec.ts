import { ShippersEntity } from './shippers.models';
import * as ShippersSelectors from './shippers.selectors';

describe('Shippers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getShippersId = (it: ShippersEntity) => it.id;
  const createShippersEntity = (
    id: string,
    companyName: string,
    phone: string
  ): ShippersEntity => ({
    id,
    shipperID: id,
    companyName: companyName || `name-${id}`,
    phone
  });

  const createShippersState = {
    shippers: [
      createShippersEntity('100', 'Test A', 'Test A'),
      createShippersEntity('101', 'Test B', 'Test B...')
    ],
    shipper: createShippersEntity('103', 'Test C', 'Test C...'),
    loaded: true,
    error: ERROR_MSG
  };

  describe('Shippers Selectors', () => {
    it('getAllShippers() should return the list of Shippers', () => {
      const results = ShippersSelectors.selectAllShippers({
        shippers: createShippersState
      });
      const selId = getShippersId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected Shipper', () => {
      const result = ShippersSelectors.selectShipper({
        shippers: createShippersState
      });
      const selId = getShippersId(result);
      expect(selId).toBe('103');
    });

    it('getShippersLoaded() should return the current "loaded" status', () => {
      const result = ShippersSelectors.selectShippersLoaded({
        shippers: createShippersState
      });

      expect(result).toBe(true);
    });

    it('getShippersError() should return the current "error" state', () => {
      const result = ShippersSelectors.selectShippersError({
        shippers: createShippersState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
