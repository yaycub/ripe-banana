const chance = require('chance').Chance();
const Actor = require('../models/Actor');
const Film = require('../models/Film');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');
const Studio = require('../models/Studio');

module.exports = async({ studio = 5, actor = 5, film = 2, reviewer = 10, review = 20 } = {}) => {
  const studios = await Studio.create([...Array(studio)].map(() => ({
    name: chance.name,
    address: {
      city: chance.city,
      state: chance.state,
      country: chance.country
    }
  })));

  const actors = await Actor.create([...Array(actor)].map(() => ({
    name: chance.name,
    dob: chance.date,
    pob: chance.city
  })));

  const films = await Film.create([...Array(film)].map(() => ({
    title: chance.name,
    studio: chance.pickone(studios.map(studio => studio._id)),
    released: chance.year,
    cast: [
      { role: chance.character, actor:chance.pickone(actors.map(actor => actor._id)) },
      { role: chance.character, actor:chance.pickone(actors.map(actor => actor._id)) }
    ]
  })));

  const reviewers =  await Reviewer.create([...Array(reviewer)].map(() => ({
    name: chance.name,
    company: chance.company
  })));

  await Review.create([...Array(review)].map(() => ({
    rating: Math.floor(Math.random() * 6),
    reviewer: chance.pickone(reviewers.map(reviewer => reviewer._id)),
    review: chance.sentence,
    film: chance.pickone(films.map(film => film._id))
  })));
};
