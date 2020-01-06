require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
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
});
