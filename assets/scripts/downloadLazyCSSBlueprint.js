/**
 * Reconstrói o Manifesto Markdown a partir do spec JSON e força o download.
 * Otimizado dinamicamente para consumo de contexto de alta performance por LLMs.
 */
async function downloadLazyCSSBlueprint() {
    try {
        // 1. Consome o JSON gerado pelo pipeline do Node/GitHub Actions
        const response = await fetch('../../dist/lazycss.spec.json');
        const specData = await response.json();
        
        // 2. Inicializa o manifesto com System Instructions de altíssimo rigor técnico
        let md = `# 🦥 SYSTEM CONTEXT: LAZY CSS FRAMEWORK SPECIFICATION (v1.0.0)\n\n`;
        md += `> **CRITICAL INSTRUCTION FOR THE AI:** You are an expert frontend engineer specialized in hyper-efficient, minimal, and clean semantic HTML for corporate backoffices and dashboards. You must strictly and exclusively design layouts using the Lazy CSS token system and class contract defined below.\n\n`;
        
        md += `## 📑 CORE FRAMEWORK RULES & CONSTRAINTS\n`;
        md += `1. **No Tailwind/Utility Class Inventions:** You are strictly forbidden from guessing or inventing utility classes (e.g., \`flex\`, \`pt-4\`, \`bg-blue-500\`). If a class is not explicitly declared in this document, it does not exist.\n`;
        md += `2. **No Arbitrary Inline Colors/Sizing:** Do not inject custom raw hex values (\`#ff0000\`) or static layout widths (\`width: 450px\`). You must use the CSS custom variables native to the system.\n`;
        md += `3. **Mandatory Flow Wrapping:** Every atomic component or input field MUST be encapsulated inside a valid layout container: \`.lazy-stack\` for vertical stack flows, and \`.lazy-row\` for horizontal flows.\n\n`;
        
        md += `---\n\n`;

        // 3. Varre as categorias geradas pelo seu compilador
        specData.forEach(category => {
            md += `## 📦 SYSTEM ARCHITECTURE: ${category.category.toUpperCase()}\n`;
            if (category.description) {
                md += `**Context Scope & Domain:** ${category.description}\n\n`;
            }
            
            md += `### 🔐 ALLOWED CLASS CONTRACTS & SELECTORS\n`;
            md += `The AI can ONLY use the following class signatures for this category. Do not hallucinate variants.\n\n`;
            
            // Tabela Rígida de Classes: LLMs interpretam tabelas Markdown com maior taxa de acerto do que texto corrido
            md += `| Class/Selector | Parent Context | Strict Architectural Rule & Expected Behavior |\n`;
            md += `| :--- | :--- | :--- |\n`;
            
            category.blueprint_specs.forEach(spec => {
                // Remove quebras de linha ou caracteres que quebrem a tabela markdown
                const cleanDesc = spec.description.replace(/\n/g, ' ').trim();
                md += `| \`${spec.class}\` | \`${spec.context}\` | ${cleanDesc} |\n`;
            });
            
            md += `\n`;

            // 4. Injeção Estruturada de Exemplos Reais (Few-Shot Training de Alta Performance)
            if (category.sandbox_elements && category.sandbox_elements.length > 0) {
                md += `### 🎯 GOLD STANDARD EXAMPLES (FEW-SHOT LEARNING)\n`;
                md += `Replicate these structural combinations precisely when generating user interfaces:\n\n`;
                
                category.sandbox_elements.forEach(element => {
                    md += `#### Concept: ${element.name}\n`;
                    md += `\`\`\`html\n${element.html.trim()}\n\`\`\`\n\n`;
                });
            }

            md += `---\n\n`;
        });

        // 5. Bloco de Fechamento Imperativo
        md += `## 🤖 FINAL COMPLIANCE CHECK FOR THE AI\n`;
        md += `Before outputting the HTML code, mentally validate against this check:\n`;
        md += `- "Did I use any non-Lazy CSS classes?" -> If yes, rewrite.\n`;
        md += `- "Are my form components wrapped in a .lazy-stack or .lazy-row?" -> If no, fix it.\n`;
        md += `- "Did I write clean semantic HTML tags instead of nested div-soup?" -> Yes, Lazy CSS applies styles natively to basic tags.\n\n`;
        md += `**EXECUTION COMAND:** Generate the clean HTML now based on the user's requirements. Do not output markdown prose explaining the CSS, output ONLY the clean HTML chunk.`;

        // 6. Executa a engenharia do download via Blob para evitar estouro de memória
        const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'lazycss-blueprint.md');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        
        // 7. Libera o escopo de memória do sistema operacional
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        console.log('🏁 Blueprint gerado e baixado assintoticamente com sucesso!');
    } catch (error) {
        console.error('❌ Falha crítica ao processar e compilar o manifesto JSON -> MD:', error);
    }
}