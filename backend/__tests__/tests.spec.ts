import app from '../index';
import {
  createUser,
  deleteOne,
  loginUser,
  updateUser,
} from '../models/userModel';
import supertest from 'supertest';

let userEmail: string;
let userId: number;
let token: string;
let listingId: string;

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
  it('should return true if user exists', async () => {
    const res = await supertest.agent(app).get(`/users`);
    expect(res.status).toBe(200);
    // console.log(res.body);
    // console.log(res.status);
  });
});

describe('check if user exists by their email address', () => {
  it('should return true if user exists', async () => {
    const res = await supertest.agent(app).get(`/users/${userEmail}`);
    expect(res.status).toBe(200);
    // console.log(res.body);
    // console.log(res.status);
  });

  it('should return false if user does not exist', async () => {
    const res = await supertest.agent(app).get('/users/bla@mail.com');
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
  });

  it('should false if user does not exist', async () => {
    const res = await supertest.agent(app).get('/users/12132');
    expect(res.status).toBe(200);
    expect(res.body).toBe(false);
    // console.log(res.body);
    // console.log(res.status);
  });
});

afterAll(async () => {
  // console.log('Deleting user data for user ID:', userId);
  await deleteOne(userEmail);
});
