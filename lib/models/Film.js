const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  role: String,
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true
  }
}, {
  versionKey: false,
  _id: false
});

const schema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true,
    maxlength: 4
  },
  cast: [castSchema]
}, {
  versionKey: false
});

schema.statics.findWithReviews = function(id) {
  return Promise.all([
    this
      .findById(id)
      .select({ _id: false })
      .lean()
      .populate('studio', { _id: true, name: true })
      .populate('cast.actor', { name: true }),
    this.model('Review')
      .find({ film: id })
      .populate('reviewer', { _id: true, name:true })
      .select({ film: false })
  ])
    .then(([film, reviews]) => {
      film.reviews = reviews;
      return {
        ...film,
        reviews
      };
    });
};

module.exports = mongoose.model('Film', schema);
