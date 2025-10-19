// Import the comprehensive gender messages
import { messageCollections } from './messages-data.js';

// Convert gender messages to unified quote format
const quotes = [
  // Convert boys messages
  ...messageCollections.boys.map(msg => ({
    id: msg.id,
    text: msg.text,
    emoji: '',
    categories: ['boy', msg.category]
  })),

  // Convert girls messages  
  ...messageCollections.girls.map(msg => ({
    id: msg.id,
    text: msg.text,
    emoji: '',
    categories: ['girl', msg.category]
  }))
];

export const QuoteManager = {
  getAllQuotes() {
    return [...quotes];
  },

  getRandomQuote(excludeIds = [], identity = null) {
    let availableQuotes = quotes;

    // Filter by identity - REQUIRED, no fallback to general
    if (identity === 'boy') {
      availableQuotes = quotes.filter(q => q.categories.includes('boy'));
    } else if (identity === 'girl') {
      availableQuotes = quotes.filter(q => q.categories.includes('girl'));
    } else {
      // If no identity provided, return null or throw error
      console.warn('Identity (boy/girl) is required to get quotes');
      return null;
    }

    // Exclude already shown quotes
    availableQuotes = availableQuotes.filter(quote => !excludeIds.includes(quote.id));

    if (availableQuotes.length === 0) {
      // If all quotes have been excluded, reset and use quotes for that gender
      const genderQuotes = quotes.filter(q => q.categories.includes(identity));
      return genderQuotes[Math.floor(Math.random() * genderQuotes.length)];
    }

    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    return availableQuotes[randomIndex];
  },

  getQuotesByCategory(category) {
    return quotes.filter(quote => quote.categories.includes(category));
  },

  // New methods for standardized categories
  getQuotesByGenderAndCategory(gender, category) {
    return quotes.filter(quote =>
      quote.categories.includes(gender) && quote.categories.includes(category)
    );
  },

  getAvailableCategories() {
    const categories = new Set();
    quotes.forEach(quote => {
      quote.categories.forEach(cat => {
        if (cat !== 'boy' && cat !== 'girl') {
          categories.add(cat);
        }
      });
    });
    return Array.from(categories);
  },

  getQuoteStats() {
    const stats = {
      total: quotes.length,
      boys: quotes.filter(q => q.categories.includes('boy')).length,
      girls: quotes.filter(q => q.categories.includes('girl')).length,
      categories: {}
    };

    // Count by category
    this.getAvailableCategories().forEach(category => {
      stats.categories[category] = quotes.filter(q => q.categories.includes(category)).length;
    });

    return stats;
  }
};
