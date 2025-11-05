// Função de denúncia via EmailJS
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalDenuncia");
  const abrirBtn = document.getElementById("btnDenunciar");
  const fecharBtn = document.getElementById("fecharModal");
  const form = document.getElementById("formDenuncia");
  const resposta = document.getElementById("respostaDenuncia");

  // 🔧 Substitua pelos seus dados do EmailJS
  const SERVICE_ID = "seu_service_id";
  const TEMPLATE_ID = "template_denuncia_id";
  const PUBLIC_KEY = "seu_public_key";

  emailjs.init(PUBLIC_KEY);

  // Abrir modal
  abrirBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Fechar modal
  fecharBtn.addEventListener("click", () => {
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

  // Enviar denúncia
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    resposta.textContent = "⏳ Enviando denúncia...";
    resposta.style.color = "#2563eb";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(() => {
        resposta.textContent = "✅ Denúncia enviada com sucesso!";
        resposta.style.color = "#22c55e";
        form.reset();
        setTimeout(() => (modal.style.display = "none"), 2000);
      })
      .catch((error) => {
        console.error("Erro:", error);
        resposta.textContent = "❌ Falha ao enviar. Tente novamente.";
        resposta.style.color = "#ef4444";
      });
  });
});
