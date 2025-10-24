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

// Button Click Handlers
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();

        // Handle different button actions
        if (buttonText.includes('Consultoría') || buttonText.includes('Contactar')) {
            // Show contact modal or redirect to contact section
            console.log('Opening contact form...');
            showContactModal();
        } else if (buttonText.includes('Conocer Más') || buttonText.includes('Ver Servicios')) {
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

// Contact Modal Functions
function showContactModal() {
    // TODO: Implement modal functionality
    // For now, we'll create a simple modal
    const modalHTML = `
        <div class="modal" id="contactModal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Contáctanos</h2>
                <form id="contactForm">
                    <div class="form-group">
                        <label for="name">Nombre</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="service">Servicio de Interés</label>
                        <select id="service" name="service">
                            <option value="">Seleccione un servicio</option>
                            <option value="estrategia">Consultoría Estratégica</option>
                            <option value="digital">Transformación Digital</option>
                            <option value="datos">Análisis de Datos</option>
                            <option value="proyectos">Gestión de Proyectos</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">Mensaje</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
                </form>
                <div id="formMessage" class="form-message"></div>
            </div>
        </div>
    `;

    // Check if modal already exists
    let modal = document.getElementById('contactModal');
    if (!modal) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modal = document.getElementById('contactModal');

        // Add modal styles if not already present
        if (!document.getElementById('modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'modal-styles';
            styles.textContent = `
                .modal {
                    display: none;
                    position: fixed;
                    z-index: 10000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    animation: fadeIn 0.3s ease;
                }
                .modal.show {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-content {
                    background-color: white;
                    padding: 40px;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                    animation: slideUp 0.3s ease;
                }
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .close {
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                    color: #999;
                }
                .close:hover {
                    color: #000;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                }
                .form-group input,
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 14px;
                }
                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #5B9AA9;
                }
                .form-message {
                    margin-top: 20px;
                    padding: 12px;
                    border-radius: 8px;
                    display: none;
                }
                .form-message.success {
                    background-color: #d4edda;
                    color: #155724;
                    display: block;
                }
                .form-message.error {
                    background-color: #f8d7da;
                    color: #721c24;
                    display: block;
                }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Close modal handlers
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });

        // Form submit handler
        const form = modal.querySelector('#contactForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: form.name.value,
                email: form.email.value,
                service: form.service.value,
                message: form.message.value
            };

            const messageDiv = document.getElementById('formMessage');
            messageDiv.className = 'form-message';
            messageDiv.textContent = 'Enviando...';
            messageDiv.style.display = 'block';

            const result = await handleContactForm(formData);

            if (result.success) {
                messageDiv.className = 'form-message success';
                messageDiv.textContent = result.message;
                form.reset();

                setTimeout(() => {
                    modal.classList.remove('show');
                    messageDiv.style.display = 'none';
                }, 3000);
            } else {
                messageDiv.className = 'form-message error';
                messageDiv.textContent = result.message;
            }
        });
    }

    modal.classList.add('show');
}

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
// CONTACT FORM WITH WEB3FORMS
// ========================================

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = document.getElementById('submitButton');
        const originalButtonText = submitButton.textContent;

        // Disable button and show loading state
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
                // Show success message
                showFormMessage('success', '¡Mensaje enviado exitosamente! Te contactaremos pronto.');
                contactForm.reset();

                // Track conversion event (Google Analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        event_category: 'Contact',
                        event_label: 'Contact Form'
                    });
                }
            } else {
                throw new Error(data.message || 'Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('error', 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo o contáctanos directamente.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

function showFormMessage(type, message) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-notification');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-notification ${type}`;
    messageDiv.innerHTML = `
        <div class="notification-content">
            ${type === 'success' ?
                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' :
                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
            }
            <span>${message}</span>
        </div>
    `;

    // Insert before form
    const form = document.getElementById('contactForm');
    form.parentElement.insertBefore(messageDiv, form);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

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
        showContactModal,
        openBookingModal,
        closeBookingModal
    };
}
