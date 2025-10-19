/**
 * LifetimeCounter Component - Shows total lifetime smiles in top-right corner
 */

export class LifetimeCounterComponent {
  constructor() {
    this.element = null;
  }

  render(lifetimeSmiles = 0) {
    this.element = document.createElement('div');
    this.element.className = 'lifetime-counter';
    
    this.element.innerHTML = `
      <div class="lifetime-counter-content">
        <div class="lifetime-counter-icon">😊</div>
        <div class="lifetime-counter-text">
          <div class="lifetime-counter-number">${lifetimeSmiles.toLocaleString()}</div>
          <div class="lifetime-counter-label">Total Smiles</div>
        </div>
      </div>
    `;

    this.addStyles();
    return this.element;
  }

  update(lifetimeSmiles) {
    if (this.element) {
      const numberElement = this.element.querySelector('.lifetime-counter-number');
      if (numberElement) {
        // Add animation when number changes
        numberElement.style.transform = 'scale(1.2)';
        numberElement.style.color = '#ff6b6b';
        
        setTimeout(() => {
          numberElement.textContent = lifetimeSmiles.toLocaleString();
          numberElement.style.transform = 'scale(1)';
          numberElement.style.color = '#333';
        }, 150);
      }
    }
  }

  addStyles() {
    const existingStyles = document.getElementById('lifetime-counter-styles');
    if (existingStyles) return;

    const styles = document.createElement('style');
    styles.id = 'lifetime-counter-styles';
    styles.textContent = `
      .lifetime-counter {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 12px 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
        cursor: default;
        user-select: none;
      }

      .lifetime-counter:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        background: rgba(255, 255, 255, 1);
      }

      .lifetime-counter-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .lifetime-counter-icon {
        font-size: 24px;
        animation: pulse 2s infinite;
      }

      .lifetime-counter-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .lifetime-counter-number {
        font-size: 18px;
        font-weight: 700;
        color: #333;
        line-height: 1;
        transition: all 0.3s ease;
      }

      .lifetime-counter-label {
        font-size: 11px;
        color: #666;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1;
        margin-top: 2px;
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .lifetime-counter {
          top: 70px;
          right: 15px;
          padding: 10px 12px;
        }

        .lifetime-counter-icon {
          font-size: 20px;
        }

        .lifetime-counter-number {
          font-size: 16px;
        }

        .lifetime-counter-label {
          font-size: 10px;
        }
      }

      /* Very small screens */
      @media (max-width: 480px) {
        .lifetime-counter {
          top: 60px;
          right: 10px;
          padding: 8px 10px;
        }

        .lifetime-counter-content {
          gap: 8px;
        }

        .lifetime-counter-icon {
          font-size: 18px;
        }

        .lifetime-counter-number {
          font-size: 14px;
        }

        .lifetime-counter-label {
          font-size: 9px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  remove() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}