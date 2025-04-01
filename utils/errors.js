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
};
module.exports = error;
