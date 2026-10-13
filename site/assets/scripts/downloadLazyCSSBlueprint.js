/**
 * Gerencia o download e cópia do manifesto Markdown (.md) compilado para LLMs.
 * Consome diretamente o artefato estático gerado pelo pipeline de build do framework.
 */
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('lazy-download-blueprint-btn');
    const copyBtn = document.getElementById('lazy-copy-blueprint-btn');
    const FILE_PATH = '/dist/lazycss-blueprint.md';
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = FILE_PATH;
            link.download = 'lazycss-blueprint.md';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = '⏳ Carregando...';
            
            fetch(FILE_PATH)
                .then(res => {
                    if (!res.ok) throw new Error('Falha ao carregar arquivo');
                    return res.text();
                })
                .then(text => {
                    return navigator.clipboard.writeText(text);
                })
                .then(() => {
                    copyBtn.innerText = '✅ Manifesto Copiado!';
                    setTimeout(() => {
                        copyBtn.innerText = originalText;
                    }, 2200);
                })
                .catch(err => {
                    console.error('Erro ao copiar manifesto:', err);
                    copyBtn.innerText = '❌ Erro ao copiar';
                    setTimeout(() => {
                        copyBtn.innerText = originalText;
                    }, 2200);
                });
        });
    }
});