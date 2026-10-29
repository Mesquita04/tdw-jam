import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { GameScene } from './scenes/GameScene.js';
import { UIManager } from './ui/UIManager.js';
import { sounds } from './audio/SoundManager.js';
import { Storage } from './systems/Storage.js';
import { TextureGenerator } from './graphics/TextureGenerator.js';

// Phaser Game Configuration
const config = {
  type: Phaser.CANVAS,
  parent: 'phaser-container',
  width: 960,
  height: 540,
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  backgroundColor: '#070913',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 950 },
      debug: false
    }
  },
  scene: [BootScene, GameScene]
};

// Start Phaser Game Instance
const game = new Phaser.Game(config);

let gameSceneInstance = null;

// Initialize UI Manager
const uiManager = new UIManager({
  onStartLevel: (levelId, fromMainMenu = false) => {
    sounds.ensureContext();
    if (fromMainMenu) {
      sounds.restartBgm();
    } else {
      sounds.startBgm();
    }
    const gameScene = game.scene.getScene('GameScene');
    if (!gameScene || !gameScene.scene.isActive()) {
      game.scene.start('GameScene', { levelId: levelId, uiManager: uiManager });
    } else {
      gameScene.setUIManager(uiManager);
      gameScene.scene.restart({ levelId: levelId, uiManager: uiManager });
      if (gameScene.physics && gameScene.physics.world && gameScene.physics.world.isPaused) {
        gameScene.physics.resume();
      }
    }
    gameSceneInstance = game.scene.getScene('GameScene');
  },
  onRestartLevel: () => {
    const scene = game.scene.getScene('GameScene');
    if (scene) {
      scene.restartCurrentLevel();
    }
  },
  onResume: () => {
    const scene = game.scene.getScene('GameScene');
    if (scene) {
      scene.resumeGame();
    }
  },
  onPause: () => {
    const scene = game.scene.getScene('GameScene');
    if (scene && scene.scene.isActive()) {
      scene.togglePause();
    }
  },
  onReturnToTitle: () => {
    sounds.restartBgm();
    const scene = game.scene.getScene('GameScene');
    if (scene && scene.scene.isActive()) {
      scene.scene.stop();
      gameSceneInstance = null;
    }
  },
  onVirtualInput: (key, isDown) => {
    const scene = game.scene.getScene('GameScene');
    if (scene && scene.setVirtualInput) {
      scene.setVirtualInput(key, isDown);
    }
  },
  onChangeSkin: (skinKey) => {
    const bootScene = game.scene.getScene('BootScene');
    const gameScene = game.scene.getScene('GameScene');
    const targetScene = (gameScene && gameScene.scene.isActive()) ? gameScene : bootScene;
    if (targetScene) {
      TextureGenerator.applySkinToActiveTextures(targetScene, skinKey);
      if (gameScene && gameScene.player && gameScene.player.active) {
        gameScene.player.setTexture('player_idle');
        gameScene.player.anims.play('idle', true);
      }
    }
  }
});

// Link UI Manager once GameScene is created
game.events.on('step', () => {
  if (!gameSceneInstance) {
    const scene = game.scene.getScene('GameScene');
    if (scene && scene.scene.isActive()) {
      gameSceneInstance = scene;
      scene.setUIManager(uiManager);
    }
  }
});

// Automatic Pause when window tab loses focus
window.addEventListener('blur', () => {
  const scene = game.scene.getScene('GameScene');
  if (scene && scene.scene.isActive() && !scene.isPaused && !scene.levelCompleted) {
    // Only auto-pause if in game
    const hud = document.getElementById('hud-overlay');
    if (!hud.classList.contains('hidden')) {
      scene.togglePause();
    }
  }
});

// Pre-initialize SoundManager state from storage
sounds.setMusicMuted(Storage.isMusicMuted());
sounds.setSfxMuted(Storage.isSfxMuted());

// Start BGM immediately on page load!
sounds.startBgm();
