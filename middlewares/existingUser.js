const User = require("../models/user");
const error = require("../errors/errors");

const checkForExistingUser = (req, res, next) => {
  const { email } = req.body;
  let thisErr;
  return User.findOne({ email })
    .orFail()
    .then(() => {
      return Promise.reject(new Error("This email is already in use."));
    })
    .catch((err) => {
      if (err.message.includes("This email is already in use")) {
        thisErr = error.EmailInUseError;
        const { code, message } = thisErr;
        const outMessage = `Int code C4EU1: ${message}`;
        return res.status(code).send({ message: outMessage });
      }
      next();
    });
};

module.exports = { checkForExistingUser };
