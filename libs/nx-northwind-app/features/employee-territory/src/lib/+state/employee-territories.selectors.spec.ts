import { EmployeeTerritoriesEntity } from './employee-territories.models';
import * as EmployeeTerritoriesSelectors from './employee-territories.selectors';

describe('EmployeeTerritories Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEmployeeTerritoriesId = (it: EmployeeTerritoriesEntity) =>
    it.id;
  const createEmployeeTerritoriesEntity = (
    id: string,
    employeeID: string,
    territoryID: string
  ): EmployeeTerritoriesEntity => ({
    id,
    employeeID: id,
    territoryID
  });

  const createEmployeeTerritoriesState = {
    employeeTerritories: [
      createEmployeeTerritoriesEntity('100', '1', '2'),
      createEmployeeTerritoriesEntity('101', '1', '2')
    ],
    employeeTerritory: createEmployeeTerritoriesEntity(
      '103',
      '1',
      '2'
    ),
    loaded: true,
    error: ERROR_MSG
  };

  describe('EmployeeTerritories Selectors', () => {
    it('getAllEmployeeTerritories() should return the list of EmployeeTerritories', () => {
      const results =
        EmployeeTerritoriesSelectors.selectAllEmployeeTerritories({
          employeeTerritories: createEmployeeTerritoriesState
        });
      const selId = getEmployeeTerritoriesId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected EmployeeTerritory', () => {
      const result =
        EmployeeTerritoriesSelectors.selectEmployeeTerritory({
          employeeTerritories: createEmployeeTerritoriesState
        });
      const selId = getEmployeeTerritoriesId(result);
      expect(selId).toBe('103');
    });

    it('getEmployeeTerritoriesLoaded() should return the current "loaded" status', () => {
      const result =
        EmployeeTerritoriesSelectors.selectEmployeeTerritoriesLoaded({
          employeeTerritories: createEmployeeTerritoriesState
        });

      expect(result).toBe(true);
    });

    it('getEmployeeTerritoriesError() should return the current "error" state', () => {
      const result =
        EmployeeTerritoriesSelectors.selectEmployeeTerritoriesError({
          employeeTerritories: createEmployeeTerritoriesState
        });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
