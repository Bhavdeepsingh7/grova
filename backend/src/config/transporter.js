import dotenv from "dotenv";
import nodemailer from "nodemailer";
import dns from "node:dns";

dotenv.config();

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

export default transporter;
