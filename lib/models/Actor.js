const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: Date,
  pob: String
}, {
  versionKey: false
});

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'cast.actor'
});

schema.statics.findWithFilms = function(id) {
  return this
    .findById(id)
    .lean()
    .populate('films')
    .then(actor => {
      actor.films.forEach(film => {
        delete film.studio;
        delete film.cast;
      });
      return actor;
    });
};

module.exports = mongoose.model('Actor', schema);
