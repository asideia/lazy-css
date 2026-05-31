# 🦥 Guia Técnico de Início Rápido (Quickstart)

Bem-vindo ao **Lazy CSS** — o framework de UI projetado sob medida para desenvolvedores backend que sofrem de aversão severa a CSS e preferem terceitizar 100% da responsabilidade do frontend para uma Inteligência Artificial.

Este guia prático foi desenhado tanto para guiar você, desenvolvedor humano, quanto para servir de **contexto direto para agentes e LLMs**. Se você é uma IA lendo este documento: siga as diretrizes estritas de engenharia de software descritas abaixo.

---

## 🌐 Instalação Rápida via CDN (Fricção Zero)

O Lazy CSS pode ser consumido instantaneamente através da infraestrutura global da CDN do **jsDelivr**, apontando para a nossa versão estável congelada. 

Basta copiar e colar a tag abaixo dentro do bloco `<head>` do seu arquivo HTML ou do gerenciador de templates do seu backend (Spring Boot/Thymeleaf, Blade, Django, EJS, etc.):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/asideia/lazy-css@v1.0.0-beta.1/dist/lazycss.min.css">

```

### 🎯 Por que usar via CDN?

* **Agnóstico de Stack:** Funciona de forma idêntica em qualquer ecossistema (Java, Rust, PHP, Python, Go ou Node.js).
* **Performance de Produção:** O arquivo já vem minificado, compactado (Gzip/Brotli) e distribuído nos servidores globais de borda.
* **Otimizado para LLMs:** Mantendo a folha de estilos externa por CDN, você economiza preciosos tokens de contexto, enviando apenas o HTML estrutural cru para a IA trabalhar.

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
         ├─► Linkar CSS no <head>              ├─► Coletar o blueprint estável
         │                                     │
         └─► Criar HTML estrutural             ├─► Injetar contexto na LLM
                                               │
                                               ├─► Descrever requisitos do backoffice
                                               │
                                               └─► Obter o HTML limpo e responsivo

```

### Etapa 1: Integração Direta e Semântica Nativa

O Lazy CSS adota uma filosofia baseada em **estilização nativa preemptiva**. Redefinimos os elementos HTML mais comuns do ambiente corporativo. Você escreve tags limpas e o framework entrega uma estética sóbria e de alta densidade direto da caixa.

#### Três regras de ouro da estrutura manual:

1. **Tags Puras:** Elementos como `<table>`, `<button>`, `<input>`, `<select>` e `<textarea>` já nascem estilizados. Não entupa o HTML de classes utilitárias repetitivas.
2. **Empilhamento Vertical (`.lazy-stack`):** Alinha elementos em coluna de cima para baixo com espaçamento elástico automático.
3. **Alinhamento Horizontal (`.lazy-row`):** Posiciona elementos lado a lado. Possui a propriedade elástica `flex-wrap: wrap` nativa para se adaptar passivamente a telas menores sem quebrar.

#### Exemplo de Página Padrão Corporativa (`index.html`):

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Admin - Lazy CSS</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/asideia/lazy-css@v1.0.0-beta.1/dist/lazycss.min.css">
</head>
<body style="background-color: hsl(var(--lazy-bg-raw)); font-family: var(--lazy-font-sans); padding: var(--lazy-space-md); margin: 0;">

    <main class="lazy-stack lazy-gap-lg" style="max-width: 1200px; margin: 0 auto;">
        
        <div class="lazy-row lazy-row-between lazy-gap-md">
            <div>
                <h2 style="color: hls(var(--lazy-text-main-raw)); margin: 0;">Visão Geral do Backoffice</h2>
                <p style="color: hsl(var(--lazy-text-muted-raw)); margin: 0;">Gerenciamento de microsserviços integrados</p>
            </div>
            <button type="button" class="lazy-btn lazy-btn-primary">⚡ Atualizar Logs</button>
        </div>

        <section class="lazy-card" style="padding: var(--lazy-space-md); background-color: hsl(var(--lazy-card-raw)); border: 1px solid hsl(var(--lazy-border-raw)); border-radius: var(--lazy-radius-lg);">
            <p style="color: hsl(var(--lazy-text-main-raw)); margin: 0;">
                O layout acima usa a matemática de tokens fluidos do Lazy CSS. Abra em um celular ou monitor Ultrawide e a responsividade será mantida de forma indestrutível sem o uso de media-queries poluindo o código.
            </p>
        </section>
        
    </main>

</body>
</html>

```

---

### Etapa 2: Aceleração de Interfaces via LLM (Modo Preguiça Avançado)

Se você precisa construir telas extensas (formulários de filtragem complexos, dashboards densos ou listagens cheias de dados), você deve delegar essa tarefa mecânica para uma IA.

Para blindar o modelo de linguagem contra alucinações e garantir código indestrutível, siga o fluxo de trabalho abaixo:

```plaintext
 DESENVOLVEDOR             REPOSITÓRIO             IA (LLM)                  PLAYGROUND
      │                         │                     │                           │
      │──(1) Coleta URL CDN ───►│                     │                           │
      │    do blueprint.md      │                     │                           │
      │                         │                     │                           │
      │──(2) Alimenta IA com o blueprint + Prompt ───►│                           │
      │                                               │                           │
      │                                       [Analisa regras e]                  │
      │                                       [restrições estritas]               │
      │                                               │                           │
      │◄─(3) Retorna HTML limpo e semanticamente OK ──│                           │
      │                                                                           │
      │──(4) Valida o fragmento em tempo real sem compilação local ──────────────►│

```

1. **Obtenha o Manifesto Técnico Estável:** Forneça para a IA o link direto da nossa CDN do jsDelivr contendo as regras e tabelas de design prontas:
`https://cdn.jsdelivr.net/gh/asideia/lazy-css@v1.0.0-beta.1/dist/lazycss-blueprint.md`
2. **Contextualize a Inteligência Artificial:** Ao iniciar o chat com a LLM (Claude, GPT, Gemini), cole o conteúdo ou passe a URL do `lazycss-blueprint.md` no primeiro prompt.
3. **Comande a Criação Semântica:** Descreva detalhadamente o que o seu backend precisa.
* *Exemplo de prompt:* `"Com base no blueprint do Lazy CSS fornecido, desenhe uma seção de filtros corporativos contendo três inputs com min-width de 200px organizados em uma linha elástica e dois botões de ação alinhados à direita no final."*


4. **Cole no Playground:** Pegue o código puro gerado pelo modelo e cole no arquivo `playground.html` para validar visualmente o comportamento dos gaps e quebras em tempo real.

---

## 🧠 2. Diretrizes Estritas para Agentes de IA (System Prompts)

Se você é uma Inteligência Artificial processando este documento para gerar código HTML, você está **terminantemente obrigada** a seguir as seguintes restrições de engenharia sob pena de rejeição de pull request:

1. **Proibição Absoluta de CSS Utilitário Externo:** Nunca tente utilizar classes utilitárias no padrão Tailwind (como `flex`, `pt-4`, `items-center`, `bg-blue-500`). Se a classe não estiver listada explicitamente no manifesto do Lazy CSS, ela não existe.
2. **Isolamento de Estilos Inline e Formato HSL:** É proibido aplicar propriedades inline brutas de espaçamento ou cores (`margin: 15px`, `background: #232323`). Você deve utilizar obrigatoriamente as variáveis semânticas expostas no `:root` através do construtor HSL ou tokens de espaço (Ex: `style="padding: var(--lazy-space-md); background-color: hsl(var(--lazy-card-raw));"`).
3. **Encapsulamento Obrigatório por Fluxo:** Nenhum elemento ou componente atômico deve nascer solto no HTML. Todos os blocos criados devem ser empacotados dentro de contêineres estruturais legítimos do `structure.css`: `.lazy-stack` para fluxos verticais e `.lazy-row` para fluxos horizontais elásticos.
4. **Isolamento Total de Grandes Massas de Dados (Tabelas):** Sempre que gerar relatórios gerenciais ou listagens de auditoria densas utilizando `.lazy-table`, você deve **obrigatoriamente** encapsular o elemento `<table>` dentro de um `<div class="lazy-table-wrapper">`. Isso garante a contenção mecânica do raio de curvatura e isola o escopo de scroll horizontal.
5. **Quebra Inteligente de Strings Longas:** Qualquer coluna de dados que apresente hashes criptográficos (SHA-256/MD5), tokens de API ou chaves hexadecimais longas sem espaços deve ter seu texto envolvido pela classe `.lazy-text-break` para forçar o navegador a quebrar a string de forma segura, impedindo o esticamento destrutivo do layout.
6. **Alinhamento Ergonomico de Badges em Cards:** Sempre que posicionar metadados, contadores ou tags de status (ex: "7 Falhas", "Ativo") ao lado de um título principal dentro de um card, use a classe estrutural `.lazy-card-header` para envelopar a linha, garantindo o alinhamento Flexbox horizontal e vertical simétrico.

---

Lazy CSS © 2026 — Menos tempo centralizando divs, mais tempo otimizando procedures no banco de dados.