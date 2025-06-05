const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const error = require("../utils/errors");

const verifyAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization denied." });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log("Error block VA: " + err);
    const thisErr = error[err.name];
    if (!thisErr) {
      return res
        .status(404)
        .send({ message: "invalid token, sorry- internal code VA1" });
    }
    return res
      .status(thisErr.code)
      .send({ message: `${thisErr.message}, internal code VA2` });
  }
  req.user = payload;
  next();
};

module.exports = { verifyAuthorization };
