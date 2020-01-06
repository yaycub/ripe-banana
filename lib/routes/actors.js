const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({ versionKey: false, dob: false, pob: false })
      .then(actors => res.send(actors))
      .catch(next);
  });
