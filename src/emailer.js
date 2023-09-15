const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  const from = EMAIL_USER;

  const mailOptions = { from, to, subject, text };

  return await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
