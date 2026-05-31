# 📑 0001 - RESILIÊNCIA ELÁSTICA SEM MEDIA-QUERIES

* **Status:** Accepted
* **Data:** 2026-05-31
* **Autor:** Engenheiro de Core & IA Agent

---

## 1. Contexto (Context)
A esmagadora maioria dos frameworks CSS modernos (como Tailwind, Bootstrap e Bulma) baseia a sua estratégia de responsividade no uso massivo de *media-queries* atreladas a *breakpoints* rígidos de dispositivos (ex: `sm:`, `md:`, `lg:`). Embora esta abordagem funcione para desenvolvimento puramente manual humano, ela introduz falhas críticas em ecossistemas focados em **AI-Driven Development (Softwares Orientados a IA)**:

1. **Alucinação Descritiva em Prompts:** Instruir uma LLM (como Gemini ou Claude) a adivinhar e microgerenciar múltiplos estados de tela para cada elemento visual aumenta drasticamente o consumo de tokens de contexto e a taxa de erro na geração do código HTML/CSS.
2. **Poluição de Código de Negócio:** Misturar dezenas de classes utilitárias de viewport no código backend quebra o princípio da separação de responsabilidades.
3. **Rigidez de Interfaces Corporativas:** Softwares administrativos densos de backoffice necessitam de contenção espacial e resiliência elástica intrínseca, onde os elementos se acomodam de acordo com o espaço disponível do contentor pai, e não do tamanho absoluto da janela do navegador.

---

## 2. Decisão (Decision)
Decidimos banir sumariamente o uso de *media-queries* declarativas nos prompts e no código gerado pelo ecossistema do **Lazy CSS**. A responsividade do framework passa a ser estritamente **passiva e intrínseca**, delegada aos motores nativos de renderização do CSS moderno (`Flexbox` e `CSS Grid`) através de duas frentes arquiteturais rígidas:

### 2.1. Microlayouts Atômicos (CSS Flexbox Elástico)
O comportamento de fluxo interno de pequenos blocos de informação deve ser controlado exclusivamente pelo arquivo `src/layouts/structure.css`. Os alinhadores horizontais (`.lazy-row`) e verticais (`.lazy-stack`) impõem quebras automáticas e distribuição baseada no espaço disponível:

```css
/* src/layouts/structure.css */
.lazy-row {
  display: flex !important;
  flex-direction: row;
  flex-wrap: wrap;          /* Força a quebra mobile automática sem media-query */
  align-items: center;
  gap: var(--lazy-space-md); /* Espaçamento fluido calculado via clamp() */
}

.lazy-stack {
  display: flex !important;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--lazy-space-md);
}

```

### 2.2. Macroestruturas de Viewport (CSS Grid Autogerenciável)

A montagem de esqueletos de páginas inteiras e dashboards administrativos deve ser controlada exclusivamente pelo arquivo `src/layouts/page-grid.css`, utilizando a função nativa `minmax()` para forçar grids inteligentes que se auto-ajustam sem intervenção humana ou algorítmica:

```css
/* src/layouts/page-grid.css */
.lazy-grid-auto {
  display: grid !important;
  /* Cria colunas automáticas de no mínimo 280px que preenchem o espaço restante */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--lazy-space-md);
}

```

---

## 3. Consequências (Consequences)

### 3.1. Positivas

* **Código HTML Ultra-Limpo:** A IA não precisa injetar prefixos de tamanho (ex: `md:flex-row sm:col-span-12`). Um único container `.lazy-row` ou `.lazy-grid-auto` resolve a responsividade de forma invisível.
* **Fricção Zero no Prompting:** O desenvolvedor backend ou agente autónomo foca estritamente na semântica da regra de negócio. O layout torna-se indestrutível e à prova de quebras visuais em dispositivos portáteis.
* **Agnóstico de Dispositivo:** O framework adapta-se perfeitamente a ecrãs móveis, tablets, monitores ultrawide e componentes embutidos em *iframes* ou modais de forma nativa.

### 3.2. Negativas / Trade-offs

* **Perda de Controle Cirúrgico Visual:** Desenvolvedores que necessitam que um elemento mude radicalmente de comportamento visual ou desapareça de forma super-específica num número exato de pixels (ex: desaparecer exatamente aos `768px`) encontrarão limitações. Nesses cenários pontuais, a responsabilidade é delegada a classes de `Utility` separadas (ex: `.lazy-hide-mobile`).
* **Uso Obrigatório de Reset Preemptivo:** Como dependemos da elasticidade e do *box-model* para os cálculos de quebra automática, qualquer interferência ou colapso de margens externas herdadas de navegadores antigos pode quebrar o fluxo. Isto exige um isolamento rigoroso no módulo `src/base/reset.css`.