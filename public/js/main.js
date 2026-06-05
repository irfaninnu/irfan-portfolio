const roles = [
  "Full Stack Developer",
  "Software Testing Engineer",
  "AI & Data Enthusiast",
];

const typingText = document.getElementById("typingText");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");

let roleIndex = 0;
let charIndex = 0;
let removing = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  const displayText = removing
    ? currentRole.slice(0, charIndex - 1)
    : currentRole.slice(0, charIndex + 1);

  typingText.textContent = displayText;

  if (!removing && charIndex < currentRole.length) {
    charIndex += 1;
    setTimeout(typeRole, 90);
    return;
  }

  if (!removing) {
    removing = true;
    setTimeout(typeRole, 1200);
    return;
  }

  if (removing && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeRole, 40);
    return;
  }

  removing = false;
  roleIndex = (roleIndex + 1) % roles.length;
  setTimeout(typeRole, 300);
}

typeRole();

function toggleMobileMenu() {
  navMenu.classList.toggle("active");
  mobileNavOverlay.classList.toggle("active");
  navToggle.classList.toggle("active");
}

navToggle.addEventListener("click", toggleMobileMenu);
mobileNavOverlay.addEventListener("click", toggleMobileMenu);

navMenu.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileNavOverlay.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const revealElements = document.querySelectorAll("[data-reveal]");
const themeToggle = document.getElementById("themeToggle");
const bgPicker = document.getElementById("bgPicker");

function setTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("theme-light");
    themeToggle.innerHTML = "&#9728;";
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
  } else {
    document.body.classList.remove("theme-light");
    themeToggle.innerHTML = "&#9790;";
    themeToggle.setAttribute("aria-label", "Switch to light theme");
  }
  localStorage.setItem("portfolioTheme", theme);
}

function setBackground(background) {
  document.body.classList.remove("bg-default", "bg-mist", "bg-aurora", "bg-twilight");
  document.body.classList.add(`bg-${background}`);
  localStorage.setItem("portfolioBackground", background);
  bgPicker.querySelectorAll(".bg-swatch").forEach((button) => {
    button.classList.toggle("active", button.dataset.bg === background);
  });
}

if (themeToggle && bgPicker) {
  const savedTheme = localStorage.getItem("portfolioTheme") || "dark";
  const savedBackground = localStorage.getItem("portfolioBackground") || "default";
  setTheme(savedTheme);
  setBackground(savedBackground);

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-light") ? "dark" : "light";
    setTheme(nextTheme);
  });

  bgPicker.querySelectorAll(".bg-swatch").forEach((button) => {
    button.addEventListener("click", () => {
      setBackground(button.dataset.bg);
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".contact-card").forEach((card) => {
  const link = card.querySelector("a[href]");

  if (!link) {
    return;
  }

  card.setAttribute("role", "link");
  card.setAttribute("tabindex", "0");

  function openCardLink() {
    if (link.target === "_blank") {
      window.open(link.href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = link.href;
  }

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }

    openCardLink();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openCardLink();
  });
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
