import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const { EMAIL, EMAIL_PASSWORD } = process.env;

if (!EMAIL || !EMAIL_PASSWORD) {
    throw new Error("Missing EMAIL or EMAIL_PASSWORD environment variables");
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

export default transporter;