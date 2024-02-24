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

  approveCompany: async (req, res) => {
    try {
      //reciving the data from the frondend
      const companyid = req.body.companyId;

      //calling the random password
      const generatepassword = recivepass();

      //finding the doucment using the companyid
      const companysearch = await companyrequestSchema.findOne({
        _id: companyid,
      });

      // Find and update the 'approvel' field to 'approved' for the given company ID
      const updatedCompany = await companyrequestSchema.findOneAndUpdate(
        { _id: companyid, approvel: "pending" }, // Ensure it is still pending before updating
        { $set: { approvel: "approved", password: generatepassword } },
        { new: true }
      );

      //if the doucment is not found then it will return
      if (!updatedCompany) {
        return res
          .status(404)
          .json({ error: "Company not found or already approved" });
      }

      // sending mail and generated values to approvelmail function
      nodemail.approvedmail(
        companysearch.email,
        companysearch.companyName,
        generatepassword
      );

      //Adding the updated and approved document to new collection
      const companyMongooseDoc = new companyMongoose(updatedCompany.toObject());

      //saving the data
      await companyMongooseDoc.save();

      //Deleting the doucment form the collection after it is approved
      await CompanyRequest.deleteOne({ _id: companyid });

      res.status(200).json({
        message: "Company approved successfully",
        company: updatedCompany,
      });
    } catch (error) {}
  },

  rejectCompany: async (req, res) => {
    try {
      const companyid = req.body.companyId;

      const companysearch = await companyrequestSchema.findOne({ _id:companyid });

      nodemail.rejectmail(companysearch.email, companysearch.companyName);

      // Find the company by ID and remove it
      const deletedCompany = await companyrequestSchema.deleteOne({
        _id: companyid,
      });

      if (deletedCompany.deletedCount === 1) {
        // Document was successfully deleted
        res.status(200).json({
          message: "Company rejected and document deleted successfully",
        });
      } else {
        // Document with the specified ID was not found
        res
          .status(404)
          .json({ error: "Company not found or already rejected" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = company;
