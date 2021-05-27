const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  secondname: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);

