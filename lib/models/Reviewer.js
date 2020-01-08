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

schema.statics.deleteWithError = function(id) {
  return this.model('Review')
    .find({ reviewer: id })
    .then(reviews => {
      if(reviews[0]){
        throw new Error('You can not delete a reviewer with reviews');
      } 
      else {
        return this
          .findByIdAndDelete(id);
      }
    });
};

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
