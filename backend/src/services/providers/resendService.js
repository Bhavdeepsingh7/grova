import { Resend } from "resend";
import env from "../../config/env.js";

const resend = new Resend(env.resendApiKey);

export const sendEmail = async (payload) => {
  try {
    const response = await resend.emails.send({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });

    console.log("✅ Resend response:", response);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response;
  } catch (err) {
    console.error("❌ Resend Error:", err);
    throw err;
  }
};

export default { sendEmail };