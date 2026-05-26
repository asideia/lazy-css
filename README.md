<div align="center">
  <img src="https://github.com/asideia/lazy-css/blob/main/assets/images/logo-with-name-and-slogan.png" alt="Lazy CSS Logo" width="40%">
</div>

### *O framework de UI para desenvolvedores Backend que sofrem de prevenção severa a CSS e preferem terceirizar 100% da responsabilidade do frontend para uma LLM.*

**Lazy CSS** é um framework estrutural, intencionalmente rígido e agnóstico, projetado sob medida para qualquer pessoa que consideram alinhar elementos na tela um mistério da humanidade. Em vez de forçar você a decorar centenas de classes utilitárias ou passar horas brigando com media-queries no mobile, o Lazy CSS fornece blocos de concreto macro-estruturais (`.lazy-stack`, `.lazy-grid-auto`, `.lazy-layout-dashboard`) **nativamente otimizados para Inteligências Artificiais (LLMs)** lerem e computarem sem sofrer alucinações.

Com o Lazy CSS, o seu fluxo de trabalho muda radicalmente: a especificação viva do framework é injetada no contexto do Claude, ChatGPT ou Gemini junto com o seu HTML bruto do backend, e a IA entrega uma interface limpa, corporativa e com **responsividade nativa inegociável**.

---

## 🎯 A Filosofia (Ou nossas desculpas oficiais)

1. **Backend-First por Natureza:** Sem microgerenciamento de sombras, paddings milimétricos ou tons pastéis. Os componentes vêm com uma estética sóbria e administrativa direto da caixa. Se o cliente quiser firulas visuais exageradas, ele que contrate um designer.
2. **Arquitetura IA-Native (Context-Optimized):** Classes previsíveis com mapeamento funcional estrito. Separamos a especificação abstrata do exemplo visual dentro do nosso arquivo manifesto para economizar tokens e garantir atenção máxima da LLM no seu layout.
3. **Responsividade Intrínseca e Inegociável:** É terminantemente proibido entupir o HTML com breakpoints declarativos (ex: `md:flex-row`). O Lazy CSS usa propriedades fluidas e matemática nativa (`clamp()`, CSS Grid com auto-fit) para garantir que a interface fique indestrutível tanto em uma tela de 375px (Mobile) quanto em 1920px (Desktop).
4. **Engenharia Dinâmica de Cores:** Construído com tokens HSL puros (`--lazy-primary-raw`). Alterar a identidade visual do sistema inteiro é uma questão de mudar um único número matemático no algoritmo de cores.

---

## 📂 Arquitetura do Projeto (Repository Structure)

Todo o ecossistema de código, scripts internos, mapeamento de dados e seletores CSS utilizam estritamente o padrão de idioma inglês (`en-US`), mantendo a internacionalização e a alta performance de leitura das LLMs.

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
│   └── release-guide.md     # Guidelines on pushing releases without breaking CI/CD
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

## 🛠️ Desenvolvimento Local e Monitoramento

Se você deseja estender o framework, alterar o comportamento das macros ou modificar as fórmulas de tokens locais:

### 1. Instale as dependências de engenharia

```bash
npm install

```

### 2. Ative o modo de compilação contínua (Watch Mode)

O compilador monitorará a pasta `src/` e reconstruirá o arquivo final de distribuição em background em tempo real:

```bash
npm run watch

```

> 📖 **Nota de Uso:** Para instruções completas de como importar a biblioteca via CDN, injetar o ecossistema de dados em modelos de linguagem comerciais e copiar os prompts estruturados de guarnição, consulte o arquivo local `quickstart.html`.

---

## 🚀 Pipeline de CI/CD (Deploy Automatizado)

O projeto conta com automação via **GitHub Actions** (`.github/workflows/release.yml`). Você não precisa gerar e compilar arquivos de produção localmente na sua máquina.

1. Altere o número da versão no arquivo `package.json` (ex: de `1.0.3` para `1.0.4`).
2. Realize o commit padrão das suas alterações de código.
3. Crie e empurre uma tag Git começando obrigatoriamente com a letra `v`:

```bash
git tag -a v1.0.4 -m "Release v1.0.4 - Implementing robust responsive data tables"
git push origin v1.0.4

```

Os servidores do GitHub vão interceptar a tag, rodar a esteira do PostCSS, processar e minificar o código, criar uma **GitHub Release** com os arquivos de produção anexados e publicar o pacote automaticamente no **NPM Registry**.

---

## 🤝 Governança e Contribuição

* **Macros e Layouts:** Regras de alinhamento global de telas, grids adaptáveis e viewports fixas devem morar em `src/layouts/`.
* **Átomos Visuais:** Componentes isolados e independentes (botões, campos, badges) devem morar em `src/components/` e usar obrigatoriamente o prefixo `.lazy-*`.
* **Evolução da Única Fonte de Verdade:** Adicionou ou alterou um seletor? É obrigatório atualizar o nó `blueprint_specs` e o nó `sandbox_elements` dentro de `assets/data/lazycss.spec.json`. O ecossistema de renderização do showcase e o gerador dinâmico de Markdown dependem exclusivamente desse arquivo.

---

Lazy CSS © 2026 — Desenvolvido por e para engenheiros de software que preferem passar 4 horas otimizando uma query SQL complexa a gastar 5 minutos centralizando um elemento na tela.
