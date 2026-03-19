// Envio de e-mail com EmailJS
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContato");
  const resposta = document.getElementById("resposta");

  // 🔥 Seus dados reais do EmailJS
  const SERVICE_ID = "service_feedback";
  const TEMPLATE_ID = "template_ws6622a"; // ⚠️ você ainda precisa colocar
  const PUBLIC_KEY = "4iwJX88iwwOGPIdIs";

  // Inicializa o EmailJS (forma correta)
  emailjs.init({
    publicKey: PUBLIC_KEY
  });

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