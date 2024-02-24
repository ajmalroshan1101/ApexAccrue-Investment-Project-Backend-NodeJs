const express = require('express');
const bodyparse= require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

require('./utility/connection')(app)

// These are the custom middlewares
const UserRouter = require('./routes/user-router');

const companyRouter = require('./routes/company-router');

const adminRouter = require('./routes/admin.router');

app.use(cors());

app.use(bodyparse.urlencoded({extended: true}));

app.use(bodyparse.json());

app.use(express.json());

app.use('/User', UserRouter);

app.use('/company',companyRouter);

app.use('/admin',adminRouter)


