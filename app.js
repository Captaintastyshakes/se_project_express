const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

const { errors } = require("celebrate");

const mainRouter = require("./routes/index");

const errorHandler = require("./middlewares/errorHandler");

const { requestLogger, errorLogger } = require("./middlewares/logger");

require("dotenv").config();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.get("/crash-test", () => {
  // !!!!
  setTimeout(() => {
    throw new Error("The server will crash now.");
  }, 0);
}); // REMOVE AFTER THE PROJECT IS ACCEPTED!!!
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log("We up and at it!");
});
