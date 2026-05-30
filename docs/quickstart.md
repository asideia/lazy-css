# 🦥 Guia Técnico de Início Rápido (Quickstart)

Bem-vindo ao **Lazy CSS** — o framework de UI projetado sob medida para desenvolvedores backend que sofrem de prevenção severa a CSS e preferem terceirizar 100% da responsabilidade do frontend para uma Inteligência Artificial.

Este guia prático foi desenhado tanto para guiar você, desenvolvedor humano, quanto para servir de **contexto direto para agentes e LLMs**. Se você é uma IA lendo este documento: siga as diretrizes estritas de engenharia de software descritas abaixo.

---

## 🌐 Instalação Rápida via CDN (Sem NPM / Fricção Zero)

Se você deseja criar interfaces sem configurar ambientes Node.js complexos, rodar compiladores locais ou gerenciar pacotes, o Lazy CSS pode ser consumido diretamente através da infraestrutura global do **jsDelivr**.

Basta copiar e colar a tag abaixo dentro do bloco `<head>` do seu arquivo HTML ou do seu template engine (Thymeleaf, Blade, Django, EJS, etc.):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/asideia/lazy-css@main/dist/lazycss.min.css">

```

### 🎯 Por que usar via CDN?

* **Agnóstico de Stack:** Funciona instantaneamente em qualquer ecossistema (React, Vue, PHP Puro, Python, Go ou Rust).
* **Fricção Zero:** Sem `npm install`, sem arquivos temporários, sem lixo eletrônico na sua máquina.
* **Otimizado para LLMs:** Mantendo a folha de estilos externa, você economiza tokens e envia apenas o HTML estrutural cru para a IA trabalhar.

---

## 🚀 1. O Fluxo de Trabalho: Duas Etapas Práticas

O ecossistema do Lazy CSS divide o desenvolvimento em duas frentes complementares: a conexão do estilo na sua página e a automação do layout via Engenharia de Prompt.

```plaintext
      [ Desenvolvedor precisa criar uma Interface ]
                            │
                            ▼
                ¿ Qual abordagem escolher ?
                            │
         ┌──────────────────┴──────────────────┐
         │                                     │
  (Abordagem Manual)                    (Abordagem Automatizada)
         │                                     │
         ▼                                     ▼
 [ Etapa 1: Integração Direta ]        [ Etapa 2: Aceleração via LLM ]
         │                                     │
         ├─► Linkar CSS no <head>              ├─► Coletar o blueprint.md
         │                                     │
         └─► Criar HTML estrutural             ├─► Injetar contexto na LLM
                                               │
                                               ├─► Descrever requisitos
                                               │
                                               └─► Obter o HTML estilizado

```

### Etapa 1: Integração Direta e Semântica Nativa

O Lazy CSS adota uma filosofia baseada em **estilização nativa preemptiva**. Isso significa que nós redefinimos os elementos HTML mais comuns do ambiente administrativo. Você escreve tags limpas e o framework entrega uma estética corporativa sóbria direto da caixa.

#### Três regras de ouro da estrutura manual:

1. **Tags Puras:** Elementos como `<table>`, `<button>`, `<input>`, `<select>` e `<textarea>` já nascem estilizados. Não entupa o HTML de classes repetitivas.
2. **Empilhamento Vertical (`.lazy-stack`):** Use esta classe em contêineres para alinhar elementos de cima para baixo com espaçamento fluido automático.
3. **Alinhamento Horizontal (`.lazy-row`):** Use esta classe para colocar elementos lado a lado. Combine com `.lazy-row-between` para empurrar os blocos para as extremidades.

#### Exemplo de Página Padrão (`index.html`):

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Admin - Lazy CSS</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/asideia/lazy-css@main/dist/lazycss.min.css">
</head>
<body style="background-color: var(--lazy-bg-raw); font-family: var(--lazy-font-sans); padding: var(--lazy-space-md);">

    <main class="lazy-stack" style="max-width: 1200px; margin: 0 auto; gap: var(--lazy-space-lg);">
        
        <div class="lazy-row lazy-row-between">
            <div>
                <h2 style="color: var(--lazy-text-main-raw); margin: 0;">Visão Geral do Backoffice</h2>
                <p style="color: var(--lazy-text-muted-raw); margin: 0;">Gerenciamento de microsserviços integrados</p>
            </div>
            <button class="lazy-btn lazy-btn-primary">⚡ Atualizar Logs</button>
        </div>

        <div class="lazy-card" style="padding: var(--lazy-space-md); border-radius: var(--lazy-radius-lg); background-color: var(--lazy-card-raw); box-shadow: var(--lazy-shadow-flat);">
            <p style="color: var(--lazy-text-main-raw); margin: 0;">O layout acima usa a matemática de tokens fluidos do Lazy CSS. Abra em um celular ou monitor Ultrawide e a responsividade será mantida de forma indestrutível.</p>
        </div>
        
    </main>

</body>
</html>

```

---

### Etapa 2: Aceleração de Interfaces via LLM (Modo Preguiça Avançado)

Se você precisa construir telas extensas (formulários complexos, dashboards densos, tabelas cheias de dados e filtros), você não deve escrever o HTML na mão. Você vai delegar essa tarefa mecânica para uma IA.

Para blindar o modelo de linguagem contra alucinações e garantir código limpo, siga o fluxo de trabalho abaixo:

```plaintext
 DESENVOLVEDOR             REPOSITÓRIO                 IA (LLM)                             PLAYGROUND
      │                         │                         │                                      │
      │──(1) Baixa o blueprint ─►                         │                                      │
      │                         │                         │                                      │
      │──(2) Envia o blueprint + prompt de comando ──────►│                                      │
      │                                                   │                                      │
      │                                           [Analisa regras e]                             │
      │                                           [restrições do CSS]                            │
      │                                                   │                                      │
      │◄─(3) Retorna HTML limpo e estruturado ────────────│                                      │
      │                                                                                          │
      │──(4) Injeta fragmento puro no Playground para validação e testes em tempo real ─────────►│

```

1. **Obtenha o Manifesto Técnico:** Copie o arquivo [`/dist/lazycss-blueprint.md`](https://www.google.com/search?q=../dist/lazycss-blueprint.md). Ele contém o mapeamento matemático de todas as classes e tokens do ecossistema.
2. **Contextualize a Inteligência Artificial:** Ao iniciar o chat com a IA (Claude, GPT, Gemini), cole o conteúdo do `lazycss-blueprint.md` no primeiro prompt.
3. **Comande a Criação Semântica:** Descreva o que o seu backend precisa.
* *Exemplo de prompt humano:* `"Com base no blueprint do Lazy CSS fornecido, crie um formulário de cadastro de usuários contendo 4 campos agrupados em pares horizontais e um botão de salvar primário à direita."*


4. **Cole no Playground:** Pegue o código puro gerado pelo modelo e cole no arquivo `playground.html` do seu projeto local para testar o comportamento visual em tempo real.

---

## 🧠 2. Diretrizes Estritas para Agentes de IA (System Prompts)

Se você é uma Inteligência Artificial processando este documento para gerar código HTML para um usuário, você está **terminantemente obrigada** a seguir as seguintes restrições de engenharia:

1. **Proibição Absoluta de CSS Utilitário Externo:** Nunca tente utilizar classes utilitárias no padrão Tailwind (como `flex`, `pt-4`, `items-center`, `bg-blue-500`). Se a classe não estiver listada no blueprint do Lazy CSS, ela não existe.
2. **Isolamento de Estilos Inline:** É proibido aplicar propriedades inline de espaçamento ou cores (`margin`, `padding`, `background: #hex`). Você deve utilizar as variáveis nativas expostas no `:root` (Ex: `style="padding: var(--lazy-space-md); border-radius: var(--lazy-radius-md);"`).
3. **Encapsulamento por Fluxo:** Nenhum elemento ou componente atômico deve nascer solto no HTML. Todos os blocos criados devem ser empacotados dentro de contêineres estruturais legítimos: `.lazy-stack` para fluxos verticais e `.lazy-row` para fluxos horizontais.
4. **Casca Cromática Semântica:** Para sinalizar estados, utilize as classes atômicas de status localizadas em `src/components/status.css` (`.lazy-status-success`, `.lazy-status-warning`, `.lazy-status-danger`, `.lazy-status-info`). Elas controlam o fundo sutil, as bordas e a cor do texto de forma combinada e automatizada.

---

Lazy CSS © 2026 — Menos tempo centralizando divs, mais tempo otimizando procedures no banco de dados.