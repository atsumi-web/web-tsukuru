document.addEventListener('DOMContentLoaded', function() {
    // ---------------------------------------------------------
    // Scroll Animation (Intersection Observer)
    // ---------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.js-fade-up, .js-fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // ---------------------------------------------------------
    // Hamburger Menu
    // ---------------------------------------------------------
    const hamburger = document.querySelector('.hamburger-btn');
    const nav = document.querySelector('.site-nav');
    const body = document.body;

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            const isActive = hamburger.classList.contains('is-active');
            
            if (isActive) {
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-active');
                body.classList.remove('no-scroll');
                hamburger.setAttribute('aria-expanded', 'false');
            } else {
                hamburger.classList.add('is-active');
                nav.classList.add('is-active');
                body.classList.add('no-scroll');
                hamburger.setAttribute('aria-expanded', 'true');
            }
        });

        // Close menu when a link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-active');
                body.classList.remove('no-scroll');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
