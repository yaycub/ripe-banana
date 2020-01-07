require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Review = require('../lib/models/Review');
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

  it('can get a film by id', async() => {
    const actor = await Actor.create({ name: 'Jacob' });
    const studio = await Studio.create({ name: 'MGM' });
    const film = await Film.create({
      title: 'a film',
      studio: studio._id,
      released: 1945,
      cast: [
        { actor: actor._id } 
      ]
    });
    const reviewer = await Reviewer.create({ name: 'bob', company: 'bob.com' });
    await Review.create([
      { rating: 1, reviewer: reviewer._id, review: 'a review', film: film._id },
      { rating: 2, reviewer: reviewer._id, review: 'a review', film: film._id },
      { rating: 3, reviewer: reviewer._id, review: 'a review', film: film._id }
    ]);

    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          title: film.title,
          studio: { _id: studio._id.toString(), name: studio.name },
          released: 1945,
          cast: expect.any(Array),
          reviews: expect.any(Array),
          __v: 0
        });
      });
  });
});
