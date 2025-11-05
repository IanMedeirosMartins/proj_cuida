// mapa.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM carregado, verificando Leaflet...");
  
  // Verifica se Leaflet está carregado
  if (typeof L === 'undefined') {
    console.error("Leaflet (L) não está definido!");
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div style="padding: 20px; text-align: center; color: red;">
          <p>Erro: Biblioteca do mapa não carregou corretamente.</p>
          <p>Verifique sua conexão com a internet.</p>
        </div>
      `;
    }
    return;
  }

  console.log("Leaflet carregado com sucesso:", L.version);

  const mapContainer = document.getElementById("map");
  if (!mapContainer) {
    console.error("Elemento #map não encontrado!");
    return;
  }

  try {
    // Cria o mapa centralizado no Recife
    const map = L.map("map").setView([-8.05, -34.9], 12);
    console.log("Mapa criado com sucesso");

    // Adiciona o mapa base (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Lista de postos
    const postos = [
      { nome: "PS Santa Rosa", lat: -8.0126, lng: -34.93, status: "Disponível" },
      { nome: "PS Engenho do Meio", lat: -8.0284, lng: -34.9206, status: "Disponível" },
      { nome: "PS Sadia", lat: -8.04, lng: -34.928, status: "Falta Insulina" },
      { nome: "PS Casa Amarela", lat: -8.0333, lng: -34.93, status: "Falta Insulina" },
    ];

    // Adiciona marcadores no mapa
    postos.forEach(p => {
      const cor = p.status.includes("Disponível") ? "green" : "red";

      const marker = L.circleMarker([p.lat, p.lng], {
        radius: 8,
        color: cor,
        fillColor: cor,
        fillOpacity: 0.8,
      }).addTo(map);

      marker.bindPopup(`<strong>${p.nome}</strong><br>Status: ${p.status}`);
    });

    console.log("Mapa e marcadores carregados completamente");
    
  } catch (error) {
    console.error("Erro ao carregar o mapa:", error);
    mapContainer.innerHTML = `
      <div style="padding: 20px; text-align: center; color: red;">
        <p>Erro ao carregar o mapa: ${error.message}</p>
      </div>
    `;
  }
});