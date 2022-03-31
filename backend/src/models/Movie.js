const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: String,
  picture: String,
  releaseYear: Number,
  reviews: [{ rating: Number, comment: String }],
});

module.exports = model('Movie', schema);
