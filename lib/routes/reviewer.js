const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findWithReviews(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => {
        res.send(reviewer);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Reviewer
      .deleteWithError(req.params.id)
      .then(reviewer => {
        res.send(reviewer);
      })
      .catch(next);
  });
