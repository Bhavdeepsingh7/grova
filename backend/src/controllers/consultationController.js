import emailService from "../services/emailService.js";

export const submitConsultation = async (req, res, next) => {
  try {
    await emailService.sendConsultationEmail(req.body);

    res.status(200).json({
      success: true,
      message: "Consultation request submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};