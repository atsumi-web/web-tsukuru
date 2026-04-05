document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initHeaderScroll();
});

// Intersection Observer for Reveal Animations
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .clip-reveal');
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -15% 0px', // Trigger when element is 15% from the bottom
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observerInstance.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

// Header behavior on scroll
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
}
