/**
 * SoundManager - Pure Web Audio API Synthesizer
 * No external audio files needed! Generates authentic retro chiptune sound effects.
 */
export class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.masterGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.muted ? 0 : 0.25;
        this.masterGain.connect(this.ctx.destination);
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  ensureContext() {
    if (!this.initialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.25, this.ctx.currentTime);
    }
    return this.muted;
  }

  playTone(freq, type = 'square', duration = 0.1, gainVal = 0.3, freqEnd = null) {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (freqEnd !== null) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, freqEnd), now + duration);
      }

      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Audio playback failed gracefully
    }
  }

  playJump() {
    this.playTone(160, 'square', 0.14, 0.25, 480);
  }

  playCollect() {
    this.playTone(587.33, 'sine', 0.08, 0.3, 880);
    setTimeout(() => {
      this.playTone(880, 'sine', 0.12, 0.35, 1174.66);
    }, 60);
  }

  playBuild() {
    this.playTone(220, 'triangle', 0.1, 0.3, 330);
    setTimeout(() => {
      this.playTone(330, 'triangle', 0.12, 0.35, 440);
      this.playTone(550, 'sine', 0.15, 0.2);
    }, 70);
  }

  playToggle() {
    this.playTone(300, 'sawtooth', 0.08, 0.25, 600);
    setTimeout(() => {
      this.playTone(450, 'sine', 0.12, 0.25, 200);
    }, 60);
  }

  playJsSwitch(index = 1) {
    const freqs = [523.25, 659.25, 783.99, 987.77];
    const freq = freqs[(index - 1) % freqs.length] || 523.25;
    this.playTone(freq, 'sine', 0.12, 0.35, freq * 1.15);
  }

  playJsSuccess() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((note, i) => {
      setTimeout(() => {
        this.playTone(note, 'triangle', 0.15, 0.3);
      }, i * 90);
    });
  }

  playJsFail() {
    this.playTone(180, 'sawtooth', 0.18, 0.35, 110);
    setTimeout(() => {
      this.playTone(130, 'sawtooth', 0.25, 0.4, 75);
    }, 120);
  }

  playHurt() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // White noise buffer for retro damage crunch
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.18);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.18);
    } catch (e) {
      this.playTone(90, 'sawtooth', 0.2, 0.3, 40);
    }
  }

  playLevelComplete() {
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'sine', 0.2, 0.3);
      }, i * 110);
    });
  }

  playVictory() {
    const melody = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51];
    melody.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'square', 0.25, 0.25);
      }, i * 140);
    });
  }
}

export const sounds = new SoundManager();
