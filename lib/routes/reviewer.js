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
      })
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
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Review
      .find({ reviewer: req.params.id })
      .then(reviews => {
        if(reviews[0]){
          throw new Error('You can not delete a reviewer with reviews');
        } else {
          Reviewer.findByIdAndDelete(req.params.id)
            .then(reviewer => res.send(reviewer));
        }
      })
      .catch(next);
  });
