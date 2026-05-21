// Função de denúncia via EmailJS (Atualizado para SDK v4)
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalDenuncia");
  const abrirBtn = document.getElementById("btnDenunciar");
  const fecharBtn = document.getElementById("fecharModal");
  const form = document.getElementById("formDenuncia");
  const resposta = document.getElementById("respostaDenuncia");

  // CONFIGURAÇÕES DO SEU EMAILJS
  const SERVICE_ID = "service_hdzz4yt"; 
  const TEMPLATE_ID = "template_h3t5my5";
  const PUBLIC_KEY = "G6ozBeHyRAqDXkP7H"; // Sua chave real aplicada

  // Inicialização correta para a versão 4.x do EmailJS
  emailjs.init({
    publicKey: PUBLIC_KEY,
  });

  // Abrir modal
  if (abrirBtn) {
    abrirBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  }

  // Fechar modal
  if (fecharBtn) {
    fecharBtn.addEventListener("click", () => {
      modal.style.display = "none";
      resposta.textContent = "";
    });
  }

  // Fechar clicando fora do modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      resposta.textContent = "";
    }
  });

  // Enviar denúncia
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      resposta.textContent = "⏳ Enviando denúncia...";
      resposta.style.color = "#2563eb";

      // Na versão 4, passamos as opções com a publicKey também no envio para garantir a autenticação
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY
      })
      .then(() => {
        resposta.textContent = "✅ Denúncia enviada com sucesso!";
        resposta.style.color = "#22c55e";
        form.reset();
        
        setTimeout(() => {
          modal.style.display = "none";
          resposta.textContent = "";
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro detalhado do EmailJS:", error);
        resposta.textContent = "❌ Falha ao enviar. Tente novamente.";
        resposta.style.color = "#ef4444";
      });
    });
  }
});