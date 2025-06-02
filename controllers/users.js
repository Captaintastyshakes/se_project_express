const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const error = require("../utils/errors");

const signUp = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      delete user.hash;
      const { name, _id, email, avatar } = user;
      console.log("Signed up!");
      return res.status(201).send({ name, avatar, email, _id });
    })
    .catch((err) => {
      console.log("Error block SU: " + err);
      const thisErr = error[err.name];
      if (!error[err.name]) {
        return res
          .status(500)
          .send({ message: "Uncaught exception, internal code SU2" });
      }
      return res
        .status(thisErr.code)
        .send({ message: `${thisErr.message}, internal code SU3` });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  try {
    User.findUserByCredentials(email, password)
      //.orFail()
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.send({ token });
      })
      .catch((err) => {
        const thisErr = error[err.name];
        if (!error[err.name]) {
          return res
            .status(500)
            .send({ message: "Uncaught exception, internal code LI1" });
        }
        return res
          .status(thisErr.code)
          .send({ message: `${thisErr.message}, internal code LI2` });
      });
  } catch {
    return res
      .status(401)
      .send({ message: "couldn't find user! Internal code LI3." });
  }
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      const thisErr = error[err.name];
      if (!error[err.name]) {
        return res
          .status(500)
          .send({ message: "Uncaught exception, internal code GCU1" });
      }
      return res
        .status(thisErr.code)
        .send({ message: `${thisErr.message}, internal code GCU2` });
    });
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      const thisErr = error[err.name];
      if (!error[err.name]) {
        return res
          .status(500)
          .send({ message: "Uncaught exception, internal code UP1" });
      }
      return res
        .status(thisErr.code)
        .send({ message: `${thisErr.message}, internal code UP2` });
    });
};

module.exports = { signUp, login, getCurrentUser, updateProfile };
