const express = require('express');
const app = express();
const mongoose=require('mongoose');
const bodyparse= require('body-parser');
const cors = require('cors');


require('dotenv').config();

require('./utility/connection')(app)

// These are the custom middlewares
const UserRouter = require('./routes/user-router');


app.use(cors());

app.use(bodyparse.urlencoded({extended: true}));

app.use(bodyparse.json());

app.use(express.json());

app.use('/User', UserRouter);


