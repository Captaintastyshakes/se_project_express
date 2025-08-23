/*class uniError extends Error {
  constructor(name, code, message) {
    super(message);
    this.name = name;
    this.statusCode = code;
  }
}*/

/*const metaConstructor = (data) => {
  const {name, code, message} = data;
  class `${name}` extends Error {
    constructor(code, message) {
      super(message);
      this.statusCode = code;
    }
  }
};*/

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class GenericError extends Error {
  constructor(code, message) {
    super(message);
    this.statusCode = code;
  }
}

//module.exports = uniError;
module.exports = {
  ConflictError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError,
  GenericError,
};
