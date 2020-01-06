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
});

module.exports = mongoose.model('Film', schema);
