# 📑 0006 - AUTOMATIC CHROMATIC THEME (LIGHT/DARK)

* **Status:** Accepted
* **Data:** 2026-06-20
* **Autor:** Core Architecture Team

---

## 1. Contexto (Context)
A construção de interfaces modernas exige suporte nativo a temas visuais (Light e Dark modes). Forçar o desenvolvedor ou a IA a gerenciar classes de estado utilitárias redundantes (ex: `dark:bg-slate-900`) em cada tag HTML infla o tamanho do código e aumenta a probabilidade de alucinações de design por parte dos modelos de linguagem.

Aproveitando a arquitetura de **Isolamento de Estado Cromático** estabelecida na ADR 0002, o framework necessita de uma estratégia centralizada e puramente declarativa para gerenciar a inversão de polaridade cromática sem depender de JavaScript.

---

## 2. Decisão (Decision)
Decidimos embutir o suporte a temas diretamente no token de variáveis globais (`src/tokens/variables.css`) utilizando duas abordagens acopladas:

1. **Detecção Nativa por OS:** Utilização da media query `@media (prefers-color-scheme: dark)` para ativar o modo escuro automaticamente com base nas preferências do sistema operacional do usuário.
2. **Sobrescrita Declarativa (Override):** Suporte ao atributo de dados `[data-theme="dark"]` e `[data-theme="light"]` aplicados na tag `<html>` ou `<body>`. Isso blinda o framework e permite que o usuário crie botões de alternância manual (Toggle switches) que se sobrepõem à preferência do sistema.

Graças ao padrão HSL Fragmentado (Raw Tokens), a inversão de tema remapeia exclusivamente os valores numéricos brutos das propriedades de fundo, card, bordas e textos principais. Os componentes permanecem imutáveis.

---

## 3. Consequências (Consequences)

### 3.1. Positivas
* **Complexidade Zero para IA:** A inteligência artificial foca em escrever o HTML semântico básico. O comportamento cromático adaptativo herda o tema de forma intrínseca e transparente.
* **Custo Computacional Nulo:** Sem flashes de cor errada no carregamento (FOUC) e zero bytes de JavaScript necessários para o motor básico.