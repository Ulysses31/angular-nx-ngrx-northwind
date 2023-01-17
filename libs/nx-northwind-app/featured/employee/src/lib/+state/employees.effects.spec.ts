import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as EmployeesActions from './employees.actions';
import { EmployeesEffects } from './employees.effects';

describe('EmployeesEffects', () => {
  let effects: EmployeesEffects;
  let actions: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        EmployeesEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(EmployeesEffects);
  });

  describe('initEmployees$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: EmployeesActions.initEmployees()
      });
      const expected = hot('', {
        a: EmployeesActions.loadEmployeesSuccess({ employees: [] })
      });
      expect(effects.initEmployees$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('-a-|', {
        a: EmployeesActions.initEmployees()
      });
      const expected = hot('-a-|', {
        a: EmployeesActions.loadEmployeesFailure({
          error: 'Failed'
        })
      });
      expect(effects.initEmployees$).not.toBeObservable(expected);
    });
  });

  describe('initEmployee$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: EmployeesActions.initEmployee({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: EmployeesActions.loadEmployeeSuccess({
          employee: {
            employeeID: '100',
            lastName: 'Test A',
            firstName: 'Test A',
            title: 'Test A',
            titleOfCourtesy: 'Test A',
            birthDate: new Date(),
            hireDate: new Date(),
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            homePhone: 'Test A',
            extension: 'Test A',
            notes: 'Test A',
            reportsTo: 'Test A',
            photoPath: 'Test A'
          }
        })
      });
      expect(effects.initEmployees$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: EmployeesActions.initEmployee({ selectedId: '100' })
      });
      const expected = hot('---|', {
        a: EmployeesActions.loadEmployeeFailure({
          error: 'Failed'
        })
      });
      expect(effects.initEmployee$).toBeObservable(expected);
    });
  });

  describe('postEmployee$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: EmployeesActions.postEmployee({
          newEmployee: {
            employeeID: '105',
            lastName: 'Test A',
            firstName: 'Test A',
            title: 'Test A',
            titleOfCourtesy: 'Test A',
            birthDate: new Date(),
            hireDate: new Date(),
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            homePhone: 'Test A',
            extension: 'Test A',
            notes: 'Test A',
            reportsTo: 'Test A',
            photoPath: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeesActions.postEmployeeSuccess({
          employee: {
            employeeID: '105',
            lastName: 'Test A',
            firstName: 'Test A',
            title: 'Test A',
            titleOfCourtesy: 'Test A',
            birthDate: new Date(),
            hireDate: new Date(),
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            homePhone: 'Test A',
            extension: 'Test A',
            notes: 'Test A',
            reportsTo: 'Test A',
            photoPath: 'Test A'
          }
        })
      });
      expect(effects.postEmployee$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: EmployeesActions.postEmployee({
          newEmployee: {
            employeeID: '105',
            lastName: 'Test A',
            firstName: 'Test A',
            title: 'Test A',
            titleOfCourtesy: 'Test A',
            birthDate: new Date(),
            hireDate: new Date(),
            address: 'Test A',
            city: 'Test A',
            region: 'Test A',
            postalCode: 'Test A',
            country: 'Test A',
            homePhone: 'Test A',
            extension: 'Test A',
            notes: 'Test A',
            reportsTo: 'Test A',
            photoPath: 'Test A'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeesActions.postEmployeeFailure({
          error: 'Failed'
        })
      });
      expect(effects.initEmployee$).toBeObservable(expected);
    });
  });

  describe('putEmployee$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: EmployeesActions.putEmployee({
          selectedId: '110',
          putEmployee: {
            employeeID: '110',
            lastName: 'Update A',
            firstName: 'Update A',
            title: 'Update A',
            titleOfCourtesy: 'Update A',
            birthDate: new Date(),
            hireDate: new Date(),
            address: 'Update A',
            city: 'Update A',
            region: 'Update A',
            postalCode: 'Update A',
            country: 'Update A',
            homePhone: 'Update A',
            extension: 'Update A',
            notes: 'Update A',
            reportsTo: 'Update A',
            photoPath: 'Update A'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeesActions.putEmployeeSuccess({
          employee: {
            employeeID: '110',
            lastName: 'Update A',
            firstName: 'Update A',
            title: 'Update A',
            titleOfCourtesy: 'Update A',
            birthDate: new Date(),
            hireDate: new Date(),
            address: 'Update A',
            city: 'Update A',
            region: 'Update A',
            postalCode: 'Update A',
            country: 'Update A',
            homePhone: 'Update A',
            extension: 'Update A',
            notes: 'Update A',
            reportsTo: 'Update A',
            photoPath: 'Update A'
          }
        })
      });
      expect(effects.putEmployee$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: EmployeesActions.putEmployee({
          selectedId: '110',
          putEmployee: {
            employeeID: '110',
            lastName: 'Update A',
            firstName: 'Update A',
            title: 'Update A',
            titleOfCourtesy: 'Update A',
            birthDate: new Date(),
            hireDate: new Date(),
            address: 'Update A',
            city: 'Update A',
            region: 'Update A',
            postalCode: 'Update A',
            country: 'Update A',
            homePhone: 'Update A',
            extension: 'Update A',
            notes: 'Update A',
            reportsTo: 'Update A',
            photoPath: 'Update A'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeesActions.putEmployeeFailure({
          error: 'Failed'
        })
      });
      expect(effects.putEmployee$).toBeObservable(expected);
    });
  });

  describe('deleteEmployee$', () => {
    it('should work', () => {
      actions = hot('---|', {
        a: EmployeesActions.deleteEmployee({
          delEmployee: {
            employeeID: '110',
            lastName: 'Delete A',
            firstName: 'Delete A',
            title: 'Delete A',
            titleOfCourtesy: 'Delete A',
            birthDate: new Date(),
            hireDate: new Date(),
            address: 'Delete A',
            city: 'Delete A',
            region: 'Delete A',
            postalCode: 'Delete A',
            country: 'Delete A',
            homePhone: 'Delete A',
            extension: 'Delete A',
            notes: 'Delete A',
            reportsTo: 'Delete A',
            photoPath: 'Delete A'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeesActions.deleteEmployeeSuccess()
      });
      expect(effects.deleteEmployee$).toBeObservable(expected);
    });

    it('should not work', () => {
      actions = hot('---|', {
        a: EmployeesActions.deleteEmployee({
          delEmployee: {
            employeeID: '110',
            lastName: 'Delete A',
            firstName: 'Delete A',
            title: 'Delete A',
            titleOfCourtesy: 'Delete A',
            birthDate: new Date(),
            hireDate: new Date(),
            address: 'Delete A',
            city: 'Delete A',
            region: 'Delete A',
            postalCode: 'Delete A',
            country: 'Delete A',
            homePhone: 'Delete A',
            extension: 'Delete A',
            notes: 'Delete A',
            reportsTo: 'Delete A',
            photoPath: 'Delete A'
          }
        })
      });
      const expected = hot('---|', {
        a: EmployeesActions.deleteEmployeeFailure({
          error: 'Failed'
        })
      });
      expect(effects.deleteEmployee$).toBeObservable(expected);
    });
  });
});
