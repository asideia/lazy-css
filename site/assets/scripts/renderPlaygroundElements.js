document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('lazy-code-input');
    const statusBadge = document.getElementById('css-status');

    // 1. Calcula o prefixo correto dependendo se está no GitHub Pages (/lazy-css/) ou local ('')
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const repoPrefix = (window.location.hostname.includes('github.io') && pathSegments.length > 0)
        ? `/${pathSegments[0]}`
        : '';

    // 2. Define o iframe com o srcdoc estruturado exatamente como você precisa
    const iframe = document.getElementById('lazy-preview-frame');
    if (iframe) {
        iframe.srcdoc = `<!DOCTYPE html>
        <html>
            <head>
                <meta charset='UTF-8'>
                <link rel='stylesheet' href='${repoPrefix}/dist/lazycss.min.css'>
                <style>body { padding: var(--lazy-space-md); margin: 0; }</style>
            </head>
            <body id='preview-root'></body>
        </html>`;
    }

    // Template padrão limpo (apenas elementos sem estrutura de página)
    const defaultTemplate =
        `<div class="lazy-stack">
    <div class="lazy-row lazy-row-between">
        <div class="lazy-stack lazy-gap-xs">
            <h3 style="margin:0; font-size: 1.4rem; font-weight: 600;">Controle de Usuários</h3>
            <p style="margin:0; color:#64748b; font-size: 0.95rem;">Gerenciamento de credenciais do backoffice.</p>
        </div>
        <button class="lazy-btn lazy-btn-primary">⚡ Novo Registro</button>
    </div>

    <div class="lazy-card">
        <table class="lazy-table">
            <thead>
                <tr>
                    <th>Operador</th>
                    <th>Escopo</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Admin</td>
                    <td>Administrator</td>
                    <td><span style="color: #166534; font-weight: bold;">Ativo</span></td>
                </tr>
                <tr>
                    <td>Maria</td>
                    <td>Content Manager</td>
                    <td><span style="color: #166534; font-weight: bold;">Ativo</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`;

    const copyBtn = document.getElementById('btn-copy-code');
    const resetBtn = document.getElementById('btn-reset-code');
    const STORAGE_KEY = 'lazycss_playground_saved_code';

    // Recupera rascunho anterior ou template padrão
    const savedCode = localStorage.getItem(STORAGE_KEY);
    if (textarea) {
        textarea.value = savedCode !== null ? savedCode : defaultTemplate;
    }

    let debounceTimer = null;

    // Função focada em injetar apenas os elementos internos
    function updatePreview() {
        if (!textarea || !iframe) return;

        const userHtml = textarea.value;

        // Persiste no localStorage
        try {
            localStorage.setItem(STORAGE_KEY, userHtml);
        } catch (_) { }

        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            const root = doc.getElementById('preview-root');

            // Sincroniza o tema do documento pai no iframe
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme) {
                doc.documentElement.setAttribute('data-theme', currentTheme);
            } else {
                doc.documentElement.removeAttribute('data-theme');
            }

            if (root) {
                root.innerHTML = userHtml;
            }
        } catch (err) {
            console.error("Erro na atualização do preview:", err);
        }
    }

    // Observa mudanças no data-theme do elemento raiz para atualizar o iframe
    const themeObserver = new MutationObserver(() => {
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (doc && doc.documentElement) {
                if (currentTheme) {
                    doc.documentElement.setAttribute('data-theme', currentTheme);
                } else {
                    doc.documentElement.removeAttribute('data-theme');
                }
            }
        } catch (_) { }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    function debouncedUpdate() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updatePreview, 120);
    }

    // Suporte à tecla TAB no editor (insere 4 espaços em vez de perder o foco)
    if (textarea) {
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const spaces = '    ';

                textarea.value = textarea.value.substring(0, start) + spaces + textarea.value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
                debouncedUpdate();
            }
        });
    }

    // Ação: Copiar Código com feedback visual
    if (copyBtn && textarea) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(textarea.value).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = '✅ Copiado!';
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                }, 1800);
            }).catch(() => {
                // Fallback
                textarea.select();
                document.execCommand('copy');
            });
        });
    }

    // Ação: Resetar para o template padrão
    if (resetBtn && textarea) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Deseja resetar o código para o exemplo padrão?')) {
                textarea.value = defaultTemplate;
                localStorage.removeItem(STORAGE_KEY);
                updatePreview();
            }
        });
    }

    // Checa se o arquivo CSS compilado existe localmente
    function checkCssAvailability() {
        // Detecta se está rodando no GitHub Pages sob um subdiretório (ex: /lazy-css/)
        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        const repoPrefix = (window.location.hostname.includes('github.io') && pathSegments.length > 0)
            ? `/${pathSegments[0]}`
            : '';

        const cssPath = `${repoPrefix}/dist/lazycss.min.css`;

        fetch(cssPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    statusBadge.innerText = "✓ lazycss.min.css pronto";
                    statusBadge.className = "css-status-badge status-success";
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                statusBadge.innerText = "⚠️ Alerta: dist/lazycss.min.css não encontrado. Rode 'npm run build'";
                statusBadge.className = "css-status-badge status-error";
            });
    }

    // EVENTOS DE SINCRONIA:
    // 1. Atualiza o preview de forma otimizada com debounce
    textarea.addEventListener('input', debouncedUpdate);

    // 2. Aguarda o iframe terminar de montar o esqueleto do srcdoc antes do primeiro render
    iframe.addEventListener('load', updatePreview);

    // Inicializadores de rotina
    checkCssAvailability();

    // Força o primeiro render
    updatePreview();
});
