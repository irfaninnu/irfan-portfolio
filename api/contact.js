const nodemailer = require("nodemailer");

const CONTACT_EMAIL = "irfaninnu663@gmail.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  const body = req.body || {};
  const fullName = String(body.fullName || "").trim();
  const email = String(body.email || "").trim();
  const reason = String(body.reason || "").trim();
  const message = String(body.message || "").trim();

  if (!fullName || !email || !reason || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({
      success: false,
      message: "Email service is not configured.",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: CONTACT_EMAIL,
      subject: "New Portfolio Contact Message",
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Reason: ${reason}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact form email failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};
