const mongoose = require('mongoose');

const newuser = new mongoose.Schema({
  FullName: {type: String, required: true},
  Email: {type: String, required: true},
  HPassword: {type: String, required: true},
  Phone: {type: String, required: true},
  User: {type: String,
    default: 'User'},
  Verified: { type: Boolean, default: false },
});

const user =mongoose.model('users', newuser);

module.exports= user;
