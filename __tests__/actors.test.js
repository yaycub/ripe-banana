require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');

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

  it('can get an actor by id', async() => {
    const actor = await Actor.create({ name: 'Jacob', dob: new Date('1987-07-26'), pob: 'Philippines' });
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
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: actor._id.toString(),
          name: actor.name,
          dob: actor.dob.toISOString(),
          pob: actor.pob,
          films: [
            { title: film.title, released:film.released, _id: film._id.toString() }
          ]
        });
      });
  });

  it('can create an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Jacob',
        dob: new Date('1987-07-26'),
        pob: 'Philippines'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Jacob',
          dob: new Date('1987-07-26').toISOString(),
          pob: 'Philippines'
        });
      });
  });
});
