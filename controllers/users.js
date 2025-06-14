const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const error = require("../utils/errors");

const signUp = (req, res) => {
  let thisErr;
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
      console.log("Signed up!");
      return res.status(201).send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (!error[err.name]) {
        thisErr = error.undefined;
        const { code, message } = thisErr;
        const outMessage = `Int code SU2: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      thisErr = error[err.name];
      const { code, message } = thisErr;
      const outMessage = `Int code SU3: ${message} ${err.message}`;
      return res.status(code).send({ message: outMessage });
    });
};

const login = (req, res) => {
  let thisErr;
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      if (!error[err.name]) {
        thisErr = error.undefined;
        const { code, message } = thisErr;
        const outMessage = `Int code LI1: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      if (err.message.includes("FUBC")) {
        thisErr = error.ReferenceError;
        const { code, message } = thisErr;
        const outMessage = `Int code LI2: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      thisErr = error[err.name];
      const { code, message } = thisErr;
      const outMessage = `Int code LI3: ${message} ${err.message}`;
      return res.status(code).send({ message: outMessage });
    });
};

const getCurrentUser = (req, res) => {
  let thisErr;
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      if (!error[err.name]) {
        thisErr = error.undefined;
        const { code, message } = thisErr;
        const outMessage = `Int code GCU1: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      thisErr = error[err.name];
      const { code, message } = thisErr;
      const outMessage = `Int code GCU2: ${message} ${err.message}`;
      return res.status(code).send({ message: outMessage });
    });
};

const updateProfile = (req, res) => {
  let thisErr;
  const { name, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      if (!error[err.name]) {
        thisErr = error.undefined;
        const { code, message } = thisErr;
        const outMessage = `Int code UP1: ${message} ${err.message}`;
        return res.status(code).send({ message: outMessage });
      }
      thisErr = error[err.name];
      const { code, message } = thisErr;
      const outMessage = `Int code UP2: ${message} ${err.message}`;
      return res.status(code).send({ message: outMessage });
    });
};

module.exports = { signUp, login, getCurrentUser, updateProfile };
