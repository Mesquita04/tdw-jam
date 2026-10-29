/**
 * TextureGenerator - Generates high-contrast, polished pixel-art textures
 * dynamically using HTML5 Canvas. Zero external image dependencies!
 */

export class TextureGenerator {
  static generateAll(scene) {
    TextureGenerator.createBgGrid(scene);
    TextureGenerator.createPlayerSprites(scene);
    TextureGenerator.createTileTextures(scene);
    TextureGenerator.createTerminalTextures(scene);
    TextureGenerator.createSwitchTextures(scene);
    TextureGenerator.createItemTextures(scene);
    TextureGenerator.createHazardTextures(scene);
    TextureGenerator.createExitPortal(scene);
    TextureGenerator.createGlitchCore(scene);
    TextureGenerator.createParticleTextures(scene);
  }

  static createCanvas(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return { canvas, ctx };
  }

  // --- Background Grid ---
  static createBgGrid(scene) {
    const { canvas, ctx } = TextureGenerator.createCanvas(64, 64);
    ctx.fillStyle = '#0a0d18';
    ctx.fillRect(0, 0, 64, 64);

    // Subtle digital grid lines
    ctx.strokeStyle = '#141c30';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 63.5);
    ctx.lineTo(64, 63.5);
    ctx.moveTo(63.5, 0);
    ctx.lineTo(63.5, 64);
    ctx.stroke();

    // Subtle micro binary dots
    ctx.fillStyle = '#1c2844';
    ctx.fillRect(8, 8, 2, 2);
    ctx.fillRect(40, 24, 2, 2);
    ctx.fillRect(20, 48, 2, 2);

    scene.textures.addCanvas('bg_grid', canvas);
  }

  // --- Player Sprites ---
  static createPlayerSprites(scene) {
    // 32x32 frames: Idle (4 frames), Run (4 frames), Jump (1 frame)
    // Palette:
    // Hoodie: Dark charcoal #1e2230, shadow #131620, highlight #2d3348
    // Neon Cyan Visor/Eyes: #00f3ff, glow #0099b8
    // Pants: Dark navy #181d2a
    // Sneakers: Cyan #00f3ff & white #ffffff
    // Hair: Dark brown #2b1d0c

    const drawCharacter = (ctx, xOffset, frameType, tick = 0) => {
      const ox = xOffset;
      const oy = 0;

      // Draw head & hood
      // Hood outline
      ctx.fillStyle = '#11141e';
      ctx.fillRect(ox + 10, oy + 6, 12, 11);
      // Hood inner/color
      ctx.fillStyle = '#222838';
      ctx.fillRect(ox + 11, oy + 7, 10, 9);

      // Face shadow & skin
      ctx.fillStyle = '#0d1017';
      ctx.fillRect(ox + 12, oy + 9, 8, 7);

      // Cyber Visor / Glasses (Glowing Cyan)
      ctx.fillStyle = '#00f3ff';
      ctx.fillRect(ox + 14, oy + 10, 6, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ox + 16, oy + 10, 2, 1);

      // Torso / Hoodie
      const bob = frameType === 'idle' ? (tick % 2 === 0 ? 0 : 1) : 0;
      ctx.fillStyle = '#1b2030';
      ctx.fillRect(ox + 10, oy + 16 + bob, 12, 9);
      // Hoodie zipper / neon trim
      ctx.fillStyle = '#00f3ff';
      ctx.fillRect(ox + 15, oy + 16 + bob, 2, 8);

      // Arms / Hands
      ctx.fillStyle = '#222838';
      if (frameType === 'run') {
        const armSwing = (tick % 4);
        if (armSwing === 0 || armSwing === 2) {
          ctx.fillRect(ox + 8, oy + 17 + bob, 3, 7);
          ctx.fillRect(ox + 21, oy + 17 + bob, 3, 7);
        } else if (armSwing === 1) {
          ctx.fillRect(ox + 7, oy + 16 + bob, 3, 6);
          ctx.fillRect(ox + 22, oy + 18 + bob, 3, 7);
        } else {
          ctx.fillRect(ox + 7, oy + 18 + bob, 3, 7);
          ctx.fillRect(ox + 22, oy + 16 + bob, 3, 6);
        }
      } else if (frameType === 'jump') {
        ctx.fillRect(ox + 7, oy + 14, 3, 8);
        ctx.fillRect(ox + 22, oy + 14, 3, 8);
      } else {
        // Idle
        ctx.fillRect(ox + 8, oy + 17 + bob, 2, 7);
        ctx.fillRect(ox + 22, oy + 17 + bob, 2, 7);
      }

      // Legs & Sneakers
      ctx.fillStyle = '#121622'; // pants
      if (frameType === 'idle') {
        ctx.fillRect(ox + 11, oy + 25 + bob, 4, 4);
        ctx.fillRect(ox + 17, oy + 25 + bob, 4, 4);
        // Sneakers
        ctx.fillStyle = '#00f3ff';
        ctx.fillRect(ox + 10, oy + 29 + bob, 5, 3);
        ctx.fillRect(ox + 17, oy + 29 + bob, 5, 3);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ox + 10, oy + 31 + bob, 5, 1);
        ctx.fillRect(ox + 17, oy + 31 + bob, 5, 1);
      } else if (frameType === 'run') {
        const step = tick % 4;
        if (step === 0) {
          ctx.fillRect(ox + 9, oy + 25, 4, 4);
          ctx.fillRect(ox + 18, oy + 24, 4, 5);
          ctx.fillStyle = '#00f3ff';
          ctx.fillRect(ox + 8, oy + 29, 6, 3);
          ctx.fillRect(ox + 19, oy + 28, 5, 3);
        } else if (step === 1) {
          ctx.fillRect(ox + 11, oy + 24, 4, 5);
          ctx.fillRect(ox + 17, oy + 24, 4, 5);
          ctx.fillStyle = '#00f3ff';
          ctx.fillRect(ox + 10, oy + 29, 5, 3);
          ctx.fillRect(ox + 17, oy + 29, 5, 3);
        } else if (step === 2) {
          ctx.fillRect(ox + 18, oy + 25, 4, 4);
          ctx.fillRect(ox + 10, oy + 24, 4, 5);
          ctx.fillStyle = '#00f3ff';
          ctx.fillRect(ox + 18, oy + 29, 6, 3);
          ctx.fillRect(ox + 9, oy + 28, 5, 3);
        } else {
          ctx.fillRect(ox + 11, oy + 24, 4, 5);
          ctx.fillRect(ox + 17, oy + 24, 4, 5);
          ctx.fillStyle = '#00f3ff';
          ctx.fillRect(ox + 11, oy + 28, 5, 3);
          ctx.fillRect(ox + 16, oy + 28, 5, 3);
        }
      } else if (frameType === 'jump') {
        // Jump pose: legs tucked slightly
        ctx.fillRect(ox + 10, oy + 24, 4, 4);
        ctx.fillRect(ox + 18, oy + 23, 4, 5);
        ctx.fillStyle = '#00f3ff';
        ctx.fillRect(ox + 9, oy + 27, 5, 3);
        ctx.fillRect(ox + 18, oy + 27, 5, 3);
      }
    };

    // Idle sheet: 128x32 (4 frames)
    const { canvas: idleCanvas, ctx: idleCtx } = TextureGenerator.createCanvas(128, 32);
    for (let i = 0; i < 4; i++) {
      drawCharacter(idleCtx, i * 32, 'idle', i);
    }
    const idleTex = scene.textures.addCanvas('player_idle', idleCanvas);
    for (let i = 0; i < 4; i++) {
      idleTex.add(i, 0, i * 32, 0, 32, 32);
    }

    // Run sheet: 128x32 (4 frames)
    const { canvas: runCanvas, ctx: runCtx } = TextureGenerator.createCanvas(128, 32);
    for (let i = 0; i < 4; i++) {
      drawCharacter(runCtx, i * 32, 'run', i);
    }
    const runTex = scene.textures.addCanvas('player_run', runCanvas);
    for (let i = 0; i < 4; i++) {
      runTex.add(i, 0, i * 32, 0, 32, 32);
    }

    // Jump frame: 32x32
    const { canvas: jumpCanvas, ctx: jumpCtx } = TextureGenerator.createCanvas(32, 32);
    drawCharacter(jumpCtx, 0, 'jump', 0);
    scene.textures.addCanvas('player_jump', jumpCanvas);
  }

  // --- Tiles and Platforms ---
  static createTileTextures(scene) {
    // 1. Standard Cyber Tile (Metal block with circuits)
    const { canvas: cyberTile, ctx: cCtx } = TextureGenerator.createCanvas(32, 32);
    cCtx.fillStyle = '#131828';
    cCtx.fillRect(0, 0, 32, 32);
    // Beveled borders
    cCtx.fillStyle = '#242e4c';
    cCtx.fillRect(0, 0, 32, 2);
    cCtx.fillRect(0, 0, 2, 32);
    cCtx.fillStyle = '#090c14';
    cCtx.fillRect(0, 30, 32, 2);
    cCtx.fillRect(30, 0, 2, 32);
    // Cyan circuit trace
    cCtx.fillStyle = '#00f3ff';
    cCtx.fillRect(6, 6, 2, 8);
    cCtx.fillRect(6, 14, 10, 2);
    cCtx.fillRect(16, 14, 2, 10);
    cCtx.fillRect(24, 22, 4, 4);
    // Violet node dot
    cCtx.fillStyle = '#8b5cf6';
    cCtx.fillRect(5, 5, 4, 4);
    scene.textures.addCanvas('tile_cyber', cyberTile);

    // 2. Cyber Accent Tile (with glowing top edge)
    const { canvas: accentTile, ctx: aCtx } = TextureGenerator.createCanvas(32, 32);
    aCtx.fillStyle = '#151c30';
    aCtx.fillRect(0, 0, 32, 32);
    // Glowing neon cyan top edge
    aCtx.fillStyle = '#00f3ff';
    aCtx.fillRect(0, 0, 32, 3);
    aCtx.fillStyle = '#ffffff';
    aCtx.fillRect(4, 0, 24, 1);
    // Inner pattern
    aCtx.fillStyle = '#222c4a';
    aCtx.fillRect(4, 8, 24, 16);
    aCtx.fillStyle = '#101524';
    aCtx.fillRect(6, 10, 20, 12);
    scene.textures.addCanvas('tile_cyber_accent', accentTile);

    // 3. HTML Bridge Blueprint (Ghost build point)
    const { canvas: bpTile, ctx: bpCtx } = TextureGenerator.createCanvas(32, 32);
    // Semi-transparent dashed cyan blueprint box
    bpCtx.fillStyle = 'rgba(0, 243, 255, 0.08)';
    bpCtx.fillRect(1, 1, 30, 30);
    bpCtx.strokeStyle = '#00f3ff';
    bpCtx.lineWidth = 1.5;
    bpCtx.setLineDash([4, 4]);
    bpCtx.strokeRect(1.5, 1.5, 29, 29);
    bpCtx.setLineDash([]);
    // Watermark text "<div/>"
    bpCtx.fillStyle = 'rgba(0, 243, 255, 0.6)';
    bpCtx.font = 'bold 8px monospace';
    bpCtx.textAlign = 'center';
    bpCtx.textBaseline = 'middle';
    bpCtx.fillText('<div/>', 16, 16);
    scene.textures.addCanvas('tile_bridge_ghost', bpTile);

    // 4. HTML Bridge Solid (Built bridge)
    const { canvas: solidBridge, ctx: sbCtx } = TextureGenerator.createCanvas(32, 32);
    sbCtx.fillStyle = '#0a2233';
    sbCtx.fillRect(0, 0, 32, 32);
    // Neon cyan grid
    sbCtx.strokeStyle = '#00f3ff';
    sbCtx.lineWidth = 2;
    sbCtx.strokeRect(1, 1, 30, 30);
    sbCtx.fillStyle = '#00f3ff';
    sbCtx.fillRect(0, 0, 32, 4);
    // Code block visual
    sbCtx.fillStyle = '#5eead4';
    sbCtx.font = 'bold 9px monospace';
    sbCtx.textAlign = 'center';
    sbCtx.textBaseline = 'middle';
    sbCtx.fillText('<div />', 16, 16);
    scene.textures.addCanvas('tile_bridge_solid', solidBridge);

    // 5. CSS Solid Platform (Purple & Cyan Styled Glass)
    const { canvas: cssSolid, ctx: csCtx } = TextureGenerator.createCanvas(32, 32);
    csCtx.fillStyle = '#26123e';
    csCtx.fillRect(0, 0, 32, 32);
    csCtx.strokeStyle = '#a855f7';
    csCtx.lineWidth = 2;
    csCtx.strokeRect(1, 1, 30, 30);
    csCtx.fillStyle = '#c084fc';
    csCtx.fillRect(0, 0, 32, 3);
    csCtx.fillStyle = '#ffffff';
    csCtx.font = 'bold 8px monospace';
    csCtx.textAlign = 'center';
    csCtx.textBaseline = 'middle';
    csCtx.fillText('BLOCK', 16, 16);
    scene.textures.addCanvas('tile_css_solid', cssSolid);

    // 6. CSS Ghost Platform (display: none / opacity 0.2)
    const { canvas: cssGhost, ctx: cgCtx } = TextureGenerator.createCanvas(32, 32);
    cgCtx.fillStyle = 'rgba(168, 85, 247, 0.08)';
    cgCtx.fillRect(0, 0, 32, 32);
    cgCtx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
    cgCtx.lineWidth = 1;
    cgCtx.setLineDash([3, 3]);
    cgCtx.strokeRect(1, 1, 30, 30);
    cgCtx.setLineDash([]);
    cgCtx.fillStyle = 'rgba(168, 85, 247, 0.45)';
    cgCtx.font = 'bold 8px monospace';
    cgCtx.textAlign = 'center';
    cgCtx.textBaseline = 'middle';
    cgCtx.fillText('NONE', 16, 16);
    scene.textures.addCanvas('tile_css_ghost', cssGhost);
  }

  // --- Terminals ---
  static createTerminalTextures(scene) {
    // 32x40 Cyber Terminal Desk
    const makeTerminal = (key, screenColor, label, code) => {
      const { canvas, ctx } = TextureGenerator.createCanvas(32, 40);
      // Pedestal / base
      ctx.fillStyle = '#141824';
      ctx.fillRect(8, 26, 16, 14);
      ctx.fillStyle = '#0a0d14';
      ctx.fillRect(4, 36, 24, 4);

      // Monitor case
      ctx.fillStyle = '#1c2234';
      ctx.fillRect(2, 4, 28, 22);
      ctx.fillStyle = screenColor;
      ctx.fillRect(4, 6, 24, 18);

      // Screen glow / text
      ctx.fillStyle = '#070a12';
      ctx.fillRect(5, 7, 22, 16);

      ctx.fillStyle = screenColor;
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label, 16, 14);

      ctx.font = '6px monospace';
      ctx.fillText(code, 16, 20);

      // Keyboard
      ctx.fillStyle = '#262f48';
      ctx.fillRect(6, 26, 20, 3);
      ctx.fillStyle = screenColor;
      ctx.fillRect(10, 27, 12, 1);

      scene.textures.addCanvas(key, canvas);
    };

    makeTerminal('terminal_html', '#00f3ff', 'HTML', 'BUILD');
    makeTerminal('terminal_css', '#a855f7', 'CSS', 'STYLE');
    makeTerminal('terminal_js', '#ffe600', 'JS', 'EXEC');
    makeTerminal('terminal_info', '#05ffa1', 'KERNEL', 'LOG');
  }

  // --- JavaScript Switches ---
  static createSwitchTextures(scene) {
    // 28x28 switches for JavaScript sequence puzzle
    [1, 2, 3].forEach(num => {
      // Inactive (Red / Amber LED)
      const { canvas: offCanvas, ctx: offCtx } = TextureGenerator.createCanvas(28, 28);
      offCtx.fillStyle = '#151a28';
      offCtx.fillRect(2, 4, 24, 22);
      offCtx.strokeStyle = '#374151';
      offCtx.lineWidth = 2;
      offCtx.strokeRect(2, 4, 24, 22);
      // Status light (off/red)
      offCtx.fillStyle = '#ef4444';
      offCtx.fillRect(12, 6, 4, 4);
      // Switch Number
      offCtx.fillStyle = '#9ca3af';
      offCtx.font = 'bold 12px monospace';
      offCtx.textAlign = 'center';
      offCtx.fillText(String(num), 14, 21);
      scene.textures.addCanvas(`switch_${num}_off`, offCanvas);

      // Active (Glowing Yellow / Green LED)
      const { canvas: onCanvas, ctx: onCtx } = TextureGenerator.createCanvas(28, 28);
      onCtx.fillStyle = '#1b2238';
      onCtx.fillRect(2, 4, 24, 22);
      onCtx.strokeStyle = '#ffe600';
      onCtx.lineWidth = 2;
      onCtx.strokeRect(2, 4, 24, 22);
      // Status light (active/green)
      onCtx.fillStyle = '#05ffa1';
      onCtx.fillRect(12, 6, 4, 4);
      // Switch Number
      onCtx.fillStyle = '#ffe600';
      onCtx.font = 'bold 12px monospace';
      onCtx.textAlign = 'center';
      onCtx.fillText(String(num), 14, 21);
      scene.textures.addCanvas(`switch_${num}_on`, onCanvas);
    });
  }

  // --- Items ---
  static createItemTextures(scene) {
    // HTML Code Fragment: Glowing cyan 24x24 diamond with "<>"
    const { canvas, ctx } = TextureGenerator.createCanvas(24, 24);
    ctx.fillStyle = '#00f3ff';
    ctx.beginPath();
    ctx.moveTo(12, 2);
    ctx.lineTo(22, 12);
    ctx.lineTo(12, 22);
    ctx.lineTo(2, 12);
    ctx.closePath();
    ctx.fill();

    // Inner dark diamond
    ctx.fillStyle = '#071622';
    ctx.beginPath();
    ctx.moveTo(12, 5);
    ctx.lineTo(19, 12);
    ctx.lineTo(12, 19);
    ctx.lineTo(5, 12);
    ctx.closePath();
    ctx.fill();

    // Symbol "<>"
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('<>', 12, 12);

    scene.textures.addCanvas('item_html_fragment', canvas);
  }

  // --- Hazards ---
  static createHazardTextures(scene) {
    // 1. Spikes / Glitch Thorns: 32x32
    const { canvas: spikeCanvas, ctx: sCtx } = TextureGenerator.createCanvas(32, 32);
    sCtx.fillStyle = '#ff007f';
    for (let i = 0; i < 4; i++) {
      sCtx.beginPath();
      sCtx.moveTo(i * 8, 32);
      sCtx.lineTo(i * 8 + 4, 12);
      sCtx.lineTo(i * 8 + 8, 32);
      sCtx.closePath();
      sCtx.fill();
    }
    // High neon highlights
    sCtx.fillStyle = '#ffffff';
    for (let i = 0; i < 4; i++) {
      sCtx.fillRect(i * 8 + 3, 14, 2, 4);
    }
    scene.textures.addCanvas('hazard_spikes', spikeCanvas);

    // 2. Laser Beam: 32x12
    const { canvas: laserCanvas, ctx: lCtx } = TextureGenerator.createCanvas(32, 12);
    lCtx.fillStyle = 'rgba(255, 0, 127, 0.4)';
    lCtx.fillRect(0, 1, 32, 10);
    lCtx.fillStyle = '#ff007f';
    lCtx.fillRect(0, 3, 32, 6);
    lCtx.fillStyle = '#ffffff';
    lCtx.fillRect(0, 5, 32, 2);
    scene.textures.addCanvas('hazard_laser', laserCanvas);

    // 3. Laser Emitter / Turret: 20x20
    const { canvas: turretCanvas, ctx: tCtx } = TextureGenerator.createCanvas(20, 20);
    tCtx.fillStyle = '#1a1f30';
    tCtx.fillRect(2, 2, 16, 16);
    tCtx.strokeStyle = '#ff007f';
    tCtx.lineWidth = 2;
    tCtx.strokeRect(2, 2, 16, 16);
    tCtx.fillStyle = '#ff007f';
    tCtx.fillRect(6, 6, 8, 8);
    scene.textures.addCanvas('laser_emitter', turretCanvas);
  }

  // --- Exit Portal ---
  static createExitPortal(scene) {
    // 40x56 Exit Gateway
    // 1. Locked Portal (Red/Magenta)
    const { canvas: lockedCanvas, ctx: lkCtx } = TextureGenerator.createCanvas(40, 56);
    lkCtx.fillStyle = '#151b2c';
    lkCtx.fillRect(4, 2, 32, 52);
    lkCtx.strokeStyle = '#ff007f';
    lkCtx.lineWidth = 3;
    lkCtx.strokeRect(4, 2, 32, 52);

    // Doorway arch
    lkCtx.fillStyle = '#0a0d16';
    lkCtx.fillRect(8, 8, 24, 46);

    // Lock icon
    lkCtx.fillStyle = '#ff007f';
    lkCtx.fillRect(16, 24, 8, 8);
    lkCtx.beginPath();
    lkCtx.arc(20, 22, 4, Math.PI, 0, false);
    lkCtx.strokeStyle = '#ff007f';
    lkCtx.lineWidth = 2;
    lkCtx.stroke();
    scene.textures.addCanvas('portal_locked', lockedCanvas);

    // 2. Open Portal (Cyan/Emerald Active Vortex)
    const { canvas: openCanvas, ctx: opCtx } = TextureGenerator.createCanvas(40, 56);
    opCtx.fillStyle = '#10222a';
    opCtx.fillRect(4, 2, 32, 52);
    opCtx.strokeStyle = '#05ffa1';
    opCtx.lineWidth = 3;
    opCtx.strokeRect(4, 2, 32, 52);

    // Vortex glow
    opCtx.fillStyle = '#00f3ff';
    opCtx.fillRect(8, 8, 24, 46);
    opCtx.fillStyle = '#ffffff';
    opCtx.fillRect(14, 16, 12, 30);
    scene.textures.addCanvas('portal_open', openCanvas);
  }

  // --- Glitch Core Boss ---
  static createGlitchCore(scene) {
    // 64x64 Corrupted CPU Core
    const { canvas, ctx } = TextureGenerator.createCanvas(64, 64);
    // Outer heat sinks / nodes
    ctx.fillStyle = '#1a0d24';
    ctx.fillRect(8, 8, 48, 48);

    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, 48, 48);

    // Corrupted core center
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(18, 18, 28, 28);

    // Pulsing cyber eye / CPU matrix
    ctx.fillStyle = '#ffe600';
    ctx.fillRect(26, 26, 12, 12);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(30, 30, 4, 4);

    // Glitch chips on corners
    ctx.fillStyle = '#ff007f';
    ctx.fillRect(2, 26, 6, 12);
    ctx.fillRect(56, 26, 6, 12);
    ctx.fillRect(26, 2, 12, 6);
    ctx.fillRect(26, 56, 12, 6);

    scene.textures.addCanvas('glitch_core', canvas);
  }

  // --- Particle Textures ---
  static createParticleTextures(scene) {
    const makeDot = (key, color) => {
      const { canvas, ctx } = TextureGenerator.createCanvas(8, 8);
      ctx.fillStyle = color;
      ctx.fillRect(1, 1, 6, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(2, 2, 4, 4);
      scene.textures.addCanvas(key, canvas);
    };

    makeDot('particle_cyan', '#00f3ff');
    makeDot('particle_magenta', '#ff007f');
    makeDot('particle_yellow', '#ffe600');
    makeDot('particle_green', '#05ffa1');
  }
}
