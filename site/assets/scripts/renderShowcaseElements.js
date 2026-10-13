/**
 * Lazy CSS - Showcase Renderer Engine
 * Componente responsável por ler o manifesto único JSON e renderizar
 * a interface visual de documentação humana no arquivo showcase.html,
 * com busca em tempo real, filtragem técnica e visualização interativa.
 */

document.addEventListener('DOMContentLoaded', () => {
    const JSON_PATH = '/dist/lazycss.spec.json';
    const container = document.getElementById('showcase-container');
    const searchInput = document.getElementById('showcase-search-input');
    const clearBtn = document.getElementById('showcase-search-clear');
    const statusMsg = document.getElementById('showcase-search-status');

    if (!container) {
        console.error('Erro: Elemento #showcase-container não foi encontrado no HTML.');
        return;
    }

    let allData = [];

    // Helper para escapar strings HTML
    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, m => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m]));
    }

    // Algoritmo de busca e pontuação de relevância
    function filterShowcaseData(data, rawQuery) {
        const query = (rawQuery || '').toLowerCase().trim();
        if (!query) return data;

        const terms = query.split(/\s+/).filter(Boolean);

        const matchesTerms = (text) => {
            if (!text || typeof text !== 'string') return false;
            const lower = text.toLowerCase();
            return terms.every(term => lower.includes(term));
        };

        const scoreCategory = (cat) => {
            let score = 0;
            const id = (cat.id || '').toLowerCase();
            const catName = (cat.category || '').toLowerCase();

            if (id === query) score += 200;
            else if (id.startsWith(query)) score += 100;
            else if (matchesTerms(id)) score += 60;

            if (catName === query) score += 50;
            else if (matchesTerms(catName)) score += 30;

            (cat.sandbox_elements || []).forEach(el => {
                const name = (el.name || '').toLowerCase();
                const html = (el.html || '').toLowerCase();
                if (matchesTerms(name)) score += 35;
                else if (matchesTerms(html)) score += 15;
            });

            (cat.blueprint_specs || []).forEach(s => {
                const sig = (s.signature || '').toLowerCase();
                const ctx = (s.context || '').toLowerCase();
                const desc = (s.description || '').toLowerCase();
                if (matchesTerms(sig)) score += 35;
                else if (matchesTerms(ctx)) score += 20;
                else if (matchesTerms(desc)) score += 10;
            });

            if (matchesTerms(cat.description || '')) score += 5;

            return score;
        };

        const results = [];

        data.forEach(cat => {
            const idMatches = matchesTerms(cat.id);
            const catMatches = matchesTerms(cat.category);

            const matchingSpecs = (cat.blueprint_specs || []).filter(spec => {
                return matchesTerms(spec.signature) || matchesTerms(spec.context) || matchesTerms(spec.description);
            });

            const matchingSandboxes = (cat.sandbox_elements || []).filter(el => {
                return matchesTerms(el.name) || matchesTerms(el.html);
            });

            const descMatches = matchesTerms(cat.description);

            const hasMatch = idMatches || catMatches || matchingSpecs.length > 0 || matchingSandboxes.length > 0 || descMatches;

            if (hasMatch) {
                results.push({
                    ...cat,
                    blueprint_specs: (idMatches || catMatches) ? (cat.blueprint_specs || []) : (matchingSpecs.length > 0 ? matchingSpecs : (cat.blueprint_specs || [])),
                    sandbox_elements: (idMatches || catMatches) ? (cat.sandbox_elements || []) : (matchingSandboxes.length > 0 ? matchingSandboxes : (cat.sandbox_elements || [])),
                    _score: scoreCategory(cat)
                });
            }
        });

        results.sort((a, b) => b._score - a._score);
        return results;
    }

    // Executa o filtro e atualiza interface
    function performSearch(query) {
        const cleanQuery = (query || '').trim();

        if (clearBtn) {
            clearBtn.style.display = cleanQuery ? 'block' : 'none';
        }

        const filtered = filterShowcaseData(allData, cleanQuery);
        renderShowcase(filtered, container, cleanQuery);

        if (statusMsg) {
            if (!cleanQuery) {
                statusMsg.style.display = 'none';
                statusMsg.textContent = '';
            } else {
                statusMsg.style.display = 'block';
                const totalCategories = filtered.length;
                if (totalCategories === 0) {
                    statusMsg.innerHTML = `Nenhum resultado encontrado para "<strong>${escapeHtml(cleanQuery)}</strong>".`;
                } else {
                    statusMsg.innerHTML = `Exibindo <strong>${totalCategories}</strong> categoria(s) para "<strong>${escapeHtml(cleanQuery)}</strong>".`;
                }
            }
        }
    }

    // Carga inicial dos dados via fetch
    fetch(JSON_PATH)
        .then(response => {
            if (!response.ok) {
                // Tenta fallback relativo caso acesse de diretório aninhado
                return fetch('../../dist/lazycss.spec.json');
            }
            return response;
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP ao carregar o JSON: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allData = Array.isArray(data) ? data : [];
            renderShowcase(allData, container, '');

            if (searchInput) {
                // Eventos de entrada
                searchInput.addEventListener('input', (e) => {
                    performSearch(e.target.value);
                });

                searchInput.addEventListener('search', (e) => {
                    performSearch(e.target.value);
                });

                // Atalho teclado: Tecla Escape limpa busca
                searchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        searchInput.value = '';
                        performSearch('');
                    }
                });

                // Se já houver valor preenchido (ex: recarregamento do browser com cache de form)
                if (searchInput.value) {
                    performSearch(searchInput.value);
                }
            }

            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    if (searchInput) {
                        searchInput.value = '';
                        searchInput.focus();
                    }
                    performSearch('');
                });
            }
        })
        .catch(error => {
            console.error('Falha ao renderizar a vitrine do Lazy CSS:', error);
            container.innerHTML = `
                <div style="padding: 2rem; border: 1px solid hsl(0 75% 55% / 0.2); background: hsl(0 75% 55% / 0.05); border-radius: var(--lazy-radius-md);">
                    <p style="color: hsl(0 75% 55%); font-weight: 500; margin: 0;">❌ Erro ao carregar os dados da documentação.</p>
                    <p style="font-size: 0.9rem; margin: 0.5rem 0 0 0; color: hsl(var(--lazy-text-muted-raw));">Certifique-se de que o arquivo dist/lazycss.spec.json existe e está bem formatado.</p>
                </div>
            `;
        });

    /**
     * Orquestra a renderização de todas as categorias do framework
     */
    function renderShowcase(categories, targetContainer, activeQuery = '') {
        targetContainer.innerHTML = '';

        if (!categories || categories.length === 0) {
            targetContainer.innerHTML = `
                <div style="padding: 2.5rem; text-align: center; background: hsl(var(--lazy-card-raw)); border: 1px dashed hsl(var(--lazy-border-raw)); border-radius: var(--lazy-radius-md);">
                    <p style="font-size: 1.15rem; color: hsl(var(--lazy-text-main-raw)); margin: 0 0 0.5rem 0; font-weight: var(--lazy-weight-medium);">
                        🔍 Nenhum componente encontrado para "${escapeHtml(activeQuery)}"
                    </p>
                    <p style="color: hsl(var(--lazy-text-muted-raw)); margin: 0 0 1.25rem 0; font-size: 0.95rem;">
                        Tente pesquisar por termos como <em>button</em>, <em>form</em>, <em>table</em>, <em>cards</em>, <em>navbar</em> ou <em>badge</em>.
                    </p>
                    <button id="showcase-reset-search-btn" class="lazy-btn lazy-btn-secondary" style="font-size: 0.9rem; padding: 6px 14px; cursor: pointer;">
                        Limpar filtro e ver tudo
                    </button>
                </div>
            `;

            const resetBtn = targetContainer.querySelector('#showcase-reset-search-btn');
            if (resetBtn && searchInput) {
                resetBtn.addEventListener('click', () => {
                    searchInput.value = '';
                    searchInput.focus();
                    performSearch('');
                });
            }
            return;
        }

        categories.forEach(cat => {
            // 1. Cria a Seção da Categoria
            const section = document.createElement('section');
            section.id = cat.id;
            section.style.marginBottom = '4rem';

            // 2. Cabeçalho da Categoria
            section.innerHTML = `
                <div style="margin-bottom: 2rem; border-bottom: 1px solid hsl(var(--lazy-border-raw)); padding-bottom: 1rem;">
                    <h2 style="font-size: 1.8rem; color: hsl(var(--lazy-text-main-raw)); margin: 0 0 0.5rem 0; text-transform: capitalize;">${escapeHtml(cat.category)}: ${escapeHtml(cat.id)}</h2>
                    <p style="color: hsl(var(--lazy-text-muted-raw)); margin: 0; font-size: 1.1rem; line-height: 1.6;">${escapeHtml(cat.description)}</p>
                </div>
            `;

            // 3. Renderiza a Tabela Técnica de Especificações (Blueprint Specs)
            if (cat.blueprint_specs && cat.blueprint_specs.length > 0) {
                const specsTitle = document.createElement('h3');
                specsTitle.innerText = '📋 Contrato Técnico (IA Specs)';
                specsTitle.style.cssText = 'font-size: 1.2rem; margin-bottom: 1rem; color: hsl(var(--lazy-text-main-raw));';
                section.appendChild(specsTitle);

                const table = document.createElement('table');
                table.className = 'lazy-table';
                
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
                    const badgeStyle = getContextBadgeStyle(spec.context);

                    tr.innerHTML = `
                        <td data-label="Signature / Selector" style="font-family: monospace; font-size: 0.95rem; color: hsl(var(--lazy-danger-raw)); font-weight: bold;">\`${escapeHtml(spec.signature)}\`</td>
                        <td data-label="Parent Context"><span style="${badgeStyle}">${escapeHtml(spec.context)}</span></td>
                        <td data-label="Strict Architectural Rule & Expected Behavior" style="color: hsl(var(--lazy-text-muted-raw)); line-height: 1.5; font-size: 0.95rem;">${escapeHtml(spec.description)}</td>
                    `;
                    tbody.appendChild(tr);
                });
                section.appendChild(table);
            }

            // 4. Renderiza a Vitrine Visual de Elementos (Sandbox Elements)
            if (cat.sandbox_elements && cat.sandbox_elements.length > 0) {
                const visualTitle = document.createElement('h3');
                visualTitle.innerText = '✨ Demonstração Visual (Visual Preview)';
                visualTitle.style.cssText = 'font-size: 1.2rem; margin-top: 1.5rem; margin-bottom: 1rem; color: hsl(var(--lazy-text-main-raw));';
                section.appendChild(visualTitle);

                const grid = document.createElement('div');
                grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;';

                cat.sandbox_elements.forEach((element) => {
                    const card = document.createElement('div');
                    card.style.cssText = 'border: 1px solid hsl(var(--lazy-border-raw)); background: hsl(var(--lazy-card-raw)); border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--lazy-shadow-flat);';

                    // Cabeçalho do Card com botões de Ação (Copiar + Ver Código)
                    const cardHeader = document.createElement('div');
                    cardHeader.style.cssText = 'padding: 0.75rem 1rem; background: hsl(var(--lazy-bg-raw)); border-bottom: 1px solid hsl(var(--lazy-border-raw)); display: flex; justify-content: space-between; align-items: center;';
                    cardHeader.innerHTML = `
                        <span style="font-weight: 500; font-size: 0.9rem; color: hsl(var(--lazy-text-main-raw));">${escapeHtml(element.name)}</span>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="lazy-toggle-code-btn" style="padding: 4px 8px; font-size: 0.8rem; cursor: pointer; border: 1px solid hsl(var(--lazy-border-raw)); background: hsl(var(--lazy-card-raw)); border-radius: 4px; color: hsl(var(--lazy-text-main-raw)); transition: all 0.2s; font-weight: 500;">
                                &lt;/&gt; Ver Código
                            </button>
                            <button class="lazy-copy-btn" style="padding: 4px 8px; font-size: 0.8rem; cursor: pointer; border: 1px solid hsl(var(--lazy-border-raw)); background: hsl(var(--lazy-card-raw)); border-radius: 4px; color: hsl(var(--lazy-text-main-raw)); transition: all 0.2s; font-weight: 500;" data-html="${encodeURIComponent(element.html || '')}">📑 Copiar</button>
                        </div>
                    `;

                    // Preview em Tempo Real (Injeta o código gerado)
                    const previewArea = document.createElement('div');
                    previewArea.classList.add('lazy-showcase-preview');
                    previewArea.style.cssText = 'padding: 1.5rem; flex-grow: 1; background: hsl(var(--lazy-bg-raw)); color: hsl(var(--lazy-text-main-raw)); position: relative;';
                    previewArea.innerHTML = element.html || '';

                    // Bloco de Código Oculto por Padrão
                    const codeArea = document.createElement('div');
                    codeArea.style.cssText = 'display: none; border-top: 1px solid hsl(var(--lazy-border-raw));';
                    
                    const pre = document.createElement('pre');
                    pre.style.cssText = 'margin: 0; background: #0f172a; padding: 1rem; overflow-x: auto; border-radius: 0;';
                    
                    const code = document.createElement('code');
                    code.style.cssText = 'font-family: monospace; font-size: 0.85rem; color: #38bdf8; white-space: pre;';
                    code.textContent = (element.html || '').trim();
                    
                    pre.appendChild(code);
                    codeArea.appendChild(pre);

                    // Evento para expandir e recolher o código
                    const toggleBtn = cardHeader.querySelector('.lazy-toggle-code-btn');
                    if (toggleBtn) {
                        toggleBtn.addEventListener('click', () => {
                            const isHidden = codeArea.style.display === 'none';
                            if (isHidden) {
                                codeArea.style.display = 'block';
                                toggleBtn.innerText = '▲ Ocultar';
                                toggleBtn.style.background = 'hsl(var(--lazy-border-raw) / 0.5)';
                            } else {
                                codeArea.style.display = 'none';
                                toggleBtn.innerText = '</> Ver Código';
                                toggleBtn.style.background = 'hsl(var(--lazy-card-raw))';
                            }
                        });
                    }

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
});

/**
 * Configura o comportamento de copiar código para a área de transferência
 */
function setupCopyBehavior() {
    document.querySelectorAll('.lazy-copy-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const rawHtml = decodeURIComponent(e.currentTarget.getAttribute('data-html') || '');
            
            navigator.clipboard.writeText(rawHtml).then(() => {
                const originalText = e.currentTarget.innerText;
                button.innerText = '✓ Copiado!';
                button.style.background = '#dcfce7';
                button.style.color = '#15803d';
                button.style.borderColor = '#bbf7d0';

                setTimeout(() => {
                    button.innerText = originalText;
                    button.style.background = 'hsl(var(--lazy-card-raw))';
                    button.style.color = 'hsl(var(--lazy-text-main-raw))';
                    button.style.borderColor = 'hsl(var(--lazy-border-raw))';
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