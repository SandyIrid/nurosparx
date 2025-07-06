// script.js - NEUROSPARKS REDESIGN (Corrected)

document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast-notification');

    /**
     * Displays a toast notification message.
     * This function is defined first to avoid any reference errors.
     * @param {string} message - The message to display in the toast.
     */
    const showToast = (message) => {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');
        
        // Hide the toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    /**
     * Handles the mobile navigation menu toggle.
     * Toggles the active classes and sets overflow on the <html> element
     * to prevent scrolling when the mobile menu is open.
     */
    const handleMobileNav = () => {
        if (!navToggle || !navLinks) return;

        navToggle.addEventListener('click', () => {
            const isMenuOpen = navLinks.classList.toggle('active');
            navToggle.classList.toggle('active', isMenuOpen);
            // Using documentElement (the <html> tag) is often more reliable for overflow
            document.documentElement.style.overflow = isMenuOpen ? 'hidden' : '';
        });
    };
    
    /**
     * Sets up the Intersection Observer to animate elements on scroll.
     * Elements with the class 'animate-on-scroll' will fade in and slide up
     * as they enter the viewport.
     */
    const setupScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop observing the element once it's visible to save resources
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    };

    /**
     * Manages the contact form submission.
     */
    const handleContactForm = () => {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            showToast("Thanks! We'll be in touch soon.");
            contactForm.reset();
        });
    };

    /**
     * Adds a resize listener to the window to prevent navigation bugs.
     * If the user opens the mobile menu and then resizes the window to a desktop
     * view, this ensures the menu closes and scrolling is re-enabled.
     */
    const handleResize = () => {
        window.addEventListener('resize', () => {
            // Check if we've resized to a desktop width
            if (window.innerWidth > 767) {
                // If the mobile menu is active, reset it
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.documentElement.style.overflow = '';
                }
            }
        });
    };

    // --- Initialize all functionalities ---
    handleMobileNav();
    setupScrollAnimations();
    handleContactForm();
    handleResize();
});