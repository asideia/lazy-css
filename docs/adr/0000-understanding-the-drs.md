# 📑 0000 - Entendendo os Registros de Decisão de Arquitetura (ADRs)

Este documento serve como o mapa de navegação oficial para o diretório de **Architecture Decision Records (ADRs)** do ecossistema **Lazy CSS**. Ele define o propósito histórico desta pasta, o ciclo de vida de uma decisão técnica e o padrão estrutural que humanos e IAs devem seguir ao propor mudanças arquiteturais.

---

## 1. O que é uma ADR e por que as usamos?

Uma **ADR (Architecture Decision Record)** é um documento curto que captura uma decisão de design de software estrutural significativa, juntamente com seu contexto e suas consequências. 

No **Lazy CSS**, nós documentamos nossas decisões usando ADRs pelas seguintes razões:
* **Memória Técnica Imutável:** Evita que a equipe (ou futuras IAs) reverta decisões tomadas no passado sem entender o contexto técnico e os debates originais.
* **Alinhamento de Contexto para LLMs:** Quando um agente de IA recebe a tarefa de criar um componente ou refatorar o framework, ler a pasta de ADRs fornece a ele a filosofia viva de engenharia do projeto, prevenindo códigos que violem nossos princípios core.
* **Transparência Crítica:** Centraliza o "porquê" de o framework ser construído de determinada forma (ex: a rejeição de *media-queries* ou a adoção de HSL bruto).

---

## 2. O Ciclo de Vida de uma Decisão (Status)

Cada ADR possui um campo de controle chamado `Status`. Uma decisão trafega obrigatoriamente pelos seguintes estados:

* **`Proposed` (Proposta):** A decisão foi escrita e está aberta para debate em um Pull Request. Ainda não afeta o código do core.
* **`Accepted` (Aceita):** A decisão foi homologada pelos mantenedores. O código correspondente já foi ou está sendo integrado à branch principal.
* **`Superseded` (Substituída):** Uma decisão antiga que perdeu a validade porque uma ADR mais recente revisou a arquitetura. Sempre que uma ADR vira *Superseded*, ela deve apontar explicitamente para o número da nova ADR que a substituiu.

---

## 3. Anatomia Padrão de uma ADR (Template Rígido)

Para garantir que o histórico mantenha legibilidade e consistência, todas as ADRs do repositório utilizam estritamente a seguinte estrutura markdown:

```markdown
# [NÚMERO] - [TÍTULO DA DECISÃO EM CAIXA ALTA]

* **Status:** [Proposed | Accepted | Superseded por ADR-XXXX]
* **Data:** [AAAA-MM-DD]
* **Autor:** [Seu Nome ou ID do Agente de IA]

## 1. Contexto (Context)
O cenário tecnológico e o problema de engenharia que estamos tentando resolver. Explica as limitações atuais, dores dos usuários ou gargalos do ecossistema.

## 2. Decisão (Decision)
A solução arquitetural escolhida de forma clara, imperativa e definitiva. Detalha quais arquivos serão afetados, novas classes core criadas e padrões de código impostos.

## 3. Consequências (Consequences)
Os impactos positivos e negativos gerados por esta escolha.
* **Positivas:** Ganhos de performance, facilidade de manutenção, redução de bytes.
* **Negativas / Trade-offs:** Complexidade adicional de compilação, necessidade de refatoração em componentes legados, limitações em navegadores antigos.

```

---

## 4. O Mapa de Navegação Atual

As decisões do Lazy CSS seguem uma numeração cronológica estrita de 4 dígitos (`0001`, `0002`, etc.). Abaixo estão os marcos arquiteturais já pacificados e indexados no nosso repositório:

| ID | Título da Decisão / Marco Arquitetural | Status | Escopo do Impacto |
| --- | --- | --- | --- |
| **0001** | [Adoção de Resiliência Elástica sem Media-Queries](https://www.google.com/search?q=0001-elastic-resilience-without-media-queries.md) | `Accepted` | Layout & Core Estrutural |
| **0002** | [Isolamento de Estado Cromático via HSL Fragmentado](https://www.google.com/search?q=0002-chromatic-isolation-via-raw-hsl.md) | `Accepted` | Design Tokens & Variáveis |
| **0003** | [Governança e Parser JSDoc no Pipeline Node.js](https://www.google.com/search?q=0003-jsdoc-governance-on-node-pipeline.md) | `Accepted` | Automação & IA Blueprint |

---

## 5. Como Contribuir com uma Nova ADR

Se você identificou a necessidade de introduzir uma mudança estrutural profunda no Lazy CSS (ex: adotar uma nova especificação do CSS moderno ou mudar o motor do PostCSS):

1. Crie um arquivo markdown na pasta `docs/adr/` seguindo a próxima numeração livre da sequência (ex: `0004-seu-titulo-aqui.md`).
2. Escreva a proposta utilizando o template da Seção 3 com o status `Proposed`.
3. Abra um Pull Request focado exclusivamente nesta discussão de design de software. Após o debate técnico ser concluído e aprovado pelos mantenedores, o status será alterado para `Accepted` no momento do merge.