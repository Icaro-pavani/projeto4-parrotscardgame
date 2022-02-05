let numberOfCards = prompt("Quantas cartas você deseja? (números de 4 à 14 pares)");    //Número de cartas ecolhidas
let flipCardCount = 0;  //Número de jogadas
let cardArray = [];     //Lista com os valores das cartas
let flippedCard = null; //Salva o valor da primeira carta virada
let seconds = 0;        //Segundos decorrido do início do jogo
const counter = document.querySelector('h2');   //Pega o elemento do contador de segundo
let cancel = null;      //variável para parar o contador de segundo

// Função de ordanação aleatória
function shuffle() {
    return Math.random() - 0.5;
}

// Embaralha o array com os valores das cartas
function shuffleCard(numberCard) {
    for (let i = 0; i < numberCard / 2; i++){
        cardArray[i] = i;
        cardArray[i + parseInt(numberCard / 2)] = i;
    }
    cardArray.sort(shuffle);
}

// Checar se duas cartas escolhidas são iguais
function checkPair(element) {
    if (flipCardCount === 1){
        cancel = setInterval(secondsCount, 1000);
    }
    if (flipCardCount % 2 !== 0){
        flippedCard = element;
    } else {
        if (flippedCard.getElementsByTagName('img')[0].alt === element.getElementsByTagName('img')[0].alt){
            flippedCard = null;
        } else {
            document.body.style.pointerEvents = 'none'; //desabilita cliques na página
            setTimeout(function() {     //desvira as cartas após 1s
                flippedCard.classList.remove('flip');
                element.classList.remove('flip');
                flippedCard.classList.remove('disable');
                element.classList.remove('disable');
                document.body.style.pointerEvents = 'auto';
            }, 1000);
        }
    }
}

// Checa e reinicia o jogo dependendo do jogador
function resetGame() {
    let resetMessage = prompt('Quer jogar novamente? (s ou n)') || 'n';
    if (resetMessage.toLowerCase() === 's' || resetMessage.toLowerCase() === 'sim' || resetMessage.toLowerCase() === 'yes'){
        flipCardCount = 0;
        seconds = 0;
        cardArray = [];
        numberOfCards = prompt("Quantas cartas você deseja? (números de 4 à 14 pares)");
        document.querySelector('main').innerHTML = ''; //limpa cartas no corpo da página
        checkNumberCards();
    } else {
        alert('Obrigado por jogar!');
    }
}

// Confirma o final de jogo e apresenta mensagem para o jogador
function endGame() {
    const flipped = document.querySelectorAll('.flip');
    if (flipped.length === parseInt(numberOfCards)){
        setTimeout(function() {
            clearInterval(cancel);
            alert(`Você ganhou em ${flipCardCount} jogadas e em ${seconds} segundos!`);
            resetGame();
        }, 500);
    }
}

// Função do cronometro em segundos
function secondsCount() {
    seconds += 1;
    counter.innerHTML = seconds;
}

// Função de criação do jogo, define numeros de cartas e as funções atreladas a elas
function checkNumberCards() {
    if (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0){
        numberOfCards = prompt("Quantas cartas você deseja? (números de 4 à 14 pares)");
        document.addEventListener("change", checkNumberCards()); //Recursividade para checar a quantidade de cartas
    } else {
        let card = null;
        let cardFront = null;
        let cardBack = null;
        let imageFront = null;
        let imageBack = null;
        counter.innerHTML = 0;
        shuffleCard(numberOfCards);
        for (let i = 0; i < numberOfCards; i++){ //Criação de cada carta com seus componentes
            card = document.createElement('div');
            cardFront = document.createElement('div');
            cardBack = document.createElement('div');
            imageFront = document.createElement('img');
            imageBack = document.createElement('img');
            card.classList.add('card');
            card.setAttribute('data-identifier', 'card');
            cardFront.classList.add('front-face');
            card.addEventListener('click', function() { //Adiciona funções de clique nas cartas
                if (!this.classList.contains('flip')){
                    this.classList.add('flip');
                    this.classList.add('disable');
                    flipCardCount += 1;
                }
                checkPair(this);
                endGame();
            });
            cardFront.classList.add('face');
            cardFront.setAttribute('data-identifier', 'front-face');    //adiciona atributos dentro das tags
            cardBack.classList.add('back-face');
            cardBack.classList.add('face');
            cardBack.setAttribute('data-identifier', 'back-face');
            imageBack.setAttribute('src', 'imagens/front.png');
            card.appendChild(cardFront).appendChild(imageFront);
            card.appendChild(cardBack);
            imageFront.setAttribute('src', `imagens/parrot${cardArray[i]}.gif`);
            imageFront.setAttribute('alt', `parrot${cardArray[i]}`);
            card.appendChild(cardBack).appendChild(imageBack);
            document.querySelector('main').appendChild(card);
        }
    }
}

// Inicia a função de criação das cartas/jogo
checkNumberCards();