// carousel

// Array storage class
let carouselArr = [];

// class Carousel
class Carousel {
    // Atributos da classe
    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }

    // Atributos estáticos para controlar o carrossel
    static _sequence = 0; // Índice da imagem atual
    static _size = 0;     // Tamanho total do array de imagens
    static _interval = null; // Variável para armazenar o ID do intervalo (para poder limpar)

    /**
     * Inicia o carrossel.
     * @param {Array<Carousel>} arr - Um array de objetos Carousel.
     */
    static Start(arr) {
        if (arr && arr.length > 0) {
            Carousel._sequence = 0; // Reinicia a sequência
            Carousel._size = arr.length; // Define o tamanho do carrossel
            
            // Limpa qualquer intervalo existente para evitar múltiplos carrosséis rodando
            if (Carousel._interval) {
                clearInterval(Carousel._interval);
            }

            // Exibe a primeira imagem imediatamente
            Carousel.Next(arr); 
            
            // Configura o intervalo para exibir a próxima imagem a cada 5 segundos (5000ms)
            Carousel._interval = setInterval(function() { 
                Carousel.Next(arr); 
            }, 5000);
        } else {
            console.error("O método Start precisa de um array de objetos Carousel não vazio.");
            // Lança um erro para indicar que o array é inválido, mas não interrompe a execução
            // throw "Method Start need a Array Variable."; 
        }
    }

    /**
     * Exibe o próximo item do carrossel na tela.
     * @param {Array<Carousel>} arr - O array de objetos Carousel.
     */
    static Next(arr) {
        if (!arr || arr.length === 0) {
            console.error("Array do carrossel vazio ou inválido no método Next.");
            return;
        }

        // Obtém o objeto Carousel atual com base na sequência
        const currentItem = arr[Carousel._sequence];

        // Obtém as divs do HTML
        const carouselDiv = document.getElementById("carousel");
        const carouselTitleDiv = document.getElementById("carousel-title");

        if (carouselDiv && carouselTitleDiv) {
            // Altera o estilo CSS para exibir a imagem
            // Usa 'url()' para definir a imagem de fundo
            carouselDiv.style.backgroundImage = `url(img/${currentItem.image})`;
            carouselDiv.style.backgroundSize = 'cover'; // Garante que a imagem cubra toda a div
            carouselDiv.style.backgroundPosition = 'center'; // Centraliza a imagem

            // Injeta o texto com um link na div do título
            carouselTitleDiv.innerHTML = `<a href="${currentItem.url}">${currentItem.title}</a>`;
        } else {
            console.error("Elementos 'carousel' ou 'carousel-title' não encontrados no DOM.");
        }

        // Incrementa o contador para o próximo item
        Carousel._sequence++;

        // Se a sequência atingir o final do array, volta para o início
        if (Carousel._sequence >= Carousel._size) {
            Carousel._sequence = 0;
        }
    }
}