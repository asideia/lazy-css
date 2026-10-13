/**
 * Lazy CSS - Alternador de Tema (changeTheme.js)
 * Localização centralizada: site/assets/scripts/changeTheme.js
 * Alterna entre temas claro e escuro, sincroniza no localStorage,
 * atualiza os botões visuais e propaga para iframes de preview.
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'lazy_theme';

    /**
     * Aplicação síncrona imediata (no head) para evitar FOUC
     */
    try {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme === 'dark' || savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.documentElement.style.colorScheme = savedTheme;
        }
    } catch (_) {}

    /**
     * Retorna o tema atualmente ativo (explícito ou derivado da preferência do sistema)
     */
    function getEffectiveTheme() {
        const explicit = document.documentElement.getAttribute('data-theme');
        if (explicit === 'dark' || explicit === 'light') {
            return explicit;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Atualiza os botões de alternância na tela
     */
    function updateThemeButtons(theme) {
        const isDark = theme === 'dark';
        const buttons = document.querySelectorAll('#lazy-theme-toggle, [data-action="change-theme"], .lazy-theme-toggle');

        buttons.forEach(btn => {
            btn.innerHTML = isDark
                ? '☀️ <span class="theme-text">Claro</span>'
                : '🌙 <span class="theme-text">Escuro</span>';
            btn.setAttribute('aria-label', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');
            btn.setAttribute('title', isDark ? 'Tema atual: Escuro (clique para alternar para Claro)' : 'Tema atual: Claro (clique para alternar para Escuro)');
        });
    }

    /**
     * Sincroniza o iframe do Playground caso esteja presente
     */
    function syncIframeTheme(theme) {
        const iframe = document.getElementById('lazy-preview-frame');
        if (iframe) {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                if (doc && doc.documentElement) {
                    doc.documentElement.setAttribute('data-theme', theme);
                    doc.documentElement.style.colorScheme = theme;
                }
            } catch (_) {}
        }
    }

    /**
     * Aplica um tema ('dark' ou 'light')
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.colorScheme = theme;

        if (document.body) {
            document.body.setAttribute('data-theme', theme);
        }

        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (_) {}

        updateThemeButtons(theme);
        syncIframeTheme(theme);
    }

    /**
     * Alterna o tema com debounce/lock para evitar disparos duplos
     */
    let isToggling = false;
    function toggleTheme() {
        if (isToggling) {
            return getEffectiveTheme();
        }
        isToggling = true;
        setTimeout(() => {
            isToggling = false;
        }, 150);

        const current = getEffectiveTheme();
        const nextTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        return nextTheme;
    }

    // Expõe no escopo global para chamadas diretas (onclick ou scripts externos)
    window.toggleTheme = toggleTheme;
    window.changeTheme = toggleTheme;
    window.applyTheme = applyTheme;
    window.getEffectiveTheme = getEffectiveTheme;

    function init() {
        const currentTheme = getEffectiveTheme();
        applyTheme(currentTheme);

        // Delegação de clique no document para qualquer botão de tema
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('#lazy-theme-toggle, [data-action="change-theme"], .lazy-theme-toggle');
            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
            }
        }, true); // Use capture phase to intercept cleanly

        // Monitora preferência de cores do sistema operacional (se usuário não tiver forçado tema)
        if (window.matchMedia) {
            try {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    const hasStoredTheme = localStorage.getItem(STORAGE_KEY);
                    if (!hasStoredTheme) {
                        applyTheme(e.matches ? 'dark' : 'light');
                    }
                });
            } catch (_) {}
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
