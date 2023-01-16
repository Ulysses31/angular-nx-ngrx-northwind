import { EmployeesEntity } from './employees.models';
import * as EmployeesSelectors from './employees.selectors';

describe('Employees Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEmployeesId = (it: EmployeesEntity) => it.id;
  const createEmployeesEntity = (
    id: string,
    lastName: string,
    firstName: string,
    title: string,
    titleOfCourtesy: string,
    birthDate: Date,
    hireDate: Date,
    address: string,
    city: string,
    region: string,
    postalCode: string,
    country: string,
    homePhone: string,
    extension: string,
    notes: string,
    reportsTo: string,
    photoPath: string
  ): EmployeesEntity => ({
    id,
    employeeID: id,
    lastName: lastName || `name-${id}`,
    firstName,
    title,
    titleOfCourtesy,
    birthDate,
    hireDate,
    address,
    city,
    region,
    postalCode,
    country,
    homePhone,
    extension,
    notes,
    reportsTo,
    photoPath
  });

  const createEmployeesState = {
    employees: [
      createEmployeesEntity(
        '100',
        'Test A',
        'Test A',
        'Test A',
        'Test A',
        new Date(),
        new Date(),
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
      createEmployeesEntity(
        '101',
        'Test B',
        'Test B',
        'Test B',
        'Test B',
        new Date(),
        new Date(),
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
    category: createEmployeesEntity(
      '103',
      'Test C',
      'Test C',
      'Test C',
      'Test C',
      new Date(),
      new Date(),
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

  describe('Employees Selectors', () => {
    it('getAllEmployees() should return the list of Employees', () => {
      const results = EmployeesSelectors.selectAllEmployees({
        employees: createEmployeesState
      });
      const selId = getEmployeesId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('101');
    });

    it('getSelected() should return the selected Employee', () => {
      const result = EmployeesSelectors.selectEmployee({
        employees: createEmployeesState
      });
      const selId = getEmployeesId(result);
      expect(selId).toBe('103');
    });

    it('getEmployeesLoaded() should return the current "loaded" status', () => {
      const result = EmployeesSelectors.selectEmployeesLoaded({
        employees: createEmployeesState
      });

      expect(result).toBe(true);
    });

    it('getEmployeesError() should return the current "error" state', () => {
      const result = EmployeesSelectors.selectEmployeesError({
        employees: createEmployeesState
      });
      expect(result).toBe(ERROR_MSG);
    });
  });
});
