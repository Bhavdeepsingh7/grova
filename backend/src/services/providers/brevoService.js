import axios from "axios";
import env from "../../config/env.js";

const sendEmail = async (payload) => {
  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: { email: payload.from },
      to: [{ email: payload.to }],
      subject: payload.subject,
      htmlContent: payload.html,
      textContent: payload.text,
    },
    {
      headers: {
        "api-key": env.brevoApiKey,
        "Content-Type": "application/json",
      },
      timeout: env.emailSendTimeoutMs,
    },
  );
};

export default { sendEmail };
