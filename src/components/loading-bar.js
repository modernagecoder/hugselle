/**
 * LoadingBarComponent - Happiness-themed loading bar with 10-second duration
 */

import { BrandingManager } from '../modules/branding.js';

export class LoadingBarComponent {
  constructor(duration = 10000) {
    this.duration = duration;
    this.currentProgress = 0;
    this.element = null;
    this.progressBar = null;
    this.progressText = null;
    this.messageElement = null;
    this.animationId = null;
    this.startTime = null;
    this.onCompleteCallback = null;
    this.happinessContent = BrandingManager.getHappinessContent();
    this.currentMessageIndex = 0;
  }

  /**
   * Render the loading bar component
   */
  render() {
    this.element = document.createElement('div');
    this.element.className = 'happiness-loading-overlay';
    
    const container = document.createElement('div');
    container.className = 'happiness-loading-container';
    
    // Hugselle logo/title
    const title = document.createElement('h1');
    title.className = 'happiness-loading-title';
    title.textContent = BrandingManager.brandConfig.name;
    
    // Tagline
    const tagline = document.createElement('p');
    tagline.className = 'happiness-loading-tagline';
    tagline.textContent = BrandingManager.brandConfig.tagline;
    
    // Progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'happiness-progress-container';
    
    // Progress bar background
    const progressBg = document.createElement('div');
    progressBg.className = 'happiness-progress-bg';
    
    // Progress bar fill
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'happiness-progress-fill';
    
    // Progress percentage text
    this.progressText = document.createElement('div');
    this.progressText.className = 'happiness-progress-text';
    this.progressText.textContent = '0%';
    
    // Happiness message
    this.messageElement = document.createElement('div');
    this.messageElement.className = 'happiness-message';
    this.messageElement.textContent = this.happinessContent.loadingMessages[0];
    
    // Floating happiness icons
    const iconsContainer = document.createElement('div');
    iconsContainer.className = 'happiness-icons-container';
    this.createFloatingIcons(iconsContainer);
    
    // Assembly
    progressBg.appendChild(this.progressBar);
    progressContainer.appendChild(progressBg);
    progressContainer.appendChild(this.progressText);
    
    container.appendChild(title);
    container.appendChild(tagline);
    container.appendChild(progressContainer);
    container.appendChild(this.messageElement);
    container.appendChild(iconsContainer);
    
    this.element.appendChild(container);
    
    return this.element;
  }

  /**
   * Create floating happiness icons
   */
  createFloatingIcons(container) {
    const icons = ['🌟', '😊', '✨', '💖', '🌈', '🎉', '💫', '🌞'];
    
    for (let i = 0; i < 8; i++) {
      const icon = document.createElement('div');
      icon.className = 'floating-happiness-icon';
      icon.textContent = icons[i % icons.length];
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.animationDelay = `${Math.random() * 3}s`;
      icon.style.animationDuration = `${3 + Math.random() * 2}s`;
      container.appendChild(icon);
    }
  }

  /**
   * Start the progress animation
   */
  startProgress() {
    this.startTime = Date.now();
    this.currentProgress = 0;
    
    // Start the animation loop
    this.animateProgress();
    
    // Start message cycling
    this.startMessageCycling();
    
    return new Promise((resolve) => {
      this.onCompleteCallback = resolve;
    });
  }

  /**
   * Animate the progress bar
   */
  animateProgress() {
    const elapsed = Date.now() - this.startTime;
    const progress = Math.min((elapsed / this.duration) * 100, 100);
    
    this.updateProgress(progress);
    
    if (progress < 100) {
      this.animationId = requestAnimationFrame(() => this.animateProgress());
    } else {
      this.completeLoading();
    }
  }

  /**
   * Update progress bar and percentage
   */
  updateProgress(percentage) {
    this.currentProgress = percentage;
    
    // Update progress bar width
    this.progressBar.style.width = `${percentage}%`;
    
    // Update percentage text
    this.progressText.textContent = `${Math.round(percentage)}%`;
    
    // Add glow effect as progress increases
    const glowIntensity = percentage / 100;
    this.progressBar.style.boxShadow = `
      0 0 ${10 + glowIntensity * 20}px rgba(255, 107, 157, ${0.3 + glowIntensity * 0.4}),
      inset 0 0 ${5 + glowIntensity * 10}px rgba(255, 255, 255, ${0.2 + glowIntensity * 0.3})
    `;
    
    // Trigger milestone animations
    this.triggerMilestoneAnimations(percentage);
  }

  /**
   * Trigger special animations at progress milestones
   */
  triggerMilestoneAnimations(percentage) {
    const milestones = [25, 50, 75, 100];
    const currentMilestone = milestones.find(m => 
      percentage >= m && this.currentProgress < m
    );
    
    if (currentMilestone) {
      // Add celebration effect
      this.element.classList.add('milestone-celebration');
      setTimeout(() => {
        this.element.classList.remove('milestone-celebration');
      }, 500);
      
      // Create burst of happiness particles
      this.createHappinessBurst();
    }
  }

  /**
   * Create happiness particle burst
   */
  createHappinessBurst() {
    const particles = ['✨', '🌟', '💖', '😊'];
    const container = this.element.querySelector('.happiness-loading-container');
    
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'happiness-particle';
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.left = `${45 + Math.random() * 10}%`;
      particle.style.top = `${60 + Math.random() * 10}%`;
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    }
  }

  /**
   * Start cycling through happiness messages
   */
  startMessageCycling() {
    const messageInterval = this.duration / 6; // Change message every ~1.67 seconds
    
    const cycleMessages = () => {
      if (this.currentProgress < 100) {
        this.currentMessageIndex = (this.currentMessageIndex + 1) % this.happinessContent.loadingMessages.length;
        this.showMessage(this.happinessContent.loadingMessages[this.currentMessageIndex]);
        
        setTimeout(cycleMessages, messageInterval);
      }
    };
    
    setTimeout(cycleMessages, messageInterval);
  }

  /**
   * Show a specific message with animation
   */
  showMessage(message) {
    if (!this.messageElement) return;
    
    // Fade out current message
    this.messageElement.style.opacity = '0';
    this.messageElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      // Update message text
      this.messageElement.textContent = message;
      
      // Fade in new message
      this.messageElement.style.opacity = '1';
      this.messageElement.style.transform = 'translateY(0)';
    }, 200);
  }

  /**
   * Complete the loading process
   */
  completeLoading() {
    // Show completion message
    const completionMessage = this.happinessContent.completionMessages[
      Math.floor(Math.random() * this.happinessContent.completionMessages.length)
    ];
    this.showMessage(completionMessage);
    
    // Add completion animation
    this.element.classList.add('loading-complete');
    
    // Call completion callback after a brief delay
    setTimeout(() => {
      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    }, 1000);
  }

  /**
   * Set completion callback
   */
  onComplete(callback) {
    this.onCompleteCallback = callback;
  }

  /**
   * Destroy the component
   */
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.element && this.element.parentNode) {
      // Add fade out animation
      this.element.style.opacity = '0';
      this.element.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }, 300);
    }
    
    // Clean up references
    this.element = null;
    this.progressBar = null;
    this.progressText = null;
    this.messageElement = null;
    this.onCompleteCallback = null;
  }

  /**
   * Get current progress percentage
   */
  getProgress() {
    return this.currentProgress;
  }

  /**
   * Check if loading is complete
   */
  isComplete() {
    return this.currentProgress >= 100;
  }
}