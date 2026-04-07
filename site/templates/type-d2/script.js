// ===================================
// C-Limber Style Website JavaScript
// ===================================

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");

  // Animate menu toggle icon
  const spans = menuToggle.querySelectorAll("span");
  if (nav.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translateY(10px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translateY(-10px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      nav.classList.remove("active");
      const spans = menuToggle.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
});

// Header scroll effect
const header = document.getElementById("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with scroll-reveal class
const revealElements = document.querySelectorAll(".scroll-reveal");
revealElements.forEach((el) => observer.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Skip if href is just "#"
    if (href === "#") {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Add dynamic count-up animation for stats
const animateCount = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const updateCount = () => {
    current += increment;
    if (current < target) {
      element.textContent =
        Math.floor(current) + (element.dataset.suffix || "");
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = target + (element.dataset.suffix || "");
    }
  };

  updateCount();
};

// Observe stat numbers for count animation
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        if (statNumber && !statNumber.classList.contains("counted")) {
          const text = statNumber.textContent;
          const number = parseInt(text.replace(/\D/g, ""));
          const suffix = text.replace(/[0-9]/g, "");

          statNumber.dataset.suffix = suffix;
          statNumber.classList.add("counted");

          animateCount(statNumber, number);
        }
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const statItems = document.querySelectorAll(".stat-item");
statItems.forEach((item) => statObserver.observe(item));

// Add parallax effect to red circles
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const circles = document.querySelectorAll(".red-circle");

  circles.forEach((circle, index) => {
    const speed = (index + 1) * 0.5;
    circle.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Log page load
console.log("IIJ Engineering Recruiting Site - Loaded");
