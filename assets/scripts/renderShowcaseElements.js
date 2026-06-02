/**
 * Lazy CSS - Showcase Renderer Engine
 * Componente responsável por ler o manifesto único JSON e renderizar
 * a interface visual de documentação humana no arquivo showcase.html.
 */

document.addEventListener('DOMContentLoaded', () => {
    const JSON_PATH = 'dist/lazycss.spec.json';
    const container = document.getElementById('showcase-container');

    if (!container) {
        console.error('Erro: Elemento #showcase-container não foi encontrado no HTML.');
        return;
    }

    // Inicializa a carga dos dados
    fetch(JSON_PATH)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP ao carregar o JSON: ${response.status}`);
            }
            return response.json();
        })
        .then(data => renderShowcase(data, container))
        .catch(error => {
            console.error('Falha ao renderizar a vitrine do Lazy CSS:', error);
            container.innerHTML = `
                <div style="padding: 2rem; border: 1px solid hsl(0 75% 55% / 0.2); background: hsl(0 75% 55% / 0.05); border-radius: 8px;">
                    <p style="color: hsl(0 75% 55%); font-weight: 500; margin: 0;">❌ Erro ao carregar os dados da documentação.</p>
                    <p style="font-size: 0.9rem; margin: 0.5rem 0 0 0; color: #666;">Certifique-se de que o arquivo dist/lazycss.spec.json exists e está bem formatado.</p>
                </div>
            `;
        });
});

/**
 * Orquestra a renderização de todas as categorias do framework
 */
function renderShowcase(categories, targetContainer) {
    targetContainer.innerHTML = ''; // Limpa loaders estáticos

    categories.forEach(cat => {
        // 1. Cria a Seção da Categoria
        const section = document.createElement('section');
        section.id = cat.id;
        section.style.marginBottom = '4rem';

        // 2. Cabeçalho da Categoria
        section.innerHTML = `
            <div style="margin-bottom: 2rem; border-bottom: 2px solid hsl(210 20% 90%); padding-bottom: 1rem;">
                <h2 style="font-size: 1.8rem; color: #1a202c; margin: 0 0 0.5rem 0; text-transform: capitalize;">${cat.category}: ${cat.id}</h2>
                <p style="color: #4a5568; margin: 0; font-size: 1.1rem; line-height: 1.6;">${cat.description}</p>
            </div>
        `;

        // 3. Renderiza a Tabela Técnica de Especificações (Blueprint Specs) com ADR 0005
        if (cat.blueprint_specs && cat.blueprint_specs.length > 0) {
            const specsTitle = document.createElement('h3');
            specsTitle.innerText = '📋 Contrato Técnico (IA Specs)';
            specsTitle.style.cssText = 'font-size: 1.2rem; margin-bottom: 1rem; color: #2d3748;';
            section.appendChild(specsTitle);

            const table = document.createElement('table');
            // Injeção da classe padrão do Lazy CSS
            table.className = 'lazy-table';
            
            // Definição dos cabeçalhos semânticos
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Signature / Selector</th>
                        <th>Parent Context</th>
                        <th>Strict Architectural Rule & Expected Behavior</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;

            const tbody = table.querySelector('tbody');
            cat.blueprint_specs.forEach(spec => {
                const tr = document.createElement('tr');
                
                // Define a cor da etiqueta baseada no contexto semântico real do arquivo (fileId)
                const badgeStyle = getContextBadgeStyle(spec.context);

                // IMPORTANTE: Injeção do data-label em cada célula para remapeamento via pseudo-elementos CSS no mobile
                tr.innerHTML = `
                    <td data-label="Signature / Selector" style="font-family: monospace; font-size: 0.95rem; color: #c53030; font-weight: bold;">\`${spec.signature}\`</td>
                    <td data-label="Parent Context"><span style="${badgeStyle}">${spec.context}</span></td>
                    <td data-label="Strict Architectural Rule & Expected Behavior" style="color: #4a5568; line-height: 1.5; font-size: 0.95rem;">${spec.description}</td>
                `;
                tbody.appendChild(tr);
            });
            section.appendChild(table);
        }

        // 4. Renderiza a Vitrine Visual de Elementos (Sandbox Elements)
        if (cat.sandbox_elements && cat.sandbox_elements.length > 0) {
            const visualTitle = document.createElement('h3');
            visualTitle.innerText = '✨ Demonstração Visual (Visual Preview)';
            visualTitle.style.cssText = 'font-size: 1.2rem; margin-bottom: 1rem; color: #2d3748;';
            section.appendChild(visualTitle);

            const grid = document.createElement('div');
            grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;';

            cat.sandbox_elements.forEach((element) => {
                const card = document.createElement('div');
                card.style.cssText = 'border: 1px solid #e2e8f0; background: #fff; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);';

                // Cabeçalho do Card com botões de Ação (Copiar + Ver Código)
                const cardHeader = document.createElement('div');
                cardHeader.style.cssText = 'padding: 0.75rem 1rem; background: #f7fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;';
                cardHeader.innerHTML = `
                    <span style="font-weight: 500; font-size: 0.9rem; color: #4a5568;">${element.name}</span>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="lazy-toggle-code-btn" style="padding: 4px 8px; font-size: 0.8rem; cursor: pointer; border: 1px solid #cbd5e0; background: #fff; border-radius: 4px; color: #4a5568; transition: all 0.2s; font-weight: 500;">
                            &lt;/&gt; Ver Código
                        </button>
                        <button class="lazy-copy-btn" style="padding: 4px 8px; font-size: 0.8rem; cursor: pointer; border: 1px solid #cbd5e0; background: #fff; border-radius: 4px; color: #4a5568; transition: all 0.2s; font-weight: 500;" data-html="${encodeURIComponent(element.html)}">📑 Copiar</button>
                    </div>
                `;

                // Preview em Tempo Real (Injeta o código gerado)
                const previewArea = document.createElement('div');
                previewArea.classList.add('lazy-showcase-preview');
                previewArea.style.cssText = 'padding: 1.5rem; flex-grow: 1; background: #f8fafc; position: relative;';
                previewArea.innerHTML = element.html;

                // Bloco de Código Oculto por Padrão
                const codeArea = document.createElement('div');
                codeArea.style.cssText = 'display: none; border-top: 1px solid #e2e8f0;';
                
                const pre = document.createElement('pre');
                pre.style.cssText = 'margin: 0; background: #0f172a; padding: 1rem; overflow-x: auto; border-radius: 0;';
                
                const code = document.createElement('code');
                code.style.cssText = 'font-family: monospace; font-size: 0.85rem; color: #38bdf8; white-space: pre;';
                code.textContent = element.html.trim();
                
                pre.appendChild(code);
                codeArea.appendChild(pre);

                // Evento para expandir e recolher o código
                const toggleBtn = cardHeader.querySelector('.lazy-toggle-code-btn');
                toggleBtn.addEventListener('click', () => {
                    const isHidden = codeArea.style.display === 'none';
                    if (isHidden) {
                        codeArea.style.display = 'block';
                        toggleBtn.innerText = '▲ Ocultar';
                        toggleBtn.style.background = '#edf2f7';
                    } else {
                        codeArea.style.display = 'none';
                        toggleBtn.innerText = '</> Ver Código';
                        toggleBtn.style.background = '#fff';
                    }
                });

                card.appendChild(cardHeader);
                card.appendChild(previewArea);
                card.appendChild(codeArea);
                grid.appendChild(card);
            });

            section.appendChild(grid);
        }

        targetContainer.appendChild(section);
    });

    // Registra o evento de clique para os botões de cópia
    setupCopyBehavior();
}

/**
 * Configura o comportamento de copiar código para a área de transferência
 */
function setupCopyBehavior() {
    document.querySelectorAll('.lazy-copy-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const rawHtml = decodeURIComponent(e.currentTarget.getAttribute('data-html'));
            
            navigator.clipboard.writeText(rawHtml).then(() => {
                const originalText = e.currentTarget.innerText;
                button.innerText = '✓ Copiado!';
                button.style.background = '#dcfce7';
                button.style.color = '#15803d';
                button.style.borderColor = '#bbf7d0';

                setTimeout(() => {
                    button.innerText = originalText;
                    button.style.background = '#fff';
                    button.style.color = '#4a5568';
                    button.style.borderColor = '#cbd5e0';
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar código: ', err);
            });
        });
    });
}

/**
 * Retorna os estilos CSS inline de acordo com o contexto arquitetural (fileId)
 */
function getContextBadgeStyle(context) {
    const base = 'padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; font-family: monospace; display: inline-block;';
    switch (context) {
        case 'variables':
            return `${base} background-color: #f0fff4; color: #2f855a; border: 1px solid #c6f6d5;`;
        case 'structure':
        case 'page-grid':
            return `${base} background-color: #ebf8ff; color: #2b6cb0; border: 1px solid #bee3f8;`;
        case 'buttons':
        case 'forms':
        case 'cards':
        case 'tables':
            return `${base} background-color: #faf5ff; color: #6b46c1; border: 1px solid #e9d8fd;`;
        case 'status':
            return `${base} background-color: #fffaf0; color: #dd6b20; border: 1px solid #feebc8;`;
        default:
            return `${base} background-color: #edf2f7; color: #4a5568; border: 1px solid #e2e8f0;`;
    }
}