# 📖 Guia de Operação: Como Lançar uma Nova Release (Release & Deployment Guide)

Este documento estabelece o procedimento padrão para realizar o deploy e a distribuição de uma nova versão do **Lazy CSS**. O processo é totalmente automatizado através do GitHub Actions, focando na compilação e entrega do artefato pronto para produção via CDN (jsDelivr), sem dependência inicial de publicação em gerenciadores de pacotes externos como o NPM.

---

## 1. O Fluxo de Versionamento Semântico (SemVer)

Antes de disparar uma versão, é fundamental determinar qual número alterar no arquivo `package.json`. O projeto adota rigidamente o padrão **Major.Minor.Patch** (ex: `1.4.2`).

* **PATCH (`1.4.X`):** Correções de bugs ou ajustes internos de otimização que não alteram a forma como o usuário consome o framework. *Exemplo: Corrigir um comportamento visual de um componente no Safari ou ajustar uma margem fluida dentro do arquivo `src/layouts/structure.css`.*
* **MINOR (`1.X.0`):** Adição de novas funcionalidades, novas classes utilitárias ou novos componentes visuais sem quebrar a retrocompatibilidade do código antigo. *Exemplo: Criar a classe `.lazy-badge` ou adicionar suporte a um novo esqueleto macro-estrutural na pasta `src/layouts/page-grid.css`.*
* **MAJOR (`X.0.0`):** Mudanças estruturais críticas de arquitetura que quebram a compatibilidade com projetos antigos. *Exemplo: Alterar o prefixo padrão de `.lazy-` para qualquer outra convenção, ou remover chaves estruturais obrigatórias do arquivo `assets/data/lazycss.spec.json`.*

---

## 2. Passo a Passo para o Lançamento (Release Step-by-Step)

Siga rigorosamente esta sequência de comandos no terminal de sua máquina local, garantindo que a sua branch principal (`main`) esteja completamente atualizada com o servidor remoto.

### Passo 1: Atualizar os Arquivos Locais e a Versão do Manifesto
Abra o arquivo `package.json` na raiz do projeto e certifique-se de que a propriedade `"version"` reflete o exato número da nova versão que você deseja lançar:

```json
"version": "1.0.1",
```

Adicione as alterações no stage do Git, realize o commit contendo a mensagem de rastreabilidade e envie para a branch principal:

```Bash
git add .
git commit -m "chore: bump version to 1.0.1 and update ecosystem specs"
git push origin main
```
### Passo 2: Criar a Tag de Versão Anotada
As tags anotadas (-a) são obrigatórias porque o pipeline do GitHub Actions as utiliza para extrair os metadados do deploy e gerar as notas de lançamento de forma automatizada. O identificador da tag deve começar obrigatoriamente com a letra v.

```Bash
# Substitua o "v1.0.1" pela numeração correta da sua entrega
git tag -a v1.0.1 -m "Release v1.0.1 - Implementing robust responsive data tables"
```

### Passo 3: Disparar o Pipeline (Push da Tag)
A esteira de CI/CD está configurada para ignorar commits comuns e só acordar quando um evento de push de tag interceptar o padrão v*. Envie a tag ao servidor através do comando:

```Bash
git push origin v1.0.1
```
## 3. O que acontece nos bastidores? (CI/CD Pipeline Workflow)
Assim que o comando git push origin v* é interpretado pelo ecossistema do GitHub, a esteira configurada em .github/workflows/release.yml assume o controle de forma automatizada:

```Plaintext
       [ Local Terminal ]  ───►  git push origin v1.0.1
                                         │
                                         ▼
                         ┌───────────────────────────┐
                         │   GitHub Actions Worker   │
                         └─────────────┬─────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
 ┌───────────────────────────┐                 ┌───────────────────────────┐
 │ 1. CSS Compilation Job    │                 │ 2. CDN & Release Deploy   │
 │ • Boots Linux Environment │                 │ • Generates GitHub Release│
 │ • Runs 'npm run build'    │                 │ • Attaches lazycss.min.css│
 │ • Optimizes via PostCSS   │                 │ • Ready for jsDelivr Edge │
 └───────────────────────────┘                 └───────────────────────────┘
```

## 4. Checklist de Validação Pós-Release
Após um intervalo de 2 a 3 minutos do disparo da tag, valide se a distribuição global ocorreu com sucesso checando os seguintes canais oficiais:

1. Aba Actions: Acesse o repositório no GitHub, clique na aba Actions e verifique se a execução do fluxo terminou com o ícone verde de sucesso (✓).
2. Aba Releases: Verifique se uma nova Release com o nome da sua tag foi injetada no menu lateral direito do GitHub. Certifique-se de que o arquivo final de produção lazycss.min.css está devidamente anexado na seção de Assets para backup ou download manual se necessário.
3. Disponibilidade na CDN: Abra uma janela anônima no seu navegador e tente acessar a URL do jsDelivr para garantir que o arquivo de distribuição está público e disponível para consumo externo instantâneo:

```Plaintext
[https://cdn.jsdelivr.net/gh/asideia/lazy-css@v1.0.1/dist/lazycss.min.css](https://cdn.jsdelivr.net/gh/asideia/lazy-css@v1.0.1/dist/lazycss.min.css)
```

# ⚠️ Resolução de Problemas (Troubleshooting)
* O pipeline não disparou após o push: Certifique-se de que a tag local foi criada usando o prefixo v minúsculo e que você utilizou o comando explícito git push origin v1.0.1. O comando git push tradicional envia apenas commits estruturais, deixando as tags locais intocadas.
* O arquivo não atualizou na CDN: O jsDelivr possui um cache agressivo em suas bordas de distribuição. Se você precisar forçar a atualização para testar uma correção emergencial, você pode usar a API de purga do provedor acessando:

```Plaintext
https://purge.jsdelivr.net/gh/asideia/lazy-css@v1.0.1/dist/lazycss.min.css.
```
