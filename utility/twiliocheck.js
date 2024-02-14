const checkOtp = async function (Phone, OTP) {
  return new Promise((resolve, reject) => {
    const accountSid = process.env.ACCOUNTSIDTWILIO;
    const authToken = process.env.AUTHTOCKENTWILIO;
    const serviceSid = process.env.SERVICESIDTWILIO;
    const client = require("twilio")(accountSid, authToken);

    client.verify.v2
      .services(`${serviceSid}`)
      .verificationChecks.create({ to: `+91${Phone}`, code: `${OTP}` })
      .then((verification_check) => {
        console.log(verification_check);
        console.log(".............................................................check otp");
        const status = verification_check;
        resolve(status);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = checkOtp;
