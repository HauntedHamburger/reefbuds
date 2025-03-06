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
            alert('Thank you for your interest! This is a demo button.');
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
}); 