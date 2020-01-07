const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ title: true, released: true, studio: true })
      .populate('studio', 'name')
      .then(films => res.send(films))
      .catch(next);
  });
