import { gsap } from 'gsap';

const icons = ['♥', '★', '✦', '◆', '●', '■', '▲', '◉'];
let floatingIconsContainer = null;

export const AnimationController = {
  playButtonClick(element) {
    return new Promise((resolve) => {
      element.classList.add('button-clicked');
      element.classList.add('glow');
      
      setTimeout(() => {
        element.classList.remove('button-clicked');
        element.classList.remove('glow');
        resolve();
      }, 300);
    });
  },

  playBackgroundPulse() {
    return new Promise((resolve) => {
      document.body.classList.add('background-pulse');
      
      setTimeout(() => {
        document.body.classList.remove('background-pulse');
        resolve();
      }, 500);
    });
  },

  playTypingAnimation(element, text) {
    return new Promise((resolve) => {
      element.innerHTML = '';
      
      const textSpan = document.createElement('div');
      textSpan.style.cssText = 'margin-bottom: 0.5rem;';
      element.appendChild(textSpan);
      
      const dotsSpan = document.createElement('div');
      dotsSpan.className = 'typing-dots';
      dotsSpan.innerHTML = '<span>.</span><span>.</span><span>.</span>';
      element.appendChild(dotsSpan);
      
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          textSpan.textContent += text[index];
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(resolve, 500);
        }
      }, 50);
    });
  },

  playQuoteFadeIn(element) {
    return new Promise((resolve) => {
      // Just add the CSS class, no GSAP animation
      element.classList.add('fade-in');
      // Resolve after animation completes
      setTimeout(resolve, 600);
    });
  },

  playFloatingIcons() {
    if (floatingIconsContainer) return;
    
    floatingIconsContainer = document.createElement('div');
    floatingIconsContainer.className = 'floating-icons-container';
    floatingIconsContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    `;
    
    // Create 8 floating icons
    for (let i = 0; i < 8; i++) {
      const iconElement = document.createElement('div');
      iconElement.className = 'floating-icon';
      iconElement.textContent = icons[i % icons.length];
      floatingIconsContainer.appendChild(iconElement);
    }
    
    document.body.insertBefore(floatingIconsContainer, document.body.firstChild);
  },

  stopFloatingIcons() {
    if (floatingIconsContainer) {
      floatingIconsContainer.remove();
      floatingIconsContainer = null;
    }
  },

  playModalOpen(element) {
    element.classList.add('slide-in');
  }
};
