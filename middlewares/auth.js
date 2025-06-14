const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const error = require("../utils/errors");

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  let thisErr;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    thisErr = error.JsonWebTokenError;
    const { code, message } = thisErr;
    return res.status(code).send({ message });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    thisErr = error.JsonWebTokenError;
    const { code, message } = thisErr;
    const outMessage = `Error block VA, int code VA1: ${message} ${err.message}`;
    return res.status(code).send({ message: outMessage });
  }
  req.user = payload;
  next();
};

module.exports = { verifyAuthorization };
