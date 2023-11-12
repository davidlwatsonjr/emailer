const nodemailer = require("nodemailer");

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;
const from = EMAIL_USER;

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, body) =>
  await transporter.sendMail({ from, to, subject, html: body });

module.exports = { sendEmail };
