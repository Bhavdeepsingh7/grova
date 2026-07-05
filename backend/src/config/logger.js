import pino from "pino";
import env from "./env.js";

const transport = env.isProduction
  ? undefined
  : pino.transport({
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    });

const logger = pino({ level: env.isProduction ? "info" : "debug" }, transport);

export default logger;
