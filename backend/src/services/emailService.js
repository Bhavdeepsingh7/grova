import env from "../config/env.js";
import logger from "../config/logger.js";
import providerService from "./providers/providerFactory.js";

const createEmailPayload = (data) => {
  const plainText = [
    `Name: ${data.name || "N/A"}`,
    `Email: ${data.email || "N/A"}`,
    `Phone: ${data.phone || "N/A"}`,
    `Company: ${data.company || "N/A"}`,
    `Service: ${Array.isArray(data.service) ? data.service.join(", ") : data.service || "N/A"}`,
    `Budget: ${data.budget || "N/A"}`,
    `Timeline: ${data.timeline || "N/A"}`,
    `Message: ${data.message || "N/A"}`,
  ].join("\n");

  const html = `
    <h1>New Consultation Request</h1>
    <p><strong>Name:</strong> ${data.name || "N/A"}</p>
    <p><strong>Email:</strong> ${data.email || "N/A"}</p>
    <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
    <p><strong>Company:</strong> ${data.company || "N/A"}</p>
    <p><strong>Service:</strong> ${Array.isArray(data.service) ? data.service.join(", ") : data.service || "N/A"}</p>
    <p><strong>Budget:</strong> ${data.budget || "N/A"}</p>
    <p><strong>Timeline:</strong> ${data.timeline || "N/A"}</p>
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

  while (attempt <= env.emailMaxRetries) {
    try {
      await providerService.sendEmail(payload);
      return;
    } catch (error) {
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
  logger.info({ provider: env.emailProvider, recipient: env.emailTo }, "Sending consultation email");
  await sendWithRetry(payload);
};

export default { sendConsultationEmail };
