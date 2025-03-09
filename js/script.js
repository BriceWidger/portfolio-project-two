document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".timeline ul li a");
  const progressBars = document.querySelectorAll(".progress-bar");
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");

  themeToggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode", themeToggle.checked);
    themeLabel.textContent = themeToggle.checked ? "Dark Mode" : "Light Mode";
  });

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });

    progressBars.forEach((bar) => {
      const barTop = bar.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (barTop < windowHeight - 50) {
        bar.style.width = bar.getAttribute("data-progress") + "%";
      }
    });
  });
});
