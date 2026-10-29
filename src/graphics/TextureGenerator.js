/**
 * TextureGenerator - Generates high-contrast, polished pixel-art textures
 * dynamically using HTML5 Canvas. Zero external image dependencies!
 */

export class TextureGenerator {
  static generateAll(scene) {
    TextureGenerator.createBackgroundTextures(scene);
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

  // --- Background Textures (Unique visual theme per level!) ---
  static createBackgroundTextures(scene) {
    // 1. Level 1: Localhost Wireframe & Blueprint (Dark Blue-Slate)
    const { canvas: bg1, ctx: ctx1 } = TextureGenerator.createCanvas(64, 64);
    ctx1.fillStyle = '#0a0d18';
    ctx1.fillRect(0, 0, 64, 64);
    ctx1.strokeStyle = '#141c30';
    ctx1.lineWidth = 1;
    ctx1.strokeRect(0.5, 0.5, 63, 63);
    ctx1.fillStyle = '#1e293b';
    ctx1.font = '8px monospace';
    ctx1.fillText('> 127.0.0.1', 6, 20);
    ctx1.fillStyle = '#00f3ff';
    ctx1.fillRect(6, 28, 4, 2); // Blinking cursor
    scene.textures.addCanvas('bg_level_1', bg1);
    scene.textures.addCanvas('bg_grid', bg1); // Backward compatibility

    // 2. Level 2: HTML Raw Document (Pure Clean White Paper with Black Tags!)
    const { canvas: bg2, ctx: ctx2 } = TextureGenerator.createCanvas(128, 128);
    ctx2.fillStyle = '#ffffff'; // Pure white canvas as requested!
    ctx2.fillRect(0, 0, 128, 128);
    // Subtle document margin rule (faint light-gray)
    ctx2.strokeStyle = '#f1f5f9';
    ctx2.lineWidth = 1;
    ctx2.strokeRect(0.5, 0.5, 127, 127);
    ctx2.strokeStyle = '#e2e8f0';
    ctx2.strokeRect(8.5, 8.5, 111, 111);
    // Faint unstyled HTML watermarks in light gray
    ctx2.fillStyle = '#cbd5e1';
    ctx2.font = 'bold 9px monospace';
    ctx2.fillText('<!DOCTYPE html>', 12, 24);
    ctx2.fillText('<html>', 12, 40);
    ctx2.fillText('  <body>', 12, 56);
    ctx2.fillText('    <main id="app">', 12, 72);
    ctx2.fillText('    </main>', 12, 92);
    ctx2.fillText('</html>', 12, 108);
    scene.textures.addCanvas('bg_level_2', bg2);

    // 3. Level 3: CSS Stylesheet Dark Mode (Deep Violet with Neon Syntax)
    const { canvas: bg3, ctx: ctx3 } = TextureGenerator.createCanvas(128, 128);
    ctx3.fillStyle = '#140e24';
    ctx3.fillRect(0, 0, 128, 128);
    ctx3.strokeStyle = '#22163b';
    ctx3.lineWidth = 1;
    ctx3.strokeRect(0.5, 0.5, 127, 127);
    // Faint neon purple & magenta CSS rules
    ctx3.fillStyle = '#4c2d7a';
    ctx3.font = 'bold 9px monospace';
    ctx3.fillText('.hero-banner {', 10, 24);
    ctx3.fillStyle = '#a855f7';
    ctx3.fillText('  display: flex;', 10, 42);
    ctx3.fillText('  box-shadow: neon;', 10, 60);
    ctx3.fillStyle = '#ff007f';
    ctx3.fillText('  filter: blur(0);', 10, 78);
    ctx3.fillStyle = '#4c2d7a';
    ctx3.fillText('}', 10, 96);
    scene.textures.addCanvas('bg_level_3', bg3);

    // 4. Level 4: JavaScript Event Loop & Carbon Grid (Deep Charcoal & JS Yellow)
    const { canvas: bg4, ctx: ctx4 } = TextureGenerator.createCanvas(128, 128);
    ctx4.fillStyle = '#101012';
    ctx4.fillRect(0, 0, 128, 128);
    ctx4.strokeStyle = '#232213';
    ctx4.lineWidth = 1;
    ctx4.strokeRect(0.5, 0.5, 127, 127);
    // JS Event Loop & Promise syntax
    ctx4.fillStyle = '#443f16';
    ctx4.font = 'bold 9px monospace';
    ctx4.fillText('> async function() {', 10, 24);
    ctx4.fillStyle = '#f7df1e';
    ctx4.fillText('  await Promise.all();', 10, 44);
    ctx4.fillText('  queueMicrotask();', 10, 64);
    ctx4.fillStyle = '#ca8a04';
    ctx4.fillText('  return resolve(1);', 10, 84);
    ctx4.fillStyle = '#443f16';
    ctx4.fillText('}', 10, 104);
    scene.textures.addCanvas('bg_level_4', bg4);

    // 5. Level 5: Git Merge Conflict (Split Diff Editor with Green/Red Lines)
    const { canvas: bg5, ctx: ctx5 } = TextureGenerator.createCanvas(128, 128);
    ctx5.fillStyle = '#0b1319';
    ctx5.fillRect(0, 0, 128, 128);
    ctx5.strokeStyle = '#182633';
    ctx5.lineWidth = 1;
    ctx5.strokeRect(0.5, 0.5, 127, 127);
    // Git conflict markers
    ctx5.fillStyle = '#059669';
    ctx5.font = 'bold 8px monospace';
    ctx5.fillText('<<<<<<< HEAD (local)', 8, 22);
    ctx5.fillText('+ <nav class="bridge">', 8, 38);
    ctx5.fillStyle = '#475569';
    ctx5.fillText('======= [MERGE]', 8, 56);
    ctx5.fillStyle = '#dc2626';
    ctx5.fillText('- <laser active="true">', 8, 74);
    ctx5.fillStyle = '#0284c7';
    ctx5.fillText('>>>>>>> branch-origin', 8, 92);
    scene.textures.addCanvas('bg_level_5', bg5);

    // 6. Level 6: Kernel Panic Void (Intense Pitch Black with Glitch Hex Dumps)
    const { canvas: bg6, ctx: ctx6 } = TextureGenerator.createCanvas(128, 128);
    ctx6.fillStyle = '#050308';
    ctx6.fillRect(0, 0, 128, 128);
    ctx6.strokeStyle = '#2b0716';
    ctx6.lineWidth = 1;
    ctx6.strokeRect(0.5, 0.5, 127, 127);
    // Corrupted hexadecimal crash dump
    ctx6.fillStyle = '#5c1228';
    ctx6.font = 'bold 8px monospace';
    ctx6.fillText('CRITICAL_KERNEL_PANIC', 8, 20);
    ctx6.fillStyle = '#e11d48';
    ctx6.fillText('0x7FFF0044: EXCEPTION', 8, 38);
    ctx6.fillText('SIGSEGV: CORE CORRUPTED', 8, 56);
    ctx6.fillStyle = '#9f1239';
    ctx6.fillText('VIRUS PID: 666 (RUN)', 8, 76);
    ctx6.fillText('MEMORY DUMP [0xDEADBEEF]', 8, 96);
    scene.textures.addCanvas('bg_level_6', bg6);
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

    // ========================================================
    // THEMED TILES PER LEVEL TYPE (Unique visuals per tech!)
    // ========================================================

    // --- LEVEL 2: HTML Raw Document (Black <div> blocks on pure white!) ---
    // 7. HTML Black Block (<div/>)
    const { canvas: htmlBlack, ctx: hbCtx } = TextureGenerator.createCanvas(32, 32);
    hbCtx.fillStyle = '#050505'; // Jet black
    hbCtx.fillRect(0, 0, 32, 32);
    hbCtx.strokeStyle = '#ffffff'; // Crisp white border
    hbCtx.lineWidth = 1.5;
    hbCtx.strokeRect(1, 1, 30, 30);
    hbCtx.fillStyle = '#ffffff';
    hbCtx.font = 'bold 8px monospace';
    hbCtx.textAlign = 'center';
    hbCtx.textBaseline = 'middle';
    hbCtx.fillText('<div/>', 16, 16);
    scene.textures.addCanvas('tile_html_black', htmlBlack);

    // 8. HTML Black Accent (Header / Ground)
    const { canvas: htmlAccent, ctx: haCtx } = TextureGenerator.createCanvas(32, 32);
    haCtx.fillStyle = '#000000';
    haCtx.fillRect(0, 0, 32, 32);
    haCtx.fillStyle = '#ffffff';
    haCtx.fillRect(0, 0, 32, 3); // White top border line
    haCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    haCtx.strokeRect(2, 4, 28, 26);
    haCtx.font = 'bold 7px monospace';
    haCtx.textAlign = 'center';
    haCtx.textBaseline = 'middle';
    haCtx.fillText('<main>', 16, 17);
    scene.textures.addCanvas('tile_html_black_accent', htmlAccent);

    // 9. HTML Ghost Blueprint on White (Dashed black box)
    const { canvas: htmlGhost, ctx: hgCtx } = TextureGenerator.createCanvas(32, 32);
    hgCtx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    hgCtx.fillRect(1, 1, 30, 30);
    hgCtx.strokeStyle = '#000000';
    hgCtx.lineWidth = 2;
    hgCtx.setLineDash([4, 4]);
    hgCtx.strokeRect(1, 1, 30, 30);
    hgCtx.setLineDash([]);
    hgCtx.fillStyle = '#000000';
    hgCtx.font = 'bold 8px monospace';
    hgCtx.textAlign = 'center';
    hgCtx.textBaseline = 'middle';
    hgCtx.fillText('<div/>', 16, 16);
    scene.textures.addCanvas('tile_html_ghost', htmlGhost);

    // 10. HTML Built Solid Bridge on White
    const { canvas: htmlSolid, ctx: hsCtx } = TextureGenerator.createCanvas(32, 32);
    hsCtx.fillStyle = '#000000';
    hsCtx.fillRect(0, 0, 32, 32);
    hsCtx.strokeStyle = '#ffffff';
    hsCtx.lineWidth = 2;
    hsCtx.strokeRect(1, 1, 30, 30);
    hsCtx.fillStyle = '#ffffff';
    hsCtx.font = 'bold 8px monospace';
    hsCtx.textAlign = 'center';
    hsCtx.textBaseline = 'middle';
    hsCtx.fillText('<div/>', 16, 16);
    scene.textures.addCanvas('tile_html_bridge', htmlSolid);

    // --- LEVEL 3: CSS Styled Platforms (Dark Mode & Glowing Neon Borders) ---
    // 11. CSS Styled Platform
    const { canvas: cssStyled, ctx: cstCtx } = TextureGenerator.createCanvas(32, 32);
    cstCtx.fillStyle = '#1c1033';
    cstCtx.fillRect(0, 0, 32, 32);
    cstCtx.strokeStyle = '#a855f7';
    cstCtx.lineWidth = 1.5;
    cstCtx.strokeRect(1, 1, 30, 30);
    cstCtx.fillStyle = '#c084fc';
    cstCtx.fillRect(0, 0, 32, 2);
    cstCtx.font = 'bold 7px monospace';
    cstCtx.textAlign = 'center';
    cstCtx.textBaseline = 'middle';
    cstCtx.fillText('.style', 16, 16);
    scene.textures.addCanvas('tile_css_styled', cssStyled);

    const { canvas: cssAccent, ctx: caCtx } = TextureGenerator.createCanvas(32, 32);
    caCtx.fillStyle = '#22143e';
    caCtx.fillRect(0, 0, 32, 32);
    caCtx.fillStyle = '#ff007f';
    caCtx.fillRect(0, 0, 32, 3); // Neon magenta top
    caCtx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    caCtx.strokeRect(2, 4, 28, 26);
    caCtx.fillStyle = '#ffffff';
    caCtx.font = 'bold 7px monospace';
    caCtx.textAlign = 'center';
    caCtx.textBaseline = 'middle';
    caCtx.fillText('{ css }', 16, 17);
    scene.textures.addCanvas('tile_css_styled_accent', cssAccent);

    // --- LEVEL 4: JavaScript Execution Stack (JS Yellow & Carbon) ---
    // 12. JS Stack Tile
    const { canvas: jsTile, ctx: jsCtx } = TextureGenerator.createCanvas(32, 32);
    jsCtx.fillStyle = '#18181b';
    jsCtx.fillRect(0, 0, 32, 32);
    jsCtx.strokeStyle = '#f7df1e';
    jsCtx.lineWidth = 1.5;
    jsCtx.strokeRect(1, 1, 30, 30);
    jsCtx.fillStyle = '#f7df1e';
    jsCtx.fillRect(0, 0, 32, 2);
    jsCtx.font = 'bold 8px monospace';
    jsCtx.textAlign = 'center';
    jsCtx.textBaseline = 'middle';
    jsCtx.fillText('[stack]', 16, 16);
    scene.textures.addCanvas('tile_js_stack', jsTile);

    const { canvas: jsAccent, ctx: jsaCtx } = TextureGenerator.createCanvas(32, 32);
    jsaCtx.fillStyle = '#141416';
    jsaCtx.fillRect(0, 0, 32, 32);
    jsaCtx.fillStyle = '#f7df1e';
    jsaCtx.fillRect(0, 0, 32, 3); // Bold JS yellow top
    jsaCtx.strokeStyle = 'rgba(247, 223, 30, 0.4)';
    jsaCtx.strokeRect(2, 4, 28, 26);
    jsaCtx.font = 'bold 7px monospace';
    jsaCtx.textAlign = 'center';
    jsaCtx.textBaseline = 'middle';
    jsaCtx.fillText('> JS', 16, 17);
    scene.textures.addCanvas('tile_js_stack_accent', jsAccent);

    // --- LEVEL 5: Git Merge Conflict (Diff additions & branch line) ---
    // 13. Git Diff Add Platform
    const { canvas: gitAdd, ctx: gaCtx } = TextureGenerator.createCanvas(32, 32);
    gaCtx.fillStyle = '#064e3b';
    gaCtx.fillRect(0, 0, 32, 32);
    gaCtx.strokeStyle = '#10b981';
    gaCtx.lineWidth = 1.5;
    gaCtx.strokeRect(1, 1, 30, 30);
    gaCtx.fillStyle = '#10b981';
    gaCtx.fillRect(0, 0, 32, 2);
    gaCtx.fillStyle = '#ffffff';
    gaCtx.font = 'bold 8px monospace';
    gaCtx.textAlign = 'center';
    gaCtx.textBaseline = 'middle';
    gaCtx.fillText('+ diff', 16, 16);
    scene.textures.addCanvas('tile_git_add', gitAdd);

    const { canvas: gitAccent, ctx: gtaCtx } = TextureGenerator.createCanvas(32, 32);
    gtaCtx.fillStyle = '#04382a';
    gtaCtx.fillRect(0, 0, 32, 32);
    gtaCtx.fillStyle = '#10b981';
    gtaCtx.fillRect(0, 0, 32, 3); // Bold diff green
    gtaCtx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    gtaCtx.strokeRect(2, 4, 28, 26);
    gtaCtx.fillStyle = '#ffffff';
    gtaCtx.font = 'bold 7px monospace';
    gtaCtx.textAlign = 'center';
    gtaCtx.textBaseline = 'middle';
    gtaCtx.fillText('+ HEAD', 16, 17);
    scene.textures.addCanvas('tile_git_accent', gitAccent);

    // --- LEVEL 6: Kernel Panic Corrupted Hex ---
    // 14. Corrupted Hex Memory Tile
    const { canvas: hexTile, ctx: hxCtx } = TextureGenerator.createCanvas(32, 32);
    hxCtx.fillStyle = '#08030a';
    hxCtx.fillRect(0, 0, 32, 32);
    hxCtx.strokeStyle = '#ef4444';
    hxCtx.lineWidth = 1.5;
    hxCtx.strokeRect(1, 1, 30, 30);
    hxCtx.fillStyle = '#ef4444';
    hxCtx.fillRect(0, 0, 32, 2);
    hxCtx.font = 'bold 7px monospace';
    hxCtx.textAlign = 'center';
    hxCtx.textBaseline = 'middle';
    hxCtx.fillText('0xERR', 16, 16);
    scene.textures.addCanvas('tile_corrupted_hex', hexTile);

    const { canvas: hexAccent, ctx: hxaCtx } = TextureGenerator.createCanvas(32, 32);
    hxaCtx.fillStyle = '#050207';
    hxaCtx.fillRect(0, 0, 32, 32);
    hxaCtx.fillStyle = '#ef4444';
    hxaCtx.fillRect(0, 0, 32, 3); // Flashing red top
    hxaCtx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    hxaCtx.strokeRect(2, 4, 28, 26);
    hxaCtx.fillStyle = '#ffffff';
    hxaCtx.font = 'bold 7px monospace';
    hxaCtx.textAlign = 'center';
    hxaCtx.textBaseline = 'middle';
    hxaCtx.fillText('KERNEL', 16, 17);
    scene.textures.addCanvas('tile_corrupted_accent', hexAccent);
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

    // 4. HTML Raw Spikes (Black thorns with red 404 tip for Level 2 white document)
    const { canvas: htmlSpikeCanvas, ctx: hsCtx } = TextureGenerator.createCanvas(32, 32);
    hsCtx.fillStyle = '#000000'; // Black spikes
    for (let i = 0; i < 4; i++) {
      hsCtx.beginPath();
      hsCtx.moveTo(i * 8, 32);
      hsCtx.lineTo(i * 8 + 4, 10);
      hsCtx.lineTo(i * 8 + 8, 32);
      hsCtx.closePath();
      hsCtx.fill();
    }
    // Red 404 error tips
    hsCtx.fillStyle = '#dc2626';
    for (let i = 0; i < 4; i++) {
      hsCtx.fillRect(i * 8 + 3, 10, 2, 5);
    }
    scene.textures.addCanvas('hazard_spikes_html', htmlSpikeCanvas);
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
