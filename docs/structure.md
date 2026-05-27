# 📂 Documento de Arquitetura: Estrutura do Projeto (Architecture & Project Structure)

Este documento mapeia a anatomia do repositório do **Lazy CSS**, detalhando a governança de arquivos, a separação estrita de responsabilidades, as convenções de idioma e o fluxo de compilação dos módulos visuais.

---

## 1. Visão Geral da Árvore de Diretórios (Directory Tree)

O projeto adota uma abordagem modular de desenvolvimento com distribuição monolítica de alta performance. O código-fonte é altamente fragmentado em arquivos específicos para garantir manutenibilidade técnica, enquanto o pipeline de compilação unifica e otimiza o ecossistema em um único artefato pronto para produção.

```text
lazy-css/
├── .github/workflows/
│   └── release.yml          # CI/CD pipeline for automated builds and deployment
├── .vscode/                 # Stored preferences to enforce code style formatting
├── assets/                  # Ecosystem support resources and intelligence
│   ├── data/
│   │   └── lazycss.spec.json # The Single Source of Truth (AI Contract & Showcase data)
│   ├── images/
│   │   └── logo.png         # Brand identity and graphic assets
│   └── scripts/
│       └── playground.js    # Native JS engines (dynamic rendering, MD blueprint generator)
├── dist/                    # Compiled and minified production-ready CSS distribution
│   ├── lazycss.css          # Development style builds
│   └── lazycss.min.css      # Production style builds (The only file your HTML needs)
├── docs/                    # Internal governance and pipeline manuals
│   ├── release-guide.md     # Guidelines on pushing releases without breaking CI/CD
│   └── structure.md         # This architecture and file-system governance file
├── src/                     # Core CSS modular codebase
│   ├── tokens/
│   │   └── variables.css    # Design tokens and fluid mathematical spacing formulas
│   ├── base/
│   │   └── reset.css        # Semantic browser reset rules for cross-platform harmony
│   ├── layouts/
│   │   ├── structure.css    # Row and Stack layout adjusters (Survival flexbox)
│   │   └── page-grid.css    # Full screen layout viewports with isolated scrolling
│   ├── components/
│   │   └── components.css   # Clean administrative UI atoms (buttons, fields, cards, tables)
│   └── lazy.css             # Root master file unifying the codebase via PostCSS
├── index.html               # Main project presentation and Landing Page
├── quickstart.html          # Official step-by-step setup guide and LLM prompting manuals
├── showcase.html            # Living component docs (Parses lazycss.spec.json & outputs the AI .md)
├── playground.html          # Interactive Sandbox (Real-time token and layout lab)
├── package.json             # Build scripts, version tags, and package definitions
└── postcss.config.js        # Compilation pipeline recipe for code optimization

```

---

## 2. O Fluxo de Dados e Compilação (Build & Data Flow)

Para manter o ecossistema sustentável, o desenvolvedor (ou a IA) altera exclusivamente os arquivos modulares contidos dentro do diretório `src/`. O navegador e as páginas de teste consomem exclusivamente o resultado gerado dentro do diretório de distribuição `dist/`.

O arquivo central `src/lazy.css` atua como o funil de orquestração do projeto, utilizando as diretivas `@import` para determinar a ordem física de precedência do CSS:

```css
/* src/lazy.css */
@import "./tokens/variables.css";     /* 1. Carrega as variáveis (Escopo Global) */
@import "./base/reset.css";            /* 2. Aplica o reset (Sobrescreve os navegadores) */
@import "./layouts/structure.css";    /* 3. Injeta utilitários de alinhamento atômico */
@import "./layouts/page-grid.css";     /* 4. Injeta macroestruturas de páginas */
@import "./components/components.css";    /* 5. Carrega a estilização dos elementos atômicos */

```

---

## 3. Diretamento de Pastas e Responsabilidades

### 3.1. Diretório `/dist` (Distribution)

Contém os produtos finais compilados, prefixados contra incompatibilidades de navegadores antigos e prontos para produção.

* **`lazycss.min.css`:** Arquivo gerado de forma 100% automatizada através do PostCSS. Ele **nunca** deve ser editado manualmente sob nenhuma hipótese. Qualquer alteração direta nele será apagada no próximo ciclo de build.

### 3.2. Diretório `/assets` (Ecosystem Intelligence)

Armazena os motores lógicos que transformam o Lazy CSS em um framework nativo para Inteligência Artificial.

* **`/data/lazycss.spec.json`:** A **Única Fonte de Verdade** do projeto. Estruturado em inglês (`en-US`), separa metadados puramente técnicos para treinamento de LLMs (`blueprint_specs`) de exemplos brutos para visualização humana (`sandbox_elements`).
* **`/scripts/renderShowcaseElements.js`:** Motor JavaScript nativo que lê o arquivo `.spec.json` e renderiza dinamicamente a interface do laboratório.
* **`/scripts/buildLazyCSSBlueprint.js`:** Motor JavaScript nativo que lê o arquivo `.spec.json` e converte o JSON em formato Markdown sob demanda.
* **`/scripts/playground.js`:** Motor JavaScript nativo que lê o código no elemento com o id `lazy-code-input` e renderiza no elemento com o id `lazy-preview-frame`.

### 3.3. Diretório `/src/tokens`

Camada declarativa de dados de design brutos.

* **Responsabilidade:** Armazenar os limites matemáticos da biblioteca (paleta de cores, escala de espaçamento fluido, curvas de borda).
* **Regra Arquitetural:** É proibido conter classes CSS (seletores com ponto `.`), aceitando apenas propriedades customizadas `:root`. As cores devem ser declaradas em formato HSL fragmentado (ex: `--lazy-primary-raw: 210 100% 50%;`) para permitir modificações dinâmicas de opacidade em tempo de execução pelos componentes.

### 3.4. Diretório `/src/base`

Camada de consistência estrutural.

* **Responsabilidade:** Neutralizar comportamentos imprevisíveis herdados dos navegadores e unificar o comportamento de box-model (`box-sizing: border-box`).
* **Regra Arquitetural:** Alvos exclusivos em tags HTML puras. Nenhuma classe customizada deve ser injetada nesta camada.

### 3.5. Diretório `/src/layouts`

Camada de posicionamento e responsividade nativa espacial. Dividida em duas frentes com regras matemáticas rígidas para evitar a necessidade de media-queries nos prompts das LLMs:

* **`structure.css` (Microlayouts):** Focado no comportamento de fluxo interno de pequenos blocos (empilhar elementos via `.lazy-stack` ou alinhar lateralmente com quebra dinâmica mobile via `.lazy-row`). Baseado estritamente em Flexbox.
* **`page-grid.css` (Macroestruturas):** Focado no esqueleto de viewport fixa para sistemas corporativos (`.lazy-layout-dashboard`) e grades inteligentes autogerenciáveis (`.lazy-grid-auto`). Baseado estritamente em CSS Grid.

### 3.6. Diretório `/src/components`

Camada de elementos de interface interativos.

* **Responsabilidade:** Isolar a semântica visual de componentes atômicos reutilizáveis.
* **Regra Arquitetural:** Seguir rigidamente o prefixo `.lazy-*`. Todos os componentes devem ser **agnósticos de layout** (não devem possuir margens externas fixas ou larguras estáticas forçadas), delegando o espaçamento e o posicionamento inteiramente para as classes contidas em `/layouts`.

---

## 4. O Ecossistema Desacoplado de Páginas (Multi-Page Architecture)

Em vez de centralizar toda a documentação em um arquivo monolítico, o Lazy CSS divide as responsabilidades de uso em quatro arquivos HTML na raiz:

1. **`index.html` (Landing Page):** A vitrine comercial do framework. Apresenta o manifesto, a filosofia do projeto e as chamadas para ação.
2. **`quickstart.html` (Guide):** Manual linear focado na velocidade do desenvolvedor backend. Explica a importação do CDN e ensina a orquestrar LLMs utilizando o prompt de guarnição estático e disponibiliza o download imediato do arquivo `lazycss-blueprint.md` gerado em tempo de execução para alimentar as IAs.
3. **`showcase.html` (Documentation):** Consome dinamicamente o arquivo `/assets/data/lazycss.spec.json` via JavaScript nativo para exibir os componentes.
4. **`playground.html` (Sandbox):** Laboratório tátil em tempo real para simular layouts interativos, responsividade mobile e alteração de propriedades e tokens.
