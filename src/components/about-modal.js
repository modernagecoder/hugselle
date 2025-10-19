export class AboutModalComponent {
  constructor() {
    this.element = null;
    this.closeCallback = null;
    this.isClosing = false;
  }

  render() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay about-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'about-modal-title');

    overlay.innerHTML = `
      <div class="modal about-modal" data-modal-content="true">
        <div class="modal-header">
          <h2 id="about-modal-title" class="modal-title">About Hugselle</h2>
          <button class="modal-close" type="button" aria-label="Close about modal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        
        <div class="modal-content">
          <div class="about-section">
            <h3 class="about-subtitle">Our Mission</h3>
            <p class="about-text">
              Hugselle is created by <strong>Modern Age Coders</strong>, dedicated to offering 
              coding and mathematics education to everyone. We believe that learning should be 
              accessible, engaging, and empowering for all.
            </p>
          </div>
          
          <div class="about-section">
            <h3 class="about-subtitle">Why Smiles Matter</h3>
            <p class="about-text">
              In this busy world, smiles are incredibly important. When life gets overwhelming 
              and you forget your smile, come to us and feel the joy again. Hugselle is your 
              daily dose of happiness, reminding you that even in the midst of learning and 
              growing, there's always a reason to smile.
            </p>
          </div>
          
          <div class="about-section">
            <h3 class="about-subtitle">What We Offer</h3>
            <ul class="about-list">
              <li>Comprehensive coding education for all skill levels</li>
              <li>Mathematics courses designed for practical application</li>
              <li>A supportive learning environment that celebrates progress</li>
              <li>Daily motivation and positivity to keep you inspired</li>
            </ul>
          </div>
        </div>
        
        <div class="modal-footer">
          <p class="about-footer-text">
            Ready to start your learning journey with a smile? 
            <br>Let Hugselle brighten your path to knowledge!
          </p>
        </div>
      </div>
    `;

    this.element = overlay;
    this.attachEventListeners();

    return overlay;
  }

  attachEventListeners() {
    if (!this.element || this.isClosing) return;

    // Close button - ONLY way to close the modal
    const closeButton = this.element.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.close();
      });
    }

    // Prevent clicks inside modal from propagating
    const modalContent = this.element.querySelector('[data-modal-content]');
    if (modalContent) {
      modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Focus management
    requestAnimationFrame(() => {
      const closeButton = this.element.querySelector('.modal-close');
      if (closeButton && !this.isClosing) {
        closeButton.focus();
      }
    });
  }

  onClose(callback) {
    this.closeCallback = callback;
  }

  close() {
    if (this.isClosing) return;

    this.isClosing = true;

    if (this.closeCallback) {
      this.closeCallback();
    }
  }

  destroy() {
    this.isClosing = true;

    if (this.element) {
      this.element.remove();
      this.element = null;
    }

    this.closeCallback = null;
  }
}