import { Storage } from '../systems/Storage.js';

export const SKINS_DATA = {
  default: {
    id: 'default',
    namePt: 'Developer Clássico',
    nameEn: 'Classic Developer',
    descPt: 'Hoodie preto, calças de ganga e headphones',
    descEn: 'Black hoodie, denim jeans and headphones',
    headband: '#22252e',
    headbandAccent: '#ff3355',
    hair: '#5c3317',
    hairHighlight: '#7d4922',
    skin: '#ffd2b6',
    skinShade: '#e2aa8e',
    eyeColor: '#1c202a',
    hpOuter: '#181a20',
    hpLed: '#ff3355',
    hpCushion: '#2e313b',
    hoodieBody: '#18181c',
    hoodieCollar: '#101014',
    hoodieHighlight: '#2c2d38',
    hoodiePocket: '#111115',
    drawstring: '#e6e6e6',
    drawstringTip: '#ffffff',
    pants: '#2e5788',
    pantsHighlight: '#4878b2',
    pantsShadow: '#1c385c',
    sneakerBody: '#ffffff',
    sneakerStripe: '#ff3355',
    sneakerSole: '#1c1c22'
  },
  cyber: {
    id: 'cyber',
    namePt: 'Cyber Hacker',
    nameEn: 'Cyber Hacker',
    descPt: 'Hoodie néon ciano/magenta com reflexos futuristas',
    descEn: 'Neon cyan/magenta futuristic glow',
    headband: '#0f172a',
    headbandAccent: '#00f3ff',
    hair: '#cbd5e1',
    hairHighlight: '#f8fafc',
    skin: '#ffedd5',
    skinShade: '#fed7aa',
    eyeColor: '#00f3ff',
    hpOuter: '#0f172a',
    hpLed: '#00f3ff',
    hpCushion: '#1e293b',
    hoodieBody: '#0b1120',
    hoodieCollar: '#070b14',
    hoodieHighlight: '#00f3ff',
    hoodiePocket: '#0f172a',
    drawstring: '#f43f5e',
    drawstringTip: '#00f3ff',
    pants: '#1e1b4b',
    pantsHighlight: '#38bdf8',
    pantsShadow: '#0f0e26',
    sneakerBody: '#00f3ff',
    sneakerStripe: '#f43f5e',
    sneakerSole: '#020617'
  },
  stealth: {
    id: 'stealth',
    namePt: 'Dark Mode Coder',
    nameEn: 'Dark Mode Coder',
    descPt: 'Modo escuro total com verde terminal',
    descEn: 'Total dark mode with terminal green',
    headband: '#0a0a0a',
    headbandAccent: '#10b981',
    hair: '#1e293b',
    hairHighlight: '#334155',
    skin: '#fed7aa',
    skinShade: '#fcd34d',
    eyeColor: '#10b981',
    hpOuter: '#0a0a0a',
    hpLed: '#10b981',
    hpCushion: '#171717',
    hoodieBody: '#09090b',
    hoodieCollar: '#050507',
    hoodieHighlight: '#27272a',
    hoodiePocket: '#18181b',
    drawstring: '#10b981',
    drawstringTip: '#34d399',
    pants: '#18181b',
    pantsHighlight: '#27272a',
    pantsShadow: '#09090b',
    sneakerBody: '#18181b',
    sneakerStripe: '#10b981',
    sneakerSole: '#09090b'
  },
  synth: {
    id: 'synth',
    namePt: 'Synthwave Retro',
    nameEn: 'Synthwave Retro',
    descPt: 'Roxo retro dos anos 80 e ganga violeta',
    descEn: '80s retro purple & violet denim',
    headband: '#3b0764',
    headbandAccent: '#e879f9',
    hair: '#b45309',
    hairHighlight: '#d97706',
    skin: '#ffd2b6',
    skinShade: '#e2aa8e',
    eyeColor: '#e879f9',
    hpOuter: '#3b0764',
    hpLed: '#e879f9',
    hpCushion: '#581c87',
    hoodieBody: '#581c87',
    hoodieCollar: '#3b0764',
    hoodieHighlight: '#9333ea',
    hoodiePocket: '#3b0764',
    drawstring: '#facc15',
    drawstringTip: '#fde047',
    pants: '#6b21a8',
    pantsHighlight: '#a855f7',
    pantsShadow: '#3b0764',
    sneakerBody: '#ffffff',
    sneakerStripe: '#e879f9',
    sneakerSole: '#1e1b4b'
  },
  coordinator: {
    id: 'coordinator',
    namePt: 'Developer Coordenador',
    nameEn: 'Lead Coordinator Developer',
    descPt: 'Homem branco, camisa azul escura, calças de ganga, óculos e cabelo branco em crista',
    descEn: 'Fair skin, dark navy shirt, denim jeans, glasses and white crest hair',
    isCoordinator: true,
    hasGlasses: true,
    hasMohawk: true,
    hasShirt: true,
    hair: '#f1f5f9',
    hairHighlight: '#ffffff',
    hairShadow: '#cbd5e1',
    skin: '#ffd9be',
    skinShade: '#e2ab90',
    eyeColor: '#1e293b',
    glassesFrame: '#0f172a',
    glassesLens: '#e0f2fe',
    shirtBody: '#172554',
    shirtCollar: '#1e3a8a',
    shirtHighlight: '#2563eb',
    shirtButtons: '#e2e8f0',
    pants: '#1d4ed8',
    pantsHighlight: '#3b82f6',
    pantsShadow: '#1e3a8a',
    sneakerBody: '#334155',
    sneakerStripe: '#94a3b8',
    sneakerSole: '#0f172a',
    headband: 'transparent',
    headbandAccent: 'transparent',
    hpOuter: 'transparent',
    hpLed: 'transparent',
    hpCushion: 'transparent',
    hoodieBody: '#172554',
    hoodieCollar: '#1e3a8a',
    hoodieHighlight: '#2563eb',
    hoodiePocket: '#172554',
    drawstring: 'transparent',
    drawstringTip: 'transparent'
  }
};

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
    TextureGenerator.createGiantHammerTextures(scene);
    TextureGenerator.createAiSprites(scene);
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

    // 5. Level 5: Testes & Performance (DevTools Profiler / Test Suite / Latency Markers)
    const { canvas: bg5, ctx: ctx5 } = TextureGenerator.createCanvas(128, 128);
    ctx5.fillStyle = '#091118';
    ctx5.fillRect(0, 0, 128, 128);
    ctx5.strokeStyle = '#132838';
    ctx5.lineWidth = 1;
    ctx5.strokeRect(0.5, 0.5, 127, 127);
    // Latency & Profiler metrics
    ctx5.fillStyle = '#10b981';
    ctx5.font = 'bold 8px monospace';
    ctx5.fillText('> PASS: test_suite.ts', 8, 20);
    ctx5.fillText('  ✓ render(): 16.6ms [60fps]', 8, 38);
    ctx5.fillStyle = '#f59e0b';
    ctx5.fillText('  ! memory_leak: 84.2MB', 8, 56);
    ctx5.fillStyle = '#ef4444';
    ctx5.fillText('  ✗ ERROR_BUG_ACTIVE: 500', 8, 76);
    ctx5.fillStyle = '#38bdf8';
    ctx5.fillText('  expect(system).toBeOk()', 8, 96);
    scene.textures.addCanvas('bg_level_5', bg5);

    // 6. Level 6: Inteligência Artificial (Deep Neural Network Synapses & Tensor Matrices)
    const { canvas: bg6, ctx: ctx6 } = TextureGenerator.createCanvas(128, 128);
    ctx6.fillStyle = '#070814';
    ctx6.fillRect(0, 0, 128, 128);
    ctx6.strokeStyle = '#1b1a3d';
    ctx6.lineWidth = 1;
    ctx6.strokeRect(0.5, 0.5, 127, 127);
    // Synaptic connections & model tokens
    ctx6.fillStyle = '#8b5cf6';
    ctx6.font = 'bold 8px monospace';
    ctx6.fillText('> MODEL: LLM_COPILOT_v4', 8, 20);
    ctx6.fillStyle = '#a78bfa';
    ctx6.fillText('  Attention(Q, K, V) / √d', 8, 38);
    ctx6.fillText('  Embedding[768] ~ Converged', 8, 56);
    ctx6.fillStyle = '#00e5ff';
    ctx6.fillText('  Prompt: "restore_bridge"', 8, 76);
    ctx6.fillStyle = '#10b981';
    ctx6.fillText('  Inference Loss: 0.001', 8, 96);
    scene.textures.addCanvas('bg_level_6', bg6);

    // 7. Level 7: Git Merge Conflict (Split Diff Editor with Green/Red Lines)
    const { canvas: bg7, ctx: ctx7 } = TextureGenerator.createCanvas(128, 128);
    ctx7.fillStyle = '#0b1319';
    ctx7.fillRect(0, 0, 128, 128);
    ctx7.strokeStyle = '#182633';
    ctx7.lineWidth = 1;
    ctx7.strokeRect(0.5, 0.5, 127, 127);
    // Git conflict markers
    ctx7.fillStyle = '#059669';
    ctx7.font = 'bold 8px monospace';
    ctx7.fillText('<<<<<<< HEAD (local)', 8, 22);
    ctx7.fillText('+ <nav class="bridge">', 8, 38);
    ctx7.fillStyle = '#475569';
    ctx7.fillText('======= [MERGE]', 8, 56);
    ctx7.fillStyle = '#dc2626';
    ctx7.fillText('- <laser active="true">', 8, 74);
    ctx7.fillStyle = '#0284c7';
    ctx7.fillText('>>>>>>> branch-origin', 8, 92);
    scene.textures.addCanvas('bg_level_7', bg7);

    // 8. Level 8: Kernel Panic Void (Intense Pitch Black with Glitch Hex Dumps)
    const { canvas: bg8, ctx: ctx8 } = TextureGenerator.createCanvas(128, 128);
    ctx8.fillStyle = '#050308';
    ctx8.fillRect(0, 0, 128, 128);
    ctx8.strokeStyle = '#2b0716';
    ctx8.lineWidth = 1;
    ctx8.strokeRect(0.5, 0.5, 127, 127);
    // Corrupted hexadecimal crash dump
    ctx8.fillStyle = '#5c1228';
    ctx8.font = 'bold 8px monospace';
    ctx8.fillText('CRITICAL_KERNEL_PANIC', 8, 20);
    ctx8.fillStyle = '#e11d48';
    ctx8.fillText('0x7FFF0044: EXCEPTION', 8, 38);
    ctx8.fillText('SIGSEGV: CORE CORRUPTED', 8, 56);
    ctx8.fillStyle = '#9f1239';
    ctx8.fillText('VIRUS PID: 666 (RUN)', 8, 76);
    ctx8.fillText('MEMORY DUMP [0xDEADBEEF]', 8, 96);
    scene.textures.addCanvas('bg_level_8', bg8);
  }

  // --- Player Sprites with Multi-Skin Support ---
  static drawCharacterFrame(ctx, xOffset, frameType, tick = 0, p = SKINS_DATA.default) {
    const ox = xOffset;
    const oy = 0;

    // Subtle breathing bob in idle
    const bob = frameType === 'idle' ? (tick % 2 === 0 ? 0 : 1) : 0;

    if (p.isCoordinator) {
      // --- DEVELOPER COORDENADOR ---
      // 1. CABELO BRANCO EM CRISTA (White Crest / Mohawk)
      ctx.fillStyle = p.hair;
      ctx.fillRect(ox + 14, oy + 1 + bob, 4, 7);
      ctx.fillRect(ox + 15, oy + 0 + bob, 2, 2); // Top peak
      ctx.fillStyle = p.hairHighlight;
      ctx.fillRect(ox + 15, oy + 1 + bob, 2, 6); // Bright white center
      ctx.fillStyle = p.hairShadow || '#cbd5e1';
      ctx.fillRect(ox + 13, oy + 4 + bob, 1, 4);
      ctx.fillRect(ox + 18, oy + 4 + bob, 1, 4);

      // 2. FACE & SKIN (Homem Branco)
      ctx.fillStyle = p.skin;
      ctx.fillRect(ox + 12, oy + 7 + bob, 8, 7);
      ctx.fillRect(ox + 13, oy + 14 + bob, 6, 2); // Chin
      // Face shading
      ctx.fillStyle = p.skinShade;
      ctx.fillRect(ox + 12, oy + 13 + bob, 8, 1);
      // Ears
      ctx.fillStyle = p.skin;
      ctx.fillRect(ox + 10, oy + 9 + bob, 2, 3);
      ctx.fillRect(ox + 20, oy + 9 + bob, 2, 3);

      // 3. ÓCULOS (Glasses with frames, bridge, glint)
      ctx.fillStyle = p.glassesFrame || '#0f172a';
      ctx.fillRect(ox + 13, oy + 9 + bob, 3, 3); // Left frame
      ctx.fillRect(ox + 17, oy + 9 + bob, 3, 3); // Right frame
      ctx.fillRect(ox + 16, oy + 10 + bob, 1, 1); // Bridge
      ctx.fillRect(ox + 11, oy + 10 + bob, 2, 1); // Left temple
      ctx.fillRect(ox + 20, oy + 10 + bob, 1, 1); // Right temple
      // Eyes behind glasses
      ctx.fillStyle = p.eyeColor || '#1e293b';
      ctx.fillRect(ox + 14, oy + 10 + bob, 1, 1);
      ctx.fillRect(ox + 18, oy + 10 + bob, 1, 1);
      // Glass specular glint
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ox + 13, oy + 9 + bob, 1, 1);
      ctx.fillRect(ox + 17, oy + 9 + bob, 1, 1);

      // 4. CAMISA AZUL ESCURA (Dark Navy Blue Shirt)
      ctx.fillStyle = p.shirtBody || '#172554';
      ctx.fillRect(ox + 10, oy + 16 + bob, 12, 8);
      // Shirt collar
      ctx.fillStyle = p.shirtCollar || '#1e3a8a';
      ctx.fillRect(ox + 12, oy + 15 + bob, 3, 2);
      ctx.fillRect(ox + 17, oy + 15 + bob, 3, 2);
      ctx.fillStyle = p.skin;
      ctx.fillRect(ox + 15, oy + 15 + bob, 2, 2); // Open neck
      // Shoulder fold
      ctx.fillStyle = p.shirtHighlight || '#2563eb';
      ctx.fillRect(ox + 10, oy + 16 + bob, 12, 1);
      // Button placket
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(ox + 15, oy + 17 + bob, 2, 7);
      ctx.fillStyle = p.shirtButtons || '#e2e8f0';
      ctx.fillRect(ox + 15, oy + 18 + bob, 1, 1);
      ctx.fillRect(ox + 15, oy + 21 + bob, 1, 1);
      // Belt
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(ox + 10, oy + 23 + bob, 12, 1);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(ox + 15, oy + 23 + bob, 2, 1);
    } else {
      // 1. OVER-EAR HEADPHONES (Top Headband Arch)
      ctx.fillStyle = p.headband;
      ctx.fillRect(ox + 11, oy + 3 + bob, 10, 2);
      ctx.fillStyle = p.headbandAccent;
      ctx.fillRect(ox + 13, oy + 2 + bob, 6, 2);

      // 2. HAIR
      ctx.fillStyle = p.hair;
      ctx.fillRect(ox + 11, oy + 5 + bob, 10, 4);
      ctx.fillRect(ox + 12, oy + 4 + bob, 8, 2);
      ctx.fillRect(ox + 12, oy + 8 + bob, 8, 2);
      ctx.fillRect(ox + 12, oy + 10 + bob, 2, 1);
      ctx.fillRect(ox + 16, oy + 10 + bob, 3, 1);
      // Highlights
      ctx.fillStyle = p.hairHighlight;
      ctx.fillRect(ox + 14, oy + 5 + bob, 4, 2);

      // 3. FACE & SKIN
      ctx.fillStyle = p.skin;
      ctx.fillRect(ox + 12, oy + 9 + bob, 8, 5);
      ctx.fillRect(ox + 13, oy + 14 + bob, 6, 2); // chin
      // Face shading
      ctx.fillStyle = p.skinShade;
      ctx.fillRect(ox + 12, oy + 13 + bob, 8, 1);
      // Eyes with specular glint
      ctx.fillStyle = p.eyeColor;
      ctx.fillRect(ox + 14, oy + 11 + bob, 2, 2);
      ctx.fillRect(ox + 18, oy + 11 + bob, 2, 2);
      ctx.fillStyle = '#ffffff'; // sparkle
      ctx.fillRect(ox + 15, oy + 11 + bob, 1, 1);
      ctx.fillRect(ox + 19, oy + 11 + bob, 1, 1);

      // 4. OVER-EAR HEADPHONES (Earcups on sides of head)
      // Left earcup
      ctx.fillStyle = p.hpOuter;
      ctx.fillRect(ox + 8, oy + 7 + bob, 3, 7);
      ctx.fillStyle = p.hpLed;
      ctx.fillRect(ox + 8, oy + 9 + bob, 2, 3);
      ctx.fillStyle = p.hpCushion;
      ctx.fillRect(ox + 10, oy + 8 + bob, 2, 5);

      // Right earcup
      ctx.fillStyle = p.hpOuter;
      ctx.fillRect(ox + 21, oy + 7 + bob, 3, 7);
      ctx.fillStyle = p.hpLed;
      ctx.fillRect(ox + 22, oy + 9 + bob, 2, 3);
      ctx.fillStyle = p.hpCushion;
      ctx.fillRect(ox + 20, oy + 8 + bob, 2, 5);

      // 5. HOODIE (Torso & Collar)
      ctx.fillStyle = p.hoodieCollar;
      ctx.fillRect(ox + 11, oy + 15 + bob, 10, 2);
      ctx.fillStyle = p.hoodieBody;
      ctx.fillRect(ox + 10, oy + 16 + bob, 12, 8);
      // Shoulder highlight
      ctx.fillStyle = p.hoodieHighlight;
      ctx.fillRect(ox + 10, oy + 16 + bob, 12, 1);
      // Kangaroo pocket
      ctx.fillStyle = p.hoodiePocket;
      ctx.fillRect(ox + 12, oy + 20 + bob, 8, 4);
      ctx.fillStyle = p.hoodieHighlight;
      ctx.fillRect(ox + 12, oy + 20 + bob, 8, 1);
      // Drawstrings with aglets
      ctx.fillStyle = p.drawstring;
      ctx.fillRect(ox + 13, oy + 17 + bob, 1, 4);
      ctx.fillRect(ox + 18, oy + 17 + bob, 1, 4);
      ctx.fillStyle = p.drawstringTip;
      ctx.fillRect(ox + 13, oy + 20 + bob, 1, 1);
      ctx.fillRect(ox + 18, oy + 20 + bob, 1, 1);
    }

    // 6. ARMS & HANDS
    ctx.fillStyle = p.isCoordinator ? (p.shirtBody || '#172554') : p.hoodieBody;
    if (frameType === 'run') {
      const step = tick % 4;
      if (step === 0) {
        ctx.fillRect(ox + 7, oy + 18 + bob, 3, 5);
        ctx.fillRect(ox + 22, oy + 16 + bob, 3, 5);
        ctx.fillStyle = p.skin;
        ctx.fillRect(ox + 7, oy + 23 + bob, 2, 2);
        ctx.fillRect(ox + 22, oy + 21 + bob, 2, 2);
      } else if (step === 1) {
        ctx.fillRect(ox + 8, oy + 17 + bob, 3, 5);
        ctx.fillRect(ox + 21, oy + 17 + bob, 3, 5);
        ctx.fillStyle = p.skin;
        ctx.fillRect(ox + 8, oy + 22 + bob, 2, 2);
        ctx.fillRect(ox + 21, oy + 22 + bob, 2, 2);
      } else if (step === 2) {
        ctx.fillRect(ox + 7, oy + 16 + bob, 3, 5);
        ctx.fillRect(ox + 22, oy + 18 + bob, 3, 5);
        ctx.fillStyle = p.skin;
        ctx.fillRect(ox + 7, oy + 21 + bob, 2, 2);
        ctx.fillRect(ox + 22, oy + 23 + bob, 2, 2);
      } else {
        ctx.fillRect(ox + 8, oy + 17 + bob, 3, 5);
        ctx.fillRect(ox + 21, oy + 17 + bob, 3, 5);
        ctx.fillStyle = p.skin;
        ctx.fillRect(ox + 8, oy + 22 + bob, 2, 2);
        ctx.fillRect(ox + 21, oy + 22 + bob, 2, 2);
      }
    } else if (frameType === 'jump') {
      ctx.fillRect(ox + 7, oy + 14, 3, 6);
      ctx.fillRect(ox + 22, oy + 14, 3, 6);
      ctx.fillStyle = p.skin;
      ctx.fillRect(ox + 7, oy + 20, 3, 2);
      ctx.fillRect(ox + 22, oy + 20, 3, 2);
    } else {
      ctx.fillRect(ox + 8, oy + 17 + bob, 2, 6);
      ctx.fillRect(ox + 22, oy + 17 + bob, 2, 6);
      ctx.fillStyle = p.skin;
      ctx.fillRect(ox + 8, oy + 23 + bob, 2, 2);
      ctx.fillRect(ox + 22, oy + 23 + bob, 2, 2);
    }

    // 7. PANTS & SNEAKERS
    if (frameType === 'idle') {
      ctx.fillStyle = p.pants;
      ctx.fillRect(ox + 11, oy + 24 + bob, 4, 5);
      ctx.fillRect(ox + 17, oy + 24 + bob, 4, 5);
      ctx.fillStyle = p.pantsHighlight;
      ctx.fillRect(ox + 12, oy + 26 + bob, 2, 2);
      ctx.fillRect(ox + 18, oy + 26 + bob, 2, 2);
      ctx.fillStyle = p.pantsShadow;
      ctx.fillRect(ox + 15, oy + 24 + bob, 2, 4);

      // Sneakers
      ctx.fillStyle = p.sneakerBody;
      ctx.fillRect(ox + 10, oy + 29 + bob, 5, 2);
      ctx.fillRect(ox + 17, oy + 29 + bob, 5, 2);
      ctx.fillStyle = p.sneakerStripe;
      ctx.fillRect(ox + 11, oy + 29 + bob, 2, 1);
      ctx.fillRect(ox + 18, oy + 29 + bob, 2, 1);
      ctx.fillStyle = p.sneakerSole;
      ctx.fillRect(ox + 10, oy + 31 + bob, 5, 1);
      ctx.fillRect(ox + 17, oy + 31 + bob, 5, 1);
    } else if (frameType === 'run') {
      const step = tick % 4;
      ctx.fillStyle = p.pants;
      if (step === 0) {
        ctx.fillRect(ox + 9, oy + 24, 4, 5);
        ctx.fillRect(ox + 18, oy + 23, 4, 5);
        ctx.fillStyle = p.pantsHighlight;
        ctx.fillRect(ox + 19, oy + 24, 2, 2);
        ctx.fillStyle = p.sneakerBody;
        ctx.fillRect(ox + 8, oy + 29, 6, 2);
        ctx.fillRect(ox + 19, oy + 28, 5, 2);
        ctx.fillStyle = p.sneakerStripe;
        ctx.fillRect(ox + 10, oy + 29, 2, 1);
        ctx.fillRect(ox + 20, oy + 28, 2, 1);
        ctx.fillStyle = p.sneakerSole;
        ctx.fillRect(ox + 8, oy + 31, 6, 1);
        ctx.fillRect(ox + 19, oy + 30, 5, 1);
      } else if (step === 1) {
        ctx.fillRect(ox + 11, oy + 24, 4, 5);
        ctx.fillRect(ox + 17, oy + 24, 4, 5);
        ctx.fillStyle = p.pantsHighlight;
        ctx.fillRect(ox + 12, oy + 25, 2, 2);
        ctx.fillRect(ox + 18, oy + 25, 2, 2);
        ctx.fillStyle = p.sneakerBody;
        ctx.fillRect(ox + 10, oy + 29, 5, 2);
        ctx.fillRect(ox + 17, oy + 29, 5, 2);
        ctx.fillStyle = p.sneakerStripe;
        ctx.fillRect(ox + 11, oy + 29, 2, 1);
        ctx.fillRect(ox + 18, oy + 29, 2, 1);
        ctx.fillStyle = p.sneakerSole;
        ctx.fillRect(ox + 10, oy + 31, 5, 1);
        ctx.fillRect(ox + 17, oy + 31, 5, 1);
      } else if (step === 2) {
        ctx.fillRect(ox + 18, oy + 24, 4, 5);
        ctx.fillRect(ox + 10, oy + 23, 4, 5);
        ctx.fillStyle = p.pantsHighlight;
        ctx.fillRect(ox + 11, oy + 24, 2, 2);
        ctx.fillStyle = p.sneakerBody;
        ctx.fillRect(ox + 18, oy + 29, 6, 2);
        ctx.fillRect(ox + 9, oy + 28, 5, 2);
        ctx.fillStyle = p.sneakerStripe;
        ctx.fillRect(ox + 20, oy + 29, 2, 1);
        ctx.fillRect(ox + 10, oy + 28, 2, 1);
        ctx.fillStyle = p.sneakerSole;
        ctx.fillRect(ox + 18, oy + 31, 6, 1);
        ctx.fillRect(ox + 9, oy + 30, 5, 1);
      } else {
        ctx.fillRect(ox + 11, oy + 24, 4, 5);
        ctx.fillRect(ox + 17, oy + 24, 4, 5);
        ctx.fillStyle = p.pantsHighlight;
        ctx.fillRect(ox + 12, oy + 25, 2, 2);
        ctx.fillRect(ox + 18, oy + 25, 2, 2);
        ctx.fillStyle = p.sneakerBody;
        ctx.fillRect(ox + 11, oy + 29, 5, 2);
        ctx.fillRect(ox + 16, oy + 29, 5, 2);
        ctx.fillStyle = p.sneakerStripe;
        ctx.fillRect(ox + 12, oy + 29, 2, 1);
        ctx.fillRect(ox + 17, oy + 29, 2, 1);
        ctx.fillStyle = p.sneakerSole;
        ctx.fillRect(ox + 11, oy + 31, 5, 1);
        ctx.fillRect(ox + 16, oy + 31, 5, 1);
      }
    } else if (frameType === 'jump') {
      ctx.fillStyle = p.pants;
      ctx.fillRect(ox + 10, oy + 23, 4, 4);
      ctx.fillRect(ox + 18, oy + 22, 4, 5);
      ctx.fillStyle = p.pantsHighlight;
      ctx.fillRect(ox + 11, oy + 24, 2, 2);
      ctx.fillRect(ox + 19, oy + 23, 2, 2);
      ctx.fillStyle = p.sneakerBody;
      ctx.fillRect(ox + 9, oy + 27, 5, 2);
      ctx.fillRect(ox + 18, oy + 27, 5, 2);
      ctx.fillStyle = p.sneakerStripe;
      ctx.fillRect(ox + 10, oy + 27, 2, 1);
      ctx.fillRect(ox + 19, oy + 27, 2, 1);
      ctx.fillStyle = p.sneakerSole;
      ctx.fillRect(ox + 9, oy + 29, 5, 1);
      ctx.fillRect(ox + 18, oy + 29, 5, 1);
    }
  }

  static createPlayerSprites(scene) {
    const activeSkin = Storage.getSkin() || 'default';

    // Generate sheets for all available skins
    Object.keys(SKINS_DATA).forEach(skinKey => {
      const palette = SKINS_DATA[skinKey];

      // Idle sheet: 128x32 (4 frames)
      const { canvas: idleCanvas, ctx: idleCtx } = TextureGenerator.createCanvas(128, 32);
      for (let i = 0; i < 4; i++) {
        TextureGenerator.drawCharacterFrame(idleCtx, i * 32, 'idle', i, palette);
      }
      const idleTex = scene.textures.addCanvas(`player_idle_${skinKey}`, idleCanvas);
      for (let i = 0; i < 4; i++) {
        idleTex.add(i, 0, i * 32, 0, 32, 32);
      }

      // Run sheet: 128x32 (4 frames)
      const { canvas: runCanvas, ctx: runCtx } = TextureGenerator.createCanvas(128, 32);
      for (let i = 0; i < 4; i++) {
        TextureGenerator.drawCharacterFrame(runCtx, i * 32, 'run', i, palette);
      }
      const runTex = scene.textures.addCanvas(`player_run_${skinKey}`, runCanvas);
      for (let i = 0; i < 4; i++) {
        runTex.add(i, 0, i * 32, 0, 32, 32);
      }

      // Jump frame: 32x32
      const { canvas: jumpCanvas, ctx: jumpCtx } = TextureGenerator.createCanvas(32, 32);
      TextureGenerator.drawCharacterFrame(jumpCtx, 0, 'jump', 0, palette);
      scene.textures.addCanvas(`player_jump_${skinKey}`, jumpCanvas);
    });

    // Alias active skin to default keys 'player_idle', 'player_run', 'player_jump'
    TextureGenerator.applySkinToActiveTextures(scene, activeSkin);
  }

  static applySkinToActiveTextures(scene, skinKey) {
    const palette = SKINS_DATA[skinKey] || SKINS_DATA.default;

    // Remove existing if present to cleanly replace
    if (scene.textures.exists('player_idle')) scene.textures.remove('player_idle');
    if (scene.textures.exists('player_run')) scene.textures.remove('player_run');
    if (scene.textures.exists('player_jump')) scene.textures.remove('player_jump');

    // Create active idle
    const { canvas: idleCanvas, ctx: idleCtx } = TextureGenerator.createCanvas(128, 32);
    for (let i = 0; i < 4; i++) {
      TextureGenerator.drawCharacterFrame(idleCtx, i * 32, 'idle', i, palette);
    }
    const idleTex = scene.textures.addCanvas('player_idle', idleCanvas);
    for (let i = 0; i < 4; i++) {
      idleTex.add(i, 0, i * 32, 0, 32, 32);
    }

    // Create active run
    const { canvas: runCanvas, ctx: runCtx } = TextureGenerator.createCanvas(128, 32);
    for (let i = 0; i < 4; i++) {
      TextureGenerator.drawCharacterFrame(runCtx, i * 32, 'run', i, palette);
    }
    const runTex = scene.textures.addCanvas('player_run', runCanvas);
    for (let i = 0; i < 4; i++) {
      runTex.add(i, 0, i * 32, 0, 32, 32);
    }

    // Create active jump
    const { canvas: jumpCanvas, ctx: jumpCtx } = TextureGenerator.createCanvas(32, 32);
    TextureGenerator.drawCharacterFrame(jumpCtx, 0, 'jump', 0, palette);
    scene.textures.addCanvas('player_jump', jumpCanvas);

    // Rebind animations if animation manager exists
    if (scene.anims) {
      if (scene.anims.exists('idle')) scene.anims.remove('idle');
      if (scene.anims.exists('run')) scene.anims.remove('run');
      scene.anims.create({
        key: 'idle',
        frames: scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      });
      scene.anims.create({
        key: 'run',
        frames: scene.anims.generateFrameNumbers('player_run', { start: 0, end: 3 }),
        frameRate: 11,
        repeat: -1
      });
    }
  }

  // Draw clean standalone preview of a skin onto an HTML canvas element
  static drawSkinPreview(canvas, skinKey = 'default') {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const palette = SKINS_DATA[skinKey] || SKINS_DATA.default;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 32;
    offCanvas.height = 32;
    const offCtx = offCanvas.getContext('2d');
    offCtx.imageSmoothingEnabled = false;
    TextureGenerator.drawCharacterFrame(offCtx, 0, 'idle', 0, palette);

    const scale = Math.min(canvas.width / 32, canvas.height / 32);
    const dw = 32 * scale;
    const dh = 32 * scale;
    const dx = Math.round((canvas.width - dw) / 2);
    const dy = Math.round((canvas.height - dh) / 2);
    ctx.drawImage(offCanvas, dx, dy, dw, dh);
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

    // --- LEVEL 5: Testes & Performance (Profiler & Assertion tiles) ---
    const { canvas: testTile, ctx: ttCtx } = TextureGenerator.createCanvas(32, 32);
    ttCtx.fillStyle = '#0a171d';
    ttCtx.fillRect(0, 0, 32, 32);
    ttCtx.strokeStyle = '#10b981';
    ttCtx.lineWidth = 1.5;
    ttCtx.strokeRect(1, 1, 30, 30);
    ttCtx.fillStyle = '#10b981';
    ttCtx.fillRect(0, 0, 32, 2);
    ttCtx.font = 'bold 7px monospace';
    ttCtx.textAlign = 'center';
    ttCtx.textBaseline = 'middle';
    ttCtx.fillText('✓ PASS', 16, 16);
    scene.textures.addCanvas('tile_test_runner', testTile);

    const { canvas: testAccent, ctx: ttaCtx } = TextureGenerator.createCanvas(32, 32);
    ttaCtx.fillStyle = '#061014';
    ttaCtx.fillRect(0, 0, 32, 32);
    ttaCtx.fillStyle = '#10b981';
    ttaCtx.fillRect(0, 0, 32, 3);
    ttaCtx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ttaCtx.strokeRect(2, 4, 28, 26);
    ttaCtx.fillStyle = '#ffffff';
    ttaCtx.font = 'bold 7px monospace';
    ttaCtx.textAlign = 'center';
    ttaCtx.textBaseline = 'middle';
    ttaCtx.fillText('TEST', 16, 17);
    scene.textures.addCanvas('tile_test_accent', testAccent);

    // --- LEVEL 6: Inteligência Artificial (Neural Network & Synapse tiles) ---
    const { canvas: aiTile, ctx: aiCtx } = TextureGenerator.createCanvas(32, 32);
    aiCtx.fillStyle = '#0f1026';
    aiCtx.fillRect(0, 0, 32, 32);
    aiCtx.strokeStyle = '#8b5cf6';
    aiCtx.lineWidth = 1.5;
    aiCtx.strokeRect(1, 1, 30, 30);
    aiCtx.fillStyle = '#8b5cf6';
    aiCtx.fillRect(0, 0, 32, 2);
    aiCtx.fillStyle = '#c4b5fd';
    aiCtx.font = 'bold 7px monospace';
    aiCtx.textAlign = 'center';
    aiCtx.textBaseline = 'middle';
    aiCtx.fillText('[AI]', 16, 16);
    scene.textures.addCanvas('tile_ai_synapse', aiTile);

    const { canvas: aiAccent, ctx: aiaCtx } = TextureGenerator.createCanvas(32, 32);
    aiaCtx.fillStyle = '#0a0b1c';
    aiaCtx.fillRect(0, 0, 32, 32);
    aiaCtx.fillStyle = '#8b5cf6';
    aiaCtx.fillRect(0, 0, 32, 3);
    aiaCtx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
    aiaCtx.strokeRect(2, 4, 28, 26);
    aiaCtx.fillStyle = '#ffffff';
    aiaCtx.font = 'bold 7px monospace';
    aiaCtx.textAlign = 'center';
    aiaCtx.textBaseline = 'middle';
    aiaCtx.fillText('NEURAL', 16, 17);
    scene.textures.addCanvas('tile_ai_accent', aiAccent);

    // AI Bridge Ghost & Solid
    const { canvas: aiGhost, ctx: aigCtx } = TextureGenerator.createCanvas(32, 32);
    aigCtx.fillStyle = 'rgba(139, 92, 246, 0.08)';
    aigCtx.fillRect(1, 1, 30, 30);
    aigCtx.strokeStyle = '#8b5cf6';
    aigCtx.lineWidth = 1.5;
    aigCtx.setLineDash([4, 4]);
    aigCtx.strokeRect(1.5, 1.5, 29, 29);
    aigCtx.setLineDash([]);
    aigCtx.fillStyle = '#a78bfa';
    aigCtx.font = 'bold 7px monospace';
    aigCtx.textAlign = 'center';
    aigCtx.textBaseline = 'middle';
    aigCtx.fillText('[INFER]', 16, 16);
    scene.textures.addCanvas('tile_ai_bridge_ghost', aiGhost);

    const { canvas: aiSolid, ctx: aisCtx } = TextureGenerator.createCanvas(32, 32);
    aisCtx.fillStyle = '#170f38';
    aisCtx.fillRect(0, 0, 32, 32);
    aisCtx.strokeStyle = '#00e5ff';
    aisCtx.lineWidth = 2;
    aisCtx.strokeRect(1, 1, 30, 30);
    aisCtx.fillStyle = '#8b5cf6';
    aisCtx.fillRect(0, 0, 32, 3);
    aisCtx.fillStyle = '#ffffff';
    aisCtx.font = 'bold 7px monospace';
    aisCtx.textAlign = 'center';
    aisCtx.textBaseline = 'middle';
    aisCtx.fillText('SYNAPSE', 16, 16);
    scene.textures.addCanvas('tile_ai_bridge_solid', aiSolid);
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
    makeTerminal('terminal_test', '#10b981', 'TEST', 'FIX');
    makeTerminal('terminal_ai', '#8b5cf6', 'AI', 'INFER');
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
    // 1. HTML Code Fragment: Glowing cyan 24x24 diamond with "<>"
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

    // 2. AI Neural Data Token: 24x24 glowing neural tensor token with matrix brackets and cyan/violet core
    const { canvas: aiTokenCanvas, ctx: aiTokCtx } = TextureGenerator.createCanvas(24, 24);
    aiTokCtx.fillStyle = '#8b5cf6';
    aiTokCtx.beginPath();
    aiTokCtx.arc(12, 12, 11, 0, Math.PI * 2);
    aiTokCtx.fill();
    aiTokCtx.fillStyle = '#0e0b24';
    aiTokCtx.beginPath();
    aiTokCtx.arc(12, 12, 8.5, 0, Math.PI * 2);
    aiTokCtx.fill();
    aiTokCtx.fillStyle = '#00e5ff';
    aiTokCtx.font = 'bold 8px monospace';
    aiTokCtx.textAlign = 'center';
    aiTokCtx.textBaseline = 'middle';
    aiTokCtx.fillText('[AI]', 12, 12);
    scene.textures.addCanvas('item_ai_token', aiTokenCanvas);
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

    // 5. Active Bug Shooter Entity: 32x32 (Glitched error-firing bug)
    const { canvas: bugCanvas, ctx: bCtx } = TextureGenerator.createCanvas(32, 32);
    // Dark beetle shell
    bCtx.fillStyle = '#1c0612';
    bCtx.fillRect(6, 8, 20, 18);
    bCtx.fillStyle = '#881337';
    bCtx.fillRect(8, 10, 16, 14);
    // Bug legs (6 circuit legs)
    bCtx.fillStyle = '#4c0519';
    bCtx.fillRect(2, 10, 5, 2);
    bCtx.fillRect(2, 16, 5, 2);
    bCtx.fillRect(2, 22, 5, 2);
    bCtx.fillRect(25, 10, 5, 2);
    bCtx.fillRect(25, 16, 5, 2);
    bCtx.fillRect(25, 22, 5, 2);
    // Antennae
    bCtx.fillRect(9, 3, 2, 6);
    bCtx.fillRect(21, 3, 2, 6);
    bCtx.fillStyle = '#ef4444';
    bCtx.fillRect(8, 2, 4, 2);
    bCtx.fillRect(20, 2, 4, 2);
    // Glowing red eyes
    bCtx.fillStyle = '#ef4444';
    bCtx.fillRect(10, 9, 3, 3);
    bCtx.fillRect(19, 9, 3, 3);
    bCtx.fillStyle = '#ffffff';
    bCtx.fillRect(11, 9, 1, 1);
    bCtx.fillRect(20, 9, 1, 1);
    // Glowing cannon / core on back
    bCtx.fillStyle = '#ff0055';
    bCtx.fillRect(13, 15, 6, 6);
    bCtx.fillStyle = '#ffffff';
    bCtx.fillRect(15, 17, 2, 2);
    scene.textures.addCanvas('hazard_bug', bugCanvas);

    // 6. Patched Bug (Green Pacified Bug with Checkmark)
    const { canvas: bugPatchedCanvas, ctx: bpCtx } = TextureGenerator.createCanvas(32, 32);
    bpCtx.fillStyle = '#062018';
    bpCtx.fillRect(6, 8, 20, 18);
    bpCtx.fillStyle = '#065f46';
    bpCtx.fillRect(8, 10, 16, 14);
    // Legs
    bpCtx.fillStyle = '#047857';
    bpCtx.fillRect(2, 10, 5, 2);
    bpCtx.fillRect(2, 16, 5, 2);
    bpCtx.fillRect(2, 22, 5, 2);
    bpCtx.fillRect(25, 10, 5, 2);
    bpCtx.fillRect(25, 16, 5, 2);
    bpCtx.fillRect(25, 22, 5, 2);
    // Calm green eyes
    bpCtx.fillStyle = '#10b981';
    bpCtx.fillRect(10, 9, 3, 3);
    bpCtx.fillRect(19, 9, 3, 3);
    // Green checkmark on shell
    bpCtx.fillStyle = '#10b981';
    bpCtx.font = 'bold 11px monospace';
    bpCtx.textAlign = 'center';
    bpCtx.textBaseline = 'middle';
    bpCtx.fillText('✓', 16, 17);
    scene.textures.addCanvas('hazard_bug_patched', bugPatchedCanvas);

    // 7. Error Projectile Orb: 16x16 (Discharged by bug)
    const { canvas: orbCanvas, ctx: orbCtx } = TextureGenerator.createCanvas(16, 16);
    orbCtx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    orbCtx.beginPath();
    orbCtx.arc(8, 8, 7.5, 0, Math.PI * 2);
    orbCtx.fill();
    orbCtx.fillStyle = '#ef4444';
    orbCtx.beginPath();
    orbCtx.arc(8, 8, 5.5, 0, Math.PI * 2);
    orbCtx.fill();
    orbCtx.fillStyle = '#ffffff';
    orbCtx.beginPath();
    orbCtx.arc(7, 6, 2, 0, Math.PI * 2);
    orbCtx.fill();
    scene.textures.addCanvas('hazard_error_orb', orbCanvas);
  }

  // --- AI Companion Sprites ---
  static createAiSprites(scene) {
    // 24x24 Floating AI Copilot Drone
    const { canvas, ctx } = TextureGenerator.createCanvas(24, 24);
    // Halo / outer field
    ctx.fillStyle = 'rgba(0, 229, 255, 0.25)';
    ctx.beginPath();
    ctx.arc(12, 12, 11, 0, Math.PI * 2);
    ctx.fill();

    // Drone chassis (sleek white rounded capsule)
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(12, 11, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(5, 11, 14, 3);

    // Visor screen / Scanner Eye
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(7, 8, 10, 6);
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(9, 9, 6, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(11, 10, 2, 2);

    // Antenna
    ctx.fillStyle = '#64748b';
    ctx.fillRect(11, 1, 2, 3);
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(10, 0, 4, 2);

    // Dual micro thrusters
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(8, 18, 2, 3);
    ctx.fillRect(14, 18, 2, 3);

    scene.textures.addCanvas('ai_copilot', canvas);
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

    // 3. Final Level RGB Portal - Locked
    const { canvas: rgbLockedCanvas, ctx: rgbLkCtx } = TextureGenerator.createCanvas(48, 64);
    const gradLocked = rgbLkCtx.createLinearGradient(0, 0, 48, 64);
    gradLocked.addColorStop(0, '#ff0055');
    gradLocked.addColorStop(0.25, '#ffe600');
    gradLocked.addColorStop(0.5, '#00ff88');
    gradLocked.addColorStop(0.75, '#00e5ff');
    gradLocked.addColorStop(1, '#a855f7');
    rgbLkCtx.fillStyle = gradLocked;
    rgbLkCtx.fillRect(2, 2, 44, 60);
    rgbLkCtx.fillStyle = '#070914';
    rgbLkCtx.fillRect(6, 6, 36, 52);
    rgbLkCtx.fillStyle = '#ff0055';
    rgbLkCtx.fillRect(20, 30, 8, 8);
    rgbLkCtx.beginPath();
    rgbLkCtx.arc(24, 28, 4, Math.PI, 0, false);
    rgbLkCtx.strokeStyle = '#ff0055';
    rgbLkCtx.lineWidth = 2;
    rgbLkCtx.stroke();
    scene.textures.addCanvas('portal_rgb_locked', rgbLockedCanvas);

    // 4. Final Level RGB Portal - Open (Active Rainbow Chroma Portal)
    const { canvas: rgbOpenCanvas, ctx: rgbOpCtx } = TextureGenerator.createCanvas(48, 64);
    const gradOpen = rgbOpCtx.createLinearGradient(0, 0, 48, 64);
    gradOpen.addColorStop(0, '#ff0055');
    gradOpen.addColorStop(0.2, '#ff8800');
    gradOpen.addColorStop(0.4, '#ffe600');
    gradOpen.addColorStop(0.6, '#00ff88');
    gradOpen.addColorStop(0.8, '#00e5ff');
    gradOpen.addColorStop(1, '#d946ef');
    rgbOpCtx.fillStyle = gradOpen;
    rgbOpCtx.fillRect(2, 2, 44, 60);
    rgbOpCtx.fillStyle = '#0c1024';
    rgbOpCtx.fillRect(6, 6, 36, 52);
    const gradVortex = rgbOpCtx.createRadialGradient(24, 32, 2, 24, 32, 20);
    gradVortex.addColorStop(0, '#ffffff');
    gradVortex.addColorStop(0.3, '#00e5ff');
    gradVortex.addColorStop(0.6, '#a855f7');
    gradVortex.addColorStop(1, '#ff007f');
    rgbOpCtx.fillStyle = gradVortex;
    rgbOpCtx.fillRect(10, 10, 28, 44);
    scene.textures.addCanvas('portal_rgb_open', rgbOpenCanvas);
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

    // 96x96 Giant Corrupted Virus Boss
    const { canvas: bCanvas, ctx: bCtx } = TextureGenerator.createCanvas(96, 96);
    // Outer glitch spikes
    bCtx.fillStyle = '#450a1e';
    bCtx.fillRect(8, 8, 80, 80);
    bCtx.strokeStyle = '#ff0055';
    bCtx.lineWidth = 3;
    bCtx.strokeRect(8, 8, 80, 80);

    // Corrupted CPU Core
    bCtx.fillStyle = '#170510';
    bCtx.fillRect(16, 16, 64, 64);
    bCtx.strokeStyle = '#ef4444';
    bCtx.lineWidth = 2;
    bCtx.strokeRect(16, 16, 64, 64);

    // Core pulsing warning area
    bCtx.fillStyle = '#ff0055';
    bCtx.fillRect(24, 24, 48, 48);

    // Menacing giant cyber eyes / matrix
    bCtx.fillStyle = '#ffe600';
    bCtx.fillRect(30, 36, 12, 12);
    bCtx.fillRect(54, 36, 12, 12);
    bCtx.fillStyle = '#ffffff';
    bCtx.fillRect(34, 40, 4, 4);
    bCtx.fillRect(58, 40, 4, 4);

    // Angry digital brow
    bCtx.fillStyle = '#000000';
    bCtx.fillRect(28, 32, 40, 4);

    // Claws / Corrupted ports
    bCtx.fillStyle = '#ff007f';
    bCtx.fillRect(2, 38, 8, 20);
    bCtx.fillRect(86, 38, 8, 20);
    bCtx.fillRect(38, 2, 20, 8);
    bCtx.fillRect(38, 86, 20, 8);

    // Virus Name Tag
    bCtx.fillStyle = '#ffffff';
    bCtx.font = 'bold 8px monospace';
    bCtx.textAlign = 'center';
    bCtx.fillText('VIRUS_GIGANTE.EXE', 48, 64);

    scene.textures.addCanvas('boss_giant_virus', bCanvas);
  }

  // --- Giant Web Hammer (HTML -> CSS -> JS Boss Weapon) ---
  static createGiantHammerTextures(scene) {
    // 1. Giant Hammer Ghost (Blueprint outline for HTML build point) - 96x96
    const { canvas: ghGhost, ctx: ghgCtx } = TextureGenerator.createCanvas(96, 96);
    ghgCtx.fillStyle = 'rgba(0, 243, 255, 0.08)';
    ghgCtx.fillRect(20, 10, 56, 36); // Hammer head
    ghgCtx.fillRect(44, 46, 8, 44);   // Handle

    ghgCtx.strokeStyle = '#00f3ff';
    ghgCtx.lineWidth = 2;
    ghgCtx.setLineDash([4, 4]);
    ghgCtx.strokeRect(20, 10, 56, 36);
    ghgCtx.strokeRect(44, 46, 8, 44);
    ghgCtx.setLineDash([]);

    ghgCtx.fillStyle = '#00f3ff';
    ghgCtx.font = 'bold 8px monospace';
    ghgCtx.textAlign = 'center';
    ghgCtx.fillText('<div id="hammer"/>', 48, 30);
    scene.textures.addCanvas('giant_hammer_ghost', ghGhost);

    // 2. Giant Hammer Disabled (HTML Built, but gray/dim - waiting for CSS) - 96x96
    const { canvas: ghOff, ctx: ghoCtx } = TextureGenerator.createCanvas(96, 96);
    // Handle
    ghoCtx.fillStyle = '#374151';
    ghoCtx.fillRect(44, 46, 8, 44);
    ghoCtx.strokeStyle = '#4b5563';
    ghoCtx.lineWidth = 1.5;
    ghoCtx.strokeRect(44, 46, 8, 44);

    // Giant Hammer Head
    ghoCtx.fillStyle = '#1f2937';
    ghoCtx.fillRect(20, 10, 56, 36);
    ghoCtx.strokeStyle = '#6b7280';
    ghoCtx.lineWidth = 2;
    ghoCtx.strokeRect(20, 10, 56, 36);

    // Inactive steel rivets
    ghoCtx.fillStyle = '#9ca3af';
    ghoCtx.fillRect(24, 14, 4, 4);
    ghoCtx.fillRect(68, 14, 4, 4);
    ghoCtx.fillRect(24, 38, 4, 4);
    ghoCtx.fillRect(68, 38, 4, 4);

    ghoCtx.font = 'bold 9px monospace';
    ghoCtx.textAlign = 'center';
    ghoCtx.fillStyle = '#9ca3af';
    ghoCtx.fillText('<HTML: BUILT>', 48, 28);
    ghoCtx.font = '7px monospace';
    ghoCtx.fillText('[DISABLED]', 48, 38);
    scene.textures.addCanvas('giant_hammer_off', ghOff);

    // 3. Giant Hammer Active (Enabled by CSS! Energized with glowing neon purple/cyan) - 96x96
    const { canvas: ghOn, ctx: ghnCtx } = TextureGenerator.createCanvas(96, 96);
    // Handle with cyber grips
    ghnCtx.fillStyle = '#1e1b4b';
    ghnCtx.fillRect(44, 46, 8, 44);
    ghnCtx.strokeStyle = '#a855f7';
    ghnCtx.lineWidth = 2;
    ghnCtx.strokeRect(44, 46, 8, 44);

    // Handle neon rings
    ghnCtx.fillStyle = '#00f3ff';
    ghnCtx.fillRect(43, 56, 10, 3);
    ghnCtx.fillRect(43, 70, 10, 3);

    // Giant Hammer Head (Glowing cyber block)
    ghnCtx.fillStyle = '#110a26';
    ghnCtx.fillRect(18, 8, 60, 40);
    ghnCtx.strokeStyle = '#00e5ff';
    ghnCtx.lineWidth = 3;
    ghnCtx.strokeRect(18, 8, 60, 40);

    // Inner neon core
    ghnCtx.strokeStyle = '#a855f7';
    ghnCtx.lineWidth = 1.5;
    ghnCtx.strokeRect(22, 12, 52, 32);

    // Impact striking plates on both sides
    ghnCtx.fillStyle = '#ffe600';
    ghnCtx.fillRect(14, 14, 4, 28);
    ghnCtx.fillRect(78, 14, 4, 28);

    // Active text & electric energy
    ghnCtx.font = 'bold 9px monospace';
    ghnCtx.textAlign = 'center';
    ghnCtx.fillStyle = '#00e5ff';
    ghnCtx.fillText('{CSS: ENABLED}', 48, 26);
    ghnCtx.fillStyle = '#f7df1e';
    ghnCtx.font = 'bold 8px monospace';
    ghnCtx.fillText('READY TO SMASH', 48, 38);
    scene.textures.addCanvas('giant_hammer_on', ghOn);
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
