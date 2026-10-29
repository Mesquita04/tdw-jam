import Phaser from 'phaser';
import { LEVELS } from '../levels/LevelData.js';
import { sounds } from '../audio/SoundManager.js';
import { i18n } from '../systems/Localization.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.uiManager = null;
    this.currentLevelIndex = 1;
    this.levelConfig = null;

    // Gameplay State
    this.levelTime = 0;
    this.deaths = 0;
    this.collectedFragments = 0;
    this.isPaused = false;
    this.levelCompleted = false;

    // Movement & Feel variables
    this.coyoteCounter = 0;
    this.jumpBuffer = 0;
    this.isJumping = false;
  }

  init(data) {
    if (data && data.levelId) {
      this.currentLevelIndex = data.levelId;
    }
  }

  setUIManager(ui) {
    this.uiManager = ui;
  }

  create() {
    this.levelConfig = LEVELS.find(l => l.id === this.currentLevelIndex) || LEVELS[0];
    this.levelTime = 0;
    this.deaths = 0;
    this.collectedFragments = 0;
    this.isPaused = false;
    this.levelCompleted = false;
    this.activeInteractable = null;
    this.jsSequenceEntered = [];

    // Background Cyber Grid
    this.add.tileSprite(480, 270, 960, 540, 'bg_grid');

    // Groups
    this.platformsGroup = this.physics.add.staticGroup();
    this.hazardGroup = this.physics.add.staticGroup();
    this.cssPlatformsGroup = this.physics.add.staticGroup();
    this.builtPlatformsGroup = this.physics.add.staticGroup();

    // Setup Level Components
    this.setupStaticPlatforms();
    this.setupHazards();
    this.setupBuildPoints();
    this.setupHtmlFragments();
    this.setupCssPlatforms();
    this.setupTerminals();
    this.setupJsSwitches();
    this.setupExitPortal();
    this.setupGlitchBoss();

    // Create Player
    this.createPlayer();

    // Physics Colliders
    this.physics.add.collider(this.player, this.platformsGroup);
    this.physics.add.collider(this.player, this.builtPlatformsGroup);
    this.physics.add.collider(this.player, this.cssPlatformsGroup);

    // Hazard Overlap
    this.physics.add.overlap(this.player, this.hazardGroup, this.handleHazardTouch, null, this);

    // Fragment Overlap
    if (this.fragmentItems) {
      this.physics.add.overlap(this.player, this.fragmentItems, this.handleCollectFragment, null, this);
    }

    // Portal Overlap
    this.physics.add.overlap(this.player, this.portalSprite, this.handlePortalTouch, null, this);

    // Input Controls
    this.setupControls();

    // Update HUD
    if (this.uiManager) {
      this.uiManager.startLevelHUD(this.levelConfig);
    }
  }

  // --- Static Platforms ---
  setupStaticPlatforms() {
    this.levelConfig.platforms.forEach(p => {
      const texture = p.type || 'tile_cyber';
      // Tile repeating platform
      const cols = Math.max(1, Math.round(p.w / 32));
      const rows = Math.max(1, Math.round(p.h / 32));

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = p.x + c * 32 + 16;
          const py = p.y + r * 32 + 16;
          const tile = this.platformsGroup.create(px, py, texture);
          tile.refreshBody();
        }
      }
    });
  }

  // --- Hazards ---
  setupHazards() {
    this.hazardsList = [];
    if (!this.levelConfig.hazards) return;

    this.levelConfig.hazards.forEach(h => {
      const hazardObj = {
        config: h,
        sprites: [],
        active: h.active !== false
      };

      if (h.type === 'spikes') {
        const count = Math.max(1, Math.round(h.w / 32));
        for (let i = 0; i < count; i++) {
          const spk = this.hazardGroup.create(h.x + i * 32 + 16, h.y + 16, 'hazard_spikes');
          spk.refreshBody();
          hazardObj.sprites.push(spk);
        }
      } else if (h.type === 'laser') {
        // Vertical or horizontal laser beam
        const count = Math.max(1, Math.round(h.h / 12));
        for (let i = 0; i < count; i++) {
          const lsr = this.hazardGroup.create(h.x + h.w / 2, h.y + i * 12 + 6, 'hazard_laser');
          lsr.setDisplaySize(h.w, 12);
          lsr.refreshBody();
          hazardObj.sprites.push(lsr);
        }
      }

      this.hazardsList.push(hazardObj);
    });
  }

  // --- HTML Build Points ---
  setupBuildPoints() {
    this.buildPoints = [];
    if (!this.levelConfig.buildPoints) return;

    this.levelConfig.buildPoints.forEach(bp => {
      const ghost = this.add.image(bp.x + bp.w / 2, bp.y + bp.h / 2, 'tile_bridge_ghost');
      ghost.setDisplaySize(bp.w, bp.h);

      this.buildPoints.push({
        config: bp,
        ghostSprite: ghost,
        built: false
      });
    });
  }

  // --- HTML Fragments ---
  setupHtmlFragments() {
    this.fragmentItems = this.physics.add.group();
    if (!this.levelConfig.htmlFragments) return;

    this.levelConfig.htmlFragments.forEach(f => {
      const frag = this.fragmentItems.create(f.x, f.y, 'item_html_fragment');
      frag.body.setAllowGravity(false);
      frag.body.setImmovable(true);
      frag.baseY = f.y;
      frag.fragId = f.id;
    });
  }

  // --- CSS Toggleable Platforms ---
  setupCssPlatforms() {
    this.cssPlatformsList = [];
    if (!this.levelConfig.cssPlatforms) return;

    this.levelConfig.cssPlatforms.forEach(cp => {
      const cols = Math.max(1, Math.round(cp.w / 32));
      const rows = Math.max(1, Math.round(cp.h / 32));
      const sprites = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = cp.x + c * 32 + 16;
          const py = cp.y + r * 32 + 16;
          const initialTex = cp.initialSolid ? 'tile_css_solid' : 'tile_css_ghost';
          const spr = this.cssPlatformsGroup.create(px, py, initialTex);
          spr.setAlpha(cp.initialSolid ? 1 : 0.4);
          spr.refreshBody();
          sprites.push(spr);
        }
      }

      const cssObj = {
        config: cp,
        isSolid: cp.initialSolid,
        sprites: sprites
      };

      // Set initial collider state
      this.updateCssPlatformState(cssObj);
      this.cssPlatformsList.push(cssObj);
    });
  }

  updateCssPlatformState(cssObj) {
    cssObj.sprites.forEach(spr => {
      if (cssObj.isSolid) {
        spr.setTexture('tile_css_solid');
        spr.setAlpha(1.0);
        spr.body.enable = true;
      } else {
        spr.setTexture('tile_css_ghost');
        spr.setAlpha(0.35);
        spr.body.enable = false;
      }
      spr.refreshBody();
    });
  }

  // --- Terminals ---
  setupTerminals() {
    this.interactiveTerminals = [];

    // Story/Info Terminal
    if (this.levelConfig.terminal) {
      const t = this.levelConfig.terminal;
      const termSprite = this.add.image(t.x, t.y, `terminal_${t.type || 'info'}`);
      this.interactiveTerminals.push({
        type: 'dialog',
        x: t.x,
        y: t.y,
        sprite: termSprite,
        title: t.title,
        message: t.message
      });
    }

    // CSS Terminals
    if (this.levelConfig.cssTerminals) {
      this.levelConfig.cssTerminals.forEach(ct => {
        const spr = this.add.image(ct.x, ct.y, 'terminal_css');
        this.interactiveTerminals.push({
          type: 'css_toggle',
          x: ct.x,
          y: ct.y,
          sprite: spr,
          targetGroup: ct.targetGroup,
          label: ct.label
        });
      });
    }

    // JS Terminals
    if (this.levelConfig.jsTerminals) {
      this.levelConfig.jsTerminals.forEach(jt => {
        const spr = this.add.image(jt.x, jt.y, 'terminal_js');
        this.interactiveTerminals.push({
          type: 'js_terminal',
          x: jt.x,
          y: jt.y,
          sprite: spr,
          sequence: jt.sequence,
          clue: jt.clue
        });
      });
    }
  }

  // --- JS Switches ---
  setupJsSwitches() {
    this.jsSwitchesList = [];
    if (!this.levelConfig.jsSwitches) return;

    this.levelConfig.jsSwitches.forEach(sw => {
      const spr = this.add.image(sw.x, sw.y, `switch_${sw.id}_off`);
      this.jsSwitchesList.push({
        id: sw.id,
        x: sw.x,
        y: sw.y,
        sprite: spr,
        activated: false
      });
    });
  }

  // --- Exit Portal ---
  setupExitPortal() {
    const ex = this.levelConfig.exit;
    this.portalLocked = ex.locked;
    const initialTex = this.portalLocked ? 'portal_locked' : 'portal_open';
    this.portalSprite = this.physics.add.sprite(ex.x, ex.y, initialTex);
    this.portalSprite.body.setAllowGravity(false);
    this.portalSprite.body.setImmovable(true);
  }

  unlockPortal() {
    this.portalLocked = false;
    this.portalSprite.setTexture('portal_open');
    this.cameras.main.flash(200, 5, 255, 161);
    this.createParticleBurst(this.portalSprite.x, this.portalSprite.y, 'particle_green', 25);
  }

  // --- Glitch Boss (Level 6) ---
  setupGlitchBoss() {
    this.bossCore = null;
    if (!this.levelConfig.glitchCore) return;

    const bc = this.levelConfig.glitchCore;
    this.bossCore = this.add.image(bc.x, bc.y, 'glitch_core');
    this.bossAlive = true;

    // Floating pulsing tween
    this.tweens.add({
      targets: this.bossCore,
      y: bc.y - 12,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  defeatGlitchBoss() {
    if (!this.bossCore || !this.bossAlive) return;
    this.bossAlive = false;

    sounds.playVictory();
    this.cameras.main.shake(500, 0.02);

    // Massive particle explosion
    this.createParticleBurst(this.bossCore.x, this.bossCore.y, 'particle_magenta', 40);
    this.createParticleBurst(this.bossCore.x, this.bossCore.y, 'particle_yellow', 30);
    this.createParticleBurst(this.bossCore.x, this.bossCore.y, 'particle_cyan', 30);

    // Fade out and shrink core
    this.tweens.add({
      targets: this.bossCore,
      scaleX: 0,
      scaleY: 0,
      alpha: 0,
      angle: 360,
      duration: 1000,
      onComplete: () => {
        this.unlockPortal();
        if (this.uiManager) {
          this.uiManager.showToast(i18n.t('bossDefeated'), 4000);
        }
      }
    });
  }

  // --- Player Setup ---
  createPlayer() {
    const start = this.levelConfig.playerStart;
    this.player = this.physics.add.sprite(start.x, start.y, 'player_idle');
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(18, 26);
    this.player.body.setOffset(7, 6);
    this.player.body.setMaxVelocity(250, 900);
    this.player.body.setGravityY(950);
  }

  // --- Keyboard Controls ---
  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

    // Prevent default browser scrolling
    this.input.keyboard.on('keydown', (event) => {
      const keysToBlock = ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyE', 'KeyR'];
      if (keysToBlock.includes(event.code)) {
        event.preventDefault();
      }
    });

    // Quick restart [R]
    this.keyR.on('down', () => {
      this.restartCurrentLevel();
    });

    // Pause [ESC]
    this.keyEsc.on('down', () => {
      this.togglePause();
    });

    // Interaction [E]
    this.keyE.on('down', () => {
      this.handleInteractKey();
    });

    // Ability lore info [1, 2, 3]
    this.key1.on('down', () => {
      const isEn = i18n.getLang() === 'en';
      if (this.uiManager) this.uiManager.showToast(isEn ? 'HTML MODULE: Builds <div/> platforms' : 'MÓDULO HTML: Constrói plataformas <div/>', 2000);
    });
    this.key2.on('down', () => {
      const isEn = i18n.getLang() === 'en';
      if (this.uiManager) this.uiManager.showToast(isEn ? 'CSS MODULE: Toggles display: block / none' : 'MÓDULO CSS: Alterna display: block / none', 2000);
    });
    this.key3.on('down', () => {
      const isEn = i18n.getLang() === 'en';
      if (this.uiManager) this.uiManager.showToast(isEn ? 'JS MODULE: Executes async callbacks' : 'MÓDULO JS: Executa callbacks assíncronos', 2000);
    });
  }

  // --- Game Loop (Update) ---
  update(time, delta) {
    if (this.isPaused || this.levelCompleted) return;

    const deltaSec = delta / 1000;
    this.levelTime += deltaSec;

    // Animate HTML fragments
    if (this.fragmentItems) {
      this.fragmentItems.getChildren().forEach(frag => {
        frag.y = frag.baseY + Math.sin(time / 200) * 4;
      });
    }

    // Player Movement
    this.handlePlayerMovement(deltaSec);

    // Check Nearest Interactable for [E] prompt
    this.checkInteractables();

    // Update HUD
    if (this.uiManager) {
      const totalFrags = (this.levelConfig.htmlFragments || []).length;
      this.uiManager.updateHUDStats(this.levelTime, this.deaths, this.collectedFragments, totalFrags);
    }
  }

  setVirtualInput(key, isDown) {
    if (!this.virtualInput) {
      this.virtualInput = { left: false, right: false, jump: false, interact: false };
    }
    this.virtualInput[key] = isDown;
    if (isDown) {
      if (key === 'left' || key === 'right') {
        this.virtualInputPulse = key;
        this.virtualInputPulseTimer = 0.25; // 250ms stride on click
      }
      if (key === 'jump') {
        this.jumpBuffer = 0.25;
      }
      if (key === 'interact') {
        this.handleInteractKey();
      }
    }
  }

  handlePlayerMovement(deltaSec) {
    const isGrounded = this.player.body.onFloor() || this.player.body.touching.down;

    // Coyote Time
    if (isGrounded) {
      this.coyoteCounter = 0.12; // 120ms
      this.isJumping = false;
    } else {
      this.coyoteCounter -= deltaSec;
    }

    // Virtual click pulse decrement
    let vLeft = this.virtualInput && this.virtualInput.left;
    let vRight = this.virtualInput && this.virtualInput.right;
    if (this.virtualInputPulseTimer > 0) {
      this.virtualInputPulseTimer -= deltaSec;
      if (this.virtualInputPulse === 'left') vLeft = true;
      if (this.virtualInputPulse === 'right') vRight = true;
    }

    // Jump Buffering
    const vJump = this.virtualInput && this.virtualInput.jump;
    const jumpJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space) ||
                            Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
                            Phaser.Input.Keyboard.JustDown(this.keyW) ||
                            vJump;

    if (jumpJustPressed) {
      this.jumpBuffer = 0.15; // 150ms buffer
    } else {
      this.jumpBuffer -= deltaSec;
    }

    // Horizontal Movement
    const leftDown = this.cursors.left.isDown || this.keyA.isDown || vLeft;
    const rightDown = this.cursors.right.isDown || this.keyD.isDown || vRight;

    if (leftDown) {
      this.player.setVelocityX(-220);
      this.player.setFlipX(true);
      if (isGrounded) this.player.anims.play('run', true);
    } else if (rightDown) {
      this.player.setVelocityX(220);
      this.player.setFlipX(false);
      if (isGrounded) this.player.anims.play('run', true);
    } else {
      this.player.setVelocityX(0);
      if (isGrounded) this.player.anims.play('idle', true);
    }

    // Perform Jump (Doubled power: peak height increased to ~195px)
    if (this.jumpBuffer > 0 && this.coyoteCounter > 0) {
      this.player.setVelocityY(-610);
      this.coyoteCounter = 0;
      this.jumpBuffer = 0;
      this.isJumping = true;
      sounds.playJump();
    }

    // Variable Jump Height: release jump key early to cut ascent
    const jumpHeld = this.cursors.space.isDown || this.cursors.up.isDown || this.keyW.isDown || (this.virtualInput && this.virtualInput.jump);
    if (!jumpHeld && this.player.body.velocity.y < -160) {
      this.player.setVelocityY(this.player.body.velocity.y * 0.55);
    }

    // Airborne Frame
    if (!isGrounded) {
      this.player.setTexture('player_jump');
    }
  }

  // --- Interaction Detection ---
  checkInteractables() {
    const px = this.player.x;
    const py = this.player.y;
    let closest = null;
    let closestDist = 55; // 55px activation radius

    const isEn = i18n.getLang() === 'en';

    // 1. Check Terminal Dialogs & Consoles
    this.interactiveTerminals.forEach(t => {
      const dist = Phaser.Math.Distance.Between(px, py, t.x, t.y);
      if (dist < closestDist) {
        closest = {
          type: t.type,
          data: t,
          prompt: t.type === 'css_toggle' ? (isEn ? 'CSS: TOGGLE DISPLAY' : 'CSS: ALTERNAR DISPLAY') : (isEn ? 'OPEN TERMINAL' : 'ABRIR TERMINAL')
        };
        closestDist = dist;
      }
    });

    // 2. Check HTML Build Points
    this.buildPoints.forEach(bp => {
      if (!bp.built) {
        // Distance to build point center
        const bx = bp.config.x + bp.config.w / 2;
        const by = bp.config.y + bp.config.h / 2;
        const dist = Phaser.Math.Distance.Between(px, py, bx, by);
        if (dist < Math.max(closestDist, bp.config.w / 2 + 25)) {
          const cost = bp.config.cost;
          closest = {
            type: 'build_point',
            data: bp,
            prompt: `${isEn ? 'BUILD' : 'CONSTRUIR'} <div/> (${this.collectedFragments}/${cost})`
          };
          closestDist = dist;
        }
      }
    });

    // 3. Check JS Switches
    this.jsSwitchesList.forEach(sw => {
      const dist = Phaser.Math.Distance.Between(px, py, sw.x, sw.y);
      if (dist < closestDist) {
        closest = {
          type: 'js_switch',
          data: sw,
          prompt: `${isEn ? 'TRIGGER SWITCH' : 'ACIONAR BOTÃO'} [${sw.id}]`
        };
        closestDist = dist;
      }
    });

    // 4. Check Exit Portal if locked
    if (this.portalLocked && this.portalSprite) {
      const dist = Phaser.Math.Distance.Between(px, py, this.portalSprite.x, this.portalSprite.y);
      if (dist < closestDist) {
        closest = {
          type: 'locked_portal',
          prompt: isEn ? 'PORTAL LOCKED (SOLVE PUZZLE)' : 'PORTAL TRANCADO (RESOLVE O PUZZLE)'
        };
        closestDist = dist;
      }
    }

    this.activeInteractable = closest;

    if (this.uiManager) {
      if (closest) {
        this.uiManager.showPrompt(closest.prompt);
      } else {
        this.uiManager.hidePrompt();
      }
    }
  }

  handleInteractKey() {
    if (!this.activeInteractable) return;

    const it = this.activeInteractable;

    // 1. Dialog Terminal
    if (it.type === 'dialog' || it.type === 'js_terminal') {
      if (this.uiManager) {
        if (this.uiManager.isTerminalOpen()) {
          this.uiManager.closeTerminal();
        } else {
          let title = it.data.title || 'TERMINAL';
          let message = it.data.message || it.data.clue || '';
          if (this.levelConfig && this.levelConfig.id) {
            const lid = this.levelConfig.id;
            const termTitleKeys = {
              1: 'termTitleInit',
              2: 'termTitleHtml',
              3: 'termTitleCss',
              4: 'termTitleJs',
              5: 'termTitleMerge',
              6: 'termTitleBoss'
            };
            if (termTitleKeys[lid]) title = i18n.t(termTitleKeys[lid]);
            if (i18n.t(`termMsg${lid}`)) message = i18n.t(`termMsg${lid}`);
          }
          this.uiManager.openTerminal(title, message);
        }
      }
      return;
    }

    // 2. CSS Toggle Terminal
    if (it.type === 'css_toggle') {
      sounds.playToggle();
      this.cameras.main.flash(120, 168, 85, 247);

      // Toggle CSS Platforms
      this.cssPlatformsList.forEach(cp => {
        cp.isSolid = !cp.isSolid;
        this.updateCssPlatformState(cp);
      });

      // Toggle Lasers if configured
      this.hazardsList.forEach(hz => {
        if (hz.config.cssToggleable) {
          hz.active = !hz.active;
          hz.sprites.forEach(spr => {
            spr.setAlpha(hz.active ? 1.0 : 0.15);
            spr.body.enable = hz.active;
          });
        }
      });

      if (this.uiManager) {
        this.uiManager.showToast(i18n.t('cssToggled'), 2200);
      }
      return;
    }

    // 3. HTML Build Point
    if (it.type === 'build_point') {
      const bp = it.data;
      const cost = bp.config.cost;

      if (this.collectedFragments >= cost) {
        this.collectedFragments -= cost;
        bp.built = true;
        bp.ghostSprite.destroy();

        // Create solid bridge tiles
        const cols = Math.max(1, Math.round(bp.config.w / 32));
        for (let c = 0; c < cols; c++) {
          const bx = bp.config.x + c * 32 + 16;
          const by = bp.config.y + 16;
          const bTile = this.builtPlatformsGroup.create(bx, by, 'tile_bridge_solid');
          bTile.refreshBody();
        }

        sounds.playBuild();
        this.createParticleBurst(bp.config.x + bp.config.w / 2, bp.config.y + 16, 'particle_cyan', 25);

        if (this.uiManager) {
          this.uiManager.showToast(i18n.t('bridgeBuilt'), 2500);
        }
      } else {
        sounds.playJsFail();
        if (this.uiManager) {
          this.uiManager.showToast(i18n.t('needFrags', cost), 2500);
        }
      }
      return;
    }

    // 4. JS Sequence Switch
    if (it.type === 'js_switch') {
      const sw = it.data;
      sounds.playJsSwitch(sw.id);
      sw.sprite.setTexture(`switch_${sw.id}_on`);
      this.createParticleBurst(sw.x, sw.y, 'particle_yellow', 10);

      this.jsSequenceEntered.push(sw.id);

      // Determine required sequence
      const targetSeq = (this.levelConfig.jsTerminals && this.levelConfig.jsTerminals[0])
        ? this.levelConfig.jsTerminals[0].sequence
        : [1, 2, 3];

      // Validate so far
      const currentStep = this.jsSequenceEntered.length - 1;
      if (this.jsSequenceEntered[currentStep] !== targetSeq[currentStep]) {
        // Syntax Error! Reset!
        sounds.playJsFail();
        this.cameras.main.shake(180, 0.008);
        this.jsSequenceEntered = [];
        this.jsSwitchesList.forEach(s => s.sprite.setTexture(`switch_${s.id}_off`));

        if (this.uiManager) {
          this.uiManager.showToast(i18n.t('syntaxError'), 2600);
        }
      } else if (this.jsSequenceEntered.length === targetSeq.length) {
        // Sequence fully solved!
        sounds.playJsSuccess();

        if (this.levelConfig.id === 6) {
          // Boss level -> defeats glitch virus!
          this.defeatGlitchBoss();
        } else {
          // Normal level -> unlocks portal!
          this.unlockPortal();
          if (this.uiManager) {
            this.uiManager.showToast(i18n.t('jsSuccess'), 3000);
          }
        }
      }
    }
  }

  // --- HTML Fragment Pickup ---
  handleCollectFragment(player, fragment) {
    fragment.destroy();
    this.collectedFragments++;
    sounds.playCollect();
    this.createParticleBurst(fragment.x, fragment.y, 'particle_cyan', 16);

    const total = (this.levelConfig.htmlFragments || []).length;
    if (this.uiManager) {
      this.uiManager.showToast(`${i18n.t('fragCollected')} (${this.collectedFragments}/${total})`, 1800);
    }
  }

  // --- Hazard Touch / Death ---
  handleHazardTouch(player, hazard) {
    if (this.levelCompleted) return;

    sounds.playHurt();
    this.cameras.main.shake(200, 0.012);
    this.createParticleBurst(player.x, player.y, 'particle_magenta', 24);

    this.deaths++;

    // Respawn player at level start
    const start = this.levelConfig.playerStart;
    player.setPosition(start.x, start.y);
    player.setVelocity(0, 0);

    if (this.uiManager) {
      this.uiManager.showToast(i18n.t('kernelPanic'), 2000);
    }
  }

  // --- Portal Win ---
  handlePortalTouch(player, portal) {
    if (this.portalLocked || this.levelCompleted) return;

    this.levelCompleted = true;
    player.setVelocity(0, 0);
    player.body.enable = false;

    // Victory rise animation
    this.tweens.add({
      targets: player,
      y: player.y - 25,
      alpha: 0,
      scaleX: 0.2,
      duration: 600,
      ease: 'Back.easeIn',
      onComplete: () => {
        if (this.uiManager) {
          this.uiManager.showLevelComplete(this.levelConfig, this.levelTime, this.deaths);
        }
      }
    });
  }

  // --- Restart Level ---
  restartCurrentLevel() {
    this.deaths++;
    sounds.playTone(200, 'sawtooth', 0.1, 0.2, 100);
    this.scene.restart({ levelId: this.levelConfig.id });
  }

  // --- Pause Menu ---
  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.physics.pause();
      if (this.uiManager) this.uiManager.showPauseMenu();
    } else {
      this.physics.resume();
      if (this.uiManager) this.uiManager.hidePauseMenu();
    }
  }

  resumeGame() {
    this.isPaused = false;
    this.physics.resume();
    if (this.uiManager) this.uiManager.hidePauseMenu();
  }

  // --- Particle Bursts ---
  createParticleBurst(x, y, textureKey, count = 16) {
    for (let i = 0; i < count; i++) {
      const p = this.add.image(x, y, textureKey);
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const speed = Phaser.Math.FloatBetween(40, 160);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      this.tweens.add({
        targets: p,
        x: x + vx * 0.45,
        y: y + vy * 0.45,
        scaleX: 0,
        scaleY: 0,
        alpha: 0,
        duration: Phaser.Math.Between(350, 700),
        ease: 'Quad.easeOut',
        onComplete: () => p.destroy()
      });
    }
  }
}
