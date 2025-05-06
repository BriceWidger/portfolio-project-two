document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".timeline ul li a");
  const progressBars = document.querySelectorAll(".progress-bar");
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  sections.forEach((section) => {
    if (section.id !== "introduction") section.classList.add("hidden");
  });

  themeToggle.addEventListener("change", () => {
    const isDarkMode = themeToggle.checked;
    document.body.classList.toggle("dark-mode", isDarkMode);
    themeLabel.textContent = isDarkMode ? "Dark Mode" : "Light Mode";
  });

  const handleScroll = () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        section.id !== "introduction" &&
        window.scrollY + window.innerHeight >= sectionTop + sectionHeight / 4
      ) {
        section.classList.add("visible");
      }

      if (window.scrollY >= sectionTop - 60) {
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
      if (bar.getBoundingClientRect().top < window.innerHeight - 50) {
        bar.style.width = bar.getAttribute("data-progress") + "%";
      }
    });

    // Fade out the scroll indicator as the user scrolls down
    if (window.scrollY > 50) {
      scrollIndicator.classList.add("hidden");
    } else {
      scrollIndicator.classList.remove("hidden");
    }
  };

  window.addEventListener("scroll", handleScroll);

  // Add back-to-top button functionality
  const backToTopButton = document.createElement("button");
  backToTopButton.classList.add("back-to-top");
  backToTopButton.innerHTML = "&#8679;"; // Up arrow symbol

  document.body.appendChild(backToTopButton);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Ensure the back-to-top button remains functional
  // No changes needed here as the functionality is already implemented.
});
