/**
 * SEOManager - Handles all SEO-related functionality for Hugselle
 */

export class SEOManager {
  static seoConfig = {
    siteName: "Hugselle",
    tagline: "Your Daily Dose of Happiness",
    description: "Discover instant joy with Hugselle - the happiness platform that brightens your day with uplifting quotes, positive vibes, and mood-boosting content.",
    keywords: [
      "hugselle", "happiness", "joy", "mood booster", "positive quotes", 
      "wellness", "mental health", "smile", "positivity",
      "daily motivation", "happiness platform", "uplifting content", "feel good"
    ],
    author: "Hugselle Team",
    url: "https://hugselle.com",
    image: "/og-image.jpg",
    twitterHandle: "@hugselle"
  };

  /**
   * Update meta tags dynamically
   */
  static updateMetaTags(config = {}) {
    const finalConfig = { ...this.seoConfig, ...config };
    
    // Update title
    if (finalConfig.title) {
      document.title = finalConfig.title;
      this.updateMetaTag('og:title', finalConfig.title);
      this.updateMetaTag('twitter:title', finalConfig.title);
    }
    
    // Update description
    if (finalConfig.description) {
      this.updateMetaTag('description', finalConfig.description);
      this.updateMetaTag('og:description', finalConfig.description);
      this.updateMetaTag('twitter:description', finalConfig.description);
    }
    
    // Update keywords
    if (finalConfig.keywords) {
      const keywordString = Array.isArray(finalConfig.keywords) 
        ? finalConfig.keywords.join(', ') 
        : finalConfig.keywords;
      this.updateMetaTag('keywords', keywordString);
    }
    
    // Update Open Graph image
    if (finalConfig.image) {
      this.updateMetaTag('og:image', finalConfig.image);
      this.updateMetaTag('twitter:image', finalConfig.image);
    }
  }

  /**
   * Update a specific meta tag
   */
  static updateMetaTag(name, content) {
    // Handle different meta tag types
    let selector;
    if (name.startsWith('og:')) {
      selector = `meta[property="${name}"]`;
    } else if (name.startsWith('twitter:')) {
      selector = `meta[name="${name}"]`;
    } else {
      selector = `meta[name="${name}"]`;
    }
    
    let metaTag = document.querySelector(selector);
    
    if (metaTag) {
      metaTag.setAttribute('content', content);
    } else {
      // Create new meta tag if it doesn't exist
      metaTag = document.createElement('meta');
      if (name.startsWith('og:')) {
        metaTag.setAttribute('property', name);
      } else {
        metaTag.setAttribute('name', name);
      }
      metaTag.setAttribute('content', content);
      document.head.appendChild(metaTag);
    }
  }

  /**
   * Generate structured data for the current page
   */
  static generateStructuredData(type = 'WebSite', additionalData = {}) {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": type,
      "name": this.seoConfig.siteName,
      "url": this.seoConfig.url,
      "description": this.seoConfig.description,
      "publisher": {
        "@type": "Organization",
        "name": this.seoConfig.siteName,
        "url": this.seoConfig.url
      }
    };

    const structuredData = { ...baseStructuredData, ...additionalData };
    
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);
    
    return structuredData;
  }

  /**
   * Optimize for social sharing
   */
  static optimizeForSocialSharing(config = {}) {
    const shareConfig = { ...this.seoConfig, ...config };
    
    // Ensure all required Open Graph tags are present
    this.updateMetaTag('og:type', shareConfig.type || 'website');
    this.updateMetaTag('og:url', shareConfig.url);
    this.updateMetaTag('og:site_name', shareConfig.siteName);
    this.updateMetaTag('og:locale', shareConfig.locale || 'en_US');
    
    // Ensure Twitter Card tags are present
    this.updateMetaTag('twitter:card', shareConfig.cardType || 'summary_large_image');
    this.updateMetaTag('twitter:site', shareConfig.twitterHandle);
    this.updateMetaTag('twitter:creator', shareConfig.twitterHandle);
    
    // Add image dimensions if provided
    if (shareConfig.imageWidth) {
      this.updateMetaTag('og:image:width', shareConfig.imageWidth);
    }
    if (shareConfig.imageHeight) {
      this.updateMetaTag('og:image:height', shareConfig.imageHeight);
    }
  }

  /**
   * Update page title with Hugselle branding
   */
  static updatePageTitle(title, includeBranding = true) {
    const finalTitle = includeBranding 
      ? `${title} | ${this.seoConfig.siteName} - ${this.seoConfig.tagline}`
      : title;
    
    document.title = finalTitle;
    this.updateMetaTag('og:title', finalTitle);
    this.updateMetaTag('twitter:title', finalTitle);
  }

  /**
   * Update meta description
   */
  static updateMetaDescription(description) {
    this.updateMetaTag('description', description);
    this.updateMetaTag('og:description', description);
    this.updateMetaTag('twitter:description', description);
  }

  /**
   * Initialize SEO for the current page
   */
  static init(pageConfig = {}) {
    // Update meta tags with page-specific config
    this.updateMetaTags(pageConfig);
    
    // Optimize for social sharing
    this.optimizeForSocialSharing(pageConfig);
    
    // Generate structured data
    this.generateStructuredData('WebSite', pageConfig.structuredData);
    
    // Add canonical URL if not present
    if (!document.querySelector('link[rel="canonical"]')) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = pageConfig.url || this.seoConfig.url;
      document.head.appendChild(canonical);
    }
  }

  /**
   * Track SEO performance (placeholder for analytics integration)
   */
  static trackSEOEvent(eventName, data = {}) {
    // This can be integrated with analytics platforms
    console.log(`SEO Event: ${eventName}`, data);
    
    // Example: Track when users interact with happiness content
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'SEO',
        event_label: 'Hugselle Happiness Platform',
        ...data
      });
    }
  }
}