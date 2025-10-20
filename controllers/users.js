const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const error = require("../errors/errors");
const cError = require("../errors/cErrors");

const {
  ConflictError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError,
  GenericError,
} = cError;

const signUp = (req, res, next) => {
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
        return next(new Error(thisErr.message));
      }
      thisErr = error[err.name];
      return next(new GenericError(thisErr.code, thisErr.message));
    });
};

const login = (req, res, next) => {
  let thisErr;
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      const approvedData = {
        avatar: user.avatar,
        name: user.name,
        _id: user._id,
      };
      return res.send({ token, approvedData });
    })
    .catch((err) => {
      if (cError[err.name]) {
        return next(new cError[err.name](err.message));
      }
      if (!error[err.name]) {
        thisErr = error.undefined;
        return next(new Error(thisErr.message));
      }
      if (err.message.includes("FUBC1")) {
        console.log(err.message);
        thisErr = error.ValidationError;
        return next(new BadRequestError(thisErr.message));
      }
      if (err.message.includes("FUBC2")) {
        console.log(err.message);
        thisErr = error.ReferenceError;
        return next(new BadRequestError(thisErr.message));
      }
      if (err.message.includes("FUBC3")) {
        console.log(err.message);
        thisErr = error.JsonWebTokenError;
        return next(new UnauthorizedError(thisErr.message));
      }
      thisErr = error[err.name];
      return next(new GenericError(thisErr.code, thisErr.message));
    });
};

const getCurrentUser = (req, res, next) => {
  let thisErr;
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      if (cError[err.name]) {
        return next(new cError[err.name](err.message));
      }
      if (!error[err.name]) {
        thisErr = error.undefined;
        return next(new Error(thisErr.message));
      }
      thisErr = error[err.name];
      return next(new GenericError(thisErr.code, thisErr.message));
    });
};

const updateProfile = (req, res, next) => {
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
      if (cError[err.name]) {
        return next(new cError[err.name](err.message));
      }
      if (!error[err.name]) {
        thisErr = error.undefined;
        return next(new Error(thisErr.message));
      }
      thisErr = error[err.name];
      return next(new GenericError(thisErr.code, thisErr.message));
    });
};

module.exports = { signUp, login, getCurrentUser, updateProfile };
