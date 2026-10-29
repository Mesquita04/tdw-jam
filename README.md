# TDW: ALT-F4

> **"uma experiência TDW"**

Um jogo retro 2D de plataformas e puzzles ambientado dentro de um sistema operativo corrompido, desenvolvido para a **24-Hour Game Jam** com foco no tema de **Desenvolvimento Web (HTML, CSS e JavaScript)**.

---

## 🎮 Conceito do Jogo

O jogador encarna um desenvolvedor preso no seu próprio servidor web após uma infeção massiva por um *glitch virus*. O Kernel está instável, os ficheiros de sistema foram fragmentados e a infraestrutura quebrou-se em 6 salas corrompidas.

Para escapar e restabelecer o Kernel, o jogador terá de utilizar as três linguagens fundamentais da Web como habilidades mecânicas:

1. **HTML (Build):** Recolha de fragmentos de código `<>` para erguer plataformas estruturais `<div class="bridge">` sobre fossos perigosos.
2. **CSS (Style):** Terminais de estilização para alternar estados `display: block` (Sólido) vs `display: none` (Fantasma), permitindo ultrapassar barreiras e desativar feixes laser.
3. **JavaScript (Execute):** Resolução de sequências assíncronas de botões (`init` → `fetch` → `render`) para desbloquear portais de saída e desativar o núcleo do vírus na batalha final.

---

## 🕹️ Controlos

- **A / D** ou **◄ / ►**: Mover o personagem para a esquerda / direita.
- **Espaço / W / ▲**: Saltar (altura variável consoante o tempo premido, com suporte a *coyote time* e *jump buffering*).
- **E**: Interagir com terminais de história, consolas CSS, pontos de construção e botões JS.
- **1, 2, 3**: Inspecionar habilidades web desbloqueadas.
- **R**: Reinício rápido do nível em caso de erro ou bloqueio.
- **ESC**: Menu de Pausa.

---

## 🗺️ Níveis do Sistema

1. **Nível 1 — LOCALHOST:** Ambiente de testes inicial. Aprendizagem de movimentação, saltos e interação com terminais.
2. **Nível 2 — ELEMENTOS PERDIDOS (HTML):** Recolha de fragmentos HTML e construção da primeira ponte estrutural `<div>`.
3. **Nível 3 — ESTILOS CORROMPIDOS (CSS):** Manipulação de propriedades de estilo para alternar plataformas e barreiras entre sólido e fantasma.
4. **Nível 4 — LOOP INFINITO (JavaScript):** Sequência lógica assíncrona com 3 interruptores interativos.
5. **Nível 5 — CONFLITO DE FUSÃO:** Combinação de construção HTML, alternância de estilos CSS e evasão de lasers letais.
6. **Nível 6 — EXCEÇÃO NÃO TRATADA (Boss Final):** Desafio final que conjuga as três tecnologias para sobrecarregar e eliminar o *GLITCH CORE*, alcançando a vitória!

---

## 🛠️ Tecnologias Utilizadas

- **Phaser 3.88+**: Motor de jogo 2D com física Arcade (colisão precisa e saltos dinâmicos).
- **Vite**: Ferramenta de build moderna e ultrarrápida.
- **Web Audio API**: Sintetizador sonoro chiptune procedural em tempo real (sem dependência de ficheiros externos de áudio).
- **HTML5 Canvas Procedural**: Texturas em pixel art retro geradas programaticamente no arranque para máxima fiabilidade e tempos de carregamento instantâneos.
- **HTML5 & CSS3**: HUD moderno estilo cyberpunk com scanlines CRT, modais translúcidos e responsividade total.
- **LocalStorage**: Gravação automática de estrelas ganhas (até 3 por nível), melhores tempos e progresso desbloqueado.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (versão 9 ou superior)

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```
O jogo ficará acessível no seu navegador no endereço: `http://localhost:3000` (ou porta indicada no terminal).

### 3. Compilar para Produção (Build)
```bash
npm run build
```
Os ficheiros estáticos prontos para publicação serão gerados na pasta `dist/`.

### 4. Testar a Build Localmente
```bash
npm run preview
```

---

## 🌐 Como Publicar (Deploy Estático)

O projeto está configurado com caminhos relativos (`base: './'`), permitindo publicação estática imediata em qualquer serviço:

### Netlify
1. Conectar o repositório ao Netlify.
2. Definir o comando de build: `npm run build`.
3. Definir o diretório de publicação: `dist`.

### GitHub Pages
1. Executar `npm run build`.
2. Publicar os conteúdos da pasta `dist/` no branch `gh-pages` ou configurar o GitHub Actions com o template de Vite.

---

---

## 🏆 Sistema de Pontuação (Estrelas)
Cada nível atribui até 3 estrelas:
- ★ **Estrela 1**: Completar o nível.
- ★ **Estrela 2**: Terminar sem sofrer nenhuma morte.
- ★ **Estrela 3**: Superar o tempo de speedrun estabelecido para o nível.

---

## 👥 Créditos do Projeto (Net Yahoo)

**Desenvolvido pela equipa Net Yahoo, constituída pelo Francisco Mesquita e Gonçalo Abreu.**

- **Equipa:** Net Yahoo
- **Autores:** 
  - Francisco Mesquita
  - Gonçalo Abreu
- **Evento:** TDW 24-Hour Game Jam
- **Idiomas:** Português (pt-PT) e Inglês (en-US)
- **Funcionalidades:**
  - Ecrã inicial retro arcade: *"Press Any Button to Start"*
  - Menu de seleção de idioma entre Português e Inglês
  - Ecrã de vitória com Créditos Finais dedicados
  - Portas de saída no chão e salto de alta potência (~195px)
  - Áudio procedural em Web Audio API e pixel art procedural em Canvas

