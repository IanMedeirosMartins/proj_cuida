document.addEventListener("DOMContentLoaded", () => {
  const botao = document.getElementById("saibaMais");
  const textoExtra = document.getElementById("textoExtra");

  // Segurança: evita erro se não encontrar elementos
  if (!botao || !textoExtra) return;

  botao.addEventListener("click", () => {
    // Alterna a classe
    textoExtra.classList.toggle("hidden");

    // Verifica se está escondido
    const escondido = textoExtra.classList.contains("hidden");

    // Atualiza o texto do botão
    botao.textContent = escondido ? "Saiba Mais" : "Mostrar menos";
  });
});