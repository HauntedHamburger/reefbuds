/**
 * ReefBuds Website JavaScript
 * Main script file for handling interactive elements and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initGallery();
    initHeroAnimation();
    initContentSections();
    initButtons();
    initNewsletter();
    initContactForm();
    
    // Check gallery images after initialization
    checkGalleryImages();
    
    // Add scroll event listener for header behavior
    window.addEventListener('scroll', handleScroll);
});

/**
 * Global variables
 */
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 50;

/**
 * Handle scroll events for header visibility and animations
 * Shows/hides header based on scroll direction and triggers scroll animations
 */
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class to header when scrolled down
    if (scrollTop > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide header when scrolling down, show when scrolling up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
    
    // Check for elements to animate on scroll
    checkScrollAnimations();
}

/**
 * Initialize navigation functionality
 * Sets up mobile menu toggle and navigation links
 */
function initNavigation() {
    const menuButton = document.querySelector('.menu-button');
    const menuContainer = document.querySelector('.menu-container');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Toggle menu on button click
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            menuContainer.classList.toggle('active');
            
            // Update aria-expanded attribute
            const isExpanded = menuContainer.classList.contains('active');
            menuButton.setAttribute('aria-expanded', isExpanded);
            
            // Prevent body scrolling when menu is open
            document.body.style.overflow = isExpanded ? 'hidden' : '';
            
            // Update button text
            menuButton.textContent = isExpanded ? 'Close' : 'Menu';
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuContainer.classList.remove('active');
            menuButton.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
            menuButton.textContent = 'Menu';
        });
    });
}

/**
 * Initialize hero section animations
 * Adds staggered animations to hero elements
 */
function initHeroAnimation() {
    const heroTitle = document.querySelector('#hero h1');
    const heroText = document.querySelector('#hero p');
    const ctaButton = document.querySelector('#hero .cta-button');
    
    // Add staggered animation delays
    if (heroTitle) {
        heroTitle.style.animationDelay = '0.2s';
    }
    
    if (heroText) {
        heroText.classList.add('fade-up');
        heroText.style.animationDelay = '0.4s';
        setTimeout(() => {
            heroText.classList.add('visible');
        }, 100);
    }
    
    if (ctaButton) {
        ctaButton.classList.add('fade-up');
        ctaButton.style.animationDelay = '0.6s';
        setTimeout(() => {
            ctaButton.classList.add('visible');
        }, 200);
    }
}

/**
 * Initialize scroll animations
 * Adds animation classes to elements that should animate on scroll
 */
function initScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.type-heading-1, .type-body-large, .product-card, .composition-image, .composition-item, .stat-item, .partners-image');
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Initial check for elements in viewport
    checkScrollAnimations();
}

/**
 * Check which elements should be animated based on scroll position
 * Adds 'visible' class to elements in the viewport
 */
function checkScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // If element is in viewport
        if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

/**
 * Initialize image gallery
 * Sets up image gallery with button controls
 */
function initGallery() {
    console.log('Initializing gallery...');
    const galleryButtons = document.querySelectorAll('.gallery-button');
    const galleryImages = document.querySelectorAll('.gallery-image img');
    
    console.log('Gallery buttons found:', galleryButtons.length);
    console.log('Gallery images found:', galleryImages.length);
    
    // Make sure the first image is visible initially
    const firstImage = document.querySelector('.gallery-image img[data-location="boracay"]');
    if (firstImage) {
        console.log('First image found, setting active');
        firstImage.classList.add('active');
    } else {
        console.log('First image not found!');
    }
    
    galleryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const location = button.getAttribute('data-location');
            console.log('Button clicked for location:', location);
            
            // Remove active class from all buttons and images
            galleryButtons.forEach(btn => btn.classList.remove('active'));
            galleryImages.forEach(img => img.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding image
            const targetImage = document.querySelector(`.gallery-image img[data-location="${location}"]`);
            
            if (targetImage) {
                console.log('Target image found, setting active');
                targetImage.classList.add('active');
            } else {
                console.log('Target image not found for location:', location);
            }
        });
    });
}

/**
 * Initialize content sections
 * Sets up animations for content sections
 */
function initContentSections() {
    // Get all content sections
    const contentSections = document.querySelectorAll('.content-section');
    
    // Set up intersection observer for each section
    contentSections.forEach(section => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const heading = section.querySelector('.content-section__heading');
                    const text = section.querySelector('.content-section__text');
                    
                    if (heading) {
                        setTimeout(() => {
                            heading.classList.add('visible');
                        }, 100);
                    }
                    
                    if (text) {
                        setTimeout(() => {
                            text.classList.add('visible');
                        }, 300);
                    }
                    
                    // Animate partner logos if they exist in this section
                    const logosSection = section.querySelector('.partners-logos-section');
                    if (logosSection) {
                        setTimeout(() => {
                            const logos = logosSection.querySelectorAll('.partner-logo');
                            logos.forEach((logo, index) => {
                                setTimeout(() => {
                                    logo.classList.add('visible');
                                }, 100 * index); // Stagger the animations
                            });
                        }, 500); // Start after text animation
                    }
                    
                    // Once animated, disconnect the observer
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the element is visible
        });
        
        observer.observe(section);
    });
    
    // Animate the call to action form
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        ctaForm.classList.add('fade-in');
                    }, 400); // Delay the form animation
                    
                    // Once animated, disconnect the observer
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the element is visible
        });
        
        observer.observe(ctaForm);
    }
}

/**
 * Initialize button functionality
 * Sets up event handlers for CTA buttons
 */
function initButtons() {
    // Get all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    // Add click event listeners
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // For demo purposes, scroll to contact section
            // In a real implementation, this would open a contact form or redirect
            const contactSection = document.querySelector('#call-to-action');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Add keyboard accessibility
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}

/**
 * Initialize newsletter form
 * Handles form submission and validation
 */
function initNewsletter() {
    const newsletterForm = document.querySelector('.footer-newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Remove any existing messages
            const existingSuccess = document.querySelector('.footer-newsletter-success');
            const existingError = document.querySelector('.footer-newsletter-error');
            
            if (existingSuccess) existingSuccess.remove();
            if (existingError) existingError.remove();
            
            if (validateEmail(email)) {
                // In a real implementation, this would send the email to a server
                // For demo purposes, we'll just show a success message
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'footer-newsletter-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i> Subscribed successfully!
                `;
                
                // Add success message after form
                newsletterForm.parentNode.appendChild(successMessage);
                
                // Clear the input
                emailInput.value = '';
            } else {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'footer-newsletter-error';
                errorMessage.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i> Please enter a valid email.
                `;
                
                // Add error message after form
                newsletterForm.parentNode.appendChild(errorMessage);
                
                // Focus on email input
                emailInput.focus();
            }
        });
    }
}

/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Initialize contact form functionality
 * Sets up event handlers for the contact form in the call to action section
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const inquiryType = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Validate form
            if (!name || !email || !inquiryType || !message) {
                showFormMessage('error', 'Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                showFormMessage('error', 'Please enter a valid email address');
                return;
            }
            
            // Simulate form submission (replace with actual form submission)
            const formContainer = document.querySelector('.form-container');
            const loadingMessage = document.createElement('div');
            loadingMessage.className = 'form-message form-message--loading';
            loadingMessage.innerHTML = '<div class="loading-spinner"></div><p>Sending your message...</p>';
            
            // Remove any existing messages
            const existingMessage = formContainer.querySelector('.form-message');
            if (existingMessage) {
                formContainer.removeChild(existingMessage);
            }
            
            // Add loading message
            formContainer.appendChild(loadingMessage);
            
            // Simulate API call
            setTimeout(() => {
                // Remove loading message
                formContainer.removeChild(loadingMessage);
                
                // Show success message
                showFormMessage('success', 'Thank you for your message! We\'ll get back to you soon.');
                
                // Reset form
                contactForm.reset();
            }, 1500);
        });
    }
}

/**
 * Show form message
 * Displays a success or error message for the contact form
 */
function showFormMessage(type, message) {
    const formContainer = document.querySelector('.form-container');
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.innerHTML = `<p>${message}</p>`;
    
    // Remove any existing messages
    const existingMessage = formContainer.querySelector('.form-message');
    if (existingMessage) {
        formContainer.removeChild(existingMessage);
    }
    
    // Add new message
    formContainer.appendChild(messageElement);
    
    // Remove message after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            if (formContainer.contains(messageElement)) {
                formContainer.removeChild(messageElement);
            }
        }, 5000);
    }
}

/**
 * Check gallery images
 * Verifies that gallery images are loaded and visible
 */
function checkGalleryImages() {
    console.log('Checking gallery images...');
    
    // Wait a short time to ensure images have had a chance to load
    setTimeout(() => {
        const galleryContainer = document.querySelector('.gallery-image');
        const activeImage = document.querySelector('.gallery-image img.active');
        
        console.log('Gallery container:', galleryContainer);
        console.log('Active image:', activeImage);
        
        if (galleryContainer && activeImage) {
            console.log('Gallery container dimensions:', galleryContainer.offsetWidth, 'x', galleryContainer.offsetHeight);
            console.log('Active image dimensions:', activeImage.offsetWidth, 'x', activeImage.offsetHeight);
            console.log('Active image computed style:', 
                'opacity:', window.getComputedStyle(activeImage).opacity,
                'display:', window.getComputedStyle(activeImage).display,
                'visibility:', window.getComputedStyle(activeImage).visibility
            );
        }
    }, 1000);
} 