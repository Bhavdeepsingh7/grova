import dns from "node:dns";
import nodemailer from "nodemailer";
import env from "./env.js";

dns.setDefaultResultOrder("ipv4first");

const resolvedHost = await dns.promises
  .lookup(env.emailHost, { family: 4, all: false })
  .then((result) => result.address)
  .catch(() => env.emailHost);

const transportOptions = {
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
  host: resolvedHost,
  port: env.emailPort,
  secure: env.emailSecure,
  name: env.emailHost,
  servername: env.emailHost,
  connectionTimeout: env.emailSendTimeoutMs,
  socketTimeout: env.emailSendTimeoutMs,
  family: 4,
};

const transporter = nodemailer.createTransport(transportOptions);

export default transporter;
