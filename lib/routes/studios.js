const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({ name: true })
      .then(studios => res.send(studios))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .lean()
      .populate('films', 'title')
      .then(studio => {
        studio.films.forEach(film => {
          delete film.studio;
        });
        res.send(studio);})
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  });
