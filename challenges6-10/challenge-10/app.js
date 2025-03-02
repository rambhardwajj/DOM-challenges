/**
 * Write your challenge solution here
 */

const timeCounter = document.getElementById('time')
const movesEl = document.getElementById('moves')
const gameContainer = document.getElementById('gameContainer')

let icons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']
let instantFlippedCards = []

let timer;
let time = 0;
let moves = 0;
let numOfFlippedCards = 0;
let gameStarted = false;

function shuffle(icons) {
  // const randomInd =  Math.floor(Math.random()*icons.length);  const icon = icons[randomInd];  shuffledIcon[i] = icon;  icons.splice(randomInd, 1)
  for (let i = icons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [icons[i], icons[j]] = [icons[j], icons[i]];
  }
  // console.log(icons)
}

function createGrid() {
  gameContainer.innerHTML = "";
  shuffle(icons);
  numOfFlippedCards = 0;
  moves = 0;
  movesEl.innerText = "0";
  timeCounter.innerText = "0:00";
  gameStarted = false;
  instantFlippedCards = [];
  isChecking = false;

  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i];
    const iconCard = document.createElement('div')
    iconCard.classList.add('card')

    const frontFace = document.createElement("div");
    frontFace.classList.add("card-back");
    frontFace.innerText = icon;

    const backFace = document.createElement("div");
    backFace.classList.add("card-front");
    backFace.innerText = "?";

    iconCard.appendChild(frontFace)
    iconCard.appendChild(backFace)

    iconCard.addEventListener('click', () => flipCard(iconCard))

    gameContainer.appendChild(iconCard)
  }
}

function startTimer() {
  gameStarted = true;
  time =0
  timer = setInterval(() => {
    time++;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timeCounter.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, 1000);
}


function restartGame() {
  clearInterval(timer);
  createGrid();
}

let isChecking = false;
function checkIfMatching() {
  isChecking = true;
  const icon1 = instantFlippedCards[0].querySelector('.card-back').innerText
  const icon2 = instantFlippedCards[1].querySelector('.card-back').innerText

  if (icon1 == icon2) {
    instantFlippedCards = []
    numOfFlippedCards += 2;
    // console.log("num of flipped cards ", numOfFlippedCards)
  } else {
    
    setTimeout(() => {
      instantFlippedCards[0].classList.remove('flipped')
      instantFlippedCards[1].classList.remove('flipped')
      instantFlippedCards = []
    }, 400)
  }
  moves++;
  movesEl.innerText = moves;
  // console.log('moves = ', moves)

  if (numOfFlippedCards == 16) {
    clearInterval(timer);
    alert(`You won in ${moves} moves and ${timeCounter.innerText} time.`)
  }

  setTimeout(() => {
    isChecking = false;
  }, 100)
}

function flipCard(card) {
  if (!gameStarted) startTimer();
  if (isChecking || card.classList.contains("flipped") || instantFlippedCards.length >= 2) return

  // console.log("icon -", card.querySelector('.card-back').innerText)

  if (!card.classList.contains('flipped')) {
    card.classList.add('flipped')
  }
  instantFlippedCards.push(card)
  // console.log(instantFlippedCards)
  if (instantFlippedCards.length > 1) {
    // this is preventing the user to not click while other card is flipping
    setTimeout(checkIfMatching, 100)
  }
}


createGrid()



// setTimeout Delay	Function	Purpose
// 100ms	setTimeout(checkIfMatching, 100);	Waits before checking if two cards match, ensuring a smooth flip.
// 600ms	Inside checkIfMatching()	        If no match, flips the cards back after a short delay for better UX.
// 100ms	Inside checkIfMatching()	        Prevents clicks during checking, ensuring proper logic execution.
