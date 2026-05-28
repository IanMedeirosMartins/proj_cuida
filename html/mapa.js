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
      { nome: "Policlínica Agamenon Magalhães", lat: -8.0775, lng: -34.9064, status: "Disponível" },
      { nome: "Policlínica Lessa de Andrade", lat: -8.0513, lng: -34.9097, status: "Disponível" },
      { nome: "Policlínica Waldemar de Oliveira", lat: -8.0489, lng: -34.8835, status: "Falta Insulina" },
      { nome: "Policlínica Gouveia de Barros", lat: -8.0612, lng: -34.8874, status: "Disponível" },
      { nome: "Policlínica Clementino Fraga", lat: -8.0262, lng: -34.9198, status: "Disponível" },
      { nome: "Policlínica Arnaldo Marques", lat: -8.1258, lng: -34.9336, status: "Falta Insulina" },
      { nome: "Policlínica Amaury de Medeiros", lat: -8.0195, lng: -34.8892, status: "Falta Insulina" },
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