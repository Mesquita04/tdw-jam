/**
 * LevelData.js - Handcrafted definitions for the full 16-level campaign.
 * Structured progressively by category:
 * - HTML I, II, III (Levels 1-3): Pure HTML Document structure, White Canvas & black <div> blocks.
 * - CSS I, II, III (Levels 4-6): Stylesheet, Display rules & Box Model, incorporating HTML challenges.
 * - JS I, II, III (Levels 7-9): Callbacks, Promises & Event Loop, incorporating HTML + CSS.
 * - QA I, II, III (Levels 10-12): Test Runner, Regression & Performance with shooting Error Bugs, incorporating HTML + CSS.
 * - AI I, II, III (Levels 13-15): Neural Networks, AI Copilot Dispatch for sky tokens & Inference bridges, incorporating HTML + CSS + QA.
 * - Final Boss (Level 16): Kernel Panic Boss Battle integrating all mechanics, triggering "Welcome to TDW"!
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * - ALL exit doors are grounded at x: 880, y: 452 (bottom touches y: 480).
 * - ALL terminals (CSS, Test, AI, story) are firmly on the ground floor at y: 448 (NO flying terminals!).
 * - Platform steps never exceed 65-75px vertically, ensuring every jump is reachable!
 */

export const LEVELS = [
  // ==========================================
  // GRUPO 1: HTML (NÍVEIS 1 - 3)
  // Tema: Canvas Branco e Blocos Pretos Estruturais
  // ==========================================
  {
    id: 1,
    name: 'NÍVEL 1: HTML I - INTRODUÇÃO AOS ELEMENTOS',
    nameEn: 'LEVEL 1: HTML I - ELEMENT BASICS',
    subtitle: 'Módulo HTML: Bloco <div/> e Estrutura',
    subEn: 'HTML Module: <div/> Block & Structure',
    unlockedAbility: 'HTML',
    targetTime: 20,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'html',
      bgColor: '#ffffff',
      bgTexture: 'bg_level_2',
      accentColor: '#000000',
      tag: 'HTML5'
    },
    hint: {
      titlePt: 'DICA: ESTRUTURA HTML I',
      titleEn: 'HINT: HTML STRUCTURE I',
      textPt: 'O módulo HTML constrói a base da página! Salta para o bloco preto para apanhar o fragmento <div/> e prime [E] no chão para erguer a ponte!',
      textEn: 'HTML builds the page foundation! Jump onto the black block to grab the <div/> fragment and press [E] on the ground to erect the bridge!',
      tag: 'HTML5'
    },
    exit: { x: 880, y: 452, locked: false },
    platforms: [
      { x: 0, y: 480, w: 340, h: 60, type: 'tile_html_black_accent' },
      { x: 600, y: 480, w: 360, h: 60, type: 'tile_html_black_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_html_black' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_html_black' },
      { x: 150, y: 410, w: 90, h: 32, type: 'tile_html_black' }
    ],
    hazards: [
      { x: 340, y: 512, w: 260, h: 28, type: 'spikes', texture: 'hazard_spikes_html', active: true }
    ],
    htmlFragments: [
      { id: 'f1', x: 195, y: 365 }
    ],
    buildPoints: [
      {
        id: 'bridge_h1',
        x: 340,
        y: 480,
        w: 260,
        h: 32,
        cost: 1,
        label: '<div class="bridge">',
        ghostTexture: 'tile_html_ghost',
        solidTexture: 'tile_html_bridge'
      }
    ],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: []
  },

  {
    id: 2,
    name: 'NÍVEL 2: HTML II - BLOCOS ANINHADOS',
    nameEn: 'LEVEL 2: HTML II - NESTED BLOCKS',
    subtitle: 'Módulo HTML: <section> e <article>',
    subEn: 'HTML Module: <section> & <article>',
    unlockedAbility: 'HTML',
    targetTime: 28,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'html',
      bgColor: '#ffffff',
      bgTexture: 'bg_level_2',
      accentColor: '#000000',
      tag: 'HTML5'
    },
    hint: {
      titlePt: 'DICA: ESTRUTURA HTML II',
      titleEn: 'HINT: HTML STRUCTURE II',
      textPt: 'Estruturas aninhadas! Salta pelos blocos pretos para recolher 2 fragmentos de código e ergue a ponte no fosso!',
      textEn: 'Nested structures! Jump across black blocks to collect 2 code fragments and erect the bridge over the pit!',
      tag: 'HTML5'
    },
    exit: { x: 880, y: 452, locked: false },
    platforms: [
      { x: 0, y: 480, w: 340, h: 60, type: 'tile_html_black_accent' },
      { x: 620, y: 480, w: 340, h: 60, type: 'tile_html_black_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_html_black' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_html_black' },
      { x: 130, y: 410, w: 90, h: 32, type: 'tile_html_black' },
      { x: 230, y: 340, w: 90, h: 32, type: 'tile_html_black' }
    ],
    hazards: [
      { x: 340, y: 512, w: 280, h: 28, type: 'spikes', texture: 'hazard_spikes_html', active: true }
    ],
    htmlFragments: [
      { id: 'f1', x: 175, y: 365 },
      { id: 'f2', x: 275, y: 295 }
    ],
    buildPoints: [
      {
        id: 'bridge_h2',
        x: 340,
        y: 480,
        w: 280,
        h: 32,
        cost: 2,
        label: '<section class="bridge">',
        ghostTexture: 'tile_html_ghost',
        solidTexture: 'tile_html_bridge'
      }
    ],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: []
  },

  {
    id: 3,
    name: 'NÍVEL 3: HTML III - DOCUMENTO SEMÂNTICO',
    nameEn: 'LEVEL 3: HTML III - SEMANTIC DOCUMENT',
    subtitle: 'Módulo HTML: <header>, <main> e <footer>',
    subEn: 'HTML Module: <header>, <main> & <footer>',
    unlockedAbility: 'HTML',
    targetTime: 32,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'html',
      bgColor: '#ffffff',
      bgTexture: 'bg_level_2',
      accentColor: '#000000',
      tag: 'HTML5'
    },
    hint: {
      titlePt: 'DICA: DOCUMENTO SEMÂNTICO',
      titleEn: 'HINT: SEMANTIC DOCUMENT',
      textPt: 'Documento completo! Recolhe os 3 fragmentos semânticos nos patamares para construir a grande ponte central!',
      textEn: 'Complete document! Collect 3 semantic fragments across platforms to build the grand central bridge!',
      tag: 'HTML5'
    },
    exit: { x: 880, y: 452, locked: false },
    platforms: [
      { x: 0, y: 480, w: 320, h: 60, type: 'tile_html_black_accent' },
      { x: 640, y: 480, w: 320, h: 60, type: 'tile_html_black_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_html_black' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_html_black' },
      { x: 90, y: 410, w: 70, h: 32, type: 'tile_html_black' },
      { x: 170, y: 340, w: 70, h: 32, type: 'tile_html_black' },
      { x: 250, y: 270, w: 70, h: 32, type: 'tile_html_black' },
      { x: 740, y: 410, w: 80, h: 32, type: 'tile_html_black' }
    ],
    hazards: [
      { x: 320, y: 512, w: 320, h: 28, type: 'spikes', texture: 'hazard_spikes_html', active: true }
    ],
    htmlFragments: [
      { id: 'f1', x: 125, y: 365 },
      { id: 'f2', x: 205, y: 295 },
      { id: 'f3', x: 285, y: 225 }
    ],
    buildPoints: [
      {
        id: 'bridge_h3',
        x: 320,
        y: 480,
        w: 320,
        h: 32,
        cost: 3,
        label: '<main class="semantic-bridge">',
        ghostTexture: 'tile_html_ghost',
        solidTexture: 'tile_html_bridge'
      }
    ],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: []
  },

  // ==========================================
  // GRUPO 2: CSS (NÍVEIS 4 - 6)
  // Tema: Folha de Estilos Neon, combinando HTML + CSS
  // ==========================================
  {
    id: 4,
    name: 'NÍVEL 4: CSS I - DISPLAY E VISIBILIDADE',
    nameEn: 'LEVEL 4: CSS I - DISPLAY & VISIBILITY',
    subtitle: 'Módulo CSS: display: block / none',
    subEn: 'CSS Module: display: block / none',
    unlockedAbility: 'CSS',
    targetTime: 28,
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
      textPt: 'Regras de visualização corrompidas! Usa a consola CSS no chão [E] para alternar a barreira entre display: block e display: none!',
      textEn: 'Display rules corrupted! Use the ground CSS console [E] to toggle the barrier between display: block and display: none!',
      tag: 'CSS3'
    },
    exit: { x: 880, y: 452, locked: false },
    platforms: [
      { x: 0, y: 480, w: 960, h: 60, type: 'tile_css_styled_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_css_styled' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_css_styled' },
      { x: 120, y: 410, w: 90, h: 32, type: 'tile_css_styled' },
      { x: 230, y: 340, w: 90, h: 32, type: 'tile_css_styled' }
    ],
    cssPlatforms: [
      {
        id: 'barrier_l4',
        x: 520,
        y: 160,
        w: 32,
        h: 320,
        initialSolid: true,
        label: 'barrier'
      }
    ],
    cssTerminals: [
      {
        x: 340,
        y: 480, // FIRMLY ON GROUND FLOOR
        targetGroup: 'css_l4',
        label: 'CSS: Toggle display'
      }
    ],
    htmlFragments: [],
    buildPoints: [],
    jsSwitches: [],
    hazards: []
  },

  {
    id: 5,
    name: 'NÍVEL 5: CSS II - ESPECIFICIDADE E ESTRUTURA',
    nameEn: 'LEVEL 5: CSS II - SPECIFICITY & STRUCTURE',
    subtitle: 'Integração HTML + CSS',
    subEn: 'HTML + CSS Integration',
    unlockedAbility: 'HTML & CSS',
    targetTime: 34,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'css',
      bgColor: '#140e24',
      bgTexture: 'bg_level_3',
      accentColor: '#a855f7',
      tag: 'HTML + CSS'
    },
    hint: {
      titlePt: 'DICA: ESPECIFICIDADE (HTML + CSS)',
      titleEn: 'HINT: SPECIFICITY (HTML + CSS)',
      textPt: 'Desafio combinado! Apanha os 2 fragmentos HTML para erguer a ponte <nav/> e usa a consola CSS no chão para desativar a barreira!',
      textEn: 'Combined challenge! Collect 2 HTML fragments to build the <nav/> bridge, and use the ground CSS console to disable the barrier!',
      tag: 'HTML + CSS'
    },
    exit: { x: 880, y: 452, locked: false },
    platforms: [
      { x: 0, y: 480, w: 340, h: 60, type: 'tile_css_styled_accent' },
      { x: 580, y: 480, w: 380, h: 60, type: 'tile_css_styled_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_css_styled' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_css_styled' },
      { x: 120, y: 410, w: 90, h: 32, type: 'tile_css_styled' },
      { x: 230, y: 340, w: 90, h: 32, type: 'tile_css_styled' }
    ],
    hazards: [
      { x: 340, y: 512, w: 240, h: 28, type: 'spikes', active: true }
    ],
    htmlFragments: [
      { id: 'f1', x: 165, y: 365 },
      { id: 'f2', x: 275, y: 295 }
    ],
    buildPoints: [
      {
        id: 'bridge_l5',
        x: 340,
        y: 480,
        w: 240,
        h: 32,
        cost: 2,
        label: '<nav class="bridge">'
      }
    ],
    cssPlatforms: [
      {
        id: 'barrier_l5',
        x: 700,
        y: 160,
        w: 32,
        h: 320,
        initialSolid: true,
        label: 'barrier'
      }
    ],
    cssTerminals: [
      {
        x: 60,
        y: 480, // FIRMLY ON OPEN GROUND FLOOR
        targetGroup: 'css_l5',
        label: 'CSS: Specificity Override'
      }
    ],
    jsSwitches: []
  },

  {
    id: 6,
    name: 'NÍVEL 6: CSS III - BOX MODEL & LASERS',
    nameEn: 'LEVEL 6: CSS III - BOX MODEL & LASERS',
    subtitle: 'HTML + CSS + Lasers de Deleção',
    subEn: 'HTML + CSS + Deletion Lasers',
    unlockedAbility: 'HTML & CSS',
    targetTime: 38,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'css',
      bgColor: '#140e24',
      bgTexture: 'bg_level_3',
      accentColor: '#a855f7',
      tag: 'CSS3'
    },
    hint: {
      titlePt: 'DICA: BOX MODEL & LASERS',
      titleEn: 'HINT: BOX MODEL & LASERS',
      textPt: 'Avançado! Constrói a ponte com fragmentos HTML e aciona a consola CSS no chão para desativar o laser de overflow!',
      textEn: 'Advanced! Build the bridge with HTML fragments and activate the ground CSS console to disable the overflow laser!',
      tag: 'CSS3'
    },
    exit: { x: 880, y: 452, locked: false },
    platforms: [
      // Left ground
      { x: 0, y: 480, w: 340, h: 60, type: 'tile_css_styled_accent' },
      // Right ground
      { x: 600, y: 480, w: 360, h: 60, type: 'tile_css_styled_accent' },
      // Walls
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_css_styled' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_css_styled' },
      // Steps for fragments
      { x: 130, y: 410, w: 90, h: 32, type: 'tile_css_styled' },
      { x: 230, y: 340, w: 90, h: 32, type: 'tile_css_styled' }
    ],
    hazards: [
      { x: 340, y: 512, w: 260, h: 28, type: 'spikes', active: true },
      {
        x: 750,
        y: 360,
        w: 20,
        h: 120,
        type: 'laser',
        active: true,
        cssToggleable: true,
        targetGroup: 'css_l6'
      }
    ],
    htmlFragments: [
      { id: 'f1', x: 175, y: 365 },
      { id: 'f2', x: 275, y: 295 }
    ],
    buildPoints: [
      {
        id: 'bridge_l6',
        x: 340,
        y: 480,
        w: 260,
        h: 32,
        cost: 2,
        label: '<div class="box-model-bridge">'
      }
    ],
    cssTerminals: [
      {
        x: 280,
        y: 480, // ON GROUND FLOOR
        targetGroup: 'css_l6',
        label: 'CSS: Disable Overflow Laser'
      }
    ],
    cssPlatforms: [],
    jsSwitches: []
  },

  // ==========================================
  // GRUPO 3: JAVASCRIPT (NÍVEIS 7 - 9)
  // Tema: Event Loop, Callbacks & Promises, integrando HTML + CSS
  // ==========================================
  {
    id: 7,
    name: 'NÍVEL 7: JS I - CALLBACKS & SEQUÊNCIA',
    nameEn: 'LEVEL 7: JS I - CALLBACKS & SEQUENCE',
    subtitle: 'Módulo JS: Callbacks e Ordem de Execução',
    subEn: 'JS Module: Callbacks & Execution Order',
    unlockedAbility: 'JAVASCRIPT',
    targetTime: 30,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'js',
      bgColor: '#101012',
      bgTexture: 'bg_level_4',
      accentColor: '#f7df1e',
      tag: 'JAVASCRIPT'
    },
    hint: {
      titlePt: 'DICA: CALLBACKS JS I',
      titleEn: 'HINT: JS CALLBACKS I',
      textPt: 'Porta trancada por uma sequência síncrona! Prime os botões na ordem: [1] -> [2] -> [3] para destrancar a porta de saída no chão!',
      textEn: 'Door locked by sync sequence! Press buttons in order: [1] -> [2] -> [3] to unlock the ground exit door!',
      tag: 'ES6+'
    },
    exit: { x: 880, y: 452, locked: true },
    platforms: [
      { x: 0, y: 480, w: 960, h: 60, type: 'tile_js_stack_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_js_stack' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_js_stack' },
      { x: 250, y: 410, w: 100, h: 32, type: 'tile_js_stack' },
      { x: 450, y: 340, w: 100, h: 32, type: 'tile_js_stack' },
      { x: 650, y: 410, w: 100, h: 32, type: 'tile_js_stack' }
    ],
    jsSwitches: [
      { id: 1, x: 300, y: 370 },
      { id: 2, x: 500, y: 300 },
      { id: 3, x: 700, y: 370 }
    ],
    jsSequence: [1, 2, 3],
    htmlFragments: [],
    buildPoints: [],
    cssPlatforms: [],
    cssTerminals: [],
    hazards: []
  },

  {
    id: 8,
    name: 'NÍVEL 8: JS II - ASYNC / AWAIT & HTML',
    nameEn: 'LEVEL 8: JS II - ASYNC / AWAIT & HTML',
    subtitle: 'Integração HTML + JavaScript',
    subEn: 'HTML + JavaScript Integration',
    unlockedAbility: 'HTML & JS',
    targetTime: 36,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'js',
      bgColor: '#101012',
      bgTexture: 'bg_level_4',
      accentColor: '#f7df1e',
      tag: 'HTML + JS'
    },
    hint: {
      titlePt: 'DICA: ASYNC/AWAIT (HTML + JS)',
      titleEn: 'HINT: ASYNC/AWAIT (HTML + JS)',
      textPt: 'Recolhe 2 fragmentos HTML para erguer a ponte sobre o fosso e resolve a sequência de Promises: [2] -> [1] -> [3]!',
      textEn: 'Collect 2 HTML fragments to build the bridge across the pit, then resolve Promise sequence: [2] -> [1] -> [3]!',
      tag: 'HTML + JS'
    },
    exit: { x: 880, y: 452, locked: true },
    platforms: [
      { x: 0, y: 480, w: 320, h: 60, type: 'tile_js_stack_accent' },
      { x: 580, y: 480, w: 380, h: 60, type: 'tile_js_stack_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_js_stack' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_js_stack' },
      // Left steps for HTML fragments:
      { x: 100, y: 410, w: 80, h: 32, type: 'tile_js_stack' },
      { x: 190, y: 340, w: 80, h: 32, type: 'tile_js_stack' },
      // Right steps for JS switches:
      { x: 630, y: 410, w: 80, h: 32, type: 'tile_js_stack' },
      { x: 730, y: 340, w: 80, h: 32, type: 'tile_js_stack' }
    ],
    hazards: [
      { x: 320, y: 512, w: 260, h: 28, type: 'spikes', active: true }
    ],
    htmlFragments: [
      { id: 'f1', x: 140, y: 365 },
      { id: 'f2', x: 230, y: 295 }
    ],
    buildPoints: [
      {
        id: 'bridge_l8',
        x: 320,
        y: 480,
        w: 260,
        h: 32,
        cost: 2,
        label: '<div class="async-bridge">'
      }
    ],
    jsSwitches: [
      { id: 1, x: 670, y: 370 },
      { id: 2, x: 770, y: 300 },
      { id: 3, x: 830, y: 440 }
    ],
    jsSequence: [2, 1, 3],
    cssPlatforms: [],
    cssTerminals: []
  },

  {
    id: 9,
    name: 'NÍVEL 9: JS III - O EVENT LOOP INTEGRADO',
    nameEn: 'LEVEL 9: JS III - INTEGRATED EVENT LOOP',
    subtitle: 'Integração Completa HTML + CSS + JS',
    subEn: 'Full HTML + CSS + JS Integration',
    unlockedAbility: 'HTML + CSS + JS',
    targetTime: 42,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'js',
      bgColor: '#101012',
      bgTexture: 'bg_level_4',
      accentColor: '#f7df1e',
      tag: 'STACK WEB'
    },
    hint: {
      titlePt: 'DICA: EVENT LOOP (HTML + CSS + JS)',
      titleEn: 'HINT: EVENT LOOP (HTML + CSS + JS)',
      textPt: 'A grande integração! Constrói a ponte, desativa o laser na consola CSS no chão e resolve a sequência assíncrona [3] -> [1] -> [2]!',
      textEn: 'Grand integration! Build bridge, disable laser at ground CSS console, and solve async sequence [3] -> [1] -> [2]!',
      tag: 'STACK WEB'
    },
    exit: { x: 880, y: 452, locked: true },
    platforms: [
      { x: 0, y: 480, w: 320, h: 60, type: 'tile_js_stack_accent' },
      { x: 560, y: 480, w: 400, h: 60, type: 'tile_js_stack_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_js_stack' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_js_stack' },
      // Left steps for HTML fragments:
      { x: 100, y: 410, w: 80, h: 32, type: 'tile_js_stack' },
      { x: 190, y: 340, w: 80, h: 32, type: 'tile_js_stack' },
      // Right steps for JS switches:
      { x: 620, y: 410, w: 80, h: 32, type: 'tile_js_stack' },
      { x: 710, y: 340, w: 80, h: 32, type: 'tile_js_stack' }
    ],
    hazards: [
      { x: 320, y: 512, w: 240, h: 28, type: 'spikes', active: true },
      {
        x: 780,
        y: 360,
        w: 20,
        h: 120,
        type: 'laser',
        active: true,
        cssToggleable: true,
        targetGroup: 'css_l9'
      }
    ],
    htmlFragments: [
      { id: 'f1', x: 140, y: 365 },
      { id: 'f2', x: 230, y: 295 }
    ],
    buildPoints: [
      {
        id: 'bridge_l9',
        x: 320,
        y: 480,
        w: 240,
        h: 32,
        cost: 2,
        label: '<div class="loop-bridge">'
      }
    ],
    cssTerminals: [
      {
        x: 60,
        y: 480, // ON OPEN GROUND FLOOR
        targetGroup: 'css_l9',
        label: 'CSS: Clear Laser'
      }
    ],
    jsSwitches: [
      { id: 1, x: 660, y: 370 },
      { id: 2, x: 750, y: 300 },
      { id: 3, x: 830, y: 440 }
    ],
    jsSequence: [3, 1, 2],
    cssPlatforms: []
  },

  // ==========================================
  // GRUPO 4: TESTES & PERFORMANCE (NÍVEIS 10 - 12)
  // Tema: Profiler, Bugs a disparar erros e Terminais de Teste no Chão
  // ==========================================
  {
    id: 10,
    name: 'NÍVEL 10: QA I - O BUG DISPARADOR',
    nameEn: 'LEVEL 10: QA I - ERROR DISPATCHER BUG',
    subtitle: 'Módulo QA: Bug Zombie & Desempenho',
    subEn: 'QA Module: Zombie Bug & Performance',
    unlockedAbility: 'TESTES & PERFORMANCE',
    targetTime: 32,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'testing',
      bgColor: '#081015',
      bgTexture: 'bg_level_5',
      accentColor: '#10b981',
      tag: 'QA / TESTES'
    },
    hint: {
      titlePt: 'DICA: TESTES & ERROS I',
      titleEn: 'HINT: TESTING & ERRORS I',
      textPt: 'Um processo zumbi está a disparar orbes de erro! Esquiva-te dos projéteis e alcança a consola de testes no chão para correr npm test --fix!',
      textEn: 'A zombie process is firing error projectiles! Dodge past them and reach the ground test console to run npm test --fix!',
      tag: 'QA'
    },
    exit: { x: 880, y: 452, locked: true },
    platforms: [
      { x: 0, y: 480, w: 960, h: 60, type: 'tile_test_runner_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_test_runner' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_test_runner' },
      { x: 160, y: 410, w: 100, h: 32, type: 'tile_test_runner' },
      { x: 300, y: 340, w: 100, h: 32, type: 'tile_test_runner' },
      { x: 680, y: 382, w: 90, h: 32, type: 'tile_test_runner' } // Bug perch
    ],
    shootingBugs: [
      { id: 'bug_10', x: 725, y: 348, dir: -1, fireRate: 1700, speed: 200, range: 750 }
    ],
    testTerminals: [
      { x: 520, y: 480, label: 'TEST: npm test --fix' } // ON GROUND FLOOR
    ],
    htmlFragments: [],
    buildPoints: [],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: [],
    hazards: []
  },

  {
    id: 11,
    name: 'NÍVEL 11: QA II - TESTES DE REGRESSÃO',
    nameEn: 'LEVEL 11: QA II - REGRESSION TESTING',
    subtitle: 'Integração HTML + Testes de Regressão',
    subEn: 'HTML + Regression Testing Integration',
    unlockedAbility: 'HTML & TESTES',
    targetTime: 38,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'testing',
      bgColor: '#081015',
      bgTexture: 'bg_level_5',
      accentColor: '#10b981',
      tag: 'HTML + QA'
    },
    hint: {
      titlePt: 'DICA: REGRESSÃO (HTML + QA)',
      titleEn: 'HINT: REGRESSION (HTML + QA)',
      textPt: 'Apanha os fragmentos HTML para erguer a ponte sobre os espigões enquanto te esquivas dos projéteis, e corre npm test --fix na consola no chão!',
      textEn: 'Collect HTML fragments to build bridge over spikes while dodging error orbs, then run npm test --fix at the ground console!',
      tag: 'HTML + QA'
    },
    exit: { x: 880, y: 452, locked: true },
    platforms: [
      { x: 0, y: 480, w: 340, h: 60, type: 'tile_test_runner_accent' },
      { x: 580, y: 480, w: 380, h: 60, type: 'tile_test_runner_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_test_runner' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_test_runner' },
      { x: 130, y: 410, w: 90, h: 32, type: 'tile_test_runner' },
      { x: 230, y: 340, w: 90, h: 32, type: 'tile_test_runner' },
      { x: 700, y: 382, w: 90, h: 32, type: 'tile_test_runner' } // Bug perch
    ],
    hazards: [
      { x: 340, y: 512, w: 240, h: 28, type: 'spikes', active: true }
    ],
    htmlFragments: [
      { id: 'f1', x: 175, y: 365 },
      { id: 'f2', x: 275, y: 295 }
    ],
    buildPoints: [
      {
        id: 'bridge_l11',
        x: 340,
        y: 480,
        w: 240,
        h: 32,
        cost: 2,
        label: '<div class="qa-bridge">'
      }
    ],
    shootingBugs: [
      { id: 'bug_11', x: 745, y: 348, dir: -1, fireRate: 1600, speed: 210, range: 750 }
    ],
    testTerminals: [
      { x: 620, y: 480, label: 'TEST: npm test --fix' } // ON GROUND FLOOR
    ],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: []
  },

  {
    id: 12,
    name: 'NÍVEL 12: QA III - TESTES DE CARGA & PERFORMANCE',
    nameEn: 'LEVEL 12: QA III - LOAD & PERFORMANCE TESTS',
    subtitle: 'Integração HTML + CSS + Testes de Carga',
    subEn: 'HTML + CSS + Load Testing Integration',
    unlockedAbility: 'HTML + CSS + QA',
    targetTime: 44,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'testing',
      bgColor: '#081015',
      bgTexture: 'bg_level_5',
      accentColor: '#10b981',
      tag: 'QA STACK'
    },
    hint: {
      titlePt: 'DICA: PERFORMANCE (HTML + CSS + QA)',
      titleEn: 'HINT: PERFORMANCE (HTML + CSS + QA)',
      textPt: 'Sobrecarga de sistema! Constrói a ponte, usa o terminal CSS no chão para desligar o laser e executa a consola de testes no chão para pacificar o bug!',
      textEn: 'System overload! Build bridge, use ground CSS terminal to kill laser, and execute ground test console to patch the bug!',
      tag: 'QA STACK'
    },
    exit: { x: 880, y: 452, locked: true },
    platforms: [
      { x: 0, y: 480, w: 320, h: 60, type: 'tile_test_runner_accent' },
      { x: 560, y: 480, w: 400, h: 60, type: 'tile_test_runner_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_test_runner' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_test_runner' },
      { x: 120, y: 410, w: 90, h: 32, type: 'tile_test_runner' },
      { x: 220, y: 340, w: 90, h: 32, type: 'tile_test_runner' },
      { x: 740, y: 382, w: 90, h: 32, type: 'tile_test_runner' } // Bug perch
    ],
    hazards: [
      { x: 320, y: 512, w: 240, h: 28, type: 'spikes', active: true },
      {
        x: 600,
        y: 360,
        w: 20,
        h: 120,
        type: 'laser',
        active: true,
        cssToggleable: true,
        targetGroup: 'css_l12'
      }
    ],
    htmlFragments: [
      { id: 'f1', x: 165, y: 365 },
      { id: 'f2', x: 265, y: 295 }
    ],
    buildPoints: [
      {
        id: 'bridge_l12',
        x: 320,
        y: 480,
        w: 240,
        h: 32,
        cost: 2,
        label: '<div class="perf-bridge">'
      }
    ],
    cssTerminals: [
      {
        x: 240,
        y: 480, // ON GROUND FLOOR
        targetGroup: 'css_l12',
        label: 'CSS: Overload Laser Off'
      }
    ],
    shootingBugs: [
      { id: 'bug_12', x: 785, y: 348, dir: -1, fireRate: 1500, speed: 220, range: 750 }
    ],
    testTerminals: [
      { x: 680, y: 480, label: 'TEST: npm test --fix' } // ON GROUND FLOOR
    ],
    cssPlatforms: [],
    jsSwitches: []
  },

  // ==========================================
  // GRUPO 5: INTELIGÊNCIA ARTIFICIAL (NÍVEIS 13 - 15)
  // Tema: Redes Neuronais, Disparo do AI Copilot e Consolas de Inferência no Chão
  // ==========================================
  {
    id: 13,
    name: 'NÍVEL 13: AI I - O AGENTE AUTÓNOMO',
    nameEn: 'LEVEL 13: AI I - THE AUTONOMOUS AGENT',
    subtitle: 'Módulo IA: Disparo do Copilot & Tokens',
    subEn: 'AI Module: Copilot Launch & Tokens',
    unlockedAbility: 'INTELIGÊNCIA ARTIFICIAL',
    targetTime: 38,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'ai',
      bgColor: '#070814',
      bgTexture: 'bg_level_6',
      accentColor: '#8b5cf6',
      tag: 'AI / NEURAL'
    },
    hint: {
      titlePt: 'DICA: AGENTE AUTÓNOMO I',
      titleEn: 'HINT: AUTONOMOUS AGENT I',
      textPt: 'Os 3 tokens neurais estão demasiado altos para saltares! Prime [F] ou CLICA no ecrã para atirar o AI Copilot a buscá-los, e ativa a consola neural no chão!',
      textEn: 'The 3 neural tokens are too high to jump! Press [F] or CLICK the screen to launch the AI Copilot to fetch them, then activate the ground neural console!',
      tag: 'AI'
    },
    exit: { x: 880, y: 452, locked: true },
    hasAiCopilot: true,
    platforms: [
      { x: 0, y: 480, w: 420, h: 60, type: 'tile_ai_accent' },
      { x: 680, y: 480, w: 280, h: 60, type: 'tile_ai_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_ai_synapse' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_ai_synapse' },
      { x: 150, y: 410, w: 90, h: 32, type: 'tile_ai_synapse' },
      { x: 260, y: 350, w: 90, h: 32, type: 'tile_ai_synapse' },
      { x: 740, y: 410, w: 90, h: 32, type: 'tile_ai_synapse' },
      // Elevated sky perches for high tokens
      { x: 168, y: 150, w: 64, h: 16, type: 'tile_ai_synapse' },
      { x: 488, y: 130, w: 64, h: 16, type: 'tile_ai_synapse' },
      { x: 788, y: 150, w: 64, h: 16, type: 'tile_ai_synapse' }
    ],
    hazards: [
      { x: 420, y: 512, w: 260, h: 28, type: 'spikes', active: true }
    ],
    aiTokens: [
      { id: 'tok_prompt', name: 'PROMPT', x: 200, y: 110 },
      { id: 'tok_weights', name: 'WEIGHTS', x: 520, y: 90 },
      { id: 'tok_attention', name: 'ATTENTION', x: 820, y: 110 }
    ],
    aiTerminals: [
      { x: 300, y: 480, cost: 3, label: 'AI: RUN INFERENCE' } // ON GROUND FLOOR
    ],
    aiBridges: [
      {
        id: 'ai_bridge_13',
        x: 420,
        y: 480,
        w: 260,
        h: 32,
        ghostTexture: 'tile_ai_bridge_ghost',
        solidTexture: 'tile_ai_bridge_solid'
      }
    ],
    htmlFragments: [],
    buildPoints: [],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: []
  },

  {
    id: 14,
    name: 'NÍVEL 14: AI II - FINE-TUNING & ESTRUTURA',
    nameEn: 'LEVEL 14: AI II - FINE-TUNING & STRUCTURE',
    subtitle: 'Integração HTML + Inteligência Artificial',
    subEn: 'HTML + Artificial Intelligence Integration',
    unlockedAbility: 'HTML & AI',
    targetTime: 42,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'ai',
      bgColor: '#070814',
      bgTexture: 'bg_level_6',
      accentColor: '#8b5cf6',
      tag: 'HTML + AI'
    },
    hint: {
      titlePt: 'DICA: FINE-TUNING (HTML + AI)',
      titleEn: 'HINT: FINE-TUNING (HTML + AI)',
      textPt: 'Apanha os fragmentos HTML para erguer a ponte inicial, e atira o AI Copilot com [F] ou clique para recolher os 3 tokens no céu!',
      textEn: 'Collect HTML fragments to build initial bridge, and launch AI Copilot with [F] or click to fetch the 3 tokens in the sky!',
      tag: 'HTML + AI'
    },
    exit: { x: 880, y: 452, locked: true },
    hasAiCopilot: true,
    platforms: [
      { x: 0, y: 480, w: 280, h: 60, type: 'tile_ai_accent' },
      { x: 460, y: 480, w: 120, h: 60, type: 'tile_ai_accent' },
      { x: 760, y: 480, w: 200, h: 60, type: 'tile_ai_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_ai_synapse' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_ai_synapse' },
      { x: 120, y: 410, w: 80, h: 32, type: 'tile_ai_synapse' },
      { x: 200, y: 340, w: 80, h: 32, type: 'tile_ai_synapse' },
      // High perches for tokens
      { x: 200, y: 140, w: 64, h: 16, type: 'tile_ai_synapse' },
      { x: 500, y: 120, w: 64, h: 16, type: 'tile_ai_synapse' },
      { x: 800, y: 140, w: 64, h: 16, type: 'tile_ai_synapse' }
    ],
    hazards: [
      { x: 280, y: 512, w: 180, h: 28, type: 'spikes', active: true },
      { x: 580, y: 512, w: 180, h: 28, type: 'spikes', active: true }
    ],
    htmlFragments: [
      { id: 'f1', x: 160, y: 365 },
      { id: 'f2', x: 240, y: 295 }
    ],
    buildPoints: [
      {
        id: 'bridge_l14',
        x: 280,
        y: 480,
        w: 180,
        h: 32,
        cost: 2,
        label: '<div class="ai-input">'
      }
    ],
    aiTokens: [
      { id: 'tok_prompt', name: 'PROMPT', x: 232, y: 100 },
      { id: 'tok_weights', name: 'WEIGHTS', x: 532, y: 80 },
      { id: 'tok_attention', name: 'ATTENTION', x: 832, y: 100 }
    ],
    aiTerminals: [
      { x: 520, y: 480, cost: 3, label: 'AI: INFERENCE RUNNER' } // ON GROUND FLOOR
    ],
    aiBridges: [
      {
        id: 'ai_bridge_14',
        x: 580,
        y: 480,
        w: 180,
        h: 32,
        ghostTexture: 'tile_ai_bridge_ghost',
        solidTexture: 'tile_ai_bridge_solid'
      }
    ],
    cssPlatforms: [],
    cssTerminals: [],
    jsSwitches: []
  },

  {
    id: 15,
    name: 'NÍVEL 15: AI III - REDE NEURONAL MULTI-CAMADA',
    nameEn: 'LEVEL 15: AI III - MULTI-LAYER NEURAL NET',
    subtitle: 'Integração CSS + QA + Inteligência Artificial',
    subEn: 'CSS + QA + Artificial Intelligence Integration',
    unlockedAbility: 'CSS + QA + AI',
    targetTime: 48,
    playerStart: { x: 80, y: 440 },
    theme: {
      key: 'ai',
      bgColor: '#070814',
      bgTexture: 'bg_level_6',
      accentColor: '#8b5cf6',
      tag: 'CSS + QA + AI'
    },
    hint: {
      titlePt: 'DICA: MULTI-CAMADA (CSS + QA + AI)',
      titleEn: 'HINT: MULTI-LAYER (CSS + QA + AI)',
      textPt: 'Desafio extremo! Desvia-te do bug atirador, usa a consola CSS no chão para desativar a barreira e atira o AI Copilot [F / Clique] para apanhar os tokens no céu!',
      textEn: 'Extreme challenge! Dodge the shooting bug, use ground CSS console to kill barrier, and launch AI Copilot [F / Click] to gather sky tokens!',
      tag: 'CSS + QA + AI'
    },
    exit: { x: 880, y: 452, locked: true },
    hasAiCopilot: true,
    platforms: [
      { x: 0, y: 480, w: 420, h: 60, type: 'tile_ai_accent' },
      { x: 640, y: 480, w: 320, h: 60, type: 'tile_ai_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_ai_synapse' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_ai_synapse' },
      { x: 120, y: 410, w: 90, h: 32, type: 'tile_ai_synapse' },
      { x: 220, y: 340, w: 90, h: 32, type: 'tile_ai_synapse' },
      { x: 600, y: 382, w: 90, h: 32, type: 'tile_ai_synapse' }, // Bug perch
      // High perches for tokens
      { x: 168, y: 150, w: 64, h: 16, type: 'tile_ai_synapse' },
      { x: 488, y: 120, w: 64, h: 16, type: 'tile_ai_synapse' },
      { x: 808, y: 150, w: 64, h: 16, type: 'tile_ai_synapse' }
    ],
    hazards: [
      { x: 420, y: 512, w: 220, h: 28, type: 'spikes', active: true }
    ],
    shootingBugs: [
      { id: 'bug_15', x: 645, y: 348, dir: -1, fireRate: 1800, speed: 200, range: 600 }
    ],
    cssPlatforms: [
      {
        id: 'barrier_l15',
        x: 440,
        y: 160,
        w: 32,
        h: 320,
        initialSolid: true,
        label: 'barrier'
      }
    ],
    cssTerminals: [
      {
        x: 220,
        y: 480, // ON GROUND FLOOR
        targetGroup: 'css_l15',
        label: 'CSS: Toggle Layer Barrier'
      }
    ],
    aiTokens: [
      { id: 'tok_prompt', name: 'PROMPT', x: 200, y: 110 },
      { id: 'tok_weights', name: 'WEIGHTS', x: 520, y: 80 },
      { id: 'tok_attention', name: 'ATTENTION', x: 840, y: 110 }
    ],
    aiTerminals: [
      { x: 340, y: 480, cost: 3, label: 'AI: DEEP INFERENCE' } // ON GROUND FLOOR
    ],
    aiBridges: [
      {
        id: 'ai_bridge_15',
        x: 420,
        y: 480,
        w: 220,
        h: 32,
        ghostTexture: 'tile_ai_bridge_ghost',
        solidTexture: 'tile_ai_bridge_solid'
      }
    ],
    htmlFragments: [],
    buildPoints: [],
    jsSwitches: []
  },

  // ==========================================
  // GRUPO 6: BATALHA FINAL (NÍVEL 16)
  // Tema: Batalha Final contra o Vírus Gigante com o Martelo Web (HTML + CSS + JS)
  // ==========================================
  {
    id: 16,
    name: 'NÍVEL 16: BATALHA FINAL: O MARTELO WEB',
    nameEn: 'LEVEL 16: FINAL BATTLE: THE WEB HAMMER',
    subtitle: 'HTML (Estrutura) + CSS (Ativação) + JS (Animação)',
    subEn: 'HTML (Structure) + CSS (Enable) + JS (Animation)',
    unlockedAbility: 'HTML + CSS + JS (O MARTELO)',
    targetTime: 65,
    playerStart: { x: 70, y: 440 },
    theme: {
      key: 'boss',
      bgColor: '#050308',
      bgTexture: 'bg_level_8',
      accentColor: '#ef4444',
      tag: 'BOSS BATTLE'
    },
    hint: {
      titlePt: 'BATALHA FINAL: O MARTELO WEB',
      titleEn: 'FINAL BATTLE: THE WEB HAMMER',
      textPt: '1. Apanha os 2 fragmentos HTML e ergue o Martelo (<div id="hammer"/>)!\n2. Ativa o CSS na consola do chão para o energizar!\n3. Aciona o botão JS para animar o martelo e ESMAGAR o Vírus Gigante enquanto te esquivas dos seus tiros!',
      textEn: '1. Collect 2 HTML fragments and build the Hammer (<div id="hammer"/>)!\n2. Enable CSS at the ground console to energize it!\n3. Trigger the JS button to animate the hammer and SMASH the Giant Virus while dodging its shots!',
      tag: 'BOSS'
    },
    exit: { x: 880, y: 452, locked: true }, // Opens when giant virus is smashed
    glitchCore: {
      x: 480,
      y: 130,
      name: 'VIRUS_GIGANTE.EXE',
      fireRate: 1800,
      speed: 210
    },
    giantHammer: {
      x: 480,
      y: 240
    },
    platforms: [
      // Solid arena floor with side steps
      { x: 0, y: 480, w: 960, h: 60, type: 'tile_corrupted_accent' },
      { x: 0, y: 0, w: 32, h: 480, type: 'tile_corrupted_hex' },
      { x: 928, y: 0, w: 32, h: 480, type: 'tile_corrupted_hex' },
      // Left steps for HTML fragments
      { x: 70, y: 410, w: 80, h: 32, type: 'tile_corrupted_hex' },
      { x: 160, y: 340, w: 80, h: 32, type: 'tile_corrupted_hex' },
      // Center raised pedestal for the JS animation switch
      { x: 420, y: 410, w: 120, h: 32, type: 'tile_corrupted_hex' },
      // Right step for arena variety
      { x: 760, y: 410, w: 90, h: 32, type: 'tile_corrupted_hex' }
    ],
    htmlFragments: [
      { id: 'f1', x: 110, y: 365 }, // Left step 1
      { id: 'f2', x: 200, y: 295 }  // Left step 2
    ],
    buildPoints: [
      {
        id: 'hammer_bp',
        x: 432,
        y: 200,
        w: 96,
        h: 96,
        cost: 2,
        isHammer: true,
        label: '<div id="hammer"/>',
        ghostTexture: 'giant_hammer_ghost'
      }
    ],
    cssTerminals: [
      {
        x: 80,
        y: 480, // FIRMLY ON GROUND FLOOR
        targetGroup: 'boss_hammer_css',
        label: 'CSS: Enable <hammer/>'
      }
    ],
    jsSwitches: [
      { id: 1, x: 480, y: 370 }
    ],
    jsSequence: [1],
    hazards: []
  }
];
