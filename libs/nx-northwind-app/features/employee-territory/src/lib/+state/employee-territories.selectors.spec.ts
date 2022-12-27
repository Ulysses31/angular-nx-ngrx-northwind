import { EmployeeTerritoriesEntity } from './employee-territories.models';
import {
  employeeTerritoriesAdapter,
  EmployeeTerritoriesPartialState,
  initialEmployeeTerritoriesState
} from './employee-territories.reducer';
import * as EmployeeTerritoriesSelectors from './employee-territories.selectors';

describe('EmployeeTerritories Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEmployeeTerritoriesId = (it: EmployeeTerritoriesEntity) =>
    it.id;
  const createEmployeeTerritoriesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as EmployeeTerritoriesEntity);

  let state: EmployeeTerritoriesPartialState;

  beforeEach(() => {
    state = {
      employeeTerritories: employeeTerritoriesAdapter.setAll(
        [
          createEmployeeTerritoriesEntity('PRODUCT-AAA'),
          createEmployeeTerritoriesEntity('PRODUCT-BBB'),
          createEmployeeTerritoriesEntity('PRODUCT-CCC')
        ],
        {
          ...initialEmployeeTerritoriesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('EmployeeTerritories Selectors', () => {
    it('getAllEmployeeTerritories() should return the list of EmployeeTerritories', () => {
      const results =
        EmployeeTerritoriesSelectors.getAllEmployeeTerritories(state);
      const selId = getEmployeeTerritoriesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EmployeeTerritoriesSelectors.getSelected(
        state
      ) as EmployeeTerritoriesEntity;
      const selId = getEmployeeTerritoriesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getEmployeeTerritoriesLoaded() should return the current "loaded" status', () => {
      const result =
        EmployeeTerritoriesSelectors.getEmployeeTerritoriesLoaded(
          state
        );

      expect(result).toBe(true);
    });

    it('getEmployeeTerritoriesError() should return the current "error" state', () => {
      const result =
        EmployeeTerritoriesSelectors.getEmployeeTerritoriesError(
          state
        );

      expect(result).toBe(ERROR_MSG);
    });
  });
});
