let numberOfCards = 8;//prompt("Quantas cartas você deseja? (números de 4 à 14 pares)");
let flipCardCount = 0;
let cardArray = [];

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
        shuffleCard(numberOfCards);
        for (let i = 0; i < numberOfCards; i++){
            card = document.createElement('div');
            cardFront = document.createElement('div');
            cardBack = document.createElement('div');
            imageFront = document.createElement('img');
            imageBack = document.createElement('img');
            card.classList.add('card');
            cardFront.classList.add('front-face');
            card.addEventListener('click', function() {
                this.classList.add('flip');
            });
            cardFront.classList.add('face');
            cardBack.classList.add('back-face');
            cardBack.classList.add('face');
            imageFront.setAttribute('src', 'imagens/front.png');
            card.appendChild(cardFront).appendChild(imageFront);
            card.appendChild(cardBack);
            imageBack.setAttribute('src', `imagens/parrot${cardArray[i]}.gif`);
            card.appendChild(cardBack).appendChild(imageBack);
            document.querySelector('main').appendChild(card);
        }
    }
}

document.addEventListener("waiting", checkNumberCards(), false); 