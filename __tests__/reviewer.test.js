require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');

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
  
  it('can get all reviewers', async() => {
    const reviewers = await Reviewer.create([
      { name: 'bob', company: 'review place' },
      { name: 'steve', company: 'rev.com' }
    ]);

    return request(app)
      .get('/api/v1/reviewer')
      .then(res => {
        expect(res.body).toMatchObject(JSON.parse(JSON.stringify(reviewers)));
      });
  });
});
