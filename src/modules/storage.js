export const StorageKey = {
  SMILE_COUNT: 'hugselle_smile_count',
  LIFETIME_SMILES: 'hugselle_lifetime_smiles',
  LAST_RESET_DATE: 'hugselle_last_reset',
  SOUND_ENABLED: 'hugselle_sound_enabled',
  SELECTED_IDENTITY: 'hugselle_identity'
};

// In-memory fallback storage
const memoryStorage = new Map();

// Check if localStorage is available
let isLocalStorageAvailable = false;
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  isLocalStorageAvailable = true;
} catch (error) {
  console.warn('localStorage unavailable, using in-memory storage');
}

export const StorageManager = {
  get(key, defaultValue) {
    try {
      if (isLocalStorageAvailable) {
        const value = localStorage.getItem(key);
        return value !== null ? JSON.parse(value) : defaultValue;
      } else {
        return memoryStorage.has(key) ? memoryStorage.get(key) : defaultValue;
      }
    } catch (error) {
      console.error('Error reading from storage:', error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      if (isLocalStorageAvailable) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        memoryStorage.set(key, value);
      }
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  },

  remove(key) {
    try {
      if (isLocalStorageAvailable) {
        localStorage.removeItem(key);
      } else {
        memoryStorage.delete(key);
      }
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },

  clear() {
    try {
      if (isLocalStorageAvailable) {
        localStorage.clear();
      } else {
        memoryStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};
