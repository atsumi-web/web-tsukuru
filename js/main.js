document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // ---------------------------------------------------------
    // Mobile Menu Toggle
    // ---------------------------------------------------------
    const hamburger = document.querySelector('.hamburger-btn');
    const nav = document.querySelector('.site-nav');
    const body = document.body;

    // Check if elements exist
    if (hamburger && nav) {
        console.log('Hamburger and Nav elements found');
        
        hamburger.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior
            console.log('Hamburger clicked');
            
            // Toggle classes
            hamburger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
            body.classList.toggle('no-scroll');
            
            // Update aria attribute
            const isExpanded = hamburger.classList.contains('is-active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when a link is clicked
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked');
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-active');
                body.classList.remove('no-scroll');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    } else {
        console.error('Hamburger or Nav element not found');
    }

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
});
