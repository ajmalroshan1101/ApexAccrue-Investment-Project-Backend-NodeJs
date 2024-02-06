const mongoose = require('mongoose');

const newuser = new mongoose.Schema({
  UserName: {type: String, required: true},
  Email: {type: String, required: true},
  Password: {type: String, required: true},
  Phone: {type: String, required: true},
  User: {type: String,
    default: 'User'},
});

const user =mongoose.model('users', newuser);

module.exports= user;
