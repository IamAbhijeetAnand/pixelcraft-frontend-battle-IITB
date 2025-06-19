// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.setAttribute('data-lucide', 'sun');
} else {
    themeIcon.setAttribute('data-lucide', 'moon');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.setAttribute('data-lucide', 'moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.setAttribute('data-lucide', 'sun');
    }
    
    // Re-initialize Lucide icons
    lucide.createIcons();
});

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navigation
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');
const menuIcon = mobileMenuToggle.querySelector('.menu-icon');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-open');
    
    if (navMenu.classList.contains('mobile-open')) {
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    
    lucide.createIcons();
});

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
            
            // Close mobile menu if open
            navMenu.classList.remove('mobile-open');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });
});

// Hero Section
const animatedText = document.getElementById('animated-text');
const texts = ['Digital Experiences', 'Creative Solutions', 'Brand Identities', 'Web Applications'];
let currentTextIndex = 0;

setInterval(() => {
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    animatedText.textContent = texts[currentTextIndex];
}, 3000);

// Stats Counter Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetValue = parseInt(statNumber.getAttribute('data-count'));
            
            if (targetValue) {
                animateCounter(statNumber, targetValue);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat-number[data-count]').forEach(stat => {
    statsObserver.observe(stat);
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 40);
}

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonials Carousel
const testimonials = [
    {
        name: 'Jennifer Walsh',
        role: 'CEO, TechStart Inc.',
        image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'PixelCraft transformed our digital presence completely. Their attention to detail and innovative approach exceeded our expectations. The team delivered a stunning website that increased our conversions by 150%.'
    },
    {
        name: 'Marcus Johnson',
        role: 'Founder, EcoSolutions',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'Working with PixelCraft was an absolute pleasure. They understood our vision perfectly and brought it to life with exceptional creativity and technical expertise. Our mobile app now has over 100K downloads!'
    },
    {
        name: 'Sarah Mitchell',
        role: 'Marketing Director, Fashion Forward',
        image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'The branding and web design services provided by PixelCraft were outstanding. They created a cohesive brand identity that resonates with our target audience and drives engagement across all platforms.'
    },
    {
        name: 'Robert Chen',
        role: 'CTO, DataFlow Systems',
        image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
        content: 'PixelCraft delivered a complex enterprise solution on time and within budget. Their technical expertise and project management skills are top-notch. Highly recommended for any serious business.'
    }
];

let currentTestimonialIndex = 0;

const testimonialContent = document.getElementById('testimonial-content');
const testimonialName = document.getElementById('testimonial-name');
const testimonialRole = document.getElementById('testimonial-role');
const testimonialImage = document.getElementById('testimonial-image');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

function updateTestimonial(index) {
    const testimonial = testimonials[index];
    
    testimonialContent.textContent = `"${testimonial.content}"`;
    testimonialName.textContent = testimonial.name;
    testimonialRole.textContent = testimonial.role;
    testimonialImage.src = testimonial.image;
    testimonialImage.alt = testimonial.name;
    
    // Update dots
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial(currentTestimonialIndex);
}

function prevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentTestimonialIndex);
}

nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonialIndex = index;
        updateTestimonial(currentTestimonialIndex);
    });
});

// Auto-play testimonials
setInterval(nextTestimonial, 5000);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
        
        // Re-initialize Lucide icons
        lucide.createIcons();
    });
});

// Contact Form
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    contactForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
    
    // Reset form after 3 seconds
    setTimeout(() => {
        contactForm.classList.remove('hidden');
        formSuccess.classList.add('hidden');
        contactForm.reset();
    }, 3000);
});

// Scroll to Top
const scrollToTopBtn = document.getElementById('scroll-to-top');

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .team-member, .faq-item').forEach(el => {
    observer.observe(el);
});

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open');
        menuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// Performance Optimization
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Preload Critical Resources
const preloadLinks = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
];

preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});