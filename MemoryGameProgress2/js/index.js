const deck = document.querySelector('.deck');


let toggledCards = [];


let matchedCards = [];
let matched = 0; // Global scope
let moves = 0;

const cards = document.querySelectorAll('.card');
let modal_moves = document.querySelector('.modal_moves');


let cancelButton = document.querySelector('.modal_cancel');
cancelButton.addEventListener('click', () =>{
    hideModal();
});

let restart = document.querySelector('.restart');
restart.addEventListener('click', function resetGame() {
    resetClockAndTime();
    resetMoves();
    resetStars();
    shuffleDeck();
});

console.log(cards);

// the cards flipped when clicked// only flip 2 cards
deck.addEventListener('click', event => {
		const clickTarget = event.target;
		if (clickTarget.classList.contains('card') && toggledCards.length < 2 ) {
		    toggleCard(clickTarget);
		    addToggleCard(clickTarget);
		    if (toggledCards.length === 2) {
          console.log('2 cards');
          checkForMatch();
          addMove();
          checkScore();

        }
    }
});

function toggleCard(card) {
	card.classList.toggle('open');
	card.classList.toggle('show');
}

function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
	console.log(toggledCards);
}

// if the card matches, the cards stay put

function checkForMatch() {
	if (
		toggledCards[0].firstElementChild.className
		===
		toggledCards[1].firstElementChild.className)
		{ toggledCards[0].classList.toggle('match');
	      toggledCards[1].classList.toggle('match');
	      toggledCards = [] ;
        matched++;

     // if the cards do not match, the cards flip back

	  } else {
	  	console.log('Not a match!');
      setTimeout(() => {
	  	toggleCard(toggledCards[0]);
	  	toggleCard(toggledCards[1]);
     toggledCards = [];
	  }, 800);
  }
}



function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') &&
		!clickTarget.classList.contains('match') &&
		toggledCards.length < 2 &&
		!toggledCards.includes(clickTarget)
		);
	}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//**

// shuffles the deck
function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	const shuffledCards = shuffle(cardsToShuffle);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
}
shuffleDeck();

//add moves
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves');
	movesText.innerHTML = moves;
    modal_moves.innerHTML += moves;
}

function checkScore() {
    if (matched === 1) {
        showModal();
    }
	if (moves === 10 || moves === 20) {
        hideStar();
	}
  stopTimer()
}

function hideStar() {
	let starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
		}
	}
}

//timer - reference to slack Chris Neal
let sec = 0;
let min = 0;
let timer;
deck.addEventListener("click", function startTimer() {
timer = setInterval(insertTime, 1500);
});
function stopTimer() {
clearInterval(timer);
sec = 0;
min = 0;
}
function insertTime() {
sec++;
if (sec < 10) {
sec = `0${sec}`;
}
if (sec >= 60) {
min++;
sec = "00";
}
// shows the timer after the first click
document.querySelector('.timer-output').innerHTML = "0" + min + ":" + sec;
}

//*modal*/
const modal = document.querySelector('.modal_background');
function showModal() {
    modal.classList.toggle('visible');
    modal.style.display = 'block';
}
function hideModal() {
    modal.classList.toggle('hide');
    modal.style.display = 'none';
}

function toggleModal() {
    modal.classList.toggle('hide');
}

toggleModal() // hide modal
toggleModal() // open modal
toggleModal() // hide modal


function writeModalStats() {
const timeStat = document.querySelector('.modal_time');
const clockTime = document.querySelector('.clock').innerHTML;

timeStat.innerHTML = 'Time = ${clockTime}';
}


function writeModalStats() {
const timeStat = document.querySelector('.modal_time');
const clockTime = document.querySelector('.clock').innerHTML;
const movesStat = document.querySelector('.modal_moves');
const starsStat = document.querySelector('.modal_stars');
const stars = getStars();

timeStat.innerHTML = 'Time = ${clockTime}'; }
movesStat.innerHTML = 'Moves = ${moves}';
starsStat.innerHTML = 'Stars = ${stars}';

function resetClockAndTime(){
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
      star.style.display = 'inline';
 }
}

function getStars() {
 stars = document.querySelectorAll('.stars li');
starCount = 0;
for (star of stars) {
if (star.style.display !== 'none') {
 starCount++;
   }
}
console.log(starCount); //2
return starCount;

document.querySelector('.modal_replay').addEventListener('click', () =>{
  console.log('replay');
});



function resetGame() {
	resetClockAndTime();
}

function resetClockAndTime(){
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
}

document.querySelector('.modal_replay').addEventListener('click', replayGame);

document.querySelector('.modal_button modal_cancel').addEventListener('click', resetGame);

const TOTAL_PAIRS = 8;

if (matched ===TOTAL_PAIRS) {
	gameOver();
}

function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
}

function replayGame() {
	resetGame();
	toggleModal();
}}