const express = require("express");

const UserRouter = express.Router();

const {
  UserSignup,
  UserOtpVerify,
  finduser,
  finduserandpassword,

  loginpostuser,
} = require("../controllers/user-controller");

UserRouter.post("/Signup", UserSignup);

UserRouter.post("/verifyotp", UserOtpVerify);

UserRouter.post("/finduser", finduser);

UserRouter.post("/finduserandpassword", finduserandpassword);

UserRouter.post("/loginpost", loginpostuser);

module.exports = UserRouter;
