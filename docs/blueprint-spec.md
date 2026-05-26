# 📂 Especificação do Manifesto: `lazycss.spec.json`

Este documento define a estrutura de dados, o esquema de propriedades e as regras de contribuição para o arquivo `assets/data/lazycss.spec.json`. Ele atua como a **Única Fonte de Verdade** do projeto, alimentando as interfaces visuais do framework e os modelos de linguagem (LLMs).

---

## 1. Filosofia do Arquivo: Por que um JSON?

Para que o **Lazy CSS** se mantenha atualizado sem redundância, nós não escrevemos documentação estática em HTML. 
O arquivo `lazycss.spec.json` centraliza o comportamento de cada classe. A partir dele, scripts especializados distribuem a informação para suas respectivas páginas:
1. **`renderShowcaseElements.js`**: Consome o JSON para construir e renderizar dinamicamente as tabelas técnicas e os exemplos visuais dentro do `showcase.html`.
2. **`buildLazyCSSBlueprint.js`**: Consome o JSON na página `quickstart.html` para compilar, em tempo de execução, o arquivo Markdown unificado (`lazycss-blueprint.md`) que o usuário injetará no Claude, ChatGPT ou Gemini.

---

## 2. Regra de Ouro de Idioma (Language Split)

* **Chaves, propriedades e dados de código:** Devem ser escritos estritamente em inglês (`en-US`). Isso inclui os seletores CSS, os blocos de código HTML e as chaves estruturais do JSON.
* **Descrições textuais (narrativa):** Devem ser escritas em português (`pt-BR`) para consumo dos contribuidores humanos do repositório. O motor interno do framework converterá ou adaptará o que for necessário para a IA.

---

## 3. Estrutura do Esquema (Schema Definition)

O arquivo é um array de objetos, onde cada objeto representa uma seção lógica e estrutural do framework.

### 3.1. Campos da Categoria (Root Level)

* `category` *(string, en-US)*: Nome legível da seção. Ex: `"Layouts & Structure"`.
* `id` *(string, en-US)*: Identificador único em minúsculas usado para mapeamento lógico internos, âncoras de navegação e indexação de scripts. Ex: `"layouts"`.
* `description` *(string, pt-BR)*: Uma breve explicação do propósito desta categoria, orientando o desenvolvedor sobre o escopo dos elementos contidos nela.
* `blueprint_specs` *(array)*: Lista de objetos contendo as especificações técnicas puras que a IA precisa aprender.
* `sandbox_elements` *(array)*: Lista de componentes HTML montados que servem de demonstração visual e cópia para o usuário no Sandbox.

### 3.2. Estrutura de `blueprint_specs` (O Contrato da IA)

Cada item deste array ensina a IA a usar uma classe específica. Coloque apenas a definição da classe base, e não suas variações visuais de token.

* `class` *(string, en-US)*: O seletor CSS exato com o ponto inicial. Ex: `".lazy-stack"`.
* `context` *(string, en-US)*: O escopo semântico e de aplicação da classe (Veja o detalhamento na Seção 4).
* `description` *(string, pt-BR)*: Instrução cirúrgica e imperativa dizendo exatamente quando a IA deve usar essa classe e o que ela resolve estruturalmente.

### 3.3. Estrutura de `sandbox_elements` (A Vitrine Humana)

Cada item deste array gera um card de testes e um bloco de "Copiar Código" na interface.

* `name` *(string, pt-BR)*: Nome amigável do exemplo. Ex: `"Card de Login Estruturado"`.
* `html` *(string, en-US)*: Bloco de código HTML real usando as classes do framework. Quebras de linha devem ser escapadas com `\n` e aspas duplas internas com `\"`.

---

## 4. O Dicionário de Contextos (`context`)

O campo `context` funciona como uma etiqueta de categoria de engenharia para as LLMs. Ele fornece um norte semântico rígido para que a IA não misture conceitos (como injetar propriedades de posicionamento global dentro de componentes isolados). 

Os valores aceitos são estritamente limitados a quatro opções:

### 4.1. `Layout`
Classes responsáveis exclusivamente pelo **esqueleto**, **posicionamento** e **espaçamento espacial** da interface. 
* **Escopo:** Containers baseados em Flexbox e CSS Grid que gerenciam o fluxo dos elementos filhos e a responsividade intrínseca.
* **Exemplos:** `.lazy-stack`, `.lazy-row`, `.lazy-grid-auto`, `.lazy-layout-dashboard`.
* **Diretriz para a IA:** *Use para ditar a estrutura estrutural da tela. Nunca aplique propriedades visuais como cores de fundo, bordas ou decorações diretamente aqui.*

### 4.2. `Component`
Elementos de interface atômicos, visuais e interativos com os quais o usuário final interage diretamente.
* **Escopo:** Blocos autocontidos que já possuem suas próprias cores, paddings internos, sombras e bordas padrão de fábrica.
* **Exemplos:** `.lazy-btn`, `.lazy-field`, `.lazy-card`, `.lazy-table`.
* **Diretriz para a IA:** *Trate como um bloco visual pronto. Eles são agnósticos de layout (não possuem larguras estáticas ou margens externas fixas). Devem ser envelopados por classes de `Layout` para serem posicionados.*

### 4.3. `Typography`
Classes dedicadas exclusivamente ao controle, peso, legibilidade e hierarquia dos **textos** do ecossistema.
* **Escopo:** Modificadores de tamanho de fonte, pesos de títulos e cores específicas de sinalização textual.
* **Exemplos:** `.lazy-text-lead`, `.lazy-text-main`, `.lazy-text-danger`.
* **Diretriz para a IA:** *Use para formatar e estilizar a escrita contida dentro dos componentes, respeitando rigidamente a hierarquia visual administrativa.*

### 4.4. `Utility`
Classes auxiliares e coringas de comportamento pontual para resolver ajustes cirúrgicos.
* **Escopo:** Modificadores de estado rápidos, travas de scroll, ou regras de visibilidade imediata por dispositivo.
* **Exemplos:** `.lazy-hide-mobile`, `.lazy-scroll-isolated`.
* **Diretriz para a IA:** *Use com moderação extrema e apenas sob demanda específica para contornar cenários onde as classes nativas de `Layout` ou `Component` não resolvem sozinhas.*

---

## 5. Exemplo Prático de Preenchimento

Abaixo está um fragmento com a formatação exata que deve ser seguida:

```json
[
  {
    "category": "Inputs & Forms",
    "id": "forms",
    "description": "Elementos de captura de dados e agrupadores de formulários corporativos.",
    "blueprint_specs": [
      {
        "class": ".lazy-field",
        "context": "Component",
        "description": "Input de texto padronizado. Assume 100% da largura do container automaticamente para garantir comportamento responsivo em dispositivos móveis."
      }
    ],
    "sandbox_elements": [
      {
        "name": "Campo de Texto Simples",
        "html": "<div class=\"lazy-stack\">\n  <label class=\"lazy-text-main\">Username</label>\n  <input type=\"text\" class=\"lazy-field\" placeholder=\"john.doe\">\n</div>"
      }
    ]
  }
]

```

---

## 6. Guia de Contribuição para Desenvolvedores

Se você criou uma nova classe CSS ou aprimorou o comportamento visual do framework, siga estes passos para homologá-la com segurança:

### Passo 1: Respeite a Estrutura de Pastas e a Governança CSS

Antes de tocar no arquivo JSON, garanta que suas implementações de estilo estão no lugar certo dentro de `src/`:

* Se for uma propriedade customizada global, margem base ou paleta de cor pura, deve ser declarada em `src/tokens/variables.css`.
* Se for um comportamento atômico de fluxo (Flexbox) ou esqueleto macrossistema (Grid), deve morar em `src/layouts/`.
* Se for um componente interativo isolado, deve morar em `src/components/`.

### Passo 2: Localize ou Crie a Categoria Correta

Abra o arquivo `assets/data/lazycss.spec.json` e encontre o objeto cujo `id` corresponda ao escopo da sua alteração. Se estiver criando uma categoria nova, adicione um objeto inédito no fim do array, preenchendo obrigatoriamente a propriedade `description` da categoria.

### Passo 3: Adicione a Especificação da IA (`blueprint_specs`)

Selecione o `context` adequado com base nas regras da Seção 4 e escreva uma descrição direta e imperativa. Diga explicitamente o que a classe faz e proíba comportamentos incorretos (ex: proibir o uso de estilos inline adicionais se aquela classe já resolve o espaçamento).

### Passo 4: Adicione o Exemplo Visual (`sandbox_elements`)

Injete o código de teste limpo. Não utilize classes utilitárias de terceiros ou estilos inline complexos no HTML do sandbox, a menos que seja um atributo temporário necessário de layout (como `style="max-width: 400px;"` para evitar que um formulário estique infinitamente na tela widescreen).

### Passo 5: Teste o Fluxo de Scripts Nativos

Abra o seu servidor local e valide as frentes automatizadas:

1. Verifique se o script `renderShowcaseElements.js` processou seu JSON e montou os exemplos no `showcase.html` sem quebrar o layout.
2. Acesse a página `quickstart.html`, clique no botão de gerar o contexto, abra o arquivo `lazycss-blueprint.md` gerado pelo script `buildLazyCSSBlueprint.js` e valide se a sua nova classe e as descrições em inglês estão perfeitamente formatadas para consumo das LLMs.
