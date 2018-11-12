//----------------------------runner area----------------------------------------------
//-------------------------------------------------------------------------------------
// 
var openedCards = [];// init as global 
var counter     =  0; // init counter 
var ratingStars = $('i');
var clicks      = 0;
var theEnd      = false;
cardsList       = cardSInit(); // init cards as globals
DisplayCards(); // DISPLAY and SUFFLE them
// add eventListener to them
$(".block").on('click',function(){
	clicks++; 
	clicks == 1 ? setInterval(setTime, 1000) :'';
	$(this).attr("disabled", "disabled");
	matcher(this);
});// TRAGER EVENTLISTENR WITH ONCLICK
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------
/*
 * Create a list that holds all of your cards
 */
function cardSInit(){
	var cards = [];
	cards     = document.getElementsByClassName("block");
	ratingStars.removeClass('fa-star-o').addClass('fa-star');
	return transformer(cards);
}
//-------------------------------------------------------
function transformer(obj){
	var result = [];
	for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	        result.push(obj[key].innerHTML); 
	    }
	}
	return   result;
}
//---------------------------------------------------------
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//-------------------------------------------------------
function DisplayCards(){
	createList();
}// end of DisplayCards
//-------------------------------------------------------
function createList(){
	var List    = document.createElement("ul");
	var cardsShuffled = shuffle(cardsList); // shuffle list
	for (var i = 0; i < cardsShuffled.length; i++ ) {
    	// Add to list li 
    	var li = document.createElement("li");
    	li.innerHTML    = cardsShuffled[i]; 
    	li.classList.add("block");
		List.appendChild(li);
     }
    document.getElementsByClassName("deck")[0].innerHTML = List.innerHTML; // get node
}	


//----------------------------------------------------------------------
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
//----------------------------------------------------------
function matcher(card){
	if(isClicked(card)){ return; }
	displaySymbol(card);
	markedOpen(card);

}// end of handleMaths
//---------------------------------------------------------
function displaySymbol(card){
	$(card).addClass( "show open" );
}// end of displayCardSymbol
//--------------------------------------------------------
function isMatch(openedCards){
	// expected array with two element
	var cond1 = $(openedCards[0]).is($(openedCards[1])); // isSameNodeClicked
	var cond2 = openedCards[0].innerHTML != openedCards[1].innerHTML; // notHaveSameContext
	if(cond1 || cond2){
		return false;
	}
	return true; 
}// end of isMatch
//-----------------------------------------------------
function lockCardsAsOpen(openedCards){
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).addClass( "open" );
		$(openedCards[i]).click( function() { return false; } );
	}
}// end of lockCards
//-------------------------------------------------------
function hideSymbol(openedCards){
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).removeClass( "open show danger animated tada" );
	}// end for
}// hideSymbol
//------------------------------------------------------
function animateTada(openedCards){
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).addClass("danger animated tada");
	} // End For
}// end animateTada
//-------------------------------------------------------
function markAsMatched(openedCards){
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).addClass("match");
	}
}// end of markAsMatched
//----------------------------------------------------
function truncate(openedCards){ // ON USED YET
   openedCards = [];
}// truncate
//----------------------------------------------------
function setRating(moves){
  let score = 3;
  if(moves <= 15) {
    ratingStars.eq(3).removeClass('fa-star').addClass('fa-star-o');
    score = 3;
  } else if (moves > 15 && moves <= 22) {
    ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
    score = 2;
  } else if (moves > 22) {
    ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
    score = 1;
  }
  return score;
}

//----------------------------------------------------
function checkMatchedAll(){
	var all = true;
	$('.block').each(function(){
		return all =  $(this).hasClass( "match"); // in just one not have it will fail
	});// end each
	if(all){
		showStatistics();
		theEnd = true;
	}
}// end checkMatchedAll---------
showStatistics = () =>{
	var score = setRating(counter);
	var time  = getTimer();
	stopTimer(true);
	owesomeAlert('Congratulation! Winning',  ' with ' + counter + 'Moves '+ ' , Scoring ' + score + ' Star!' + '  in ' + time + ' Time ' , 'success', 'Play again', 'Stay');
};
// trying to implement es5 todd-------------------------
getTimer = () => {
	return $('#timer').text();
};
//-----------------------------------------------------
function handleCounter(card){
	if(theEnd || $(card).hasClass("match") || $(card).is($(openedCards[0])) ){
		return false;
	}// fi
	counter = counter +1;
	setRating(counter);
	$('.moves').text(counter);
}// end of handleCounter

function next(openedCards){
	hideSymbol(openedCards);
}//
//-----------------------------------------------------
function MatchedCase(card){
	lockCardsAsOpen(openedCards);
	markAsMatched(openedCards);
	openedCards = [];
}//end of handle
//----------------------------------------------------
function NoMatchCase(card){
	var cardUnits = openedCards;
	animateTada(cardUnits)
   	setTimeout(function(){
	  hideSymbol(cardUnits);
	 }, 1000);// setTimeOut
     openedCards = [];

}// end of NotMatchedCase
//---------------------------------------------------
function isClicked(card){
	if($(card).hasClass("show")){
		return true;
	}
	return false;
}// end of isClicked

//---------------------------------------------------
function markedOpen(card){
	if(openedCards.length > 0){
		handleCounter(card);
		displaySymbol(card);
		openedCards.push(card);
	   if(isMatch(openedCards)){
	   	 MatchedCase();
	   } else{
	   	 NoMatchCase();
	   }
	} else{
		openedCards.push(card);
		handleCounter(card);
	}
	checkMatchedAll();
}// end of markedOpen to add card to list of open cards