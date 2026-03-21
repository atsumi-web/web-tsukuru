// ===================================
// C-Limber Style Website JavaScript
// ===================================

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 1200) {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// Header scroll effect
const header = document.getElementById("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
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

// ===================================
// Mobile Carousel Swipe Force (Manual Implementation)
// ===================================
// (Removed to rely on native CSS scroll for better performance)


// News Slider Logic
const initNewsSlider = () => {
  // Mobile: Disable JS slider (use CSS Scroll Snap instead)
  // Mobile: Enabled JS slider
  // if (window.innerWidth <= 768) return;

  const items = document.querySelectorAll(".info-item");
  if (items.length <= 1) return;

  let currentIndex = 0;
  let sliderInterval;

  const showNext = () => {
    const currentItem = items[currentIndex];

    // Set exit animation for current item
    currentItem.classList.remove("active");
    currentItem.classList.add("exit");

    // Update index
    currentIndex = (currentIndex + 1) % items.length;
    const nextItem = items[currentIndex];

    // Reset and show next item
    nextItem.classList.remove("exit");
    nextItem.classList.add("active");

    // Clean up exit class after animation
    setTimeout(() => {
      currentItem.classList.remove("exit");
    }, 2000);
  };

  const startAutoPlay = () => {
    sliderInterval = setInterval(showNext, 5000);
  };

  const resetAutoPlay = () => {
    clearInterval(sliderInterval);
    startAutoPlay();
  };

  // Auto-play
  startAutoPlay();

  // Manual Navigation (Listen on the container to include the arrow/pseudo-elements)
  const container = document.querySelector(".hero-info-box");
  if (container) {
    container.addEventListener("click", () => {
      showNext();
      resetAutoPlay();
    });
    container.style.cursor = "pointer";
  }
};

// Initialize All
document.addEventListener("DOMContentLoaded", () => {
  initNewsSlider();
  initMemberCarousel();
  initFAQ();
  console.log("ARC Construction Recruiting Site - Initialized");
});

// ===================================
// Member Carousel
// ===================================
function initMemberCarousel() {
  const track = document.getElementById("memberTrack");
  const prevBtn = document.getElementById("memberPrev");
  const nextBtn = document.getElementById("memberNext");
  if (!track || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.querySelectorAll(".member-card"));
  let currentIndex = 0;

  const getVisible = () => {
    if (window.innerWidth >= 1025) return 4;
    if (window.innerWidth >= 641) return 2;
    return 1;
  };

  const update = () => {
    const visible = getVisible();
    const maxIndex = Math.max(0, cards.length - visible);
    currentIndex = Math.min(currentIndex, maxIndex);
    const wrapperWidth = track.parentElement.offsetWidth;
    const gap = 24;
    const cardWidth = (wrapperWidth - gap * (visible - 1)) / visible;
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  };

  prevBtn.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    update();
    resetAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    const maxIndex = Math.max(0, cards.length - getVisible());
    currentIndex = Math.min(maxIndex, currentIndex + 1);
    update();
    resetAutoPlay();
  });

  // Auto-play
  let autoTimer;
  const startAutoPlay = () => {
    autoTimer = setInterval(() => {
      const maxIndex = Math.max(0, cards.length - getVisible());
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      update();
    }, 3500);
  };
  const resetAutoPlay = () => {
    clearInterval(autoTimer);
    startAutoPlay();
  };

  // Pause on hover
  const wrapper = track.closest(".member-carousel");
  if (wrapper) {
    wrapper.addEventListener("mouseenter", () => clearInterval(autoTimer));
    wrapper.addEventListener("mouseleave", startAutoPlay);
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(update, 100);
  });

  update();
  startAutoPlay();
}

// ===================================
// FAQ Accordion
// ===================================
function initFAQ() {
  const items = document.querySelectorAll(".faq__item");
  items.forEach((item) => {
    const btn = item.querySelector(".faq__question");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // Close all
      items.forEach((i) => i.classList.remove("open"));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add("open");
    });
  });
}


