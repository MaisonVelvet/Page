// ============================================
// MAISON VELVET - JAVASCRIPT
// Interacciones y Animaciones
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVEGACIÓN
    // ============================================
    
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Efecto scroll en navegación
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Menú móvil toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Cerrar menú móvil al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // INTERSECTION OBSERVER - Animaciones al scroll
    // ============================================
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Observer para títulos de sección
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
    
    // Observer para cards de valores
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    const valorCards = document.querySelectorAll('.valor-card');
    valorCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    const equipoCards = document.querySelectorAll('.equipo-card');
    equipoCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // ============================================
    // ANIMACIÓN AOS (Animate On Scroll)
    // ============================================
    
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const aosObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    aosElements.forEach(element => {
        aosObserver.observe(element);
    });
    
    // ============================================
    // CURSOR PERSONALIZADO (opcional)
    // ============================================
    
    let cursorTrail = null;
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            if (!cursorTrail) {
                cursorTrail = document.createElement('div');
                cursorTrail.className = 'cursor-dot';
                cursorTrail.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background-color: rgba(212, 175, 55, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: transform 0.15s ease;
                `;
                document.body.appendChild(cursorTrail);
            }
            
            requestAnimationFrame(() => {
                cursorTrail.style.left = e.clientX - 4 + 'px';
                cursorTrail.style.top = e.clientY - 4 + 'px';
            });
        });
        
        // Aumentar cursor en hover de elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .servicio-item, .valor-card, .equipo-card, .marca-item');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                if (cursorTrail) {
                    cursorTrail.style.transform = 'scale(2.5)';
                    cursorTrail.style.backgroundColor = 'rgba(212, 175, 55, 0.8)';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                if (cursorTrail) {
                    cursorTrail.style.transform = 'scale(1)';
                    cursorTrail.style.backgroundColor = 'rgba(212, 175, 55, 0.6)';
                }
            });
        });
    }
    
    // ============================================
    // PARALLAX SUAVE EN HERO
    // ============================================
    
    const heroSection = document.querySelector('.hero');
    const heroV = document.querySelector('.hero-v');
    
    if (heroSection && heroV) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroV.style.transform = `scale(1) translateY(${scrolled * parallaxSpeed}px)`;
                heroV.style.opacity = 1 - (scrolled / heroSection.offsetHeight) * 0.5;
            }
        });
    }
    
    // ============================================
    // NÚMEROS ANIMADOS (si se agregan estadísticas)
    // ============================================
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // ============================================
    // LAZY LOADING DE IMÁGENES (si se agregan)
    // ============================================
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ============================================
    // EFECTOS DE HOVER MEJORADOS
    // ============================================
    
    // Efecto de brillo en cards al mover el mouse
    const cards = document.querySelectorAll('.valor-card, .servicio-item, .equipo-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `
                perspective(1000px) 
                rotateY(${deltaX * 5}deg) 
                rotateX(${-deltaY * 5}deg) 
                translateY(-10px)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
        });
    });
    
    // ============================================
    // PRELOADER (opcional)
    // ============================================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Agregar pequeño delay a las animaciones iniciales
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-v, .hero-title, .hero-subtitle, .hero-claim, .hero-cta');
            heroElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.2}s`;
            });
        }, 100);
    });
    
    // ============================================
    // SCROLL TO TOP BUTTON (opcional)
    // ============================================
    
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--color-gold);
        color: var(--color-black);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // ============================================
    // LOGS DE CONSOLA (desarrollo)
    // ============================================
    
    console.log('%cMaison Velvet', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
    console.log('%cComunicación Corporativa de Lujo', 'font-size: 14px; color: #8B7E74;');
    console.log('Sitio web cargado correctamente ✓');
    
});

// ============================================
// DETECCIÓN DE CAMBIO DE TAMAÑO DE VENTANA
// ============================================

let resizeTimer;
window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// ============================================
// PREVENIR COMPORTAMIENTOS NO DESEADOS
// ============================================

// Prevenir zoom en doble tap en móviles (opcional)
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ============================================
// EASTER EGG - Konami Code (opcional/divertido)
// ============================================

let konamiCode = [];
const konamiPattern = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'b', 'a'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        console.log('%c✨ Konami Code Activated! ✨', 'font-size: 20px; color: gold;');
    }
});