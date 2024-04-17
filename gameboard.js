
const colors = ["Red", "Green", "Purple"];
const shapes = ["Rectangle", "Squiggle", "Diamond"];
const shades = ["open", "stripe", "solid"];
const number = [1, 2, 3]
var cardsInDeck = [];
var cardsTabled = [];
var hints = [];
var score = 0;

class Card {
    constructor(color, shape, shading, number) {
        this.color = color;
        this.shape = shape;
        this.shading = shading;
        this.number = number;
    }
   
    //Image string of the card
    getImageUrl(){
        let url = "cardDisplay/" + this.shading + "" + this.color + "" + this.shape + "" + this.number;
        url += ".png";
        return url;
    }
    //Alt tag string of the card
    getAlt(){
        return "" + card.number + " " + card.shading + " " + card.shape;
    }
}

//Creates all 81 cards
function initDeck() {
    for (var colorIndex = 0; colorIndex <= colors.length; colorIndex++) {
        for (var shapeIndex = 0; shapeIndex <= shapes.length; shapeIndex++) {
            for (var shadeIndex = 0; shadeIndex <= shades.length; shadeIndex++) {
                for (var numberIndex = 0; numberIndex <= number.length; numberIndex++) {
                    let card = new Card(colors[colorIndex], shapes[shapeIndex], shades[shadeIndex], number[numberIndex]);
                    cardsInDeck.push(card);
                }
            }
        }
    }
}

//Creates the deck and the cards on table
function startUpSequence(){
    initDeck();
    initTable();
}

//Fills the cardsTabled array 
function initTable(){
    cardsTabled = [];
    for(let i = 0; i<11; i++){
		//Random index of a card in the deck
		let index = Math.floor(Math.random()*cardsInDeck.length);

		//Removes card from deck
        let c = cardsInDeck[index];
		cardsInDeck.splice(index,1)[0];

		//Adds card into the table
		cardsTabled.push(c);
    }
}

//Draws out all cards on the table into the grid
function redraw(){
    //Container that has all the cards
    let cardContainer = document.getElementById("card-container");

    //Remove any old cards inside the container
    while(cardContainer.firstChild){
        cardContainer.removeChild(cardContainer.firstChild);
    }

    //Draw out all the current cards in the table
    for(let i = 0; i<cardsTabled.length; i++){
        let card =  cardsTabled[i];
        //Creates a button element for each image
        let btn = document.createElement("button");
        //Gets the image of the corresponding card
        let image = document.createElement("img");
        let url = "cardDisplay/" + card.shading + "" + card.color + "" + card.shape + "" + card.number + ".png";
        console.log(url);
        image.src = url;
        //Puts the image inside the button
        btn.appendChild(image);
        btn.classList.add("button");

        //Adds click event listener for all cards
        btn.addEventListener('click', () => {
            // If the button is already selected, deselect it 
            if (btn.classList.contains('selected')) {
              btn.classList.remove('selected');
            }
            // If the button is not selected  select it 
            else {
              btn.classList.add('selected');
            }
          });
        //Puts the card into the grid container
        cardContainer.appendChild(btn);
    }
    

}

//Adds card from deck to the table
function addCard(){
    //Random index of a card in the deck
    let index = Math.floor(Math.random()*cardsInDeck.length);

	//Removes card from deck
    let c = cardsInDeck[index];
    let card = cardsInDeck.splice(index,1)[0];
    console.log(card.color);
	//Adds card onto the table
    cardsTabled.push(c);

}

function removeSet(index1, index2, index3){
    // Removes the cards in order of largest indicies
	if (index1 > index2 && index1 > index3){
		cardsTabled.splice(index1,1)[0];
		if(index2 > index3){
            cardsTabled.splice(index2,1)[0];
            cardsTabled.splice(index3,1)[0];
        }else{
            cardsTabled.splice(index3,1)[0];
            cardsTabled.splice(index2,1)[0];
		}
    }
    else if(index2 > index1 && index2 > index3){
        cardsTabled.splice(index2,1)[0];
		if(index1 > index3){
            cardsTabled.splice(index1,1)[0];
            cardsTabled.splice(index3,1)[0];
        }else{
            cardsTabled.splice(index3,1)[0];
            cardsTabled.splice(index1,1)[0];
		}
    }
    else{ 
        cardsTabled.splice(index3,1);
		if(index2 > index1){
            cardsTabled.splice(index2,1)[0];
            cardsTabled.splice(index1,1)[0];
        }
		else{ 
            cardsTabled.splice(index1,1)[0];
            cardsTabled.splice(index2,1)[0];
        }
	}

	if(cardsInDeck.length >= 3){
		for(let i = 0; i<3; i++){
			addCard();
        }
    }
	else{ 
        for(let j = 0; j<cardsInDeck.length; j++){
			addCard();
		}
    }
    redraw();
}

//Resets the board with 12 cards
function reshuffle(){
    //Adds cards currently on table back into deck
    let len = cardsTabled.length;
	for(let i = 0; i<len; i++){
        let card = cardsTabled.pop();
		cardsInDeck.push(card);
    }
	//Shuffles and adds 12 new cards into table
	initTable();
}

//Creates an countdown timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            window.alert("The time is over! You lose the game");
            window.location.href = "start_screen.html";
            timer = duration;
        }
    }, 1000);
}

//Timer to display the time
window.onload = function () {
    var fiveMinutes = 300,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};

//Checks if only 3 cards were selected
function validInput(){
    let selectedCount = 0;
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        if (button.classList.contains('selected')) {
            selectedCount++;
        }
    });

    return selectedCount==3;
}

/* Checks if start is only selected once */
function disableStartButton() {
    document.getElementById("startButton").disabled = true;
}

//Gets the current selected cards
function getSelectedCards(){
    let card = 0;
    let index = 0;
    let arr = [0,1,2];
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        if (button.classList.contains('selected')) {
            arr[index] = card;
            index++;
        }
        card++;
    });
    console.log(arr[0]);
    console.log(arr[1]);
    console.log(arr[2]);
    return arr;
}

//Given an array of indeces, highlight the cards at the indeces
function highlightCards(card1, card2){
    const buttons = document.querySelectorAll('.button');
    let index = 0;
    buttons.forEach(button => {
        if (card1==index || card2 == index) {
            button.classList.add('hint');
        }
        index++;
    });
}
