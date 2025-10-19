/**
 * BrandingManager - Centralizes all Hugselle brand elements and messaging
 */

export class BrandingManager {
  static brandConfig = {
    name: "Hugselle",
    tagline: "Your Daily Dose of Happiness",
    description: "Discover instant joy with Hugselle - the happiness platform that brightens your day with uplifting quotes, positive vibes, and mood-boosting content.",
    colors: {
      primary: "#FF6B9D",
      secondary: "#C44569", 
      accent: "#FFC312",
      light: "#FFF5F7",
      dark: "#2C3E50"
    },
    voice: {
      tone: "warm, uplifting, encouraging",
      personality: "friendly, optimistic, caring",
      style: "conversational, positive, inspiring"
    },
    messaging: {
      welcome: "Welcome to Hugselle! 🌟",
      taglines: [
        "Your Daily Dose of Happiness",
        "Spreading Joy, One Smile at a Time",
        "Where Happiness Lives",
        "Instant Joy, Delivered Daily"
      ],
      callToActions: [
        "Start Your Happiness Journey",
        "Get Your Daily Dose of Joy",
        "Discover Your Smile",
        "Find Your Happy Moment"
      ]
    }
  };

  /**
   * Get the complete Hugselle brand configuration
   */
  static getHugselleBrandConfig() {
    return { ...this.brandConfig };
  }

  /**
   * Update all branding elements throughout the application
   */
  static updateAllBrandingElements() {
    // Update page title if it contains old branding
    if (document.title.includes('Make Me Smile')) {
      document.title = document.title.replace('Make Me Smile', this.brandConfig.name);
    }

    // Update any text content that might contain old branding
    this.updateTextContent('Make Me Smile', this.brandConfig.name);
    
    // Update meta tags with Hugselle branding
    this.updateMetaBranding();
    
    // Apply brand colors to CSS custom properties
    this.applyBrandColors();
    
    console.log('✅ All branding elements updated to Hugselle');
  }

  /**
   * Update text content throughout the DOM
   */
  static updateTextContent(oldText, newText) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
      if (node.textContent.includes(oldText)) {
        textNodes.push(node);
      }
    }

    textNodes.forEach(textNode => {
      textNode.textContent = textNode.textContent.replace(new RegExp(oldText, 'g'), newText);
    });
  }

  /**
   * Update meta tags with Hugselle branding
   */
  static updateMetaBranding() {
    // Update meta tags that might contain old branding
    const metaTags = document.querySelectorAll('meta[content*="Make Me Smile"]');
    metaTags.forEach(tag => {
      const content = tag.getAttribute('content');
      tag.setAttribute('content', content.replace(/Make Me Smile/g, this.brandConfig.name));
    });
  }

  /**
   * Apply brand colors to CSS custom properties
   */
  static applyBrandColors() {
    const root = document.documentElement;
    const colors = this.brandConfig.colors;
    
    // Update CSS custom properties with brand colors
    root.style.setProperty('--brand-primary', colors.primary);
    root.style.setProperty('--brand-secondary', colors.secondary);
    root.style.setProperty('--brand-accent', colors.accent);
    root.style.setProperty('--brand-light', colors.light);
    root.style.setProperty('--brand-dark', colors.dark);
  }

  /**
   * Get branded messaging for different contexts
   */
  static getBrandedMessage(type, context = 'default') {
    const messages = this.brandConfig.messaging;
    
    switch (type) {
      case 'welcome':
        return messages.welcome;
      
      case 'tagline':
        return context === 'random' 
          ? messages.taglines[Math.floor(Math.random() * messages.taglines.length)]
          : messages.taglines[0];
      
      case 'cta':
        return context === 'random'
          ? messages.callToActions[Math.floor(Math.random() * messages.callToActions.length)]
          : messages.callToActions[0];
      
      default:
        return messages.welcome;
    }
  }

  /**
   * Generate branded content for different components
   */
  static generateBrandedContent(componentType) {
    const content = {
      landing: {
        heading: this.brandConfig.name,
        subheading: this.brandConfig.tagline,
        buttonText: this.getBrandedMessage('cta', 'random'),
        description: this.brandConfig.description
      },
      
      loading: {
        title: `Welcome to ${this.brandConfig.name}!`,
        messages: [
          `${this.brandConfig.name} is preparing your happiness... 🌟`,
          "Gathering joy from around the world... 😊",
          "Sprinkling positivity into your day... ✨",
          "Almost ready to brighten your world... 💫",
          "Your daily dose of happiness is loading... 🌈",
          `${this.brandConfig.name} is ready to make you smile! 🎉`
        ]
      },
      
      quote: {
        shareText: `I just found my daily dose of happiness on ${this.brandConfig.name}! 😊`,
        encouragement: [
          `${this.brandConfig.name} hopes this brightened your day! 🌟`,
          "Spread the joy - share with someone who needs a smile! 💖",
          `Thanks for choosing ${this.brandConfig.name} for your happiness! ✨`
        ]
      },
      
      limit: {
        title: "You've reached your happiness limit!",
        message: `Come back tomorrow for more ${this.brandConfig.name} joy! We want to keep your smiles special. 💖`,
        encouragement: `${this.brandConfig.name} will be here waiting with fresh happiness! 🌟`
      }
    };

    return content[componentType] || content.landing;
  }

  /**
   * Validate brand consistency across the application
   */
  static validateBrandConsistency() {
    const issues = [];
    
    // Check for old branding in title
    if (document.title.includes('Make Me Smile')) {
      issues.push('Page title contains old branding');
    }
    
    // Check for old branding in meta tags
    const metaTags = document.querySelectorAll('meta[content*="Make Me Smile"]');
    if (metaTags.length > 0) {
      issues.push(`${metaTags.length} meta tags contain old branding`);
    }
    
    // Check for old branding in visible text
    const bodyText = document.body.textContent;
    if (bodyText.includes('Make Me Smile')) {
      issues.push('Visible content contains old branding');
    }
    
    if (issues.length === 0) {
      console.log('✅ Brand consistency validation passed');
      return true;
    } else {
      console.warn('⚠️ Brand consistency issues found:', issues);
      return false;
    }
  }

  /**
   * Initialize branding system
   */
  static init() {
    // Apply all branding updates
    this.updateAllBrandingElements();
    
    // Validate consistency
    this.validateBrandConsistency();
    
    console.log(`🎨 ${this.brandConfig.name} branding system initialized`);
  }

  /**
   * Get happiness-themed content for loading states
   */
  static getHappinessContent() {
    return {
      loadingMessages: [
        "Happiness is loading... 🌟",
        "Collecting smiles from around the world... 😊", 
        "Brewing the perfect dose of joy... ☕✨",
        "Gathering sunshine for your soul... 🌞",
        "Preparing magical moments just for you... 🪄",
        "Sprinkling fairy dust of positivity... ✨",
        "Warming up the happiness engine... 🚀",
        "Picking the brightest colors for your day... 🌈"
      ],
      
      progressMessages: [
        "Every second brings more joy... 💖",
        "Your happiness journey is beginning... 🚀", 
        "Positive vibes are on their way... 🌈",
        "Something wonderful is about to happen... ⭐",
        "The universe is conspiring to make you smile... 🌟",
        "Joy is just around the corner... 🎉"
      ],
      
      completionMessages: [
        `Welcome to ${this.brandConfig.name}! Ready to smile? 🎉`,
        "Your happiness has arrived! 🌟",
        "Time to brighten your world! ✨",
        "Let the joy begin! 💖",
        "Your daily dose of happiness is served! 🌈"
      ]
    };
  }
}