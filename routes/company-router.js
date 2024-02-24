const express = require("express");

const token = require('../middleware/tokenvalidation')

const companyRouter = express.Router();

const {companysingup , getcompanies ,approveCompany ,rejectCompany} = require('../controllers/company-controller')

companyRouter.get('/getcompanies',token ,getcompanies);

companyRouter.post('/signup', companysingup);

companyRouter.post('/approveCompany' ,token ,  approveCompany);

companyRouter.post('/rejectCompany',token , rejectCompany)


module.exports = companyRouter;