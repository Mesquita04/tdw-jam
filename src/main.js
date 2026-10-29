import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { GameScene } from './scenes/GameScene.js';
import { UIManager } from './ui/UIManager.js';
import { sounds } from './audio/SoundManager.js';
import { Storage } from './systems/Storage.js';

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
  onStartLevel: (levelId) => {
    sounds.ensureContext();
    const scene = game.scene.getScene('GameScene');
    if (scene) {
      gameSceneInstance = scene;
      scene.setUIManager(uiManager);
      scene.scene.restart({ levelId: levelId });
      if (scene.physics && scene.physics.world && scene.physics.world.isPaused) {
        scene.physics.resume();
      }
    }
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
    if (scene) {
      scene.togglePause();
    }
  },
  onVirtualInput: (key, isDown) => {
    const scene = game.scene.getScene('GameScene');
    if (scene && scene.setVirtualInput) {
      scene.setVirtualInput(key, isDown);
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
sounds.setMuted(Storage.isMuted());
