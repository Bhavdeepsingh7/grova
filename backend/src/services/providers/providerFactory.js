import env from "../../config/env.js";
import resendService from "./resendService.js";
import brevoService from "./brevoService.js";
import sendgridService from "./sendgridService.js";

const providers = {
  resend: resendService,
  brevo: brevoService,
  sendgrid: sendgridService,
};

const providerService = providers[env.emailProvider];

if (!providerService) {
  throw new Error(`Unsupported email provider: ${env.emailProvider}`);
}

export default providerService;
