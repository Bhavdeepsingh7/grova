import app from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import transporter from "./config/transporter.js";

await transporter.verify();

const server = app.listen(env.port, () => {
  logger.info({ port: env.port }, "Server started");
});

const gracefulShutdown = (signal) => {
  return async () => {
    logger.info({ signal }, "Shutdown requested");

    server.close((closeError) => {
      if (closeError) {
        logger.error(closeError, "Error during server shutdown");
        process.exit(1);
      }
      logger.info("Server shutdown complete");
      process.exit(0);
    });

    setTimeout(() => {
      logger.error("Forcing server shutdown after timeout");
      process.exit(1);
    }, 10000).unref();
  };
};

process.on("SIGTERM", gracefulShutdown("SIGTERM"));
process.on("SIGINT", gracefulShutdown("SIGINT"));
process.on("uncaughtException", (err) => {
  logger.error(err, "Uncaught exception");
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Unhandled rejection");
});
