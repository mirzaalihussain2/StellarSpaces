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

  const res2 = await supertest
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
  listingId = res2.body.id;
});
describe('Create a favourite', () => {
  it('should create a favourite', async () => {
    const res = await supertest
      .agent(app)
      .post('/favourites')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: userId,
        listingId: listingId,
      });
    // console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.userId).toBe(userId);
    expect(res.body.listingId).toBe(listingId);
  });
  it('should not allow a unauthorized user to add a favourite', async () => {
    const res = await supertest.agent(app).post('/favourites').send({
      userId: userId,
      listingId: listingId,
    });
    // console.log(res.body);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });
});

describe('fetch the favourited listings of the user', () => {
  it('should get all favourited listings of the user', async () => {
    const res = await supertest
      .agent(app)
      .get(`/favourites/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
  it('should retrieve nothing for users that do not exist', async () => {
    const res = await supertest
      .agent(app)
      .get(`/favourites/user/912312312`)
      .set('Authorization', `Bearer ${token}`);
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
    expect(res.body.length).toBe(0);
  });
});

describe('fetch the users who favourited the listings with the listingId', () => {
  it('should get all users who favourited this listing', async () => {
    const res = await supertest
      .agent(app)
      .get(`/favourites/listing/${listingId}`)
      .set('Authorization', `Bearer ${token}`);
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
  it('should retrieve nothing for listings that do not exist', async () => {
    const res = await supertest
      .agent(app)
      .get(`/favourites/listing/912312312`)
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
    expect(res.body.length).toBe(0);
  });
});

describe('count the number of people who liked this listing', () => {
  it('should return a number which represents the amount of user who liked the listing', async () => {
    const res = await supertest.agent(app).get(`/favourites/${listingId}`);
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeGreaterThanOrEqual(1);
  });
  it('should return 0 for listings that do not exist', async () => {
    const res = await supertest.agent(app).get(`/favourites/912312312`);
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBe(0);
  });
});

describe('Delete all favourite', () => {
  it('should delete the specified favourite', async () => {
    const res = await supertest
      .agent(app)
      .delete('/favourites')
      .send({ listingId: listingId, userId: userId })
      .set('Authorization', `Bearer ${token}`);
    // console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Favourite deleted successfully');
  });
  it('should not allow a signed out user to delete all favourites', async () => {
    const res = await supertest.agent(app).delete('/favourites');
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
