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

schema.statics.findWithReviews = function(id) {
  return Promise.all([
    this
      .findById(id)
      .lean(),
    this.model('Review')
      .find({ reviewer: id })
      .populate('film', { id:true, title:true })
      .select({ reviewer: false })
  ])
    .then(([reviewer, reviews]) => {
      return {
        ...reviewer,
        reviews
      };
    });
};

module.exports = mongoose.model('Reviewer', schema);
