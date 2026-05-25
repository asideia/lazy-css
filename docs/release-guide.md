# 📖 Guia de Operação: Como Lançar uma Nova Release

Este documento estabelece o procedimento padrão para realizar o deploy e a distribuição de uma nova versão do **Vibe CSS**. O processo é automatizado pelo GitHub Actions, mas exige consistência no versionamento local.

## 1. O Fluxo de Versionamento Semântico (SemVer)

Antes de disparar uma versão, é fundamental entender qual número alterar no arquivo `package.json`. O projeto adota o padrão **Major.Minor.Patch** (ex: `1.4.2`).

* **PATCH (`1.4.X`):** Correções de bugs ou ajustes internos que não mudam como o usuário usa a biblioteca. *Exemplo: Corrigir um comportamento visual de um botão no Safari ou arrumar um espaçamento no `.vibe-stack`.*
* **MINOR (`1.X.0`):** Adição de novas funcionalidades, novas classes ou novos componentes sem quebrar o código antigo. *Exemplo: Criar uma classe `.vibe-badge` ou adicionar suporte a um novo layout na pasta `src/layouts/`.*
* **MAJOR (`X.0.0`):** Mudanças estruturais críticas que quebram a compatibilidade com projetos antigos. *Exemplo: Alterar o prefixo de `vibe-` para `v-`, ou remover uma classe que era largamente utilizada.*

---

## 2. Passo a Passo para o Lançamento

Siga rigorosamente esta sequência de comandos no terminal da sua máquina com a branch principal (`master` ou `main`) atualizada.

### Passo 1: Atualizar os Arquivos Locais

Certifique-se de que o seu `package.json` reflete o número da nova versão que você deseja lançar. Se estiver subindo da `1.0.0` para a `1.0.1`, altere a linha:

```json
"version": "1.0.1",

```

Adicione as alterações no Git e faça o commit:

```bash
git add .
git commit -m "chore: bump version to 1.0.1 and update components"
git push origin master

```

### Passo 2: Criar a Tag de Versão Anotada

As tags anotadas (`-a`) são obrigatórias porque o GitHub Actions as utiliza para extrair os metadados e gerar as notas de lançamento automaticamente. O nome da tag **deve começar com a letra `v**`.

```bash
# Substitua o "v1.0.1" pela versão correta
git tag -a v1.0.1 -m "Release v1.0.1 - Correção nos tokens de espaçamento"

```

### Passo 3: Disparar o Pipeline (Push da Tag)

O pipeline de CI/CD está configurado para dormir e **só acordar** quando uma nova tag que comece com a letra `v` for enviada ao servidor do GitHub. Envie a tag com o comando:

```bash
git push origin v1.0.1

```

---

## 3. O que acontece nos bastidores? (Fluxo de CI/CD)

Assim que o comando `git push origin v*` é executado, a esteira do GitHub Actions assume o controle do projeto de forma transparente.

```text
       [ Terminal Local ]  ───►  git push origin v1.0.1
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │   GitHub Actions Acorda   │
                         └─────────────┬─────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
  ┌───────────────────────────┐                 ┌───────────────────────────┐
  │  1. Compilação do CSS     │                 │ 2. Distribuição de Rede   │
  │  • Sobe máquina Linux     │                 │ • Gera GitHub Release     │
  │  • Roda npm run build     │                 │ • Injeta vibe.min.css     │
  │  • Otimiza via PostCSS    │                 │ • Publica pacote no NPM   │
  └───────────────────────────┘                 └───────────────────────────┘

```

---

## 4. Checklist de Validação Pós-Release

Após 2 ou 3 minutos do disparo da tag, valide se a distribuição ocorreu com sucesso checando os seguintes canais:

1. **Aba Actions:** Acesse o repositório no GitHub, clique na aba **Actions** e verifique se o fluxo terminou com o ícone verde de sucesso (✓).
2. **Aba Releases:** Verifique se uma nova Release com o nome da sua tag foi criada no menu lateral direito do GitHub. Certifique-se de que o arquivo `vibe.min.css` está anexado na seção de *Assets* para download direto.
3. **Disponibilidade na CDN:** Abra uma aba anônima no seu navegador e tente acessar a URL do jsDelivr com a sua nova tag para garantir que o arquivo está público:
```text
https://cdn.jsdelivr.net/gh/seu-usuario/seu-repositorio@v1.0.1/dist/vibe.min.css

```



## ⚠️ Resolução de Problemas (Troubleshooting)

* **O pipeline não disparou:** Verifique se você criou a tag localmente usando o formato correto (`vX.X.X`) e se usou o comando `git push origin v1.0.1` em vez do push comum. O comando `git push` tradicional não envia tags para o servidor.
* **O passo do NPM falhou:** Certifique-se de que o segredo `NPM_TOKEN` foi cadastrado corretamente nas configurações do repositório e que você incrementou o número da versão no `package.json`. O NPM rejeita qualquer tentativa de publicação que sobrescreva uma versão já existente.