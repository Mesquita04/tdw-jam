/**
 * Localization.js - Multi-language support (pt-PT and en-US).
 * Developed for TDW Game Jam by Net Yahoo (Francisco Mesquita & Gonçalo Abreu).
 */
import { Storage } from './Storage.js';

export const TRANSLATIONS = {
  pt: {
    // Press Start & Lang Select
    pressStart: 'PRIME QUALQUER TECLA PARA ENTRAR',
    pressStartSub: 'OU CLICA EM QUALQUER LUGAR',
    chooseLang: 'SELECIONA O IDIOMA DO SISTEMA',
    chooseLangSub: 'SELECT SYSTEM LANGUAGE',
    langPt: 'PORTUGUÊS (PT)',
    langEn: 'ENGLISH (EN)',

    // Title Screen
    gameTitle: 'TDW: ALT-F4',
    tagline: 'uma experiência TDW',
    btnPlay: 'JOGAR',
    btnContinue: 'CONTINUAR',
    btnLevelSelect: 'ESCOLHER NÍVEL',
    btnOptions: 'OPÇÕES',
    btnControls: 'CONTROLOS',
    btnCredits: 'CRÉDITOS FINAIS',
    btnLang: 'IDIOMA: PT 🇵🇹',
    btnOptionsDesc: 'Personalizar skins, música, efeitos sonoros e ecrã',
    btnChooseLevelDesc: 'Explora os 16 setores desbloqueados na Local Storage',
    soundActive: 'SOM: ATIVO 🔊',
    soundMuted: 'SOM: DESATIVADO 🔇',
    versionTag: 'v1.2.0 • TDW: ALT-F4 • NET YAHOO',

    // Options Modal
    optionsTitle: 'CONFIGURAÇÃO DO SISTEMA (OPÇÕES)',
    optionsSkins: 'SKINS DO PROGRAMADOR',
    optionsAudio: 'ÁUDIO & MÚSICA DE FUNDO',
    optionsDisplay: 'ECRÃ & VISUALIZAÇÃO',
    musicOn: 'MÚSICA DE FUNDO: ATIVA 🎵',
    musicOff: 'MÚSICA DE FUNDO: DESATIVADA 🔇',
    sfxOn: 'EFEITOS SONOROS (SFX): ATIVOS 🔊',
    sfxOff: 'EFEITOS SONOROS (SFX): DESATIVADOS 🔇',
    fullscreenBtn: 'ECRÃ INTEIRO (FULLSCREEN) ⛶',
    fullscreenExit: 'SAIR DE ECRÃ INTEIRO ⛶',
    skinActive: 'ATIVO',
    skinSelect: 'EQUIPAR',
    sectorsProgress: 'SETORES DESBLOQUEADOS: {0} / {1} • ESTRELAS: {2} / {3} ★',

    // HUD
    levelPrefix: 'NÍVEL',
    abilityPrefix: 'HABILIDADE',
    abilityNone: 'NENHUMA',

    // Modals - Pause
    pauseTitle: 'SISTEMA EM PAUSA',
    pauseSub: 'Processo em espera...',
    btnResume: 'CONTINUAR',
    btnRestart: 'REINICIAR NÍVEL (R)',
    btnMenu: 'MENU PRINCIPAL',

    // Modals - Game Over (Player Death)
    gameOverTitle: 'KERNEL PANIC!',
    gameOverSub: 'O processo do programador sofreu uma falha fatal.',
    btnGameOverRetry: 'JOGAR NOVAMENTE (R / ENTER)',
    btnGameOverMenu: 'MENU PRINCIPAL',
    deathLevel: 'Nível Atual:',
    deathCount: 'Falhas / Mortes Acumuladas:',

    // Modals - Controls
    controlsTitle: 'MANUAL DO DESENVOLVEDOR (CONTROLOS)',
    cMove: 'Mover programador para a esquerda / direita',
    cJump: 'Saltar (altura dinâmica / dobro da potência)',
    cInteract: 'Interagir com Terminais, Consolas e Pontos de Construção',
    cSkills: 'Consultar Habilidades Desbloqueadas (HTML, CSS, JS)',
    cAiDispatch: 'Atirar AI Copilot para buscar tokens elevados [F / Clique]',
    cRestart: 'Reiniciar rapidamente o nível atual',
    cPause: 'Pausar jogo / Abrir menu',
    conceptsTitle: 'CONCEITOS DE DEPURAÇÃO:',
    conceptHtml: 'HTML (Build): Apanha fragmentos <> para erguer pontes e plataformas <div>.',
    conceptCss: 'CSS (Style): Altera regras no terminal para transformar elementos entre sólido e fantasma.',
    conceptJs: 'JavaScript (Execute): Resolve sequências assíncronas de botões para abrir portais e desativar o vírus!',
    btnUnderstood: 'ENTENDIDO',

    // Modals - Credits
    creditsTitle: 'CRÉDITOS FINAIS',
    teamHeading: 'EQUIPA DE DESENVOLVIMENTO: NET YAHOO',
    author1: '• Francisco Mesquita',
    author2: '• Gonçalo Abreu',
    teamStatement: 'Desenvolvido pela equipa Net Yahoo, constituída pelo Francisco Mesquita e Gonçalo Abreu.',
    creditsSubtitle: 'Desenvolvido por Net Yahoo para a TDW 24-Hour Game Jam.',
    creditsLore: 'O jogador encarna um programador preso no próprio servidor web. O HTML constrói a estrutura, o CSS estiliza o espaço e o JavaScript executa a lógica de desinfeção.',
    techStack: 'Motor Phaser 3 • Áudio Web Audio API sintetizado • Pixel Art em Canvas Procedural',
    btnClose: 'FECHAR',

    // Modals - Level Select
    levelSelectTitle: 'SELECIONA O NÍVEL DO SISTEMA',
    btnBackMenu: 'VOLTAR AO MENU',
    locked: 'Bloqueado',
    toComplete: 'Por completar',
    bestTime: 'Melhor:',

    // Modals - Results
    resultsTitle: 'NÍVEL CONCLUÍDO!',
    star1: '★ 1: Nível Concluído',
    star2: '★ 2: Sem Mortes',
    star3: '★ 3: Tempo Recorde',
    execTime: 'Tempo de Execução:',
    targetTime: 'Tempo Alvo (3ª Estrela):',
    deaths: 'Falhas / Mortes:',
    btnNextLevel: 'PRÓXIMO NÍVEL (ENTER) ►',
    btnFinalVictory: 'RESTAURAÇÃO FINAL (ENTER) ★',
    btnRetry: 'REPETIR (R) ↺',

    // Modals - Victory (Créditos Finais)
    victoryTitle: 'SISTEMA RESTAURADO!',
    victorySubtitle: 'O VÍRUS GLITCH FOI EXTERMINADO COM SUCESSO!',
    victoryLore: 'O Kernel do servidor compilou sem erros. O código está limpo e a aplicação web voltou a funcionar a 100%!',
    victoryCreditsTitle: '★ CRÉDITOS FINAIS ★',
    victoryCreditsTeam: 'JOGO CRIADO POR: NET YAHOO',
    victoryStatement: 'Desenvolvido pela equipa Net Yahoo, constituída pelo Francisco Mesquita e Gonçalo Abreu.',
    victoryAuthors: 'Francisco Mesquita & Gonçalo Abreu',
    btnPlayAgain: 'JOGAR NOVAMENTE ↺',

    // Modals - Welcome to TDW
    welcomeTdwTitle: 'Welcome to TDW',
    welcomeTdwSubtitle: 'PARABÉNS, PROGRAMADOR! CONQUISTASTE A WEB STACK COMPLETA!',
    welcomeTdwLore: 'Completaste todos os desafios do Kernel: HTML (Estrutura), CSS (Estilo), JavaScript (Execução), Testes & QA (Resiliência) e Inteligência Artificial (Inovação). O sistema web está totalmente funcional e livre de bugs!',
    btnWelcomeCredits: 'VER CRÉDITOS FINAIS (ENTER) ►',
    skinUnlockedTitle: '★ NOVA SKIN DESBLOQUEADA! ★',
    skinUnlockedSubtitle: 'Desparasitaste o Kernel e desbloqueaste o Developer Coordenador!',
    skinCoordinatorName: 'Developer Coordenador',
    btnEquipNow: 'EQUIPAR AGORA',
    btnEquipped: '✓ EQUIPADA!',
    skinLockedDesc: '🔒 Bloqueado: Vence o jogo (Nível 16) para desbloquear!',

    // Roll Down Final Credits (Level 16 Post-Door)
    rollCreditsTitle: 'BEM VINDO A TDW!',
    rollCreditsBody: 'Este jogo foi desenvolvido pelos Net Yahoo, equipa composta pelo Francisco Mesquita e Gonçalo Abreu para competir na 1ª edição da TDW Jam - WEB GAME CHALLENGE 24H.',
    rollCreditsHope: 'Esperamos que tenham gostado!',
    btnRollMenu: 'Main menu',

    // In-Game Toasts
    fragCollected: 'Fragmento HTML recolhido!',
    bridgeBuilt: 'Ponte de elementos <div/> construída!',
    needFrags: 'Fragmentos insuficientes! Precisas de {0} <>.',
    cssToggled: 'CSS: Regras alteradas! display: block / none',
    syntaxError: 'Erro de Sintaxe! Ordem incorreta. Sequência reiniciada.',
    jsSuccess: 'Script JS executado com sucesso! Portal desbloqueado.',
    kernelPanic: 'Kernel Panic! Posição restaurada.',
    bossDefeated: 'VÍRUS GLITCH ELIMINADO! O portal abriu-se no chão!',
    bugPatched: 'npm test --fix: 100% PASS! Bug corrigido e portal desbloqueado.',
    aiTokenCollected: 'Token de treino neural recolhido!',
    aiInferred: 'Inferência concluída! O Copilot projetou a ponte neural!',
    needAiTokens: 'Dados insuficientes! O modelo necessita de 3 tokens de treino.',
    aiDispatchPrompt: '[F / CLIQUE] ATIRAR AI COPILOT',
    aiDispatched: 'AI Copilot a voar para recolher [{0}]!',
    aiAllGathered: 'Todos os tokens recolhidos! Ativa o Terminal IA [E].',
    hammerBuilt: 'HTML: <div id="hammer"/> estruturado! Ativa o CSS no terminal do chão!',
    hammerCssEnabled: 'CSS: display: block! Martelo energizado! Executa a animação JS!',
    hammerJsSmash: 'JS: hammer.animate({ swing: true })! MARTELADA NO VÍRUS!',
    needHammerBuild: 'Constrói primeiro o martelo com fragmentos HTML!',
    needHammerCss: 'O martelo ainda está desativado! Ativa o CSS no chão primeiro!',

    // Terminal Dialogs
    termTitleInit: 'TERMINAL DE INICIALIZAÇÃO',
    termMsg1: 'ALERTA DO SISTEMA:\nO servidor web foi corrompido por um glitch virus desconhecido!\nControlos: Usa [A/D] para correr e [Espaço/W] para saltar.\nSegue para a direita até à porta de saída no chão.',
    
    termTitleHtml: 'MÓDULO HTML DESATIVADO',
    termMsg2: 'Falta a estrutura da página!\nSalta pelos degraus para apanhar os 2 fragmentos de código <> e prime [E] no ponto de construção para erguer a ponte <div>.',

    termTitleCss: 'CONSOLA DE ESTILOS CSS',
    termMsg3: 'Regras de visualização corrompidas!\nUsa o terminal [E] para alternar entre:\n• display: block (SÓLIDO)\n• display: none (FANTASMA)\nDesativa a barreira para alcançares a porta de saída no chão!',

    termTitleJs: 'DEPURADOR DE JAVASCRIPT',
    termMsg4: 'A porta de saída no chão está trancada por um loop assíncrono!\nOrdem das Promises:\n1º [2] (init)\n2º [1] (fetchData)\n3º [3] (renderUI)\nPrime os botões pela ordem: 2 → 1 → 3 para destrancar a porta!',

    termTitleTest: 'SUITE DE TESTES E PROFILER',
    termMsg5: 'BUG CRÍTICO DETETADO!\nUm processo zumbi está a disparar UnhandledRuntimeError em loop contínuo.\nUsa o timing dos teus saltos para te esquivares dos projéteis de erro e chega ao terminal de testes para executar "npm test --fix" e pacificar o bug!',

    termTitleAi: 'NÚCLEO NEURONAL & COPILOT',
    termMsg6: 'TOKENS EM ALTITUDE ELEVADA!\nOs tokens [PROMPT], [WEIGHTS] e [ATTENTION] estão inacessíveis a saltar.\n1. Prime [F] ou CLICA no ecrã para atirar o teu AI Copilot a recolhê-los lá acima!\n2. Leva os 3 tokens à consola de inferência para projetar a ponte neural sólida!',

    termTitleMerge: 'CONFLITO DE CÓDIGO (GIT MERGE)',
    termMsg7: 'O branch de produção está em conflito com o local!\n1. Salta pelos degraus para apanhar os fragmentos HTML.\n2. Constrói a ponte e usa o terminal CSS para desativar o laser.\n3. A porta de saída espera-te no chão!',

    termTitleBoss: 'NÚCLEO DO VÍRUS CORROMPIDO',
    termMsg8: 'O Kernel está sob ataque do GLITCH CORE!\nMissão de Restauração Total:\n1. Recolhe 3 fragmentos HTML para erguer a ponte central.\n2. Altera o CSS para solidificar os degraus.\n3. Aciona os botões [3 → 2 → 1] para desativar o vírus!\nA porta de saída abrir-se-á no chão!'
  },

  en: {
    // Press Start & Lang Select
    pressStart: 'PRESS ANY BUTTON TO START',
    pressStartSub: 'OR CLICK ANYWHERE',
    chooseLang: 'SELECT SYSTEM LANGUAGE',
    chooseLangSub: 'ESCOLHE O IDIOMA DO SISTEMA',
    langPt: 'PORTUGUÊS (PT)',
    langEn: 'ENGLISH (EN)',

    // Title Screen
    gameTitle: 'TDW: ALT-F4',
    tagline: 'uma experiência TDW',
    btnPlay: 'PLAY',
    btnContinue: 'CONTINUE',
    btnLevelSelect: 'CHOOSE LEVEL',
    btnOptions: 'OPTIONS',
    btnControls: 'CONTROLS',
    btnCredits: 'FINAL CREDITS',
    btnLang: 'LANGUAGE: EN 🇬🇧',
    btnOptionsDesc: 'Customize skins, music, sound effects & screen',
    btnChooseLevelDesc: 'Browse 16 sectors unlocked via Local Storage',
    soundActive: 'AUDIO: ON 🔊',
    soundMuted: 'AUDIO: MUTED 🔇',
    versionTag: 'v1.2.0 • TDW: ALT-F4 • NET YAHOO',

    // Options Modal
    optionsTitle: 'SYSTEM CONFIGURATION (OPTIONS)',
    optionsSkins: 'DEVELOPER SKINS',
    optionsAudio: 'AUDIO & BACKGROUND MUSIC',
    optionsDisplay: 'SCREEN & DISPLAY',
    musicOn: 'BACKGROUND MUSIC: ON 🎵',
    musicOff: 'BACKGROUND MUSIC: OFF 🔇',
    sfxOn: 'SOUND EFFECTS (SFX): ON 🔊',
    sfxOff: 'SOUND EFFECTS (SFX): OFF 🔇',
    fullscreenBtn: 'FULLSCREEN ⛶',
    fullscreenExit: 'EXIT FULLSCREEN ⛶',
    skinActive: 'ACTIVE',
    skinSelect: 'EQUIP',
    sectorsProgress: 'UNLOCKED SECTORS: {0} / {1} • STARS: {2} / {3} ★',

    // HUD
    levelPrefix: 'LEVEL',
    abilityPrefix: 'ABILITY',
    abilityNone: 'NONE',

    // Modals - Pause
    pauseTitle: 'SYSTEM PAUSED',
    pauseSub: 'Process suspended...',
    btnResume: 'RESUME',
    btnRestart: 'RESTART LEVEL (R)',
    btnMenu: 'MAIN MENU',

    // Modals - Game Over (Player Death)
    gameOverTitle: 'KERNEL PANIC!',
    gameOverSub: 'The developer process encountered a fatal crash.',
    btnGameOverRetry: 'PLAY AGAIN (R / ENTER)',
    btnGameOverMenu: 'MAIN MENU',
    deathLevel: 'Current Level:',
    deathCount: 'Total Failures / Deaths:',

    // Modals - Controls
    controlsTitle: 'DEVELOPER MANUAL (CONTROLS)',
    cMove: 'Move developer left / right',
    cJump: 'Jump (variable height / doubled power)',
    cInteract: 'Interact with Terminals, Consoles & Build Points',
    cSkills: 'Inspect Unlocked Abilities (HTML, CSS, JS)',
    cAiDispatch: 'Launch AI Copilot to fetch high tokens [F / Click]',
    cRestart: 'Quickly restart current room',
    cPause: 'Pause game / Open menu',
    conceptsTitle: 'DEBUGGING CONCEPTS:',
    conceptHtml: 'HTML (Build): Collect <> fragments to erect <div> platforms & bridges.',
    conceptCss: 'CSS (Style): Change rules at terminal to toggle elements between solid and ghost.',
    conceptJs: 'JavaScript (Execute): Solve async button sequences to unlock portals and destroy the virus!',
    btnUnderstood: 'UNDERSTOOD',

    // Modals - Credits
    creditsTitle: 'FINAL CREDITS',
    teamHeading: 'DEVELOPMENT TEAM: NET YAHOO',
    author1: '• Francisco Mesquita',
    author2: '• Gonçalo Abreu',
    teamStatement: 'Desenvolvido pela equipa Net Yahoo, constituída pelo Francisco Mesquita e Gonçalo Abreu.',
    creditsSubtitle: 'Crafted with passion by Net Yahoo for the TDW 24-Hour Game Jam.',
    creditsLore: 'The player embodies a developer trapped inside their own web server. HTML builds structure, CSS shapes and styles space, and JavaScript executes the core purge logic.',
    techStack: 'Phaser 3 Engine • Real-time Synthesized Web Audio API • Procedural Canvas Pixel Art',
    btnClose: 'CLOSE',

    // Modals - Level Select
    levelSelectTitle: 'SELECT SYSTEM LEVEL',
    btnBackMenu: 'BACK TO MENU',
    locked: 'Locked',
    toComplete: 'Pending',
    bestTime: 'Best:',

    // Modals - Results
    resultsTitle: 'LEVEL COMPLETED!',
    star1: '★ 1: Level Completed',
    star2: '★ 2: Flawless (No Deaths)',
    star3: '★ 3: Target Time Beaten',
    execTime: 'Execution Time:',
    targetTime: 'Target Time (3rd Star):',
    deaths: 'Failures / Deaths:',
    btnNextLevel: 'NEXT LEVEL (ENTER) ►',
    btnFinalVictory: 'FINAL RESTORE (ENTER) ★',
    btnRetry: 'RETRY ↺',

    // Modals - Victory (Final Credits)
    victoryTitle: 'SYSTEM RESTORED!',
    victorySubtitle: 'THE GLITCH VIRUS WAS SUCCESSFULLY PURGED!',
    victoryLore: 'The server Kernel compiled with 0 errors. The codebase is clean and the web platform is running at 100% capacity!',
    victoryCreditsTitle: '★ FINAL CREDITS ★',
    victoryCreditsTeam: 'GAME CREATED BY: NET YAHOO',
    victoryStatement: 'Desenvolvido pela equipa Net Yahoo, constituída pelo Francisco Mesquita e Gonçalo Abreu.',
    victoryAuthors: 'Francisco Mesquita & Gonçalo Abreu',
    btnPlayAgain: 'PLAY AGAIN ↺',

    welcomeTdwTitle: 'Welcome to TDW',
    welcomeTdwSubtitle: 'CONGRATULATIONS, DEVELOPER! YOU CONQUERED THE FULL WEB STACK!',
    welcomeTdwLore: 'You mastered every tier of the Kernel: HTML (Structure), CSS (Style), JavaScript (Execution), Testing & QA (Resilience), and Artificial Intelligence (Innovation). The web system is fully online and bug-free!',
    btnWelcomeCredits: 'VIEW FINAL CREDITS (ENTER) ►',
    skinUnlockedTitle: '★ NEW SKIN UNLOCKED! ★',
    skinUnlockedSubtitle: 'You purified the Kernel and unlocked the Coordinator Developer!',
    skinCoordinatorName: 'Lead Coordinator Developer',
    btnEquipNow: 'EQUIP NOW',
    btnEquipped: '✓ EQUIPPED!',
    skinLockedDesc: '🔒 Locked: Beat the game (Level 16) to unlock!',

    // Roll Down Final Credits (Level 16 Post-Door)
    rollCreditsTitle: 'WELCOME TO TDW!',
    rollCreditsBody: 'This game was developed by Net Yahoo, a team formed by Francisco Mesquita and Gonçalo Abreu to compete in the 1st edition of the TDW Jam - WEB GAME CHALLENGE 24H.',
    rollCreditsHope: 'We hope you enjoyed it!',
    btnRollMenu: 'Main menu',

    // In-Game Toasts
    fragCollected: 'HTML fragment collected!',
    bridgeBuilt: '<div/> structural bridge constructed!',
    needFrags: 'Insufficient fragments! Requires {0} <>.',
    cssToggled: 'CSS: Rules altered! display: block / none',
    syntaxError: 'SyntaxError! Incorrect sequence. Resetting.',
    jsSuccess: 'JS Script executed successfully! Exit unlocked.',
    kernelPanic: 'Kernel Panic! Restoring spawn point.',
    bossDefeated: 'GLITCH VIRUS DESTROYED! The ground portal opened!',
    bugPatched: 'npm test --fix: 100% PASS! Bug patched and portal unlocked.',
    aiTokenCollected: 'Neural training token collected!',
    aiInferred: 'Inference complete! Copilot materialized the neural bridge!',
    needAiTokens: 'Insufficient data! The model requires 3 training tokens.',
    aiDispatchPrompt: '[F / CLICK] LAUNCH AI COPILOT',
    aiDispatched: 'AI Copilot flying to fetch [{0}]!',
    aiAllGathered: 'All tokens gathered! Activate AI Terminal [E].',
    hammerBuilt: 'HTML: <div id="hammer"/> structured! Enable CSS at the ground terminal!',
    hammerCssEnabled: 'CSS: display: block! Hammer energized! Trigger the JS animation!',
    hammerJsSmash: 'JS: hammer.animate({ swing: true })! VIRUS SMASHED!',
    needHammerBuild: 'Build the hammer with HTML fragments first!',
    needHammerCss: 'Hammer is still disabled! Enable CSS on the ground first!',

    // Terminal Dialogs
    termTitleInit: 'BOOT TERMINAL',
    termMsg1: 'SYSTEM ALERT:\nThe web server was corrupted by an unknown glitch virus!\nControls: Use [A/D] to run and [Space/W] to jump.\nHead right to the ground exit portal.',
    
    termTitleHtml: 'HTML MODULE OFFLINE',
    termMsg2: 'Structural page elements missing!\nJump across steps to collect 2 code fragments <> and press [E] at the blueprint to build the <div> bridge.',

    termTitleCss: 'CSS STYLESHEET CONSOLE',
    termMsg3: 'Display rules corrupted!\nUse terminal [E] to toggle between:\n• display: block (SOLID)\n• display: none (GHOST)\nDisable the barrier to reach the exit portal on the ground!',

    termTitleJs: 'JAVASCRIPT DEBUGGER',
    termMsg4: 'The ground exit portal is locked in an infinite async loop!\nPromise execution order:\n1st [2] (init)\n2nd [1] (fetchData)\n3rd [3] (renderUI)\nPress buttons in order: 2 → 1 → 3 to unlock the portal!',

    termTitleTest: 'TEST RUNNER & PROFILER SUITE',
    termMsg5: 'CRITICAL BUG DETECTED!\nA zombie process is firing UnhandledRuntimeError projectiles in a continuous loop.\nTime your jumps to dodge error orbs and reach the QA terminal to run "npm test --fix" to patch the bug!',

    termTitleAi: 'NEURAL CORE & AI COPILOT',
    termMsg6: 'TOKENS AT HIGH ALTITUDE!\nThe [PROMPT], [WEIGHTS], and [ATTENTION] tokens are placed too high to jump.\n1. Press [F] or CLICK the screen to launch your AI Copilot to fetch them from above!\n2. Bring all 3 tokens to the inference console to project the neural bridge!',

    termTitleMerge: 'CODE CONFLICT (GIT MERGE)',
    termMsg7: 'Production branch conflicts with local changes!\n1. Jump across steps to collect HTML fragments.\n2. Build the bridge and use the CSS terminal to disable the laser.\n3. The exit door awaits on the ground!',

    termTitleBoss: 'CORRUPTED VIRUS CORE',
    termMsg8: 'The Kernel is under attack by the GLITCH CORE!\nTotal System Restoration Mission:\n1. Collect 3 HTML fragments to build the center bridge.\n2. Toggle CSS to solidify the switch access steps.\n3. Trigger button sequence [3 → 2 → 1] to terminate the virus!\nThe ground exit will open!'
  }
};

class LocalizationManager {
  constructor() {
    this.currentLang = Storage.load().lang || 'en';
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (lang !== 'pt' && lang !== 'en') lang = 'pt';
    this.currentLang = lang;
    Storage.setLang(lang);
    return this.currentLang;
  }

  t(key, ...args) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.pt;
    let str = dict[key] || TRANSLATIONS.pt[key] || key;
    args.forEach((val, i) => {
      str = str.replace(new RegExp(`\\{${i}\\}`, 'g'), val);
    });
    return str;
  }
}

export const i18n = new LocalizationManager();
