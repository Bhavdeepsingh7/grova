import { sendConsultationEmail } from "../services/email.js";

export const submitConsultation = async (req, res) => {
    try {
        console.log("[Consultation] headers:", req.headers);
        console.log("[Consultation] body:", req.body);

        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            console.error("[Consultation] request body is missing or empty");
            return res.status(400).json({
                success: false,
                message: "Request body is missing or invalid"
            });
        }

        await sendConsultationEmail(data);

        res.status(200).json({
            success: true,
            message: "Consultation request submitted successfully"
        });
    } catch (err) {
        console.error("[Consultation] error:", err.stack || err);
        console.error("[Consultation] error message:", err.message);

        res.status(500).json({
            success: false,
            message: err.message || "An error occurred while submitting the consultation request"
        });
    }
};