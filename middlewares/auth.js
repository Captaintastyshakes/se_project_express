const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const error = require("../errors/errors");
const { UnauthorizedError } = require("../errors/cErrors");

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  let thisErr;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    thisErr = error.JsonWebTokenError;
    const { message } = thisErr;
    next(new UnauthorizedError(message));
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    thisErr = error.JsonWebTokenError;
    const { message } = thisErr;
    const outMessage = `Error block VA, int code VA1: ${message} ${err.message}`;
    next(new UnauthorizedError(outMessage));
  }
  req.user = payload;
  next();
};

module.exports = { verifyAuthorization };
