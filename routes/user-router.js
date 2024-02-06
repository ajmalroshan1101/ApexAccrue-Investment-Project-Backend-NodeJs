const express = require('express');

const UserRouter = new express.Router();

// const {UserSignup} = require('../controllers/user-controller');

UserRouter.post('/Signup', (req, res, next) => {
  console.log(req.body);
  res.json({err: 'reached'});
});


module.exports = UserRouter;
