document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".timeline ul li a");
  const progressBars = document.querySelectorAll(".progress-bar");
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");

  sections.forEach((section) => {
    if (section.id !== "introduction") section.classList.add("hidden");
  });

  themeToggle.addEventListener("change", () => {
    const isDarkMode = themeToggle.checked;
    document.body.classList.toggle("dark-mode", isDarkMode);
    themeLabel.textContent = isDarkMode ? "Dark Mode" : "Light Mode";
  });

  const debounce = (func, wait = 20) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleScroll = () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      if (
        section.id !== "introduction" &&
        window.scrollY >= sectionTop - window.innerHeight / 1.3
      ) {
        section.classList.add("visible");
      }

      if (window.scrollY >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current))
        link.classList.add("active");
    });

    progressBars.forEach((bar) => {
      if (bar.getBoundingClientRect().top < window.innerHeight - 50) {
        bar.style.width = bar.getAttribute("data-progress") + "%";
      }
    });
  };

  window.addEventListener("scroll", debounce(handleScroll));

  // Typewriter effect for introduction text
  const typewriterText = document.getElementById("typewriter");
  const text =
    "Hello! I'm Brice Widger, a passionate developer with a love for creating innovative solutions.";
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      typewriterText.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }

  typewriterText.textContent = ""; // Clear initial text
  typeWriter();
});
