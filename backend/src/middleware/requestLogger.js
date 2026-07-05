import logger from "../config/logger.js";

function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration,
        ip: req.ip,
      },
      "HTTP request completed",
    );
  });

  next();
}

export default requestLogger;
