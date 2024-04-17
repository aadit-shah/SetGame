//compare the number of three cards
function compareNumber(card1, card2, card3) {
    let result = false;

    if (card3 !== null && card1.number === card2.number && card2.number === card3.number) {
        result = true;
    } else if (card1.number !== card2.number && card2.number !== card3.number && card1.number !== card3.number) {
        result = true;
    }

    return result;
}

//compare the shape three cards
function compareShape(card1, card2, card3) {
    let result = false;

    if (card1.shape === card2.shape && card2.shape === card3.shape) {
        result = true;
    } else if (card1.shape !== card2.shape && card2.shape !== card3.shape && card1.shape !== card3.shape) {
        result = true;
    }

    return result;
}

//compare the shading of three cards
function compareShading(card1, card2, card3) {
    let result = false;

    if (card1.shading === card2.shading && card2.shading === card3.shading) {
        result = true;
    } else if (card1.shading !== card2.shading && card2.shading !== card3.shading && card1.shading !== card3.shading) {
        result = true;
    }

    return result;
}

//compare the color of three cards
function compareColor(card1, card2, card3) {
    let result = false;

    if (card1.color === card2.color && card2.color === card3.color) {
        result = true;
    } else if (card1.color !== card2.color && card2.color !== card3.color && card1.color !== card3.color) {
        result = true;
    }

    return result;
}

//check whether three cards can form a valid set
function isASet(index1, index2, index3) {
    let card1 = cardsTabled[index1];
    let card2 = cardsTabled[index2];
    let card3 = cardsTabled[index3];

    return (
        compareNumber(card1, card2, card3) &&
        compareShape(card1, card2, card3) &&
        compareShading(card1, card2, card3) 
    );
}


// search for the possible set
function hintFinder() {
    let card1, card2, card3;
    let numberOfCard = cardsTabled.length;
    let find = false;

    //Runs through all card combinations to find cards to print a hint
    outerLoop: for (let a = 0; a < numberOfCard; a++) {
        for (let b = a + 1; b < numberOfCard; b++) {
            for (let c = b + 1; c < numberOfCard; c++) {                
                if (isASet(a, b, c)) {
                    card1 = a;
                    card2 = b;
                    card3 = c;
                    find = true;
                    break outerLoop;
                }
            }
        }
    }
    

    if (find) {
        highlightCards(card2, card3);
    }
    else{
        window.alert("There are no sets on the table");
    } 
}

//check whether there is a set left in table and deck combined
function setLeftAll() {
    let card1, card2, card3;
    let allCardsLeft = cardsTabled.concat(cardsInDeck);
    let numberOfCard = allCardsLeft.length;
    let find = false;

    //Runs through all card combinations to find cards to print a hint
    outerLoop: for (let a = 0; a < numberOfCard; a++) {
        for (let b = a; b < numberOfCard; b++) {
            for (let c = b; c < numberOfCard; c++) {
                // need to be modified based on others code
                if (isASet(allCardsLeft[a], allCardsLeft[b], allCardsLeft[c])) {
                    find = true;
                    break outerLoop;
                }
            }
        }
    }

    return find;

}
