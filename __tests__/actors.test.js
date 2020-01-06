require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
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

  it('can get all actors', async() => {
    const actors = await Actor.create([
      { name: 'Jacob' },
      { name: 'bob' }
    ]);

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toMatchObject(JSON.parse(JSON.stringify(actors)));
      });
  });  
});
