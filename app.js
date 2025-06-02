const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

const mainRouter = require("./routes/index");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", mainRouter);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log("We up and at it!");
});
