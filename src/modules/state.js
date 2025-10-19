import { StorageManager, StorageKey } from './storage.js';

const initialState = {
  currentScreen: 'landing',
  selectedIdentity: null,
  currentQuote: null,
  smileCount: 0,
  lifetimeSmiles: 0,
  soundEnabled: false,
  lastResetDate: new Date().toDateString()
};

class StateManager {
  constructor() {
    this.state = { ...initialState };
    this.subscribers = [];
    this.loadPersistedState();
    this.resetDailyCounter();
  }

  loadPersistedState() {
    this.state.smileCount = StorageManager.get(StorageKey.SMILE_COUNT, 0);
    this.state.lifetimeSmiles = StorageManager.get(StorageKey.LIFETIME_SMILES, 0);
    this.state.lastResetDate = StorageManager.get(StorageKey.LAST_RESET_DATE, new Date().toDateString());
    this.state.soundEnabled = StorageManager.get(StorageKey.SOUND_ENABLED, false);
    this.state.selectedIdentity = StorageManager.get(StorageKey.SELECTED_IDENTITY, null);
  }

  getState() {
    return { ...this.state };
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    
    // Persist certain state to localStorage
    if ('smileCount' in updates) {
      StorageManager.set(StorageKey.SMILE_COUNT, this.state.smileCount);
    }
    if ('lifetimeSmiles' in updates) {
      StorageManager.set(StorageKey.LIFETIME_SMILES, this.state.lifetimeSmiles);
    }
    if ('soundEnabled' in updates) {
      StorageManager.set(StorageKey.SOUND_ENABLED, this.state.soundEnabled);
    }
    if ('selectedIdentity' in updates) {
      StorageManager.set(StorageKey.SELECTED_IDENTITY, this.state.selectedIdentity);
    }
    if ('lastResetDate' in updates) {
      StorageManager.set(StorageKey.LAST_RESET_DATE, this.state.lastResetDate);
    }
    
    this.notifySubscribers();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.getState()));
  }

  resetDailyCounter() {
    const today = new Date().toDateString();
    if (this.state.lastResetDate !== today) {
      this.setState({
        smileCount: 0,
        lastResetDate: today
      });
    }
  }
}

export const stateManager = new StateManager();
