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
    if (data && data.uiManager) {
      this.uiManager = data.uiManager;
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
    this.isDead = false;
    this.activeInteractable = null;
    this.jsSequenceEntered = [];

    // Background Cyber Grid / Themed Background
    const theme = this.levelConfig.theme || { bgColor: '#0a0d18', bgTexture: 'bg_level_1' };
    this.cameras.main.setBackgroundColor(theme.bgColor || '#0a0d18');
    this.bgSprite = this.add.tileSprite(480, 270, 960, 540, theme.bgTexture || 'bg_level_1');

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
    this.setupShootingBugs();
    this.setupExitPortal();
    this.setupGlitchBoss();

    // Create Player
    this.createPlayer();
    this.setupAiModule();

    // Physics Colliders
    this.physics.add.collider(this.player, this.platformsGroup);
    this.physics.add.collider(this.player, this.builtPlatformsGroup);
    this.physics.add.collider(this.player, this.cssPlatformsGroup);

    // Hazard Overlap
    this.physics.add.overlap(this.player, this.hazardGroup, this.handleHazardTouch, null, this);
    if (this.errorProjectilesGroup) {
      this.physics.add.overlap(this.player, this.errorProjectilesGroup, this.handleHazardTouch, null, this);
    }

    // Fragment Overlap
    if (this.fragmentItems) {
      this.physics.add.overlap(this.player, this.fragmentItems, this.handleCollectFragment, null, this);
    }

    // AI Tokens Overlap
    if (this.aiTokensGroup) {
      this.physics.add.overlap(this.player, this.aiTokensGroup, this.handleCollectAiToken, null, this);
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
        const tex = h.texture || 'hazard_spikes';
        for (let i = 0; i < count; i++) {
          const spk = this.hazardGroup.create(h.x + i * 32 + 16, h.y + 16, tex);
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
      const ghostTex = bp.ghostTexture || (this.levelConfig.theme?.key === 'html' ? 'tile_html_ghost' : 'tile_bridge_ghost');
      const ghost = this.add.image(bp.x + bp.w / 2, bp.y + bp.h / 2, ghostTex);
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
      const termSprite = this.add.image(t.x, t.y, `terminal_${t.type || 'info'}`).setOrigin(0.5, 1);
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
        const spr = this.add.image(ct.x, ct.y, 'terminal_css').setOrigin(0.5, 1);
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
        const spr = this.add.image(jt.x, jt.y, 'terminal_js').setOrigin(0.5, 1);
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

    // Test Terminals (Level 5: QA / Performance)
    if (this.levelConfig.testTerminals) {
      this.levelConfig.testTerminals.forEach(tt => {
        const spr = this.add.image(tt.x, tt.y, 'terminal_test').setOrigin(0.5, 1);
        this.interactiveTerminals.push({
          type: 'test_patch',
          x: tt.x,
          y: tt.y,
          sprite: spr,
          label: tt.label || 'npm test --fix'
        });
      });
    }

    // AI Inference Terminals (Level 6: Neural Network)
    if (this.levelConfig.aiTerminals) {
      this.levelConfig.aiTerminals.forEach(at => {
        const spr = this.add.image(at.x, at.y, 'terminal_ai').setOrigin(0.5, 1);
        this.interactiveTerminals.push({
          type: 'ai_inference',
          x: at.x,
          y: at.y,
          cost: at.cost || 3,
          sprite: spr,
          label: at.label || 'RUN INFERENCE'
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

  // --- Glitch Boss (Level 16: Giant Virus & The Web Hammer) ---
  setupGlitchBoss() {
    this.bossCore = null;
    this.bossHammer = null;
    this.bossHammerBuilt = false;
    this.bossHammerCssEnabled = false;
    this.bossNextShotTime = 1200;
    if (!this.levelConfig.glitchCore) return;

    const bc = this.levelConfig.glitchCore;
    const bossTexture = this.levelConfig.id === 16 ? 'boss_giant_virus' : 'glitch_core';
    this.bossCore = this.add.image(bc.x, bc.y, bossTexture);
    this.bossCore.setDepth(6);
    if (this.levelConfig.id === 16) {
      this.bossCore.setDisplaySize(96, 96);
    }
    this.bossAlive = true;

    // Floating pulsing tween
    this.tweens.add({
      targets: this.bossCore,
      y: bc.y - 12,
      scaleX: 1.06,
      scaleY: 1.06,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  fireBossVirusShot() {
    if (!this.bossCore || !this.bossAlive || !this.errorProjectilesGroup || !this.player) return;

    const startX = this.bossCore.x + Phaser.Math.Between(-20, 20);
    const startY = this.bossCore.y + 32;

    const proj = this.errorProjectilesGroup.create(startX, startY, 'hazard_error_orb');
    proj.body.setAllowGravity(false);
    proj.body.setCircle(7, 1, 1);

    // Aim directly towards the player's current position
    const targetX = this.player.x;
    const targetY = this.player.y;
    const angle = Phaser.Math.Angle.Between(startX, startY, targetX, targetY);
    const speed = this.levelConfig.glitchCore?.speed || 210;

    proj.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    proj.startX = startX;
    proj.startY = startY;
    proj.maxRange = 850;

    // Spin animation
    this.tweens.add({
      targets: proj,
      angle: 360,
      duration: 400,
      repeat: -1
    });

    // Muzzle flash particle burst
    this.createParticleBurst(startX, startY, 'particle_magenta', 8);
    sounds.playBugShoot();
  }

  animateHammerSmash() {
    if (!this.bossHammer || !this.bossCore || !this.bossAlive) return;

    if (this.uiManager) {
      this.uiManager.showToast(i18n.t('hammerJsSmash'), 4000);
    }

    // Phase 1: Windup hammer backwards
    sounds.playHammerSmash();
    this.tweens.add({
      targets: this.bossHammer,
      angle: -50,
      y: this.bossHammer.y - 20,
      duration: 400,
      ease: 'Back.easeIn',
      onComplete: () => {
        // Phase 2: SMASH DOWN directly onto the Giant Virus!
        this.tweens.add({
          targets: this.bossHammer,
          angle: 70,
          x: this.bossCore.x - 15,
          y: this.bossCore.y + 25,
          duration: 180,
          ease: 'Cubic.easeIn',
          onComplete: () => {
            // Impact!
            sounds.playExplosion();
            this.cameras.main.shake(700, 0.035);
            this.cameras.main.flash(280, 255, 255, 255);

            // Massive particle explosions
            this.createParticleBurst(this.bossCore.x, this.bossCore.y, 'particle_yellow', 45);
            this.createParticleBurst(this.bossCore.x, this.bossCore.y, 'particle_magenta', 40);
            this.createParticleBurst(this.bossCore.x, this.bossCore.y, 'particle_cyan', 40);

            // Clear all virus projectile hazards immediately
            if (this.errorProjectilesGroup) {
              this.errorProjectilesGroup.clear(true, true);
            }

            // Squash boss virus
            this.tweens.add({
              targets: this.bossCore,
              scaleX: 1.8,
              scaleY: 0.1,
              y: this.bossCore.y + 35,
              duration: 250,
              ease: 'Quad.easeOut',
              onComplete: () => {
                this.defeatGlitchBoss();
              }
            });

            // Hammer recoil bounce
            this.tweens.add({
              targets: this.bossHammer,
              angle: 30,
              y: this.bossHammer.y - 15,
              duration: 350,
              ease: 'Back.easeOut'
            });
          }
        });
      }
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
          this.uiManager.showToast(i18n.t('bossDefeated'), 4500);
        }
      }
    });
  }

  // --- Shooting Bugs (Level 5: QA / Testing & Performance) ---
  setupShootingBugs() {
    this.shootingBugsList = [];
    this.errorProjectilesGroup = this.physics.add.group();
    if (!this.levelConfig.shootingBugs) return;

    this.levelConfig.shootingBugs.forEach(b => {
      const bugSprite = this.add.sprite(b.x, b.y, 'hazard_bug');
      bugSprite.setDepth(5);
      if (b.dir > 0) bugSprite.setFlipX(true);

      // Subtle breathing/bobbing animation
      this.tweens.add({
        targets: bugSprite,
        y: b.y - 4,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      this.shootingBugsList.push({
        config: b,
        sprite: bugSprite,
        nextShotTime: 1200 + Math.random() * 600,
        patched: false
      });
    });
  }

  updateShootingBugs(time, delta) {
    if (!this.shootingBugsList || this.shootingBugsList.length === 0) return;

    this.shootingBugsList.forEach(bug => {
      if (bug.patched) return;

      if (time >= bug.nextShotTime) {
        bug.nextShotTime = time + (bug.config.fireRate || 1600);
        this.fireBugError(bug);
      }
    });

    // Clean up out of bounds projectiles
    if (this.errorProjectilesGroup) {
      this.errorProjectilesGroup.getChildren().forEach(proj => {
        const startY = proj.startY !== undefined ? proj.startY : proj.y;
        const dist = Phaser.Math.Distance.Between(proj.startX, startY, proj.x, proj.y);
        if (proj.x < 10 || proj.x > 950 || proj.y < 10 || proj.y > 540 || dist > proj.maxRange) {
          proj.destroy();
        }
      });
    }
  }

  fireBugError(bug) {
    if (bug.patched || !this.errorProjectilesGroup || !this.player) return;

    const startX = bug.sprite.x + (this.player.x < bug.sprite.x ? -20 : 20);
    const startY = bug.sprite.y + 4;

    const proj = this.errorProjectilesGroup.create(startX, startY, 'hazard_error_orb');
    proj.body.setAllowGravity(false);
    proj.body.setCircle(7, 1, 1);

    // Aim directly towards the player's current position (aligns with player on platforms/steps)
    const targetX = this.player.x;
    const targetY = this.player.y;
    const angle = Phaser.Math.Angle.Between(startX, startY, targetX, targetY);
    const speed = bug.config.speed || 210;

    proj.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    proj.startX = startX;
    proj.startY = startY;
    proj.maxRange = bug.config.range || 850;

    // Flip bug sprite facing towards player
    bug.sprite.setFlipX(targetX > bug.sprite.x);

    // Spin animation
    this.tweens.add({
      targets: proj,
      angle: 360,
      duration: 450,
      repeat: -1
    });

    // Muzzle flash particle burst
    this.createParticleBurst(startX, startY, 'particle_magenta', 6);
    sounds.playBugShoot();
  }

  // --- AI Module & Companion Copilot (Level 6: Neural Network) ---
  setupAiModule() {
    this.aiTokensGroup = this.physics.add.group();
    this.aiTokensCollected = 0;
    this.aiCopilot = null;
    this.aiBridgesList = [];
    this.aiCopilotState = 'IDLE'; // 'IDLE', 'FETCHING', 'RETURNING'
    this.aiTargetToken = null;
    this.retrievedToken = null;

    // AI Copilot Drone
    if (this.levelConfig.hasAiCopilot) {
      const px = this.player ? this.player.x : (this.levelConfig.playerStart?.x || 80);
      const py = this.player ? this.player.y : (this.levelConfig.playerStart?.y || 440);
      this.aiCopilot = this.add.sprite(px - 26, py - 20, 'ai_copilot');
      this.aiCopilot.setDepth(10);
    }

    // AI Data Tokens
    if (this.levelConfig.aiTokens) {
      this.levelConfig.aiTokens.forEach(tok => {
        const spr = this.aiTokensGroup.create(tok.x, tok.y, 'item_ai_token');
        spr.body.setAllowGravity(false);
        spr.body.setImmovable(true);
        spr.baseY = tok.y;
        spr.tokenName = tok.name;
      });
    }

    // AI Ghost Bridges
    if (this.levelConfig.aiBridges) {
      this.levelConfig.aiBridges.forEach(ab => {
        const ghost = this.add.image(ab.x + ab.w / 2, ab.y + ab.h / 2, ab.ghostTexture || 'tile_ai_bridge_ghost');
        ghost.setDisplaySize(ab.w, ab.h);
        this.aiBridgesList.push({
          config: ab,
          ghostSprite: ghost,
          solid: false
        });
      });
    }
  }

  dispatchAiCopilot(pointer = null) {
    if (!this.aiCopilot || !this.levelConfig?.hasAiCopilot) return;
    if (this.isPaused || this.levelCompleted || this.isDead) return;
    if (this.aiCopilotState !== 'IDLE') return;

    // Check for remaining active tokens in the level
    const activeTokens = this.aiTokensGroup ? this.aiTokensGroup.getChildren().filter(t => t.active) : [];
    if (activeTokens.length === 0) {
      if (this.aiTokensCollected >= 3 && this.uiManager) {
        this.uiManager.showToast(i18n.t('aiAllGathered'), 2200);
      }
      return;
    }

    let targetToken = null;

    if (pointer) {
      // Find token closest to click point if clicked nearby, or closest active token to pointer
      let closestDist = Infinity;
      activeTokens.forEach(tok => {
        const d = Phaser.Math.Distance.Between(pointer.worldX, pointer.worldY, tok.x, tok.y);
        if (d < closestDist) {
          closestDist = d;
          targetToken = tok;
        }
      });
    }

    if (!targetToken) {
      // Target nearest active token to the player
      activeTokens.sort((a, b) => {
        const da = Phaser.Math.Distance.Between(this.player.x, this.player.y, a.x, a.y);
        const db = Phaser.Math.Distance.Between(this.player.x, this.player.y, b.x, b.y);
        return da - db;
      });
      targetToken = activeTokens[0];
    }

    if (targetToken) {
      this.aiCopilotState = 'FETCHING';
      this.aiTargetToken = targetToken;
      sounds.playAiLaunch();
      this.createParticleBurst(this.aiCopilot.x, this.aiCopilot.y, 'particle_magenta', 18);
      if (this.uiManager) {
        this.uiManager.showToast(i18n.t('aiDispatched', targetToken.tokenName || 'TOKEN'), 2000);
      }
    }
  }

  updateAiCopilot(time, delta) {
    // Bobbing AI Tokens
    if (this.aiTokensGroup) {
      this.aiTokensGroup.getChildren().forEach(tok => {
        tok.y = tok.baseY + Math.sin(time / 220) * 4;
      });
    }

    if (!this.aiCopilot || !this.player) return;

    const deltaSec = delta / 1000;

    // State 1: IDLE (Hovering around player)
    if (this.aiCopilotState === 'IDLE') {
      const offsetX = this.player.flipX ? 28 : -28;
      const targetX = this.player.x + offsetX;
      const targetY = this.player.y - 24 + Math.sin(time / 260) * 5;

      this.aiCopilot.x = Phaser.Math.Linear(this.aiCopilot.x, targetX, 0.08);
      this.aiCopilot.y = Phaser.Math.Linear(this.aiCopilot.y, targetY, 0.08);
      this.aiCopilot.setFlipX(this.player.flipX);
    }
    // State 2: FETCHING (Flying fast to collect unreachable high token)
    else if (this.aiCopilotState === 'FETCHING') {
      if (!this.aiTargetToken || !this.aiTargetToken.active) {
        // Target token was destroyed or missing, return to player
        this.aiCopilotState = 'RETURNING';
        return;
      }

      const tx = this.aiTargetToken.x;
      const ty = this.aiTargetToken.y;
      const dist = Phaser.Math.Distance.Between(this.aiCopilot.x, this.aiCopilot.y, tx, ty);
      const speed = 540; // High speed flight
      const step = Math.min(dist, speed * deltaSec);

      const angle = Phaser.Math.Angle.Between(this.aiCopilot.x, this.aiCopilot.y, tx, ty);
      this.aiCopilot.x += Math.cos(angle) * step;
      this.aiCopilot.y += Math.sin(angle) * step;
      this.aiCopilot.setFlipX(tx < this.aiCopilot.x);

      // Neon thruster trail particles
      if (Math.random() < 0.45) {
        this.createParticleBurst(this.aiCopilot.x, this.aiCopilot.y, 'particle_cyan', 2);
      }

      if (dist < 22) {
        // Captured token!
        this.createParticleBurst(tx, ty, 'particle_cyan', 22);
        this.createParticleBurst(tx, ty, 'particle_magenta', 16);
        sounds.playCollect();
        this.retrievedToken = { tokenName: this.aiTargetToken.tokenName };
        this.aiTargetToken.destroy();
        this.aiTargetToken = null;
        this.aiCopilotState = 'RETURNING';
      }
    }
    // State 3: RETURNING (Returning high-speed with token to player)
    else if (this.aiCopilotState === 'RETURNING') {
      const targetX = this.player.x + (this.player.flipX ? 28 : -28);
      const targetY = this.player.y - 24;
      const dist = Phaser.Math.Distance.Between(this.aiCopilot.x, this.aiCopilot.y, targetX, targetY);
      const speed = 500;
      const step = Math.min(dist, speed * deltaSec);

      const angle = Phaser.Math.Angle.Between(this.aiCopilot.x, this.aiCopilot.y, targetX, targetY);
      this.aiCopilot.x += Math.cos(angle) * step;
      this.aiCopilot.y += Math.sin(angle) * step;
      this.aiCopilot.setFlipX(targetX < this.aiCopilot.x);

      // Particle trail
      if (Math.random() < 0.45) {
        this.createParticleBurst(this.aiCopilot.x, this.aiCopilot.y, 'particle_magenta', 2);
      }

      if (dist < 28) {
        // Returned token to player!
        this.aiTokensCollected++;
        sounds.playAiToken();
        this.createParticleBurst(this.aiCopilot.x, this.aiCopilot.y, 'particle_magenta', 24);
        this.createParticleBurst(this.aiCopilot.x, this.aiCopilot.y, 'particle_yellow', 16);

        const total = (this.levelConfig.aiTokens || []).length;
        if (this.uiManager) {
          const tokName = this.retrievedToken?.tokenName || 'TOKEN';
          this.uiManager.showToast(`${i18n.t('aiTokenCollected')} [${tokName}] (${this.aiTokensCollected}/${total})`, 2200);
        }

        this.retrievedToken = null;
        this.aiCopilotState = 'IDLE';
      }
    }
  }

  handleCollectAiToken(player, token) {
    token.destroy();
    this.aiTokensCollected++;
    sounds.playAiToken();
    this.createParticleBurst(token.x, token.y, 'particle_cyan', 20);

    const total = (this.levelConfig.aiTokens || []).length;
    if (this.uiManager) {
      this.uiManager.showToast(`${i18n.t('aiTokenCollected')} [${token.tokenName || 'TOKEN'}] (${this.aiTokensCollected}/${total})`, 2000);
    }
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
    this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

    // Prevent default browser scrolling
    this.input.keyboard.on('keydown', (event) => {
      const keysToBlock = ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyE', 'KeyR', 'KeyF', 'KeyQ'];
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

    // Dispatch AI Copilot [F] or [Q]
    this.keyF.on('down', () => {
      this.dispatchAiCopilot(null);
    });
    this.keyQ.on('down', () => {
      this.dispatchAiCopilot(null);
    });

    // Dispatch AI Copilot via canvas click/tap
    this.input.on('pointerdown', (pointer) => {
      if (this.levelConfig?.hasAiCopilot && !this.isPaused && !this.levelCompleted) {
        this.dispatchAiCopilot(pointer);
      }
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
    if (this.isPaused || this.levelCompleted || this.isDead) return;

    const deltaSec = delta / 1000;
    this.levelTime += deltaSec;

    // Slow parallax background drift
    if (this.bgSprite) {
      this.bgSprite.tilePositionX += 0.15;
    }

    // Animate HTML fragments
    if (this.fragmentItems) {
      this.fragmentItems.getChildren().forEach(frag => {
        frag.y = frag.baseY + Math.sin(time / 200) * 4;
      });
    }

    // Update shooting bugs and error projectiles (Level 10-12, 15)
    this.updateShootingBugs(time, delta);

    // Update Boss virus shooting (Level 16: Giant Virus)
    if (this.bossCore && this.bossAlive && this.levelConfig.id === 16) {
      if (time >= this.bossNextShotTime) {
        this.bossNextShotTime = time + (this.levelConfig.glitchCore?.fireRate || 1800);
        this.fireBossVirusShot();
      }
    }

    // Update AI Copilot and AI tokens (Level 13-15)
    this.updateAiCopilot(time, delta);

    // Player Movement
    this.handlePlayerMovement(deltaSec);

    // Check Nearest Interactable for [E] prompt
    this.checkInteractables();

    // Update HUD
    if (this.uiManager) {
      const totalFrags = (this.levelConfig.htmlFragments || []).length;
      const totalAiTok = (this.levelConfig.aiTokens || []).length;
      if (totalAiTok > 0) {
        this.uiManager.updateHUDStats(this.levelTime, this.deaths, this.aiTokensCollected, totalAiTok);
      } else {
        this.uiManager.updateHUDStats(this.levelTime, this.deaths, this.collectedFragments, totalFrags);
      }
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
      // With origin (0.5, 1) at y: 480, terminal center is at t.y - 20
      const dist = Phaser.Math.Distance.Between(px, py, t.x, t.y - 20);
      if (dist < closestDist) {
        let promptText = isEn ? 'OPEN TERMINAL' : 'ABRIR TERMINAL';
        if (t.type === 'css_toggle') {
          if (this.levelConfig.id === 16 || t.targetGroup === 'boss_hammer_css') {
            promptText = this.bossHammerCssEnabled
              ? (isEn ? 'CSS: HAMMER [ENABLED]' : 'CSS: MARTELO [ATIVADO]')
              : (isEn ? 'CSS: ENABLE <hammer/>' : 'CSS: ATIVAR <hammer/>');
          } else {
            promptText = isEn ? 'CSS: TOGGLE DISPLAY' : 'CSS: ALTERNAR DISPLAY';
          }
        } else if (t.type === 'test_patch') {
          promptText = isEn ? 'TEST: RUN npm test --fix' : 'TESTES: EXECUTAR npm test --fix';
        } else if (t.type === 'ai_inference') {
          const req = t.cost || 3;
          promptText = `${isEn ? 'AI: RUN INFERENCE' : 'IA: EXECUTAR INFERÊNCIA'} (${this.aiTokensCollected || 0}/${req})`;
        }
        closest = {
          type: t.type,
          data: t,
          prompt: promptText
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
          const bpTag = bp.config.isHammer ? '<div id="hammer"/>' : '<div/>';
          closest = {
            type: 'build_point',
            data: bp,
            prompt: `${isEn ? 'BUILD' : 'CONSTRUIR'} ${bpTag} (${this.collectedFragments}/${cost})`
          };
          closestDist = dist;
        }
      }
    });

    // 3. Check JS Switches
    this.jsSwitchesList.forEach(sw => {
      const dist = Phaser.Math.Distance.Between(px, py, sw.x, sw.y);
      if (dist < closestDist) {
        let promptText = `${isEn ? 'TRIGGER SWITCH' : 'ACIONAR BOTÃO'} [${sw.id}]`;
        if (this.levelConfig.id === 16) {
          promptText = isEn ? 'JS: hammer.animate() -> SMASH()!' : 'JS: hammer.animate() -> ESMAGAR()!';
        }
        closest = {
          type: 'js_switch',
          data: sw,
          prompt: promptText
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
      } else if (this.levelConfig?.hasAiCopilot && this.aiTokensGroup?.getChildren().some(t => t.active)) {
        this.uiManager.showPrompt(i18n.t('aiDispatchPrompt'));
      } else {
        this.uiManager.hidePrompt();
      }
    }
  }

  handleInteractKey() {
    if (!this.activeInteractable) {
      if (this.levelConfig?.hasAiCopilot && this.aiTokensGroup?.getChildren().some(t => t.active)) {
        this.dispatchAiCopilot(null);
      }
      return;
    }

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
              5: 'termTitleTest',
              6: 'termTitleAi',
              7: 'termTitleMerge',
              8: 'termTitleBoss'
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
      // Special handling for Level 16: Enable Web Hammer CSS
      if (this.levelConfig.id === 16 || it.data.targetGroup === 'boss_hammer_css') {
        if (!this.bossHammerBuilt) {
          sounds.playJsFail();
          if (this.uiManager) {
            this.uiManager.showToast(i18n.t('needHammerBuild'), 3200);
          }
          return;
        }

        this.bossHammerCssEnabled = true;
        sounds.playToggle();
        this.cameras.main.flash(180, 168, 85, 247);

        if (this.bossHammer) {
          this.bossHammer.setTexture('giant_hammer_on');
          // Add energizing pulse animation
          this.tweens.add({
            targets: this.bossHammer,
            scaleX: 1.08,
            scaleY: 1.08,
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
          this.createParticleBurst(this.bossHammer.x, this.bossHammer.y - 30, 'particle_magenta', 35);
          this.createParticleBurst(this.bossHammer.x, this.bossHammer.y - 30, 'particle_cyan', 25);
        }

        if (this.uiManager) {
          this.uiManager.showToast(i18n.t('hammerCssEnabled'), 3500);
        }
        return;
      }

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

    // 3. Test Patch Terminal (Level 5: QA / Performance)
    if (it.type === 'test_patch') {
      sounds.playTestPass();
      this.cameras.main.flash(180, 16, 185, 129);

      if (this.shootingBugsList) {
        this.shootingBugsList.forEach(bug => {
          bug.patched = true;
          bug.sprite.setTexture('hazard_bug_patched');
          this.createParticleBurst(bug.sprite.x, bug.sprite.y, 'particle_green', 24);
        });
      }

      if (this.errorProjectilesGroup) {
        this.errorProjectilesGroup.getChildren().forEach(p => {
          this.createParticleBurst(p.x, p.y, 'particle_cyan', 10);
        });
        this.errorProjectilesGroup.clear(true, true);
      }

      this.unlockPortal();
      if (this.uiManager) {
        this.uiManager.showToast(i18n.t('bugPatched'), 3200);
      }
      return;
    }

    // 4. AI Inference Terminal (Level 6: Neural Network)
    if (it.type === 'ai_inference') {
      const required = it.data.cost || 3;
      if ((this.aiTokensCollected || 0) < required) {
        sounds.playJsFail();
        if (this.uiManager) {
          this.uiManager.showToast(i18n.t('needAiTokens'), 2500);
        }
      } else {
        sounds.playAiInference();
        this.cameras.main.flash(200, 139, 92, 246);

        if (this.aiCopilot) {
          this.createParticleBurst(this.aiCopilot.x, this.aiCopilot.y, 'particle_magenta', 24);
        }

        // Materialize AI Bridges
        if (this.aiBridgesList) {
          this.aiBridgesList.forEach(ab => {
            if (!ab.solid) {
              ab.solid = true;
              if (ab.ghostSprite) ab.ghostSprite.destroy();
              const cols = Math.max(1, Math.round(ab.config.w / 32));
              const tex = ab.config.solidTexture || 'tile_ai_bridge_solid';
              for (let c = 0; c < cols; c++) {
                const bx = ab.config.x + c * 32 + 16;
                const by = ab.config.y + 16;
                const tile = this.builtPlatformsGroup.create(bx, by, tex);
                tile.refreshBody();
              }
              this.createParticleBurst(ab.config.x + ab.config.w / 2, ab.config.y + 16, 'particle_magenta', 30);
            }
          });
        }

        this.unlockPortal();
        if (this.uiManager) {
          this.uiManager.showToast(i18n.t('aiInferred'), 3200);
        }
      }
      return;
    }

    // 5. HTML Build Point
    if (it.type === 'build_point') {
      const bp = it.data;
      const cost = bp.config.cost;

      if (this.collectedFragments >= cost) {
        this.collectedFragments -= cost;
        bp.built = true;
        bp.ghostSprite.destroy();

        // Level 16: The Web Hammer build point
        if (bp.config.isHammer) {
          this.bossHammerBuilt = true;
          this.bossHammer = this.add.sprite(
            bp.config.x + bp.config.w / 2,
            bp.config.y + bp.config.h * 0.85,
            'giant_hammer_off'
          );
          this.bossHammer.setOrigin(0.5, 0.85);
          this.bossHammer.setDisplaySize(96, 96);
          this.bossHammer.setDepth(8);

          sounds.playBuild();
          this.createParticleBurst(bp.config.x + bp.config.w / 2, bp.config.y + bp.config.h / 2, 'particle_cyan', 35);
          if (this.uiManager) {
            this.uiManager.showToast(i18n.t('hammerBuilt'), 3500);
          }
          return;
        }

        // Create solid bridge tiles
        const cols = Math.max(1, Math.round(bp.config.w / 32));
        const solidTex = bp.config.solidTexture || (this.levelConfig.theme?.key === 'html' ? 'tile_html_bridge' : 'tile_bridge_solid');
        for (let c = 0; c < cols; c++) {
          const bx = bp.config.x + c * 32 + 16;
          const by = bp.config.y + 16;
          const bTile = this.builtPlatformsGroup.create(bx, by, solidTex);
          bTile.refreshBody();
        }

        sounds.playBuild();
        const burstParticle = this.levelConfig.theme?.key === 'html' ? 'particle_magenta' : 'particle_cyan';
        this.createParticleBurst(bp.config.x + bp.config.w / 2, bp.config.y + 16, burstParticle, 25);

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

    // 6. JS Sequence Switch
    if (it.type === 'js_switch') {
      const sw = it.data;

      // Special handling for Level 16: The Web Hammer Boss Fight
      if (this.levelConfig.id === 16) {
        if (!this.bossHammerBuilt) {
          sounds.playJsFail();
          if (this.uiManager) this.uiManager.showToast(i18n.t('needHammerBuild'), 3200);
          return;
        }
        if (!this.bossHammerCssEnabled) {
          sounds.playJsFail();
          if (this.uiManager) this.uiManager.showToast(i18n.t('needHammerCss'), 3200);
          return;
        }

        // Both HTML and CSS complete! Trigger JS Hammer Smash!
        sounds.playJsSwitch(sw.id);
        sw.sprite.setTexture(`switch_${sw.id}_on`);
        this.createParticleBurst(sw.x, sw.y, 'particle_yellow', 15);
        this.animateHammerSmash();
        return;
      }

      sounds.playJsSwitch(sw.id);
      sw.sprite.setTexture(`switch_${sw.id}_on`);
      this.createParticleBurst(sw.x, sw.y, 'particle_yellow', 10);

      this.jsSequenceEntered.push(sw.id);

      // Determine required sequence
      const targetSeq = this.levelConfig.jsSequence || (this.levelConfig.jsTerminals && this.levelConfig.jsTerminals[0]
        ? this.levelConfig.jsTerminals[0].sequence
        : [1, 2, 3]);

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

        if (this.levelConfig.id === 16 || this.bossCore) {
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
    if (this.levelCompleted || this.isDead) return;

    this.isDead = true;
    sounds.playHurt();
    this.cameras.main.shake(300, 0.02);
    this.createParticleBurst(player.x, player.y, 'particle_magenta', 30);
    this.createParticleBurst(player.x, player.y, 'particle_yellow', 15);

    this.deaths++;

    // Halt and hide player
    player.setVelocity(0, 0);
    player.body.enable = false;
    player.setAlpha(0);

    // Clear active error projectiles
    if (this.errorProjectilesGroup) {
      this.errorProjectilesGroup.clear(true, true);
    }

    if (this.uiManager) {
      this.uiManager.showGameOver(this.levelConfig, this.deaths);
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
