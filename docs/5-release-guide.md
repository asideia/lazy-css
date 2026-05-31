# 📖 Guia de Operação: Protocolo de Code Freeze, Tags e Lançamento de Releases

Este documento estabelece o procedimento padrão para realizar o deploy, o congelamento de código (*Code Freeze*) e a distribuição de uma nova versão do **Lazy CSS**. O processo é totalmente automatizado através do GitHub Actions, focando na compilação, geração do blueprint de IA e entrega do artefato pronto para produção via CDN global do **jsDelivr**, garantindo fricção zero e alta performance.

---

## 1. O Fluxo de Versionamento Semântico (SemVer) e Pré-Releases

O projeto adota rigidamente o padrão **Major.Minor.Patch** (ex: `1.0.0`). Adicionalmente, para ciclos de homologação e testes em ambientes satélites, o ecossistema adota o sufixo de pré-release semântico (`-beta.X`).

* **PATCH (`1.0.X`):** Correções de bugs (*hotfixes*) ou ajustes de otimização interna que não alteram a forma como o usuário ou a IA consomem o framework. *Exemplo: Corrigir o colapso visual de uma linha elástica ou ajustar uma variável de opacidade HSL raw.*
* **MINOR (`1.X.0`):** Adição de novas funcionalidades, novas assinaturas de classes ou novos componentes visuais sem quebrar a retrocompatibilidade do código existente. *Exemplo: Criar o módulo isolado de tabelas densas ou adicionar a classe `.lazy-text-break`.*
* **MAJOR (`X.0.0`):** Mudanças estruturais profundas de arquitetura que quebram a compatibilidade com projetos antigos ou alteram o interpretador do pipeline. *Exemplo: Renomear ou remover chaves obrigatórias do manifesto `assets/data/lazycss.spec.json`.*
* **BETA (`1.0.0-beta.X`):** Versão de congelamento temporário utilizada para validar a distribuição global na CDN e realizar testes reais em ambientes de homologação antes do lançamento da versão estável final.

---

## 2. O Protocolo de Lançamento Passo a Passo

Siga rigorosamente esta sequência de engenharia no terminal da sua máquina local, garantindo que a sua branch principal (`main`) esteja completamente limpa, testada e sincronizada com o servidor remoto.

### Passo 1: Executar o Code Freeze e Atualizar o Manifesto
Antes de gerar a tag, você deve congelar o código disparando o build local. Isso garante que os metadados do parser Node.js e o minificador PostCSS geraram artefatos idênticos e válidos:

```bash
npm run build

```

Abra o arquivo `package.json` na raiz do projeto e certifique-se de que a propriedade `"version"` reflete o exato número da nova entrega que você deseja lançar (estável ou beta):

```json
"version": "1.0.0-beta.1",

```

Adicione todas as alterações de build compiladas e o incremento de versão ao stage do Git, realize o commit de governança e envie para a branch principal:

```bash
git add .
git commit -m "chore: code freeze v1.0.0-beta.1 and ecosystem specs update"
git push origin main

```

### Passo 2: Criar a Tag de Versão Anotada

As tags anotadas (`-a`) são **obrigatórias** porque o pipeline do GitHub Actions utiliza seus metadados e mensagens para registrar o autor do deploy e gerar as notas de lançamento de forma automatizada. O identificador da tag deve começar obrigatoriamente com a letra `v` minúscula.

```bash
# Substitua pela numeração correta do seu ciclo (estável ou pré-release)
git tag -a v1.0.0-beta.1 -m "Release v1.0.0-beta.1 - Core elastic layout, dense tables, and AI blueprint"

```

### Passo 3: Disparar o Pipeline (Push da Tag)

A esteira de CI/CD ignora commits comuns na `main` para fins de deploy e só acorda quando um evento de push de tag interceptar o padrão estrutural `v*`. Envie a tag ao servidor através do comando:

```bash
git push origin v1.0.0-beta.1

```

---

## 3. O que acontece nos bastidores? (CI/CD Pipeline Workflow)

Assim que o comando `git push origin v*` é interceptado pelo GitHub, a esteira configurada em `.github/workflows/release.yml` assume o controle total do ambiente de forma isolada:

```plaintext
       [ Terminal Local ]  ───►  git push origin v1.0.0-beta.1
                                         │
                                         ▼
                         ┌───────────────────────────┐
                         │   GitHub Actions Worker   │
                         └─────────────┬─────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
 ┌───────────────────────────┐                 ┌───────────────────────────┐
 │ 1. Pipeline de Compilação │                 │ 2. Deploy & Distribuição  │
 │ • Inicializa runner Linux │                 │ • Cria o GitHub Release   │
 │ • Executa 'npm run build' │                 │ • Anexa o lazycss.min.css │
 │ • Otimiza via PostCSS     │                 │ • Anexa o blueprint de IA │
 └───────────────────────────┘                 └───────────────────────────┘

```

A esteira compila os módulos brutos de `/src`, empacota o CSS minificado e o manifesto Markdown para IAs na pasta `/dist`, e disponibiliza esses artefatos imutáveis para o barramento público da CDN.

---

## 4. Checklist de Validação Pós-Release

Após um intervalo de 2 a 3 minutos do disparo da tag, valide a integridade e a propagação global da nova versão checando obrigatoriamente estes três canais oficiais:

1. **Aba Actions:** Acesse o repositório no GitHub, clique na aba *Actions* e verifique se a execução do fluxo terminou com o ícone verde de sucesso (✓). Se falhar, inspecione os logs do job Node.js.
2. **Aba Releases:** Verifique se uma nova Release com o nome exato da sua tag foi injetada no menu lateral direito do repositório no GitHub. Certifique-se de que o arquivo de produção final `lazycss.min.css` e o arquivo `lazycss-blueprint.md` estão devidamente anexados na seção de *Assets*.
3. **Disponibilidade Global na CDN:** Abra uma janela anônima no seu navegador e tente acessar diretamente as URLs do **jsDelivr** para garantir que a propagação de borda ocorreu com sucesso:
* **CSS Minificado:** `https://cdn.jsdelivr.net/gh/asideia/lazy-css@v1.0.0-beta.1/dist/lazycss.min.css`
* **Blueprint de IA:** `https://cdn.jsdelivr.net/gh/asideia/lazy-css@v1.0.0-beta.1/dist/lazycss-blueprint.md`



---

## ⚠️ Resolução de Problemas (Troubleshooting)

* **O pipeline de CI/CD não disparou após o push:** Certifique-se de que a tag local foi criada usando o prefixo `v` minúsculo e que você utilizou o comando explícito `git push origin v[VERSAO]`. O comando `git push` tradicional envia exclusivamente branches e commits, deixando as marcas de tags locais intocadas.
* **O código atualizado não reflete na CDN (Problema de Cache):** O jsDelivr possui um cache agressivo de produção em seus servidores de borda globais. Se você realizou um hotfix emergencial sob a mesma tag e precisa forçar a CDN a atualizar os arquivos imediatamente, você pode disparar uma requisição de limpeza acessando a API de purga do provedor através das URLs:
* `https://purge.jsdelivr.net/gh/asideia/lazy-css@v1.0.0-beta.1/dist/lazycss.min.css`
* `https://purge.jsdelivr.net/gh/asideia/lazy-css@v1.0.0-beta.1/dist/lazycss-blueprint.md`