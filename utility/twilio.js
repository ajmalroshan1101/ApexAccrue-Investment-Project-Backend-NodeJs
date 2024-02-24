const twilio = require('twilio');

const otpgenerate = async function (phone) {

    console.log(phone);
    
    const ACCOUNTSID = process.env.ACCOUNTSIDTWILIO;

    const authId = process.env.AUTHTOCKENTWILIO;

    const serviceSid = process.env.SERVICESIDTWILIO;

    const countryCode = process.env.COUNTRYCODE;

    const client = twilio(ACCOUNTSID, authId);

    verification = await client.verify.v2.services(`${serviceSid}`)
        .verifications.create({ to: `${countryCode}${phone}`, channel: 'sms' });
};

module.exports = otpgenerate;