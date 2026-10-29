import Phaser from 'phaser';
import { TextureGenerator } from '../graphics/TextureGenerator.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {}

  create() {
    // Generate all procedural pixel textures directly into Phaser TextureManager
    TextureGenerator.generateAll(this);

    // Register Player Animations
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player_run', { start: 0, end: 3 }),
      frameRate: 11,
      repeat: -1
    });

    // GameScene is NOT auto-started here. It starts when the user clicks Play.
  }
}
