document.addEventListener("DOMContentLoaded", function () {
  // ---------------------------------------------------------
  // Mobile Menu Toggle
  // ---------------------------------------------------------
  const hamburger = document.querySelector(".hamburger-btn");
  const nav = document.querySelector(".site-nav");
  const body = document.body;

  // Check if elements exist
  if (hamburger && nav) {
    hamburger.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default button behavior

      const header = document.querySelector(".site-header");

      // Toggle classes
      hamburger.classList.toggle("is-active");
      nav.classList.toggle("is-active");
      body.classList.toggle("no-scroll");
      if (header) header.classList.toggle("is-menu-open");

      // Update aria attribute
      const isExpanded = hamburger.classList.contains("is-active");
      hamburger.setAttribute("aria-expanded", isExpanded);
    });

    // Close menu when a link is clicked
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const header = document.querySelector(".site-header");
        hamburger.classList.remove("is-active");
        nav.classList.remove("is-active");
        body.classList.remove("no-scroll");
        if (header) header.classList.remove("is-menu-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------------------------------------------------------
  // Scroll Animation (Intersection Observer)
  // ---------------------------------------------------------
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Run once
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".js-fade-up, .js-fade-in");
  fadeElements.forEach((el) => observer.observe(el));

  // ---------------------------------------------------------
  // Fixed CTA Button - Show on Scroll
  // ---------------------------------------------------------
  const fixedCta = document.querySelector(".fixed-line-btn");

  if (fixedCta) {
    let scrollThreshold = 200; // Show after 200px scroll

    function toggleFixedCta() {
      if (window.scrollY > scrollThreshold) {
        fixedCta.classList.add("show");
      } else {
        fixedCta.classList.remove("show");
      }
    }

    // Check on scroll
    window.addEventListener("scroll", toggleFixedCta);

    // Check on page load
    toggleFixedCta();
  }

  // ---------------------------------------------------------
  // Back to Top Button
  // ---------------------------------------------------------
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    // Show/Hide on scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    });

    // Scroll to top on click
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
