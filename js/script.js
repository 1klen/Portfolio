document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initCustomCursor();
    initNavigation();
    initThemeToggle();
    initSmoothScroll();
    initScrollTopButton();
    initCounters();
    initContactForm();
    initTechRadar();
    initAnimations();
    initFloatingElements();
    
    console.log('Портфолио React разработчика загружено!');
});

function initLoader() {
    const loader = document.querySelector('.loader');

    setTimeout(() => {
        loader.classList.add('hidden');
 
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
}

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        return;
    }
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    const interactiveElements = document.querySelectorAll(
        'a, button, .tech-card, .achievement-card, .service-card, .nav-link'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.classList.add('light');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        themeToggle.classList.toggle('light');

        const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollTopButton() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.counter-item h4');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; 
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function initContactForm() {
    const form = document.getElementById('feedbackForm');
    const formSuccess = document.getElementById('formSuccess');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
   
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const message = this.querySelector('#message').value;
        
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        console.log('Отправка формы:', { name, email, message });
        
        form.style.display = 'none';
        formSuccess.classList.add('show');

        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            formSuccess.classList.remove('show');
        }, 5000);
    });
}

function initTechRadar() {
    const radarItems = document.querySelectorAll('.radar-item');
    
    radarItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const tech = this.getAttribute('data-tech');
            console.log(`Технология: ${tech}`);

            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });

        setInterval(() => {
            if (Math.random() > 0.7) {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                item.style.transform = `translate(${randomX}px, ${randomY}px)`;
                
                setTimeout(() => {
                    item.style.transform = '';
                }, 1000);
            }
        }, 3000);
    });
}

function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.tech-card, .achievement-card, .service-card, .timeline-item'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(el => {
        const delay = Math.random() * 5;
        el.style.animationDelay = `${delay}s`;

        el.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.background = 'rgba(106, 99, 255, 0.3)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = '';
        });
    });
}

function updateCopyrightYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
}

updateCopyrightYear();

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icons i');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.1 * (index + 1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

initParallax();

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

initProgressBars();


