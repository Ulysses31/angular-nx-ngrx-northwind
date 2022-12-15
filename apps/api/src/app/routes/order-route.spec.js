const app = require('../../main');
const request = require('supertest');
import Order from '../data-access/order-repo';

describe('Browse Endpoint', () => {
  it('Should get orders list', async () => {
    const res = await request(app).get('/order');
    const orders = Array.from(res.body.orders);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('orders');
    expect(orders.length).toBeGreaterThan(0);
  });

  it('Should get order with ID 10248', async () => {
    const res = await request(app).get('/order/10248');

    const orders = Array.from(res.body.orders);

    expect(res.statusCode).toBe(200);
    expect(orders.length).toEqual(1);
  });

  it('Should create a new order', async () => {
    const ord = new Order(this);
    (ord.OrderID = '11078'),
      (ord.CustomerID = 'VINET'),
      (ord.EmployeeID = '5'),
      (ord.OrderDate = new Date()),
      (ord.RequiredDate = new Date()),
      (ord.ShippedDate = new Date()),
      (ord.ShipVia = '3'),
      (ord.Freight = '32.38'),
      (ord.ShipName = 'Vins et alcools Chevalier'),
      (ord.ShipAddress = "59 rue de l'Abbaye"),
      (ord.ShipCity = 'Reims'),
      (ord.ShipRegion = 'RJ'),
      (ord.ShipPostalCode = '51100'),
      (ord.ShipCountry = 'Greece'),
      (ord.CreatedBy = 'admin');

    const res = await request(app).post('/order').send(ord);

    expect(res.statusCode).toBe(200);
    expect(res.body.order).toHaveProperty('CustomerID', 'VINET');
    expect(res.body.order).toHaveProperty('EmployeeID', '5');
  });

  it('Should update an existing order', async () => {
    const ord = new Order(this);
    (ord.OrderID = '11078'),
      (ord.CustomerID = 'VINET'),
      (ord.EmployeeID = '5'),
      (ord.OrderDate = new Date()),
      (ord.RequiredDate = new Date()),
      (ord.ShippedDate = new Date()),
      (ord.ShipVia = '3'),
      (ord.Freight = '32.38'),
      (ord.ShipName = 'Updated'),
      (ord.ShipAddress = "59 rue de l'Abbaye"),
      (ord.ShipCity = 'Reims'),
      (ord.ShipRegion = 'RJ'),
      (ord.ShipPostalCode = '51100'),
      (ord.ShipCountry = 'Greece'),
      (ord.CreatedBy = 'admin');

    const res = await request(app).put('/order/11078').send(ord);

    expect(res.statusCode).toBe(200);
    expect(res.body.order).toHaveProperty('CustomerID', 'VINET');
  });

  it('Should delete order', async () => {
    const res = await request(app).delete('/order/11078');
    expect(res.statusCode).toBe(200);
  });
});
