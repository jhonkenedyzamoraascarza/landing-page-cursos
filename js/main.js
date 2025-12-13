// ===================================
// Smooth Scrolling & Navigation
// ===================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToLogin() {
    scrollToSection('login');
}

// ===================================
// Mobile Menu Toggle
// ===================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// ===================================
// Header Scroll Effect
// ===================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// ===================================
// Login Modal
// ===================================

const modal = document.getElementById('loginModal');
const modalTitle = document.getElementById('modalTitle');
let currentUserType = '';

function openLogin(userType) {
    currentUserType = userType;

    const titles = {
        'admin': 'Acceso Administrador',
        'vendor': 'Acceso Vendedor',
        'student': 'Acceso Alumno'
    };

    modalTitle.textContent = titles[userType] || 'Iniciar Sesión';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('loginForm').reset();
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// Login Form Submission
// ===================================

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí puedes agregar la lógica de autenticación
    console.log('Login attempt:', {
        userType: currentUserType,
        username: username
    });

    // Simulación de login exitoso
    alert(`Bienvenido ${username}! (Tipo: ${currentUserType})\n\nNota: Esta es una demostración. Implementa la autenticación real en el backend.`);

    closeModal();
});

// ===================================
// Scroll Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Immediately show hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// ===================================
// Curso Card Interactions
// ===================================

const cursoCards = document.querySelectorAll('.curso-card');

cursoCards.forEach(card => {
    const btn = card.querySelector('.btn-curso');

    if (btn) {
        btn.addEventListener('click', () => {
            const cursoTitle = card.querySelector('.curso-title').textContent;
            alert(`Próximamente: Información detallada del curso "${cursoTitle}"\n\nEsta funcionalidad estará disponible pronto.`);
        });
    }
});

// ===================================
// Parallax Effect for Hero
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// ===================================
// Active Navigation Link
// ===================================

const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Carousel Functionality - SIMPLIFIED VERSION
// ===================================

function initCarousel(carouselId, dotsId, interval = 4000) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) {
        console.log('Carousel not found:', carouselId);
        return;
    }

    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    const dotsContainer = document.getElementById(dotsId);

    if (!track || items.length === 0) {
        console.log('Track or items not found');
        return;
    }

    let currentSlide = 0;
    let isPaused = false;
    let autoplayInterval;

    // Determine items per view based on screen size
    const getItemsPerView = () => window.innerWidth >= 768 ? 3 : 1;
    let itemsPerView = getItemsPerView();

    // Calculate total slides
    const getTotalSlides = () => Math.ceil(items.length / itemsPerView);

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const totalSlides = getTotalSlides();

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-300';
            dot.onclick = () => {
                goToSlide(i);
                isPaused = true;
                setTimeout(() => isPaused = false, 3000);
            };
            dotsContainer.appendChild(dot);
        }
        updateDots();
    }

    // Update dots
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.className = 'w-3 h-3 rounded-full bg-blue-600 transition-all duration-300';
            } else {
                dot.className = 'w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-300';
            }
        });
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        const totalSlides = getTotalSlides();
        currentSlide = slideIndex % totalSlides;

        // Calculate transform
        const slideWidth = 100 / itemsPerView;
        const translateX = -(currentSlide * itemsPerView * slideWidth);

        track.style.transform = `translateX(${translateX}%)`;
        track.style.transition = 'transform 0.5s ease-in-out';

        updateDots();

        console.log(`Moved to slide ${currentSlide}, translateX: ${translateX}%`);
    }

    // Next slide
    function nextSlide() {
        const totalSlides = getTotalSlides();
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // Start autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, interval);
        console.log('Autoplay started with interval:', interval);
    }

    // Stop autoplay
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        isPaused = true;
        console.log('Carousel paused (hover)');
    });

    carousel.addEventListener('mouseleave', () => {
        isPaused = false;
        console.log('Carousel resumed');
    });

    // Pause on touch
    carousel.addEventListener('touchstart', () => {
        isPaused = true;
    });

    carousel.addEventListener('touchend', () => {
        setTimeout(() => isPaused = false, 2000);
    });

    // Initialize
    createDots();
    goToSlide(0);
    startAutoplay();

    console.log('Carousel initialized:', carouselId, 'Items:', items.length, 'Items per view:', itemsPerView);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
} else {
    initCarousels();
}

function initCarousels() {
    console.log('Initializing carousels...');

    // Wait a bit for everything to load
    setTimeout(() => {
        initCarousel('cursosCarousel', 'cursosDots', 4000);
    }, 200);
}

// ===================================
// Registration Form Handling
// ===================================

const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            curso: document.getElementById('curso').value,
            nombre: document.getElementById('nombre').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value
        };

        // Log form data (for development purposes)
        console.log('Datos del formulario de registro:', formData);

        // TODO: Aquí se implementará la integración con el backend
        // Ejemplo:
        // fetch('/api/registro', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Handle success
        // })
        // .catch(error => {
        //     // Handle error
        // });

        // Simulate successful submission
        registrationForm.classList.add('hidden');
        successMessage.classList.remove('hidden');

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Reset form after 5 seconds and show it again
        setTimeout(() => {
            registrationForm.reset();
            registrationForm.classList.remove('hidden');
            successMessage.classList.add('hidden');
        }, 5000);
    });
}

// ===================================
// Console Welcome Message
// ===================================

console.log('%c¡Bienvenido a la Plataforma de Cursos y Certificados!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cSistema de gestión educativa profesional', 'color: #1e3a8a; font-size: 14px;');
