let numberOfCards = prompt("Quantas cartas você deseja? (números de 4 à 14 pares)");

function checkNumberCards() {
    if (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0){
        numberOfCards = prompt("Quantas cartas você deseja? (números de 4 à 14 pares)");
        document.addEventListener("change", checkNumberCards());
    } else {
        let card = null;
        let cardFront = null;
        let cardBack = null;
        let image = null;
        for (let i = 0; i < numberOfCards; i++){
            card = document.createElement('div');
            cardFront = document.createElement('div');
            cardBack = document.createElement('div');
            image = document.createElement('img');
            card.classList.add('card');
            card.addEventListener('click', function() {
                this.classList.toggle('flip');
            });
            cardFront.classList.add('front-face');
            cardFront.classList.add('face');
            cardBack.classList.add('back-face');
            cardBack.classList.add('face');
            image.setAttribute('src', '../imagens/front.png');
            card.appendChild(cardFront).appendChild(image);
            card.appendChild(cardBack);
            document.querySelector('main').appendChild(card);

        }
    }
}

function flip(element){
    element.classList.toggle('flip');
}

document.addEventListener("waiting", checkNumberCards()); 