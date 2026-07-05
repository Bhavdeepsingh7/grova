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
  EMAIL_PROVIDER: Joi.string().valid("resend", "brevo", "sendgrid").default("resend"),
  RESEND_API_KEY: Joi.when("EMAIL_PROVIDER", {
    is: "resend",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  BREVO_API_KEY: Joi.when("EMAIL_PROVIDER", {
    is: "brevo",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  SENDGRID_API_KEY: Joi.when("EMAIL_PROVIDER", {
    is: "sendgrid",
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
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
  emailProvider: env.EMAIL_PROVIDER,
  resendApiKey: env.RESEND_API_KEY,
  brevoApiKey: env.BREVO_API_KEY,
  sendgridApiKey: env.SENDGRID_API_KEY,
  emailFrom: env.EMAIL_FROM,
  emailTo: env.EMAIL_TO,
  trustedProxies: env.RATE_LIMIT_TRUSTED_PROXIES,
  emailSendTimeoutMs: env.EMAIL_SEND_TIMEOUT_MS,
  emailMaxRetries: env.EMAIL_MAX_RETRIES,
  isProduction: env.NODE_ENV === "production",
};
