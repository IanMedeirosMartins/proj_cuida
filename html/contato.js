// Envio de e-mail com EmailJS
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContato");
  const resposta = document.getElementById("resposta");

  // 🔧 Cole aqui seus dados do EmailJS:
  const SERVICE_ID = "seu_service_id";
  const TEMPLATE_ID = "seu_template_id";
  const PUBLIC_KEY = "seu_public_key";

  // Inicializa o EmailJS
  emailjs.init(PUBLIC_KEY);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    resposta.textContent = "⏳ Enviando mensagem...";
    resposta.style.color = "#2563eb";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(() => {
        resposta.textContent = "✅ Sua mensagem foi enviada com sucesso!";
        resposta.style.color = "#22c55e";
        form.reset();
      })
      .catch((error) => {
        console.error("Erro:", error);
        resposta.textContent = "❌ Erro ao enviar. Tente novamente.";
        resposta.style.color = "#ef4444";
      });
  });
});
