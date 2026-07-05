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
  connectionTimeout: env.emailSendTimeoutMs,
  socketTimeout: env.emailSendTimeoutMs,
  family: 4,
  lookup(hostname, options, callback) {
    return dns.lookup(hostname, { family: 4, all: false }, callback);
  },
};

const transporter = nodemailer.createTransport(transportOptions);

export default transporter;
