document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('lazy-code-input');
    const iframe = document.getElementById('lazy-preview-frame');
    const statusBadge = document.getElementById('css-status');

    // Template padrão limpo (apenas elementos sem estrutura de página)
    const defaultTemplate = `<div class="lazy-stack">
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

    // Define o valor inicial no editor
    if (textarea) {
        textarea.value = defaultTemplate;
    }

    // Função focada em injetar apenas os elementos internos
    function updatePreview() {
        if (!textarea || !iframe) return;

        const userHtml = textarea.value;

        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            const root = doc.getElementById('preview-root');

            if (root) {
                root.innerHTML = userHtml;
            }
        } catch (err) {
            console.error("Erro na atualização do preview:", err);
        }
    }

    // Checa se o arquivo CSS compilado existe localmente
    function checkCssAvailability() {
        fetch('./dist/lazycss.min.css', { method: 'HEAD' })
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
    // 1. Atualiza o preview em tempo real conforme digita
    textarea.addEventListener('input', updatePreview);

    // 2. Aguarda o iframe terminar de montar o esqueleto do srcdoc antes do primeiro render
    iframe.addEventListener('load', updatePreview);

    // Inicializadores de rotina
    checkCssAvailability();

    // Caso o iframe já tenha carregado antes do JS bater aqui, força um gatilho manual
    updatePreview();
});