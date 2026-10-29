/**
 * Storage - Handles local persistence for unlocked levels, stars, best times, and settings.
 * Fails safely if localStorage is disabled or throws an exception.
 */
const STORAGE_KEY = 'ctrl_alt_escape_v1_save';

export class Storage {
  static defaultData() {
    const levels = {};
    for (let i = 1; i <= 16; i++) {
      levels[i] = { completed: false, stars: 0, bestTime: null, deaths: 0 };
    }
    return {
      unlockedLevel: 1,
      muted: false,
      musicMuted: false,
      sfxMuted: false,
      skin: 'default',
      lang: 'pt',
      levels
    };
  }

  static load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return Storage.defaultData();
      const parsed = JSON.parse(data);
      // Merge with default to guarantee structure
      const def = Storage.defaultData();
      return {
        unlockedLevel: Math.max(1, parsed.unlockedLevel || 1),
        muted: !!parsed.muted,
        musicMuted: !!parsed.musicMuted,
        sfxMuted: !!parsed.sfxMuted,
        skin: parsed.skin || 'default',
        lang: parsed.lang || 'pt',
        levels: { ...def.levels, ...(parsed.levels || {}) }
      };
    } catch (e) {
      console.warn('LocalStorage unavailable, running in-memory:', e);
      return Storage.defaultData();
    }
  }

  static save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  static getLevelData(levelId) {
    const data = Storage.load();
    return data.levels[levelId] || { completed: false, stars: 0, bestTime: null, deaths: 0 };
  }

  static saveLevelResult(levelId, stars, timeSeconds, deaths) {
    const data = Storage.load();
    const current = data.levels[levelId] || { completed: false, stars: 0, bestTime: null, deaths: 0 };

    const newStars = Math.max(current.stars || 0, stars);
    const newBestTime = (current.bestTime === null || timeSeconds < current.bestTime) 
      ? Math.round(timeSeconds * 100) / 100 
      : current.bestTime;

    data.levels[levelId] = {
      completed: true,
      stars: newStars,
      bestTime: newBestTime,
      deaths: (current.deaths || 0) + deaths
    };

    // Unlock next level if currently on highest
    if (levelId < 16 && data.unlockedLevel <= levelId) {
      data.unlockedLevel = levelId + 1;
    }

    Storage.save(data);
    return data.levels[levelId];
  }

  static isMuted() {
    return Storage.load().muted;
  }

  static setMuted(val) {
    const data = Storage.load();
    data.muted = !!val;
    Storage.save(data);
  }

  static isMusicMuted() {
    return Storage.load().musicMuted;
  }

  static setMusicMuted(val) {
    const data = Storage.load();
    data.musicMuted = !!val;
    Storage.save(data);
  }

  static isSfxMuted() {
    return Storage.load().sfxMuted;
  }

  static setSfxMuted(val) {
    const data = Storage.load();
    data.sfxMuted = !!val;
    Storage.save(data);
  }

  static getSkin() {
    return Storage.load().skin || 'default';
  }

  static setSkin(val) {
    const data = Storage.load();
    data.skin = val || 'default';
    Storage.save(data);
  }

  static getLang() {
    return Storage.load().lang || 'pt';
  }

  static setLang(val) {
    const data = Storage.load();
    data.lang = (val === 'en' ? 'en' : 'pt');
    Storage.save(data);
  }

  static resetProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    return Storage.defaultData();
  }
}
