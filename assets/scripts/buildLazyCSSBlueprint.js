/**
 * Lazy CSS - Blueprint Compiler Engine
 * Componente responsável por ler o manifesto JSON e compilar em tempo de
 * execução o arquivo Markdown técnico unificado que serve de contexto para as LLMs.
 */

document.addEventListener('DOMContentLoaded', () => {
    const DOWNLOAD_BTN_ID = 'lazy-download-blueprint-btn';
    const JSON_PATH = 'assets/data/lazycss.spec.json';
    
    const downloadBtn = document.getElementById(DOWNLOAD_BTN_ID);

    if (!downloadBtn) {
        console.warn(`Aviso: Elemento #${DOWNLOAD_BTN_ID} não encontrado nesta página. O inicializador foi suspenso.`);
        return;
    }

    downloadBtn.addEventListener('click', () => {
        // Altera o estado do botão para indicar processamento
        const originalText = downloadBtn.innerText;
        downloadBtn.innerText = '⏳ Generating Blueprint...';
        downloadBtn.disabled = true;

        fetch(JSON_PATH)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP ao ler manifesto: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const markdownContent = compileJsonToMarkdown(data);
                triggerMarkdownDownload(markdownContent, 'lazycss-blueprint.md');
            })
            .catch(error => {
                console.error('Falha ao compilar o blueprint para IA:', error);
                alert('Erro ao gerar o arquivo de contexto. Verifique os logs do console.');
            })
            .finally(() => {
                // Restaura o estado original do botão
                downloadBtn.innerText = originalText;
                downloadBtn.disabled = false;
            });
    });
});

/**
 * Traduz a estrutura do JSON e monta a string crua em formato Markdown
 * otimizada estritamente para leitura e processamento de LLMs.
 */
function compileJsonToMarkdown(categories) {
    let md = '';

    // 1. Cabeçalho Estrutural de Entrada (Instruções do Sistema para a IA)
    md += `# LAZY CSS FRAMEWORK BLUEPRINT - TECHNICAL SPECIFICATION\n\n`;
    md += `You are an expert frontend engineer generating strict, responsive, clean semantic HTML. `;
    md += `You must strictly use the Lazy CSS utility framework classes defined below. `;
    md += `DO NOT inject custom inline styles, third-party libraries, or complex custom media-queries unless strictly instructed.\n\n`;
    md += `---\n\n`;

    // 2. Iteração de Categorias e Módulos Técnicos
    categories.forEach(cat => {
        md += `## CATEGORY: ${cat.category.toUpperCase()}\n`;
        md += `Context Scope: ${cat.description}\n\n`;

        if (cat.blueprint_specs && cat.blueprint_specs.length > 0) {
            md += `### Allowed System Classes & Selectors:\n\n`;

            cat.blueprint_specs.forEach(spec => {
                md += `#### Selector: \`${spec.class}\`\n`;
                md += `* **Engineering Context**: ${spec.context}\n`;
                md += `* **Strict Rules & Behavior**: ${spec.description}\n\n`;
            });
        }

        // 3. Injeção de Exemplos Estruturais (Few-Shot Prompting para a IA)
        if (cat.sandbox_elements && cat.sandbox_elements.length > 0) {
            md += `### Gold Standard Code Examples (Few-Shot Learning):\n\n`;

            cat.sandbox_elements.forEach(element => {
                md += `* Example Concept: ${element.name}\n`;
                md += `\`\`\`html\n`;
                md += `${element.html}\n`;
                md += `\`\`\`\n\n`;
            });
        }

        md += `\n---\n\n`;
    });

    // 4. Rodapé de Trava Comportamental
    md += `## FINAL CORE INSTRUCTIONS FOR THE AI:\n`;
    md += `1. Prioritize layouts made with \`Layout\` contexts for structural wrapping.\n`;
    md += `2. Inside layouts, place \`Component\` contexts for content capturing.\n`;
    md += `3. Always target full fluid responsiveness. Do not add static widths (like width: 400px) inside components.\n`;

    return md;
}

/**
 * Cria um link temporário na árvore DOM para forçar o download do arquivo .md gerado
 */
function triggerMarkdownDownload(content, filename) {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const temporaryLink = document.createElement('a');
    temporaryLink.href = url;
    temporaryLink.setAttribute('download', filename);
    
    // Esconde o elemento para evitar deformações visuais temporárias
    temporaryLink.style.visibility = 'hidden';
    document.body.appendChild(temporaryLink);
    
    temporaryLink.click();
    
    // Limpeza de memória do navegador
    document.body.removeChild(temporaryLink);
    URL.revokeObjectURL(url);
}
