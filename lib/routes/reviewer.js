const { Router } = require('express');
const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');

module.exports = Router()

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Reviewer
        .findById(req.params.id)
        .lean()
        .populate('reviews'),
      Review
        .find({ reviewer: req.params.id })
        .populate('film', { _id: true, title: true })
        .select({ reviewer: false })
    ])
      .then(([reviewer, review]) => {
        reviewer.reviews = review;
        res.send(reviewer);
      });
  });
