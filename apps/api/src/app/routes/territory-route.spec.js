const app = require('../../main');
const request = require('supertest');
import Territory from '../data-access/territory-repo';

describe('Browse Endpoint', () => {
  it('Should get territories list', async () => {
    const res = await request(app).get('/territory');
    const territories = Array.from(res.body.territories);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('territories');
    expect(territories.length).toBeGreaterThan(0);
  });

  it('Should get territory with ID 01581', async () => {
    const res = await request(app).get('/territory/01581');

    const territories = Array.from(res.body.territories);

    expect(res.statusCode).toBe(200);
    expect(territories.length).toEqual(1);
  });

  it('Should create a new territory', async () => {
    const ter = new Territory(this);
    ter.TerritoryID = '99999';
    ter.TerritoryDescription = 'Boston';
    ter.RegionID = '1';
    ter.CreatedBy = 'admin';

    const res = await request(app).post('/territory').send(ter);

    expect(res.statusCode).toBe(200);
    expect(res.body.territory).toHaveProperty(
      'TerritoryDescription',
      'Boston'
    );
  });

  it('Should update an existing territory', async () => {
    const ter = new Territory(this);
    ter.TerritoryID = '99999';
    ter.TerritoryDescription = 'Updated';
    ter.RegionID = '1';
    ter.CreatedBy = 'admin';

    const res = await request(app).put('/territory/99999').send(ter);

    expect(res.statusCode).toBe(200);
    expect(res.body.territory).toHaveProperty(
      'TerritoryDescription',
      'Updated'
    );
  });

  it('Should delete territory', async () => {
    const res = await request(app).delete('/territory/99999');
    expect(res.statusCode).toBe(200);
  });
});
