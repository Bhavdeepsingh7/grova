import dns from "node:dns";
import nodemailer from "nodemailer";
import env from "./env.js";

dns.setDefaultResultOrder("ipv4first");

const transportOptions = {
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
  host: env.emailHost,
  port: env.emailPort,
  secure: env.emailSecure,
  family: 4,
  connectionTimeout: env.emailSendTimeoutMs,
};

const transporter = nodemailer.createTransport(transportOptions);

export default transporter;
