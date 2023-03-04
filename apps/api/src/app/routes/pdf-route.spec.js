const app = require('../../main');
const request = require('supertest');
import Pdf from '../data-access/pdf-repo';

describe('Browse Endpoint', () => {
  it('Should get pdf list', async () => {
    const res = await request(app).get('/pdf');
    const pdf = Array.from(res.body.pdf);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pdf');
    expect(pdf.length).toBeGreaterThan(0);
  });

  it('Should get pdf with ID 1', async () => {
    const res = await request(app).get('/pdf/1');

    const pdf = Array.from(res.body.pdf);

    expect(res.statusCode).toBe(200);
    expect(pdf.length).toEqual(1);
  });

  it('Should create a new pdf', async () => {
    const cat = new Pdf(this);
    cat.PdfName = 'Test name';
    cat.Description = 'Test description';
    cat.CreatedBy = 'admin';

    const res = await request(app).post('/pdf').send(cat);

    expect(res.statusCode).toBe(200);
    expect(res.body.pdf).toHaveProperty(
      'PdfName',
      'Test name'
    );
    expect(res.body.pdf).toHaveProperty(
      'Description',
      'Test description'
    );
  });

  it('Should update an existing pdf', async () => {
    const cat = new Pdf(this);
    cat.PdfID = '19';
    cat.PdfName = 'Test updated name';
    cat.Description = 'Test updated description';
    cat.CreatedBy = 'admin';

    const res = await request(app).put('/pdf/19').send(cat);

    expect(res.statusCode).toBe(200);
    expect(res.body.pdf).toHaveProperty(
      'PdfName',
      'Test updated name'
    );
    expect(res.body.pdf).toHaveProperty(
      'Description',
      'Test updated description'
    );
  });

  it('Should delete pdf', async () => {
    const res = await request(app).delete('/pdf/70');
    expect(res.statusCode).toBe(200);
  });
});
