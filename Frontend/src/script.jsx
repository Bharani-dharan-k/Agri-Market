document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    function revealSections() {
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top < window.innerHeight - 100) {
          section.classList.add("show");
        }
      });
    }
    window.addEventListener("scroll", revealSections);
    revealSections();
  });
  