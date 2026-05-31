/* ==========================================================================
   ⚡ LAZY CSS - COMPILADOR DE BLUEPRINT MD VIA NODE (assets/scripts/buildBlueprint.js)
   ========================================================================== */

const fs = require('fs');
const path = require('path');

// Definição dos caminhos baseados na estrutura assets/scripts/
const SPEC_FILE = path.join(__dirname, '../../dist/lazycss.spec.json');
const OUTPUT_MD_FILE = path.join(__dirname, '../../dist/lazycss-blueprint.md');

/**
 * Compila o arquivo JSON de especificação em um Manifesto Markdown de alta performance para IAs
 */
function buildMarkdownBlueprint() {
    console.log('📦 Iniciating local Markdown Blueprint compilation...');

    // 1. Valida se o spec JSON já foi gerado pelo passo anterior do pipeline
    if (!fs.existsSync(SPEC_FILE)) {
        console.error(`❌ Erro Crítico: O arquivo '${SPEC_FILE}' não foi encontrado.`);
        console.error(`💡 Certifique-se de rodar o 'npm run build-spec' antes deste script.`);
        process.exit(1);
    }

    try {
        const specData = JSON.parse(fs.readFileSync(SPEC_FILE, 'utf-8'));

        // 2. Inicializa o cabeçalho estrito de governança para LLMs
        let md = `# 🦥 SYSTEM CONTEXT: LAZY CSS FRAMEWORK SPECIFICATION (v1.0.0)\n\n`;
        md += `> **CRITICAL INSTRUCTION FOR THE AI:** You are an expert frontend engineer specialized in hyper-efficient, minimal, and clean semantic HTML for corporate backoffices and dashboards. You must strictly and exclusively design layouts using the Lazy CSS token system and class contract defined below.\n\n`;
        
        md += `## 📑 CORE FRAMEWORK RULES & CONSTRAINTS\n`;
        md += `1. **No Tailwind/Utility Class Inventions:** You are strictly forbidden from guessing or inventing utility classes (e.g., \`flex\`, \`pt-4\`, \`bg-blue-500\`). If a class is not explicitly declared in this document, it does not exist.\n`;
        md += `2. **No Arbitrary Inline Colors/Sizing:** Do not inject custom raw hex values (\`#ff0000\`) or static layout widths (\`width: 450px\`). You must use the CSS custom variables native to the system.\n`;
        md += `3. **Mandatory Flow Wrapping:** Every atomic component or input field MUST be encapsulated inside a valid layout container: \`.lazy-stack\` for vertical stack flows, and \`.lazy-row\` for horizontal flows.\n\n`;
        md += `4. **Inline Status and Badges:** Whenever placing metadata tags, counters, or badges (e.g., "7 Falhas", "100% OK") next to a section title inside a card, you MUST wrap them together using a \`<div class="lazy-card-header">\` to guarantee perfect flexbox horizontal alignment. Never let them float or sit loosely.\n`;
        md += `5. **Form Layout TIGHT constraints:** Form actions (buttons) should be adjacent to their input rows. Wrap search filters and their buttons in structured layouts to avoid vertical height bloating.\n`;
        md += `6. **Strict Flow Boundaries (No Overlaps):** You are strictly forbidden from leaving inputs, buttons, or labels floating freely. All form elements and custom sections must maintain their standard block/flex document flow. Never use CSS properties that cause elements to break out of their parent container's physical height boundaries.\n`;
        
        md += `---\n\n`;

        // 3. Processa recursivamente as categorias injetadas no JSON
        specData.forEach(category => {
            md += `## 📦 SYSTEM ARCHITECTURE: ${category.category.toUpperCase()}\n`;
            if (category.description) {
                md += `**Context Scope & Domain:** ${category.description}\n\n`;
            }
            
            md += `### 🔐 ALLOWED CLASS CONTRACTS & SELECTORS\n`;
            md += `The AI can ONLY use the following class signatures for this category. Do not hallucinate variants.\n\n`;
            
            // Construção da tabela matricial de alta atenção para LLMs
            md += `| Signature/Selector | Parent Context | Strict Architectural Rule & Expected Behavior |\n`;
            md += `| :--- | :--- | :--- |\n`;
            
            category.blueprint_specs.forEach(spec => {
                const cleanDesc = spec.description.replace(/\n/g, ' ').trim();
                md += `| \`${spec.signature}\` | \`${spec.context}\` | ${cleanDesc} |\n`;
            });
            
            md += `\n`;

            // 4. Injeta os blocos de Few-Shot Learning (Exemplos Ouro)
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

        // 5. Bloco imperativo de auto-validação antes do output da IA
        md += `## 🤖 FINAL COMPLIANCE CHECK FOR THE AI\n`;
        md += `Before outputting the HTML code, mentally validate against this check:\n`;
        md += `- "Did I use any non-Lazy CSS classes?" -> If yes, rewrite.\n`;
        md += `- "Are my form components wrapped in a .lazy-stack or .lazy-row?" -> If no, fix it.\n`;
        md += `- "Did I write clean semantic HTML tags instead of nested div-soup?" -> Yes, Lazy CSS applies styles natively to basic tags.\n\n`;
        md += `**EXECUTION COMMAND:** Generate the clean HTML now based on the user's requirements. Do not output markdown prose explaining the CSS, output ONLY the clean HTML chunk.`;

        // 6. Garanta que a pasta dist existe antes de gravar o arquivo físico
        const distDir = path.dirname(OUTPUT_MD_FILE);
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
        }

        // 7. Gravação final do arquivo físico no repositório
        fs.writeFileSync(OUTPUT_MD_FILE, md, 'utf-8');
        
        // Calcula o caminho relativo para exibir uma mensagem limpa no terminal
        const relativeResult = path.relative(path.join(__dirname, '../..'), OUTPUT_MD_FILE);
        console.log(`✅ Sucesso! Manifesto gerado localmente em: ${relativeResult}\n`);

    } catch (error) {
        console.error('❌ Falha crítica durante o parseamento do JSON para Markdown:', error);
        process.exit(1);
    }
}

// Executa a compilação local
buildMarkdownBlueprint();