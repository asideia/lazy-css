# 🦥 LazyCSS

### *O framework de UI para desenvolvedores Backend que sofrem de alergia severa a CSS e preferem terceirizar a culpa do frontend para uma LLM.*

**LazyCSS** é um micro-framework estrutural e intencionalmente rígido, projetado sob medida para engenheiros de software, DBAs e escavadores de dados que consideram `padding` um mistério da humanidade. Em vez de forçar você a decorar 450 classes utilitárias para centralizar um único botão ou passar horas brigando com o `flex-direction`, o LazyCSS fornece blocos de concreto macro-estruturais (`.lazy-stack`, `.lazy-grid-auto`, `.lazy-layout-dashboard`) **100% otimizados para a inteligência artificial (LLMs)** ler e entender sem reclamar.

Com o LazyCSS, você não encosta no CSS. Você apenas esfrega o nosso blueprint na cara do ChatGPT, Claude ou Gemini, programa sua lógica de negócio linda no backend e deixa a IA se virar para entregar um HTML que não quebra se o usuário respirar perto da tela.

---

## 🎯 A Filosofia (Ou nossas desculpas oficiais)

1. **Backend-First (e único):** Sem microgerenciamento de bordas, sombras ou tons pastéis. Os componentes padrão vêm com uma cara decente e corporativa de fábrica. Se o cliente quiser degradê piscante, ele que contrate um designer.
2. **Arquitetura LLM-Optimal:** Nomes previsíveis e sem pegadinhas. Uma IA consegue deduzir a estrutura inteira do seu sistema sem sofrer alucinações e sem inventar classes que não existem.
3. **Macro sobre Micro:** Focamos em tabelas densas cheias de dados, relatórios, formulários que não estouram o container e layouts de dashboard prontos. Animações fluidas de 60fps que se danem.
4. **Engenharia Dinâmica de Cores:** Usamos tokens HSL puros (`--lazy-primary-raw`). Você muda a cor do sistema inteiro trocando um único número matemático. Se você odeia a paleta de cores atual, basta alterar o algorítmo.

---

## 📂 Arquitetura do Projeto

```text
lazy-css/
├── .github/workflows/
│   └── release.yml        # A esteira de CI/CD que faz o trabalho duro por você
├── .vscode/               # Preferências salvas para seu VS Code não estragar a indentação
├── assets/
│   ├── components.json    # A Fonte Única da Verdade (Onde você adiciona coisas sem programar)
│   └── playground.js      # O motor JS que impede a documentação de ficar desatualizada
├── dist/                  # Onde mora o CSS cuspido e compactado pelo compilador
│   └── lazy.min.css       # O único arquivo que realmente importa pro seu HTML bruto
├── docs/                  # Manuais para humanos (ou IAs muito avançadas)
│   └── release-guide.md   # Como gerar uma nova versão sem quebrar a esteira de CI/CD
├── src/                   # Onde o CSS modular finge que é uma linguagem de gente grande
│   ├── tokens/
│   │   └── variables.css  # Variáveis mágicas e matemática pura de espaçamento
│   ├── base/
│   │   └── reset.css      # Onde a gente tenta convencer os navegadores a cooperarem
│   ├── layouts/
│   │   ├── structure.css  # Alinhamentos em linha e em pilha (Flexbox de sobrevivência)
│   │   └── page-grid.css  # Telas de dashboard inteiras que não quebram por nada
│   ├── components/
│   │   └── components.css # Botões, inputs e tabelas (O básico para o sistema funcionar)
│   └── lazy.css           # O arquivo mestre que junta a bagunça toda via PostCSS
├── index.html             # O Playground Interativo (Para você testar se ficou bonito)
├── package.json           # Onde ficam guardados os scripts que você sempre esquece o comando
└── postcss.config.js      # A receita de bolo que faz o PostCSS minificar tudo

```

---

## ⚙️ Começo Rápido (Para quem tem pressa)

### 1. Instalar as tralhas

Clone o repositório e baixe o ecossistema do Node que vai inflar sua pasta local:

```bash
npm install

```

### 2. Deixar o robô trabalhando (Watch Mode)

Inicie o monitoramento. Sempre que você alterar um arquivo CSS na pasta `src/`, o script compila tudo em background em menos tempo do que leva para seu café esfriar:

```bash
npm run watch

```

### 3. Abrir o Playground

Abra o arquivo `index.html` usando um servidor local (como a extensão **Live Server** do VS Code) para que o navegador não bloqueie o JavaScript com erros de CORS. Fique de olho no badge no topo da página:

* `Modo: 🛠️ AI-Prompting Ativo`: Tudo certo! O CSS carregou e você está pronto para programar.
* `Modo: ⚠️ AI-Prompting Offline`: O CSS sumiu, quebrou ou você esqueceu de rodar o comando do Passo 2. Volte duas casas.

---

## 🤖 O Blueprint para IA (Copia, cola e reza)

Quando for pedir para uma inteligência artificial desenhar uma tela para você, não tente explicar o design. **Copie o bloco abaixo, cole no início do prompt e assista ao milagre:**

```markdown
[CONTEXTO: UI Framework LazyCSS]
Utilize as especificações técnicas de classes e responsividade contidas no arquivo/link 'lazycss-blueprint.md' anexado para realizar a tarefa abaixo.

TAREFA:
Preciso que você gere o HTML/JSX para uma tela de [EXEMPLO: Listagem de Clientes com Filtros e uma Tabela Corporativa].

REGRAS DE EXECUÇÃO:
1. Siga estritamente as Cláusulas Críticas do blueprint anexado (Sem estilos inline, sem CSS customizado).
2. Garanta o comportamento responsivo combinando as classes estruturais de linha (.lazy-row) e grelha (.lazy-grid-auto).
3. Responda APENAS com o bloco de código limpo, sem introduções ou explicações textuais sobre o design.

```

---

## 🚀 Pipeline de CI/CD (Deploy sem passar nervoso)

O projeto conta com um sistema de automação no **GitHub Actions** (`.github/workflows/release.yml`) para que você não precise gerar arquivos de produção na sua máquina como se estivesse em 2005.

### Como lançar uma nova versão sem estragar o dia de ninguém:

1. Vá no `package.json` e mude o número da versão (ex: de `1.0.3` para `1.0.4`).
2. Dê o commit padrão nas suas alterações de código.
3. Crie uma tag Git que obrigatoriamente comece com a letra `v`:
```bash
git tag -a v1.0.4 -m "Release v1.0.4 - Ajustando o gap do lazy-stack para caber mais inputs"

```


4. Empurre a tag para o GitHub:
```bash
git push origin v1.0.4

```



A partir daí, os servidores do GitHub acordam, geram o `lazy.min.css` otimizado, criam uma **GitHub Release** com o arquivo pronto para download e jogam o pacote direto no **NPM Registry** para você poder dar `npm install` no seu próximo projeto. Você só precisa olhar o painel ficar verde.

---

## 🤝 Governança e Contribuição

* Se envolve alinhamento de página ou macro-grid, coloque em `src/layouts/`.
* Se for um componente isolado (botão, input, tag), coloque em `src/components/` e use sempre o prefixo `.lazy-*`.
* Se criou um componente novo legal, adicione o objeto estruturado dele dentro de `assets/components.json` para que o playground se atualize sozinho. Não nos faça ter que abrir o HTML para mexer em documentação estática.
* Manuais sérios e sem piadas devem ser mantidos na pasta `docs/`.

---

LazyCSS © 2026 — Desenvolvido por e para desenvolvedores que preferem passar 4 horas otimizando uma query SQL complexa a gastar 5 minutos centralizando uma imagem na tela.
