document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    
    // Apply the default theme (gradient background)
    themeIcon.className = 'fas fa-moon';
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            themeIcon.className = 'fas fa-moon';
            showNotification('Switched to gradient theme', 'success');
        } else {
            htmlElement.classList.add('dark');
            themeIcon.className = 'fas fa-sun';
            showNotification('Switched to dark theme', 'success');
        }
    });

    // Navigation Active State Management
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    // Set up intersection observer for active navigation
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Update active nav item
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-section') === sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scrolling for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Smooth scrolling for intro buttons
    const introButtons = document.querySelectorAll('.intro-actions a');
    introButtons.forEach(button => {
        if (button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = 80;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // GitHub Button Functionality
    const githubButtons = document.querySelectorAll('.github-btn');
    githubButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
                showNotification('Opening GitHub repository...', 'success');
            } else {
                showNotification('GitHub URL not found', 'error');
            }
        });
    });

    // Certificate View Functionality
    const certViewButtons = document.querySelectorAll('.cert-view');
    
    certViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const certFile = this.getAttribute('data-cert');
            
            if (certFile) {
                // Open PDF in new tab for viewing
                window.open(certFile, '_blank');
                showNotification('Opening certificate...', 'info');
            } else {
                const certCard = this.closest('.cert-card');
                const certTitle = certCard.querySelector('h3').textContent;
                showNotification(`Certificate for "${certTitle}" is not available for viewing.`, 'info');
            }
        });
    });

    // Scroll-triggered animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .timeline-item, .skill-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('fade-in-up');
            }
        });
    };
    
    // Initial setup for scroll animations
    const setupScrollAnimations = () => {
        const elements = document.querySelectorAll('.card, .timeline-item, .skill-item');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    };
    
    setupScrollAnimations();
    animateOnScroll(); // Initial check
    
    window.addEventListener('scroll', animateOnScroll);

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Close functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced hover effects for buttons
    const buttons = document.querySelectorAll('.btn:not(.btn--sm)');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill items animation on hover
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading screen fade out
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    });

    // Parallax effect for intro section (subtle)
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const intro = document.querySelector('.intro-section');
        const rate = scrolled * -0.3;
        
        if (intro && scrolled < window.innerHeight) {
            intro.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Enhanced navigation for mobile
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.nav-content');
            let existingMobileBtn = document.querySelector('.mobile-menu-btn');
            
            if (!existingMobileBtn) {
                const mobileMenuBtn = document.createElement('button');
                mobileMenuBtn.className = 'mobile-menu-btn';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: var(--color-cream-50);
                    font-size: var(--font-size-lg);
                    cursor: pointer;
                    padding: var(--space-8);
                    border-radius: var(--radius-base);
                    transition: all var(--duration-fast) var(--ease-standard);
                    border: 1px solid rgba(var(--color-cream-50), 0.3);
                `;
                
                // Insert before theme toggle
                nav.insertBefore(mobileMenuBtn, document.getElementById('theme-toggle'));
                
                mobileMenuBtn.addEventListener('click', function() {
                    const navMenu = document.querySelector('.nav-menu');
                    const icon = this.querySelector('i');
                    
                    if (navMenu.style.display === 'flex') {
                        navMenu.style.display = 'none';
                        icon.className = 'fas fa-bars';
                    } else {
                        navMenu.style.display = 'flex';
                        navMenu.style.flexDirection = 'column';
                        navMenu.style.position = 'absolute';
                        navMenu.style.top = '100%';
                        navMenu.style.left = '0';
                        navMenu.style.right = '0';
                        navMenu.style.background = 'rgba(var(--color-brown-600-rgb), 0.98)';
                        navMenu.style.backdropFilter = 'blur(20px)';
                        navMenu.style.padding = 'var(--space-16)';
                        navMenu.style.gap = 'var(--space-8)';
                        navMenu.style.borderTop = '1px solid var(--color-border)';
                        icon.className = 'fas fa-times';
                    }
                });
                
                // Close mobile menu when clicking nav items
                navItems.forEach(item => {
                    item.addEventListener('click', () => {
                        const navMenu = document.querySelector('.nav-menu');
                        const icon = mobileMenuBtn.querySelector('i');
                        navMenu.style.display = 'none';
                        icon.className = 'fas fa-bars';
                    });
                });
            }
        } else {
            // Remove mobile menu button on larger screens
            const existingMobileBtn = document.querySelector('.mobile-menu-btn');
            if (existingMobileBtn) {
                existingMobileBtn.remove();
            }
            // Reset nav menu styles
            const navMenu = document.querySelector('.nav-menu');
            navMenu.style.display = '';
            navMenu.style.flexDirection = '';
            navMenu.style.position = '';
            navMenu.style.top = '';
            navMenu.style.left = '';
            navMenu.style.right = '';
            navMenu.style.background = '';
            navMenu.style.padding = '';
            navMenu.style.gap = '';
            navMenu.style.borderTop = '';
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add some Easter eggs for fun
    let clickCount = 0;
    const brand = document.querySelector('.nav-brand h2');
    
    brand.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            showNotification('🎉 You found the Easter egg! Thanks for exploring!', 'success');
            // Add a fun animation
            this.style.animation = 'bounce 1s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 1000);
            clickCount = 0;
        }
    });
    
    // Add bounce animation
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                transform: translate3d(0, 0, 0);
            }
            40%, 43% {
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                transform: translate3d(0, -30px, 0);
            }
            70% {
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                transform: translate3d(0, -15px, 0);
            }
            90% {
                transform: translate3d(0, -4px, 0);
            }
        }
    `;
    document.head.appendChild(bounceStyle);

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (mobileBtn && navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
                mobileBtn.querySelector('i').className = 'fas fa-bars';
            }
        }
        
        // Keyboard shortcuts for theme toggle (Ctrl/Cmd + D)
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            themeToggle.click();
        }
    });

    // Performance optimization: Debounce scroll events
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
    
    const debouncedAnimateOnScroll = debounce(animateOnScroll, 10);
    window.addEventListener('scroll', debouncedAnimateOnScroll);

    // Add loading state for GitHub buttons
    githubButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });

    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.intro-actions .btn--primary');
    ctaButtons.forEach(button => {
        setInterval(() => {
            button.classList.add('pulse');
            setTimeout(() => {
                button.classList.remove('pulse');
            }, 2000);
        }, 8000);
    });

    // Smooth reveal animation for sections
    const revealSections = () => {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial setup for section animations
    const setupSectionAnimations = () => {
        const sections = document.querySelectorAll('.section:not(.intro-section)');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
    };
    
    setupSectionAnimations();
    revealSections();
    window.addEventListener('scroll', debounce(revealSections, 10));

    // Console greeting with portfolio info
    console.log(`
    🚀 Welcome to Balaji's Portfolio!
    
    Built with modern web technologies:
    ✅ Vanilla JavaScript for interactions
    ✅ CSS Grid & Flexbox for responsive layout
    ✅ CSS Keyframes for animated gradient background
    ✅ Intersection Observer API for scroll effects
    ✅ CSS Custom Properties for theming
    ✅ Performance optimized with debouncing
    
    Features:
    🎨 Animated gradient background (no mouse tracking)
    🌙 Dark/Light theme toggle (Ctrl/Cmd + D)
    📱 Fully responsive design
    ⚡ Smooth scrolling navigation
    🎯 Interactive project links
    📜 Certificate viewing system
    
    Feel free to explore the code and reach out!
    📧 balaji022212@gmail.com
    🐙 github.com/balaji-0212
    
    Tips:
    - Click my name 5 times for a surprise! 🎉
    - Use Ctrl/Cmd + D to toggle themes
    - All buttons have smooth hover effects
    `);

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = 'var(--focus-outline)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Initialize everything
    showNotification('Portfolio loaded successfully! 🎉', 'success');
});