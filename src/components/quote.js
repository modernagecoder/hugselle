import { SoundManager, SoundType } from '../modules/sounds.js';
import { ButtonUtils } from '../utils/button-utils.js';

export class QuoteComponent {
  constructor() {
    this.element = null;
    this.smileAgainCallback = null;
    this.shareCallback = null;
    this.currentQuote = null;
  }

  render(quote) {
    this.currentQuote = quote;

    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: var(--spacing-md);
    `;

    const card = document.createElement('div');
    card.className = 'quote-card';
    card.setAttribute('role', 'status');
    card.setAttribute('aria-live', 'polite');
    card.setAttribute('aria-atomic', 'true');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';

    const text = document.createElement('p');
    text.className = 'quote-text';
    text.textContent = quote.text;

    const smileAgainButton = document.createElement('button');
    smileAgainButton.className = 'action-button';
    smileAgainButton.textContent = 'Make Me Smile Again';
    smileAgainButton.setAttribute('aria-label', 'Get another smile');
    smileAgainButton.addEventListener('click', async () => {
      SoundManager.play(SoundType.DING);
      ButtonUtils.setLoading(smileAgainButton, true);
      
      if (this.smileAgainCallback) {
        await this.smileAgainCallback();
      }
      
      ButtonUtils.setLoading(smileAgainButton, false);
    });

    // Add press effect
    ButtonUtils.addPressEffect(smileAgainButton);

    const smileCounter = document.createElement('div');
    smileCounter.className = 'smile-counter';
    smileCounter.textContent = 'Loading...';

    card.appendChild(text);
    card.appendChild(smileAgainButton);
    card.appendChild(smileCounter);

    container.appendChild(card);

    // Smooth fade-in animation
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 50);

    // Add hover sound to quote
    card.addEventListener('mouseenter', () => {
      SoundManager.play(SoundType.CHIME);
    });

    this.element = container;
    return container;
  }

  onSmileAgain(callback) {
    this.smileAgainCallback = callback;
  }

  onShare(callback) {
    this.shareCallback = callback;
  }

  updateSmileCount(count) {
    if (this.element) {
      const counter = this.element.querySelector('.smile-counter');
      if (counter) {
        counter.textContent = `You've smiled ${count} time${count !== 1 ? 's' : ''} today!`;
      }
    }
  }

  getCurrentQuote() {
    return this.currentQuote;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
    this.smileAgainCallback = null;
    this.shareCallback = null;
    this.currentQuote = null;
  }
}
