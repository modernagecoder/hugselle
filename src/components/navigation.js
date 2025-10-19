export class NavigationComponent {
  constructor() {
    this.element = null;
    this.aboutModal = null;
    this.mobileMenuOpen = false;
  }

  render() {
    const nav = document.createElement('nav');
    nav.className = 'navigation';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');

    nav.innerHTML = `
      <div class="nav-container">
        <div class="nav-brand">
          <h1 class="brand-text">Hugselle</h1>
        </div>
        
        <div class="nav-menu" id="nav-menu">
          <a href="/about" class="nav-link about-btn" aria-label="Learn about Hugselle">
            About
          </a>
        </div>
        
        <button class="nav-toggle" id="nav-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    `;

    this.element = nav;
    this.attachEventListeners();
    return nav;
  }

  attachEventListeners() {
    if (!this.element) return;

    // Mobile menu toggle
    const navToggle = this.element.querySelector('#nav-toggle');
    const navMenu = this.element.querySelector('#nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        navMenu.classList.toggle('nav-menu-open', this.mobileMenuOpen);
        navToggle.setAttribute('aria-expanded', this.mobileMenuOpen.toString());
      });
    }

    // Close mobile menu when clicking outside
    this.documentClickHandler = (e) => {
      if (this.mobileMenuOpen && !this.element.contains(e.target)) {
        this.closeMobileMenu();
      }
    };
    document.addEventListener('click', this.documentClickHandler);
  }

  closeMobileMenu() {
    const navMenu = this.element?.querySelector('#nav-menu');
    const navToggle = this.element?.querySelector('#nav-toggle');
    
    if (navMenu && navToggle) {
      this.mobileMenuOpen = false;
      navMenu.classList.remove('nav-menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  destroy() {
    // Clean up document click handler
    if (this.documentClickHandler) {
      document.removeEventListener('click', this.documentClickHandler);
      this.documentClickHandler = null;
    }
    
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}