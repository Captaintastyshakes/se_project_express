const User = require("../models/user");

const error = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      console.log("Users returned!");
      res.status(200).send(users);
    })
    .catch((err) => {
      console.log(err);
      const thisErr = error[err.name];
      return res.status(thisErr.code).send({ message: thisErr.message });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      console.log("Here is your user.");
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      const thisErr = error[err.name];
      return res.status(thisErr.code).send({ message: thisErr.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({
    name,
    avatar,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
      const thisErr = error[err.name];
      return res.status(thisErr.code).send({ message: thisErr.message });
    });
};

module.exports = { getUsers, getUser, createUser };
