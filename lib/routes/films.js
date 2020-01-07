const { Router } = require('express');
const Film = require('../models/Film');
const Review = require('../models/Review');

module.exports = Router()
  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ title: true, released: true, studio: true })
      .populate('studio', 'name')
      .then(films => res.send(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Film
        .findById(req.params.id)
        .select({ _id: false })
        .lean()
        .populate('studio', { _id: true, name: true })
        .populate('cast.actor', { name: true }),
      Review
        .find({ film: req.params.id })
        .populate('reviewer', { _id: true, name:true })
        .select({ film: false })
    ])
      .then(([film, reviews]) => {
        film.reviews = reviews;
        res.send({
          ...film,
          reviews
        });
      })
      .catch(next);
  });
