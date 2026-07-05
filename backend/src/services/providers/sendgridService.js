import sgMail from "@sendgrid/mail";
import env from "../../config/env.js";

sgMail.setApiKey(env.sendgridApiKey);

const sendEmail = async (payload) => {
  await sgMail.send({
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  });
};

export default { sendEmail };
