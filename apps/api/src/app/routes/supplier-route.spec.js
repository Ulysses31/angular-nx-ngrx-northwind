const app = require('../../main');
const request = require('supertest');
import Supplier from '../data-access/supplier-repo';

describe('Browse Endpoint', () => {
  it('Should get suppliers list', async () => {
    const res = await request(app).get('/supplier');
    const suppliers = Array.from(res.body.suppliers);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('suppliers');
    expect(suppliers.length).toBeGreaterThan(0);
  });

  it('Should get supplier with ID 1', async () => {
    const res = await request(app).get('/supplier/1');

    const suppliers = Array.from(res.body.suppliers);

    expect(res.statusCode).toBe(200);
    expect(suppliers.length).toEqual(1);
  });

  it('Should create a new supplier', async () => {
    const sup = new Supplier(this);
    (sup.CompanyName = 'Exotic Liquids'),
      (sup.ContactName = 'Exotic Liquids'),
      (sup.ContactTitle = 'Exotic Liquids'),
      (sup.Address = 'Exotic Liquids'),
      (sup.City = 'Exotic Liquids'),
      (sup.Region = 'GR'),
      (sup.PostalCode = '12345'),
      (sup.Country = 'Greece'),
      (sup.Phone = '123456'),
      (sup.Fax = '123456'),
      (sup.HomePage =
        'http://www.microsoft.com/accessdev/sampleapps/gdaymate.htm'),
      (sup.CreatedBy = 'admin');

    const res = await request(app).post('/supplier').send(sup);

    expect(res.statusCode).toBe(200);
    expect(res.body.supplier).toHaveProperty(
      'CompanyName',
      'Exotic Liquids'
    );
    expect(res.body.supplier).toHaveProperty('Region', 'GR');
  });

  it('Should update an existing supplier', async () => {
    const sup = new Supplier(this);
    sup.Id = '30';
    (sup.CompanyName = 'Exotic update Liquids'),
      (sup.ContactName = 'Exotic update Liquids'),
      (sup.ContactTitle = 'Exotic Liquids'),
      (sup.Address = 'Exotic Liquids'),
      (sup.City = 'Exotic Liquids'),
      (sup.Region = 'GR'),
      (sup.PostalCode = '12345'),
      (sup.Country = 'Greece'),
      (sup.Phone = '123456'),
      (sup.Fax = '123456'),
      (sup.HomePage =
        'http://www.microsoft.com/accessdev/sampleapps/gdaymate.htm'),
      (sup.CreatedBy = 'admin');

    const res = await request(app).put('/supplier/30').send(sup);

    expect(res.statusCode).toBe(200);
    expect(res.body.supplier).toHaveProperty(
      'CompanyName',
      'Exotic update Liquids'
    );
    expect(res.body.supplier).toHaveProperty(
      'ContactName',
      'Exotic update Liquids'
    );
  });

  it('Should delete supplier', async () => {
    const res = await request(app).delete('/supplier/30');
    expect(res.statusCode).toBe(200);
  });
});
