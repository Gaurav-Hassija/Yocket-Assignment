class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class InternalError extends BaseError {
  constructor() {
    super("Internal Server Error !!");
    this.httpCode = 500;
    this.retry = true;
  }
}

class UnknownError extends BaseError {
  constructor() {
    super("Unknown Server Error !!");
    this.httpCode = 500;
    this.retry = true;
  }
}

class ValidationError extends BaseError {
  constructor(message) {
    super(message);
    this.httpCode = 400;
    this.retry = false;
  }
}

module.exports = {
  BaseError,
  InternalError,
  UnknownError,
  ValidationError,
};
