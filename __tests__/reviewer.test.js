require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');
const Film = require('../lib/models/Film');
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
  
  it('can get all reviewers', async() => {
    const reviewers = await Reviewer.create([
      { name: 'bob', company: 'review place' }
    ]);

    return request(app)
      .get('/api/v1/reviewer')
      .then(res => {
        expect(res.body).toMatchObject(JSON.parse(JSON.stringify(reviewers)));
      });
  });

  it('can get a reviewer by id', async() => {
    const studio = await Studio.create({ name: 'MGM' });
    const film = await Film.create({
      title: 'a film',
      studio: studio._id,
      released: 1945,
    });
    const reviewer = await Reviewer.create({ name: 'bob', company: 'bob.com' });
    await Review.create([
      { rating: 1, reviewer: reviewer._id, review: 'a review', film: film._id },
      { rating: 2, reviewer: reviewer._id, review: 'a review', film: film._id },
      { rating: 3, reviewer: reviewer._id, review: 'a review', film: film._id }
    ]);

    return request(app)
      .get(`/api/v1/reviewer/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer._id.toString(),
          name: reviewer.name,
          company: reviewer.company,
          reviews: expect.any(Array)
        });
      });
  });
});
