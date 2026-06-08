/**
 * Irfan Portfolio - Express Server
 * Premium, fast-loading portfolio website
 */

const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const nodemailer = require("nodemailer");

require("dotenv").config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;
const CONTACT_EMAIL = "irfaninnu663@gmail.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Security headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
      },
    },
  }),
);

// Compression middleware for fast loading
app.use(compression());

// Static files middleware
app.use(
  "/css",
  express.static(path.join(__dirname, "../public/css"), {
    maxAge: "1y",
    etag: true,
  }),
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../public/js"), {
    maxAge: "1y",
    etag: true,
  }),
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../public/assets"), {
    maxAge: "1y",
    etag: true,
  }),
);
app.use(
  "/resume",
  express.static(path.join(__dirname, "../public/resume"), {
    maxAge: "1d",
    etag: false,
  }),
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

// Cache control middleware for performance
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=3600");
  next();
});

// Main route - Portfolio page
app.get("/", (req, res) => {
  res.render("index", {
    title: "IRFAN S | Full Stack Developer & QA Automation Engineer",
    description:
      "Professional portfolio of IRFAN S - Full Stack Developer, Software Testing Engineer, and Data Analytics Enthusiast based in Bangalore, India.",
  });
});

app.post("/contact", async (req, res) => {
  const fullName = String(req.body.fullName || "").trim();
  const email = String(req.body.email || "").trim();
  const reason = String(req.body.reason || "").trim();
  const message = String(req.body.message || "").trim();

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
      from: `"Irfan Portfolio" <${process.env.EMAIL_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
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
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("index", {
    title: "Page Not Found | Irfan Portfolio",
    description:
      "The page you're looking for does not exist. Explore the portfolio for projects, skills, and contact information.",
  });
});

// Server start for local development. Vercel imports the exported app directly.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
