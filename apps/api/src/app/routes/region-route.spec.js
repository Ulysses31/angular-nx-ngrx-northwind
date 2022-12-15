const app = require('../../main');
const request = require('supertest');
import Region from '../data-access/region-repo';

describe('Browse Endpoint', () => {
  it('Should get regions list', async () => {
    const res = await request(app).get('/region');
    const regions = Array.from(res.body.regions);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('regions');
    expect(regions.length).toBeGreaterThan(0);
  });

  it('Should get region with ID 1', async () => {
    const res = await request(app).get('/region/1');

    const regions = Array.from(res.body.regions);

    expect(res.statusCode).toBe(200);
    expect(regions.length).toEqual(1);
  });

  it('Should create a new region', async () => {
    const reg = new Region(this);
    reg.RegionDescription = 'Test description';
    reg.CreatedBy = 'admin';

    const res = await request(app).post('/region').send(reg);

    expect(res.statusCode).toBe(200);
    expect(res.body.region).toHaveProperty(
      'RegionDescription',
      'Test description'
    );
  });

  it('Should update an existing region', async () => {
    const cat = new Region(this);
    cat.RegionID = '6';
    cat.RegionDescription = 'Test updated description';
    cat.CreatedBy = 'admin';

    const res = await request(app).put('/region/6').send(cat);

    expect(res.statusCode).toBe(200);
    expect(res.body.region).toHaveProperty(
      'RegionDescription',
      'Test updated description'
    );
  });

  it('Should delete region', async () => {
    const res = await request(app).delete('/region/6');
    expect(res.statusCode).toBe(200);
  });
});
