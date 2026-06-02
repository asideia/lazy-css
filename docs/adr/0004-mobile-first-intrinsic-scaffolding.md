# 📑 0004 - SCAFFOLDING PADRONIZADO E RESPONSIVIDADE INTRÍNSECA MOBILE-FIRST

* **Status:** Accepted
* **Data:** 2026-06-01
* **Autor:** Engenheiro de Core & IA Agent

---

## 1. Contexto (Context)
A análise visual em dispositivos móveis demonstrou que estilos embutidos (`<style>`) e microgerenciamento inline nas páginas institucionais violam o isolamento do framework. O cabeçalho expõe transbordamento de texto (*overflow*), e layouts complexos como o painel do Playground colapsam horizontalmente em viewports reduzidos.

Para manter o princípio de **Zero Media-Queries para a IA** e evitar a introdução de frameworks pesados de JavaScript apenas para controlar menus e barras laterais, o Lazy CSS necessita de contratos universais de scaffolding (estruturas de página) que nasçam nativamente otimizados para o mobile e escalem de forma fluida para o desktop.

---

## 2. Decisão (Decision)

### 2.1. Banimento de Blocos de Estilo Locais
Fica terminantemente proibido o uso de tags `<style>` internas ou atributos `style="..."` complexos para fins de layout estrutural nas páginas do ecossistema. Toda a fundação visual deve ser extraída das classes nativas do `dist/lazycss.min.css`.

### 2.2. Menu Hamburguer e Header Sem JavaScript (CSS-Only Open/Close)
Para solucionar o colapso do cabeçalho, o componente `.lazy-navbar` usará a técnica do "Checkbox Hack". Um elemento `<input type="checkbox">` oculto controlará o estado de expansão do menu no mobile de forma puramente declarativa no CSS, garantindo que a IA consiga replicar a lógica sem gerar funções JS de clique.

```css
/* src/components/navbar.css */
.lazy-navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: var(--lazy-space-md);
  background: hsl(var(--lazy-card-raw));
  border-bottom: 1px solid hsl(var(--lazy-border-raw));
}

.lazy-nav-toggle {
  display: none; /* Oculto por padrão no Desktop */
}

/* No mobile/viewports estreitos, o Flexbox empilha os itens dinamicamente */
@supports (display: grid) {
  /* Toda a inteligência de quebra fluida se apoia em CSS intrínseco ou isolado no core */
}

```

### 2.3. Scaffolding de Painéis Mutáveis (Layout Split)

Para estruturas bidimensionais avançadas (como o Playground), introduziremos a classe `.lazy-layout-split`. Em telas restritas, seu comportamento padrão é o empilhamento vertical (fluxo de coluna, `100%` de largura). Quando o espaço horizontal excede o gatilho matemático de segurança calculado via CSS, ele chaveia para uma distribuição em linha de forma passiva.

### 2.4. Utilitário de Caixa de Código Dinâmica (`.lazy-ide-input`)

Criação de um token utilitário de comportamento focado em ferramentas de teste, forçando o comportamento estrito de IDE em blocos `textarea`: fontes monoespaçadas, preservação de quebras, rolagem customizada e invariabilidade de caixa.

---

## 3. Consequências (Consequences)

### 3.1. Positivas

* **Coerência Visual Estrita:** Todas as páginas do ecossistema passam a compartilhar exatamente as mesmas variáveis de espaçamento, tipografia e elevação, eliminando discrepâncias visuais.
* **Menus Funcionais com Zero JS:** Sistemas legados ou monolíticos em linguagens de backend não precisam injetar scripts de terceiros ou frameworks reativos para ter componentes de navegação interativos no mobile.
* **Indestrutibilidade de Interface:** O painel do Playground passa a comportar-se perfeitamente em telas portáteis, jogando o editor para cima e o preview para baixo sem travar o scroll global da página.

### 3.2. Negativas / Trade-offs

* **Semântica HTML Restrita:** O uso do "Checkbox Hack" para o menu mobile exige que a árvore do código possua uma ordem específica (`input#toggle + label + nav`), o que deve ser rigidamente mapeado no blueprint para que a IA não inverta os elementos.