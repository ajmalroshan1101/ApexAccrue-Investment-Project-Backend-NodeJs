const express = require('express');

const token = require('../middleware/tokenvalidation');


const adminRouter = express.Router();

const {createadmin , approveCompany , rejectCompany}=require('../controllers/admin.controller');

adminRouter.post('/createadmin',createadmin);

adminRouter.post('/approveCompany' ,token ,  approveCompany);

adminRouter.post('/rejectCompany',token , rejectCompany);

module.exports = adminRouter;