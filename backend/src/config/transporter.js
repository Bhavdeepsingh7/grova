import nodemailer from "nodemailer";
import env from "./env.js";

const transportOptions = {
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
  host: env.emailHost,
  port: env.emailPort,
  secure: env.emailSecure,
  connectionTimeout: env.emailSendTimeoutMs,
};

const transporter = nodemailer.createTransport(transportOptions);

export default transporter;
