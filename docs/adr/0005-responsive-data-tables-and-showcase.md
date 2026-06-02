# 📑 0005 - TABELAS DE DADOS RESPONSIVAS E DESCONSTRUÇÃO SEMÂNTICA

* **Status:** Accepted
* **Data:** 2026-06-01
* **Autor:** Engenheiro de Core & IA Agent

---

## 1. Contexto (Context)
A análise de telemetria visual na página `showcase.html` (evidenciada nas imagens `1780276312120.jpeg` e `image_b72060.png`) revelou uma quebra estrutural severa: elementos de tabela convencionais (`<table>`, `thead`, `tbody`, `tr`, `td`) quebram a elasticidade do framework em dispositivos móveis, forçando compressão de texto ilegível ou rolagem horizontal indesejada.

Para manter o princípio de layout indestrutível e garantir que documentações geradas automaticamente por scripts ou consumidas por IAs permaneçam legíveis em qualquer tela, o framework precisa de uma estratégia agnóstica para desconstruir tabelas em blocos empilhados (*cards*) no mobile, sem perder a semântica original do HTML.

---

## 2. Decisão (Decision)
Decidimos introduzir a classe utilitária e estrutural `.lazy-table` no core do framework (`src/components/tables.css`). Esta classe forçará uma quebra de comportamento baseada em visibilidade de blocos (*block level layout switching*) com abordagem Mobile-First estrita:

1. **Comportamento Mobile (Default):** Elementos internos da tabela como `thead` são ocultados visualmente (mantendo acessibilidade por leitores de tela), e cada linha (`tr`) e célula (`td`) é convertida para `display: block`.
2. **Uso de Atributos de Dados (`data-label`):** Para não perder o contexto da coluna no mobile, o CSS usará o pseudo-elemento `:before` injetando dinamicamente o valor de `attr(data-label)`, criando um layout de chave-valor empilhado.
3. **Comportamento Desktop:** A tabela reassume seu comportamento tabular nativo (`display: table`) de forma automática através do gatilho de segurança isolado.

---

## 3. Consequências (Consequences)

### 3.1. Positivas
* **Legibilidade Absoluta:** Tabelas densas de documentação técnica ou relatórios de backoffice mudam de formato sem quebrar o limite da tela física do dispositivo.
* **Manutenção da Semântica:** O desenvolvedor backend ou IA continua escrevendo estruturas limpas de `<table>`, `<tr>` e `<td>`. O comportamento adaptativo é 100% transparente.

### 3.2. Negativas / Trade-offs
* **Exigência de Atributo Auxiliar:** Obriga que o código HTML (ou o script gerador `renderShowcaseElements.js`) inclua o atributo `data-label="..."` em cada tag `<td>` correspondente à sua respectiva coluna.