// Função de busca dinâmica

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar input");

  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
      const cell = row.querySelector("td:first-child");

      const nomePosto = cell.textContent.toLowerCase();

      if (nomePosto.includes(termo)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
});