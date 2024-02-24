const express = require("express");

const UserRouter = express.Router();

const {
  UserSignup,
  UserOtpVerify,
  loginpostuser,
} = require("../controllers/user-controller");

UserRouter.post("/Signup", UserSignup);

UserRouter.post("/verifyotp", UserOtpVerify);

UserRouter.post("/loginpost", loginpostuser);


module.exports = UserRouter;
