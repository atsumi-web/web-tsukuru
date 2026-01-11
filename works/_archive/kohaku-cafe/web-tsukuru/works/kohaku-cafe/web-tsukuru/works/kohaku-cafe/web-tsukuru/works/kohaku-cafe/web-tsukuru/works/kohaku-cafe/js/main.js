document.addEventListener("DOMContentLoaded", () => {
  // Scroll Fade In
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Once visible, stop observing
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // Header Scroll Effect
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Menu Toggle
  const menuTrigger = document.querySelector(".menu-trigger");
  const navOverlay = document.querySelector(".nav-overlay");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuTrigger && navOverlay) {
    menuTrigger.addEventListener("click", () => {
      navOverlay.classList.toggle("active");
      // Change menu text
      if (navOverlay.classList.contains("active")) {
        menuTrigger.textContent = "CLOSE";
      } else {
        menuTrigger.textContent = "MENU";
      }
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navOverlay.classList.remove("active");
        menuTrigger.textContent = "MENU";
      });
    });
  }
});
