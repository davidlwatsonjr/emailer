require("dotenv").config();

const express = require("express");
const { sendEmail } = require("./src/lib/emailer");

const app = express();

app.use(express.static("public"));

// Log request
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Authenticate request
const { API_KEY } = process.env;
app.use((req, res, next) => {
  const { headers } = req;

  if (headers["x-api-key"] !== API_KEY) {
    console.log(`Invalid API key: ${headers["x-api-key"]}`);
    res.status(401).send({ error: "Invalid API key" });
  } else {
    next();
  }
});

app.get("/ping", async (req, res) => {
  res.send("pong");
});

app.get("/send", async (req, res) => {
  const { to, subject, text } = req.query;
  const response = { success: false, query: req.query };

  try {
    const info = await sendEmail(to, subject, text);
    console.log(`Email sent: ${info.response}`);
    response.success = true;
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);
    response.error = error;
  }

  res.send(response);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The emailer container started successfully and is listening for HTTP requests on ${PORT}`
  );
});
