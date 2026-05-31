<div align="center">
  <img src="https://github.com/asideia/lazy-css/blob/main/assets/images/logo-without-removebg.png" alt="Lazy CSS Logo" width="30%">
</div>

### *O framework de UI para desenvolvedores Backend que sofrem de aversão severa a CSS e preferem terceirizar 100% da responsabilidade do frontend para uma LLM.*

**Lazy CSS** é um framework estrutural, intencionalmente rígido e agnóstico, projetado sob medida para qualquer engenheiro que considera alinhar elementos na tela um mistério da humanidade. Em vez de forçar você a decorar centenas de classes utilitárias ou passar horas brigando com *media-queries* no mobile, o Lazy CSS fornece blocos de concreto macro-estruturais (`.lazy-stack`, `.lazy-grid-auto`, `.lazy-layout-dashboard`) **nativamente otimizados para Inteligências Artificiais (LLMs)** lerem e computarem sem sofrer alucinações.

Com o Lazy CSS, o seu fluxo de trabalho muda radicalmente: o contrato abstrato do framework (`lazycss-blueprint.md`) é injetado na janela de contexto do Claude, ChatGPT ou Gemini junto com o seu HTML bruto do backend, e a IA entrega uma interface corporativa de alta densidade com **responsividade elástica e intrínseca inegociável**.

---

## 🎯 A Filosofia (Ou nossas desculpas oficiais)

1. **Backend-First por Natureza:** Sem microgerenciamento de sombras, paddings milimétricos ou tons pastéis. Os componentes vêm com uma estética sóbria, densa e administrativa direto de fábrica. Se o cliente final exigir firulas visuais exageradas, ele que contrate um designer.
2. **Arquitetura IA-Native (Context-Optimized):** Classes previsíveis com isolamento funcional estrito. Separamos o manifesto técnico abstrato dos exemplos visuais estruturados para economizar tokens preciosos de atenção e garantir precisão máxima da LLM no seu layout.
3. **Responsividade Intrínseca (Zero Media-Queries):** É terminantemente proibido entupir o HTML de negócio com breakpoints declarativos (ex: `md:flex-row sm:col-span-12`). O Lazy CSS usa propriedades elásticas e matemática nativa (`clamp()`, CSS Grid com `auto-fit` e Flexbox elástico) para garantir que a interface fique indestrutível tanto em uma tela de 375px (Mobile) quanto em 1440px+ (Widescreen).
4. **Engenharia Dinâmica de Cores:** Construído com tokens HSL fragmentados (`--lazy-primary-raw`). Alterar a identidade visual do sistema inteiro é uma questão de mudar um único conjunto numérico matemático no algoritmo de cores, sem inflar o código com variáveis estáticas de estado (`:hover` e `:active` usam filtros nativos).

---

## 🚀 Quickstart (Uso Rápido)

O Lazy CSS foi desenhado para ser totalmente agnóstico de ecossistema. Você pode usá-lo em arquivos HTML puros ou dentro de componentes React, Vue, Svelte ou engines de templates de backend (Thymeleaf, Blade, Django, EJS, JSF) sem precisar configurar ambientes Node.js complexos no projeto final.

### 1. Importação Direta via CDN Global
Basta incluir a tag abaixo dentro do `<head>` da sua aplicação para carregar globalmente a esteira de produção otimizada do framework:

```html
<link rel="stylesheet" href="[https://cdn.jsdelivr.net/gh/asideia/lazy-css@v1.0.0-beta.1/dist/lazycss.min.css](https://cdn.jsdelivr.net/gh/asideia/lazy-css@v1.0.0-beta.1/dist/lazycss.min.css)">

```

### 2. O Fluxo de Trabalho com Inteligência Artificial

Para deixar a IA estilizar sua tela com maestria usando o Lazy CSS, siga este fluxo operacional:

1. Forneça o arquivo de contexto unificado **`dist/lazycss-blueprint.md`** para a LLM de sua preferência (Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro).
2. Cole o seu HTML bruto de backend ou descreva as regras de negócio do formulário/tabela.
3. Peça para a IA estruturar o layout evocando os contratos do Lazy CSS.

Exemplo de estrutura elástica imediatamente interpretada e renderizada pelo framework:

```html
<main class="lazy-stack" style="padding: var(--lazy-space-md);">
    <div class="lazy-row" style="justify-content: space-between;">
        <h2 class="lazy-text-lead">Painel Administrativo de Auditoria</h2>
        <button type="button" class="lazy-btn lazy-btn-primary">⚡ Novo Registro</button>
    </div>
    
    <div class="lazy-grid-auto">
        <div class="lazy-card">
            <p class="lazy-text-main">Interface gerada com precisão por IA e renderizada de forma elástica pelo Lazy CSS.</p>
        </div>
    </div>
</main>

```

---

## 🛠️ Desenvolvimento Local e Customização

Se você deseja estender o framework, alterar o comportamento das macros ou modificar as fórmulas de tokens locais, certifique-se de executar o pipeline de compilação local:

### 1. Instalar as Dependências de Engenharia (PostCSS)

```bash
npm install

```

### 2. Compilar e Executar o Pipeline Local (Code Freeze)

Gera os artefatos de produção minificados em `/dist`, processa as variáveis e reconstrói o manifesto JSON e o blueprint de IA:

```bash
npm run build

```

### 3. Modo de Compilação Contínua (Watch Mode)

O compilador monitorará a pasta de desenvolvimento `src/` e reconstruirá os artefatos em background em tempo real:

```bash
npm run watch

```

---

## 📂 Organização do Repositório e Documentação Interna

A arquitetura do repositório é rigorosamente separada para manter a manutenibilidade viva do projeto:

* `/src`: Código-fonte modular dividido entre `/tokens` (variáveis matemáticas), `/layouts` (estruturas elásticas flex/grid) e `/components` (átomos visuais).
* `/dist`: Artefatos finais consolidados pelo pipeline (`lazycss.min.css` e `lazycss-blueprint.md`).
* `/docs`: Central de manuais operacionais, cobrindo engenharia de tokens, funcionamento dos scripts automatizados e o guia de releases.
* `/docs/adr`: Registro de Decisões de Arquitetura (**Architecture Decision Records**) que documentam historicamente o "porquê" de cada escolha técnica do core.

---

## 🤝 Contribuição e Governança

Quer propor uma nova classe, corrigir um comportamento visual no Safari ou otimizar o parser? O Lazy CSS adota regras rígidas de engenharia para que humanos e agentes autônomos de IA possam colaborar em harmonia. Leia obrigatoriamente as diretrizes antes de abrir uma Issue ou Pull Request:

* Verifique o nosso guia oficial em **[`CONTRIBUTING.md`](https://www.google.com/search?q=./CONTRIBUTING.md)**.

---

Lazy CSS © 2026 — Desenvolvido por e para engenheiros de software que preferem passar 4 horas otimizando uma query SQL complexa com múltiplos joins a gastar 5 minutos tentando centralizar uma div na tela.