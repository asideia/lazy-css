# 📦 Documento de Engenharia: Pipeline de Build e Dependências

Este documento detalha o papel, a justificativa e o funcionamento das ferramentas de automação que compõem o ecossistema de desenvolvimento do **lazy CSS**.

## 1. Por que usamos `devDependencies`?

No arquivo `package.json`, as dependências estão listadas sob a chave `"devDependencies"`. Isso significa que essas ferramentas são utilizadas **apenas no ambiente de desenvolvimento** (na máquina do desenvolvedor ou nos servidores de CI/CD do GitHub) para compilar o código.

Quando o **lazy CSS** é instalado em um projeto final (como uma aplicação React ou um sistema em Java/PHP), o projeto consome apenas o arquivo compilado puro (`dist/lazy.min.css`). O ecossistema do Node **não** baixa as ferramentas de build para o projeto final, garantindo leveza absoluta.

---

## 2. Anatomia do Pipeline de Compilação

O **lazy CSS** utiliza o **PostCSS** como motor central. Ele funciona como uma linha de montagem industrial onde cada plugin executa uma transformação específica no código-fonte até gerar o artefato minificado de produção.

```text
       [ src/lazy.css ]  <- Código modular, limpo e legível para humanos
              │
              ▼
   ┌──────────────────────┐
   │    postcss-import    │  <- Junta todos os arquivos em um único bloco
   └──────────────────────┘
              │
              ▼
   ┌──────────────────────┐
   │     autoprefixer     │  <- Injeta prefixos globais de compatibilidade
   └──────────────────────┘
              │
              ▼
   ┌──────────────────────┐
   │       cssnano        │  <- Remove espaços, comentários e minifica tudo
   └──────────────────────┘
              │
              ▼
       [ dist/lazy.min.css ] <- Arquivo final ultra-otimizado para produção

```

---

## 3. Detalhamento Técnico das Ferramentas

### 3.1. `postcss-cli` (v11.0.0)

* **O que é:** Interface de Linha de Comando (CLI) para o PostCSS.
* **Função no Projeto:** É o orquestrador que nos permite rodar os comandos de compilação direto no terminal através do comando `npm run build` ou monitorar alterações com o `npm run watch`. Ele lê o arquivo `postcss.config.js` e aplica a sequência de plugins configurada.
* **Por que é necessário:** Sem ele, o PostCSS só poderia ser executado via scripts complexos em JavaScript. O CLI simplifica o processo para uma única linha de comando.

### 3.2. `postcss-import` (v16.1.0)

* **O que é:** Plugin de resolução de escopo e unificação de arquivos.
* **Função no Projeto:** Resolve as diretivas `@import` nativas do CSS em tempo de compilação. Ele busca os arquivos em `src/tokens/`, `src/base/`, etc., e injeta o conteúdo deles diretamente dentro do arquivo mestre `src/lazy.css`.
* **Por que é necessário:** Para garantir a **alta manutenabilidade**, o código precisa ser modular (separado por arquivos). Porém, navegadores web sofrem perda de performance se precisarem baixar múltiplos arquivos CSS pequenos via rede. O `postcss-import` nos permite programar de forma modular e entregar um arquivo único para o navegador.

### 3.3. `autoprefixer` (v10.4.20)

* **O que é:** Plugin de compatibilidade cross-browser baseado no banco de dados *Can I Use*.
* **Função no Projeto:** Analisa o CSS gerado e adiciona prefixos específicos de fornecedores (como `-webkit-`, `-moz-`, `-ms-`) apenas nas propriedades modernas que exigem suporte especial em navegadores antigos ou específicos (como o Safari mobile).
* **Por que é necessário:** Garante que recursos modernos como CSS Grid, Flexbox e funções de opacidade funcionem perfeitamente no celular de qualquer usuário sem que o desenvolvedor precise escrever hacks manuais no código.

### 3.4. `cssnano` (v7.0.6)

* **O que é:** Minificador e otimizador de código focado em performance.
* **Função no Projeto:** Pega o arquivo CSS unificado e realiza uma varredura agressiva de otimização: remove todos os espaços em branco, quebras de linha, comentários de código e reescreve seletores redundantes para reduzir o peso do arquivo ao menor número de bytes possível.
* **Por que é necessário:** Reduz drasticamente o tempo de carregamento da biblioteca nos projetos de produção, otimizando a experiência do usuário final e economizando largura de banda do servidor.

---

## 4. Política de Atualização das Dependências (`^`)

Todas as dependências utilizam o operador circunflexo (`^`) antes de suas versões (ex: `"cssnano": "^7.0.6"`).

* **Significado:** Esta regra instrui o gerenciador de pacotes (NPM/Yarn) de que ele tem permissão para atualizar automaticamente correções de bugs (*patches*) ou melhorias de performance (*minor updates*) até a versão imediatamente anterior à próxima grande mudança (neste caso, qualquer versão menor que `8.0.0`).
* **Objetivo:** Manter as ferramentas seguras e otimizadas sem o risco de que uma atualização quebre a sintaxe do build atual da biblioteca de forma silenciosa.