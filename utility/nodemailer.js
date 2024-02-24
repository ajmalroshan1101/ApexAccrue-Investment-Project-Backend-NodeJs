const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.mymail,
    pass: process.env.mailpass,
  },
});

const nodemail = {
  approvedmail: (too, companyname, genaratedpass) => {
    const mailOptions = {
      from: process.env.mymail,
      to: too,
      subject:
        "Approval of Company Request for Apexaccrue Investment Website Access",
      text: `Hello ${companyname} We are pleased to inform you that your recent request to join the Apexaccrue Investment website has been approved. Welcome to our esteemed community of businesses dedicated to growth and success.
            To access your account, please use the following login credentials:
            
            Email: ${too}
            Temporary Password:${genaratedpass}
            
            Upon your first login, you will be prompted to update your password for security reasons. We highly recommend choosing a strong and secure password.
            
            Feel free to explore the features and benefits of our platform, designed to enhance collaboration and facilitate investment opportunities. Should you have any questions or require assistance, our support team is readily available to help.
            
            Thank you for choosing Apexaccrue Investment. We look forward to a prosperous partnership.
            
            Best regards,
            
            Apexaccrue Investment Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Error sending email:", error);
      }
      console.log("Email sent:", info.response);
    });
  },
  rejectmail: (too , companyname) => {
    const mailOptions = {
      from: process.env.mymail,
      to: too,
      subject: "Rejection of Company Request to Join ApexAccrue Investment",
      text: `Dear ,${companyname}

        We appreciate your interest in joining ApexAccrue Investment. After careful consideration, we regret to inform you that your company request has been rejected. Unfortunately, at this time, we are unable to proceed with the approval due to concerns about the alignment of your company details with our criteria and a lack of familiarity with your organization.
        
        We value transparency and trust in our partnerships, and currently, we face challenges in establishing a sufficient level of confidence in your company's profile.
        
        We understand that this news may be disappointing, and we encourage you to address any specific concerns or provide additional information that could address our reservations. You are welcome to reapply in the future once we have a clearer understanding of your company and its credibility.
                
        Thank you for considering ApexAccrue Investment. We wish you success in your future endeavors.
        
        Best regards,
         
        ApexAccrue Investment Team
        
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Error sending email:", error);
      }
      console.log("Email sent:", info.response);
    });
  },
};

module.exports = nodemail;
