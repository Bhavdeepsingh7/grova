import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test").default("production"),
  PORT: Joi.number().default(5000),
  CORS_ALLOWLIST: Joi.string().default("http://localhost:3000"),
  RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000),
  RATE_LIMIT_MAX: Joi.number().default(100),
  RATE_LIMIT_TRUSTED_PROXIES: Joi.string().allow("", null).default(""),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_SECURE: Joi.boolean().truthy("true").falsy("false").default(false),
  EMAIL_USER: Joi.string().email().required(),
  EMAIL_PASS: Joi.string().required(),
  EMAIL_FROM: Joi.string().email().required(),
  EMAIL_TO: Joi.string().email().required(),
  EMAIL_SEND_TIMEOUT_MS: Joi.number().default(10000),
  EMAIL_MAX_RETRIES: Joi.number().default(2),
}).unknown(true);

const { error, value: env } = envSchema.validate(process.env, {
  abortEarly: false,
  allowUnknown: true,
});

if (error) {
  throw new Error(`Environment validation error: ${error.details.map((detail) => detail.message).join(", ")}`);
}

const corsAllowlist = env.CORS_ALLOWLIST.split(",")
  .map((item) => item.trim())
  .filter(Boolean);

export default {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  corsAllowlist,
  rateLimitWindowMs: env.RATE_LIMIT_WINDOW_MS,
  rateLimitMax: env.RATE_LIMIT_MAX,
  emailHost: env.EMAIL_HOST,
  emailPort: env.EMAIL_PORT,
  emailSecure: env.EMAIL_SECURE,
  emailUser: env.EMAIL_USER,
  emailPass: env.EMAIL_PASS,
  emailFrom: env.EMAIL_FROM,
  emailTo: env.EMAIL_TO,
  trustedProxies: env.RATE_LIMIT_TRUSTED_PROXIES,
  emailSendTimeoutMs: env.EMAIL_SEND_TIMEOUT_MS,
  emailMaxRetries: env.EMAIL_MAX_RETRIES,
  isProduction: env.NODE_ENV === "production",
};
