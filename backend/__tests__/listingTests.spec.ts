import app from '../index';
import supertest from 'supertest';

let userEmail: string;
let userId: number;
let token: string;
let listingId: number;

beforeAll(async () => {
  const res = await supertest.agent(app).post('/users').send({
    email: 'usertest@gmail.com',
    password: '35',
    firstName: 'User1',
    lastName: 'One1',
    DOB: '1990-10-06T00:00:00.000Z',
  });

  userEmail = res.body.email;
  userId = res.body.id;

  const loginResponse = await supertest.agent(app).post('/users/login').send({
    email: 'usertest@gmail.com',
    password: '35',
  });

  token = loginResponse.body.token;
});

describe('listing creation', () => {
  it('should allow a logged in user to create a listing', async () => {
    const res = await supertest.agent(app).post('/listings').send({
      title: '7-bedroom penthouse',
      description: 'penthouse with 7 bedrooms and 4 bathrooms',
      propertyType: 'penthouse',
      price: 1953,
      numOfBedrooms: 7,
      numOfBathrooms: 4,
      petsAllowed: false,
      hasGarage: false,
      status: 'dormant',
      featured: false,
      addressHouseNum: 774,
      addressStreetName: 'Station Road',
      addressPostCode: 'BL61 1JK',
      addressCity: 'Edinburgh',
      addressCounty: 'West Midlands',
    });
    // console.log('Registration response:', res.body);
    expect(res.status).toBe(201);
    listingId = res.body._id;
  });

  it('should not register a user if the email is in use', async () => {
    const res = await supertest.agent(app).post('/register').send({
      name: 'test2',
      email: 'test@mail1',
      userName: 'testUser2',
      password: 'testPass2',
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Email already in use');
  });
});

afterAll(async () => {
  // Assuming the delete endpoint requires a token for authentication.
  await supertest.agent(app).delete(`/users/${userId}`);

  app.close();
});
