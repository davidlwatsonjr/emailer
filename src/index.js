const { SECRETS } = process.env;
if (SECRETS) {
  try {
    const secrets = JSON.parse(SECRETS.replace(/\n/g, ""));
    Object.keys(secrets).forEach((key) => {
      process.env[key] = secrets[key];
    });
  } catch (e) {
    console.error("Error parsing SECRETS JSON", e);
  }
}

const express = require("express");

const {
  gcpLogTransformer,
  requestLogger,
  authAPIRequest,
  serverErrorHandler,
} = require("@davidlwatsonjr/microservice-middleware");
const { send } = require("./controllers/emailer");

const app = express();

app.use(gcpLogTransformer);
app.use(requestLogger);

app.get("/ping", async (req, res) => {
  res.send("pong");
});

app.use(authAPIRequest("EMAILER"));

app.get("/send", send);

app.use(serverErrorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The emailer container started successfully and is listening for HTTP requests on ${PORT}`,
  );
});
