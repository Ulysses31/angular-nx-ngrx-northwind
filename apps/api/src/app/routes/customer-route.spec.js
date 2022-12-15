const app = require('../../main');
const request = require('supertest');
import Customer from '../data-access/customer-repo';

describe('Browse Endpoint', () => {
  it('Should get customers list', async () => {
    const res = await request(app).get('/customer');
    const customers = Array.from(res.body.customers);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('customers');
    expect(customers.length).toBeGreaterThan(0);
  });

  it('Should get customer with ID ALFKI', async () => {
    const res = await request(app).get('/customer/ALFKI');

    const customers = Array.from(res.body.customers);

    expect(res.statusCode).toBe(200);
    expect(customers.length).toEqual(1);
  });

  it('Should create a new customer', async () => {
    const cust = new Customer(this);
    cust.CustomerID = 'TTTTT';
    cust.CompanyName = 'Test company name';
    cust.ContactName = 'Test contact name';
    cust.ContactTitle = 'Test contact title';
    cust.Address = 'Test contact address';
    cust.City = 'Test contact city';
    cust.Region = 'Test contact region';
    cust.PostalCode = 'Test contact postal code';
    cust.Country = 'Test contact country';
    cust.Phone = 'Test contact phone';
    cust.Fax = 'Test contact fax';
    cust.CreatedBy = 'admin';

    const res = await request(app).post('/customer').send(cust);

    expect(res.statusCode).toBe(200);
    expect(res.body.customer).toHaveProperty(
      'CompanyName',
      'Test company name'
    );
    expect(res.body.customer).toHaveProperty(
      'ContactName',
      'Test contact name'
    );
  });

  it('Should update an existing customer', async () => {
    const cust = new Customer(this);
    cust.CustomerID = 'TTTTT';
    cust.CompanyName = 'Test updated company name';
    cust.ContactName = 'Test updated contact name';
    cust.ContactTitle = 'Test updated contact title';
    cust.Address = 'Test updated contact address';
    cust.City = 'Test updated contact city';
    cust.Region = 'Test updated contact region';
    cust.PostalCode = 'Test updated contact postal code';
    cust.Country = 'Test updated contact country';
    cust.Phone = 'Test updated contact phone';
    cust.Fax = 'Test updated contact fax';
    cust.CreatedBy = 'admin';

    const res = await request(app).put('/customer/TTTTT').send(cust);

    expect(res.statusCode).toBe(200);
    expect(res.body.customer).toHaveProperty(
      'CompanyName',
      'Test updated company name'
    );
    expect(res.body.customer).toHaveProperty(
      'ContactName',
      'Test updated contact name'
    );
  });

  it('Should delete customer', async () => {
    const res = await request(app).delete('/customer/TTTTT');
    expect(res.statusCode).toBe(200);
  });
});
