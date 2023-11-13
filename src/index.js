require("dotenv").config();

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

app.use(authAPIRequest);

app.get("/send", send);

app.use(serverErrorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The emailer container started successfully and is listening for HTTP requests on ${PORT}`
  );
});
