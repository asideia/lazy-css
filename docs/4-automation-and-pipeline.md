# 🤖 Automação de Contexto, Pipeline de Compilação e Manifesto Spec

Este documento define a especificação técnica da esteira de automação (pipeline), o esquema de dados do manifesto `assets/data/lazycss.spec.json` e a governança de ferramentas do ecossistema **Lazy CSS**. Este ecossistema atua como a **Única Fonte de Verdade** (Single Source of Truth), alimentando tanto as interfaces de documentação viva quanto os Modelos de Linguagem (LLMs).

---

## 1. Filosofia de IA-Native: O Papel do Manifesto JSON

Para que o Lazy CSS elimine redundâncias e mantenha documentações indestrutíveis, o projeto rejeita a escrita manual de arquivos HTML de documentação. O arquivo `lazycss.spec.json` centraliza as assinaturas, restrições e exemplos do framework. A partir dele, scripts especializados em Node.js distribuem as informações para suas respectivas pontas através do comando unificado `npm run build`:

```plaintext
                    [ assets/data/lazycss.spec.json ]
                                   │
                   ┌───────────────┴───────────────┐
                   ▼                               ▼
     [ assets/scripts/compiler.js ]  [ assets/scripts/render.js ]
                   │                               │
                   ▼                               ▼
       dist/lazycss-blueprint.md           showcase.html
        (Contexto Otimizado para IA)     (Vitrine Viva para Humanos)

```

1. **`renderShowcaseElements.js`**: Motor JavaScript vanilla que consome o JSON para construir, filtrar e renderizar dinamicamente as tabelas técnicas e os blocos de teste em tempo real dentro da página `showcase.html`.
2. **`buildLazyCSSBlueprint.js`**: Compilador Node.js de alta performance que processa o JSON e extrai as assinaturas de código para gerar o arquivo Markdown consolidado (`dist/lazycss-blueprint.md`). Este arquivo é o artefato imutável que desenvolvedores injetam diretamente nas janelas de contexto do Claude, GPT e Gemini.

---

## 2. Regra de Ouro de Idioma (Language Split)

* **Chaves, propriedades e dados de código:** Devem ser mantidos estritamente em inglês (`en-US`). Isso inclui os seletores CSS, os blocos de código HTML, as propriedades do JSON e o campo técnico de contexto para garantir a perfeita interpretação dos tokens de atenção das LLMs de código.
* **Descrições textuais (Narrativa):** Devem ser escritas em português (`pt-BR`) para consumo e manutenção ágil dos desenvolvedores e contribuidores humanos do repositório.

---

## 3. Estrutura do Esquema (Schema Definition)

O arquivo `lazycss.spec.json` é composto por um array de objetos, onde cada nó principal representa uma seção lógica e estrutural do ecossistema visual.

### 3.1. Campos da Categoria (Root Level)

* `category` *(string, en-US)*: Nome legível da seção de design. Ex: `"Layouts & Structure"`.
* `id` *(string, en-US)*: Identificador único em caixa baixa utilizado para indexação lógica de scripts, rotas e âncoras de navegação. Ex: `"layouts"`.
* `description` *(string, pt-BR)*: Explicação macro do propósito da categoria, orientando desenvolvedores sobre o escopo dos elementos.
* `blueprint_specs` *(array)*: Lista de objetos contendo as especificações técnicas e contratos puras que a IA precisa aprender.
* `sandbox_elements` *(array)*: Lista de componentes HTML montados que servem de demonstração e engenharia de *few-shot learning* para cópia na Sandbox.

### 3.2. Estrutura de `blueprint_specs` (O Contrato da IA)

Cada item mapeia uma classe atômica. Deve-se declarar apenas a classe base, omitindo variações numéricas de tokens de tamanho para economizar bytes de contexto.

* `signature` *(string, en-US)*: O seletor CSS exato incluindo o ponto inicial. Ex: `".lazy-stack"`.
* `context` *(string, en-US)*: O escopo semântico e de engenharia da classe (Veja a Seção 4).
* `description` *(string, pt-BR)*: Instrução cirúrgica e imperativa ditando quando a IA deve evocar essa classe e o que ela resolve mecanicamente.

### 3.3. Estrutura de `sandbox_elements` (A Vitrine de Códigos)

Cada item gera um card interativo com a funcionalidade de cópia instantânea de código.

* `name` *(string, pt-BR)*: Nome amigável do exemplo. Ex: `"Formulário de Cadastro Denso"`.
* `html` *(string, en-US)*: Bloco de código HTML real usando as regras do framework. Quebras de linha devem ser escapadas com `\n` e aspas duplas internas com `\"`.

---

## 4. O Dicionário de Contextos Semânticos (`context`)

O campo `context` funciona como uma etiqueta rígida de governança arquitetural para as LLMs. Ele fornece um isolamento conceitual para impedir que a inteligência artificial misture responsabilidades físicas (como tentar aplicar propriedades de espaçamento macro dentro de componentes visuais discretos). Os valores aceitos são limitados a quatro opções exclusivas:

### 4.1. `Layout`

Classes responsáveis exclusivamente pelo **esqueleto**, **posicionamento** e **respiro espacial** da interface.

* **Escopo:** Containers baseados em Flexbox e CSS Grid que controlam o fluxo dos filhos e a responsividade intrínseca.
* **Exemplos:** `.lazy-stack`, `.lazy-row`, `.lazy-grid-auto`.
* **Restrição para a IA:** *Proibido aplicar cores de fundo, bordas ou decorações de texto diretamente aqui. Use apenas para ditar a contenção espacial.*

### 4.2. `Component`

Elementos de interface atômicos, visuais e interativos com os quais o usuário final interage diretamente.

* **Escopo:** Blocos autocontidos que possuem suas próprias cores, paddings internos, sombras e bordas padrão de fábrica.
* **Exemplos:** `.lazy-btn`, `.lazy-field`, `.lazy-card`, `.lazy-table`.
* **Restrição para a IA:** *Trate como um bloco isolado e agnóstico de layout (sem larguras estáticas forçadas ou margens externas fixas). Envolva-os em classes de `Layout` para posicioná-los.*

### 4.3. `Typography`

Classes dedicadas exclusivamente ao controle, peso, legibilidade e hierarquia de **textos**.

* **Escopo:** Modificadores de tamanho de fonte, pesos de títulos corporativos e cores específicas de sinalização textual.
* **Exemplos:** `.lazy-text-lead`, `.lazy-text-main`, `.lazy-text-break`.
* **Restrição para a IA:** *Use estritamente para formatar e estilizar caracteres, respeitando a densidade e a hierarquia visual administrativa.*

### 4.4. `Utility`

Classes auxiliares e coringas de comportamento imediato para resolver ajustes cirúrgicos de comportamento.

* **Escopo:** Modificadores rápidos de estado, travas de scroll de viewports ou regras de visibilidade imediata.
* **Exemplos:** `.lazy-hide-mobile`, `.lazy-table-wrapper`.
* **Restrição para a IA:** *Use com moderação extrema. Evoque apenas quando as classes nativas de `Layout` ou `Component` não forem capazes de solucionar a demanda sozinhas.*

---

## 5. Exemplo Prático de Preenchimento Padronizado

Abaixo está um fragmento com a formatação exata que deve ser seguida no manifesto:

```json
[
  {
    "category": "Inputs & Forms",
    "id": "forms",
    "description": "Elementos de captura de dados e agrupadores de formulários corporativos.",
    "blueprint_specs": [
      {
        "signature": ".lazy-field",
        "context": "Component",
        "description": "Input de texto padronizado. Assume 100% da largura do container automaticamente para garantir comportamento responsivo em dispositivos móveis."
      }
    ],
    "sandbox_elements": [
      {
        "name": "Campo de Texto Simples",
        "html": "<div class=\"lazy-stack lazy-gap-xs\">\n  <label class=\"lazy-text-main\">Username</label>\n  <input type=\"text\" class=\"lazy-field\" placeholder=\"john.doe\">\n</div>"
      }
    ]
  }
]

```

---

## 6. Guia de Contribuição e Validação da Esteira

Se você criou uma nova assinatura de estilo CSS ou adicionou uma classe ao core do framework, siga o protocolo abaixo para integrá-la com segurança:

1. **Persistência de Estilo:** Garanta que o seu código CSS modular foi salvo na pasta correta dentro de `src/` (layouts, tokens ou componentes) seguindo o protocolo de comentários JSDoc.
2. **Atualização do Manifesto:** Abra o arquivo `assets/data/lazycss.spec.json`, localize a categoria correspondente e insira o novo objeto de especificação técnica em `blueprint_specs`, respeitando um dos 4 contextos semânticos da Seção 4.
3. **Injeção do Caso de Teste:** Adicione um exemplo em HTML puro dentro do array `sandbox_elements`, garantindo que todas as aspas duplas internas estejam escapadas corretamente (`\"`).
4. **Disparo da Esteira de Build:** Execute no terminal da raiz o script unificado de compilação:
```bash
npm run build

```


5. **Homologação:** Abra a página `showcase.html` no seu navegador local para garantir que o motor JavaScript renderizou seu componente visual sem quebras. Em seguida, verifique o arquivo `dist/lazycss-blueprint.md` para certificar-se de que o compilador Node.js converteu com sucesso os dados JSON para o formato Markdown que guiará as LLMs.