document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio script loaded successfully.");
  // Added a console log for debugging and confirmation

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".timeline ul li a");
  const progressBars = document.querySelectorAll(".progress-bar");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  sections.forEach((section) => {
    if (section.id !== "introduction") section.classList.add("hidden");
  });

  const handleScroll = () => {
    let current = "";

    // If at the very top, set current to introduction
    if (window.scrollY === 0) {
      current = "introduction";
    } else {
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
    }

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

  // Ensure scroll indicator is hidden when sections are fully visible
  const checkScrollIndicator = () => {
    const allVisible = Array.from(sections).every((section) =>
      section.classList.contains("visible")
    );
    if (allVisible) {
      scrollIndicator.classList.add("hidden");
    }
  };

  // Add functionality for back-to-top button
  const backToTopButton = document.createElement("button");
  backToTopButton.classList.add("back-to-top");
  backToTopButton.innerHTML = "↑";
  document.body.appendChild(backToTopButton);

  window.addEventListener("scroll", () => {
    handleScroll();
    checkScrollIndicator();

    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Ensure nav link is active on initial page load
  handleScroll();
});
