export class FooterComponent {
  constructor() {
    this.element = null;
  }

  render() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.setAttribute('role', 'contentinfo');

    footer.innerHTML = `
      <div class="footer-container">
        <div class="footer-content">
          <p class="footer-text">
            Hugselle made by 
            <a 
              href="https://www.modernagecoders.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="footer-link"
              aria-label="Visit Modern Age Coders website (opens in new tab)"
            >
              Modern Age Coders
            </a>
          </p>
        </div>
        
        <div class="footer-extra">
          <p class="footer-tagline">
            Spreading smiles, one line of code at a time ✨
          </p>
        </div>
      </div>
    `;

    this.element = footer;
    this.attachEventListeners();
    return footer;
  }

  attachEventListeners() {
    if (!this.element) return;

    const footerLink = this.element.querySelector('.footer-link');
    if (footerLink) {
      // Add click tracking or analytics if needed in the future
      footerLink.addEventListener('click', () => {
        // Optional: Add analytics tracking here
        console.log('Modern Age Coders link clicked');
      });
    }
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}