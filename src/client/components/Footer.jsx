import { socialLinks } from "../data/portfolio.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2>IRFAN S<span>.</span></h2>
          <p>
            Software Engineer focused on full-stack delivery, QA automation, and
            recruiter-friendly product experiences.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <h3>Connect</h3>
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} IRFAN S. All rights reserved.</span>
        <span>Built with React, Framer Motion, and subtle Three.js depth</span>
      </div>
    </footer>
  );
}
