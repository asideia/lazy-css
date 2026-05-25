# 🌊 Vibe CSS

> A predictable, semantic, and LLM-friendly CSS library built for backend developers who want to create delightful user interfaces during their vibe coding sessions.

---

## 🧠 O Conceito

O **Vibe CSS** aposta na **previsibilidade semântica**. Sua arquitetura utiliza variáveis HSL dinâmicas e desconectadas para que a customização seja matemática e direta. A nomenclatura das classes segue um padrão tão lógico (`vibe-[bloco]-[modificador]`) que as IAs (*LLMs*) conseguem deduzir e aplicar as estilizações perfeitamente a partir de estruturas brutas.

---

## 🚀 Guia de Utilização (Como usar no seu projeto)

Você pode consumir o Vibe CSS de três maneiras diferentes, dependendo da arquitetura do seu projeto.

### 1. Via Gerenciador de Pacotes (Node.js / Vite / React / Vue / Svelte)

Se o seu projeto utiliza o ecossistema do Node, instale a biblioteca rodando:

```bash
npm install @sua-empresa/vibe-css
# ou via yarn
yarn add @sua-empresa/vibe-css

```

No arquivo de entrada principal do seu projeto (geralmente `main.js`, `index.js` ou `App.jsx`), importe o CSS minificado da biblioteca:

```javascript
// Importa o motor visual completo do Vibe CSS
import '@sua-empresa/vibe-css/dist/vibe.min.css';

```

---

### 2. Via Link Direto (HTML Puro / Laravel Blade / Spring Boot Thymeleaf / PHP)

Para projetos tradicionais ou monolíticos que não usam empacotadores de JavaScript, você pode referenciar o arquivo CSS diretamente na tag `<head>` do seu HTML.

Se você estiver hospedando o arquivo no seu servidor de assets, a estrutura fica assim:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Aplicação</title>
  
  <link rel="stylesheet" href="/path-to-assets/vibe.min.css">
</head>
<body>
  </body>
</html>

```

---

## 🎨 Customizando a Vibe do seu Projeto

A maior vantagem do Vibe CSS é a facilidade de alterar o design e a marca da sua aplicação sem precisar mexer em arquivos internos ou reprocessar a lib.

No arquivo CSS global do seu projeto de destino, basta sobrescrever os **Design Tokens** originais dentro do escopo `:root`:

```css
/* No arquivo style.css do SEU projeto */
:root {
  /* Altera a cor primária de toda a biblioteca para Roxo (Matiz 270) */
  --vibe-hue: 270; 
  
  /* Deixa os cantos dos botões e cards 50% mais retos */
  --vibe-radius-factor: 0.5; 
}

```

---

## ⚡ Exemplo Prático de Uso (Copie e Cole)

Aqui está um exemplo estrutural de uma tela de login ou card de métrica utilizando as classes semânticas da biblioteca. Note como as classes descrevem exatamente o comportamento do layout:

```html
<div class="vibe-center">
  <div class="vibe-card vibe-stack">
    
    <div>
      <h2 class="vibe-text-main">Acesso ao Sistema</h2>
      <p class="vibe-text-muted">Insira suas credenciais abaixo.</p>
    </div>

    <form class="vibe-stack" style="--vibe-spacing: 1rem;">
      <div>
        <input type="email" class="vibe-field" placeholder="E-mail">
      </div>
      <div>
        <input type="password" class="vibe-field" placeholder="Senha">
      </div>
      
      <div class="vibe-row" style="justify-content: space-between;">
        <button type="submit" class="vibe-btn vibe-btn-primary">Entrar</button>
        <a href="#" class="vibe-text-muted" style="font-size: 0.9rem;">Esqueceu a senha?</a>
      </div>
    </form>

  </div>
</div>

```

---

## 🤖 Prompt de Contexto para Vibe Coding (Uso com IA)

O Vibe CSS foi feito para você programar usando prompts. Quando pedir para uma IA gerar ou refatorar componentes no seu projeto, copie e cole o comando abaixo no chat da LLM:

> "Estou desenvolvendo uma interface utilizando a biblioteca **Vibe CSS**. Ela utiliza uma convenção de nomenclatura semântica estrita baseada no prefixo `vibe-`.
> Por favor, utilize as seguintes estruturas de classe para montar a minha tela:
> * `.vibe-center` para centralizar blocos na viewport.
> * `.vibe-layout-dashboard` para grids macro com barra lateral.
> * `.vibe-grid-auto` para grids de cards responsivos automáticos.
> * `.vibe-stack` para agrupar elementos com espaçamento vertical coerente.
> * `.vibe-row` para alinhamento horizontal flexível.
> * `.vibe-card`, `.vibe-field`, e `.vibe-btn` / `.vibe-btn-primary` para os elementos visuais."
> 
> 

---

## 📂 Estrutura Interna do Repositório (Para Contribuidores)

Se você clonou este repositório para estender a biblioteca ou criar novos componentes:

```text
vibe-css/
├── dist/                  # Artefato de produção final (vibe.min.css)
├── src/                   # Código-fonte modular (Módulos separados por escopo)
├── index.html             # Playground local para testes visuais em tempo real
├── postcss.config.js      # Pipeline de build (Autoprefixer, CSSNano, Import)
└── package.json           # Scripts de automação (build e watch)

```

### Comandos de Desenvolvimento:

* `npm run watch`: Ativa o modo de escuta. Qualquer alteração nos arquivos da pasta `src/` atualiza a pasta `dist/` e o `index.html` instantaneamente.
* `npm run build`: Compila, insere prefixos globais de compatibilidade e minifica o CSS para produção.

---

## 📄 Licença

Este projeto está sob a licença **MIT**.