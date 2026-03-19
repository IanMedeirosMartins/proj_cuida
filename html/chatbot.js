document.addEventListener("DOMContentLoaded", () => {
  const chatbotContainer = document.getElementById("chatbot-container");
  const chatbotBody = document.getElementById("chatbot-body");
  const chatbotOptions = document.getElementById("chatbot-options");
  const openChatButton = document.getElementById("open-chatbot");

  if (!chatbotContainer || !chatbotBody || !chatbotOptions || !openChatButton) {
    console.error("Erro: elementos do chatbot não encontrados");
    return;
  }

  // ===== Dados =====
  const perguntas = [
    {
      pergunta: "📍 Onde posso encontrar insulina disponível?",
      resposta: "Você pode verificar na aba de mapa do site os postos com insulina disponível."
    },
    {
      pergunta: "💊 O que fazer se faltar tiras de glicose?",
      resposta: "Use o botão de denúncia para alertar outros usuários."
    },
    {
      pergunta: "📱 Como entro no grupo comunitário?",
      resposta: "Clique no botão 'Entrar no Grupo Comunitário' na página inicial."
    },
    {
      pergunta: "🩸 O que é o Alerta Diabetes Comunitário?",
      resposta: "É uma plataforma que conecta pacientes e compartilha informações sobre medicamentos."
    },
    {
      pergunta: "📞 Como posso falar com o suporte?",
      resposta: "Acesse a página de contato e envie uma mensagem."
    }
  ];

  // ===== Funções =====
  function criarMensagem(texto, tipo) {
    const msg = document.createElement("div");
    msg.classList.add(tipo === "user" ? "user-message" : "bot-message");

    const span = document.createElement("span");
    span.textContent = texto;

    msg.appendChild(span);

    if (tipo === "bot") {
      const audioBtn = document.createElement("button");
      audioBtn.classList.add("bot-audio");
      audioBtn.innerHTML = "🔊";
      audioBtn.title = "Ouvir resposta";

      audioBtn.addEventListener("click", () => falar(texto));
      msg.appendChild(audioBtn);
    }

    chatbotBody.appendChild(msg);
    scrollChat();
  }

  function scrollChat() {
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  function enviarPergunta(p) {
    criarMensagem(p.pergunta, "user");

    setTimeout(() => {
      criarMensagem(p.resposta, "bot");
    }, 500);
  }

  function falar(texto) {
    if (!window.speechSynthesis) return;

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.pitch = 1.1;
    fala.rate = 1;

    const vozes = window.speechSynthesis.getVoices();

    // Melhor seleção de voz
    const vozPt = vozes.find(v => v.lang.includes("pt-BR")) || vozes[0];
    if (vozPt) fala.voice = vozPt;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(fala);
  }

  function toggleChat() {
    chatbotContainer.style.display =
      chatbotContainer.style.display === "flex" ? "none" : "flex";
  }

  // ===== Inicialização =====
  perguntas.forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p.pergunta;
    btn.addEventListener("click", () => enviarPergunta(p));
    chatbotOptions.appendChild(btn);
  });

  openChatButton.addEventListener("click", toggleChat);

  // Corrigir carregamento de vozes
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
});