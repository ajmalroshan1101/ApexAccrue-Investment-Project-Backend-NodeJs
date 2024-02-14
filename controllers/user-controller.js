const UserMongoose = require("../models/UserSchema");

const otp = require("../utility/twilio");

const checkOtp = require("../utility/twiliocheck");

const user = {
  UserSignup: async (req, res) => {

    const { FullName, Email, Password, Phone } = req.body;

    // const alreadyuser = await UserMongoose.find({ Phone, Verified: true });
    const alreadyuser = await UserMongoose.findOne({
      Phone,
      Verified: { $in: [true] },
    });


    if (alreadyuser) {

      res.json({ otpsend: false, message: "Already Exist" });

    } else {

      otp(Phone).then((msg) => {

        res.json({ otpsend: true, message: "otp send successfully" });

      });

      //New User is saved in Database
      const newuser = new UserMongoose({
        FullName,
        Email,
        Password,
        Phone,
      });

      const saveduser = await newuser.save();
    }
  },

  //This Function is To Check Weather The Send OTP is Correct or not .

  UserOtpVerify: async (req, res) => {
    console.log(req.body);

    const { Phone, otp } = req.body;
    try {

      const status = await checkOtp(Phone, otp);

      const statusValue = status.status;
      
      console.log(statusValue);

      if (statusValue === "approved") {

        await UserMongoose.updateMany(
          { Phone: Phone },
          { $set: { Verified: true } }
        ); 

        res.json({Message:'The Otp is Correct ',otpCheck:true});

        // await UserMongoose.findOneAndUpdate({Phone},{Verified:true})
      }else{

        res.json({Message:'The Otp is Inncorrect ',otpCheckrs:false});
      }
    } catch (error) {

      console.log(error);

    }
  },
};

module.exports = user;
