const board = document.querySelector(".board");
const message = document.querySelector(".message");
const gameover = document.querySelector(".game-over");
const resetBtn = document.querySelector("#reset");

message.innerHTML = "Player One's turn: 𝕏";
message.style.color = "rgb(235, 106, 106)";

let turns = 0;
let gameOver = false;
let currentBoard = [];

// arrays of winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Creating the board
for (i = 0; i < 9; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.dataset.squareId = i;
  board.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".square"));

document.addEventListener("click", (e) => {
  if (e.target.matches(".square") && !gameOver) {
    if (e.target.classList.contains("player-one")) return;
    if (e.target.classList.contains("player-two")) return;
    if (turns % 2 === 0) {
      message.innerHTML = "Player Two's turn: 𝕆";
      message.style.color = "rgb(84, 146, 228)";
      e.target.classList.add("player-one");
      e.target.innerText = "X";
      currentBoard[e.target.dataset.squareId] = "X";
      turns++;
      console.log("Current Turn: " + turns);
      console.log("Current Board: " + currentBoard);
      checkForWinner();
    } else {
      message.innerHTML = "Player One's turn: 𝕏";
      message.style.color = "rgb(235, 106, 106)";
      e.target.classList.add("player-two");
      e.target.innerText = "O";
      currentBoard[e.target.dataset.squareId] = "O";
      // console.log(currentBoard);
      turns++;
      console.log("Current Turn: " + turns);
      console.log("Current Board: " + currentBoard);
      checkForWinner();
    }
  }
});

//check winner from current board
function checkForWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    if (
      currentBoard[winningCombinations[i][0]] === "X" &&
      currentBoard[winningCombinations[i][1]] === "X" &&
      currentBoard[winningCombinations[i][2]] === "X"
    ) {
      message.innerHTML = "Player One wins 👑";
      message.style.color = "rgb(235, 106, 106)";
      gameOver = true;
    } else if (
      currentBoard[winningCombinations[i][0]] === "O" &&
      currentBoard[winningCombinations[i][1]] === "O" &&
      currentBoard[winningCombinations[i][2]] === "O"
    ) {
      message.innerHTML = "Player Two wins 👑";
      message.style.color = "rgb(84, 146, 228)";
      gameOver = true;
    }
  }
  if (turns === 9 && gameOver === false) {
    message.innerHTML = "It's a draw 🤷‍♀️";
    message.style.color = "rgb(136, 108, 228)";
    gameOver = true;
  }
  if (gameOver === true) {
    gameover.style.display = "block";
  }
}

function reset() {
  console.clear();
  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.remove("player-one");
    squares[i].classList.remove("player-two");
    squares[i].innerText = "";
  }
  turns = 0;
  gameOver = false;
  gameover.style.display = "none";
  currentBoard = [];
  message.innerHTML = "Player One's turn: 𝕏";
}

resetBtn.addEventListener("click", reset);

reset();
