import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";

import env from "./config/env.js";
import logger from "./config/logger.js";
import requestLogger from "./middleware/requestLogger.js";
import rateLimiter from "./middleware/rateLimiter.js";
import errorHandler from "./middleware/errorHandler.js";
import notFoundHandler from "./middleware/notFound.js";
import consultationRoutes from "./routes/consultationRoutes.js";

const app = express();

app.set("trust proxy", env.trustedProxies || 1);

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (env.corsAllowlist.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("CORS policy does not allow this origin."));
    },
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    environment: env.nodeEnv,
    uptime: process.uptime(),
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    uptime: process.uptime(),
  });
});

app.use("/api/consultation", consultationRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

logger.info({ nodeEnv: env.nodeEnv, port: env.port }, "Application configured");

export default app;