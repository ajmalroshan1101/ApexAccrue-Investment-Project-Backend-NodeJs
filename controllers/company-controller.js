const companyMongoose = require("../models/companysignupSchema");
const companyrequestSchema = require("../models/companyrequsetschema");
const nodemail = require("../utility/nodemailer");
const recivepass = require("../utility/generatepassword");
const company = {
  companysingup: async (req, res) => {
    //the data send from the frondend
    const {
      companyName,
      owner,
      streetAddress,
      city,
      state,
      zipcode,
      country,
      email,
      phoneNumber,
      nominalCapital,
      industry,
      website,
      companyDescription,
      verificationCheckbox,
    } = req.body;

    //creating a request document
    const requestsave = new companyrequestSchema({
      companyName,
      owner,
      streetAddress,
      city,
      state,
      zipcode,
      country,
      email,
      phoneNumber,
      nominalCapital,
      industry,
      website,
      companyDescription,
      verification: verificationCheckbox,
    });

    await requestsave.save();

    res.json({ Message: "hello" });
  },

  getcompanies: async (req, res) => {
    //To show the request in the collection
    const companyfind = await companyrequestSchema.find();

    res.json(companyfind);
  },
  
};

module.exports = company;
