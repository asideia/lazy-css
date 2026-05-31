# 📑 0003 - ESTRATÉGIA DE DEPENDÊNCIAS DE DESENVOLVIMENTO E PIPELINE POSTCSS

* **Status:** Accepted
* **Data:** 2026-05-31
* **Autor:** Engenheiro de Core & IA Agent

---

## 1. Contexto (Context)
Frameworks CSS modernos frequentemente impõem dependências pesadas em tempo de execução (*dependencies*) ou exigem interpretadores JavaScript complexos injetados na aplicação final do cliente. Isso viola a premissa fundamental do **Lazy CSS**, que visa atender arquiteturas corporativas de backoffice (Java, Spring Boot, Oracle Forms, .NET, PHP) com o menor acoplamento possível. 

Para mantermos **Zero Dependências de Produção** e **Zero Dependências de Runtime**, precisamos de uma esteira de automação isolada e resiliente. Esta esteira deve modularizar o código para desenvolvedores e IAs, mas entregar um único artefato bruto minificado, robusto e compatível com navegadores antigos e modernos de forma transparente.

---

## 2. Decisão (Decision)
Decidimos que o projeto operará com isolamento total de ambiente: todas as ferramentas de processamento de código serão restritas estritamente ao escopo de `devDependencies` no `package.json`. A compilação e otimização do core serão delegadas a uma esteira industrial baseada em **PostCSS** (orquestrada via `postcss-cli`), que consolida os módulos no comando unificado `npm run build`.

A arquitetura da linha de montagem de compilação obedecerá estritamente ao fluxo sequencial de plugins abaixo:

```plaintext
      [ src/lazy.css ]      <- Código fonte modularizado e semanticamente isolado
             │
             ▼
 ┌───────────────────────┐
 │ 1. postcss-import     │  <- Consolida as diretivas @import em tempo de build
 └───────────────────────┘
             │
             ▼
 ┌───────────────────────┐
 │ 2. autoprefixer       │  <- Injeta prefixos cross-browser baseados no "Can I Use"
 └───────────────────────┘
             │
             ▼
 ┌───────────────────────┐
 │ 3. cssnano            │  <- Minificação agressiva e remoção de redundâncias
 └───────────────────────┘
             │
             ▼
    [ dist/lazycss.min.css ] <- Artefato de produção de alta performance

```

### 2.1. Papel e Justificativa das Ferramentas Core

* **`postcss-cli` (v11.0.0):** Atua como o orquestrador de linha de comando. Permite automatizar o gatilho de *Code Freeze* local (`npm run build`) e o monitoramento em tempo real (`npm run watch`) sem acrescentar scripts proprietários de build em JavaScript complexos.
* **`postcss-import` (v16.1.0):** Resolve as diretivas `@import` nativas em tempo de compilação. Permite separar o framework de forma limpa e modular em `/src/tokens`, `/src/layouts` e `/src/components` (facilitando a leitura e escrita por humanos e LLMs), sem causar o gargalo de múltiplas requisições HTTP em produção.
* **`autoprefixer` (v10.4.20):** Garante a resiliência *cross-browser*. Analisa as propriedades elásticas modernas (como Flexbox e Grid) e injeta cirurgicamente os prefixos específicos de fornecedores (`-webkit-`, `-moz-`, `-ms-`), garantindo que o comportamento indestrutível do framework funcione em dispositivos legados ou motores restritivos como o Safari Mobile corporativo.
* **`cssnano` (v7.0.6):** Motor de compressão. Remove espaços em branco, quebras de linha e comentários JSDoc que não pertencem ao parser, reduzindo o arquivo ao menor peso binário possível para otimizar a largura de banda.

### 2.2. Política de Controle de Versões e Atualizações (`^`)

Para blindar a esteira contra quebras silenciosas provocadas por atualizações de terceiros, adota-se o operador circunflexo (`^`). Isto permite a captura automática de *patches* de segurança e *minor updates* de performance das ferramentas de build (ex: subversões de correções menores que `8.0.0` para o `cssnano`), mas bloqueia atualizações de quebra estrutural (*breaking changes*).

---

## 3. Consequências (Consequences)

### 3.1. Positivas

* **Acoplamento Zero:** O usuário final consome apenas uma folha de estilo pura em CSS, eliminando o estresse de instalar pacotes Node em projetos escritos em outras linguagens (Java, Python, C#).
* **Manutenibilidade de Arquivos:** Facilita a engenharia de prompts de contexto e a modificação humana, mantendo os escopos de layout e componentes rigidamente fragmentados em pastas e arquivos focados.
* **Performance de Distribuição Extrema:** O artefato compilado final é gerado de forma limpa, estática e pré-otimizada para implantação imediata em servidores de borda (Edge CDNs como o jsDelivr).

### 3.2. Negativas / Trade-offs

* **Dependência Crítica de Compilação Local:** Modificações triviais em arquivos de desenvolvimento em `src/` exigem obrigatoriamente a execução do pipeline de compilação local pelo contribuidor antes do envio, gerando a necessidade do checklist rígido de *Code Freeze* imposto no guia de contribuição.
* **Abstração do Código Original:** Depurar o CSS final em produção torna-se complexo sem a geração e upload coordenado de mapas de origem (*source maps*), uma vez que o arquivo minificado consolida e reordena todas as assinaturas.