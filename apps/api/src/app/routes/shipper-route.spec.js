const app = require('../../main');
const request = require('supertest');
import Shipper from '../data-access/shipper-repo';

describe('Browse Endpoint', () => {
  it('Should get shippers list', async () => {
    const res = await request(app).get('/shipper');
    const shippers = Array.from(res.body.shippers);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('shippers');
    expect(shippers.length).toBeGreaterThan(0);
  });

  it('Should get shipper with ID 1', async () => {
    const res = await request(app).get('/shipper/1');

    const shippers = Array.from(res.body.shippers);

    expect(res.statusCode).toBe(200);
    expect(shippers.length).toEqual(1);
  });

  it('Should create a new shipper', async () => {
    const shp = new Shipper(this);
    shp.CompanyName = 'Test shipper name';
    shp.Phone = '123456';
    shp.CreatedBy = 'admin';

    const res = await request(app).post('/shipper').send(shp);

    expect(res.statusCode).toBe(200);
    expect(res.body.shipper).toHaveProperty(
      'CompanyName',
      'Test shipper name'
    );
    expect(res.body.shipper).toHaveProperty('Phone', '123456');
  });

  it('Should update an existing shipper', async () => {
    const cat = new Shipper(this);
    cat.ShipperID = '5';
    cat.CompanyName = 'Test shipper update';
    cat.Phone = '654321';
    cat.CreatedBy = 'admin';

    const res = await request(app).put('/shipper/5').send(cat);

    expect(res.statusCode).toBe(200);
    expect(res.body.shipper).toHaveProperty(
      'CompanyName',
      'Test shipper update'
    );
    expect(res.body.shipper).toHaveProperty('Phone', '654321');
  });

  it('Should delete shipper', async () => {
    const res = await request(app).delete('/shipper/5');
    expect(res.statusCode).toBe(200);
  });
});
