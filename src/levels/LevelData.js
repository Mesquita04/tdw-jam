/**
 * LevelData.js - Handcrafted definitions for all 6 levels.
 * Grid size: 960 x 540 pixels (30 x 17 tiles of 32x32).
 * Ground floor is at y: 480.
 * All exit portals are positioned on the floor at y: 452 (bottom touches y: 480).
 * Platform steps never exceed 65-75px, making every jump and fragment 100% reachable!
 */

export const LEVELS = [
  // ==========================================
  // NÍVEL 1: LOCALHOST (Tutorial)
  // ==========================================
  {
    id: 1,
    name: 'NÍVEL 1: LOCALHOST',
    subtitle: 'Ambiente de Testes do Kernel',
    unlockedAbility: 'NENHUMA',
    targetTime: 20, // 20s for speedrun star
    playerStart: { x: 80, y: 440 },
    terminal: {
      x: 180,
      y: 432,
      type: 'info',
      title: 'TERMINAL DE INICIALIZAÇÃO',
      message: 'ALERTA DO SISTEMA:\nO servidor web foi corrompido por um glitch virus desconhecido!\nControlos: Usa [A/D] ou [Setas] para correr e [Espaço/W] para saltar.\nSegue para a direita até ao Portal de Saída no chão para avançar.'
    },
    exit: { x: 880, y: 452, locked: false }, // Porta no chão!
    platforms: [
      // Floor
      { x: 0, y: 480, w: 960, h: 60, type: 'tile_cyber_accent' },
      // Left and right walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      // Stepping platforms to practice jumping (comfortable heights)
      { x: 340, y: 415, w: 100, h: 32, type: 'tile_cyber' },
      { x: 500, y: 350, w: 100, h: 32, type: 'tile_cyber' },
      { x: 680, y: 415, w: 100, h: 32, type: 'tile_cyber' }
    ],
    htmlFragments: [],
    buildPoints: [],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: [],
    jsTerminals: [],
    hazards: []
  },

  // ==========================================
  // NÍVEL 2: MISSING ELEMENTS (HTML)
  // ==========================================
  {
    id: 2,
    name: 'NÍVEL 2: ELEMENTOS PERDIDOS',
    subtitle: 'Módulo HTML: <div> e Estrutura',
    unlockedAbility: 'HTML',
    targetTime: 30,
    playerStart: { x: 80, y: 440 },
    terminal: {
      x: 180,
      y: 432,
      type: 'html',
      title: 'MÓDULO HTML DESATIVADO',
      message: 'Falta o elemento estrutural da página!\nSalta pelos degraus para apanhar os 2 fragmentos de código <> e prime [E] junto ao ponto de construção para erguer a ponte <div>.'
    },
    exit: { x: 880, y: 452, locked: false }, // Porta no chão!
    platforms: [
      // Left ledge (ground)
      { x: 0, y: 480, w: 320, h: 60, type: 'tile_cyber_accent' },
      // Step 1: 70px above floor (very easy jump!)
      { x: 100, y: 410, w: 90, h: 32, type: 'tile_cyber' },
      // Step 2: 70px above Step 1 (accessible from Step 1!)
      { x: 210, y: 340, w: 90, h: 32, type: 'tile_cyber' },
      // Right landing ledge with exit
      { x: 640, y: 480, w: 320, h: 60, type: 'tile_cyber_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_cyber' }
    ],
    // The gap is between x: 320 and x: 640 (320px wide gap with spikes at the bottom)
    hazards: [
      { x: 320, y: 512, w: 320, h: 28, type: 'spikes', active: true }
    ],
    htmlFragments: [
      // Fragment 1 right above Step 1 (y: 410 - 45 = 365)
      { id: 'f1', x: 145, y: 365 },
      // Fragment 2 right above Step 2 (y: 340 - 45 = 295)
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
        label: '<div class="bridge">'
      }
    ],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: [],
    jsTerminals: []
  },

  // ==========================================
  // NÍVEL 3: BROKEN STYLESHEET (CSS)
  // ==========================================
  {
    id: 3,
    name: 'NÍVEL 3: ESTILOS CORROMPIDOS',
    subtitle: 'Módulo CSS: display e opacidade',
    unlockedAbility: 'CSS',
    targetTime: 32,
    playerStart: { x: 80, y: 440 },
    terminal: {
      x: 160,
      y: 432,
      type: 'css',
      title: 'CONSOLA DE ESTILOS CSS',
      message: 'Regras de visualização corrompidas!\nUsa o terminal [E] para alternar a barreira e as plataformas entre:\n• display: block (SÓLIDO)\n• display: none (FANTASMA)\nDesativa a barreira para alcançares a porta de saída no chão!'
    },
    exit: { x: 880, y: 452, locked: false }, // Porta no chão!
    platforms: [
      // Base Floor
      { x: 0, y: 480, w: 960, h: 60, type: 'tile_cyber_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      // Upper perch with return terminal
      { x: 100, y: 380, w: 100, h: 32, type: 'tile_cyber' },
      { x: 220, y: 310, w: 100, h: 32, type: 'tile_cyber' }
    ],
    // CSS toggled elements:
    // Barrier: starts SOLID from ceiling down to floor, blocking ground passage to exit
    // When toggled via CSS terminal, barrier becomes GHOST (pass-through)
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
    jsTerminals: [],
    hazards: []
  },

  // ==========================================
  // NÍVEL 4: INFINITE LOOP (JavaScript)
  // ==========================================
  {
    id: 4,
    name: 'NÍVEL 4: LOOP INFINITO',
    subtitle: 'Módulo JS: Callbacks e Sequência',
    unlockedAbility: 'JAVASCRIPT',
    targetTime: 35,
    playerStart: { x: 80, y: 440 },
    terminal: {
      x: 170,
      y: 432,
      type: 'js',
      title: 'DEPURADOR DE JAVASCRIPT',
      message: 'A porta de saída no chão está trancada por um loop assíncrono!\nOrdem de execução das Promises:\n1º [2] (init)\n2º [1] (fetchData)\n3º [3] (renderUI)\nPrime os botões pela ordem correta: 2 → 1 → 3 para destrancar a porta!'
    },
    exit: { x: 880, y: 452, locked: true }, // Porta no chão trancada até resolver JS!
    platforms: [
      // Base Floor
      { x: 0, y: 480, w: 960, h: 60, type: 'tile_cyber_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      // Steps for the 3 switches (very comfortable jumping heights)
      { x: 300, y: 410, w: 100, h: 32, type: 'tile_cyber' }, // Step 1
      { x: 470, y: 340, w: 100, h: 32, type: 'tile_cyber' }, // Step 2
      { x: 640, y: 410, w: 100, h: 32, type: 'tile_cyber' }  // Step 3
    ],
    jsSwitches: [
      { id: 1, x: 350, y: 370 },
      { id: 2, x: 520, y: 300 },
      { id: 3, x: 690, y: 370 }
    ],
    jsTerminals: [
      {
        x: 170,
        y: 432,
        sequence: [2, 1, 3],
        clue: 'Ordem de Execução: 2 -> 1 -> 3'
      }
    ],
    htmlFragments: [],
    buildPoints: [],
    cssPlatforms: [],
    cssTerminals: [],
    hazards: []
  },

  // ==========================================
  // NÍVEL 5: MERGE CONFLICT
  // ==========================================
  {
    id: 5,
    name: 'NÍVEL 5: CONFLITO DE FUSÃO',
    subtitle: 'Integração HTML + CSS + Lasers',
    unlockedAbility: 'HTML & CSS',
    targetTime: 45,
    playerStart: { x: 80, y: 440 },
    terminal: {
      x: 160,
      y: 432,
      type: 'info',
      title: 'CONFLITO DE CÓDIGO (GIT MERGE)',
      message: 'O branch de produção está em conflito com as alterações locais!\n1. Salta pelos degraus para apanhar os fragmentos HTML.\n2. Constrói a ponte e usa o terminal CSS para desativar o laser.\n3. A porta de saída espera-te no chão!'
    },
    exit: { x: 880, y: 452, locked: false }, // Porta no chão!
    platforms: [
      // Left ground
      { x: 0, y: 480, w: 380, h: 60, type: 'tile_cyber_accent' },
      // Right ground (where the exit door sits)
      { x: 780, y: 480, w: 180, h: 60, type: 'tile_cyber_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      // Steps for fragments
      { x: 120, y: 410, w: 90, h: 32, type: 'tile_cyber' },
      { x: 230, y: 340, w: 90, h: 32, type: 'tile_cyber' }
    ],
    htmlFragments: [
      { id: 'f1', x: 165, y: 365 },
      { id: 'f2', x: 275, y: 295 }
    ],
    buildPoints: [
      // Bridge over the first section of spikes
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
      // Floating step platform activated by CSS
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
    jsSwitches: [],
    jsTerminals: []
  },

  // ==========================================
  // NÍVEL 6: UNHANDLED EXCEPTION (FINAL BOSS)
  // ==========================================
  {
    id: 6,
    name: 'NÍVEL 6: EXCEÇÃO NÃO TRATADA',
    subtitle: 'Destruição do Vírus Glitch',
    unlockedAbility: 'HTML + CSS + JS',
    targetTime: 60,
    playerStart: { x: 70, y: 440 },
    terminal: {
      x: 160,
      y: 432,
      type: 'info',
      title: 'NÚCLEO DO VÍRUS CORROMPIDO',
      message: 'O Kernel está sob ataque do GLITCH CORE!\nMissão de Restauração Total:\n1. Recolhe 3 fragmentos HTML para erguer a ponte central.\n2. Altera o CSS para solidificar os acessos aos interruptores.\n3. Aciona a sequência JavaScript [3 → 2 → 1] para destruir o vírus!\nA porta de saída abrir-se-á no chão!'
    },
    exit: { x: 880, y: 452, locked: true }, // Porta no chão! Abre ao destruir o boss
    glitchCore: {
      x: 480,
      y: 150,
      name: 'GLITCH_VIRUS.EXE'
    },
    platforms: [
      // Ground left and right
      { x: 0, y: 480, w: 320, h: 60, type: 'tile_cyber_accent' },
      { x: 640, y: 480, w: 320, h: 60, type: 'tile_cyber_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_cyber' },
      // Steps for fragments
      { x: 80, y: 410, w: 90, h: 32, type: 'tile_cyber' },
      { x: 780, y: 410, w: 90, h: 32, type: 'tile_cyber' },
      // Center switch platform directly under the boss
      { x: 380, y: 345, w: 200, h: 32, type: 'tile_cyber' }
    ],
    htmlFragments: [
      { id: 'f1', x: 200, y: 440 }, // Ground level!
      { id: 'f2', x: 125, y: 365 }, // On left step!
      { id: 'f3', x: 825, y: 365 }  // On right step!
    ],
    buildPoints: [
      // Central bottom bridge spanning the pit
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
      // Left step to center platform
      {
        id: 'boss_css_step',
        x: 260,
        y: 410,
        w: 90,
        h: 32,
        initialSolid: false,
        label: 'step-left'
      },
      // Right step to center platform
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
    jsTerminals: [
      {
        x: 480,
        y: 432,
        sequence: [3, 2, 1],
        clue: 'Comando de Terminação: kill -9 [3 -> 2 -> 1]'
      }
    ],
    hazards: [
      // Pit spikes under center
      { x: 320, y: 512, w: 320, h: 28, type: 'spikes', active: true }
    ]
  }
];
