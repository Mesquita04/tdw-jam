/**
 * UIManager - Manages DOM overlays, HUD, modals, dialogs, notifications,
 * and multi-language support (pt-PT / en-US) for Net Yahoo.
 */
import { sounds } from '../audio/SoundManager.js';
import { Storage } from '../systems/Storage.js';
import { LEVELS } from '../levels/LevelData.js';
import { i18n } from '../systems/Localization.js';
import { TextureGenerator, SKINS_DATA } from '../graphics/TextureGenerator.js';

export class UIManager {
  constructor(gameCallbacks) {
    this.callbacks = gameCallbacks; // { onStartLevel, onRestartLevel, onResume, onPause, onVirtualInput, onChangeSkin }
    this.currentLevel = null;
    this.toastTimer = null;
    this.hasStarted = false;

    this.cacheElements();
    this.bindEvents();
    this.applyTranslations();
    this.updateSoundButtons(Storage.isMuted());
    this.updateAudioButtons();
    this.updateTelemetry();
    this.updateTitleCreditsButton();
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

    // Top-Right Level Hint Notification Card
    this.hudHintCard = document.getElementById('hud-hint-card');
    this.hintCardTitle = document.getElementById('hint-card-title');
    this.hintCardBody = document.getElementById('hint-card-body');
    this.hintCardTag = document.getElementById('hint-card-tag');
    this.hintCardSub = document.getElementById('hint-card-sub');
    this.btnToggleHint = document.getElementById('btn-toggle-hint');
    this.btnHintPill = document.getElementById('btn-hint-pill');
    this.hintPillText = document.getElementById('hint-pill-text');

    // Modals
    this.screenPressStart = document.getElementById('screen-press-start');
    this.screenLangSelect = document.getElementById('screen-language-select');
    this.screenTitle = document.getElementById('screen-title');
    this.screenOptions = document.getElementById('screen-options');
    this.screenLevelSelect = document.getElementById('screen-level-select');
    this.screenControls = document.getElementById('screen-controls');
    this.screenCredits = document.getElementById('screen-credits');
    this.screenPause = document.getElementById('screen-pause');
    this.screenTerminal = document.getElementById('screen-terminal-dialog');
    this.terminalTitle = document.getElementById('terminal-dialog-title');
    this.terminalBody = document.getElementById('terminal-dialog-body');
    this.screenLevelComplete = document.getElementById('screen-level-complete');
    this.screenWelcomeTdw = document.getElementById('screen-welcome-tdw');
    this.screenVictory = document.getElementById('screen-victory');

    // Game Over (Player Death) modal elements
    this.screenGameOver = document.getElementById('screen-game-over');
    this.btnGameOverRetry = document.getElementById('btn-game-over-retry');
    this.btnGameOverMenu = document.getElementById('btn-game-over-menu');
    this.lblGameOverLvlDisplay = document.getElementById('game-over-lvl-display');
    this.lblBtnGameOverRetry = document.getElementById('lbl-btn-game-over-retry');
    this.lblBtnGameOverMenu = document.getElementById('lbl-btn-game-over-menu');

    // Roll Down Final Credits elements
    this.screenRollCredits = document.getElementById('screen-roll-credits');
    this.rollCreditsContainer = document.getElementById('roll-credits-container');
    this.rollCreditsTitle = document.getElementById('roll-credits-title');
    this.rollCreditsBody = document.getElementById('roll-credits-body');
    this.rollCreditsHope = document.getElementById('roll-credits-hope');
    this.btnRollMainMenu = document.getElementById('btn-roll-main-menu');
    this.lblBtnRollMenu = document.getElementById('lbl-btn-roll-menu');
    this.btnEquipRoll = document.getElementById('btn-equip-coordinator-roll');
    this.lblEquipRoll = document.getElementById('lbl-equip-roll');
    this.canvasRewardRoll = document.getElementById('canvas-skin-reward-roll');

    // Welcome to TDW elements
    this.btnWelcomeTdwContinue = document.getElementById('btn-welcome-tdw-continue');
    this.welcomeTdwTitle = document.getElementById('welcome-tdw-title-text');
    this.welcomeTdwSubtitle = document.getElementById('welcome-tdw-subtitle-text');
    this.welcomeTdwLore = document.getElementById('welcome-tdw-lore-text');
    this.lblBtnWelcomeCredits = document.getElementById('lbl-btn-welcome-credits');

    // Unlocked Coordinator Skin Reward Elements
    this.btnEquipWelcome = document.getElementById('btn-equip-coordinator-welcome');
    this.btnEquipVictory = document.getElementById('btn-equip-coordinator-victory');
    this.canvasRewardWelcome = document.getElementById('canvas-skin-reward-welcome');
    this.canvasRewardVictory = document.getElementById('canvas-skin-reward-victory');
    this.lblEquipWelcome = document.getElementById('lbl-equip-welcome');
    this.lblEquipVictory = document.getElementById('lbl-equip-victory');

    // Press Start trigger
    this.pressStartTrigger = document.getElementById('press-start-trigger');

    // Language buttons
    this.btnLangPt = document.getElementById('btn-lang-pt');
    this.btnLangEn = document.getElementById('btn-lang-en');
    this.btnToggleLangTitle = document.getElementById('btn-toggle-lang-title');
    this.btnLangMenu = document.getElementById('btn-lang-menu');
    this.lblQuickLang = document.getElementById('lbl-quick-lang');

    // Title buttons
    this.btnPlay = document.getElementById('btn-play');
    this.btnContinue = document.getElementById('btn-continue');
    this.btnLevelSelect = document.getElementById('btn-level-select');
    this.btnOptions = document.getElementById('btn-options');
    this.btnControls = document.getElementById('btn-controls');
    this.btnCredits = document.getElementById('btn-credits');
    this.btnToggleSoundTitle = document.getElementById('btn-toggle-sound-title');

    // Options Modal elements
    this.btnCloseOptions = document.getElementById('btn-close-options');
    this.skinsGrid = document.getElementById('skins-grid-container');
    this.btnToggleMusic = document.getElementById('btn-toggle-music');
    this.btnToggleMusicTitle = document.getElementById('btn-toggle-music-title');
    this.lblMusicStatus = document.getElementById('lbl-music-status');
    this.lblQuickMusic = document.getElementById('lbl-quick-music');
    this.sliderMusicVolume = document.getElementById('slider-music-volume');
    this.lblMusicVolumeVal = document.getElementById('lbl-music-volume-val');

    this.btnToggleSfx = document.getElementById('btn-toggle-sfx');
    this.btnToggleSfxTitle = document.getElementById('btn-toggle-sfx-title');
    this.lblSfxStatus = document.getElementById('lbl-sfx-status');
    this.lblQuickSfx = document.getElementById('lbl-quick-sfx');

    this.btnToggleFullscreen = document.getElementById('btn-toggle-fullscreen');
    this.btnFullscreenHeader = document.getElementById('btn-fullscreen-header');
    this.btnWinFullscreen = document.getElementById('btn-win-fullscreen');
    this.lblFsHeader = document.getElementById('lbl-fs-header');
    this.lblFullscreenBtn = document.getElementById('lbl-fullscreen-btn');

    // Workstation Telemetry elements
    this.lblTelemUnlocked = document.getElementById('lbl-telem-unlocked');
    this.lblTelemSkin = document.getElementById('lbl-telem-skin');

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
    this.levelSelectOverviewBar = document.getElementById('level-select-overview-bar');
  }

  bindEvents() {
    // 1. First user interaction unlocks Web Audio & BGM
    const ensureAudioSession = () => {
      if (this.hasStarted) return;
      this.hasStarted = true;
      sounds.ensureContext();
      sounds.startBgm();
    };

    window.addEventListener('keydown', ensureAudioSession, { once: true });
    window.addEventListener('pointerdown', ensureAudioSession, { once: true });

    const handlePressStart = () => {
      ensureAudioSession();
      sounds.playJump();
      if (this.screenPressStart) this.screenPressStart.classList.add('hidden');
      if (this.screenLangSelect) this.screenLangSelect.classList.remove('hidden');
    };

    if (this.screenPressStart) {
      this.screenPressStart.addEventListener('click', handlePressStart);
      this.screenPressStart.addEventListener('pointerdown', handlePressStart);
    }
    if (this.pressStartTrigger) {
      this.pressStartTrigger.addEventListener('click', handlePressStart);
      this.pressStartTrigger.addEventListener('pointerdown', handlePressStart);
    }

    // 2. Language Selection buttons
    if (this.btnLangPt) {
      this.btnLangPt.addEventListener('click', () => {
        sounds.playJsSwitch(2);
        this.setLanguage('pt');
        this.screenLangSelect.classList.add('hidden');
        this.screenTitle.classList.remove('hidden');
      });
    }

    if (this.btnLangEn) {
      this.btnLangEn.addEventListener('click', () => {
        sounds.playJsSwitch(2);
        this.setLanguage('en');
        this.screenLangSelect.classList.add('hidden');
        this.screenTitle.classList.remove('hidden');
      });
    }

    // Language Toggle from Title Screen & Menu
    const toggleLanguageHandler = () => {
      ensureAudioSession();
      sounds.playJsSwitch(1);
      const nextLang = i18n.getLang() === 'pt' ? 'en' : 'pt';
      this.setLanguage(nextLang);
    };

    if (this.btnToggleLangTitle) this.btnToggleLangTitle.addEventListener('click', toggleLanguageHandler);
    if (this.btnLangMenu) this.btnLangMenu.addEventListener('click', toggleLanguageHandler);

    // Title buttons
    // 01. JOGAR / PLAY (Starts latest unlocked level or level 1)
    this.btnPlay.addEventListener('click', () => {
      ensureAudioSession();
      sounds.playJsSwitch(2);
      this.hideAllModals();
      const save = Storage.load();
      const isGameFinished = save.levels && save.levels[16] && save.levels[16].completed;
      const targetLvl = isGameFinished ? 1 : (save.unlockedLevel || 1);
      this.callbacks.onStartLevel(targetLvl, true);
    });

    if (this.btnContinue) {
      this.btnContinue.addEventListener('click', () => {
        ensureAudioSession();
        sounds.playJsSwitch(2);
        this.hideAllModals();
        const save = Storage.load();
        const isGameFinished = save.levels && save.levels[16] && save.levels[16].completed;
        const targetLvl = isGameFinished ? 1 : (save.unlockedLevel || 1);
        this.callbacks.onStartLevel(targetLvl, true);
      });
    }

    // 02. ESCOLHER NÍVEL / CHOOSE LEVEL
    this.btnLevelSelect.addEventListener('click', () => {
      ensureAudioSession();
      sounds.playJsSwitch(1);
      this.openLevelSelect();
    });

    // 03. OPÇÕES / OPTIONS (Skins, BGM, SFX, Fullscreen)
    if (this.btnOptions) {
      this.btnOptions.addEventListener('click', () => {
        ensureAudioSession();
        sounds.playJsSwitch(1);
        this.openOptionsModal();
      });
    }

    if (this.btnCloseOptions) {
      this.btnCloseOptions.addEventListener('click', () => {
        sounds.playJsSwitch(1);
        this.screenOptions.classList.add('hidden');
      });
    }

    // 05. CONTROLOS / CONTROLS
    if (this.btnControls) {
      this.btnControls.addEventListener('click', () => {
        ensureAudioSession();
        sounds.playJsSwitch(1);
        if (this.screenControls) this.screenControls.classList.remove('hidden');
      });
    }

    const btnCloseControls = document.getElementById('btn-close-controls');
    if (btnCloseControls) {
      btnCloseControls.addEventListener('click', () => {
        sounds.playJsSwitch(1);
        if (this.screenControls) this.screenControls.classList.add('hidden');
      });
    }

    // 06. CRÉDITOS FINAIS / CREDITS (Accessible after beating the game)
    if (this.btnCredits) {
      this.btnCredits.addEventListener('click', () => {
        ensureAudioSession();
        sounds.playJsSwitch(1);
        this.showRollCredits();
      });
    }

    const btnCloseCredits = document.getElementById('btn-close-credits');
    if (btnCloseCredits) {
      btnCloseCredits.addEventListener('click', () => {
        sounds.playJsSwitch(1);
        if (this.screenCredits) this.screenCredits.classList.add('hidden');
      });
    }

    if (this.btnCloseLevels) {
      this.btnCloseLevels.addEventListener('click', () => {
        sounds.playJsSwitch(1);
        if (this.screenLevelSelect) this.screenLevelSelect.classList.add('hidden');
      });
    }

    // Fullscreen Toggles
    const handleFullscreen = () => {
      sounds.playTone(550, 'triangle', 0.08, 0.2);
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };

    if (this.btnFullscreenHeader) this.btnFullscreenHeader.addEventListener('click', handleFullscreen);
    if (this.btnWinFullscreen) this.btnWinFullscreen.addEventListener('click', handleFullscreen);
    if (this.btnToggleFullscreen) this.btnToggleFullscreen.addEventListener('click', handleFullscreen);
    document.addEventListener('fullscreenchange', () => {
      this.updateFullscreenButtons();
    });

    // Audio Toggles: BGM Music
    const handleToggleMusic = () => {
      ensureAudioSession();
      const isMuted = !Storage.isMusicMuted();
      Storage.setMusicMuted(isMuted);
      sounds.setMusicMuted(isMuted);
      this.updateAudioButtons();
      if (!isMuted) {
        sounds.playTone(440, 'triangle', 0.1, 0.2);
      }
    };
    if (this.btnToggleMusic) this.btnToggleMusic.addEventListener('click', handleToggleMusic);
    if (this.btnToggleMusicTitle) this.btnToggleMusicTitle.addEventListener('click', handleToggleMusic);

    // Audio Slider: Music Volume
    if (this.sliderMusicVolume) {
      const handleVolumeChange = (e) => {
        const val = parseInt(e.target.value, 10);
        const norm = Math.max(0, Math.min(100, isNaN(val) ? 20 : val)) / 100;
        Storage.setMusicVolume(norm);
        sounds.setMusicVolume(norm);
        if (this.lblMusicVolumeVal) {
          this.lblMusicVolumeVal.textContent = `${Math.round(norm * 100)}%`;
        }
      };
      this.sliderMusicVolume.addEventListener('input', handleVolumeChange);
      this.sliderMusicVolume.addEventListener('change', handleVolumeChange);
    }

    // Audio Toggles: SFX Sound Effects
    const handleToggleSfx = () => {
      ensureAudioSession();
      const isMuted = !Storage.isSfxMuted();
      Storage.setSfxMuted(isMuted);
      sounds.setSfxMuted(isMuted);
      this.updateAudioButtons();
      if (!isMuted) {
        sounds.playJump();
      }
    };
    if (this.btnToggleSfx) this.btnToggleSfx.addEventListener('click', handleToggleSfx);
    if (this.btnToggleSfxTitle) this.btnToggleSfxTitle.addEventListener('click', handleToggleSfx);

    // Keyboard Shortcuts for Developer Workstation Menu and Modals
    window.addEventListener('keydown', (e) => {
      // Level complete: press ENTER to advance to next level or final victory
      if (this.screenLevelComplete && !this.screenLevelComplete.classList.contains('hidden')) {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.btnNextLevel.click();
          return;
        }
      }

      // Game over: press ENTER or R to play again, ESC to return to main menu
      if (this.screenGameOver && !this.screenGameOver.classList.contains('hidden')) {
        if (e.key === 'Enter' || e.key.toLowerCase() === 'r') {
          e.preventDefault();
          if (this.btnGameOverRetry) this.btnGameOverRetry.click();
          return;
        } else if (e.key === 'Escape') {
          e.preventDefault();
          if (this.btnGameOverMenu) this.btnGameOverMenu.click();
          return;
        }
      }

      // Roll down credits: press ENTER or ESC to return to main menu
      if (this.screenRollCredits && !this.screenRollCredits.classList.contains('hidden')) {
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          if (this.btnRollMainMenu) this.btnRollMainMenu.click();
          return;
        }
      }

      // Welcome to TDW: press ENTER to view final credits
      if (this.screenWelcomeTdw && !this.screenWelcomeTdw.classList.contains('hidden')) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (this.btnWelcomeTdwContinue) this.btnWelcomeTdwContinue.click();
          return;
        }
      }

      if (this.screenTitle && !this.screenTitle.classList.contains('hidden')) {
        // Ignore if a sub-modal is open on top
        if (!this.screenControls.classList.contains('hidden') ||
            !this.screenCredits.classList.contains('hidden') ||
            !this.screenLevelSelect.classList.contains('hidden') ||
            (this.screenOptions && !this.screenOptions.classList.contains('hidden'))) {
          return;
        }
        const k = e.key.toLowerCase();
        if (k === '1' || k === 'enter') {
          this.btnPlay.click();
        } else if (k === '2' || k === 'l') {
          this.btnLevelSelect.click();
        } else if (k === '3' || k === 'o') {
          if (this.btnOptions) this.btnOptions.click();
        } else if (k === '4' || k === 'g') {
          if (this.btnLangMenu) this.btnLangMenu.click();
        } else if (k === '5' || k === 'm') {
          this.btnControls.click();
        } else if (k === '6' || k === 'k') {
          if (this.btnCredits && !this.btnCredits.classList.contains('hidden')) {
            this.btnCredits.click();
          }
        }
      }
    });

    // Sound Toggles
    const handleMute = () => {
      const isMuted = !Storage.isMuted();
      Storage.setMuted(isMuted);
      sounds.setMuted(isMuted);
      this.updateSoundButtons(isMuted);
      if (!isMuted) sounds.playJump();
    };

    if (this.btnSoundHud) this.btnSoundHud.addEventListener('click', handleMute);
    if (this.btnToggleSoundTitle) this.btnToggleSoundTitle.addEventListener('click', handleMute);

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

    // Top-Right Level Hint Card minimize / expand toggles
    if (this.btnToggleHint) {
      this.btnToggleHint.addEventListener('click', (e) => {
        e.stopPropagation();
        sounds.playTone(300, 'sine', 0.05, 0.15);
        if (this.hudHintCard) this.hudHintCard.classList.add('hidden');
        if (this.btnHintPill) this.btnHintPill.classList.remove('hidden');
      });
    }

    if (this.btnHintPill) {
      this.btnHintPill.addEventListener('click', (e) => {
        e.stopPropagation();
        sounds.playTone(500, 'sine', 0.05, 0.2);
        if (this.hudHintCard) this.hudHintCard.classList.remove('hidden');
        if (this.btnHintPill) this.btnHintPill.classList.add('hidden');
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
      if (this.currentLevel && this.currentLevel.id < LEVELS.length) {
        this.callbacks.onStartLevel(this.currentLevel.id + 1, false);
      } else {
        this.showRollCredits();
      }
    });

    // Welcome to TDW Continue button -> advances to Final Credits (Victory Screen)
    if (this.btnWelcomeTdwContinue) {
      this.btnWelcomeTdwContinue.addEventListener('click', () => {
        sounds.playJsSwitch(2);
        if (this.screenWelcomeTdw) this.screenWelcomeTdw.classList.add('hidden');
        this.showVictoryScreen();
      });
    }

    this.btnRetryLevel.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenLevelComplete.classList.add('hidden');
      if (this.currentLevel) {
        this.callbacks.onStartLevel(this.currentLevel.id, false);
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
      this.callbacks.onStartLevel(1, true);
    });

    this.btnVictoryMenu.addEventListener('click', () => {
      sounds.playJsSwitch(1);
      this.screenVictory.classList.add('hidden');
      this.showTitleScreen();
    });

    // Game Over buttons
    if (this.btnGameOverRetry) {
      this.btnGameOverRetry.addEventListener('click', () => {
        sounds.playJsSwitch(2);
        if (this.screenGameOver) this.screenGameOver.classList.add('hidden');
        if (this.currentLevel) {
          this.callbacks.onStartLevel(this.currentLevel.id, false);
        } else {
          this.callbacks.onRestartLevel();
        }
      });
    }

    if (this.btnGameOverMenu) {
      this.btnGameOverMenu.addEventListener('click', () => {
        sounds.playJsSwitch(1);
        if (this.screenGameOver) this.screenGameOver.classList.add('hidden');
        this.showTitleScreen();
      });
    }

    // Roll Down Credits Menu button
    if (this.btnRollMainMenu) {
      this.btnRollMainMenu.addEventListener('click', () => {
        sounds.playJsSwitch(1);
        if (this.screenRollCredits) this.screenRollCredits.classList.add('hidden');
        this.showTitleScreen();
      });
    }

    // Equip Developer Coordenador Skin Buttons (from Welcome to TDW & Roll Credits)
    const handleEquipCoordinator = () => {
      Storage.unlockSkin('coordinator');
      Storage.setSkin('coordinator');
      sounds.playCollect();
      sounds.playVictory();
      if (this.callbacks && this.callbacks.onChangeSkin) {
        this.callbacks.onChangeSkin('coordinator');
      }
      this.updateCoordinatorEquipButtons();
      this.renderSkinsGrid();
      this.updateTelemetry();
      const isEn = i18n.getLang() === 'en';
      this.showToast(isEn ? 'SKIN EQUIPPED: COORDINATOR DEVELOPER!' : 'SKIN EQUIPADA: DEVELOPER COORDENADOR!', 3200);
    };

    if (this.btnEquipWelcome) this.btnEquipWelcome.addEventListener('click', handleEquipCoordinator);
    if (this.btnEquipVictory) this.btnEquipVictory.addEventListener('click', handleEquipCoordinator);
    if (this.btnEquipRoll) this.btnEquipRoll.addEventListener('click', handleEquipCoordinator);

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
    const lblPlay = document.getElementById('lbl-btn-play');
    if (lblPlay) lblPlay.textContent = i18n.t('btnPlay');
    const lblContinue = document.getElementById('lbl-btn-continue');
    if (lblContinue) lblContinue.textContent = i18n.t('btnContinue');
    const lblLevels = document.getElementById('lbl-btn-levels');
    if (lblLevels) lblLevels.textContent = i18n.t('btnLevelSelect');
    const lblOptions = document.getElementById('lbl-btn-options');
    if (lblOptions) lblOptions.textContent = i18n.t('btnOptions');
    const lblLangMenu = document.getElementById('lbl-btn-lang-menu');
    if (lblLangMenu) lblLangMenu.textContent = isEn ? 'LANGUAGE (IDIOMA)' : 'IDIOMA (LANGUAGE)';
    const lblControls = document.getElementById('lbl-btn-controls');
    if (lblControls) lblControls.textContent = i18n.t('btnControls');
    const lblCredits = document.getElementById('lbl-btn-credits');
    if (lblCredits) lblCredits.textContent = i18n.t('btnCredits');
    if (this.lblQuickLang) {
      this.lblQuickLang.textContent = isEn ? '[LOCALE: EN]' : '[LOCALE: PT]';
    }

    // Command item subtitles
    const descPlay = document.getElementById('lbl-btn-play-desc');
    const descContinue = document.getElementById('lbl-btn-continue-desc');
    const descLevels = document.getElementById('lbl-btn-levels-desc');
    const descOptions = document.getElementById('lbl-btn-options-desc');
    const descLangMenu = document.getElementById('lbl-btn-lang-menu-desc');
    const descControls = document.getElementById('lbl-btn-controls-desc');
    const descCredits = document.getElementById('lbl-btn-credits-desc');

    if (descPlay) descPlay.textContent = isEn ? 'Start a new Kernel debugging session' : 'Iniciar nova sessão de depuração do Kernel';
    if (descContinue) descContinue.textContent = isEn ? 'Resume from last recorded checkpoint' : 'Retomar a partir do último checkpoint gravado';
    if (descLevels) descLevels.textContent = i18n.t('btnChooseLevelDesc');
    if (descOptions) descOptions.textContent = i18n.t('btnOptionsDesc');
    if (descLangMenu) descLangMenu.textContent = isEn ? 'Toggle between English 🇬🇧 and Portuguese 🇵🇹' : 'Alternar entre Português 🇵🇹 e English 🇬🇧';
    if (descControls) descControls.textContent = isEn ? 'Developer command manual & mechanics' : 'Manual de comandos do programador e mecânicas';
    if (descCredits) descCredits.textContent = isEn ? 'Net Yahoo (Francisco Mesquita & Gonçalo Abreu)' : 'Net Yahoo (Francisco Mesquita & Gonçalo Abreu)';

    const lblTelem = document.getElementById('lbl-telem-title');
    if (lblTelem) lblTelem.innerHTML = `<span class="term-sym">&gt;_</span> ${isEn ? 'SYSTEM TELEMETRY' : 'TELEMETRIA DO SISTEMA'}`;
    const lblStatus = document.getElementById('lbl-telem-status');
    if (lblStatus) lblStatus.textContent = isEn ? 'GLITCH DETECTED' : 'GLITCH DETETADO';

    // Options Modal Translations
    const optHeading = document.getElementById('lbl-options-heading') || document.getElementById('options-modal-heading');
    if (optHeading) optHeading.textContent = i18n.t('optionsTitle');
    const lblOptSkins = document.getElementById('lbl-opt-skins');
    if (lblOptSkins) lblOptSkins.textContent = i18n.t('optionsSkins');
    const lblOptAudio = document.getElementById('lbl-opt-audio');
    if (lblOptAudio) lblOptAudio.textContent = i18n.t('optionsAudio');
    const lblOptDisplay = document.getElementById('lbl-opt-display');
    if (lblOptDisplay) lblOptDisplay.textContent = i18n.t('optionsDisplay');
    const btnCloseOpt = document.getElementById('btn-close-options');
    if (btnCloseOpt) btnCloseOpt.textContent = i18n.t('btnBackMenu');
    const lblBgmTitle = document.getElementById('lbl-bgm-title');
    if (lblBgmTitle) lblBgmTitle.textContent = isEn ? 'Background Music (BGM)' : 'Música de Fundo (BGM)';
    const lblBgmSub = document.getElementById('lbl-bgm-sub');
    if (lblBgmSub) lblBgmSub.textContent = isEn ? 'AIHB-8BIT Retro Soundtrack' : 'Banda sonora retro AIHB-8BIT';
    const lblVolumeTitle = document.getElementById('lbl-volume-title');
    if (lblVolumeTitle) lblVolumeTitle.textContent = i18n.t('volumeTitle');
    const lblVolumeSub = document.getElementById('lbl-volume-sub');
    if (lblVolumeSub) lblVolumeSub.textContent = i18n.t('volumeSub');
    const lblSfxTitle = document.getElementById('lbl-sfx-title');
    if (lblSfxTitle) lblSfxTitle.textContent = isEn ? 'Sound Effects (SFX)' : 'Efeitos Sonoros (SFX)';
    const lblSfxSub = document.getElementById('lbl-sfx-sub');
    if (lblSfxSub) lblSfxSub.textContent = isEn ? 'Jumps, collectibles, builds, errors & terminals' : 'Saltos, recolha, blocos, erros e consolas';

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
    if (controlRows.length >= 7) {
      controlRows[0].textContent = i18n.t('cMove');
      controlRows[1].textContent = i18n.t('cJump');
      controlRows[2].textContent = i18n.t('cInteract');
      controlRows[3].textContent = i18n.t('cSkills');
      controlRows[4].textContent = i18n.t('cAiDispatch');
      controlRows[5].textContent = i18n.t('cRestart');
      controlRows[6].textContent = i18n.t('cPause');
    }
    const conceptsHeader = document.querySelector('#screen-controls .tutorial-lore-box h3');
    if (conceptsHeader) conceptsHeader.textContent = i18n.t('conceptsTitle');
    const conceptPs = document.querySelectorAll('#screen-controls .tutorial-lore-box p');
    if (conceptPs.length >= 5) {
      conceptPs[0].innerHTML = `<strong>HTML (Build):</strong> ${isEn ? 'Collect <> fragments to erect <div> platforms & bridges.' : 'Apanha fragmentos <> para erguer pontes e plataformas <div>.'}`;
      conceptPs[1].innerHTML = `<strong>CSS (Style):</strong> ${isEn ? 'Change rules at terminal to toggle elements between solid and ghost.' : 'Altera regras no terminal para transformar elementos entre sólido e fantasma.'}`;
      conceptPs[2].innerHTML = `<strong>JavaScript (Execute):</strong> ${isEn ? 'Solve async button sequences to unlock portals and destroy the virus!' : 'Resolve sequências assíncronas de botões para abrir portais e desativar o vírus!'}`;
      conceptPs[3].innerHTML = `<strong>Testes & QA:</strong> ${isEn ? 'Dodge bug error projectiles and run npm test --fix at the terminal!' : 'Esquiva-te dos erros disparados pelo bug e corre npm test --fix no terminal!'}`;
      conceptPs[4].innerHTML = `<strong>IA & Copilot:</strong> ${isEn ? 'Gather neural training tokens for your AI Copilot drone to infer solid bridges!' : 'Recolhe tokens de treino para o teu AI Copilot projetar pontes de inferência!'}`;
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

    // Welcome to TDW Celebration Modal
    if (this.welcomeTdwTitle) this.welcomeTdwTitle.textContent = i18n.t('welcomeTdwTitle');
    if (this.welcomeTdwSubtitle) this.welcomeTdwSubtitle.textContent = i18n.t('welcomeTdwSubtitle');
    if (this.welcomeTdwLore) this.welcomeTdwLore.textContent = i18n.t('welcomeTdwLore');
    if (this.lblBtnWelcomeCredits) this.lblBtnWelcomeCredits.textContent = i18n.t('btnWelcomeCredits');

    // Unlocked Developer Coordenador Reward text
    const welcomeSkinTitle = document.getElementById('welcome-skin-unlocked-title');
    if (welcomeSkinTitle) welcomeSkinTitle.textContent = i18n.t('skinUnlockedTitle');
    const welcomeSkinName = document.getElementById('welcome-skin-name');
    if (welcomeSkinName) welcomeSkinName.textContent = i18n.t('skinCoordinatorName');

    const victorySkinTitle = document.getElementById('victory-skin-unlocked-title');
    if (victorySkinTitle) victorySkinTitle.textContent = i18n.t('skinUnlockedTitle');
    const victorySkinName = document.getElementById('victory-skin-name');
    if (victorySkinName) victorySkinName.textContent = i18n.t('skinCoordinatorName');

    const rollSkinTitle = document.getElementById('roll-skin-unlocked-title');
    if (rollSkinTitle) rollSkinTitle.textContent = i18n.t('skinUnlockedTitle');
    const rollSkinName = document.getElementById('roll-skin-name');
    if (rollSkinName) rollSkinName.textContent = i18n.t('skinCoordinatorName');

    // Game Over Modal (Minimal)
    if (this.lblBtnGameOverRetry) this.lblBtnGameOverRetry.textContent = isEn ? 'PLAY AGAIN' : 'JOGAR NOVAMENTE';
    if (this.lblBtnGameOverMenu) this.lblBtnGameOverMenu.textContent = i18n.t('btnGameOverMenu');

    // Roll Down Final Credits Modal
    if (this.rollCreditsTitle) this.rollCreditsTitle.textContent = i18n.t('rollCreditsTitle');
    if (this.rollCreditsBody) {
      this.rollCreditsBody.innerHTML = isEn
        ? `This game was developed by <strong>Net Yahoo</strong>, a team formed by <strong>Francisco Mesquita</strong> and <strong>Gonçalo Abreu</strong> to compete in the 1st edition of the <strong>TDW Jam - WEB GAME CHALLENGE 24H</strong>.`
        : `Este jogo foi desenvolvido pelos <strong>Net Yahoo</strong>, equipa composta pelo <strong>Francisco Mesquita</strong> e <strong>Gonçalo Abreu</strong> para competir na 1ª edição da <strong>TDW Jam - WEB GAME CHALLENGE 24H</strong>.`;
    }
    if (this.rollCreditsHope) this.rollCreditsHope.textContent = i18n.t('rollCreditsHope');
    if (this.lblBtnRollMenu) this.lblBtnRollMenu.textContent = i18n.t('btnRollMenu');

    this.updateCoordinatorEquipButtons();

    // Sound button text
    this.updateSoundButtons(Storage.isMuted());
    this.updateAudioButtons();
    this.updateFullscreenButtons();
    this.updateTelemetry();
    this.renderSkinsGrid();

    // Update active level HUD and hint if playing
    if (this.currentLevel) {
      this.hudLevelName.textContent = isEn ? (this.currentLevel.nameEn || this.currentLevel.name) : this.currentLevel.name;
      this.hudLevelSub.textContent = isEn ? (this.currentLevel.subEn || this.currentLevel.subtitle) : this.currentLevel.subtitle;
      this.showLevelHint(this.currentLevel);
    }
  }

  updateSoundButtons(isMuted) {
    if (this.btnSoundHud) this.btnSoundHud.textContent = isMuted ? '🔇' : '🔊';
    if (this.btnToggleSoundTitle) this.btnToggleSoundTitle.textContent = isMuted ? i18n.t('soundMuted') : i18n.t('soundActive');
  }

  updateAudioButtons() {
    const musicMuted = Storage.isMusicMuted();
    const sfxMuted = Storage.isSfxMuted();
    const isEn = i18n.getLang() === 'en';

    if (this.btnToggleMusic && this.lblMusicStatus) {
      this.btnToggleMusic.className = `cyber-btn toggle-btn ${musicMuted ? 'muted' : 'active'}`;
      this.lblMusicStatus.textContent = musicMuted ? i18n.t('musicOff') : i18n.t('musicOn');
    }
    if (this.lblQuickMusic) {
      this.lblQuickMusic.textContent = musicMuted ? (isEn ? '[BGM: OFF]' : '[MÚSICA: OFF]') : (isEn ? '[BGM: ON]' : '[MÚSICA: ON]');
    }

    const vol = Math.round(Storage.getMusicVolume() * 100);
    if (this.sliderMusicVolume) {
      this.sliderMusicVolume.value = vol;
    }
    if (this.lblMusicVolumeVal) {
      this.lblMusicVolumeVal.textContent = `${vol}%`;
    }

    if (this.btnToggleSfx && this.lblSfxStatus) {
      this.btnToggleSfx.className = `cyber-btn toggle-btn ${sfxMuted ? 'muted' : 'active'}`;
      this.lblSfxStatus.textContent = sfxMuted ? i18n.t('sfxOff') : i18n.t('sfxOn');
    }
    if (this.lblQuickSfx) {
      this.lblQuickSfx.textContent = sfxMuted ? '[SFX: OFF]' : '[SFX: ON]';
    }
  }

  updateFullscreenButtons() {
    const isFs = !!document.fullscreenElement;
    const isEn = i18n.getLang() === 'en';
    const text = isFs ? i18n.t('fullscreenExit') : i18n.t('fullscreenBtn');
    if (this.lblFullscreenBtn) this.lblFullscreenBtn.textContent = text;
    if (this.lblFsHeader) {
      this.lblFsHeader.textContent = isFs
        ? (isEn ? '[EXIT FULLSCREEN]' : '[SAIR ECRÃ INTEIRO]')
        : (isEn ? '[FULLSCREEN]' : '[ECRÃ INTEIRO]');
    }
  }

  updateTelemetry() {
    const save = Storage.load();
    const isEn = i18n.getLang() === 'en';
    const unlocked = save.unlockedLevel || 1;
    if (this.lblTelemUnlocked) {
      this.lblTelemUnlocked.textContent = `${unlocked} / ${LEVELS.length}`;
    }
    const currentSkinKey = Storage.getSkin() || 'default';
    const skinObj = SKINS_DATA[currentSkinKey];
    if (this.lblTelemSkin && skinObj) {
      this.lblTelemSkin.textContent = isEn ? skinObj.nameEn : skinObj.namePt;
    }
    if (this.lblQuickLang) {
      this.lblQuickLang.textContent = isEn ? '[LOCALE: EN]' : '[LOCALE: PT]';
    }
  }

  updateTitleCreditsButton() {
    if (!this.btnCredits) return;
    const isFinished = Storage.isGameCompleted();
    if (isFinished) {
      this.btnCredits.classList.remove('hidden');
    } else {
      this.btnCredits.classList.add('hidden');
    }
  }

  openOptionsModal() {
    this.updateAudioButtons();
    this.updateFullscreenButtons();
    this.renderSkinsGrid();
    if (this.screenOptions) this.screenOptions.classList.remove('hidden');
  }

  renderSkinsGrid() {
    if (!this.skinsGrid) return;
    this.skinsGrid.innerHTML = '';
    const activeSkin = Storage.getSkin() || 'default';
    const isEn = i18n.getLang() === 'en';

    Object.keys(SKINS_DATA).forEach(skinKey => {
      const skin = SKINS_DATA[skinKey];
      const isCurrent = (skinKey === activeSkin);
      const isUnlocked = Storage.isSkinUnlocked(skinKey);

      const card = document.createElement('div');
      card.className = `skin-card ${isCurrent ? 'active' : ''} ${isUnlocked ? '' : 'locked'}`;
      card.setAttribute('data-skin', skinKey);

      const canvas = document.createElement('canvas');
      canvas.className = 'skin-preview-canvas';
      canvas.width = 48;
      canvas.height = 48;
      TextureGenerator.drawSkinPreview(canvas, skinKey);

      const nameText = isEn ? skin.nameEn : skin.namePt;
      const descText = isUnlocked
        ? (isEn ? skin.descEn : skin.descPt)
        : (isEn ? '🔒 Locked: Beat Level 16 (Game Boss) to unlock!' : '🔒 Bloqueado: Vence o Nível 16 (Boss Final) para desbloquear!');

      card.innerHTML = `
        ${isCurrent ? `<span class="skin-badge-active">${i18n.t('skinActive')}</span>` : (!isUnlocked ? `<span class="skin-badge-locked">🔒 ${isEn ? 'LOCKED' : 'BLOQUEADO'}</span>` : '')}
        <div class="skin-info">
          <span class="skin-name">${nameText}</span>
        </div>
      `;
      card.insertBefore(canvas, card.firstChild);

      card.addEventListener('click', () => {
        if (!isUnlocked) {
          sounds.playJsFail();
          this.showToast(i18n.t('skinLockedDesc'), 2500);
          return;
        }
        sounds.playCollect();
        Storage.setSkin(skinKey);
        if (this.callbacks && this.callbacks.onChangeSkin) {
          this.callbacks.onChangeSkin(skinKey);
        }
        this.renderSkinsGrid();
        this.updateTelemetry();
      });

      this.skinsGrid.appendChild(card);
    });
  }

  showTitleScreen() {
    this.hideAllModals();
    this.hud.classList.add('hidden');
    this.screenTitle.classList.remove('hidden');
    this.updateTelemetry();
    this.updateTitleCreditsButton();
    sounds.restartBgm();
    if (this.callbacks && this.callbacks.onReturnToTitle) {
      this.callbacks.onReturnToTitle();
    }
  }

  hideAllModals() {
    if (this.screenPressStart) this.screenPressStart.classList.add('hidden');
    if (this.screenLangSelect) this.screenLangSelect.classList.add('hidden');
    if (this.screenTitle) this.screenTitle.classList.add('hidden');
    if (this.screenOptions) this.screenOptions.classList.add('hidden');
    if (this.screenLevelSelect) this.screenLevelSelect.classList.add('hidden');
    if (this.screenControls) this.screenControls.classList.add('hidden');
    if (this.screenCredits) this.screenCredits.classList.add('hidden');
    if (this.screenPause) this.screenPause.classList.add('hidden');
    if (this.screenTerminal) this.screenTerminal.classList.add('hidden');
    if (this.screenLevelComplete) this.screenLevelComplete.classList.add('hidden');
    if (this.screenGameOver) this.screenGameOver.classList.add('hidden');
    if (this.screenRollCredits) this.screenRollCredits.classList.add('hidden');
    if (this.screenWelcomeTdw) this.screenWelcomeTdw.classList.add('hidden');
    if (this.screenVictory) this.screenVictory.classList.add('hidden');
    if (this.hudHintCard) this.hudHintCard.classList.add('hidden');
    if (this.btnHintPill) this.btnHintPill.classList.add('hidden');
    this.hidePrompt();
  }

  openLevelSelect() {
    const save = Storage.load();
    const isEn = i18n.getLang() === 'en';
    this.levelsGrid.innerHTML = '';

    const headerTitle = document.getElementById('level-select-header-title') || document.querySelector('#screen-level-select .panel-heading');
    if (headerTitle) headerTitle.textContent = i18n.t('levelSelectTitle');

    const btnClose = document.getElementById('btn-close-levels');
    if (btnClose) btnClose.textContent = i18n.t('btnBackMenu');

    const unlockedMax = Math.min(LEVELS.length, Math.max(1, save.unlockedLevel || 1));
    let totalStars = 0;
    Object.values(save.levels || {}).forEach(lvl => {
      totalStars += (lvl.stars || 0);
    });

    if (this.levelSelectOverviewBar) {
      this.levelSelectOverviewBar.textContent = `${isEn ? 'UNLOCKED SECTORS:' : 'SETORES DESBLOQUEADOS:'} ${unlockedMax} / ${LEVELS.length} • ${isEn ? 'STARS:' : 'ESTRELAS:'} ${totalStars} / ${LEVELS.length * 3} ★`;
    }

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

      const cardTag = lvl.theme?.tag || '';
      card.innerHTML = `
        <div class="level-card-header">
          <span class="level-card-title">${lvlName}</span>
          <span class="level-card-stars">${starsDisplay}</span>
        </div>
        ${cardTag ? `<div class="level-card-tag">${cardTag}</div>` : ''}
        <div class="level-card-sub">${lvlSub}</div>
        <div class="level-card-best">${bestTimeText}</div>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          sounds.playJsSwitch(2);
          this.hideAllModals();
          this.callbacks.onStartLevel(lvl.id, true);
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
    this.showLevelHint(levelConfig);
  }

  showLevelHint(levelConfig) {
    if (!levelConfig || !this.hudHintCard) return;
    const isEn = i18n.getLang() === 'en';
    const hint = levelConfig.hint;
    if (hint) {
      if (this.hintCardTitle) this.hintCardTitle.textContent = isEn ? (hint.titleEn || 'SYSTEM HINT') : (hint.titlePt || 'DICA DO SISTEMA');
      if (this.hintCardBody) this.hintCardBody.textContent = isEn ? (hint.textEn || '') : (hint.textPt || '');
      if (this.hintCardTag) this.hintCardTag.textContent = hint.tag || levelConfig.theme?.tag || 'WEB';
      if (this.hintCardSub) this.hintCardSub.textContent = isEn ? 'ACTIVE OBJECTIVE' : 'OBJETIVO ATIVO';
      if (this.hintPillText) this.hintPillText.textContent = isEn ? 'HINT' : 'DICA';
      this.hudHintCard.classList.remove('hidden');
      if (this.btnHintPill) this.btnHintPill.classList.add('hidden');
      this.hudHintCard.style.animation = 'none';
      void this.hudHintCard.offsetWidth; // force reflow for smooth re-trigger
      this.hudHintCard.style.animation = 'hintSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    } else {
      this.hudHintCard.classList.add('hidden');
      if (this.btnHintPill) this.btnHintPill.classList.add('hidden');
    }
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

    if (levelConfig.id >= LEVELS.length) {
      this.btnNextLevel.textContent = i18n.t('btnFinalVictory');
    } else {
      this.btnNextLevel.textContent = i18n.t('btnNextLevel');
    }

    this.screenLevelComplete.classList.remove('hidden');
  }

  showGameOver(levelConfig, deaths) {
    this.hidePrompt();
    if (this.hudHintCard) this.hudHintCard.classList.add('hidden');
    if (this.btnHintPill) this.btnHintPill.classList.add('hidden');

    const isEn = i18n.getLang() === 'en';
    const lvlNum = levelConfig ? levelConfig.id : 1;
    if (this.lblGameOverLvlDisplay) {
      this.lblGameOverLvlDisplay.textContent = isEn ? `LEVEL ${lvlNum}` : `LVL ${lvlNum}`;
    }
    this.applyTranslations();
    if (this.screenGameOver) {
      this.screenGameOver.classList.remove('hidden');
    }
  }

  showRollCredits() {
    this.hideAllModals();
    sounds.playVictory();
    Storage.unlockSkin('coordinator');
    this.applyTranslations();
    if (this.canvasRewardRoll) {
      TextureGenerator.drawSkinPreview(this.canvasRewardRoll, 'coordinator');
    }
    this.updateCoordinatorEquipButtons();
    if (this.screenRollCredits) {
      this.screenRollCredits.classList.remove('hidden');
      if (this.rollCreditsContainer) {
        this.rollCreditsContainer.scrollTop = 0;
      }
    }
  }

  updateCoordinatorEquipButtons() {
    const isCurrent = (Storage.getSkin() === 'coordinator');
    const text = isCurrent ? i18n.t('btnEquipped') : i18n.t('btnEquipNow');
    const cls = `cyber-btn ${isCurrent ? 'btn-equipped' : 'btn-primary btn-equip-reward'}`;

    if (this.btnEquipWelcome) {
      this.btnEquipWelcome.className = cls;
      if (this.lblEquipWelcome) this.lblEquipWelcome.textContent = text;
    }
    if (this.btnEquipVictory) {
      this.btnEquipVictory.className = cls;
      if (this.lblEquipVictory) this.lblEquipVictory.textContent = text;
    }
    if (this.btnEquipRoll) {
      this.btnEquipRoll.className = cls;
      if (this.lblEquipRoll) this.lblEquipRoll.textContent = text;
    }
  }

  renderSkinRewardPreviews() {
    if (this.canvasRewardWelcome) {
      TextureGenerator.drawSkinPreview(this.canvasRewardWelcome, 'coordinator');
    }
    if (this.canvasRewardVictory) {
      TextureGenerator.drawSkinPreview(this.canvasRewardVictory, 'coordinator');
    }
  }

  showWelcomeTdwScreen() {
    this.hideAllModals();
    sounds.playVictory();
    Storage.unlockSkin('coordinator');
    this.applyTranslations();
    this.renderSkinRewardPreviews();
    this.updateCoordinatorEquipButtons();
    if (this.screenWelcomeTdw) {
      this.screenWelcomeTdw.classList.remove('hidden');
    } else {
      this.showVictoryScreen();
    }
  }

  showVictoryScreen() {
    this.hideAllModals();
    sounds.playVictory();
    Storage.unlockSkin('coordinator');
    this.applyTranslations();
    this.renderSkinRewardPreviews();
    this.updateCoordinatorEquipButtons();

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
    if (summaryBox) {
      summaryBox.innerHTML = `
        <div><span class="highlight-cyan">${isEn ? 'TOTAL STARS:' : 'ESTRELAS:'}</span> ${totalStars} / ${LEVELS.length * 3} ★</div>
        <div><span class="highlight-cyan">${isEn ? 'TOTAL DEATHS:' : 'MORTES TOTAIS:'}</span> ${totalDeaths} 💀</div>
        <div><span class="highlight-cyan">${isEn ? 'TOTAL TIME:' : 'TEMPO TOTAL:'}</span> ${totalBestTime.toFixed(1)}s ⏱</div>
      `;
    }

    this.screenVictory.classList.remove('hidden');
  }
}
