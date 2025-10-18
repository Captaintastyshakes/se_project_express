const error = {
  ValidationError: {
    code: 400,
    message: "Validation error/invalid data submitted.",
  },
  CastError: {
    code: 400,
    message: "Invalid parameter.",
  },
  DocumentNotFoundError: {
    code: 404,
    message: "Resource unable to be found.",
  },
  undefined: {
    code: 500,
    message: "Server error.",
  },
  ConflictError: {
    code: 409,
    message: "Conflict error.",
  },
  AssertionError: {
    code: 400,
    message: "something's wrong.",
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
    message: "Wrong type, resource unable to be found.",
  },
  MongoServerError: {
    code: 409,
    message: "Unique entry violation.",
  },
  JsonWebTokenError: {
    code: 401,
    message: "Json web token is invalid/doesn't pass authorization.",
  },
  EmailInUseError: {
    code: 409,
    message: "this email is already in use.",
  },
  DeleteError: {
    code: 500,
    message: "There was a problem deleting.",
  },
  OwnerMismatchError: {
    code: 403,
    message: "Owner and requestor mismatch!",
  },
};
module.exports = error;
