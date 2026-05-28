<div align="center">
  <img src="https://github.com/asideia/lazy-css/blob/main/assets/images/logo-without-removebg.png" alt="Lazy CSS Logo" width="30%">
</div>

### *O framework de UI para desenvolvedores Backend que sofrem de prevenção severa a CSS e preferem terceirizar 100% da responsabilidade do frontend para uma LLM.*

**Lazy CSS** é um framework estrutural, intencionalmente rígido e agnóstico, projetado sob medida para qualquer pessoa que considera alinhar elementos na tela um mistério da humanidade. Em vez de forçar você a decorar centenas de classes utilitárias ou passar horas brigando com media-queries no mobile, o Lazy CSS fornece blocos de concreto macro-estruturais (`.lazy-stack`, `.lazy-grid-auto`, `.lazy-layout-dashboard`) **nativamente otimizados para Inteligências Artificiais (LLMs)** lerem e computarem sem sofrer alucinações.

Com o Lazy CSS, o seu fluxo de trabalho muda radicalmente: a especificação viva do framework é injetada no contexto do Claude, ChatGPT ou Gemini junto com o seu HTML bruto do backend, e a IA entrega uma interface limpa, corporativa e com **responsividade nativa inegociável**.

---

## 🎯 A Filosofia (Ou nossas desculpas oficiais)

1. **Backend-First por Natureza:** Sem microgerenciamento de sombras, paddings milimétricos ou tons pastéis. Os componentes vêm com uma estética sóbria e administrativa direto da caixa. Se o cliente quiser firulas visuais exageradas, ele que contrate um designer.
2. **Arquitetura IA-Native (Context-Optimized):** Classes previsíveis com mapeamento functional estrito. Separamos a especificação abstrata do exemplo visual dentro do nosso arquivo manifesto para economizar tokens e garantir atenção máxima da LLM no seu layout.
3. **Responsividade Intrínseca e Inegociável:** É terminantemente proibido entupir o HTML com breakpoints declarativos (ex: `md:flex-row`). O Lazy CSS usa propriedades fluidas e matemática nativa (`clamp()`, CSS Grid com auto-fit) para garantir que a interface fique indestrutível tanto em uma tela de 375px (Mobile) quanto em 1920px (Desktop).
4. **Engenharia Dinâmica de Cores:** Construído com tokens HSL puros (`--lazy-primary-raw`). Alterar a identidade visual do system inteiro é uma questão de mudar um único número matemático no algoritmo de cores.

---

## 🚀 Quickstart (Uso Rápido)

O Lazy CSS foi desenhado para ser totalmente agnóstico. Você pode usá-lo em arquivos HTML puros ou dentro de componentes React, Vue ou templates de backend (Thymeleaf, Blade, Django, EJS) sem precisar configurar ambientes Node.js complexos.

### 1. Importação Direta via CDN (Sem NPM)
Basta incluir a tag abaixo dentro do `<head>` da sua aplicação para carregar globalmente toda a estrutura do framework:

```html
<link rel="stylesheet" href="[https://cdn.jsdelivr.net/gh/asideia/lazy-css@main/dist/lazycss.min.css](https://cdn.jsdelivr.net/gh/asideia/lazy-css@main/dist/lazycss.min.css)">

```

### 2. O Fluxo de Trabalho com Inteligência Artificial

Para deixar a IA estilizar sua tela com maestria usando o Lazy CSS, siga este fluxo simples:

1. Acesse o arquivo de especificação do framework (gerado automaticamente na sua árvore local ou documentação).
2. Forneça o arquivo de contexto de prompt junto com o seu HTML de backend para a LLM de sua preferência (Claude, GPT, Gemini).
3. Peça para a IA estruturar seu HTML usando as macros do Lazy CSS.

Exemplo de estrutura gerada imediatamente pela IA:

```html
<main class="lazy-stack" style="padding: 2rem;">
    <div class="lazy-row lazy-row-between">
        <h2>Painel Administrativo</h2>
        <button class="lazy-btn lazy-btn-primary">⚡ Novo Registro</button>
    </div>
    
    <div class="lazy-card">
        <p>Interface gerada pela IA e renderizada perfeitamente pelo Lazy CSS.</p>
    </div>
</main>

```

---

## 🛠️ Desenvolvimento Local e Customização

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

---

## 📖 Documentação Completa e Especificações Técnicas

Para consultar guias avançados de engenharia de prompt, mapeamento de componentes visuais, contratos de dados JSON e exemplos interativos da nossa vitrine, acesse a nossa central de arquitetura interna:

* **Documentações do Projeto:** Confira os guias detalhados diretamente na pasta [`/docs`](https://www.google.com/search?q=./docs) do repositório.
* **Vitrine e Ferramentas:** Abra o ecossistema visual abrindo as páginas locais `quickstart.html`, `showcase.html` ou teste interativamente os layouts na nossa IDE em `playground.html`.

---

Lazy CSS © 2026 — Desenvolvido por e para engenheiros de software que preferem passar 4 hours otimizando uma query SQL complexa a gastar 5 minutos centralizando um elemento na tela.
