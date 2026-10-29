/**
 * UIManager - Manages DOM overlays, HUD, modals, dialogs, notifications,
 * and multi-language support (pt-PT / en-US) for Net Yahoo.
 */
import { sounds } from '../audio/SoundManager.js';
import { Storage } from '../systems/Storage.js';
import { LEVELS } from '../levels/LevelData.js';
import { i18n } from '../systems/Localization.js';

export class UIManager {
  constructor(gameCallbacks) {
    this.callbacks = gameCallbacks; // { onStartLevel, onRestartLevel, onResume, onPause, onVirtualInput }
    this.currentLevel = null;
    this.toastTimer = null;
    this.hasStarted = false;

    this.cacheElements();
    this.bindEvents();
    this.applyTranslations();
    this.updateSoundButtons(Storage.isMuted());
  }

  cacheElements() {
    this.hud = document.getElementById('hud-overlay');
    this.hudLevelName = document.getElementById('hud-level-name');
    this.hudLevelSub = document.getElementById('hud-level-sub');
    this.hudTimer = document.getElementById('hud-timer');
    this.hudFragmentsBox = document.getElementById('hud-fragments-box');
    this.hudFragments = document.getElementById('hud-fragments');
    this.hudDeaths = document.getElementById('hud-deaths');
    this.hudAbility = document.getElementById('hud-ability');
    this.btnSoundHud = document.getElementById('btn-sound-hud');
    this.btnPauseHud = document.getElementById('btn-pause-hud');

    this.toastBanner = document.getElementById('toast-banner');
    this.interactionPrompt = document.getElementById('interaction-prompt');
    this.promptText = document.getElementById('prompt-text');

    // Modals
    this.screenPressStart = document.getElementById('screen-press-start');
    this.screenLangSelect = document.getElementById('screen-language-select');
    this.screenTitle = document.getElementById('screen-title');
    this.screenLevelSelect = document.getElementById('screen-level-select');
    this.screenControls = document.getElementById('screen-controls');
    this.screenCredits = document.getElementById('screen-credits');
    this.screenPause = document.getElementById('screen-pause');
    this.screenTerminal = document.getElementById('screen-terminal-dialog');
    this.terminalTitle = document.getElementById('terminal-dialog-title');
    this.terminalBody = document.getElementById('terminal-dialog-body');
    this.screenLevelComplete = document.getElementById('screen-level-complete');
    this.screenVictory = document.getElementById('screen-victory');

    // Press Start trigger
    this.pressStartTrigger = document.getElementById('press-start-trigger');

    // Language buttons
    this.btnLangPt = document.getElementById('btn-lang-pt');
    this.btnLangEn = document.getElementById('btn-lang-en');
    this.btnToggleLangTitle = document.getElementById('btn-toggle-lang-title');

    // Title buttons
    this.btnPlay = document.getElementById('btn-play');
    this.btnContinue = document.getElementById('btn-continue');
    this.btnLevelSelect = document.getElementById('btn-level-select');
    this.btnControls = document.getElementById('btn-controls');
    this.btnCredits = document.getElementById('btn-credits');
    this.btnToggleSoundTitle = document.getElementById('btn-toggle-sound-title');

    // Pause buttons
    this.btnResume = document.getElementById('btn-resume');
    this.btnRestartPause = document.getElementById('btn-restart-pause');
    this.btnControlsPause = document.getElementById('btn-controls-pause');
    this.btnCreditsPause = document.getElementById('btn-credits-pause');
    this.btnMenuPause = document.getElementById('btn-menu-pause');

    // Terminal button
    this.btnCloseTerminal = document.getElementById('btn-close-terminal');

    // Results buttons
    this.btnNextLevel = document.getElementById('btn-next-level');
    this.btnRetryLevel = document.getElementById('btn-retry-level');
    this.btnLevelsFromResults = document.getElementById('btn-levels-from-results');

    // Victory buttons
    this.btnVictoryReplay = document.getElementById('btn-victory-replay');
    this.btnVictoryMenu = document.getElementById('btn-victory-menu');

    // Level Select
    this.levelsGrid = document.getElementById('levels-grid-container');
    this.btnCloseLevels = document.getElementById('btn-close-levels');
  }

  bindEvents() {
    // 1. Press Any Key / Button to Start (triggers audio context initiation)
    const handlePressStart = () => {
      if (this.hasStarted) return;
      this.hasStarted = true;
      sounds.ensureContext();
      sounds.playJump();

      // Fade out press start and show language selection
      this.screenPressStart.classList.add('hidden');
      this.screenLangSelect.classList.remove('hidden');
    };

    if (this.screenPressStart) {
      this.screenPressStart.addEventListener('click', handlePressStart);
      this.screenPressStart.addEventListener('pointerdown', handlePressStart);
    }
    if (this.pressStartTrigger) {
      this.pressStartTrigger.addEventListener('click', handlePressStart);
      this.pressStartTrigger.addEventListener('pointerdown', handlePressStart);
    }
    window.addEventListener('keydown', () => {
      if (!this.hasStarted) handlePressStart();
    });
    window.addEventListener('pointerdown', () => {
      if (!this.hasStarted) handlePressStart();
    });

    // 2. Language Selection buttons
    this.btnLangPt.addEventListener('click', () => {
      sounds.playJsSwitch(2);
      this.setLanguage('pt');
      this.screenLangSelect.classList.add('hidden');
      this.screenTitle.classList.remove('hidden');
    });

    this.btnLangEn.addEventListener('click', () => {
      sounds.playJsSwitch(2);
      this.setLanguage('en');
      this.screenLangSelect.classList.add('hidden');
      this.screenTitle.classList.remove('hidden');
    });

    // Language Toggle from Title Screen
    this.btnToggleLangTitle.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      const nextLang = i18n.getLang() === 'pt' ? 'en' : 'pt';
      this.setLanguage(nextLang);
    });

    // Title buttons
    this.btnPlay.addEventListener('click', () => {
      sounds.playJsSwitch(2);
      this.callbacks.onStartLevel(1);
    });

    this.btnContinue.addEventListener('click', () => {
      sounds.playJsSwitch(2);
      const save = Storage.load();
      this.callbacks.onStartLevel(save.unlockedLevel || 1);
    });

    this.btnLevelSelect.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.openLevelSelect();
    });

    this.btnControls.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenControls.classList.remove('hidden');
    });

    document.getElementById('btn-close-controls').addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenControls.classList.add('hidden');
    });

    this.btnCredits.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenCredits.classList.remove('hidden');
    });

    document.getElementById('btn-close-credits').addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenCredits.classList.add('hidden');
    });

    this.btnCloseLevels.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenLevelSelect.classList.add('hidden');
    });

    // Sound Toggles
    const handleMute = () => {
      const isMuted = !Storage.isMuted();
      Storage.setMuted(isMuted);
      sounds.setMuted(isMuted);
      this.updateSoundButtons(isMuted);
      if (!isMuted) sounds.playJump();
    };

    this.btnSoundHud.addEventListener('click', handleMute);
    this.btnToggleSoundTitle.addEventListener('click', handleMute);

    // Pause HUD button
    this.btnPauseHud.addEventListener('click', () => {
      this.callbacks.onPause();
    });

    // Pause Menu buttons
    this.btnResume.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.callbacks.onResume();
    });

    this.btnRestartPause.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.hideAllModals();
      this.callbacks.onRestartLevel();
    });

    this.btnControlsPause.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenControls.classList.remove('hidden');
    });

    if (this.btnCreditsPause) {
      this.btnCreditsPause.addEventListener('click', () => {
        sounds.playJsSwitch(1);
        this.screenCredits.classList.remove('hidden');
      });
    }

    this.btnMenuPause.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.hideAllModals();
      this.showTitleScreen();
    });

    // Terminal Dialog Close
    this.btnCloseTerminal.addEventListener('click', () => {
      this.closeTerminal();
    });

    // Results Modal buttons
    this.btnNextLevel.addEventListener('click', () => {
      sounds.playJsSwitch(2);
      this.screenLevelComplete.classList.add('hidden');
      if (this.currentLevel && this.currentLevel.id < 6) {
        this.callbacks.onStartLevel(this.currentLevel.id + 1);
      } else {
        this.showVictoryScreen();
      }
    });

    this.btnRetryLevel.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenLevelComplete.classList.add('hidden');
      if (this.currentLevel) {
        this.callbacks.onStartLevel(this.currentLevel.id);
      }
    });

    this.btnLevelsFromResults.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenLevelComplete.classList.add('hidden');
      this.showTitleScreen();
    });

    // Victory buttons
    this.btnVictoryReplay.addEventListener('click', () => {
      sounds.playJsSwitch(2);
      this.screenVictory.classList.add('hidden');
      this.callbacks.onStartLevel(1);
    });

    this.btnVictoryMenu.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenVictory.classList.add('hidden');
      this.showTitleScreen();
    });

    // Virtual On-Screen Controls (Mouse & Touch)
    const bindVBtn = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;
      const setInput = (isDown) => {
        if (this.callbacks.onVirtualInput) {
          this.callbacks.onVirtualInput(key, isDown);
        }
      };
      ['pointerdown', 'mousedown', 'touchstart'].forEach(evt => {
        el.addEventListener(evt, (e) => {
          e.preventDefault();
          setInput(true);
        });
      });
      ['pointerup', 'mouseup', 'touchend', 'pointercancel', 'mouseleave'].forEach(evt => {
        el.addEventListener(evt, (e) => {
          e.preventDefault();
          setInput(false);
        });
      });
    };

    bindVBtn('vbtn-left', 'left');
    bindVBtn('vbtn-right', 'right');
    bindVBtn('vbtn-jump', 'jump');
    bindVBtn('vbtn-interact', 'interact');
  }

  setLanguage(lang) {
    i18n.setLang(lang);
    this.applyTranslations();
  }

  applyTranslations() {
    const isEn = i18n.getLang() === 'en';

    // Title (Main Menu)
    const titleTagline = document.getElementById('title-tagline');
    if (titleTagline) titleTagline.textContent = i18n.t('tagline');
    document.getElementById('lbl-btn-play').textContent = i18n.t('btnPlay');
    document.getElementById('lbl-btn-continue').textContent = i18n.t('btnContinue');
    document.getElementById('lbl-btn-levels').textContent = i18n.t('btnLevelSelect');
    document.getElementById('lbl-btn-controls').textContent = i18n.t('btnControls');
    document.getElementById('lbl-btn-credits').textContent = i18n.t('btnCredits');
    this.btnToggleLangTitle.textContent = isEn ? 'LANGUAGE: EN 🇬🇧' : 'IDIOMA: PT 🇵🇹';

    // Pause Modal
    document.getElementById('pause-heading').textContent = i18n.t('pauseTitle');
    document.getElementById('pause-tagline').textContent = i18n.t('pauseSub');
    document.getElementById('lbl-btn-resume').textContent = i18n.t('btnResume');
    document.getElementById('lbl-btn-restart').textContent = i18n.t('btnRestart');
    document.getElementById('lbl-btn-controls-pause').textContent = i18n.t('btnControls');
    const lblCreditsPause = document.getElementById('lbl-btn-credits-pause');
    if (lblCreditsPause) lblCreditsPause.textContent = i18n.t('btnCredits');
    document.getElementById('lbl-btn-menu-pause').textContent = i18n.t('btnMenu');

    // Controls Modal
    document.querySelector('#screen-controls .panel-heading').textContent = i18n.t('controlsTitle');
    const controlRows = document.querySelectorAll('#screen-controls .control-row .control-desc');
    if (controlRows.length >= 6) {
      controlRows[0].textContent = i18n.t('cMove');
      controlRows[1].textContent = i18n.t('cJump');
      controlRows[2].textContent = i18n.t('cInteract');
      controlRows[3].textContent = i18n.t('cSkills');
      controlRows[4].textContent = i18n.t('cRestart');
      controlRows[5].textContent = i18n.t('cPause');
    }
    const conceptsHeader = document.querySelector('#screen-controls .tutorial-lore-box h3');
    if (conceptsHeader) conceptsHeader.textContent = i18n.t('conceptsTitle');
    const conceptPs = document.querySelectorAll('#screen-controls .tutorial-lore-box p');
    if (conceptPs.length >= 3) {
      conceptPs[0].innerHTML = `<strong>HTML (Build):</strong> ${isEn ? 'Collect <> fragments to erect <div> platforms & bridges.' : 'Apanha fragmentos <> para erguer pontes e plataformas <div>.'}`;
      conceptPs[1].innerHTML = `<strong>CSS (Style):</strong> ${isEn ? 'Change rules at terminal to toggle elements between solid and ghost.' : 'Altera regras no terminal para transformar elementos entre sólido e fantasma.'}`;
      conceptPs[2].innerHTML = `<strong>JavaScript (Execute):</strong> ${isEn ? 'Solve async button sequences to unlock portals and destroy the virus!' : 'Resolve sequências assíncronas de botões para abrir portais e desativar o vírus!'}`;
    }
    document.getElementById('btn-close-controls').textContent = i18n.t('btnUnderstood');

    // Credits Modal
    document.getElementById('credits-heading').textContent = i18n.t('creditsTitle');
    document.getElementById('credits-team-heading').innerHTML = `<strong>${i18n.t('teamHeading')}</strong>`;
    const creditsStmt = document.getElementById('credits-team-statement');
    if (creditsStmt) creditsStmt.textContent = `"${i18n.t('teamStatement')}"`;
    document.getElementById('credits-jam-text').textContent = i18n.t('creditsSubtitle');
    document.getElementById('credits-lore-text').textContent = i18n.t('creditsLore');
    document.getElementById('credits-tech-text').innerHTML = `• ${isEn ? 'Phaser 3 Engine • Real-time Web Audio API • Procedural Canvas Pixel Art' : 'Motor Phaser 3 • Áudio Web Audio API sintetizado • Pixel Art em Canvas Procedural'}`;
    document.getElementById('btn-close-credits').textContent = i18n.t('btnClose');

    // Results Modal
    document.getElementById('results-title-text').textContent = i18n.t('resultsTitle');
    document.getElementById('lbl-star-1').textContent = i18n.t('star1');
    document.getElementById('lbl-star-2').textContent = i18n.t('star2');
    document.getElementById('lbl-star-3').textContent = i18n.t('star3');
    document.getElementById('lbl-stat-exec').textContent = i18n.t('execTime');
    document.getElementById('lbl-stat-target').textContent = i18n.t('targetTime');
    document.getElementById('lbl-stat-deaths').textContent = i18n.t('deaths');
    this.btnRetryLevel.textContent = i18n.t('btnRetry');
    this.btnLevelsFromResults.textContent = i18n.t('btnMenu');

    // Victory Screen (Final Credits)
    document.getElementById('victory-title-text').textContent = i18n.t('victoryTitle');
    document.getElementById('victory-sub-text').textContent = i18n.t('victorySubtitle');
    const victFinalCreditsHdr = document.getElementById('victory-final-credits-header');
    if (victFinalCreditsHdr) victFinalCreditsHdr.textContent = i18n.t('victoryCreditsTitle');
    const victStmt = document.getElementById('victory-statement');
    if (victStmt) victStmt.textContent = `"${i18n.t('victoryStatement')}"`;
    const victLore = document.getElementById('victory-lore-text');
    if (victLore) {
      victLore.innerHTML = `
        <p>${i18n.t('victoryLore')}</p>
        <p class="highlight-cyan"><strong>${isEn ? 'Thank you for your hard work! The system is saved!' : 'Obrigado pelo vosso trabalho! O sistema está a salvo!'}</strong></p>
      `;
    }
    document.getElementById('btn-victory-replay').textContent = i18n.t('btnPlayAgain');
    document.getElementById('btn-victory-menu').textContent = i18n.t('btnMenu');

    // Sound button text
    this.updateSoundButtons(Storage.isMuted());
  }

  updateSoundButtons(isMuted) {
    this.btnSoundHud.textContent = isMuted ? '🔇' : '🔊';
    this.btnToggleSoundTitle.textContent = isMuted ? i18n.t('soundMuted') : i18n.t('soundActive');
  }

  showTitleScreen() {
    this.hideAllModals();
    this.hud.classList.add('hidden');
    this.screenTitle.classList.remove('hidden');
  }

  hideAllModals() {
    this.screenPressStart.classList.add('hidden');
    this.screenLangSelect.classList.add('hidden');
    this.screenTitle.classList.add('hidden');
    this.screenLevelSelect.classList.add('hidden');
    this.screenControls.classList.add('hidden');
    this.screenCredits.classList.add('hidden');
    this.screenPause.classList.add('hidden');
    this.screenTerminal.classList.add('hidden');
    this.screenLevelComplete.classList.add('hidden');
    this.screenVictory.classList.add('hidden');
    this.hidePrompt();
  }

  openLevelSelect() {
    const save = Storage.load();
    const isEn = i18n.getLang() === 'en';
    this.levelsGrid.innerHTML = '';
    document.querySelector('#screen-level-select .panel-heading').textContent = i18n.t('levelSelectTitle');
    document.getElementById('btn-close-levels').textContent = i18n.t('btnBackMenu');

    LEVELS.forEach(lvl => {
      const isUnlocked = lvl.id <= (save.unlockedLevel || 1);
      const lvlData = save.levels[lvl.id] || { completed: false, stars: 0, bestTime: null };

      const card = document.createElement('div');
      card.className = `level-card ${isUnlocked ? '' : 'locked'}`;

      const starsDisplay = isUnlocked
        ? `${'★'.repeat(lvlData.stars || 0)}${'☆'.repeat(3 - (lvlData.stars || 0))}`
        : '🔒';

      const bestTimeText = lvlData.bestTime !== null
        ? `${i18n.t('bestTime')} ${lvlData.bestTime}s`
        : (isUnlocked ? i18n.t('toComplete') : i18n.t('locked'));

      const lvlName = isEn ? lvl.nameEn || lvl.name : lvl.name;
      const lvlSub = isEn ? lvl.subEn || lvl.subtitle : lvl.subtitle;

      card.innerHTML = `
        <div class="level-card-header">
          <span class="level-card-title">${lvlName}</span>
          <span class="level-card-stars">${starsDisplay}</span>
        </div>
        <div class="level-card-sub">${lvlSub}</div>
        <div class="level-card-best">${bestTimeText}</div>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          sounds.playJsSwitch(2);
          this.screenLevelSelect.classList.add('hidden');
          this.callbacks.onStartLevel(lvl.id);
        });
      }

      this.levelsGrid.appendChild(card);
    });

    this.screenLevelSelect.classList.remove('hidden');
  }

  startLevelHUD(levelConfig) {
    this.currentLevel = levelConfig;
    this.hideAllModals();
    this.hud.classList.remove('hidden');

    const isEn = i18n.getLang() === 'en';
    this.hudLevelName.textContent = isEn ? (levelConfig.nameEn || levelConfig.name) : levelConfig.name;
    this.hudLevelSub.textContent = isEn ? (levelConfig.subEn || levelConfig.subtitle) : levelConfig.subtitle;
    this.hudAbility.textContent = `${i18n.t('abilityPrefix')}: ${levelConfig.unlockedAbility}`;
    this.updateHUDStats(0, 0, 0, (levelConfig.htmlFragments || []).length);
  }

  updateHUDStats(timeSeconds, deaths, fragmentsCollected, fragmentsTotal) {
    const mins = Math.floor(timeSeconds / 60);
    const secs = Math.floor(timeSeconds % 60);
    const dec = Math.floor((timeSeconds % 1) * 10);
    const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${dec}`;
    this.hudTimer.textContent = timeFormatted;
    this.hudDeaths.textContent = String(deaths);

    if (fragmentsTotal > 0) {
      this.hudFragmentsBox.style.display = 'flex';
      this.hudFragments.textContent = `${fragmentsCollected} / ${fragmentsTotal}`;
    } else {
      this.hudFragmentsBox.style.display = 'none';
    }
  }

  showPrompt(text = 'INTERAGIR') {
    this.promptText.textContent = text;
    this.interactionPrompt.classList.remove('hidden');
  }

  hidePrompt() {
    this.interactionPrompt.classList.add('hidden');
  }

  showToast(message, durationMs = 2400) {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastBanner.textContent = message;
    this.toastBanner.classList.remove('hidden');
    this.toastTimer = setTimeout(() => {
      this.toastBanner.classList.add('hidden');
    }, durationMs);
  }

  openTerminal(title, message, onCloseCallback) {
    this.onTerminalCloseCallback = onCloseCallback;
    this.terminalTitle.textContent = title || 'TERMINAL';
    this.terminalBody.textContent = message || '';
    this.screenTerminal.classList.remove('hidden');
    sounds.playTone(600, 'sine', 0.1, 0.2);
  }

  closeTerminal() {
    this.screenTerminal.classList.add('hidden');
    if (this.onTerminalCloseCallback) {
      this.onTerminalCloseCallback();
      this.onTerminalCloseCallback = null;
    }
  }

  isTerminalOpen() {
    return !this.screenTerminal.classList.contains('hidden');
  }

  showPauseMenu() {
    this.screenPause.classList.remove('hidden');
  }

  hidePauseMenu() {
    this.screenPause.classList.add('hidden');
  }

  showLevelComplete(levelConfig, timeSeconds, deaths) {
    this.hidePrompt();
    sounds.playLevelComplete();

    let starsEarned = 1;
    if (deaths === 0) starsEarned++;
    if (timeSeconds <= levelConfig.targetTime) starsEarned++;

    Storage.saveLevelResult(levelConfig.id, starsEarned, timeSeconds, deaths);

    const isEn = i18n.getLang() === 'en';
    const lvlName = isEn ? (levelConfig.nameEn || levelConfig.name) : levelConfig.name;
    const lvlSub = isEn ? (levelConfig.subEn || levelConfig.subtitle) : levelConfig.subtitle;
    document.getElementById('results-level-name').textContent = `${lvlName} — ${lvlSub}`;
    
    document.getElementById('star-1').className = 'star earned';
    document.getElementById('star-2').className = `star ${deaths === 0 ? 'earned' : ''}`;
    document.getElementById('star-3').className = `star ${timeSeconds <= levelConfig.targetTime ? 'earned' : ''}`;

    const formatTime = (t) => {
      const m = Math.floor(t / 60);
      const s = Math.floor(t % 60);
      const d = Math.floor((t % 1) * 10);
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${d}`;
    };

    document.getElementById('results-time').textContent = `${formatTime(timeSeconds)} (${timeSeconds.toFixed(1)}s)`;
    document.getElementById('results-target-time').textContent = `< ${levelConfig.targetTime}s`;
    document.getElementById('results-deaths').textContent = String(deaths);

    if (levelConfig.id >= 6) {
      this.btnNextLevel.textContent = i18n.t('btnFinalVictory');
    } else {
      this.btnNextLevel.textContent = i18n.t('btnNextLevel');
    }

    this.screenLevelComplete.classList.remove('hidden');
  }

  showVictoryScreen() {
    this.hideAllModals();
    sounds.playVictory();

    const save = Storage.load();
    const isEn = i18n.getLang() === 'en';
    let totalStars = 0;
    let totalDeaths = 0;
    let totalBestTime = 0;

    Object.values(save.levels).forEach(lvl => {
      totalStars += (lvl.stars || 0);
      totalDeaths += (lvl.deaths || 0);
      if (lvl.bestTime) totalBestTime += lvl.bestTime;
    });

    const summaryBox = document.getElementById('victory-stats-summary');
    summaryBox.innerHTML = `
      <div><span class="highlight-cyan">${isEn ? 'TOTAL STARS:' : 'ESTRELAS:'}</span> ${totalStars} / 18 ★</div>
      <div><span class="highlight-cyan">${isEn ? 'TOTAL DEATHS:' : 'MORTES TOTAIS:'}</span> ${totalDeaths} 💀</div>
      <div><span class="highlight-cyan">${isEn ? 'TOTAL TIME:' : 'TEMPO TOTAL:'}</span> ${totalBestTime.toFixed(1)}s ⏱</div>
    `;

    this.screenVictory.classList.remove('hidden');
  }
}
