# 🦥 Lazy CSS - Protocolo de Formatação AI-Native (Prompt de Governança)

Este documento serve como a especificação oficial de anatomia para os arquivos `.css` do ecossistema Lazy CSS. Os scripts do nosso pipeline de build (`buildLazyCSSSpec.js` e `buildBlueprint.js`) dependem estritamente desta estrutura de comentários JSDoc para mapear o manifesto de contexto consumido pelas LLMs.

Sempre que criar um novo arquivo `.css` ou atualizar um existente, utilize o prompt abaixo em uma LLM (Gemini, Claude ou GPT) para garantir a integridade do ecossistema.

---

## 📋 Prompt Copiável para LLMs

Copie o bloco de texto abaixo integralmente, cole na sua ferramenta de IA de preferência e insira o CSS bruto no local indicado ao final.

```text
Você é um engenheiro de software sênior especialista em arquitetura CSS, Design Systems e IA-Driven Development. 

O meu projeto ("Lazy CSS") possui um pipeline de automação em Node.js que lê arquivos .css e gera uma documentação JSON/Markdown estruturada para contextualizar outras IAs. Para que o script funcione, cada arquivo .css DEVE seguir uma anatomia estrita de comentários JSDoc (/** ... */) e tags de marcação específicas.

Sua tarefa é receber um código CSS bruto que eu vou te enviar e reescrevê-lo, aplicando as regras de formatação abaixo sem alterar nenhuma propriedade ou lógica do CSS original.

---

### 📑 REGRAS ESTRITAS DE ANATOMIA DO ARQUIVO

1. [DESCRIPTION] (Macro Escopo):
   O arquivo DEVE começar com um comentário JSDoc descrevendo o propósito do módulo. A primeira palavra dentro do bloco de comentário deve ser a tag "[DESCRIPTION]" em caixa alta, seguida pela explicação do domínio do arquivo.

2. [SANDBOX_ELEMENT] (Exemplos Ouro / Few-Shot Learning):
   Logo após a descrição macro, você deve criar de 1 a 2 blocos de comentários JSDoc contendo exemplos reais de HTML estrutural usando as classes daquele arquivo. 
   Cada bloco deve conter obrigatoriamente:
   - A tag "[SANDBOX_ELEMENT]" na primeira linha.
   - A tag "[SANDBOX_ELEMENT_NAME]" seguida por um título descritivo do componente.
   - A tag "[SANDBOX_ELEMENT_HTML]" seguida pelo bloco de código HTML limpo.

3. COMENTÁRIOS DE ASSINATURA (Classes ou Variáveis):
   Cada classe (ex: .lazy-btn) ou variável nativa (ex: --lazy-space-md) DEVE ter um bloco de comentário JSDoc colado IMEDIATAMENTE na linha superior à sua assinatura. 
   - O comentário deve explicar a regra arquitetural, comportamento esperado ou herança daquela assinatura de forma clara e técnica.
   - Não use comentários de linha comum (//) ou blocos simples (/* */) para as assinaturas. Use apenas JSDoc (/** */).
   - ATENÇÃO: Blocos de reset ou seletores complexos intermediários (ex: .lazy-stack > *) não devem receber comentários JSDoc para não confundir o parser do compilador.

---

### 🎯 EXEMPLO PADRÃO DO CONTRATO (FEW-SHOT)

Use este formato como guia absoluto de output:

/**
 * [DESCRIPTION]
 * Classes de botões atômicos e variações cromáticas para o Lazy CSS.
 */

/**
 * [SANDBOX_ELEMENT]
 * [SANDBOX_ELEMENT_NAME] Botão Primário de Ação
 * [SANDBOX_ELEMENT_HTML]
 * <button type="button" class="lazy-btn lazy-btn-primary">Salvar Alterações</button>
 */

/**
 * Assinatura base para elementos de ação. Aplica transição sutil, cursor e padding neutro.
 */
.lazy-btn {
    display: inline-flex;
    align-items: center;
    border-radius: var(--lazy-radius-md);
}

---

### 🛠️ COMANDO DE EXECUÇÃO

Com base nas regras e no exemplo acima, formate o código CSS abaixo. 
Retorne APENAS o código CSS completo e formatado dentro de um bloco de código markdown único, sem explicações textuais antes ou depois do código.

AQUI ESTÁ O MEU CSS BRUTO PARA SER FORMATADO:
[COLE SEU CSS AQUI]

```

---

## ⚙️ Fluxo de Integração Local

Após receber o retorno formatado da IA, siga o fluxo de build padrão do repositório:

1. Salve ou crie o arquivo correspondente na pasta adequada dentro de `/src` (ex: `src/components/buttons.css`).
2. Rode o pipeline integrado no terminal:

```bash
npm run build
```


3. Valide se a nova assinatura e os elementos de sandbox foram devidamente indexados no artefato de distribuição final em `dist/lazycss.spec.json` e `dist/lazycss-blueprint.md`.

---

Com esse arquivo salvo em `/docs`, o conhecimento operacional do design do seu framework está totalmente documentado e perenizado no código. Ponto pacificado!