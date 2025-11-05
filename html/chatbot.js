document.addEventListener("DOMContentLoaded", () => {
  const chatbotContainer = document.getElementById("chatbot-container");
  const chatbotBody = document.getElementById("chatbot-body");
  const chatbotOptions = document.getElementById("chatbot-options");
  const openChatButton = document.getElementById("open-chatbot");

  // Perguntas e respostas
  const perguntas = [
    { pergunta: "📍 Onde posso encontrar insulina disponível?", resposta: "Você pode verificar na aba de mapa do site os postos com insulina disponível. O sistema é atualizado frequentemente pela comunidade." },
    { pergunta: "💊 O que fazer se faltar tiras de glicose?", resposta: "Caso falte tiras de glicose, você pode denunciar pelo botão Denunciar falta, para alertar outros usuários e as autoridades locais." },
    { pergunta: "📱 Como entro no grupo comunitário?", resposta: "Você pode clicar no botão 'Entrar no Grupo Comunitário' na seção de Grupo Comunitário da página inicial." },
    { pergunta: "🩸 O que é o Alerta Diabetes Comunitário?", resposta: "É uma iniciativa comunitária que conecta pacientes diabéticos e facilita o compartilhamento de informações sobre medicamentos nos postos de saúde." },
    { pergunta: "📞 Como posso falar com o suporte?", resposta: "Acesse a página 'Contato' e envie uma mensagem pelo formulário. Responderemos o mais breve possível." },
  ];

  // Exibir perguntas no painel
  perguntas.forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p.pergunta;
    btn.addEventListener("click", () => enviarPergunta(p));
    chatbotOptions.appendChild(btn);
  });

  // Função principal de envio
  function enviarPergunta(p) {
    const userMsg = document.createElement("div");
    userMsg.classList.add("user-message");
    userMsg.textContent = p.pergunta;
    chatbotBody.appendChild(userMsg);

    setTimeout(() => {
      const botMsg = document.createElement("div");
      botMsg.classList.add("bot-message");

      // Cria o texto da resposta
      const texto = document.createElement("span");
      texto.textContent = p.resposta;

      // Cria o botão de áudio 🔊
      const audioBtn = document.createElement("button");
      audioBtn.classList.add("bot-audio");
      audioBtn.innerHTML = "🔊";
      audioBtn.title = "Ouvir resposta";

      // Ao clicar, fala a resposta
      audioBtn.addEventListener("click", () => falar(p.resposta));

      // Adiciona texto + botão
      botMsg.appendChild(texto);
      botMsg.appendChild(audioBtn);
      chatbotBody.appendChild(botMsg);

      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }, 500);
  }

  // 🎤 Função de fala
  function falar(texto) {
    if (!window.speechSynthesis) return;

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    fala.pitch = 1.1;
    fala.rate = 1;

    const vozes = window.speechSynthesis.getVoices();
    const voz = vozes.find(v => v.lang === "pt-BR" && v.name.toLowerCase().includes("female"))
             || vozes.find(v => v.lang === "pt-BR")
             || vozes[0];
    if (voz) fala.voice = voz;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(fala);
  }

  // Corrige carregamento de vozes
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };

  // Mostrar / esconder chat
  openChatButton.addEventListener("click", () => {
    chatbotContainer.style.display =
      chatbotContainer.style.display === "flex" ? "none" : "flex";
  });
});
