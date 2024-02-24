const express = require('express');

const adminRouter = express.Router();

const {createadmin}=require('../controllers/admin.controller');

adminRouter.post('/createadmin',createadmin);

module.exports = adminRouter;