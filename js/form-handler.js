// Simple client-side contact form handler (no backend)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");

  if (!form || !statusEl) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.textContent = "";
    statusEl.classList.remove("form-status--success", "form-status--error");

    const formData = new FormData(form);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      statusEl.textContent = "Please fill in all fields.";
      statusEl.classList.add("form-status--error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      statusEl.textContent = "Please enter a valid email address.";
      statusEl.classList.add("form-status--error");
      return;
    }

    // Open user's email client with pre-filled email to you
    const subject = encodeURIComponent(`New message from ${name} (Portfolio)`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailto = `mailto:yuvaraj182848@gmail.com?subject=${subject}&body=${body}`;

    statusEl.textContent = "Opening your email app to send the message...";
    statusEl.classList.add("form-status--success");

    window.location.href = mailto;
  });
});


