const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const otp = require("../utility/twilio");

const adminmongoose = require('../models/adminschema')

const UserMongoose = require("../models/UserSchema");

const checkOtp = require("../utility/twiliocheck");

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

      if (alreadyuser.FullName === FullName) {
        return res.json({
          otpsend: false,
          message: "Already Exist username",
          error: true,
        });
      } else if (alreadyuser.Email === Email) {
        return res.json({
          otpsend: false,
          message: "Already exist Email",
          error: true,
        });
      } else if (alreadyuser.Phone === Phone) {
        return res.json({
          otpsend: false,
          message: "Already exist Phone number",
          error: true,
        });
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

      res.json({ Error: "Entered value is invalid" });
    }
  },

  //This Function is To Check Weather The Send OTP is Correct or not .

  UserOtpVerify: async (req, res) => {
    try {
      const { Phone, otp } = req.body;

      const status = await checkOtp(Phone, otp);

      const statusValue = status.status;


      if (statusValue === "approved") {
        await UserMongoose.updateMany(
          { Phone: Phone },
          { $set: { Verified: true } }
        );

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

  // finduser: async (req, res) => {
  //   try {
  //     const user = req.body.username;

  //     const realuser = await UserMongoose.findOne({ FullName: user });
  //     const realadmin = await adminmongoose.findOne({username:user})

  //     if (realuser || realadmin) {
  //       res.json({ user: true, message: "Hello" });
  //     } else {
  //       res.json({ user: false, message: "no hello" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  
  // finduserandpassword: async (req, res) => {
  //   try {
  //     const { username, password } = req.body;
  //     console.log(username, password);

  //     const passwordfind = await UserMongoose.findOne({ FullName: username });
  //     const adminfind = await adminmongoose.findOne({username});

  //     console.log(adminfind.User);
  //     if (passwordfind.User === 'user') {
  //       const result = await bcrypt.compare(password, adminfind.password);
  //       console.log(result);
  //       if (result) {
  //         res.json({ result: true, message: "correct" });
  //         return;
  //       } else {
  //         res.json({ result: false, message: "Incorrect password" });
  //         return;
  //       }
  //     }else if(adminfind.User === 'admin'){

  //       const result = await bcrypt.compare(password, passwordfind.HPassword);
  //       console.log(result);
  //       if (result) {
  //         res.json({ result: true, message: "correct" });
  //         return;
  //       } else {
  //         res.json({ result: false, message: "Incorrect password" });
  //         return;
  //       }
  //     }
  //      else {
  //       res.json({ user: false, message: "User not found" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  loginpostuser: async (req, res) => {
    try {
      
      const { username, password } = req.body.data;


      const usersearch = await UserMongoose.findOne({ FullName: username });

      const adminsreach = await adminmongoose.findOne({username})


      if (usersearch && usersearch.User === 'user') {

        const passcheck = await bcrypt.compare(password, usersearch.HPassword);

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
      }else if(adminsreach && adminsreach.User === 'admin'){

        const passcheck = await bcrypt.compare(password, adminsreach.password);

        if (passcheck) {
          const secret_key = process.env.secret_key;

          const paylaod = {
            _id: adminsreach._id,
            fullname: adminsreach.username,
            userType: adminsreach.User,
          };
           //Now the token is created
           const token = jwt.sign(paylaod, secret_key, { expiresIn: "1h" });

           //sending the responses to frontend with the token
           return res.json({
             message: "Login successful",
             token,
             login: true,
             user: adminsreach.User,
           });

        }


      }else {
        return res.json({ message: "Data is not Reached ", login: false });
      }
    } catch (error) {
  
    }
  },
};

module.exports = user;
