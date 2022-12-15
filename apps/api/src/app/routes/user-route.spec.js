const app = require('../../main');
const request = require('supertest');
import User from '../data-access/user-repo';

describe('Browse Endpoint', () => {
  it('Should get users list', async () => {
    const res = await request(app).get('/user');
    const users = Array.from(res.body.users);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('users');
    expect(users.length).toBeGreaterThan(0);
  });

  it('Should get user with ID 1', async () => {
    const res = await request(app).get('/user/1');

    const users = Array.from(res.body.users);

    expect(res.statusCode).toBe(200);
    expect(users.length).toEqual(1);
  });

  it('Should create a new user', async () => {
    const usr = new User(this);
    (usr.Username = 'test'),
      (usr.Password = 'test'),
      (usr.Email = 'info@test.com'),
      (usr.Is_Active = 1),
      (usr.Access_Token = ''),
      (usr.Refresh_Token = ''),
      (usr.CreatedBy = 'admin');

    const res = await request(app).post('/user').send(usr);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('Username', 'test');
    expect(res.body.user).toHaveProperty('Password', 'test');
  });

  it('Should update an existing user', async () => {
    const usr = new User(this);
    usr.Id = '3';
    (usr.Username = 'test updated'),
      (usr.Password = 'test updated'),
      (usr.Email = 'info@test.com'),
      (usr.Is_Active = '1'),
      (usr.Access_Token = ''),
      (usr.Refresh_Token = ''),
      (usr.CreatedBy = 'admin');

    const res = await request(app).put('/user/3').send(usr);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('Username', 'test updated');
    expect(res.body.user).toHaveProperty('Password', 'test updated');
  });

  it('Should delete user', async () => {
    const res = await request(app).delete('/user/3');
    expect(res.statusCode).toBe(200);
  });
});
