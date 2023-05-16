import app from '../index';
import supertest from 'supertest';

let userEmail: string;
let userId: number;
let token: string;
let listingId: number;

beforeAll(async () => {
  const res = await supertest.agent(app).post('/users').send({
    email: 'usertest2@gmail.com',
    password: '35',
    firstName: 'User1',
    lastName: 'One1',
    DOB: '1990-10-06T00:00:00.000Z',
  });
  // console.log(res.body);
  userEmail = res.body.email;
  userId = res.body.id;

  const loginResponse = await supertest.agent(app).post('/users/login').send({
    email: 'usertest2@gmail.com',
    password: '35',
  });

  token = loginResponse.body.token;
});

describe('listing creation', () => {
  it('should allow a logged in user to create a listing', async () => {
    const res = await supertest
      .agent(app)
      .post('/listings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '7-bedroom penthouse',
        description: 'penthouse with 7 bedrooms and 4 bathrooms',
        propertyType: 'penthouse',
        price: 1953,
        numOfBedrooms: 7,
        numOfBathrooms: 4,
        petsAllowed: 1,
        hasGarage: 1,
        status: 'dormant',
        featured: false,
        addressHouseNum: 774,
        addressStreetName: 'Station Road',
        addressPostCode: 'BL61 1JK',
        addressCity: 'Edinburgh',
        addressCounty: 'West Midlands',
      });
    // console.log(res.body);
    expect(res.status).toBe(201);
    listingId = res.body.id;
  });

  it('should not allow a unauthorised user to create a listing', async () => {
    const res = await supertest.agent(app).post('/listings').send({
      title: '2-bedroom bedsit',
      description: 'bedsit with 2 bedrooms and 2 bathrooms',
      propertyType: 'bedsit',
      price: 4036,
      numOfBedrooms: 2,
      numOfBathrooms: 2,
      petsAllowed: 1,
      hasGarage: 1,
      status: 'dormant',
      featured: true,
      addressHouseNum: 6,
      addressStreetName: 'Park Street',
      addressPostCode: 'AB58 8CD',
      addressCity: 'Liverpool',
      addressCounty: 'South Yorkshire',
    });
    // console.log(res.body);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });
});

describe('fetch a particular listing', () => {
  it('should get all the information of a listing by their ID', async () => {
    const res = await supertest.agent(app).get(`/listings/${listingId}`);
    // console.log(res.body);
    expect(res.status).toBe(200);
  });

  it('it should not fetch any listing if an invalid ID is provided ', async () => {
    const res = await supertest.agent(app).get('/listings/1000031232312321');
    console.log(res.body);
    expect(res.status).toBe(500);
  });
});

describe('update the listing information', () => {
  it('should allow a signed in user to edit their listing information', async () => {
    const res = await supertest
      .agent(app)
      .put(`/listings/${listingId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '1-bedroom-studio',
      });
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('1-bedroom-studio');
  });
  it('should not allow a logged out user to edit their listing information', async () => {
    const res = await supertest.agent(app).put(`/listings/${listingId}`).send({
      title: '1-bedroom-studio',
    });
    // console.log(res.body);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });
});

describe('delete the listing', () => {
  it('should allow a signed in user to delete their listing', async () => {
    const res = await supertest
      .agent(app)
      .delete(`/listings/${listingId}`)
      .set('Authorization', `Bearer ${token}`);
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Listing deleted successfully');
  });
  it('should not allow a logged out user to delete a listing', async () => {
    const res = await supertest.agent(app).put(`/listings/${listingId}`);
    // console.log(res.body);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });
});

afterAll(async () => {
  if (app.listening) {
    await supertest
      .agent(app)
      .delete(`/listings/${listingId}`)
      .set('Authorization', `Bearer ${token}`);

    await supertest
      .agent(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    app.close();
  }
});
