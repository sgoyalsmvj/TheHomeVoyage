const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,// This makes the index ignore documents where googleId is null
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
