/* ==========================================
   Type-G Construction Recruitment LP
   JavaScript (Interactions & Animations)
   ========================================== */

// ===== DOM Elements =====
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const stickyLineCta = document.getElementById('stickyLineCta');
const scrollToTopBtn = document.getElementById('scrollToTop');

// ===== Header Scroll Effect =====
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add/Remove 'scrolled' class for header shadow
  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
});

// ===== Mobile Menu Toggle =====
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
  document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== Sticky LINE CTA =====
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 600) {
    stickyLineCta.classList.add('visible');
  } else {
    stickyLineCta.classList.remove('visible');
  }
});

// ===== Scroll to Top Button =====
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 500) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Scroll Reveal Animation (IntersectionObserver) =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // Stop observing once visible
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all elements with .scroll-reveal class
const revealElements = document.querySelectorAll('.scroll-reveal');
revealElements.forEach(el => {
  observer.observe(el);
});

// ===== Video Auto-Play Fix (Safari/iOS) =====
const heroVideo = document.querySelector('.hero-video-background video');
if (heroVideo) {
  // Attempt to play video on load (some browsers require user interaction)
  heroVideo.play().catch(error => {
    console.log('Video autoplay prevented:', error);
  });
  
  // Retry play on user interaction (for iOS/Safari)
  document.addEventListener('touchstart', () => {
    heroVideo.play().catch(error => {
      console.log('Video play failed:', error);
    });
  }, { once: true });
}

// ===== Console Log (Development Helper) =====
console.log('Type-G Construction LP Initialized');
console.log('Mobile Menu:', menuToggle ? '✓' : '✗');
console.log('Sticky LINE CTA:', stickyLineCta ? '✓' : '✗');
console.log('Scroll Reveal Elements:', revealElements.length);
