const app = require('../../main');
const request = require('supertest');
import EmployeeTerritory from '../data-access/employee-territory-repo';

describe('Browse Endpoint', () => {
  it('Should get employeeTerritories list', async () => {
    const res = await request(app).get('/employee-territory');
    const employeeTerritories = Array.from(
      res.body.employeeTerritories
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('employeeTerritories');
    expect(employeeTerritories.length).toBeGreaterThan(0);
  });

  it('Should get employeeTerritory with ID 1', async () => {
    const res = await request(app).get('/employee-territory/1');

    const employeeTerritories = Array.from(
      res.body.employeeTerritories
    );

    expect(res.statusCode).toBe(200);
    expect(employeeTerritories.length).toEqual(1);
  });

  it('Should create a new employeeTerritory', async () => {
    const emp = new EmployeeTerritory(this);
    emp.EmployeeID = '0';
    emp.TerritoryID = '00000';
    emp.CreatedBy = 'admin';

    const res = await request(app)
      .post('/employee-territory')
      .send(emp);

    expect(res.statusCode).toBe(200);
    expect(res.body.employeeTerritory).toHaveProperty(
      'EmployeeID',
      '0'
    );
    expect(res.body.employeeTerritory).toHaveProperty(
      'TerritoryID',
      '00000'
    );
  });

  it('Should update an existing employeeTerritory', async () => {
    const emp = new EmployeeTerritory(this);
    emp.Id = 52;
    emp.EmployeeID = '9';
    emp.TerritoryID = '99999';
    emp.CreatedBy = 'admin';

    const res = await request(app)
      .put('/employee-territory/52')
      .send(emp);

    expect(res.statusCode).toBe(200);
    expect(res.body.employeeTerritory).toHaveProperty(
      'EmployeeID',
      '9'
    );
    expect(res.body.employeeTerritory).toHaveProperty(
      'TerritoryID',
      '99999'
    );
  });

  it('Should delete employeeTerritory', async () => {
    const res = await request(app).delete('/employee-territory/70');
    expect(res.statusCode).toBe(200);
  });
});
