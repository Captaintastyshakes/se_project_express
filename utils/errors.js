const { JsonWebTokenError } = require("jsonwebtoken");

const error = {
  ValidationError: {
    code: 400,
    message: "Validation error/invalid data submitted. ",
  },
  CastError: {
    code: 400,
    message: "Invalid parameter. ",
  },
  DocumentNotFoundError: {
    code: 404,
    message: "Resource unable to be found. ",
  },
  undefined: {
    code: 500,
    message: "Server error. ",
  },
  ConflictError: {
    code: 409,
    message: "Conflict error. ",
  },
  AssertionError: {
    code: 400,
    message: "something's wrong",
  },
  ReferenceError: {
    code: 401,
    message: "User not found!",
  },
  Error: {
    code: 400,
    message: "Generic, unspecified error.",
  },
  TypeError: {
    code: 404,
    message: "IDFK, wrong type m80",
  },
  MongoServerError: {
    code: 409,
    message: "Unique entry violation.",
  },
  JsonWebTokenError: {
    code: 401,
    message: "Json web token is invalid/doesn't pass authorization.",
  },
};
module.exports = error;
