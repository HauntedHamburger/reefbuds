// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll event listener for header
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Add click event listener for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            alert('Eventually, this will redirect into the funnel.');
        });
    }

    // Gallery functionality
    const galleryButtons = document.querySelectorAll('.gallery-button');
    const galleryImages = document.querySelectorAll('.gallery-image img');

    galleryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const location = button.dataset.location;
            
            // Update button states
            galleryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update image states
            galleryImages.forEach(img => {
                img.classList.remove('active');
                if (img.dataset.location === location) {
                    img.classList.add('active');
                }
            });
        });
    });

    // Mobile Menu functionality
    const menuButton = document.querySelector('.menu-button');
    const menuContainer = document.querySelector('.menu-container');
    const menuLinks = document.querySelectorAll('.nav-links a, .nav-socials a');
    
    // Toggle menu
    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        menuContainer.classList.toggle('active');
        menuButton.textContent = isExpanded ? 'Menu' : 'Close';
        
        if (!isExpanded) {
            // Focus first menu item when opening
            menuLinks[0].focus();
        }
    });
    
    // Handle keyboard navigation
    menuContainer.addEventListener('keydown', (e) => {
        const focusableElements = Array.from(menuLinks);
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        const isTabPressed = e.key === 'Tab';
        
        // Handle Tab and Shift+Tab
        if (isTabPressed) {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
        
        // Close menu on Escape
        if (e.key === 'Escape') {
            menuContainer.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.textContent = 'Menu';
            menuButton.focus();
        }
    });
    
    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuContainer.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.textContent = 'Menu';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && 
            !menuContainer.contains(e.target) && 
            menuContainer.classList.contains('active')) {
            menuContainer.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.textContent = 'Menu';
        }
    });
}); 