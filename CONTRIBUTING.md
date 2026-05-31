# 🤝 Guia de Contribuição: Como Co-criar o Lazy CSS

Seja você um desenvolvedor humano apaixonado por arquiteturas enxutas ou um agente autônomo de IA gerando código, você é muito bem-vindo aqui! 

O **Lazy CSS** foi desenhado com o princípio *AI-Native*, o que significa que nossa infraestrutura, estilo de código e documentação viva são automatizados para permitir que humanos e LLMs colaborem sem atrito. Este documento estabelece as regras de governança e engenharia para abertura de Issues, criação de código e envio de Pull Requests.

---

## 1. O Fluxo de Contribuição em Alto Nível

```plaintext
 ┌───────────────┐      ┌──────────────────┐      ┌──────────────────┐
 │ 1. Encontre/  │ ───► │ 2. Implemente &  │ ───► │ 3. Execute o     │
 │    Abra uma   │      │    Formate o CSS │      │    Code Freeze   │
 │    Issue      │      │    (Regras JSDoc)│      │    (Local Build) │
 └───────────────┘      └──────────────────┘      └──────────────────┘
                                                                   │
 ┌───────────────┐      ┌──────────────────┐                       │
 │ 6. Merge na   │ ◄─── │ 5. Revisão Geral │ ◄─────────────────────┘
 │    Branch     │      │    & CI/CD Green │      4. Abra o Pull
 │    Main       │      └──────────────────┘         Request (PR)
 └───────────────┘

```

---

## 2. Boas Práticas para Abertura de Issues

Antes de escrever qualquer linha de código, certifique-se de que o problema ou sugestão está registrado no nosso painel de rastreabilidade.

* **Pesquise antes de abrir:** Verifique se outro colaborador já não abriu uma Issue idêntica.
* **Se for um Bug:** Explique o comportamento esperado versus o comportamento observado. Informe em quais navegadores ou motores de renderização o problema acontece. Se possível, cole o fragmento HTML que causou a quebra para que possamos testar no `playground.html`.
* **Se for uma Nova Funcionalidade (Feature):** Justifique o ganho técnico e certifique-se de que a proposta não viola o manifesto do projeto (**Zero Media-Queries** e **Zero Dependências de Produção**).

---

## 3. Padrões de Código e Engenharia Rígida

Para manter a integridade dos parsers que geram a nossa documentação para humanos (`showcase.html`) e o contexto para IAs (`dist/lazycss-blueprint.md`), todo código enviado deve seguir as regras de engenharia abaixo:

### 3.1. Governança de Arquivos e Pastas

* Mudanças em tokens de design (cores raw, espaçamento fluido) vão estritamente para `src/tokens/variables.css`.
* Regras de fluxos atômicos e estruturas elásticas baseadas em Flexbox/Grid vão para `src/layouts/`.
* Átomos de interface isolados (botões, inputs, cards) vão para `src/components/`.

### 3.2. Formatação Exclusiva JSDoc

Todo arquivo CSS modificado deve obrigatoriamente manter e atualizar a estrutura de blocos de comentários `/ ... */` contendo as tags `[DESCRIPTION]`, `[SANDBOX_ELEMENT]` e as assinaturas descritivas superiores.

> 💡 **Dica de Produtividade:** Utilize o prompt do manual `docs/3-engineering-and-tokens.md` na sua IA de preferência para formatar o código final automaticamente antes do envio.

---

## 4. Protocolo de Code Freeze Local antes do PR

Para evitar o envio de código fonte desalinhado com os artefatos de distribuição, todo contribuidor deve rodar o pipeline de validação localmente. Não aceitamos Pull Requests que alterem a pasta `/dist` sem que o script de build tenha sido executado.

Antes de realizar o commit, execute o comando na raiz do projeto:

```bash
npm run build

```

**O que este comando faz?**

1. Valida a sintaxe e injeta prefixos de compatibilidade globais no CSS via PostCSS.
2. Compila e minifica o código gerando os arquivos dentro de `/dist`.
3. Executa o parser Node.js para reconstruir o `lazycss.spec.json` e o `lazycss-blueprint.md`.

---

## 5. Diretrizes para Envio de Pull Requests (PRs)

Seu PR está pronto para ser enviado? Certifique-se de preencher o seguinte checklist na descrição dele:

1. **Vincule a Issue correspondente:** Use palavras-chave como `Fixes #12` ou `Closes #45` para que o GitHub encerre o tópico automaticamente após o merge.
2. **Não altere versões manualmente:** Não incremente o campo `"version"` do `package.json`. O versionamento semântico (SemVer) e a publicação de tags são de responsabilidade exclusiva dos mantenedores do core através do `docs/5-release-guide.md`.
3. **Escopo focado:** PRs gigantescos que tentam consertar um bug e adicionar três componentes ao mesmo tempo serão recusados. Mantenha seus PRs atômicos e focados em um único objetivo.

---

## 6. Código de Conduta Operacional

* **Seja empático e profissional:** Respeite o tempo dos revisores de código. Críticas técnicas ao código não são ataques pessoais.
* **Abordagem pragmática:** No Lazy CSS, valorizamos a simplicidade matemática em detrimento de hacks visuais complexos. Escreva código legível tanto para humanos quanto para LLMs.