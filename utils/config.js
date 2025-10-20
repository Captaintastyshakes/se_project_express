// const JWT_SECRET = "934F7E56800504D4";

const {
  JWT_SECRET = "ba8539e5876d471f7c1d11b99ac0e764a99e36232c3880247f1267f0bc584ed4",
} = process.env;

module.exports = { JWT_SECRET };

// doin some cryptographic stuff for real

// const crypto = require("crypto");

// const actuallyRandomString = crypto.randomBytes(16).toString("hex");

// console.log(actuallyRandomString);
