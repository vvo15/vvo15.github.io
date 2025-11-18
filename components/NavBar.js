export default function renderNavbar() {
  setYear();
  setupNavToggle();
}

function setYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function setupNavToggle() {
  const toggleButton = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");

  if (toggleButton && menu) {
    toggleButton.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }
}
