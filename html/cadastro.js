document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalCadastro");
  const abrir = document.getElementById("btnCadastro");
  const fechar = document.getElementById("fecharCadastro");
  const form = document.getElementById("formCadastro");
  const resposta = document.getElementById("respostaCadastro");
  const tabela = document.getElementById("tabelaPostos");

  if (!modal || !abrir || !fechar || !form || !resposta || !tabela) {
    console.error("Erro: elementos não encontrados");
    return;
  }

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

  // Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomeInput = form.querySelector("#cad_nome");
const ruaInput = form.querySelector("#cad_rua");
const insulinaInput = form.querySelector("#cad_insulina");

if (!nomeInput || !ruaInput || !insulinaInput) {
  console.error("Erro: inputs não encontrados dentro do form");
  return;
}

    const nome = nomeInput.value;
    const rua = ruaInput.value;
    const insulina = insulinaInput.value;

    // Validação
    if (!nome || !rua || !insulina) {
      resposta.textContent = "⚠ Preencha todos os campos!";
      resposta.style.color = "red";
      return;
    }

    // Criar objeto
    const novoPosto = {
      nome,
      rua,
      status: insulina,
      lat: -8.05 + Math.random() * 0.02,
      lng: -34.9 + Math.random() * 0.02
    };

    // Salvar no localStorage
    let postos = JSON.parse(localStorage.getItem("postos")) || [];
    postos.push(novoPosto);
    localStorage.setItem("postos", JSON.stringify(postos));

    // Adicionar na tabela
    adicionarNaTabela(nome, rua, insulina);

    resposta.textContent = "✔ Posto cadastrado com sucesso!";
    resposta.style.color = "#10b981";

    form.reset();

    setTimeout(() => {
      modal.style.display = "none";
      resposta.textContent = "";
    }, 1000);
  });

  function adicionarNaTabela(nome, rua, insulina) {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${nome}</td>
      <td>${rua}</td>
      <td>
        <span class="status ${insulina === "Disponível" ? "disponivel" : "falta"}">
          ${insulina}
        </span>
      </td>
    `;

    tabela.appendChild(linha);
  }
});