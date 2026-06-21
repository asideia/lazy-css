# 📑 0007 - ZERO-CLASS SEMANTIC PRESETS

* **Status:** Accepted
* **Data:** 2026-06-21
* **Autor:** Core Architecture Team

---

## 1. Contexto (Context)
A análise de código em ambientes de homologação revelou uma tendência inflacionária no uso de atributos `style=""` inline e classes utilitárias repetitivas por parte dos utilizadores e das Inteligências Artificiais para reestruturar elementos básicos (como centralização de viewports, larguras máximas de `1200px`, paddings fluidos e margens macro). 

Forçar a IA a injetar repetidamente regras como `style="max-width: 1200px; margin: 0 auto;"` viola diretamente o princípio central do framework: ser genuinamente **Lazy** (mínima fricção, máxima legibilidade). O ecossistema necessita de uma camada base inteligente que estilize as tags nativas do HTML logo após a importação, tornando as classes utilitárias opcionais e exclusivas para customizações avançadas.

---

## 2. Decisão (Decision)
Decidimos implementar uma camada de **Presets Semânticos Universais** (Zero-Class Architecture) acoplada ao ficheiro de inicialização (`src/base/reset.css` ou equivalente estrutural). 

A partir desta diretiva, as seguintes tags HTML brutas passam a herdar comportamentos responsivos e estéticos automáticos, baseados estritamente nos nossos design tokens elásticos e no padrão de inversão cromática:

1. **`body`**: Assume automaticamente a cor de fundo (`--lazy-bg-raw`), a cor de texto principal (`--lazy-text-main-raw`) e a pilha de tipografia do sistema operacional, eliminando a necessidade de classes de reset na raiz.
2. **`main`**: Atua como o contêiner estrutural macro padrão do projeto. Assume automaticamente `max-width: 1140px`, centralização horizontal (`margin: 0 auto`) e paddings adaptativos fluidos via `clamp()`.
3. **`section`**: Assume comportamento de empilhamento vertical elástico (`display: flex; flex-direction: column;`) com um gap fluido entre os elementos filhos e margem de respiro inferior.
4. **`h1, h2, h3, p`**: Adotam proporções tipográficas calculadas com `clamp()` e limitadores de tamanho de linha ergonómicos (`max-width: 65ch` para parágrafos), garantindo uma experiência de leitura premium em qualquer dispositivo sem qualquer configuração manual.
5. **`button`**: Assume por padrão o formato de um elemento de conversão (CTA) estilizado com a cor primária (`--lazy-primary-raw`), cantos arredondados institucionais e transições suaves de estado (hover/active).

---

## 3. Consequências (Consequences)

### 3.1. Positivas
* **Prototipagem Instantânea:** O desenvolvedor pode estruturar uma Landing Page ou MVP usando apenas HTML semântico puro e o resultado visual será imediatamente agradável, limpo e profissional.
* **Redução Drástica de Tokens para IAs:** Ao omitir a necessidade de injetar regras estruturais óbvias em cada tag, o volume de código gerado pelas LLMs diminui drasticamente, economizando tokens de contexto e prevenindo alucinações de layout.
* **Liberdade de Sobrescrita:** Caso o utilizador necessite de um comportamento desalinhado do padrão (ex: um botão destrutivo ou uma seção de largura total), basta aplicar as classes específicas do framework (ex: `.lazy-btn-danger`) ou regras locais para que a cascata nativa do CSS resolva a especificidade.

### 3.2. Negativas
* **Maior Especificidade Base:** Estilizar tags diretamente na camada raiz exige que modificadores específicos utilizem seletores claros para sobreporem os estilos globais sem gerar conflitos indesejados.