document.addEventListener("DOMContentLoaded", async () => {
  const containerPrincipal = document.getElementById("lazy-dynamic-content");
  if (!containerPrincipal) return;

  try {
    // 1. Busca o arquivo JSON de dados
    const response = await fetch("./assets/data/components.json");
    const categorias = await response.json();

    // 2. Loop pelas categorias de componentes
    categorias.forEach(cat => {
      const section = document.createElement("section");
      section.className = "play-section";

      const title = document.createElement("h2");
      title.className = "play-title";
      title.textContent = cat.categoria;
      section.appendChild(title);

      const previewBox = document.createElement("div");
      previewBox.className = "preview-box lazy-row";
      previewBox.style.flexWrap = "wrap";

      let codigoAcumulado = "";

      // Loop pelos elementos internos da categoria
      cat.elementos.forEach(el => {
        previewBox.innerHTML += el.html;
        codigoAcumulado += `\n${el.html}\n\n`;
      });

      section.appendChild(previewBox);

      // 3. Cria o Inspetor de Código Dinâmico (Details/Summary)
      const details = document.createElement("details");
      details.className = "code-inspector";
      
      const summary = document.createElement("summary");
      summary.textContent = "👁️ Mostrar Estrutura de Código (HTML Gerado)";
      details.appendChild(summary);

      // Container do Bloco de Código (para posicionar o botão de copiar)
      const codeWrapper = document.createElement("div");
      codeWrapper.className = "code-wrapper";

      // Botão de Copiar Automatizado
      const copyBtn = document.createElement("button");
      copyBtn.className = "lazy-copy-btn";
      copyBtn.textContent = "Copiar";

      // Evento de clique para copiar usando a API nativa do navegador
      const textoParaCopiar = codigoAcumulado.trim();
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(textoParaCopiar).then(() => {
          copyBtn.textContent = "Copiado! ✓";
          copyBtn.classList.add("copied");
          
          // Reseta o botão após 2 segundos
          setTimeout(() => {
            copyBtn.textContent = "Copiar";
            copyBtn.classList.remove("copied");
          }, 2000);
        }).catch(err => {
          console.error("Erro ao copiar código: ", err);
        });
      });

      const pre = document.createElement("pre");
      const code = document.createElement("code");
      code.textContent = textoParaCopiar;
      
      pre.appendChild(code);
      codeWrapper.appendChild(copyBtn); // Injeta o botão no wrapper
      codeWrapper.appendChild(pre);     // Injeta o código no wrapper
      details.appendChild(codeWrapper);
      section.appendChild(details);

      containerPrincipal.appendChild(section);
    });

  } catch (error) {
    console.error("Erro ao carregar os componentes do playground:", error);
  }
});