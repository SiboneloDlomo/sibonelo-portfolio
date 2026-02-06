// Power Automation Portfolio - Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize counter animations
    animateCounters();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Add scroll effects
    initScrollEffects();
});

// Animated Counter
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Utility: Smooth scroll to anchor
function smoothScrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Utility: Add animation on scroll
function addScrollAnimation(element, animationClass) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
            }
        });
    });
    observer.observe(element);
}

// Initialize all scroll animations
document.querySelectorAll('.featured-card, .stat-card, .tech-item').forEach(el => {
    addScrollAnimation(el, 'animate-in');
});

// Console welcome message
console.log('%c⚡ Power Automation Portfolio', 'font-size: 24px; font-weight: bold; color: #0078d4;');
console.log('%cBuilt by Sbonelo Dlomo', 'font-size: 14px; color: #605e5c;');
