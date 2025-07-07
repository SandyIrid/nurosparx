// script.js - NEUROSPARKS REDESIGN V4

document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdown = document.querySelector('.dropdown');
    const contactForm = document.getElementById('contact-form');

    /**
     * Handles the mobile navigation menu toggle.
     */
    const handleMobileNav = () => {
        if (!navToggle || !navLinks) return;

        navToggle.addEventListener('click', () => {
            const isMenuOpen = navLinks.classList.toggle('active');
            navToggle.classList.toggle('active', isMenuOpen);
            document.documentElement.style.overflow = isMenuOpen ? 'hidden' : '';
        });
    };
    
    /**
     * Handles the services dropdown for mobile.
     */
    const handleMobileDropdown = () => {
        if (!dropdown) return;
        
        const dropdownLink = dropdown.querySelector('.nav-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 767) {
                e.preventDefault();
                const isVisible = dropdownMenu.style.display === 'block';
                dropdownMenu.style.display = isVisible ? 'none' : 'block';
            }
        });
    };

    /**
     * Sets up the Intersection Observer to animate elements on scroll.
     */
    const setupScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    };

    /**
     * Manages the contact form submission and redirects to the thank you page.
     */
    const handleContactForm = () => {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // In a real application, you would send the data to a server here first.
            // For this demo, we will redirect immediately.
            
            window.location.href = 'thank-you.html';
        });
    };

    /**
     * Adds a resize listener to handle navigation state changes.
     */
    const handleResize = () => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 767) {
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.documentElement.style.overflow = '';
                }
                const dropdownMenu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;
                if (dropdownMenu) {
                    dropdownMenu.style.display = '';
                }
            }
        });
    };

    // --- Initialize all functionalities ---
    handleMobileNav();
    handleMobileDropdown();
    setupScrollAnimations();
    handleContactForm();
    handleResize();
});
