// Contact Form Handler with Web3Forms
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.submitButton = document.getElementById('submitButton');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Disable button during submission
    this.submitButton.disabled = true;
    this.submitButton.innerHTML = '<span class="spinner"></span> Enviando...';

    const formData = new FormData(this.form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        this.showSuccess();
        this.form.reset();
      } else {
        this.showError('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = 'Enviar Mensaje';
    }
  }

  showSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" fill="#10B981"/>
        <path d="M16 24L22 30L32 18" stroke="white" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <h3>¡Mensaje Enviado!</h3>
      <p>Gracias por contactarnos. Te responderemos pronto.</p>
    `;

    this.form.parentElement.insertBefore(successMessage, this.form);
    this.form.style.display = 'none';

    setTimeout(() => {
      successMessage.remove();
      this.form.style.display = 'block';
    }, 5000);
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    this.form.insertBefore(errorDiv, this.submitButton);

    setTimeout(() => errorDiv.remove(), 5000);
  }
}

// Initialize form when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ContactForm());
} else {
  new ContactForm();
}
