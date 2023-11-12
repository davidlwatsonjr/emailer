const { sendEmail } = require("../lib/nodemailer");

const send = async (req, res) => {
  const { to, subject, body } = req.query;
  const response = { success: false, query: req.query };

  try {
    const info = await sendEmail(to, subject, body);
    console.log(`Email sent: ${info.response}`);
    response.success = true;
  } catch (error) {
    console.error(
      `Error occurred sending email: [${error.status}] - ${error.message}`
    );
    response.error = error;
    res.status(500);
  }

  res.send(response);
};

module.exports = { send };
