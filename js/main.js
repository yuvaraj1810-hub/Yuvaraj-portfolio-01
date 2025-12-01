// Main entry: navigation, smooth scroll, typed text, particles, and vanilla-tilt

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTypedSkills();
  initParticlesBackground();
  initTiltCards();
});

function initNav() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("is-open");
    navLinks.classList.toggle("is-open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      navToggle.classList.remove("is-open");
      navLinks.classList.remove("is-open");
    }
  });
}

function initTypedSkills() {
  const el = document.getElementById("typedSkills");
  if (!el) return;

  const skills = [
    "HTML · CSS · JavaScript · PHP · MySQL · Python",
    "Responsive Web Design · UI / UX",
    "Full-Stack Web Development",
  ];

  let idx = 0;
  let charIndex = 0;
  let deleting = false;

  const typeSpeed = 65;
  const deleteSpeed = 35;
  const pauseBetween = 1400;

  function tick() {
    const current = skills[idx];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pauseBetween);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        idx = (idx + 1) % skills.length;
      }
    }

    setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
  }

  tick();
}

function initParticlesBackground() {
  if (typeof particlesJS === "undefined") return;
  const containerId = "heroParticles";
  const el = document.getElementById(containerId);
  if (!el) return;

  particlesJS(containerId, {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: ["#64ffda", "#8b5cf6", "#38bdf8"] },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#0f172a",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.4,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: false },
        resize: true,
      },
      modes: {
        grab: { distance: 160, line_linked: { opacity: 0.6 } },
      },
    },
    retina_detect: true,
  });
}

function initTiltCards() {
  if (typeof VanillaTilt === "undefined") return;
  const tiltElements = document.querySelectorAll("[data-tilt]");
  if (!tiltElements.length) return;

  VanillaTilt.init(tiltElements, {
    max: 12,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
    perspective: 900,
    scale: 1.03,
  });
}


