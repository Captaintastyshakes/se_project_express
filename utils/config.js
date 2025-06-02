const crypto = require("crypto");

const JWT_SECRET = crypto.randomBytes(16).toString("hex");

//const JWT_SECRET = "magicSauce";

module.exports = { JWT_SECRET };
