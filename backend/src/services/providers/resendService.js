import { Resend } from "resend";
import env from "../../config/env.js";

const client = new Resend({ apiKey: env.resendApiKey, timeout: env.emailSendTimeoutMs });

const sendEmail = async (payload) => {
  await client.emails.send({
    from: payload.from,
    to: [payload.to],
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  });
};

export default { sendEmail };
