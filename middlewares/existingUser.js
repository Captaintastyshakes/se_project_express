const error = require("../utils/errors");
const User = require("../models/user");

const checkForExistingUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .orFail()
    .then((result) => {
      if (result) {
        return Promise.reject(new Error("This email is already in use."));
      }
    })
    .catch((err) => {
      if (err.message.includes("This email is already in use")) {
        return res.status(409).send({ message: err.message });
      }
      next();
    });
};

module.exports = { checkForExistingUser };
