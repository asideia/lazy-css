/**
 * Gerencia o download nativo do manifesto Markdown (.md) já compilado.
 * Consome diretamente o artefato estático gerado pelo pipeline de build do framework.
 */
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('lazy-download-blueprint-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Aponta para o artefato consolidado na pasta de distribuição (dist)
            const FILE_PATH = 'dist/lazycss-blueprint.md';
            
            // Cria um elemento de ancoragem temporário em memória
            const link = document.createElement('a');
            link.href = FILE_PATH;
            link.download = 'lazycss-blueprint.md';
            
            // Dispara o fluxo de download do navegador de forma assíncrona
            document.body.appendChild(link);
            link.click();
            
            // Remove o elemento e limpa o escopo da árvore do DOM
            document.body.removeChild(link);
        });
    }
});