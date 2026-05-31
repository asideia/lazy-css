# 📂 Documento de Arquitetura: Estrutura do Projeto (Repository Architecture)

Este documento mapeia a anatomia do repositório do **Lazy CSS**, detalhando a governança de arquivos, a separação estrita de responsabilidades, as convenções de idioma, o desacoplamento de páginas e a esteira de build do ecossistema.

---

## 1. Visão Geral da Árvore de Diretórios (Directory Tree)

O projeto adota uma abordagem modular de desenvolvimento com distribuição monolítica de alta performance. O código-fonte é altamente fragmentado em arquivos específicos para garantir manutenibilidade técnica, enquanto o pipeline de compilação unifica e otimiza o ecossistema em um único artefato pronto para produção servido globalmente via CDN.

```text
lazy-css/
├── .github/workflows/
│   └── release.yml          # Pipeline de CI/CD para compilação e deploys automatizados na Tag
├── .vscode/                 # Preferências compartilhadas do editor para guiar o Code Style
├── assets/                  # Inteligência de ecossistema e motores de automação
│   ├── data/
│   │   └── lazycss.spec.json # A Única Fonte de Verdade (Contrato de IA e Metadados)
│   ├── images/
│   │   └── logo.png         # Identidade visual e assets gráficos
│   └── scripts/
│       ├── buildLazyCSSBlueprint.js # Compilador Node do blueprint Markdown para LLMs
│       ├── renderShowcaseElements.js # Motor JS para renderização dinâmica da documentação
│       └── playground.js    # Motor JS de renderização de código em tempo real (Sandbox)
├── dist/                    # Distribuição de produção compilada e minificada (Pronta para CDN)
│   ├── lazycss.css          # Artefato compilado para ambiente de desenvolvimento
│   ├── lazycss.min.css      # Artefato minificado e otimizado (O único que o HTML precisa)
│   └── lazycss-blueprint.md # O manifesto consolidado de contexto estrito consumido por IAs
├── docs/                    # Manuais de governança interna, especificações e histórico técnico
│   ├── adr/                 # Architecture Decision Records (Registros de Decisão de Arquitetura)
│   │   ├── 0000-entendendo-as-adrs.md      # Manifesto de governança da pasta
│   │   ├── 0001-arquitetura-de-tokens.md   # Justificativa do modelo matemático HSL Raw
│   │   └── 0002-estrategia-dependencias.md # Justificativa do package.json (Zero Prod Dependency)
│   ├── 1.quickstart.md      # Guia rápido operacional para Humanos e Agentes
│   ├── 2.repository-architecture.md # Este arquivo de governança do sistema de arquivos
│   ├── 3.prompt-formatting-css-protocol.md # Protocolo JSDoc/[SANDBOX_ELEMENT] para componentes
│   ├── 4.blueprint-spec.md  # Detalhamento técnico do papel do spec nas LLMs
│   └── 5.release-guide.md   # Protocolo de Code Freeze e publicação de tags
├── src/                     # Código-fonte CSS modular (Módulos Core)
│   ├── tokens/
│   │   └── variables.css    # Tokens de design e equações de espaçamento fluido
│   ├── base/
│   │   └── reset.css        # Regras semânticas preemptivas de reset de navegadores
│   ├── layouts/
│   │   ├── structure.css    # Microlayouts Flexbox atômicos (Stack, Row e gaps elásticos)
│   │   └── page-grid.css    # Macroestrutura CSS Grid para viewports corporativas
│   ├── components/
│   │   ├── components.css   # Átomos visuais (Botões, cards, fields, badges, status)
│   │   └── tables.css       # Tabelas densas de alta performance e wrappers de contenção
│   └── lazy.css             # Arquivo mestre unificador que orquestra a injeção via PostCSS
├── index.html               # Landing Page institucional e vitrine do framework
├── showcase.html            # Documentação viva de componentes (Consome lazycss.spec.json)
├── playground.html          # Laboratório tátil interativo (Sandbox de validação de CSS)
├── package.json             # Scripts de build, automações Node e metadados npm
└── postcss.config.js        # Configuração de plugins da esteira de otimização (Autoprefixer)

```

---

## 2. O Fluxo de Dados e Compilação (Build & Data Flow)

Para manter o ecossistema sustentável, desenvolvedores humanos (ou agentes de código) editam **exclusivamente** os arquivos modulares contidos dentro do diretório `src/` e os metadados em `assets/data/`. O navegador e os projetos satélites de teste consomem **exclusivamente** o resultado gerado dentro do diretório de distribuição `dist/`.

O arquivo central `src/lazy.css` atua como o funil de orquestração do projeto, utilizando as diretivas `@import` para determinar a ordem física exata de precedência do CSS:

```css
/* src/lazy.css */
@import "./tokens/variables.css";     /* 1. Escopo Global de Dados (Variáveis) */
@import "./base/reset.css";            /* 2. Reset Preemptivo (Zera anomalias de tags puras) */
@import "./layouts/structure.css";     /* 3. Microlayouts Atômicos (Flexbox Elástico) */
@import "./layouts/page-grid.css";     /* 4. Macroestrutura de Telas (CSS Grid Global) */
@import "./components/components.css"; /* 5. Componentes Atômicos Gerais */
@import "./components/tables.css";     /* 6. Tabelas de Alta Densidade e Isolamento */

```

---

## 3. Diretrizes de Pastas e Responsabilidades

### 3.1. Diretório `/dist` (Distribution)

Contém os produtos finais compilados, prefixados contra incompatibilidades de motores de navegadores antigos e prontos para produção.

* **`lazycss.min.css` e `lazycss-blueprint.md`:** Arquivos gerados de forma 100% automatizada através do pipeline do PostCSS e scripts do Node. Eles **nunca** devem ser editados manualmente sob nenhuma hipótese. Qualquer alteração direta neles será inteiramente sobrescrevida no próximo ciclo de build.

### 3.2. Diretório `/assets` (Ecosystem Intelligence)

Armazena os motores lógicos que transformam o Lazy CSS em um framework nativo otimizado para Inteligência Artificial (Context-Optimized).

* **`/data/lazycss.spec.json`:** A **Única Fonte de Verdade** do projeto. Estruturado em inglês (`en-US`), separa metadados puramente técnicos para treinamento de LLMs (`blueprint_specs`) de exemplos brutos em HTML para injeção em janelas de contexto (`sandbox_elements`).

### 3.3. Diretório `/src/tokens`

Camada declarativa de dados de design brutos.

* **Responsabilidade:** Armazenar os limites matemáticos da biblioteca (paleta cromática, escala de espaçamento fluido, curvas de borda).
* **Regra Arquitetural:** É terminantemente proibido conter classes CSS nesta pasta (seletores baseados em ponto `.`). Ela aceita apenas propriedades customizadas dentro do bloco `:root`. As cores devem ser declaradas em formato HSL fragmentado (ex: `--lazy-primary-raw: 210 100% 50%;`) para viabilizar modificações dinâmicas de opacidade em tempo de execução via CSS composto.

### 3.4. Diretório `/src/base`

Camada de consistência estrutural básica.

* **Responsabilidade:** Neutralizar comportamentos imprevisíveis herdados dos navegadores e unificar o comportamento do box-model global para `box-sizing: border-box`.
* **Regra Arquitetural:** Alvos exclusivos em tags HTML puras. Nenhuma classe utilitária ou customizada deve ser injetada nesta camada.

### 3.5. Diretório `/src/layouts`

Camada de posicionamento e responsividade passiva espacial. Dividida em duas frentes complementares e rígidas para eliminar a necessidade de *media-queries* poluindo os prompts das LLMs:

* **`structure.css` (Microlayouts Atômicos):** Focado no comportamento de fluxo interno de pequenos blocos (empilhar elementos verticalmente via `.lazy-stack` ou alinhar lateralmente com quebra dinâmica mobile via `.lazy-row`). Baseado estritamente em **CSS Flexbox** com suporte a gaps bidimensionais calculados.
* **`page-grid.css` (Macroestruturas Globais):** Focado no esqueleto de viewport fixa para sistemas e dashboards corporativos (`.lazy-layout-dashboard`) e grades inteligentes autogerenciáveis (`.lazy-grid-auto`). Baseado estritamente em **CSS Grid**.

### 3.6. Diretório `/src/components`

Camada de elementos de interface e UI atômica.

* **Responsabilidade:** Isolar a semântica visual de componentes reutilizáveis (botões, campos de formulários, cards, badges e estados).
* **Regra Arquitetural:** Todos os seletores devem obrigatoriamente seguir o prefixo `.lazy-*`. Os componentes devem ser **completamente agnósticos de layout**, o que significa que é proibido declarar margens externas fixas (`margin: 20px`) ou larguras estáticas forçadas (`width: 400px`) dentro dos componentes, delegando o espaçamento e o posicionamento inteiramente para as classes contidas em `/layouts`.

---

## 4. O Ecossistema Desacoplado de Páginas (Multi-Page Architecture)

Em vez de centralizar toda a documentação e laboratório em um único arquivo monolítico complexo, o Lazy CSS divide as responsabilidades de uso em arquivos HTML independentes localizados na raiz do repositório:

1. **`index.html` (Landing Page):** A vitrine do projeto. Apresenta o manifesto, as vantagens competitivas do framework, a filosofia do programador agnóstico e guias visuais simplificados.
2. **`showcase.html` (Documentation):** A documentação técnica viva. Consome o arquivo `/assets/data/lazycss.spec.json` via JavaScript vanilla para renderizar as tabelas de componentes de forma visual para desenvolvedores humanos.
3. **`playground.html` (Interactive Sandbox):** Laboratório tátil em tempo real. Permite colar fragmentos HTML puros gerados por inteligências artificiais para validar instantaneamente os limites de elasticidade dos fluxos do `structure.css`, testes de quebras de tabelas densas e responsividade mobile via DevTools.