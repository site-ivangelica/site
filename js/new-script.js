// Ativa tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Agenda
$(document).ready(function () {
  const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmYuJS3ywz9EvH1IhAn-AoyOxRch9ZovA2ZB1fGbTmMbpQmYwrubyIj359zDJXeYc7Etbw_00gqGcP/pub?gid=0&single=true&output=csv';
  const agendaContainer = $('#agenda-container');
  const agendaTitle = $('#agenda-title');

  // Mensagem de carregamento
  agendaContainer.html('<div class="col-12 mt-5 text-center"><p class="loading-message"> Ligando o raio do Tinder... 📱 Carregando a agenda de eventos... 📅</p></div>');

  Papa.parse(GOOGLE_SHEET_CSV_URL, {
    download: true,
    header: true,
    complete: function (results) {
      const links = results.data.filter(item => item.link && item.texto); // Filtra linhas vazias

      if (links.length === 0) {
        agendaTitle.hide();
        agendaContainer.html(''); // Esconde a seção se não houver eventos
        return;
      }

      agendaContainer.empty(); // Limpa a mensagem de "carregando"

      links.forEach(function (item) {
        // Cria a estrutura do card para cada evento
        const cardHtml = `
          <div class="col-lg-4 col-md-6 mb-4">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="agenda-card-link">
              <div class="card agenda-card">
                <img src="${item.imagem}" class="card-img-top" alt="Imagem do Evento ${item.texto}">
                <div class="card-body">
                  <p class="card-text">${item.texto}</p>
                </div>
              </div>
            </a>
          </div>
        `;
        agendaContainer.append(cardHtml);
      });
    },
    error: function (err) {
      console.error("Erro ao buscar dados:", err);
      agendaContainer.html('<div class="col-12 text-center"><p class="error-message">Erro ao carregar a agenda. Tente novamente mais tarde.</p></div>');
    }
  });
});
