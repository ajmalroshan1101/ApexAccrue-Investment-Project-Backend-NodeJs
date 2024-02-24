const express = require("express");

const token = require('../middleware/tokenvalidation');

const companyRouter = express.Router();

const {companysingup , getcompanies ,} = require('../controllers/company-controller')

companyRouter.get('/getcompanies',token ,getcompanies);

companyRouter.post('/signup', companysingup);



module.exports = companyRouter;