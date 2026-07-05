import env from "../config/env.js";
import logger from "../config/logger.js";
import transporter from "../config/transporter.js";

const createEmailPayload = (data) => {
  const plainText = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Company: ${data.company || "N/A"}`,
    `Service: ${data.service}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    `Message: ${data.message || "N/A"}`,
  ].join("\n");

  const html = `
    <h1>New Consultation Request</h1>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Company:</strong> ${data.company || "N/A"}</p>
    <p><strong>Service:</strong> ${data.service}</p>
    <p><strong>Budget:</strong> ${data.budget}</p>
    <p><strong>Timeline:</strong> ${data.timeline}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message || "N/A"}</p>
  `;

  return {
    from: env.emailFrom,
    to: env.emailTo,
    subject: "New Consultation Request",
    html,
    text: plainText,
  };
};

const sendWithRetry = async (payload) => {
  let attempt = 0;
  let lastError;

  while (attempt <= env.emailMaxRetries) {
    try {
      await transporter.sendMail(payload);
      return;
    } catch (error) {
      lastError = error;
      attempt += 1;
      logger.warn({ attempt, error: error.message }, "Email send attempt failed");

      if (attempt > env.emailMaxRetries) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
    }
  }
};

const sendConsultationEmail = async (data) => {
  const payload = createEmailPayload(data);
  logger.info({ recipient: env.emailTo }, "Sending consultation email");
  await sendWithRetry(payload);
};

export default { sendConsultationEmail };
