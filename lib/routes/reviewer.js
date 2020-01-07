const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  });
