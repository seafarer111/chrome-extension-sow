// const nodemailer = require("nodemailer");
// const smtpTransport = require("nodemailer-smtp-transport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sendgrid = require('@sendgrid/mail');

dotenv.config();

// sendgrid.setApiKey(process.env.SENDGRID);
// #
// const Transportsmtp = nodemailer.createTransport(
//   smtpTransport({
//     service: "Gmail",
//     auth: {
//       user: process.env.USER_EMAIL,
//       pass: process.env.USER_PASS,
//     },
//   })
// );

const hashToken = async (params) => {
  const token = await jwt.sign(
    {
      rand: params.random,
      email: params.email,
      token: params.token
    },
    process.env.SECRET_JWT,
    {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  );
  return token;
};

const Sendsmtp = async (email, type, random, userToken) => {
  let link;
  try {    
    token = await hashToken({ random, email, token: userToken });
    if (type === "signup") {
      link = process.env.CLIENTURL + `/setup/verify/${token}`;
    } else {
      link = process.env.CLIENTURL + `/setup/password/${token}`;
    }

    const mailOption = {
      from: process.env.FROMEMAIL,
      to: email,
      subject:
        type == "signup"
          ? "Please confirm your email"
          : "Forgot your password?It happends to the bet of us.",
      text:
        type == "signup"
          ? `
          Thank you for joining Mindmail! To finish signing up, you just need to confirm that we got your email right.

          To confirm your email, please click this link:

          ${link}

          Welcome and thanks!
          The Mindmail`
          : 
          `Dear Mindmail User,

          We have received your request to reset your password. Please click the link below to complete the reset:

          ${link}
          
          If you need additional assistance, or you did not make this change, please contact help@getpostman.com.

          Cheers,
          The Mindmail Team`,
    };

    sendgrid.send(mailOption)
          .then()
          .catch(er => console.dir(er.response.body.errors))

    return {
      state: true,
    };

    // await Transportsmtp.sendMail(mailOption, (error, response) => {
    //   if (error) {
    //     return {
    //       state: false,
    //     };
    //   } else {
    //     return {
    //       state: true,
    //     };
    //   }
    // });

  } catch (e) {
    return {
      state: false,
    };
  }
};
module.exports = {
  Sendsmtp,
};
