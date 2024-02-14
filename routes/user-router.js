const express = require("express");

const UserRouter = express.Router();

const { UserSignup ,UserOtpVerify } = require("../controllers/user-controller");

UserRouter.post("/Signup", UserSignup);

UserRouter.post('/verifyotp',UserOtpVerify);

module.exports = UserRouter;
