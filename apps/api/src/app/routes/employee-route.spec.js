const app = require('../../main');
const request = require('supertest');
import Employee from '../data-access/employee-repo';

describe('Browse Endpoint', () => {
  it('Should get employees list', async () => {
    const res = await request(app).get('/employee');
    const employees = Array.from(res.body.employees);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('employees');
    expect(employees.length).toBeGreaterThan(0);
  });

  it('Should get employee with ID 1', async () => {
    const res = await request(app).get('/employee/1');

    const employees = Array.from(res.body.employees);

    expect(res.statusCode).toBe(200);
    expect(employees.length).toEqual(1);
  });

  it('Should create a new employee', async () => {
    const empl = new Employee(this);
    empl.LastName = 'Iordanidis';
    empl.FirstName = 'Chris';
    empl.Title = 'Software Engineer';
    empl.TitleOfCourtesy = 'Mr.';
    empl.BirthDate = new Date(1978, 8 - 1, 2);
    empl.HireDate = new Date();
    empl.Address = 'Nomothetou 5';
    empl.City = 'Thessaloniki';
    empl.Region = 'Toumpa';
    empl.PostalCode = '54453';
    empl.Country = 'Greece';
    empl.HomePhone = '2310-902382';
    empl.Extension = '100';
    empl.Notes = 'I am a fullstack software engineer.';
    empl.ReportsTo = '1';
    empl.PhotoPath = 'http://accweb/emmployees/iordanidis.bmp';
    empl.CreatedBy = 'admin';

    const res = await request(app).post('/employee').send(empl);

    expect(res.statusCode).toBe(200);
    expect(res.body.employee).toHaveProperty(
      'LastName',
      'Iordanidis'
    );
    expect(res.body.employee).toHaveProperty('FirstName', 'Chris');
  });

  it('Should update an existing employee', async () => {
    const empl = new Employee(this);
    empl.LastName = 'Iordanidis';
    empl.FirstName = 'Chris';
    empl.Title = 'Software Engineer';
    empl.TitleOfCourtesy = 'Mr.';
    empl.BirthDate = new Date(1978, 8 - 1, 2);
    empl.HireDate = new Date();
    empl.Address = 'Nomothetou 5';
    empl.City = 'Thessaloniki';
    empl.Region = 'Toumpa';
    empl.PostalCode = '54453';
    empl.Country = 'Greece';
    empl.HomePhone = '2310-902382';
    empl.Extension = '100';
    empl.Notes = 'I am a fullstack software engineer.';
    empl.ReportsTo = '1';
    empl.PhotoPath = 'http://accweb/emmployees/iordanidis.bmp';
    empl.CreatedBy = 'admin';

    const res = await request(app).put('/employee/10').send(empl);

    expect(res.statusCode).toBe(200);
    expect(res.body.employee).toHaveProperty(
      'LastName',
      'Iordanidis'
    );
    expect(res.body.employee).toHaveProperty('FirstName', 'Chris');
  });

  it('Should delete employee', async () => {
    const res = await request(app).delete('/employee/70');
    expect(res.statusCode).toBe(200);
  });
});
