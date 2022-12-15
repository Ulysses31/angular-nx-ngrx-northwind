const app = require('../../main');
const request = require('supertest');
import OrderDetail from '../data-access/order-detail-repo';

describe('Browse Endpoint', () => {
  it('Should get orderDetails list', async () => {
    const res = await request(app).get('/order-detail');
    const orderDetails = Array.from(res.body.orderDetails);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('orderDetails');
    expect(orderDetails.length).toBeGreaterThan(0);
  });

  it('Should get orderDetail with ID 1', async () => {
    const res = await request(app).get('/order-detail/1');

    const orderDetails = Array.from(res.body.orderDetails);

    expect(res.statusCode).toBe(200);
    expect(orderDetails.length).toEqual(1);
  });

  it('Should create a new orderDetail', async () => {
    const ord = new OrderDetail(this);
    ord.OrderID = '10248';
    ord.ProductID = '11';
    ord.UnitPrice = '14.5';
    ord.Quantity = '12';
    ord.Discount = '10.3';
    ord.CreatedBy = 'admin';

    const res = await request(app).post('/order-detail').send(ord);

    expect(res.statusCode).toBe(200);
    expect(res.body.orderDetail).toHaveProperty('OrderID', '10248');
  });

  it('Should update an existing orderDetail', async () => {
    const ord = new OrderDetail(this);
    ord.Id = 2166;
    ord.OrderID = '10248';
    ord.ProductID = '111';
    ord.UnitPrice = '14.5';
    ord.Quantity = '12';
    ord.Discount = '10.3';
    ord.CreatedBy = 'admin';

    const res = await request(app)
      .put('/order-detail/2166')
      .send(ord);

    expect(res.statusCode).toBe(200);
    expect(res.body.orderDetail).toHaveProperty('ProductID', '111');
  });

  it('Should delete orderDetail', async () => {
    const res = await request(app).delete('/order-detail/2166');
    expect(res.statusCode).toBe(200);
  });
});
