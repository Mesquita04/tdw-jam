/**
 * LevelData.js - Handcrafted definitions for all 6 levels.
 * Grid size: 960 x 540 pixels (30 x 17 tiles of 32x32).
 * Ground floor is at y: 480.
 * All exit portals are positioned on the floor at y: 452 (bottom touches y: 480).
 * Platform steps never exceed 65-75px, making every jump reachable!
 * 
 * Each level features a UNIQUE VISUAL THEME relative to its technology:
 * - Level 1: Localhost Wireframe (Terminal blue & cyan)
 * - Level 2: HTML Raw Document (Pure white canvas with black <div> elements!)
 * - Level 3: CSS Stylesheet (Dark mode with neon purple & magenta box models)
 * - Level 4: JavaScript Event Loop (Carbon black with glowing JS yellow stacks)
 * - Level 5: Git Merge Conflict (Split diff with green additions & red deletion lasers)
 * - Level 6: Kernel Panic / Boss (Void black with flashing crimson hex memory dumps)
 * 
 * Hints are provided via top-right notification cards instead of in-world clutter.
 */

export const LEVELS = [
  // ==========================================
  // NÍVEL 1: LOCALHOST (Tutorial & Boot)
  // ==========================================
  {
    id: 1,
    name: 'NÍVEL 1: LOCALHOST',
    nameEn: 'LEVEL 1: LOCALHOST',
    subtitle: 'Ambiente de Testes do Kernel',
    subEn: 'Kernel Test Environment',
    unlockedAbility: 'NENHUMA',
    targetTime: 20, // 20s for speedrun star
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'localhost',
      bgColor: '#0a0d18',
      bgTexture: 'bg_level_1',
      accentColor: '#00f3ff',
      tag: 'LOCALHOST'
    },
    hint: {
      titlePt: 'DICA: INICIALIZAÇÃO',
      titleEn: 'HINT: BOOT SEQUENCE',
      textPt: 'Usa [A/D] para correr e [Espaço/W] para saltar. Segue para a direita até ao Portal de Saída no chão!',
      textEn: 'Use [A/D] to run and [Space/W] to jump. Reach the ground exit door on the right to proceed!',
      tag: 'LOCALHOST'
    },
    exit: { x: 880, y: 452, locked: false }, // Porta no chão
    platforms: [
      // Floor
      { x: 0, y: 480, w: 960, h: 60, type: 'tile_cyber_accent' },
      // Left and right walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      // Stepping platforms to practice jumping
      { x: 340, y: 415, w: 100, h: 32, type: 'tile_cyber' },
      { x: 500, y: 350, w: 100, h: 32, type: 'tile_cyber' },
      { x: 680, y: 415, w: 100, h: 32, type: 'tile_cyber' }
    ],
    htmlFragments: [],
    buildPoints: [],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: [],
    hazards: []
  },

  // ==========================================
  // NÍVEL 2: ELEMENTOS PERDIDOS (HTML - Pure White Canvas & Black <div> Blocks!)
  // ==========================================
  {
    id: 2,
    name: 'NÍVEL 2: ELEMENTOS PERDIDOS',
    nameEn: 'LEVEL 2: MISSING ELEMENTS',
    subtitle: 'Módulo HTML: <div> e Estrutura',
    subEn: 'HTML Module: <div> & Structure',
    unlockedAbility: 'HTML',
    targetTime: 30,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'html',
      bgColor: '#ffffff', // Pure white canvas as requested!
      bgTexture: 'bg_level_2',
      accentColor: '#000000',
      tag: 'HTML5'
    },
    hint: {
      titlePt: 'DICA: ESTRUTURA HTML',
      titleEn: 'HINT: HTML STRUCTURE',
      textPt: 'O módulo HTML está sem estilos! Salta pelos blocos pretos <div/> para apanhar os 2 fragmentos <> e prime [E] no ponto de construção para erguer a ponte <div>!',
      textEn: 'HTML module is unstyled! Jump across the black <div> blocks to collect 2 fragments <>, then press [E] at the blueprint to erect the <div> bridge!',
      tag: 'HTML5'
    },
    exit: { x: 880, y: 452, locked: false }, // Porta no chão
    platforms: [
      // Left ledge (ground) - Solid black block
      { x: 0, y: 480, w: 320, h: 60, type: 'tile_html_black_accent' },
      // Step 1: 70px above floor
      { x: 100, y: 410, w: 90, h: 32, type: 'tile_html_black' },
      // Step 2: 70px above Step 1
      { x: 210, y: 340, w: 90, h: 32, type: 'tile_html_black' },
      // Right landing ledge with exit
      { x: 640, y: 480, w: 320, h: 60, type: 'tile_html_black_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_html_black' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_html_black' }
    ],
    // Black spikes with red 404 tip on the white background
    hazards: [
      { x: 320, y: 512, w: 320, h: 28, type: 'spikes', texture: 'hazard_spikes_html', active: true }
    ],
    htmlFragments: [
      { id: 'f1', x: 145, y: 365 },
      { id: 'f2', x: 255, y: 295 }
    ],
    buildPoints: [
      {
        id: 'bridge_gap',
        x: 320,
        y: 480,
        w: 320,
        h: 32,
        cost: 2,
        label: '<div class="bridge">',
        ghostTexture: 'tile_html_ghost',
        solidTexture: 'tile_html_bridge'
      }
    ],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: []
  },

  // ==========================================
  // NÍVEL 3: ESTILOS CORROMPIDOS (CSS - Dark Mode & Neon Styling)
  // ==========================================
  {
    id: 3,
    name: 'NÍVEL 3: ESTILOS CORROMPIDOS',
    nameEn: 'LEVEL 3: BROKEN STYLESHEET',
    subtitle: 'Módulo CSS: display e opacidade',
    subEn: 'CSS Module: display & opacity',
    unlockedAbility: 'CSS',
    targetTime: 32,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'css',
      bgColor: '#140e24',
      bgTexture: 'bg_level_3',
      accentColor: '#a855f7',
      tag: 'CSS3'
    },
    hint: {
      titlePt: 'DICA: FOLHA DE ESTILOS CSS',
      titleEn: 'HINT: CSS STYLESHEET',
      textPt: 'Regras de visualização corrompidas! Prime [E] na consola CSS para alternar a barreira entre display: block (Sólido) e display: none (Fantasma)!',
      textEn: 'Display rules corrupted! Press [E] at the CSS console to toggle the barrier between display: block (Solid) and display: none (Ghost)!',
      tag: 'CSS3'
    },
    exit: { x: 880, y: 452, locked: false }, // Porta no chão
    platforms: [
      // Base Floor
      { x: 0, y: 480, w: 960, h: 60, type: 'tile_css_styled_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_css_styled' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_css_styled' },
      // Steps for access
      { x: 100, y: 380, w: 100, h: 32, type: 'tile_css_styled' },
      { x: 220, y: 310, w: 100, h: 32, type: 'tile_css_styled' }
    ],
    cssPlatforms: [
      {
        id: 'barrier_1',
        x: 480,
        y: 160,
        w: 32,
        h: 320,
        initialSolid: true,
        label: 'barrier'
      },
      {
        id: 'bridge_step',
        x: 580,
        y: 400,
        w: 120,
        h: 32,
        initialSolid: false,
        label: 'stepper'
      }
    ],
    cssTerminals: [
      {
        x: 320,
        y: 432,
        targetGroup: 'all_css_1',
        label: 'CSS: Toggle display'
      },
      {
        x: 270,
        y: 262,
        targetGroup: 'all_css_1',
        label: 'CSS: Retorno'
      }
    ],
    htmlFragments: [],
    buildPoints: [],
    jsSwitches: [],
    hazards: []
  },

  // ==========================================
  // NÍVEL 4: LOOP INFINITO (JavaScript - Carbon & JS Yellow Event Loop)
  // ==========================================
  {
    id: 4,
    name: 'NÍVEL 4: LOOP INFINITO',
    nameEn: 'LEVEL 4: INFINITE LOOP',
    subtitle: 'Módulo JS: Callbacks e Sequência',
    subEn: 'JS Module: Callbacks & Sequence',
    unlockedAbility: 'JAVASCRIPT',
    targetTime: 35,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'js',
      bgColor: '#101012',
      bgTexture: 'bg_level_4',
      accentColor: '#f7df1e',
      tag: 'JAVASCRIPT'
    },
    hint: {
      titlePt: 'DICA: ASYNC EVENT LOOP',
      titleEn: 'HINT: ASYNC EVENT LOOP',
      textPt: 'A porta está trancada por um loop assíncrono! Ordem das Promises: 1º [2] (init) → 2º [1] (fetchData) → 3º [3] (renderUI). Prime os botões por essa ordem!',
      textEn: 'Door is locked in an infinite async loop! Promise order: 1st [2] (init) → 2nd [1] (fetchData) → 3rd [3] (renderUI). Trigger buttons in order: 2 → 1 → 3!',
      tag: 'ES6+'
    },
    exit: { x: 880, y: 452, locked: true }, // Porta trancada no chão até resolver JS
    platforms: [
      // Base Floor
      { x: 0, y: 480, w: 960, h: 60, type: 'tile_js_stack_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_js_stack' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_js_stack' },
      // Steps for the 3 switches
      { x: 300, y: 410, w: 100, h: 32, type: 'tile_js_stack' },
      { x: 470, y: 340, w: 100, h: 32, type: 'tile_js_stack' },
      { x: 640, y: 410, w: 100, h: 32, type: 'tile_js_stack' }
    ],
    jsSwitches: [
      { id: 1, x: 350, y: 370 },
      { id: 2, x: 520, y: 300 },
      { id: 3, x: 690, y: 370 }
    ],
    jsSequence: [2, 1, 3], // Required sequence
    htmlFragments: [],
    buildPoints: [],
    cssPlatforms: [],
    cssTerminals: [],
    hazards: []
  },

  // ==========================================
  // NÍVEL 5: CONFLITO DE FUSÃO (Git Merge Conflict - Green Additions & Red Lasers)
  // ==========================================
  {
    id: 5,
    name: 'NÍVEL 5: CONFLITO DE FUSÃO',
    nameEn: 'LEVEL 5: MERGE CONFLICT',
    subtitle: 'Integração HTML + CSS + Lasers',
    subEn: 'HTML + CSS + Lasers Integration',
    unlockedAbility: 'HTML & CSS',
    targetTime: 45,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'git',
      bgColor: '#0b1319',
      bgTexture: 'bg_level_5',
      accentColor: '#10b981',
      tag: 'GIT MERGE'
    },
    hint: {
      titlePt: 'DICA: CONFLITO GIT MERGE',
      titleEn: 'HINT: GIT MERGE CONFLICT',
      textPt: 'O branch de produção está em conflito! Apanha os fragmentos HTML para erguer a ponte verde <nav/> e usa a consola CSS para desativar o laser de deleção!',
      textEn: 'Branch conflict! Collect HTML fragments to erect the green <nav/> bridge, and use the CSS console to disable the red deletion laser!',
      tag: 'GIT'
    },
    exit: { x: 880, y: 452, locked: false }, // Porta no chão
    platforms: [
      // Left ground
      { x: 0, y: 480, w: 380, h: 60, type: 'tile_git_accent' },
      // Right ground (where the exit door sits)
      { x: 780, y: 480, w: 180, h: 60, type: 'tile_git_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_git_add' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_git_add' },
      // Steps for fragments
      { x: 120, y: 410, w: 90, h: 32, type: 'tile_git_add' },
      { x: 230, y: 340, w: 90, h: 32, type: 'tile_git_add' }
    ],
    htmlFragments: [
      { id: 'f1', x: 165, y: 365 },
      { id: 'f2', x: 275, y: 295 }
    ],
    buildPoints: [
      {
        id: 'bridge_high',
        x: 380,
        y: 480,
        w: 220,
        h: 32,
        cost: 2,
        label: '<nav class="bridge">'
      }
    ],
    cssPlatforms: [
      {
        id: 'css_step_m',
        x: 630,
        y: 420,
        w: 120,
        h: 32,
        initialSolid: false,
        label: 'css-platform'
      }
    ],
    cssTerminals: [
      {
        x: 340,
        y: 432,
        targetGroup: 'merge_css',
        label: 'CSS: Toggle Laser & Platform'
      }
    ],
    hazards: [
      // Ground spikes in the gap
      { x: 380, y: 512, w: 400, h: 28, type: 'spikes', active: true },
      // Laser beam blocking passage before the exit (disabled by CSS terminal!)
      {
        x: 770,
        y: 360,
        w: 20,
        h: 120,
        type: 'laser',
        active: true,
        cssToggleable: true,
        targetGroup: 'merge_css'
      }
    ],
    jsSwitches: []
  },

  // ==========================================
  // NÍVEL 6: EXCEÇÃO NÃO TRATADA (Boss Final - Glitch Core & Kernel Panic)
  // ==========================================
  {
    id: 6,
    name: 'NÍVEL 6: EXCEÇÃO NÃO TRATADA',
    nameEn: 'LEVEL 6: UNHANDLED EXCEPTION',
    subtitle: 'Destruição do Vírus Glitch',
    subEn: 'Purging the Glitch Virus',
    unlockedAbility: 'HTML + CSS + JS',
    targetTime: 60,
    playerStart: { x: 70, y: 440 },
    theme: {
      key: 'boss',
      bgColor: '#050308',
      bgTexture: 'bg_level_6',
      accentColor: '#ef4444',
      tag: 'KERNEL PANIC'
    },
    hint: {
      titlePt: 'DICA: RESTAURAÇÃO TOTAL',
      titleEn: 'HINT: FULL SYSTEM PURGE',
      textPt: 'ALERTA MÁXIMO! Recolhe 3 fragmentos para erguer a ponte central <main/>, altera o CSS para solidificar os acessos e aciona a sequência JS [3 → 2 → 1] para destruir o vírus!',
      textEn: 'MAXIMUM ALERT! Collect 3 fragments for the <main/> bridge, toggle CSS to solidify access steps, and enter JS sequence [3 → 2 → 1] to terminate the virus!',
      tag: 'KERNEL'
    },
    exit: { x: 880, y: 452, locked: true }, // Porta no chão abre ao matar o boss!
    glitchCore: {
      x: 480,
      y: 150,
      name: 'GLITCH_VIRUS.EXE'
    },
    platforms: [
      // Ground left and right
      { x: 0, y: 480, w: 320, h: 60, type: 'tile_corrupted_accent' },
      { x: 640, y: 480, w: 320, h: 60, type: 'tile_corrupted_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_corrupted_hex' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_corrupted_hex' },
      // Steps for fragments
      { x: 80, y: 410, w: 90, h: 32, type: 'tile_corrupted_hex' },
      { x: 780, y: 410, w: 90, h: 32, type: 'tile_corrupted_hex' },
      // Center switch platform directly under the boss
      { x: 380, y: 345, w: 200, h: 32, type: 'tile_corrupted_hex' }
    ],
    htmlFragments: [
      { id: 'f1', x: 200, y: 440 }, // Ground level
      { id: 'f2', x: 125, y: 365 }, // Left step
      { id: 'f3', x: 825, y: 365 }  // Right step
    ],
    buildPoints: [
      {
        id: 'boss_bridge',
        x: 320,
        y: 480,
        w: 320,
        h: 32,
        cost: 3,
        label: '<main class="system-bridge">'
      }
    ],
    cssPlatforms: [
      {
        id: 'boss_css_step',
        x: 260,
        y: 410,
        w: 90,
        h: 32,
        initialSolid: false,
        label: 'step-left'
      },
      {
        id: 'boss_css_step_r',
        x: 610,
        y: 410,
        w: 90,
        h: 32,
        initialSolid: false,
        label: 'step-right'
      }
    ],
    cssTerminals: [
      {
        x: 140,
        y: 432,
        targetGroup: 'boss_css',
        label: 'CSS: Solidificar Acessos'
      }
    ],
    jsSwitches: [
      { id: 1, x: 410, y: 305 },
      { id: 2, x: 480, y: 305 },
      { id: 3, x: 550, y: 305 }
    ],
    jsSequence: [3, 2, 1], // Boss termination sequence
    hazards: [
      { x: 320, y: 512, w: 320, h: 28, type: 'spikes', active: true }
    ]
  }
];
