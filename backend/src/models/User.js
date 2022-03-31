const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  role: String // user ou admin
});

module.exports = model('User', schema);
