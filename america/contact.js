document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "" || message === "") {
      showPopup("Please fill out all fields!", "red");
      return;
    }
    if (!emailPattern.test(email)) {
      showPopup("Please enter a valid email address!", "orange");
      return;
    }
    if (message.length < 10) {
      showPopup("Message must be at least 10 characters!", "yellow");
      return;
    }

    showPopup("Message sent successfully!", "lightgreen");
    form.reset();
  });

  const popupHTML = `
    <div id="popup-overlay" class="popup-overlay">
      <div class="popup">
        <span id="closePopup" class="close-btn">&times;</span>
        <p id="popupMessage"></p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const popupOverlay = document.getElementById("popup-overlay");
  const popupMessage = document.getElementById("popupMessage");
  const closePopup = document.getElementById("closePopup");

  function showPopup(message, color) {
    popupMessage.textContent = message;
    popupMessage.style.color = color;
    popupOverlay.style.display = "flex";
    setTimeout(() => (popupOverlay.style.display = "none"), 2000);
  }

  closePopup.addEventListener("click", () => (popupOverlay.style.display = "none"));
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) popupOverlay.style.display = "none";
  });

  const colorBtn = document.createElement("button");
  colorBtn.textContent = "Change Background Color";
  colorBtn.className = "btn btn-info m-3";
  document.body.appendChild(colorBtn);

  const colors = ["#0127fe", "#198754", "#6f42c1", "#dc3545", "#ffc107", "#222"];
  colorBtn.addEventListener("click", () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  });

  const dateDiv = document.createElement("div");
  dateDiv.style.color = "white";
  dateDiv.style.textAlign = "center";
  dateDiv.style.marginTop = "20px";
  document.body.appendChild(dateDiv);

  function updateTime() {
    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    dateDiv.textContent = `Current date and time: ${formatted}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
});
