(function ($) {
    'use strict';

    $(document).ready(function() {

        // --- Sticky Menu ---
        var agendaElement = $('#agenda');
        var navigation = $('.navigation');

        // Verifica se o elemento #agenda existe na página
        if (agendaElement.length) {
            var agendaOffset = agendaElement.offset().top;

            // Função para atualizar o menu na rolagem
            function updateNav() {
                var scrollPos = $(window).scrollTop();

                if (scrollPos > 100) {
                    navigation.addClass('nav-bg');
                    if (scrollPos >= agendaOffset) {
                        navigation.addClass('nav-bg-clear');
                    } else {
                        navigation.removeClass('nav-bg-clear');
                    }
                } else {
                    navigation.removeClass('nav-bg nav-bg-clear');
                }
            }

            // Otimiza o evento de scroll para não sobrecarregar o navegador
            var scrollTimeout;
            $(window).on('scroll', function() {
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                }
                scrollTimeout = setTimeout(updateNav, 10); // Executa a função com um pequeno atraso
            });

            // Executa uma vez no carregamento da página
            updateNav();
        } else {
            // Se #agenda não existe, aplica uma classe padrão (ex: para a página de contato)
            navigation.addClass('nav-bg-clear');
        }


        // Background-images
        $('[data-background]').each(function () {
            $(this).css({
                'background-image': 'url(' + $(this).data('background') + ')'
            });
        });

        // background color
        $('[data-color]').each(function () {
            $(this).css({
                'background-color': $(this).data('color')
            });
        });

        // progress bar
        $('[data-progress]').each(function () {
            $(this).css({
                'bottom': $(this).data('progress')
            });
        });

        function mouseParallax(id, left, top, mouseX, mouseY, speed) {
            var obj = document.getElementById(id);
            if (!obj) return; // Adicionado para evitar erros
            var parentObj = obj.parentNode,
                containerWidth = parseInt(parentObj.offsetWidth),
                containerHeight = parseInt(parentObj.offsetHeight);
            obj.style.left = left - (((mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth) * speed) + 'px';
            obj.style.top = top - (((mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight) * speed) + 'px';
        }

        /* ########################################### hero parallax ############################################## */
        // Executa o parallax somente após o carregamento completo da janela (incluindo imagens)
        $(window).on('load', function() {
            const parallaxBox = document.querySelector('.parallax-container');
            if (!parallaxBox) return; // Evita erros se o container não existir

            // Mapeia os layers e suas velocidades
            const layers = [
                { id: 'l2', speed: 25 }, { id: 'l3', speed: 20 },
                { id: 'l4', speed: 35 }, { id: 'l5', speed: 30 },
                { id: 'l6', speed: 45 }, { id: 'l7', speed: 30 },
                { id: 'l8', speed: 25 }, { id: 'l9', speed: 40 }
            ];

            // Armazena a posição inicial de cada layer que existe na página
            const layerPositions = layers.map(layer => {
                const el = document.getElementById(layer.id);
                return el ? { id: layer.id, speed: layer.speed, left: el.offsetLeft, top: el.offsetTop } : null;
            }).filter(p => p !== null); // Remove os nulos (layers que não existem)

            parallaxBox.onmousemove = function (event) {
                event = event || window.event;
                var x = event.clientX - parallaxBox.offsetLeft,
                    y = event.clientY - parallaxBox.offsetTop;

                // Itera sobre os layers existentes e aplica o parallax
                layerPositions.forEach(layer => {
                    mouseParallax(layer.id, layer.left, layer.top, x, y, layer.speed);
                });
            };
        });
        /* ########################################### /hero parallax ############################################## */

        // testimonial-slider
        $('.testimonial-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            arrows: false,
            adaptiveHeight: true
        });


        // clients logo slider
        $('.client-logo-slider').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1, // Corrigido de 0 para 1 para permitir a rolagem
            autoplay: true,
            dots: false,
            arrows: false,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        // Shuffle js filter and masonry
        var Shuffle = window.Shuffle;
        var jQuery = window.jQuery;

        var shuffleWrapper = document.querySelector('.shuffle-wrapper');
        if (shuffleWrapper) {
            var myShuffle = new Shuffle(shuffleWrapper, {
                itemSelector: '.shuffle-item',
                buffer: 1
            });

            jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
                var input = evt.currentTarget;
                if (input.checked) {
                    myShuffle.filter(input.value);
                }
            });
        }
    });
})(jQuery);