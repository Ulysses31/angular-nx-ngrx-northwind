const app = require('../../main');
const request = require('supertest');
import Product from '../data-access/product-repo';

describe('Browse Endpoint', () => {
  it('Should get products list', async () => {
    const res = await request(app).get('/product');
    const products = Array.from(res.body.products);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('products');
    expect(products.length).toBeGreaterThan(0);
  });

  it('Should get product with ID 1', async () => {
    const res = await request(app).get('/product/1');

    const products = Array.from(res.body.products);

    expect(res.statusCode).toBe(200);
    expect(products.length).toEqual(1);
  });

  it('Should create a new product', async () => {
    const prod = new Product(this);
    prod.ProductName = 'Chai';
    prod.SupplierID = '1';
    prod.CategoryID = '1';
    prod.QuantityPerUnit = '36 boxes';
    prod.UnitPrice = '21.35';
    prod.UnitsInStock = '2.0';
    prod.UnitsOnOrder = '10';
    prod.ReorderLevel = '0';
    prod.Discontinued = true;
    prod.CreatedBy = 'admin';

    const res = await request(app).post('/product').send(prod);

    expect(res.statusCode).toBe(200);
    expect(res.body.product).toHaveProperty('ProductName', 'Chai');
    expect(res.body.product).toHaveProperty(
      'QuantityPerUnit',
      '36 boxes'
    );
  });

  it('Should update an existing product', async () => {
    const prod = new Product(this);
    prod.ProductID = '80';
    prod.ProductName = 'Chai updated';
    prod.SupplierID = '1';
    prod.CategoryID = '1';
    prod.QuantityPerUnit = '40 boxes';
    prod.UnitPrice = '21.35';
    prod.UnitsInStock = '2.0';
    prod.UnitsOnOrder = '10';
    prod.ReorderLevel = '0';
    prod.Discontinued = true;
    const res = await request(app).put('/product/80').send(prod);

    expect(res.statusCode).toBe(200);
    expect(res.body.product).toHaveProperty(
      'ProductName',
      'Chai updated'
    );
    expect(res.body.product).toHaveProperty(
      'QuantityPerUnit',
      '40 boxes'
    );
  });

  it('Should delete product', async () => {
    const res = await request(app).delete('/product/80');
    expect(res.statusCode).toBe(200);
  });
});
