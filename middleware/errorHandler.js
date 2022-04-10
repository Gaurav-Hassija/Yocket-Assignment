const { BaseError, UnknownError } = require("../error");

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (!(err instanceof BaseError)) {
    err = new UnknownError();
  }
  let customError = {
    message: err.message || "OOPS! Something Went Wrong !!",
    retry: err.retry || false,
    statusCode: err.httpCode || 500,
  };
  res.status(customError.statusCode).json(customError);
};

module.exports = {
  errorHandler,
};
