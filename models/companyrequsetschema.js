const mongoose = require('mongoose');

const companyrequestSchema = new mongoose.Schema({
    companyName: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  nominalCapital: {
    type: Number,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  companyDescription: {
    type: String,
    required: true
  },
  verification: {
    type: String,
    required: true
  },
  approvel: {
    type:String,
    default: 'pending'
  },
  password:{
    type:String
  }
});

const CompanyModel = mongoose.model('Companyrequests', companyrequestSchema);

module.exports = CompanyModel;
