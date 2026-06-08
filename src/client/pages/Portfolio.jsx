import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import PremiumCard from "../components/PremiumCard.jsx";
import ButtonLink from "../components/ButtonLink.jsx";
import {
  certifications,
  achievements,
  education,
  experience,
  focusAreas,
  interests,
  languages,
  leadershipHighlights,
  projects,
  skills,
  socialLinks,
} from "../data/portfolio.js";

const initialForm = {
  fullName: "",
  email: "",
  reason: "",
  message: "",
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal>
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </Reveal>
  );
}

export default function Portfolio() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [invalid, setInvalid] = useState({});
  const [isProjectFolderOpen, setIsProjectFolderOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCertificateFolderOpen, setIsCertificateFolderOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setInvalid((current) => ({ ...current, [name]: false }));
  };

  const submitContact = async (event) => {
    event.preventDefault();
    const payload = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      reason: form.reason.trim(),
      message: form.message.trim(),
    };
    const nextInvalid = {
      fullName: !payload.fullName,
      email: !payload.email || !isValidEmail(payload.email),
      reason: !payload.reason,
      message: !payload.message,
    };

    setInvalid(nextInvalid);

    if (Object.values(nextInvalid).some(Boolean)) {
      setStatus({ type: "error", message: "Please complete all fields with a valid email." });
      return;
    }

    setIsSending(true);
    setStatus({ type: "", message: "Sending message..." });

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message.");
      }

      setForm(initialForm);
      setStatus({ type: "success", message: "Message sent successfully" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Page className="single-page">
      <section className="hero-page" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              Hello, my name is
            </motion.p>
            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              IRFAN S
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
            >
              I am a Software Engineer focused on full-stack development, QA automation,
              clean interfaces, and dependable delivery.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
            >
              <ButtonLink href="/resume/Irfan_S_Resume.pdf" download>
                Download Resume
              </ButtonLink>
              <ButtonLink href="#projects" variant="secondary">
                View Projects
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Contact Me
              </ButtonLink>
            </motion.div>
            <motion.div className="social-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </motion.div>
          </div>
          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/assets/Irfan%20.png" alt="Irfan S in a professional workspace" />
          </motion.div>
        </div>
      </section>

      <section className="section section-experience" id="experience">
        <div className="container">
          <SectionHeading
            eyebrow="Working Experience"
            title="Professional timeline."
            subtitle="Practical experience across software engineering, QA automation, manual testing, internship workflows, and delivery collaboration."
          />
          <div className="reference-stack">
            {experience.map((item, index) => (
              <Reveal key={`${item.company}-${item.role}`} delay={index * 0.08}>
                <PremiumCard className="reference-row">
                  <span className="meta">{item.period}</span>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="company">{item.company}</p>
                  </div>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </PremiumCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="education">
        <div className="container">
          <SectionHeading eyebrow="Education Background" title="Academic foundation." />
          <div className="card-grid">
            {education.map((item, index) => (
              <Reveal key={item.school} delay={index * 0.08}>
                <PremiumCard>
                  <span className="meta">{item.period}</span>
                  <h3>{item.school}</h3>
                  <p>{item.course}</p>
                  <strong>{item.score}</strong>
                </PremiumCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="achievements">
        <div className="container">
          <SectionHeading
            eyebrow="Achievements"
            title="Competitive achievements and leadership."
            subtitle="A balanced record of sports excellence, ownership, team coordination, and active campus contribution."
          />
          <div className="achievement-grid">
            {achievements.map((item, index) => (
              <Reveal key={`${item.title}-${item.year}`} delay={index * 0.08}>
                <motion.article
                  className={`achievement-card ${item.tone}`}
                  whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="achievement-medal">{item.title.split(" ")[0]}</span>
                  <span className="meta">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.event}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <div className="leadership-panel">
              {leadershipHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="container">
          <SectionHeading
            eyebrow="Skills"
            title="Technical skills."
            subtitle="A practical skillset across development, automation, testing, databases, tools, and AI-assisted workflows."
          />
          <div className="skill-category-grid">
            {skills.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.045}>
                <PremiumCard className="skill-category-card">
                  <h3>{group.title}</h3>
                  <div className="skill-pill-list">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </PremiumCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <SectionHeading
            eyebrow="About"
            title="Professional summary with a practical engineering mindset."
            subtitle="Information Science graduate with hands-on experience in full-stack development, software testing, automation, and AI-assisted workflows."
          />
          <div className="about-card-grid">
            <Reveal>
              <PremiumCard>
                <h3>Core Focus Areas</h3>
                <ul className="pill-list">
                  {focusAreas.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </PremiumCard>
            </Reveal>
            <Reveal delay={0.08}>
              <PremiumCard>
                <h3>Career Overview</h3>
                <p>
                  I enjoy building recruiter-friendly products with clean interfaces,
                  reliable APIs, thoughtful testing, and strong delivery habits.
                </p>
                <p>
                  My background blends development, QA automation, and analytics, helping
                  me think about software from both user and system quality angles.
                </p>
              </PremiumCard>
            </Reveal>
            <Reveal delay={0.14}>
              <PremiumCard className="know-more-card">
                <h3>Know More About Me</h3>
                <div>
                  <span className="meta">Languages</span>
                  <div className="language-list" aria-label="Languages known">
                    {languages.map((language) => (
                      <span key={language}>{language}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="meta">Hobbies</span>
                  <div className="interest-list" aria-label="Hobbies">
                    {interests.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </PremiumCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work with product thinking and engineering detail."
            subtitle="Open the project folder to browse selected work, then view each project with stack and links."
          />
          <Reveal>
            <button className="project-folder-card" type="button" onClick={() => setIsProjectFolderOpen(true)}>
              <span className="project-folder-icon" aria-hidden="true">
                <span />
              </span>
              <span className="project-folder-copy">
                <span className="meta">Project Folder</span>
                <strong>Selected Projects</strong>
                <span>Browse {projects.length} focused projects across full-stack development, QA automation, and analytics.</span>
              </span>
              <span className="project-folder-count">{projects.length} projects</span>
            </button>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {isProjectFolderOpen && (
          <motion.div
            className="certificate-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="certificate-modal-backdrop"
              type="button"
              aria-label="Close project folder"
              onClick={() => setIsProjectFolderOpen(false)}
            />
            <motion.article
              className="certificate-modal-panel project-folder-panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="certificate-close"
                type="button"
                aria-label="Close project folder"
                onClick={() => setIsProjectFolderOpen(false)}
              >
                x
              </button>
              <div className="certificate-folder-header">
                <span className="meta">Project Folder</span>
                <h3>Selected Projects</h3>
                <p>Select a project to open a clean preview with description, tech stack, and links.</p>
              </div>
              <div className="project-folder-grid">
                {projects.map((project, index) => (
                  <motion.button
                    className="project-folder-item"
                    type="button"
                    key={project.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, delay: index * 0.045 }}
                    onClick={() => {
                      setIsProjectFolderOpen(false);
                      setSelectedProject(project);
                    }}
                  >
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <strong>{project.title}</strong>
                    <span>{project.description}</span>
                  </motion.button>
                ))}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="certificate-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="certificate-modal-backdrop"
              type="button"
              aria-label="Close project preview"
              onClick={() => setSelectedProject(null)}
            />
            <motion.article
              className="certificate-modal-panel project-detail-panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="certificate-close"
                type="button"
                aria-label="Close project preview"
                onClick={() => setSelectedProject(null)}
              >
                x
              </button>
              <div className="project-detail-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className="project-detail-content">
                <span className="meta">Project Preview</span>
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                <div className="tag-row">
                  {selectedProject.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="card-actions">
                  <ButtonLink href={selectedProject.github} target="_blank" rel="noreferrer" variant="secondary">
                    GitHub
                  </ButtonLink>
                  {selectedProject.demo && (
                    <ButtonLink href={selectedProject.demo} target="_blank" rel="noreferrer" variant="secondary">
                      Live Demo
                    </ButtonLink>
                  )}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="section" id="certifications">
        <div className="container">
          <SectionHeading
            eyebrow="Certifications"
            title="Validated learning across development, data, AI, and cloud."
            subtitle="Open the certificate folder to browse verified credentials, then select any certificate for a full preview."
          />
          <Reveal>
            <button
              className="certificate-folder-card"
              type="button"
              onClick={() => setIsCertificateFolderOpen(true)}
            >
              <span className="certificate-folder-icon" aria-hidden="true">
                <span />
              </span>
              <span className="certificate-folder-copy">
                <span className="meta">Certificate Folder</span>
                <strong>All Certificates</strong>
                <span>Browse {certifications.length} professional certificates with local image previews and details.</span>
              </span>
              <span className="certificate-folder-count">{certifications.length} certificates</span>
            </button>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {isCertificateFolderOpen && (
          <motion.div
            className="certificate-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="certificate-modal-backdrop"
              type="button"
              aria-label="Close certificate folder"
              onClick={() => setIsCertificateFolderOpen(false)}
            />
            <motion.article
              className="certificate-modal-panel certificate-folder-panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="certificate-close"
                type="button"
                aria-label="Close certificate folder"
                onClick={() => setIsCertificateFolderOpen(false)}
              >
                x
              </button>
              <div className="certificate-folder-header">
                <span className="meta">Certificate Folder</span>
                <h3>All Certificates</h3>
                <p>Select a certificate to open its full image and credential details.</p>
              </div>
              <div className="certificate-folder-grid">
                {certifications.map((cert, index) => (
                  <motion.button
                    className="certificate-folder-item"
                    type="button"
                    key={cert.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, delay: index * 0.035 }}
                    onClick={() => {
                      setIsCertificateFolderOpen(false);
                      setSelectedCertificate(cert);
                    }}
                  >
                    <img src={cert.image} alt={`${cert.title} certificate preview`} loading="lazy" />
                    <span className="meta">{cert.category}</span>
                    <strong>{cert.title}</strong>
                    <span>{cert.issuer}</span>
                  </motion.button>
                ))}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="certificate-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="certificate-modal-backdrop"
              type="button"
              aria-label="Close certificate preview"
              onClick={() => setSelectedCertificate(null)}
            />
            <motion.article
              className="certificate-modal-panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="certificate-close"
                type="button"
                aria-label="Close certificate preview"
                onClick={() => setSelectedCertificate(null)}
              >
                x
              </button>
              <div className="certificate-image-frame">
                <img src={selectedCertificate.image} alt={`${selectedCertificate.title} certificate`} />
              </div>
              <div className="certificate-details">
                <span className="meta">{selectedCertificate.category}</span>
                <h3>{selectedCertificate.title}</h3>
                <dl>
                  <div>
                    <dt>Organization</dt>
                    <dd>{selectedCertificate.organization}</dd>
                  </div>
                  <div>
                    <dt>Issuer</dt>
                    <dd>{selectedCertificate.issuer}</dd>
                  </div>
                  <div>
                    <dt>Completion Date</dt>
                    <dd>{selectedCertificate.completionDate}</dd>
                  </div>
                  {selectedCertificate.duration && (
                    <div>
                      <dt>Duration</dt>
                      <dd>{selectedCertificate.duration}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Credential Type</dt>
                    <dd>{selectedCertificate.credentialType}</dd>
                  </div>
                </dl>
                <p>{selectedCertificate.description}</p>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="section" id="contact">
        <div className="container">
          <SectionHeading
            eyebrow="Contact"
            title="Have an opportunity, collaboration, or project in mind?"
            subtitle="Send a focused message and it will arrive directly in my inbox."
          />
          <div className="contact-layout">
            <Reveal>
              <PremiumCard className="contact-info">
                <h3>Direct Contact</h3>
                <p className="contact-location">Bengaluru, Karnataka, India</p>
                <a href="mailto:irfaninnu663@gmail.com">irfaninnu663@gmail.com</a>
                <a href="tel:+919632761938">+91 96327 61938</a>
                <a href="https://github.com/irfaninnu" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/irfan-s-7a6944287/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </PremiumCard>
            </Reveal>
            <Reveal delay={0.08}>
              <form className="contact-form premium-card" onSubmit={submitContact} noValidate>
                <div className="form-grid">
                  <label className={invalid.fullName ? "is-invalid" : ""}>
                    <span>Full Name</span>
                    <input name="fullName" value={form.fullName} onChange={updateForm} placeholder="Enter your full name" />
                  </label>
                  <label className={invalid.email ? "is-invalid" : ""}>
                    <span>Email Address</span>
                    <input name="email" value={form.email} onChange={updateForm} placeholder="name@example.com" />
                  </label>
                </div>
                <label className={invalid.reason ? "is-invalid" : ""}>
                  <span>Reason for Contact</span>
                  <select name="reason" value={form.reason} onChange={updateForm}>
                    <option value="">Select a reason</option>
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Freelance Project">Freelance Project</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Networking">Networking</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </label>
                <label className={invalid.message ? "is-invalid" : ""}>
                  <span>Message</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={updateForm}
                    rows="6"
                    placeholder="Tell me about the role, project, or idea..."
                    required
                  />
                </label>
                <p className={`form-status ${status.type}`} aria-live="polite">
                  {status.message}
                </p>
                <button className="btn btn-primary" type="submit" disabled={isSending}>
                  {isSending && <span className="btn-spinner" aria-hidden="true" />}
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </Page>
  );
}
