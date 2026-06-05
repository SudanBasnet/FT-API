export const errorHandler = (error, req, res, next) => {
  //set default status code and message
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  console.log(error.message);
  res.status(statusCode).json({
    status: "error",
    message,
  });
};
