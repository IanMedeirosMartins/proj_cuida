// Função de busca dos postos de saúde
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar input");
  const rows = document.querySelectorAll("tbody tr");

  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();

    rows.forEach(row => {
      const cell = row.querySelector("td:first-child");
      const nomePosto = cell.textContent.toLowerCase();

      // Remove qualquer destaque anterior
      cell.innerHTML = cell.textContent;

      if (nomePosto.includes(termo)) {
        row.style.display = "";

        // Aplica destaque
        if (termo.trim() !== "") {
          const regex = new RegExp(`(${termo})`, "gi");
          cell.innerHTML = cell.textContent.replace(regex, `<mark>$1</mark>`);
        }
      } else {
        row.style.display = "none";
      }
    });
  });
});
