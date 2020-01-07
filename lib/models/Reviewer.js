const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

schema.statics.findWithReviews = function(id) {
  return Promise.all([
    this
      .findById(id)
      .lean()
      .populate('reviews'),
    this.model('Review')
      .find({ reviewer: id })
      .populate('film', { id:true, title:true })
      .select({ reviewer: false })
  ])
    .then(([reviewer, review]) => {
      reviewer.reviews = review;
      return reviewer;
    });
};

module.exports = mongoose.model('Reviewer', schema);
