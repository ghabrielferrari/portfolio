document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const themeToggle = document.querySelector('.theme-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    const header = document.querySelector('.header');

    // Initialize animations
    initAnimations();

    // Responsive menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Function to update header background based on theme
    function updateHeaderBackground() {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.backgroundColor = document.body.classList.contains('dark-mode') 
                ? 'rgba(29, 29, 31, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.backgroundColor = document.body.classList.contains('dark-mode') 
                ? 'rgba(29, 29, 31, 0.9)' 
                : 'rgba(255, 255, 255, 0.9)';
        }
    }

    // Theme toggle (light/dark)
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
        
        // Update header background immediately when theme changes
        updateHeaderBackground();
    });

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        // Update header background immediately when loading with dark theme
        updateHeaderBackground();
    }

    // Active navigation based on visible section
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Header with solid background when scrolling
        updateHeaderBackground();
    });

    // Scroll animations
    function initAnimations() {
        // Add animation classes to elements
        document.querySelector('.hero-title').classList.add('fade-in');
        document.querySelector('.hero-subtitle').classList.add('fade-in', 'delay-1');
        document.querySelector('.hero-description').classList.add('fade-in', 'delay-2');
        document.querySelector('.hero-cta').classList.add('fade-in', 'delay-3');
        document.querySelector('.profile-image').classList.add('fade-in', 'delay-4');
        
        // Animation for elements on scroll
        const animateOnScroll = function() {
            const elementsToAnimate = document.querySelectorAll('.section-title, .about-text p, .stat, .skill-item, .academy-list li, .highlight-card, .contact-item');
            
            elementsToAnimate.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.classList.add('fade-in');
                }
            });
        };
        
        // Execute initial animation
        animateOnScroll();
        
        // Add scroll event for animations
        window.addEventListener('scroll', animateOnScroll);
    }

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form submission simulation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                // Clear form
                this.reset();
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Show success message
                alert('Message sent successfully! Thank you for contacting me.');
            }, 1500);
        });
    }
});
