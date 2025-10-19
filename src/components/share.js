import { AnimationController } from '../modules/animations.js';

export class ShareComponent {
  constructor() {
    this.element = null;
    this.closeCallback = null;
  }

  render(quote) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'share-title');

    const modal = document.createElement('div');
    modal.className = 'modal';

    const title = document.createElement('h2');
    title.id = 'share-title';
    title.className = 'modal-title';
    title.textContent = 'Share the Happiness!';

    const shareOptions = document.createElement('div');
    shareOptions.className = 'share-options';

    const whatsappButton = document.createElement('button');
    whatsappButton.className = 'share-button';
    whatsappButton.textContent = 'WhatsApp';
    whatsappButton.setAttribute('aria-label', 'Share on WhatsApp');
    whatsappButton.addEventListener('click', () => {
      this.shareToWhatsApp(quote);
    });

    const twitterButton = document.createElement('button');
    twitterButton.className = 'share-button';
    twitterButton.textContent = 'X (Twitter)';
    twitterButton.setAttribute('aria-label', 'Share on X');
    twitterButton.addEventListener('click', () => {
      this.shareToTwitter(quote);
    });

    const instagramButton = document.createElement('button');
    instagramButton.className = 'share-button';
    instagramButton.textContent = 'Instagram';
    instagramButton.setAttribute('aria-label', 'Copy for Instagram');
    instagramButton.addEventListener('click', () => {
      this.shareToInstagram(quote);
    });

    const closeButton = document.createElement('button');
    closeButton.className = 'action-button';
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '1rem';
    closeButton.setAttribute('aria-label', 'Close share dialog');
    closeButton.addEventListener('click', () => {
      if (this.closeCallback) {
        this.closeCallback();
      }
    });

    shareOptions.appendChild(whatsappButton);
    shareOptions.appendChild(twitterButton);
    shareOptions.appendChild(instagramButton);

    modal.appendChild(title);
    modal.appendChild(shareOptions);
    modal.appendChild(closeButton);
    overlay.appendChild(modal);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && this.closeCallback) {
        this.closeCallback();
      }
    });

    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape' && this.closeCallback) {
        this.closeCallback();
      }
    };
    document.addEventListener('keydown', handleEscape);
    this.escapeHandler = handleEscape;

    // Animate modal open
    setTimeout(() => {
      AnimationController.playModalOpen(modal);
    }, 10);

    this.element = overlay;
    return overlay;
  }

  shareToWhatsApp(quote) {
    const text = encodeURIComponent(`${quote.text}\n\nMade me smile! Check out: ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  shareToTwitter(quote) {
    const text = encodeURIComponent(quote.text);
    const hashtags = encodeURIComponent('MakeMeSmile,SpreadJoy');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}&url=${url}`, '_blank');
  }

  shareToInstagram(quote) {
    // Instagram doesn't support URL sharing, so copy to clipboard
    const text = `${quote.text}\n\nMade me smile! Visit: ${window.location.href}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Quote copied to clipboard!\nPaste it in your Instagram post or story!');
      }).catch(() => {
        this.fallbackCopy(text);
      });
    } else {
      this.fallbackCopy(text);
    }
  }

  fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      alert('Quote copied to clipboard!\nPaste it in your Instagram post or story!');
    } catch (err) {
      alert('Could not copy text. Please copy manually:\n\n' + text);
    }
    
    document.body.removeChild(textarea);
  }

  onClose(callback) {
    this.closeCallback = callback;
  }

  destroy() {
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
    }
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
    this.closeCallback = null;
  }
}
