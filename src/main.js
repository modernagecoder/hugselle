// Main application entry point
import './styles/main.css';
import './styles/animations.css';
import './styles/responsive.css';

// 🎯 SMILE LIMIT CONFIGURATION
// Change this single number to update the daily smile limit everywhere
const DAILY_SMILE_LIMIT = 100;

import { stateManager } from './modules/state.js';
import { QuoteManager } from './modules/quotes.js';
import { SoundManager, SoundType } from './modules/sounds.js';
import { AnimationController } from './modules/animations.js';
import { LandingComponent } from './components/landing.js';
import { IdentityComponent } from './components/identity.js';
import { QuoteComponent } from './components/quote.js';
import { ShareComponent } from './components/share.js';
import { NavigationComponent } from './components/navigation.js';
import { FooterComponent } from './components/footer.js';
import { LifetimeCounterComponent } from './components/lifetime-counter.js';

class App {
  constructor() {
    this.appElement = document.getElementById('app');
    this.appHeader = document.getElementById('app-header');
    this.appMain = document.getElementById('app-main');
    this.appFooter = document.getElementById('app-footer');
    this.currentComponent = null;
    this.currentQuoteComponent = null;
    this.usedQuoteIds = [];
    this.navigation = null;
    this.footer = null;
    this.lifetimeCounter = null;

    this.init();
  }

  async init() {
    // Initialize sound manager
    await SoundManager.init();

    // Set sound enabled from state
    const state = stateManager.getState();
    SoundManager.setEnabled(state.soundEnabled);

    // Subscribe to state changes
    stateManager.subscribe((state) => {
      this.handleStateChange(state);
    });

    // Render navigation and footer
    this.renderNavigation();
    this.renderFooter();

    // Initialize and render lifetime counter
    this.initLifetimeCounter();

    // Show landing screen
    this.showLanding();
  }

  renderNavigation() {
    this.navigation = new NavigationComponent();
    const navElement = this.navigation.render();
    this.appHeader.appendChild(navElement);
  }

  renderFooter() {
    this.footer = new FooterComponent();
    const footerElement = this.footer.render();
    this.appFooter.appendChild(footerElement);
  }

  initLifetimeCounter() {
    const state = stateManager.getState();
    this.lifetimeCounter = new LifetimeCounterComponent();
    const counterElement = this.lifetimeCounter.render(state.lifetimeSmiles || 0);
    document.body.appendChild(counterElement);
  }

  updateLifetimeCounter() {
    if (this.lifetimeCounter) {
      const state = stateManager.getState();
      this.lifetimeCounter.update(state.lifetimeSmiles || 0);
    }
  }

  showLanding() {
    this.clearCurrentComponent();

    const landing = new LandingComponent();
    const landingElement = landing.render();
    this.appMain.appendChild(landingElement);

    landing.onButtonClick(async () => {
      const button = landing.getButton();

      // Play animations and sound
      SoundManager.play(SoundType.DING);
      await AnimationController.playButtonClick(button);
      await AnimationController.playBackgroundPulse();

      // Show identity selection
      this.showIdentitySelection();
    });

    this.currentComponent = landing;
    stateManager.setState({ currentScreen: 'landing' });
  }

  showIdentitySelection() {
    const identity = new IdentityComponent();
    const identityElement = identity.render();
    this.appMain.appendChild(identityElement);

    identity.onIdentitySelect(async (selectedIdentity) => {
      stateManager.setState({ selectedIdentity });

      // Remove identity modal
      identity.destroy();

      // Show loading animation
      await this.showLoadingAnimation();

      // Show quote
      this.showQuote();
    });
  }

  async showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.style.opacity = '0';

    const loadingContent = document.createElement('div');
    loadingContent.className = 'loading-content';

    const spinner = document.createElement('div');
    spinner.className = 'spinner-container spinner-medium';
    const spinnerElement = document.createElement('div');
    spinnerElement.className = 'spinner';
    spinner.appendChild(spinnerElement);

    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Preparing your dose of happiness...';

    loadingContent.appendChild(spinner);
    loadingContent.appendChild(loadingText);
    loadingOverlay.appendChild(loadingContent);

    this.appMain.appendChild(loadingOverlay);

    // Fade in the loading overlay
    setTimeout(() => {
      loadingOverlay.style.transition = 'opacity 0.3s ease';
      loadingOverlay.style.opacity = '1';
    }, 10);

    // Show loading for a reasonable duration
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Fade out before removing
    loadingOverlay.style.opacity = '0';
    await new Promise(resolve => setTimeout(resolve, 300));

    loadingOverlay.remove();
  }

  showQuote() {
    this.clearCurrentComponent();

    const state = stateManager.getState();
    const newSmileCount = state.smileCount + 1;

    // Check if user has reached the limit
    if (newSmileCount > DAILY_SMILE_LIMIT) {
      this.showLimitMessage();
      return;
    }

    // Get random quote (excluding recently used ones)
    const quote = QuoteManager.getRandomQuote(this.usedQuoteIds, state.selectedIdentity);

    // Handle case where no identity is selected
    if (!quote) {
      console.error('No identity selected - cannot get quote');
      return;
    }

    this.usedQuoteIds.push(quote.id);

    // Keep only last 5 quotes in history to allow repeats eventually
    if (this.usedQuoteIds.length > 5) {
      this.usedQuoteIds.shift();
    }

    // Increment smile counter and lifetime smiles
    const currentLifetimeSmiles = state.lifetimeSmiles || 0;
    stateManager.setState({
      currentQuote: quote,
      smileCount: newSmileCount,
      lifetimeSmiles: currentLifetimeSmiles + 1,
      currentScreen: 'quote'
    });

    // Update lifetime counter display
    this.updateLifetimeCounter();

    const quoteComponent = new QuoteComponent();
    const quoteElement = quoteComponent.render(quote);
    this.appMain.appendChild(quoteElement);

    // Update smile counter display
    quoteComponent.updateSmileCount(newSmileCount);

    // Check if this is the last smile allowed
    const isLastSmile = newSmileCount >= DAILY_SMILE_LIMIT;

    quoteComponent.onSmileAgain(async () => {
      if (isLastSmile) {
        // Show limit message instead of new quote
        this.showLimitMessage();
      } else {
        // Show loading animation then new quote
        await this.showLoadingAnimation();
        this.showQuote();
      }
    });

    this.currentComponent = quoteComponent;
    this.currentQuoteComponent = quoteComponent;
  }

  showLimitMessage() {
    this.clearCurrentComponent();

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
    card.className = 'quote-card limit-message';
    card.style.opacity = '0';

    const title = document.createElement('h2');
    title.style.cssText = `
      font-size: 2rem;
      color: var(--color-dark);
      margin-bottom: 1.5rem;
      font-weight: 700;
    `;
    title.textContent = 'You\'ve reached your smile limit!';

    const message = document.createElement('p');
    message.style.cssText = `
      font-size: 1.3rem;
      color: var(--color-text-light);
      line-height: 1.8;
      margin-bottom: 2rem;
      text-align: center;
    `;
    message.textContent = 'Come back in 24 hours for more smiles. We want to keep them special!';

    const counter = document.createElement('div');
    counter.className = 'smile-counter';
    const state = stateManager.getState();
    counter.textContent = `You smiled ${state.smileCount} times today!`;

    card.appendChild(title);
    card.appendChild(message);
    card.appendChild(counter);
    container.appendChild(card);

    this.appMain.appendChild(container);

    // Fade in animation
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
    }, 10);

    this.currentComponent = {
      element: container,
      destroy: () => container.remove()
    };
  }

  showShareModal(quote) {
    const share = new ShareComponent();
    const shareElement = share.render(quote);
    this.appMain.appendChild(shareElement);

    share.onClose(() => {
      share.destroy();
    });
  }

  handleStateChange(state) {
    // Update quote component if it exists
    if (this.currentQuoteComponent && state.currentScreen === 'quote') {
      this.currentQuoteComponent.updateSmileCount(state.smileCount);
    }
  }

  clearCurrentComponent() {
    if (this.currentComponent) {
      this.currentComponent.destroy();
      this.currentComponent = null;
    }
  }
}

// Start the app
new App();
