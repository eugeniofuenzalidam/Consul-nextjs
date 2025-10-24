// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.feature-section, .info-section, .partners-section').forEach(section => {
    observer.observe(section);
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Contact Form Handler (if you add a contact form)
const handleContactForm = async (formData) => {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            return {
                success: true,
                message: data.message
            };
        } else {
            throw new Error(data.error || 'Error al enviar el mensaje');
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            success: false,
            message: error.message || 'Error de conexión'
        };
    }
};

// Button Click Handlers with Ripple Effect (for non-modal buttons only)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();

        // Handle scroll actions only (modal actions handled separately)
        if (buttonText.includes('Conocer Más') || buttonText.includes('Ver Servicios')) {
            // Scroll to services section
            const servicesSection = document.querySelector('.feature-section');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        setTimeout(() => ripple.remove(), 600);
    });
});


// Load Services from API (example)
async function loadServices() {
    try {
        const response = await fetch('/api/services');
        const data = await response.json();

        if (data.success) {
            console.log('Services loaded:', data.services);
            // You can use this to dynamically populate services section
        }
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Fuenzalida Consulting - Website Loaded');
    loadServices();
});

// ========================================
// UNIFIED MODAL (CONTACT + BOOKING)
// ========================================

function openUnifiedModal(tab = 'contact') {
    const modal = document.getElementById('unifiedModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        switchTab(tab);

        // Track event (Google Analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'modal_open', {
                event_category: 'Engagement',
                event_label: `Modal Opened - ${tab}`
            });
        }
    }
}

function closeUnifiedModal() {
    const modal = document.getElementById('unifiedModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to selected tab and content
    const tabButton = document.querySelector(`.tab-button[onclick*="${tabName}"]`);
    const tabContent = document.getElementById(tabName + 'Tab');

    if (tabButton) tabButton.classList.add('active');
    if (tabContent) tabContent.classList.add('active');

    // Track tab switch
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tab_switch', {
            event_category: 'Engagement',
            event_label: `Switched to ${tabName}`
        });
    }
}

function trackBookingClick() {
    // Track when user clicks to open Google Calendar
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calendar_link_click', {
            event_category: 'Booking',
            event_label: 'Google Calendar Link Clicked'
        });
    }
    console.log('📅 Usuario abriendo Google Calendar para agendar');
}

// Legacy function names for backward compatibility
function openBookingModal() {
    openUnifiedModal('booking');
}

function closeBookingModal() {
    closeUnifiedModal();
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('unifiedModal');
    if (e.target === modal) {
        closeUnifiedModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeUnifiedModal();
    }
});

// Update hero buttons to use new functions
document.addEventListener('DOMContentLoaded', function() {
    // Update "Agendar Consultoría" buttons
    const bookingButtons = document.querySelectorAll('.btn-primary');
    bookingButtons.forEach(button => {
        if (button.textContent.includes('Agendar')) {
            button.onclick = function(e) {
                e.preventDefault();
                openUnifiedModal('booking');
            };
        }
    });

    // Update "Contactar" buttons to open modal
    const contactButtons = document.querySelectorAll('.btn');
    contactButtons.forEach(button => {
        if (button.textContent.includes('Contactar')) {
            button.onclick = function(e) {
                e.preventDefault();
                openUnifiedModal('contact');
            };
        }
    });

    // Handle modal contact form submission
    const modalForm = document.getElementById('contactFormModal');
    if (modalForm) {
        modalForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = document.getElementById('submitButtonModal');
            const originalButtonText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            const formData = new FormData(this);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    alert('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
                    modalForm.reset();
                    closeUnifiedModal();

                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submission', {
                            event_category: 'Contact',
                            event_label: 'Modal Contact Form'
                        });
                    }
                } else {
                    throw new Error(data.message || 'Error al enviar el formulario');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleContactForm,
        openBookingModal,
        closeBookingModal
    };
}
