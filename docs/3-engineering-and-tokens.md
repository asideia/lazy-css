# 📐 Engenharia de Dados Visuais e Protocolo de Formatação AI-Native

Este documento estabelece a especificação oficial de modelagem matemática e a anatomia de formatação para os arquivos `.css` do ecossistema **Lazy CSS**. 

Os scripts do nosso pipeline de build (`buildLazyCSSBlueprint.js`) e as janelas de contexto das LLMs dependem estritamente desta estrutura para garantir interfaces imutáveis, responsividade elástica intrínseca (sem *media-queries*) e total compatibilidade com o parser automatizado de blocos JSDoc.

---

## 1. A Arquitetura Matemática de Tokens e Cores

O Lazy CSS adota o princípio de **Isolamento de Estado Cromático e Espacial**. Para que o framework seja indestrutível e adaptável, os dados declarativos de design seguem regras de engenharia rígidas dentro de `src/tokens/variables.css`:

### 1.1. O Padrão HSL Fragmentado (Raw Tokens)
É expressamente proibido declarar cores em formatos rígidos como Hexadecimal (`#232323`) ou RGB puro. Todas as cores do sistema devem ser declaradas como propriedades customizadas contendo apenas os valores numéricos brutos do modelo HSL (Hue, Saturation, Lightness), sob o sufixo `-raw`.

```css
/* Correto: Permite ao componente injetar opacidade dinamicamente */
:root {
  --lazy-primary-raw: 215 80% 50%;
  --lazy-bg-raw:      0 0% 10%;
}

/* Incorreto: Bloqueia o motor de renderização composto */
:root {
  --lazy-primary-fail: #1e40af; 
}

```

**Justificativa Técnica:** O formato fragmentado permite que os componentes e modificadores de estado apliquem opacidade matemática milimétrica em tempo de execução usando sintaxe composta, sem a necessidade de criar novas variáveis de cor:

```css
.lazy-card {
  background-color: hsl(var(--lazy-card-raw));
  border: 1px solid hsl(var(--lazy-border-raw) / 0.15); /* Opacidade dinâmica */
}

```

### 1.2. Espaçamento Fluido e Escala Dimensional

Os tokens de espaçamento (`gap`, `padding`, `margin`) utilizam propriedades CSS nativas calculadas para garantir respiros ergonômicos e simétricos. No `structure.css`, os modificadores de densidade (`.lazy-gap-*`) devem **obrigatoriamente** declarar o formato composto bidimensional (`row-gap column-gap`) para blindar o layout contra colapsos verticais quando elementos sofrerem quebra de linha elástica (`flex-wrap: wrap`).

---

## 2. Protocolo de Formatação de Código CSS para LLMs

Os scripts de build dependem de marcações JSDoc estritas para extrair os metadados visuais, compilar o manifesto JSON e gerar o `lazycss-blueprint.md` estável consumido por projetos satélites de backoffice.

Sempre que criar um novo arquivo `.css` ou atualizar um existente, utilize o prompt de governança abaixo para delegar a escrita estruturada para a inteligência artificial.

### 📋 Prompt Copiável de Governança (System Prompt)

```text
Você é um engenheiro de software sênior especialista em arquitetura CSS, Design Systems e IA-Driven Development. 

O meu projeto ("Lazy CSS") possui um pipeline de automação em Node.js que lê arquivos .css modulares e gera uma documentação Markdown compilada (Blueprint) para contextualizar outras IAs. Para que o script funcione, cada arquivo .css DEVE seguir uma anatomia estrita de comentários JSDoc (/** ... */) e tags de marcação específicas.

Sua tarefa é receber um código CSS bruto que eu vou te enviar e reescrevê-lo, aplicando as regras de anatomia abaixo sem alterar nenhuma propriedade, token ou lógica do CSS original.

---

### 📑 REGRAS ESTRITAS DE ANATOMIA DO ARQUIVO

1. [DESCRIPTION] (Macro Escopo):
   O arquivo DEVE começar obrigatoriamente com um comentário JSDoc descrevendo o propósito claro do módulo. A primeira palavra após a abertura do bloco deve ser a tag "[DESCRIPTION]" em caixa alta, seguida pela explicação do domínio do arquivo.

2. [SANDBOX_ELEMENT] (Exemplos Ouro / Few-Shot Learning):
   Logo após a descrição macro, você deve criar blocos de comentários JSDoc contendo exemplos reais de HTML estrutural puro usando as classes daquele arquivo. 
   Cada bloco deve conter exatamente:
   - A tag "[SANDBOX_ELEMENT]" na primeira linha interna do comentário.
   - A tag "[SANDBOX_ELEMENT_NAME]" seguida por um título descritivo do componente.
   - A tag "[SANDBOX_ELEMENT_HTML]" seguida pelo bloco de código HTML limpo.

3. COMENTÁRIOS DE ASSINATURA (Classes ou Variáveis Core):
   Cada classe principal (ex: .lazy-row) ou variável nativa (ex: --lazy-space-md) DEVE ter um bloco de comentário JSDoc colado IMEDIATAMENTE na linha superior à sua assinatura. 
   - O comentário deve explicar a regra arquitetural, comportamento de responsividade passiva ou herança daquela assinatura de forma técnica e direta.
   - Nunca use comentários de linha comum (//) ou blocos simples (/* */) para as assinaturas. Use apenas JSDoc (/** */).
   - ATENÇÃO: Blocos de reset interno, seletores globais de tags puras ou seletores de shielding complexos (ex: .lazy-stack > *) NÃO devem receber comentários JSDoc para manter o parser do compilador limpo.

---

### 🎯 EXEMPLO PADRÃO DO CONTRATO (FEW-SHOT GUIDELINE)

Use este formato exato como guia absoluto de output:

/**
 * [DESCRIPTION]
 * Sistema de Microlayouts e Fluxos Atômicos do Lazy CSS. Controle indestrutível de alinhamento 
 * espacial baseado em CSS Flexbox responsivo.
 */

/**
 * [SANDBOX_ELEMENT]
 * [SANDBOX_ELEMENT_NAME] Layout de Fluxo Vertical (Stack) básico
 * [SANDBOX_ELEMENT_HTML]
 * <div class="lazy-stack lazy-gap-sm">
 * <button type="button" class="lazy-btn">Ação 1</button>
 * <button type="button" class="lazy-btn">Ação 2</button>
 * </div>
 */

/**
 * Alinhador horizontal baseado em Flexbox. Posiciona os elementos lado a lado com quebra automática (wrap) 
 * ativada para telas pequenas. Centraliza itens verticalmente por padrão ergonômico.
 */
.lazy-row {
  display: flex !important;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--lazy-space-md);
}

---

### 🛠️ COMANDO DE EXECUÇÃO

Com base nas regras e no exemplo acima, formate o código CSS abaixo. 
Retorne APENAS o código CSS completo e formatado dentro de um bloco de código markdown único, sem explicações textuais, introduções ou notas antes ou depois do código.

AQUI ESTÁ O MEU CSS BRUTO PARA SER FORMATADO:
[COLE SEU CSS AQUI]

```

---

## ⚙️ Fluxo de Integração Local e Validação

Após receber o retorno perfeitamente formatado da IA, siga o fluxo operacional da esteira de build do repositório:

1. **Persistência de Arquivos:** Cole ou edite o código correspondente na pasta adequada dentro do diretório `/src` (ex: se for tabela, em `src/components/tables.css`; se for fluxo, em `src/layouts/structure.css`).
2. **Execução da Compilação:** Execute o pipeline integrado no seu terminal para disparar o PostCSS e o script de automação do Node:
```bash
npm run build

```


3. **Homologação Contratual:** Abra os arquivos gerados em `dist/lazycss.spec.json` e `dist/lazycss-blueprint.md`. Valide se as novas classes, assinaturas técnicas e exemplos estruturais em HTML (Sandbox) foram devidamente capturados pelo parser e indexados no artefato final.