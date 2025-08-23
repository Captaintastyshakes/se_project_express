const errorHandler = (err, req, res, next) => {
  console.error(err);
  //console.log(err.name);
  const { statusCode = 500, message } = err;
  return res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurerd on the server." : message,
  });
};

module.exports = errorHandler;
