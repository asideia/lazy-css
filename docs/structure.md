# 📂 Documento de Arquitetura: Estrutura do Projeto

Este documento serve para mapear a anatomia do repositório do **lazy CSS**, detalhando a governança de arquivos, a separação de responsabilidades e o fluxo de compilação dos módulos visuais.

## 1. Visão Geral da Árvore de Diretórios

O projeto adota uma abordagem monolítica modularizada. O código de desenvolvimento é fragmentado para garantir manutenibilidade, enquanto o ambiente de distribuição entrega um arquivo unificado de alta performance.

```text
lazy-css/
├── dist/                  # Artefatos Compilados (Produção)
│   └── lazy.min.css       # Folha de estilo única, minificada e com prefixos globais
├── src/                   # Código-Fonte Modular (Desenvolvimento)
│   ├── tokens/
│   │   └── variables.css  # Camada de Dados (Design Tokens baseados em HSL raw)
│   ├── base/
│   │   └── reset.css      # Camada de Normalização (Reset e suavização cross-browser)
│   ├── layouts/
│   │   ├── structure.css  # Camada de Microlayouts (Alinhamento atômico Flexbox)
│   │   └── page-grid.css  # Camada de Macroestruturas (Grids de páginas e seções)
│   ├── components/
│   │   └── components.css # Camada de Elementos (Componentes visuais puros)
│   └── lazy.css           # Arquivo Mestre Indexador (Orquestrador do PostCSS)
├── postcss.config.js      # Pipeline de Build (Configuração de Plugins)
├── package.json           # Manifesto do Projeto (Metadados e Scripts de Automação)
└── index.html             # Playground Local (Ambiente de Testes e Sandbox)

```

---

## 2. O Fluxo de Dados e Compilação

Para entender como a estrutura se comporta, é essencial compreender o ciclo de vida do código. O desenvolvedor (ou a IA) altera exclusivamente os arquivos contidos dentro do diretório `src/`. O navegador que roda o `index.html` (Playground) lê apenas o resultado gerado dentro da pasta `dist/`.

O arquivo central `src/lazy.css` atua como o funil do projeto, utilizando diretivas `@import` para estruturar a ordem de precedência correta do CSS:

```css
/* src/lazy.css */
@import "./tokens/variables.css";  /* 1. Carrega as variáveis (Escopo Global) */
@import "./base/reset.css";       /* 2. Aplica o reset (Sobrescreve os browsers) */
@import "./layouts/structure.css"; /* 3. Injeta utilitários de alinhamento */
@import "./layouts/page-grid.css";  /* 4. Injeta estruturas de páginas */
@import "./components/components.css"; /* 5. Carrega a estilização dos elementos */

```

---

## 3. Detalhamento das Pastas e Responsabilidades

### 3.1. Diretório `/dist` (Distribution)

Contém o produto final pronto para consumo.

* **`lazy.min.css`:** É um arquivo gerado de forma 100% automatizada. Ele não deve ser editado manualmente sob nenhuma hipótese. Qualquer alteração feita diretamente nele será sobrescrevida no próximo build.

### 3.2. Diretório `/src/tokens`

Camada declarativa de dados brutos.

* **Responsabilidade:** Armazenar os limites matemáticos e visuais da biblioteca (paleta de cores, escala de espaçamento, fatores de borda e intensidades de sombra).
* **Regra Arquitetural:** Não deve conter classes CSS (seletores com ponto `.`), apenas propriedades customizadas (`:root`). As cores devem ser declaradas em formato HSL fragmentado (sem o invólucro da função `hsl()`) para permitir modificações dinâmicas de opacidade nos componentes.

### 3.3. Diretório `/src/base`

Camada de consistência física.

* **Responsabilidade:** Zerar comportamentos bizarros herdados de navegadores antigos e padronizar o comportamento de box-model (`box-sizing: border-box`) e tipografia.
* **Regra Arquitetural:** Alvos exclusivos em tags HTML puras (como `body`, `html`, `img`, `input`). Nenhuma classe customizada deve ser criada aqui.

### 3.4. Diretório `/src/layouts`

Camada de posicionamento e responsividade espacial. É dividida em duas frentes de engenharia:

* **`structure.css` (Microlayouts):** Focado no comportamento interno de pequenos blocos (empilhar inputs verticalmente, alinhar botões horizontalmente). Baseado estritamente em Flexbox.
* **`page-grid.css` (Macroestruturas):** Focado no esqueleto da página inteira (divisão de menus laterais, grids de relatórios auto-responsivos). Baseado estritamente em CSS Grid.

### 3.5. Diretório `/src/components`

Camada de elementos de interface interativos.

* **Responsabilidade:** Isolar a semântica visual de componentes atômicos reutilizáveis.
* **Regra Arquitetural:** Seguir a risca a convenção de nomenclatura da biblioteca (`.lazy-card`, `.lazy-field`, `.lazy-btn`). Todos os componentes devem ser agnósticos de layout (não devem possuir margens externas fixas ou larguras estáticas forçadas), delegando o espaçamento para as classes da pasta `/layouts`.

---

## 4. O Playground Integrado (`/index.html`)

O arquivo `index.html` reside na raiz do projeto por motivos estratégicos de desenvolvimento ágil (*lazy coding*).
Ao manter o playground no mesmo nível do manifesto `package.json`, o desenvolvedor consegue subir um servidor local instantâneo que consome o artefato em desenvolvimento (`dist/lazy.min.css`). Isso elimina a necessidade de criar pacotes fictícios (*npm link*) ou repositórios espelhos apenas para testar se uma nova classe de botão ou input foi estilizada corretamente.