document.addEventListener("DOMContentLoaded", () => {
  const subscribeBtn = document.getElementById("subscribeBtn");
  const popupOverlay = document.getElementById("popup-overlay");
  const closePopup = document.getElementById("closePopup");
  const form = document.getElementById("subscribeForm");
  const error = document.getElementById("error");
  const colorBtn = document.getElementById("colorBtn");
  const datetime = document.getElementById("datetime");

  subscribeBtn.addEventListener("click", () => {
    popupOverlay.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    popupOverlay.style.display = "none";
    error.textContent = "";
  });

  popupOverlay.addEventListener("click", e => {
    if (e.target === popupOverlay) popupOverlay.style.display = "none";
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm").value.trim();

    if (!email.includes("@")) {
      error.textContent = "Invalid email address.";
      return;
    }
    if (password.length < 6) {
      error.textContent = "Password must be at least 6 characters.";
      return;
    }
    if (password !== confirm) {
      error.textContent = "Passwords do not match.";
      return;
    }

    error.style.color = "green";
    error.textContent = "Subscription successful!";
    setTimeout(() => popupOverlay.style.display = "none", 1000);
  });

  const colors = ["#f87171", "#60a5fa", "#34d399", "#facc15", "#a78bfa"];
  let index = 0;
  colorBtn.addEventListener("click", () => {
    document.body.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length;
  });

  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach(acc => {
    acc.addEventListener("click", () => {
      acc.classList.toggle("active");
      const panel = acc.nextElementSibling;
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
  });

  function updateDateTime() {
    const now = new Date();
    datetime.textContent = now.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short"
    });
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
});
