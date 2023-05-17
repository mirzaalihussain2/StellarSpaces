import app from '../index';
import supertest from 'supertest';

let userEmail: string;
let userId: number;
let token: string;

describe('registration', () => {
  it('should register a user', async () => {
    const res = await supertest.agent(app).post('/users').send({
      email: 'usertest@gmail.com',
      password: '35',
      firstName: 'User1',
      lastName: 'One1',
      DOB: '1990-10-06T00:00:00.000Z',
    });
    expect(res.status).toBe(201);
    // console.log(res.body);
    userEmail = res.body.email;
    userId = res.body.id;
  });
  it('should not register a user if the email is in use', async () => {
    const res = await supertest.agent(app).post('/register').send({
      email: 'usertest@gmail.com',
      password: '36',
      firstName: 'User2',
      lastName: 'One2',
      DOB: '1990-10-06T00:00:00.000Z',
    });
    expect(res.status).toBe(404);
  });
});

describe('login', () => {
  it('should allow a user to login using their account details', async () => {
    const res = await supertest.agent(app).post('/users/login').send({
      email: 'usertest@gmail.com',
      password: '35',
    });
    expect(res.status).toBe(200);
    // console.log(res.body.token);
    token = res.body.token;
  });
  it('should not allow a user if the login details are incorrect', async () => {
    const res = await supertest.agent(app).post('/users/login').send({
      email: 'usertest@gmail.com',
      password: '36',
    });
    expect(res.status).toBe(401);
  });
});

describe('get all users', () => {
  it('should array of user objects', async () => {
    const res = await supertest.agent(app).get(`/users`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every((obj: any) => typeof obj === 'object')).toBe(true);
    // console.log(res.body);
    // console.log(res.status);
  });
});

describe('check if user exists by their email address', () => {
  it('should return true if user exists', async () => {
    const res = await supertest.agent(app).get(`/users/exist/${userEmail}`);
    expect(res.status).toBe(200);
    expect(res.body).toBe(true);
    // console.log(res.body);
    // console.log(res.status);
  });

  it('should return false if user does not exist', async () => {
    const res = await supertest.agent(app).get('/users/exist/bla@mail.com');
    expect(res.status).toBe(200);
    // console.log(res.body);
    // console.log(res.status);
  });
});

describe('get all user information by the user id', () => {
  it('should return true if user exists', async () => {
    const res = await supertest.agent(app).get(`/users/${userId}`);
    expect(res.status).toBe(200);
    // console.log(res.body);
    // console.log(res.status);
    expect(res.body.firstName).toBe('User1');
    expect(res.body.lastName).toBe('One1');
    expect(res.body.DOB).toBe('1990-10-06T00:00:00.000Z');
  });

  it('should false if user does not exist', async () => {
    const res = await supertest.agent(app).get('/users/12132');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found');
    // console.log(res.body);
    // console.log(res.status);
  });
});

describe('user update', () => {
  it('should allow a user with a unique email address to update their information', async () => {
    const res = await supertest
      .agent(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'User1Changed',
      });
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe('User1Changed');
    // console.log(res.body);
  });
  it('should not let user change their information if they are not logged in ', async () => {
    const res = await supertest.agent(app).put(`/users/${userId}`).send({
      firstName: 'User1Changed',
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
    // console.log(res.body);
  });
});

describe('user soft delete', () => {
  it('should allow a user with a valid user Id to delete their user', async () => {
    const res = await supertest
      .agent(app)
      .put(`/users/${userId}/soft`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(0);
    // console.log(res.body);
  });
  it('should not allow user who are not logged in to complete a soft delete operation', async () => {
    const res = await supertest.agent(app).put(`/users/${userId}/soft`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
    // console.log(res.body);
  });
});

describe('user hard delete', () => {
  it('should delete the user from the database', async () => {
    const res = await supertest.agent(app).delete(`/users/0`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User hard-deleted successfully');
    // console.log(res.body);
  });
});

afterAll((done) => {
  app.close(done);
});
