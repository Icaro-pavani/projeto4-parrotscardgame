let numberOfCards = prompt("Quantas cartas você deseja? (números de 4 à 14 pares)");
let flipCardCount = 0;
let cardArray = [];
let cardValue = null;
let flippedCard = null;
let seconds = 0;
const counter = document.querySelector('h2');
let cancel = null;

function shuffle() {
    return Math.random() - 0.5;
}

function shuffleCard(numberCard) {
    for (let i = 0; i < numberCard / 2; i++){
        cardArray[i] = i;
        cardArray[i + parseInt(numberCard / 2)] = i;
    }
    console.log(cardArray);
    cardArray.sort(shuffle);
    console.log(cardArray);
}

function checkPair(element) {
    if (flipCardCount % 2 !== 0){
        flippedCard = element;
        console.log(flippedCard.getElementsByTagName('img')[0].alt)
    } else {
        if (flippedCard.getElementsByTagName('img')[0].alt === element.getElementsByTagName('img')[0].alt){
            flippedCard = null;

        } else {
            document.body.style.pointerEvents = 'none';
            setTimeout(function() {
                flippedCard.classList.remove('flip');
                element.classList.remove('flip');
                document.body.style.pointerEvents = 'auto';
            }, 1000);
        }
    }
}

function endGame() {
    const flipped = document.querySelectorAll('.flip');
    console.log(flipped.length);
    if (flipped.length === parseInt(numberOfCards)){
        setTimeout(function() {
            clearInterval(cancel);
            alert(`Você ganhou em ${flipCardCount} jogadas e em ${seconds}!`);
        }, 300);
    }
}

function secondsCount() {
    seconds += 1;
    counter.innerHTML = seconds;
}


function checkNumberCards() {
    if (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0){
        numberOfCards = prompt("Quantas cartas você deseja? (números de 4 à 14 pares)");
        document.addEventListener("change", checkNumberCards());
    } else {
        let card = null;
        let cardFront = null;
        let cardBack = null;
        let imageFront = null;
        let imageBack = null;
        cancel = setInterval(secondsCount, 1000);
        shuffleCard(numberOfCards);
        for (let i = 0; i < numberOfCards; i++){
            card = document.createElement('div');
            cardFront = document.createElement('div');
            cardBack = document.createElement('div');
            imageFront = document.createElement('img');
            imageBack = document.createElement('img');
            card.classList.add('card');
            card.setAttribute('data-identifier', 'card');
            cardFront.classList.add('front-face');
            card.addEventListener('click', function() {
                if (!this.classList.contains('flip')){
                    this.classList.add('flip');
                    flipCardCount += 1;
                }
                console.log(flipCardCount);
                checkPair(this);
                endGame();
            });
            cardFront.classList.add('face');
            cardFront.setAttribute('data-identifier', 'front-face');
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

checkNumberCards();