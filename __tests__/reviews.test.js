require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
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
  
  it('can get all reviews', async() => {
    const reviewer = await Reviewer.create({ name: 'bob', company: 'bobs company' });
    const studio = await Studio.create({ name: 'MGM' });
    const film = await Film.create({
      title: 'Best Film',
      studio: studio._id,
      released: 1945
    });
    const reviews = await Review.create([
      { rating: 5, reviewer: reviewer._id, review: 'this is a review', film: film._id },
      { rating: 4, reviewer: reviewer._id, review: 'this is a review', film: film._id },
      { rating: 3, reviewer: reviewer._id, review: 'this is a review', film: film._id },
      { rating: 2, reviewer: reviewer._id, review: 'this is a review', film: film._id },
      { rating: 1, reviewer: reviewer._id, review: 'this is a review', film: film._id }
    ]);

    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        reviews.forEach(review => {
          expect(res.body).toContainEqual({
            _id: review._id.toString(),
            rating: review.rating,
            review: review.review,
            film: { _id: film._id.toString(), title: film.title }
          });
        });
      });
  });
});
