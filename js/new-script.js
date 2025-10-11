// Ativa tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// --- Backgrounds Aleatórios ---
$(document).ready(function() {
  /**
   * Define uma imagem de fundo aleatória para um elemento.
   * @param {string} elementId - O ID do elemento alvo.
   * @param {string[]} images - Um array com os caminhos das imagens.
   */
  function setRandomBackground(elementId, images) {
    const element = document.getElementById(elementId);
    if (element && images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const selectedImage = images[randomIndex];
      element.style.backgroundImage = `url(${selectedImage})`;
    }
  }

  // Define as imagens para a página inicial
  setRandomBackground('bg-index', [
    'images/backgrounds/bg1.webp',
    'images/backgrounds/bg2.webp',
    'images/backgrounds/bg3.webp'
  ]);

  // Define as imagens para a página de contato
  setRandomBackground('bg-contato', [
    'images/backgrounds/bg1-contact.webp',
    'images/backgrounds/bg2-contact.webp',
    'images/backgrounds/bg3-contact.webp'
  ]);
});

// Agenda
$(document).ready(function () {
  const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmYuJS3ywz9EvH1IhAn-AoyOxRch9ZovA2ZB1fGbTmMbpQmYwrubyIj359zDJXeYc7Etbw_00gqGcP/pub?gid=0&single=true&output=csv';
  const agendaContainer = $('#agenda-container');
  const agendaTitle = $('#agenda-title');

  // Mensagem de carregamento
  agendaContainer.html('<div class="col-12 mt-5 text-center"><p class="loading-message"> ▪️ Ligando o raio do Tinder... 📱 </p></div>');

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
                <div class="card-adquira">
                  <div class ="card-adquira-text">Adquira seu Ingresso</div>
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
      agendaContainer.html('<div class="col-12 text-center"><p class="error-message">Hoje o Tinder ta fraco 😓 <br> Erro ao carregar a agenda. Tente novamente. 🔃</p></div>');
    }
  });
});

// Função que faz o colapso do menu ao clicar em um link
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

// Rolagem suave para a seção Agenda com deslocamento
$('a[href="#agenda"]').on('click', function(event) {
  // Previne o comportamento padrão do link
  event.preventDefault();

  var target = $('#agenda');
  if (target.length) {
    var headerHeight = $('.navigation').outerHeight();
    var offset = headerHeight + 0; // 30px de espaço extra

    // Anima a rolagem
    $('html, body').animate({
      scrollTop: target.offset().top - offset
    }, 800); // 800ms de duração para a animação
  }
});

// Função para copiar e-mail
function handleCopyEmail(event) {
  event.preventDefault();
  const email = 'ivangelicacomedy@gmail.com';
  const copyButton = $(this);

  navigator.clipboard.writeText(email).then(function() {
    // Sucesso ao copiar
    const originalTitle = copyButton.attr('data-original-title');
    copyButton.attr('data-original-title', 'Copiado! ✅').tooltip('show');

    // Volta ao texto original depois de 2 segundos
    setTimeout(function() {
      copyButton.attr('data-original-title', originalTitle).tooltip('hide');
    }, 2000);
  }, function(err) {
    // Erro ao copiar
    console.error('Erro ao copiar e-mail: ', err);
    copyButton.attr('data-original-title', 'Erro ao copiar').tooltip('show');
  });
}

$('#copy-email-btn-index').on('click', handleCopyEmail);
$('#copy-email-btn-contact').on('click', handleCopyEmail);
