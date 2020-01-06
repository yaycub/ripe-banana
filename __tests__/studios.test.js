require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can get all studios', async() => {
    const studios = await Studio.create([
      { name: 'MGM' },
      { name: 'Universal' }
    ]);

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toMatchObject(JSON.parse(JSON.stringify(studios)));
      });
  });

  it('can get a studio by id', async() => {
    const actor = await Actor.create({ name: 'Jacob' });
    const studio = await Studio.create({ name: 'MGM', address: { city: 'LA', state: 'California', country: 'USA' } });
    const film = await Film.create({
      title: 'A film',
      studio: studio._id,
      released: 2020,
      cast: [
        { actor: actor._id } 
      ]
    });

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: studio._id.toString(),
          name: studio.name,
          address: studio.address,
          films: [{ _id: film._id.toString(), title: film.title }]
        });
      });
  });
});
