// Scroll-triggered animations using GSAP + ScrollTrigger (if available) and fallback

document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  nudgeAboutOrbitOnMouseMove();
});

function initScrollAnimations() {
  const hasGSAP = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  const sections = document.querySelectorAll(
    "section.section, .project-card, .skill-card, .cert-card, .timeline-item"
  );

  sections.forEach((el) => {
    el.classList.add("reveal");
  });

  if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 32 },
        {
          duration: 0.8,
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    });

    // Extra bounce for cert cards
    gsap.utils.toArray(".cert-card").forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => card.classList.add("bounce-in"),
      });
    });
  } else {
    // Fallback: IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      sections.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    sections.forEach((el) => observer.observe(el));
  }
}

function nudgeAboutOrbitOnMouseMove() {
  const orbit = document.querySelector(".about-orbit");
  if (!orbit) return;
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    const rotateX = y * -4;
    const rotateY = x * 4;
    orbit.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
}


