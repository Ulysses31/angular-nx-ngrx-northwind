const app = require('../../main');
const request = require('supertest');
import Category from '../data-access/category-repo';

describe('Browse Endpoint', () => {
  it('Should get categories list', async () => {
    const res = await request(app).get('/category');
    const categories = Array.from(res.body.categories);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('categories');
    expect(categories.length).toBeGreaterThan(0);
  });

  it('Should get category with ID 1', async () => {
    const res = await request(app).get('/category/1');

    const categories = Array.from(res.body.categories);

    expect(res.statusCode).toBe(200);
    expect(categories.length).toEqual(1);
  });

  it('Should create a new category', async () => {
    const cat = new Category(this);
    cat.CategoryName = 'Test name';
    cat.Description = 'Test description';
    cat.CreatedBy = 'admin';

    const res = await request(app).post('/category').send(cat);

    expect(res.statusCode).toBe(200);
    expect(res.body.category).toHaveProperty(
      'CategoryName',
      'Test name'
    );
    expect(res.body.category).toHaveProperty(
      'Description',
      'Test description'
    );
  });

  it('Should update an existing category', async () => {
    const cat = new Category(this);
    cat.CategoryID = '19';
    cat.CategoryName = 'Test updated name';
    cat.Description = 'Test updated description';
    cat.CreatedBy = 'admin';

    const res = await request(app).put('/category/19').send(cat);

    expect(res.statusCode).toBe(200);
    expect(res.body.category).toHaveProperty(
      'CategoryName',
      'Test updated name'
    );
    expect(res.body.category).toHaveProperty(
      'Description',
      'Test updated description'
    );
  });

  it('Should delete category', async () => {
    const res = await request(app).delete('/category/70');
    expect(res.statusCode).toBe(200);
  });
});
