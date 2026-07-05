import transporter from "../config/transporter.js";

export const sendConsultationEmail = async (data) => {
    if (!data) {
        throw new Error("Consultation email data is undefined");
    }

    console.log("[Email] sending consultation email with data:", data);

    const name = data.name || data.fullName || "";
    const email = data.email || "";
    const phone = data.phone || "";
    const company = data.company || "";
    const service = Array.isArray(data.service)
        ? data.service.join(", ")
        : data.service || data.serviceGrid || "";
    const budget = data.budget || data.budgetGrid || "";
    const timeline = data.timeline || data.contactTime || "";
    const message = data.message || "";

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "New Consultation Request",
        html: `
            <h2>New Consultation Request</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Company:</b> ${company}</p>
            <p><b>Service:</b> ${service}</p>
            <p><b>Budget:</b> ${budget}</p>
            <p><b>Timeline:</b> ${timeline}</p>
            <p><b>Message:</b></p>
            <p>${message}</p>
        `
    });
};