# 🦥 Guia Técnico de Início Rápido (Quickstart)

Este documento detalha as etapas operacionais para implementar o **Lazy CSS** no seu projeto e como utilizar modelos de linguagem (LLMs) para automatizar e acelerar a criação de interfaces.

---

## 1. Fluxo de Implementação: As Duas Etapas Práticas

O framework opera em duas frentes complementares: a inclusão direta da folha de estilos ou a automação total de layouts via Engenharia de Prompt.

```plaintext
      [ Desenvolvedor precisa criar uma Interface ]
                            │
                            ▼
                ¿ Qual abordagem escolher ?
                            │
         ┌──────────────────┴──────────────────┐
         │                                     │
  (Abordagem Manual)                  (Abordagem Automatizada)
         │                                     │
         ▼                                     ▼
 [ Etapa 1: Integração Direta ]      [ Etapa 2: Aceleração via LLM ]
         │                                     │
         ├─► Linkar CSS no <head>              ├─► Coletar o blueprint.md
         │                                     │
         └─► Criar HTML estrutural             ├─► Injetar contexto na LLM
                                               │
                                               ├─► Descrever requisitos
                                               │
                                               └─► Obter o HTML estilizado

```

### Etapa 1: Integração via CDN ou Local

Nesta etapa, o desenvolvedor consome a folha de estilo compilada diretamente em seu projeto, usando as classes macroestruturais e deixando que as tags semânticas façam o trabalho pesado de estilização nativa.

#### Passos para Integração:

1. **Vinculação do Asset:** Insira a tag de importação apontando para o arquivo minificado dentro do `<head>` da aplicação.
2. **Uso de Elementos Nativos:** O Lazy CSS redefine e normaliza elementos nativos (como `table`, `button`, `input`, `select`) para que eles herdem estilos profissionais automaticamente, minimizando a necessidade de injetar classes em cada tag.
3. **Composição Estrutural:** Utilização de layouts base para empilhamento vertical (`.lazy-stack`) e alinhamento horizontal (`.lazy-row`).

#### Exemplo de Página Padrão (`index.html`):

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Admin - Lazy CSS</title>
    <link rel="stylesheet" href="dist/lazycss.min.css">
</head>
<body>

    <main class="lazy-stack" style="padding: 2rem;">
        <div class="lazy-row lazy-row-between">
            <h2 style="margin: 0;">Visão Geral do Backoffice</h2>
            <button class="lazy-btn lazy-btn-primary">⚡ Atualizar Logs</button>
        </div>
    </main>

</body>
</html>

```

---

### Etapa 2: Aceleração e Automação de Interfaces via LLM

Se o desenvolvedor preferir não codificar as estruturas manualmente ou precisar acelerar a prototipagem de telas corporativas complexas (como formulários extensos, tabelas de alta densidade e painéis de métricas), ele pode delegar a escrita estrutural do HTML para uma Inteligência Artificial.

Para evitar alucinações por parte do modelo de linguagem (LLM) ou a geração de classes inexistentes, o ecossistema utiliza um manifesto estrito de especificações.

```plaintext
 DESENVOLVEDOR             REPOSITÓRIO                 IA (LLM)                            PLAYGROUND
      │                         │                         │                                     │
      │──(1) Baixa o blueprint ─►                         │                                     │
      │                         │                         │                                     │
      │──(2) Envia o blueprint + prompt de comando ──────►│                                     │
      │                                                   │                                     │
      │                                           [Analisa regras e]                            │
      │                                           [restrições do CSS]                           │
      │                                                   │                                     │
      │◄─(3) Retorna HTML limpo e estruturado ────────────│                                     │
      │                                                                                         │
      │──(4) (Se preferir) Injeta fragmento puro para validação imediata ──────────────────────►│

```

#### O Fluxo de Trabalho (Workflow):

1. **Download das Especificações (.md):** O desenvolvedor obtém o arquivo contendo a documentação técnica das assinaturas de classes, arquitetura de tokens e exemplos reais de uso do Lazy CSS (gerado pelo pipeline do projeto como `lazycss-blueprint.md`).
2. **Contextualização da IA:** Ao iniciar uma nova sessão com a LLM (Claude, ChatGPT, Gemini, etc.), o desenvolvedor anexa ou cola o conteúdo deste arquivo `.md` logo no primeiro prompt. Isso estabelece o aprendizado de máquina em tempo de execução (*Few-Shot / Zero-Shot Learning*).
3. **Solicitação Semântica Pura:** Com a IA contextualizada sobre as regras de estilo do Lazy CSS, o desenvolvedor solicita a tela desejada descrevendo apenas os requisitos funcionais. A IA responderá com um bloco de código HTML limpo, aplicando perfeitamente as classes estruturais nativas do framework, pronto para ser colado e visualizado em tempo real no **Playground Sandbox**.

---

## 2. Diretrizes Técnicas para a IA (Regras de Ouro no Prompt)

Ao ler o manifesto de especificações (`lazycss-blueprint.md`), a Inteligência Artificial é tecnicamente instruída a seguir regras rígidas de compilação de código HTML. Essas restrições asseguram que a interface produzida seja compatível e idêntica ao design system:

1. **Proibição de Estilos Inline Arbitrários:** A IA nunca deve gerar propriedades de posicionamento (`margin`, `padding`, `width`, `height`) ou cores hexadecimais de forma inline nos elementos, devendo utilizar estritamente as classes estruturais ou modificadores globais fornecidos.
2. **Encapsulamento Obrigatório:** Qualquer componente gerado (seja um formulário completo ou um botão isolado) deve nascer estruturado sob um agrupador de fluxo (`.lazy-stack` ou `.lazy-row`) para garantir que os tratamentos de herança de espaçamento funcionem corretamente.
3. **Uso de Semântica de Status Própria:** Para Badges, Indicadores de Alerta ou Células de Destaque, a IA deve aplicar as variáveis semânticas de status (`--lazy-success-raw`, `--lazy-error-raw`), mantendo o padrão visual corporativo unificado.
