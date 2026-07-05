import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const { EMAIL, EMAIL_PASSWORD } = process.env;

if (!EMAIL || !EMAIL_PASSWORD) {
    throw new Error("Missing EMAIL or EMAIL_PASSWORD environment variables");
}


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,          // Force IPv4
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

export default transporter;
