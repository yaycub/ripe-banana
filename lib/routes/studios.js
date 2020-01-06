const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({ address: false })
      .then(studios => res.send(studios))
      .catch(next);
  });
