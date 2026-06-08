import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Home", to: "#home" },
  { label: "About", to: "#about" },
  { label: "Skills", to: "#skills" },
  { label: "Experience", to: "#experience" },
  { label: "Awards", to: "#achievements" },
  { label: "Projects", to: "#projects" },
  { label: "Certifications", to: "#certifications" },
  { label: "Contact", to: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateActive = () => {
      let current = "#home";
      const currentScrollY = window.scrollY;

      navItems.forEach((item) => {
        const section = document.querySelector(item.to);

        if (section && currentScrollY >= section.offsetTop - 160) {
          current = item.to;
        }
      });

      setActive(current);

      if (isOpen) {
        setIsHidden(false);
        lastScrollY = currentScrollY;
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollY + 8;
      const isScrollingUp = currentScrollY < lastScrollY - 8;

      if (currentScrollY < 120 || isScrollingUp) {
        setIsHidden(false);
      } else if (isScrollingDown) {
        setIsHidden(true);
      }

      lastScrollY = currentScrollY;
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const goTo = (target) => {
    close();
    const section = document.querySelector(target);

    if (!section) {
      return;
    }

    const top = section.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header className={`navbar-wrap${isHidden ? " navbar-hidden" : ""}`}>
      <nav className="navbar" aria-label="Primary navigation">
        <button className="nav-logo logo-button" type="button" onClick={() => goTo("#home")}>
          IRFAN S<span>.</span>
        </button>

        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.to}
              className={`nav-link${active === item.to ? " active" : ""}`}
              type="button"
              onClick={() => goTo(item.to)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className={`nav-toggle${isOpen ? " active" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              className="mobile-backdrop"
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.aside
              className="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + index * 0.045 }}
                >
                  <button
                    className={`mobile-link${active === item.to ? " active" : ""}`}
                    type="button"
                    onClick={() => goTo(item.to)}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
