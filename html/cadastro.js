document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalCadastro");
  const abrir = document.getElementById("btnCadastro");
  const fechar = document.getElementById("fecharCadastro");
  const form = document.getElementById("formCadastro");
  const resposta = document.getElementById("respostaCadastro");

  // Abrir modal
  abrir.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Fechar
  fechar.addEventListener("click", () => {
    modal.style.display = "none";
    resposta.textContent = "";
  });

  // Fechar clicando fora
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      resposta.textContent = "";
    }
  });

  // Função que adiciona o posto na tabela
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("cad_nome").value;
    const rua = document.getElementById("cad_rua").value;
    const ref = document.getElementById("cad_ref").value;
    const insulina = document.getElementById("cad_insulina").value;

    // Adicionar na tabela
    adicionarNaTabela(nome, rua, ref, insulina);

    resposta.textContent = "✔ Posto cadastrado com sucesso!";
    resposta.style.color = "#10b981";

    form.reset();

    setTimeout(() => {
      modal.style.display = "none";
      resposta.textContent = "";
    }, 1000);
  });

  function adicionarNaTabela(nome, rua, ref, insulina) {
    const tabela = document.querySelector("tbody");

    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${nome}</td>
      <td>${rua}</td>
      <td>${ref}</td>
      <td>${insulina}</td>
    `;

    tabela.appendChild(linha);
  }
});
