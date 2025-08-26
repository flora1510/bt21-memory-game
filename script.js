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
