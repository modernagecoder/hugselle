import { SoundManager, SoundType } from '../modules/sounds.js';
import { ButtonUtils } from '../utils/button-utils.js';

export class IdentityComponent {
  constructor() {
    this.element = null;
    this.selectCallback = null;
  }

  render() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'identity-title');
    overlay.style.opacity = '0';

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.opacity = '0';
    modal.style.transform = 'translateY(30px)';

    const title = document.createElement('h2');
    title.id = 'identity-title';
    title.className = 'modal-title';
    title.textContent = 'Wait! Before I make you smile… who are you?';

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'identity-options';

    const identities = [
      { value: 'boy', label: 'Boy' },
      { value: 'girl', label: 'Girl' }
    ];

    identities.forEach(identity => {
      const button = document.createElement('button');
      button.className = 'identity-button';
      button.textContent = identity.label;
      button.setAttribute('aria-label', `Select ${identity.value}`);

      button.addEventListener('mouseenter', () => {
        SoundManager.play(SoundType.GIGGLE);
      });

      button.addEventListener('click', async () => {
        SoundManager.play(SoundType.BELL);
        ButtonUtils.setLoading(button, true);
        
        if (this.selectCallback) {
          await this.selectCallback(identity.value);
        }
        
        ButtonUtils.setLoading(button, false);
      });

      // Add press effect
      ButtonUtils.addPressEffect(button);

      optionsContainer.appendChild(button);
    });

    modal.appendChild(title);
    modal.appendChild(optionsContainer);
    overlay.appendChild(modal);

    // Smooth fade-in animation
    setTimeout(() => {
      overlay.style.transition = 'opacity 0.3s ease';
      overlay.style.opacity = '1';
      
      modal.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      modal.style.opacity = '1';
      modal.style.transform = 'translateY(0)';
    }, 10);

    this.element = overlay;
    return overlay;
  }

  onIdentitySelect(callback) {
    this.selectCallback = callback;
  }

  async destroy() {
    if (this.element) {
      // Fade out animation
      this.element.style.transition = 'opacity 0.3s ease';
      this.element.style.opacity = '0';
      
      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, 300));
      
      this.element.remove();
      this.element = null;
    }
    this.selectCallback = null;
  }
}
