const express = require('express');
const app = express();
const mongoose=require('mongoose');
const bodyparse= require('body-parser');
const cors = require('cors');

// These are the custom middlewares
const UserRouter = require('./routes/user-router');

app.use(cors());

app.use(bodyparse.urlencoded({extended: true}));
app.use(express.json());

app.use('/User', UserRouter);

mongoose.connect('mongodb://localhost:27017/apexaccrue');

app.listen(8500);

