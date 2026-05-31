/* ==========================================================================
   ⚡ LAZY CSS - COMPILADOR AUTOMÁTICO DE ESPECIFICAÇÃO (scripts/buildLazyCSSSpec.js)
   ========================================================================== */

const fs = require('fs');
const path = require('path');

// Configuração de diretórios baseados na raiz do projeto
const SRC_DIR = path.join(__dirname, '../../src');
const OUTPUT_FILE = path.join(__dirname, '../../dist/lazycss.spec.json');

/**
 * Normaliza e limpa quebras de linhas e asteriscos de blocos de comentários CSS
 */
function cleanComment(comment) {
    return comment
        .replace(/\/\*\*?|\*\//g, '') // Remove opening/closing of comments
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, '').trim()) // Remove leading asterisks
        .filter(line => line.length > 0)
        .join('\n');
}

/**
 * Processa um arquivo .css isolado e extrai seus metadados estruturados
 */
function parseCSSFile(filePath, categoryFolder) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const fileId = fileName.replace('.css', '');

    // Inicializa o objeto da especificação do arquivo seguindo seu contrato
    const spec = {
        category: categoryFolder,
        id: fileId,
        description: "",
        blueprint_specs: [],
        sandbox_elements: []
    };

    // 1. EXTRAÇÃO DE METADADOS GLOBAIS DO ARQUIVO (Tags: [DESCRIPTION] e [SANDBOX_ELEMENT])
    const globalCommentRegex = /\/\*\*([\s\S]*?)\*\//g;
    let match;

    while ((match = globalCommentRegex.exec(content)) !== null) {
        const cleaned = cleanComment(match[0]);

        // Captura a descrição global do arquivo
        if (cleaned.includes('[DESCRIPTION]')) {
            spec.description = cleaned.replace('[DESCRIPTION]', '').trim();
        }

        // Captura elementos isolados de sandbox para Few-Shot Learning
        if (cleaned.includes('[SANDBOX_ELEMENT]')) {
            const nameMatch = cleaned.match(/\[SANDBOX_ELEMENT_NAME\]([\s\S]*?)(?=\[SANDBOX_ELEMENT_HTML\]|$)/);
            const htmlMatch = cleaned.match(/\[SANDBOX_ELEMENT_HTML\]([\s\S]*)$/);

            spec.sandbox_elements.push({
                name: nameMatch ? nameMatch[1].trim() : "",
                html: htmlMatch ? htmlMatch[1].trim() : ""
            });
        }
    }

    // 2. MAPEAMENTO DE SIGNATURAS NOS ARQUIVOS .CSS E SEUS COMENTÁRIOS ADJACENTES
    // Captura individualmente cada bloco de comentário JSDoc do arquivo
    const jsDocRegex = /\/\*\*([\s\S]*?)\*\//g;
    let commentMatch;

    while ((commentMatch = jsDocRegex.exec(content)) !== null) {
        const rawComment = commentMatch[1];

        // Ignora os blocos de configuração macro/global
        if (rawComment.includes('[DESCRIPTION]') || rawComment.includes('[SANDBOX_ELEMENT]')) {
            continue;
        }

        // Descobre onde o comentário atual termina no texto do arquivo
        const endOfCommentIndex = jsDocRegex.lastIndex;
        
        // Pega uma janela de texto após o comentário para analisar a assinatura
        const textAfterComment = content.substring(endOfCommentIndex, endOfCommentIndex + 200).trim();

        // Regex ultra-focada: procura a primeira classe ou variável que aparece logo no início da linha
        const targetRegex = /^(\.|--)(lazy-[a-zA-Z0-9_\-]+)/;
        const targetMatch = textAfterComment.match(targetRegex);

        // Se encontrou uma assinatura Lazy CSS válida colada ao comentário, indexa no JSON
        if (targetMatch) {
            const signatureName = targetMatch[1] + targetMatch[2];
            const signatureDescription = cleanComment(rawComment).trim();

            spec.blueprint_specs.push({
                signature: signatureName.trim(),
                context: fileId,
                description: signatureDescription
            });
        }
    }

    // Retorna a especificação apenas se o arquivo tiver gerado algum dado relevante
    return (spec.blueprint_specs.length > 0 || spec.description) ? spec : null;
}

/**
 * Varre recursivamente a pasta /src procurando arquivos .css por categorias
 */
function buildSpecJson() {
    console.log('⚡ Iniciando varredura e compilação do lazycss.spec.json...');

    if (!fs.existsSync(SRC_DIR)) {
        console.error(`❌ Erro: Diretório de origem não encontrado em: ${SRC_DIR}`);
        process.exit(1);
    }

    const fullSpecification = [];

    // Lê os subdiretórios dentro de /src (tokens, layouts, components, etc.)
    const subfolders = fs.readdirSync(SRC_DIR).filter(file => {
        return fs.statSync(path.join(SRC_DIR, file)).isDirectory();
    });

    for (const folder of subfolders) {
        const folderPath = path.join(SRC_DIR, folder);
        const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.css'));

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const fileSpec = parseCSSFile(filePath, folder); // folder vira o nome da categoria macro

            if (fileSpec) {
                fullSpecification.push(fileSpec);
            }
        }
    }

    // Grava o arquivo de especificação unificado na raiz do projeto
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fullSpecification, null, 2), 'utf-8');
    console.log(`\n✅ Sucesso absoluto! Arquivo gerado em: ${OUTPUT_FILE}`);
    console.log(`📊 Total de módulos de arquitetura mapeados: ${fullSpecification.length}\n`);
}

// Executa o compilador
buildSpecJson();