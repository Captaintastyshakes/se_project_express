const express = require("express");

const app = express();

const mongoose = require("mongoose");

const mainRouter = require("./routes/index");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "67dcdb90737cc62e5951d7a9",
  };
  next();
});
app.use("/", mainRouter);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log("We up and at it!");
});
