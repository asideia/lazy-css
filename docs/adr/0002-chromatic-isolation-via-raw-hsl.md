# 📑 0002 - ISOLAMENTO DE ESTADO CROMÁTICO VIA HSL FRAGMENTADO

* **Status:** Accepted
* **Data:** 2026-05-31
* **Autor:** Engenheiro de Core & IA Agent

---

## 1. Contexto (Context)
Em frameworks CSS tradicionais e design systems convencionais, o gerenciamento de variações cromáticas para estados de componentes (como `hover`, `focus`, `active`, estados de opacidade e transparências dinâmicas) é resolvido através do acúmulo massivo de variáveis estáticas em folhas de estilo. Essa abordagem gera problemas severos em ambientes orientados a IA (*AI-Driven Development*):

1. **Inflação do Janela de Contexto (Context Bloat):** Declarar dezenas de tokens estáticos como `--lazy-primary-hover`, `--lazy-primary-light`, e `--lazy-primary-alpha-10` consome tokens preciosos de atenção das LLMs desnecessariamente.
2. **Engenharia de Prompt Ineficiente:** Instruir uma IA a selecionar a variação estática correta para uma borda sutil ou sombra aumenta a margem de erro nos prompts de geração de código.
3. **Rigidez Temática:** Formatos de cores fixos como Hexadecimal (`#1e40af`) ou RGB sólido inviabilizam modificações dinâmicas de opacidade e filtros de saturação em tempo de execução via CSS composto nativo.

---

## 2. Decisão (Decision)
Decidimos banir formatos de cores absolutos e o acúmulo de variáveis de estado estáticas. Em vez disso, o **Lazy CSS** adota de forma mandatória o padrão de **HSL Fragmentado (Raw Tokens)** na camada declarativa de dados visuais (`src/tokens/variables.css`) combinado com modificadores dinâmicos nativos.

### 2.1. Regra de Declaração Base (Raw Tokens)
Todas as cores core do framework devem ser declaradas dentro do escopo `:root` contendo exclusivamente os valores numéricos puros de Matiz, Saturação e Luminosidade, omitindo intencionalmente os parênteses e o nome da função `hsl()`. O sufixo `-raw` é obrigatório.

```css
/* src/tokens/variables.css */
:root {
  /* Cores de Identidade Administrativa */
  --lazy-primary-raw: 215 80% 50%;   /* Azul Core */
  --lazy-success-raw: 145 65% 40%;   /* Verde Sucesso */
  --lazy-danger-raw:  0 75% 55%;     /* Vermelho Erro/Alerta */
  
  /* Cores de Superfície e Contenção */
  --lazy-bg-raw:      210 20% 98%;   /* Canvas Backoffice */
  --lazy-card-raw:    0 0% 100%;     /* Painel Elevado */
  --lazy-border-raw:  214 32% 91%;   /* Linha Divisória */
}

```

### 2.2. Regra de Consumo Composto nos Componentes

Os componentes atômicos isolados devem envelopar a variável bruta utilizando a função `hsl()` nativa do navegador. Isso habilita a injeção imediata de canais alfa (opacidade) sob demanda sem a necessidade de novos tokens:

```css
/* src/components/components.css */
.lazy-card {
  /* Consumo Sólido Padrão (100% de opacidade) */
  background-color: hsl(var(--lazy-card-raw));
  
  /* Engenharia Cromática Composta: Opacidade Dinâmica */
  border: 1px solid hsl(var(--lazy-border-raw));
  box-shadow: 0 4px 12px hsl(var(--lazy-primary-raw) / 0.05);
}

```

### 2.3. Eliminação de Tokens de Estado via Filtros Nativos

É terminantemente proibido declarar variáveis para interações (`:hover`, `:active`). As variações de brilho de software administrativo devem ser resolvidas exclusivamente através da propriedade nativa `filter: brightness()` com transições suaves:

```css
/* src/components/components.css */
.lazy-btn {
  background-color: hsl(var(--lazy-primary-raw));
  transition: filter 0.2s ease;
}

.lazy-btn:hover {
  filter: brightness(0.92); /* Escurecimento matemático universal */
}

.lazy-btn:active {
  filter: brightness(0.85); /* Feedback visual profundo ao clique */
}

```

### 2.4. Espaçamento Fluido via Função Clamp Nativa

Para manter a premissa de **Zero Media-Queries**, os tokens espaciais de padding, margin e gap renegam valores fixos e adotam equações baseadas em `clamp()`, escalando linearmente entre os viewports operacionais de `375px` (Mobile) e `1440px` (Desktop).

```css
:root {
  --lazy-space-xs: clamp(0.25rem, 0.15rem + 0.38vw, 0.5rem);  /* 4px -> 8px */
  --lazy-space-sm: clamp(0.5rem, 0.4rem + 0.38vw, 0.75rem);   /* 8px -> 12px */
  --lazy-space-md: clamp(1rem, 0.8rem + 0.75vw, 1.5rem);      /* 16px -> 24px */
  --lazy-space-lg: clamp(1.5rem, 1.1rem + 1.5vw, 2.5rem);     /* 24px -> 40px */
}

```

---

## 3. Consequências (Consequences)

### 3.1. Positivas

* **Janela de Contexto Ultra-Enxuta:** Redução de mais de 70% no número de linhas declarativas de tokens de design, maximizando o espaço livre para lógica de negócios nos prompts das LLMs.
* **Consistência Matemática:** A IA e os desenvolvedores humanos não precisam memorizar ou inventar nomes de cores secundárias; as transparências e estados operam de forma previsível e unificada.
* **Contraste Acessível:** Modificar a luminosidade central via propriedades compostas garante que temas escuros ou de alto contraste possam ser injetados apenas alterando a raiz `:root`, sem quebrar seletores individuais.

### 3.2. Negativas / Trade-offs

* **Curva de Aprendizado Inicial:** Desenvolvedores humanos habituados a copiar códigos HEX prontos de ferramentas de design (como Figma) precisam extrair os valores numéricos brutos para o formato HSL fragmentado ao cadastrar novos tokens.
* **Carga de Renderização do Navegador:** O uso extensivo de funções CSS compostas (`hsl(var(--raw) / opacidade)`) e propriedades de `filter` delega microcálculos em tempo real para a GPU/CPU do cliente, embora o impacto em softwares administrativos densos de backoffice seja negligenciável.