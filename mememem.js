let imgFronts = new Array(8).fill(0);
const imgBack = 'var';
console.log(imgFronts);
class Card {
	constructor(cardImg, cardNumber) {
		this.cardImg = cardImg;
		this.cardNumber = cardNumber;

	}
	draw() { 
		let card = document.createElement('div');
		//let cardBack = document.createElement('img');
		let cardBack = document.createElement('p');
		let cardFront = document.createElement('div');
		let imgFront = document.createElement('p');
		//let imgFront = document.createElement('img');
		//cardBack.setAttribute('src', imgBack);
		cardBack.setAttribute('class', 'back');
		cardFront.setAttribute('class', 'front');
		//imgFront.setAttribute('src', this.cardImg);
		imgFront.textContent = this.cardNumber;
		card.setAttribute('class', 'card');
		card.setAttribute('id', this.cardNumber);
		card.appendChild(cardBack);
		cardFront.appendChild(imgFront);
		card.appendChild(cardFront);
		console.log(card);
		return card;

	}
	cardClick() {

	}
}
class Board {
	constructor(numberOfCards, imgFronts) {
		this.numberOfCards = numberOfCards;
		this.imgFronts = imgFronts;
		this.cards = [];
	}
	makeCards() {
		if(this.numberOfCards<=(this.imgFronts.length*2)) {
			for(let i=0; i<this.numberOfCards; i=i+2){
				let card1 = new Card(this.imgFronts[i], i);
				let card2 = new Card(this.imgFronts[i], i+1);
				this.cards.push(card1.draw());
				this.cards.push(card2.draw());
			}
		}
		else{
			console.log("to run you need to reset number of cards to be less than double of imgs array");
		}
	}
	setBoard(){
		console.log(this.cards);
		let shuffled = shuffle(this.cards);
		console.log(shuffled);

		for(let i=0; i<shuffled.length; i++) {
			let domTarget = document.getElementById('board');
			domTarget.appendChild(shuffled[i]);
		}
	}
}
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
let gameBoard = new Board(8, imgFronts);
gameBoard.makeCards();
gameBoard.setBoard();
