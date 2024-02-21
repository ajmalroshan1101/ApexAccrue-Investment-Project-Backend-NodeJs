const UserMongoose = require("../models/UserSchema");

const bcrypt = require("bcrypt");

const otp = require("../utility/twilio");

const checkOtp = require("../utility/twiliocheck");

const jwt = require("jsonwebtoken");

const user = {
  UserSignup: async (req, res) => {
    try {
      const { FullName, Email, Password, Phone } = req.body;

      const HPassword = await bcrypt.hash(Password, 10);

      // const alreadyuser = await UserMongoose.find({ Phone, Verified: true });
      const alreadyuser = await UserMongoose.findOne({
        Phone,
        Verified: { $in: [true] },
      });

      if (alreadyuser) {
        res.json({ otpsend: false, message: "Already Exist Phone number" });
      } else {
        otp(Phone).then((msg) => {
          res.json({ otpsend: true, message: "otp send successfully" });
        });

        //New User is saved in Database
        const newuser = new UserMongoose({
          FullName,
          Email,
          HPassword,
          Phone,
        });

        const saveduser = await newuser.save();
      }
    } catch (error) {
      console.log(error);
      res.json({ Error: "Entered value is invalid" });
    }
  },

  //This Function is To Check Weather The Send OTP is Correct or not .

  UserOtpVerify: async (req, res) => {
    try {
      const { Phone, otp } = req.body;

      const status = await checkOtp(Phone, otp);

      const statusValue = status.status;

      console.log(statusValue);

      if (statusValue === "approved") {
        await UserMongoose.updateMany(
          { Phone: Phone },
          { $set: { Verified: true } }
        );

        console.log("-----------------------------------------update token");

        //To find The user from the database
        const tokenFindUser = await UserMongoose.findOne({
          Phone,
          Verified: { $in: [true] },
        });

        //sceret_key is the second key for creating the token
        const secret_key = process.env.secret_key;

        //Payload is to the key object for creating a token
        const paylaod = {
          _id: tokenFindUser._id,
          fullName: tokenFindUser.FullName,
          user: tokenFindUser.User,
          Phone: tokenFindUser.Phone,
        };

        //Now the token is created
        const token = jwt.sign(paylaod, secret_key, { expiresIn: "1h" });

        console.log(tokenFindUser);

        //Sending the response to frontend

        res.json({
          Message: "The Otp is Correct ",
          otpCheck: true,
          token,
          userType: tokenFindUser.User,
        });

        // await UserMongoose.findOneAndUpdate({Phone},{Verified:true})
      } else {
        res.json({ Message: "The Otp is Inncorrect ", otpCheck: false });
      }
    } catch (error) {
      console.log(error);
    }
  },

  finduser: async (req, res) => {
    try {
      const user = req.body.username;

      const realuser = await UserMongoose.findOne({ FullName: user });

      if (realuser) {
        res.json({ user: true, message: "Hello" });
      } else {
        res.json({ user: false, message: "no hello" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  finduserandpassword: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password);

      const passwordfind = await UserMongoose.findOne({ FullName: username });
      console.log(passwordfind);
      console.log(passwordfind.HPassword);

      if (passwordfind) {
        const result = await bcrypt.compare(password, passwordfind.HPassword);
        console.log(result);
        if (result) {
          res.json({ result: true, message: "correct" });
          return;
        } else {
          res.json({ result: false, message: "Incorrect password" });
          return;
        }

        // {
      } else {
        res.json({ user: false, message: "User not found" });
      }
    } catch (error) {
      console.log(error);
    }
  },

  loginpostuser: async (req, res) => {
    try {
      console.log("-----------------------------------------");
      console.log(req.body);
      const { username, password } = req.body.data;

      console.log(username);

      const usersearch = await UserMongoose.findOne({ FullName: username });

      console.log(usersearch);

      if (usersearch) {
        const passcheck = await bcrypt.compare(password, usersearch.HPassword);

        console.log(passcheck);
        if (passcheck) {
          const secret_key = process.env.secret_key;

          const paylaod = {
            _id: usersearch._id,
            fullname: usersearch.FullName,
            userType: usersearch.User,
          };

          //Now the token is created
          const token = jwt.sign(paylaod, secret_key, { expiresIn: "1h" });

          //sending the responses to frontend with the token
          return res.json({
            message: "Login successful",
            token,
            login: true,
            user: usersearch.User,
          });
        }
      } else {
        return res.json({ message: "Data is not Reached ", login: false });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = user;
