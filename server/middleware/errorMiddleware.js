export const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  res.status(statusCode).json({
    success: false,
    message: "Server Error: " + err.message || "Server Error",
  });
};
