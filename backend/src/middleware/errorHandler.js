import logger from "../config/logger.js";

function errorHandler(err, req, res, next) {
  logger.error({ err, method: req.method, url: req.url, body: req.body }, "Unhandled server error");

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
}

export default errorHandler;
