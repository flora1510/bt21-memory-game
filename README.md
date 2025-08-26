<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BT21 Memory Game</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>🎮 BT21 Memory Game</h1>
  
  <div class="info">
    <p>⏱️ Time Left: <span id="timer">60</span>s</p>
    <p>⭐ Score: <span id="score">0</span></p>
  </div>

  <div class="game-board" id="game-board"></div>

  <button id="reset-btn">🔄 Reset</button>
  
  <audio id="applause" src="https://www.soundjay.com/human/applause-8.mp3"></audio>
  
  <script src="script.js"></script>
</body>
</html>
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background: #f8f3ff;
}

h1 {
  color: #6a0dad;
  margin: 15px;
}

.info {
  font-size: 18px;
  margin: 10px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-gap: 10px;
  justify-content: center;
  margin: 20px;
}

.card {
  width: 100px;
  height: 100px;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backface-visibility: hidden;
}

.card-front {
  background: #ffb6c1 url("images/back.png") center/cover no-repeat;
}

.card-back {
  transform: rotateY(180deg);
  background-size: cover;
  border: 2px solid #6a0dad;
}
const images = [
  "chimmy.jpeg", "cooky.jpeg", "mang.jpeg",
  "tata.jpeg", "suga.jpeg", "wwh.jpeg", "OIP.jpeg"
];

let gameBoard = document.getElementById("game-board");
let timerEl = document.getElementById("timer");
let scoreEl = document.getElementById("score");
let applause = document.getElementById("applause");
let resetBtn = document.getElementById("reset-btn");

let flippedCards = [];
let matchedCards = 0;
let score = 0;
let timer = 60;
let countdown;

function startGame() {
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = 0;
  score = 0;
  scoreEl.textContent = score;
  timer = 60;
  timerEl.textContent = timer;
  clearInterval(countdown);

  // duplicate + shuffle
  let cardImages = [...images, ...images].sort(() => 0.5 - Math.random());

  cardImages.forEach(img => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back" style="background-image:url('images/${img}')"></div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card, img));
    gameBoard.appendChild(card);
  });

  countdown = setInterval(() => {
    timer--;
    timerEl.textContent = timer;
    if (timer === 0) {
      clearInterval(countdown);
      alert("⏳ Time's up! Game Over!");
    }
  }, 1000);
}

function flipCard(card, img) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push({ card, img });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  let [first, second] = flippedCards;

  if (first.img === second.img) {
    score += 10;
    matchedCards += 2;
    scoreEl.textContent = score;

    if (matchedCards === images.length * 2) {
      clearInterval(countdown);
      applause.play();
      alert("🎉 You matched all cards! Final Score: " + score);
    }
  } else {
    first.card.classList.remove("flipped");
    second.card.classList.remove("flipped");
  }

  flippedCards = [];
}

resetBtn.addEventListener("click", startGame);

startGame();
