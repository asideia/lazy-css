# 📂 Especificação de Design Tokens: Cores e Espaçamento Fluido (Tokens & Colors)

Este documento estabelece a arquitetura matemática e os padrões de engenharia aplicados na camada de dados visuais do **Lazy CSS** (`src/tokens/variables.css`). O objetivo desta especificação é garantir interfaces indestrutíveis, responsividade intrínseca sem *media-queries* e total controle dinâmico sobre os estados dos componentes.

---

## 1. O Algoritmo de Cores: HSL Fragmentado (Raw HSL)

Para permitir que componentes modifiquem dinamicamente sua opacidade ou gerem tons derivados em tempo de execução sem inflar o código com variáveis estáticas, o Lazy CSS adota o padrão de **HSL Fragmentado**.

### 1.1. Regra de Declaração
As cores fundamentais devem ser declaradas dentro do escopo `:root` utilizando exclusivamente números puros (Matiz, Saturação, Luminosidade), omitindo o invólucro da função `hsl()`.

```css
/* src/tokens/variables.css */
:root {
  /* Cores de Identidade (Brand Colors) */
  --lazy-primary-raw: 215 80% 50%;   /* Azul Corporativo */
  --lazy-success-raw: 145 65% 40%;   /* Verde Administrativo */
  --lazy-danger-raw:  0 75% 55%;     /* Vermelho de Alerta/Erro */
  
  /* Cores de Superfície (Surfaces) */
  --lazy-bg-raw:      210 20% 98%;   /* Fundo do Painel Principal */
  --lazy-card-raw:    0 0% 100%;     /* Fundo de Elementos Elevados */
}

```

### 1.2. Regra de Consumo nos Componentes

Quando um componente consome um Token, ele deve envelopar a variável bruta utilizando a função nativa do CSS. Isso possibilita a injeção do canal Alpha (opacidade) sob demanda:

```css
/* src/components/components.css */
.lazy-card {
  /* Consumo padrão com opacidade sólida (100%) */
  background-color: hsl(var(--lazy-card-raw));
  
  /* Criação de sombra ou bordas sutis usando canal Alpha adaptável */
  border: 1px solid hsl(var(--lazy-primary-raw) / 0.15);
  box-shadow: 0 4px 12px hsl(var(--lazy-primary-raw) / 0.05);
}

```

### 1.3. Variações de Estado (Hover, Focus, Active)

É terminantemente proibido criar variáveis estáticas para estados secundários (ex: `--lazy-primary-hover`). Os estados de interação devem ser derivados via CSS nativo, alterando o filtro de brilho ou utilizando `color-mix()` para garantir que o framework permaneça agnóstico a temas:

```css
.lazy-btn {
  background-color: hsl(var(--lazy-primary-raw));
  transition: filter 0.2s ease;
}

/* Modificação de estado via manipulação de brilho nativo */
.lazy-btn:hover {
  filter: brightness(0.9); /* Escurece sutilmente o botão no hover */
}

.lazy-btn:active {
  filter: brightness(0.8); /* Força um feedback visual mais profundo no clique */
}

```

---

## 2. Tipografia e Escala Semântica

A tipografia do Lazy CSS prioriza o desempenho nativo e o visual sóbrio de softwares administrativos, consumindo a pilha de fontes do próprio sistema operacional do usuário.

```css
:root {
  --lazy-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  
  /* Pesos de Fonte (Font Weights) */
  --lazy-weight-normal: 400;
  --lazy-weight-medium: 500;
  --lazy-weight-bold:   700;
}

```

---

## 3. Espaçamento Fluido e Responsividade Intrínseca (Fluid Layouts)

Para cumprir a premissa de que o desenvolvedor backend **não precisa microgerenciar breakpoints de tela**, o Lazy CSS bane valores estáticos em pixels (`px`) ou rems puros para margens, paddings e gaps estruturais. Toda a escala espacial é calculada de forma dinâmica utilizando a função `clamp()`.

### 3.1. A Fórmula de Transição

Os espaçamentos calculam uma rampa que se adapta perfeitamente entre o tamanho mínimo de tela configurado (**375px - Mobile**) e o tamanho máximo operacional (**1440px - Desktop Widescreen**).

```text
Fórmula Base: clamp(Valor_Mínimo, Valor_FLEXÍVEL_Viewport_Width, Valor_Máximo)

```

### 3.2. Escala de Tokens Espaciais (The Space Scale)

Os tokens de tamanho devem ser aplicados tanto para preenchimentos internos (*paddings*) quanto para distanciamento de eixos (*gaps* e *margins*):

| Token | Escopo de Uso | Comportamento no Mobile (375px) | Comportamento no Desktop (1440px) | Expressão CSS Adotada |
| --- | --- | --- | --- | --- |
| `--lazy-space-xs` | Microlayouts (ícone + texto) | `4px` | `8px` | `clamp(0.25rem, 0.15rem + 0.38vw, 0.5rem)` |
| `--lazy-space-sm` | Componentes internos (botões) | `8px` | `12px` | `clamp(0.5rem, 0.4rem + 0.38vw, 0.75rem)` |
| `--lazy-space-md` | Preenchimento de blocos (cards) | `16px` | `24px` | `clamp(1rem, 0.8rem + 0.75vw, 1.5rem)` |
| `--lazy-space-lg` | Macroestruturas (padrão grids) | `24px` | `40px` | `clamp(1.5rem, 1.1rem + 1.5vw, 2.5rem)` |
| `--lazy-space-xl` | Margens externas e viewports | `32px` | `64px` | `clamp(2rem, 1.4rem + 2.5vw, 4rem)` |

### 3.3. Aplicação Prática Pró-IA

Ao gerar layouts, a IA deve ser instruída a aplicar estes tokens em vez de chutar valores numéricos. Isso blinda a estrutura do layout contra quebras visuais em telas portáteis:

```css
/* src/layouts/structure.css */
.lazy-stack {
  display: flex;
  flex-direction: column;
  /* O gap se auto-ajusta sozinho. Zero media-queries no código */
  gap: var(--lazy-space-md); 
}

```

---

## 4. Limites de Bordas e Sombras (Elevations)

Para manter o design limpo, coeso e estritamente corporativo, os tokens de arredondamento de canto e elevação tridimensional seguem regras rígidas:

```css
:root {
  /* Curvaturas de Borda (Border Radius) */
  --lazy-radius-sm: 4px;   /* Pequenos elementos: checkboxes, badges */
  --lazy-radius-md: 6px;   /* Elementos interativos normais: inputs, botões */
  --lazy-radius-lg: 8px;   /* Grandes contêineres: cards, tabelas, modais */
  
  /* Sombras de Elevação Administrativa (Box Shadows) */
  --lazy-shadow-flat:  0 1px 3px rgba(0, 0, 0, 0.05);
  --lazy-shadow-raised: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

```

---

## 5. Diretrizes para Contribuidores

Ao propor um novo componente visual para a pasta `src/components/`, o desenvolvedor ou a IA deve certificar-se de que:

1. **Nenhum seletor injeta cores estáticas:** Toda cor de borda, texto ou fundo deve obrigatoriamente fazer menção a um token `--lazy-*-raw`.
2. **Nenhum seletor injeta paddings fixos:** Sempre utilize a escala `--lazy-space-*` para garantir consistência visual em múltiplos dispositivos.
