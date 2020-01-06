require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');

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
  
  it('can get all films', async() => {
    const actor = await Actor.create({ name: 'Jacob' });
    const studio = await Studio.create({ name: 'MGM' });
    const film = await Film.create({
      title: 'A film',
      studio: studio._id,
      released: 2020,
      cast: [
        { actor: actor._id } 
      ]
    });

    return request(app)
      .get('/api/v1/films/')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: film._id.toString(),
          title: film.title,
          studio: { _id: studio._id.toString(), name: studio.name },
          released: 2020
        });
      });
  });
});
