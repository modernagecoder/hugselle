import { Howl } from 'howler';

export const SoundType = {
  DING: 'ding',
  GIGGLE: 'giggle',
  BELL: 'bell',
  POP: 'pop',
  CHIME: 'chime'
};

class SoundManagerClass {
  constructor() {
    this.sounds = null;
    this.enabled = false;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    try {
      // Create simple sound effects using Web Audio API oscillators
      // This avoids needing external audio files
      this.initialized = true;
    } catch (error) {
      console.warn('Sound initialization failed:', error);
    }
  }

  // Simple beep sound generator using Web Audio API
  playBeep(frequency = 800, duration = 0.1, type = 'sine') {
    if (!this.enabled) return;

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  play(soundName) {
    if (!this.enabled) return;

    switch (soundName) {
      case SoundType.DING:
        this.playBeep(800, 0.1, 'sine');
        break;
      case SoundType.GIGGLE:
        // Playful ascending notes
        this.playBeep(600, 0.08, 'sine');
        setTimeout(() => this.playBeep(800, 0.08, 'sine'), 80);
        break;
      case SoundType.BELL:
        // Bell-like sound
        this.playBeep(1000, 0.15, 'sine');
        setTimeout(() => this.playBeep(1200, 0.1, 'sine'), 50);
        break;
      case SoundType.POP:
        // Quick pop
        this.playBeep(400, 0.05, 'square');
        break;
      case SoundType.CHIME:
        // Gentle chime
        this.playBeep(900, 0.12, 'triangle');
        break;
      default:
        this.playBeep(800, 0.1, 'sine');
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  async preload() {
    await this.init();
  }
}

export const SoundManager = new SoundManagerClass();
