// Intitial Data for Project -- Card Imagery
let imgFronts = ['dogezilla.jpg', 'frisbeedoge.jpg', 'ifElse.jpg', 'ShamWOW.jpg', 'tommy.jpg', 'wifi.jpg', 'yasss.jpg', 'yearofthedoge.jpg'];
let cardOneChosen = false;
let cardOneNumber;


// Holds template to build a Card and Card Event Functions
class Card {
	// Card needs to be passed a number for organizational purposes
	// and the unique imagery for the front that it and it's match share
	constructor(cardImg, cardNumber, matchNumber) {
		this.cardImg = cardImg;
		this.cardNumber = cardNumber;
		this.matchNumber = matchNumber;

	}
	// Method assembles html elements so card will appear in DOM
	draw() {
		// Create Elements needed for a card
		let card = document.createElement('div');
		//let cardBack = document.createElement('p');
		let cardFront = document.createElement('div');
		//let imgFront = document.createElement('p');
		let imgFront = document.createElement('img');

		// Set Classes and Img srcs using .setAttribute(attribute, selector)
		cardFront.setAttribute('class', 'front');
		card.setAttribute('class', 'card');
		card.setAttribute('id', this.cardNumber);

		// Set Content for element by inserting img src using setAttribute
		imgFront.setAttribute('src', `imgs/${this.cardImg}`);
		//imgFront.textContent = this.cardNumber;

		// Build card by appending elements in correct order
		// Uses append  working top to bottom and from the interior to exterior elements
		cardFront.appendChild(imgFront);
		card.appendChild(cardFront);
		console.log(card);

		// It has not yet been inserted into the dom at this point
		// because the cards need to be shuffled
		// return formatted card to the inside of board.makeCards() where it was called
		return card;

	}
	cardClick() {
		let cardId = document.getElementById(`${this.cardNumber}`);
		cardId.addEventListener(`click`, () => {
			console.log("ya");
			$(`.front`).fadeIn(500);

		});


	}
}

//Board to check game
class Board {
	// Board needs to have how many cards you want and the img data passed to it
	constructor(numberOfCards, imgFronts) {
		this.numberOfCards = numberOfCards;
		this.imgFronts = imgFronts;
		this.cards = [];
	}
	// This metho constructs the cards for the game
	makeCards() {
		// If statement checks to see that the number of cards you want
		// is not going to exceed the number of unique card matches available in the img data
		if(this.numberOfCards<=(this.imgFronts.length*2)) {
			let cardNumber = 0;
			for(let i=0; i<this.imgFronts.length; i++){
				// Sets a pair cards to the same img data...aka a match
				let matchNumber = i;
				let card1 = new Card(this.imgFronts[i], cardNumber, matchNumber);
				this.cards.push(card1.draw());
				cardNumber++;
				let card2 = new Card(this.imgFronts[i], cardNumber, matchNumber);

				// Adds compiled card html that is ready to be appended to the DOM to
				// to an array that will be shuffled in setBoard()
				this.cards.push(card2.draw());
				cardNumber++;

			}
		}
		// This else statement is to catch when an error will occur from intial board parameters
		else {
			console.log("to run you need to reset number of cards to be less than double of imgs array");
		}
	}
	// Takes card elements that were made shuffles them and attaches them to the DOM
	setBoard(){
		console.log(this.cards);
		// shuffle cards and store them in shuffled array
		let shuffled = shuffle(this.cards);
		console.log(shuffled);

		// Iterate through shuffled array and add each card to the DOM targeting
		// #board id
		for(let i=0; i<shuffled.length; i++) {
			let domTarget = document.getElementById('board');
			domTarget.appendChild(shuffled[i]);
			// shuffled[i].cardClick();

		}
	}
}

// shuffle() is used to shuffle the card order, borrowed from a stackoverflow thread
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
function checkMatch(cardOneChosen, card) {

}


///////////////////////////////////////////
//////////////////////////////////////////
/////////////////////////////////////////
// Create a new game board
$('#reset').hide();
$('#board').hide();
$('#start').on("click", ()=> {
	$('#start').slideUp(1000);
	$('#board').fadeIn(2000);
	let gameBoard = new Board(16, imgFronts);
	// Make the cards for the game board
	gameBoard.makeCards();
	$('#reset').toggle();
	// Shuffle cards and add them to the DOM
	gameBoard.setBoard();
	$(".front").hide();

});
let reset = document.getElementById('reset');
reset.addEventListener("click", () => {
	let board = document.getElementById('board');
	board.innerHTML = '';
	$('#start').show();
	$('#reset').toggle();
	$('#board').hide();
});
$('#victory').hide();
