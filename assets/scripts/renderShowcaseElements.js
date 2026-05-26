/**
 * Lazy CSS - Showcase Renderer Engine
 * Componente responsável por ler o manifesto único JSON e renderizar
 * a interface visual de documentação humana no arquivo showcase.html.
 */

document.addEventListener('DOMContentLoaded', () => {
    const JSON_PATH = 'assets/data/lazycss.spec.json';
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
                    <p style="font-size: 0.9rem; margin: 0.5rem 0 0 0; color: #666;">Certifique-se de que o arquivo assets/data/lazycss.spec.json existe e está bem formatado.</p>
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
                <h2 style="font-size: 1.8rem; color: #1a202c; margin: 0 0 0.5rem 0;">${cat.category}</h2>
                <p style="color: #4a5568; margin: 0; font-size: 1.1rem;">${cat.description}</p>
            </div>
        `;

        // 3. Renderiza a Tabela Técnica de Especificações (Blueprint Specs)
        if (cat.blueprint_specs && cat.blueprint_specs.length > 0) {
            const specsTitle = document.createElement('h3');
            specsTitle.innerText = '📋 Contrato Técnico (IA Specs)';
            specsTitle.style.cssText = 'font-size: 1.2rem; margin-bottom: 1rem; color: #2d3748;';
            section.appendChild(specsTitle);

            const table = document.createElement('table');
            table.style.cssText = 'width: 100%; border-collapse: collapse; margin-bottom: 2.5rem; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden;';
            
            table.innerHTML = `
                <thead>
                    <tr style="background: #f7fafc; text-align: left; border-bottom: 1px solid #edf2f7;">
                        <th style="padding: 1rem;">Seletor / Classe</th>
                        <th style="padding: 1rem;">Contexto Semântico</th>
                        <th style="padding: 1rem;">Regra de Aplicação e Comportamento</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;

            const tbody = table.querySelector('tbody');
            cat.blueprint_specs.forEach(spec => {
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid #edf2f7';
                
                // Define a cor da etiqueta baseada no contexto semântico
                const badgeStyle = getContextBadgeStyle(spec.context);

                tr.innerHTML = `
                    <td style="padding: 1rem; font-family: monospace; font-size: 0.95rem; color: #c53030; font-weight: bold;">${spec.class}</td>
                    <td style="padding: 1rem;"><span style="${badgeStyle}">${spec.context}</span></td>
                    <td style="padding: 1rem; color: #4a5568; line-height: 1.5; font-size: 0.95rem;">${spec.description}</td>
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

            cat.sandbox_elements.forEach((element, index) => {
                const card = document.createElement('div');
                card.style.cssText = 'border: 1px solid #e2e8f0; background: #fff; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);';

                // Cabeçalho do Card com botão de copiar
                const cardHeader = document.createElement('div');
                cardHeader.style.cssText = 'padding: 0.75rem 1rem; background: #f7fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;';
                cardHeader.innerHTML = `
                    <span style="font-weight: 500; font-size: 0.9rem; color: #4a5568;">${element.name}</span>
                    <button class="lazy-copy-btn" style="padding: 4px 8px; font-size: 0.8rem; cursor: pointer; border: 1px solid #cbd5e0; background: #fff; border-radius: 4px; color: #4a5568; transition: all 0.2s;" data-html="${encodeURIComponent(element.html)}">📑 Copiar HTML</button>
                `;

                // Preview em Tempo Real (Injeta o código gerado)
                const previewArea = document.createElement('div');
                previewArea.style.cssText = 'padding: 1.5rem; flex-grow: 1; background: var(--lazy-bg, #f8fafc);';
                previewArea.innerHTML = element.html;

                card.appendChild(cardHeader);
                card.appendChild(previewArea);
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
            const rawHtml = decodeURIComponent(e.target.getAttribute('data-html'));
            
            navigator.clipboard.writeText(rawHtml).then(() => {
                const originalText = e.target.innerText;
                e.target.innerText = '✓ Copiado!';
                e.target.style.background = '#edf2f7';
                e.target.style.color = '#2b6cb0';
                e.target.style.borderColor = '#2b6cb0';

                setTimeout(() => {
                    e.target.innerText = originalText;
                    e.target.style.background = '#fff';
                    e.target.style.color = '#4a5568';
                    e.target.style.borderColor = '#cbd5e0';
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar código: ', err);
            });
        });
    });
}

/**
 * Retorna os estilos CSS inline de acordo com o contexto lego da IA
 */
function getContextBadgeStyle(context) {
    const base = 'padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;';
    switch (context) {
        case 'Layout':
            return `${base} background-color: #ebf8ff; color: #2b6cb0;`;
        case 'Component':
            return `${base} background-color: #faf5ff; color: #6b46c1;`;
        case 'Typography':
            return `${base} background-color: #f0fff4; color: #2f855a;`;
        case 'Utility':
            return `${base} background-color: #fffaf0; color: #dd6b20;`;
        default:
            return `${base} background-color: #edf2f7; color: #4a5568;`;
    }
}
