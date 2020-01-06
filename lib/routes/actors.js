const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({ versionKey: false, dob: false, pob: false })
      .then(actors => res.send(actors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .lean()
      .populate('films')
      .then(actor => {
        actor.films.forEach(film => {
          delete film.studio;
          delete film.cast;
          delete film.__v;
        });
        res.send(actor);
      })
      .catch(next);
  });
