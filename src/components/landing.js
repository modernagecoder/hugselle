import { ButtonUtils } from '../utils/button-utils.js';

export class LandingComponent {
  constructor() {
    this.element = null;
    this.buttonClickCallback = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'landing-screen';
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: var(--spacing-md);
      gap: var(--spacing-xl);
    `;

    const heading = document.createElement('h1');
    heading.className = 'heading';
    heading.textContent = 'Hey there! Ready to smile?';

    const button = document.createElement('button');
    button.className = 'main-button';
    button.setAttribute('aria-label', 'Click to make me smile');
    button.textContent = 'MAKE ME SMILE';

    button.addEventListener('click', async () => {
      if (this.buttonClickCallback) {
        await this.buttonClickCallback();
      }
    });

    // Add press effect
    ButtonUtils.addPressEffect(button);

    container.appendChild(heading);
    container.appendChild(button);

    this.element = container;
    return container;
  }

  onButtonClick(callback) {
    this.buttonClickCallback = callback;
  }

  getButton() {
    return this.element?.querySelector('.main-button');
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
    this.buttonClickCallback = null;
  }
}
