const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => {
      console.log("Users returned!");
      res.status(200).send(users);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "error: user not found." });
      } else if (err.name === "CastError") {
        return res.status(401).send({ message: "error" });
      }
      return res.status(500).send({ message: "error" });
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
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "error: user not found." });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: "error" });
      }
      return res.status(500).send({ message: "error" });
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
      if (err.name === "CastError") {
        return res.status(401).send({ message: "error" });
      } else if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Validation error." });
      }
      return res.status(500).send({ message: "error" });
    });
};

module.exports = { getUsers, getUser, createUser };
