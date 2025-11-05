// Exibir texto adicional quando clicar em "Saiba Mais"
document.addEventListener("DOMContentLoaded", () => {
  const botao = document.getElementById("saibaMais");
  const textoExtra = document.getElementById("textoExtra");

  botao.addEventListener("click", () => {
    if (textoExtra.style.display === "none") {
      textoExtra.style.display = "block";
      botao.textContent = "Mostrar menos";
    } else {
      textoExtra.style.display = "none";
      botao.textContent = "Saiba Mais";
    }
  });
});
