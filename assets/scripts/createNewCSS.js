/* ==========================================================================
   ⚡ LAZY CSS - GERADOR DE ANATOMIA CSS (scripts/createNewCSS.js)
   ========================================================================== */

const fs = require('fs');
const path = require('path');

// Captura os argumentos passados pelo terminal (npm run new-css -- /pasta/nome)
const args = process.argv.slice(2);
const inputPath = args[0];

// Definição da raiz do projeto e pasta padrão src
const BASE_SRC = path.join(__dirname, '../../src');

/**
 * Retorna o template de anatomia estrita esperado pelo buildLazyCSSSpec.js
 */
function getCSSTemplate(filename) {
    const componentName = filename.replace('.css', '');
    return `/**
 * [DESCRIPTION]
 * Descreva aqui o escopo macro e o domínio de engenharia deste arquivo (${componentName}).
 * Explique brevemente o comportamento visual que este módulo resolve no ecossistema.
 */

/**
 * [SANDBOX_ELEMENT]
 * [SANDBOX_ELEMENT_NAME] Exemplo de Conceito Ouro (Few-Shot Learning)
 * [SANDBOX_ELEMENT_HTML]
 * <div class="lazy-${componentName}-example">
 * <p>Exemplo estrutural limpo para a IA aprender a renderizar o componente.</p>
 * </div>
 */

/**
 * Explique o comportamento estrito, regras arquiteturais e herança desta classe.
 */
.lazy-${componentName} {
    /* Adicione as propriedades CSS puras e uso de tokens aqui */
}
`;
}

function execute() {
    let targetDir = BASE_SRC;
    let filename = 'new-component.css';

    if (!inputPath) {
        console.log('⚠️ Nenhum destino especificado. Gerando arquivo padrão na raiz do /src');
    } else {
        // Normaliza o caminho para evitar problemas com barras invertidas no Windows
        const normalizedPath = inputPath.replace(/\\/g, '/');
        const parts = normalizedPath.split('/').filter(p => p.length > 0);

        if (parts.length === 1) {
            // Cenário: npm run new-css buttons (Cria na raiz do src com esse nome)
            if (parts[0].endsWith('.css')) {
                filename = parts[0];
            } else {
                filename = `${parts[0]}.css`;
            }
        } else if (parts.length > 1) {
            // Cenário: npm run new-css /components/buttons ou components/buttons.css
            const lastPart = parts[parts.length - 1];
            if (lastPart.endsWith('.css')) {
                filename = lastPart;
                parts.pop();
            } else {
                filename = `${lastPart}.css`;
                parts.pop();
            }
            // Monta o caminho completo da subpasta dentro do src
            targetDir = path.join(BASE_SRC, ...parts);
        }
    }

    // Garante recursivamente que a pasta de destino existe
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const fullFilePath = path.join(targetDir, filename);

    // Valida se o arquivo já existe para não sobrescrever o seu trabalho acidentalmente
    if (fs.existsSync(fullFilePath)) {
        console.error(`❌ Erro: O arquivo já existe em: ${fullFilePath}`);
        process.exit(1);
    }

    // Escreve o arquivo com o template acoplado ao contrato da IA
    fs.writeFileSync(fullFilePath, getCSSTemplate(filename), 'utf-8');
    
    // Mostra o caminho relativo amigável no terminal
    const relativeOutput = path.relative(path.join(__dirname, '..'), fullFilePath);
    console.log(`\n⚡ Arquivo gerado com sucesso com a anatomia estrita!`);
    console.log(`📂 Destino: ${relativeOutput}\n`);
}

execute();