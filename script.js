const message = document.querySelector(".message");
const gameover = document.querySelector(".game-over");
const resetBtn = document.querySelector("#reset");

let turns = 0;
let gameOver = false;
let currentBoard = [];

const red = "rgb(235, 106, 106)";
const blue = "rgb(84, 146, 228)";

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

const squares = document.querySelectorAll(".square");

// add event listener to squares
squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    if (gameOver) {
      return;
    }
    if (e.target.innerHTML !== "") return;
    if (turns % 2 === 0) {
      message.innerHTML = "Player Two's Turn: 𝕆";
      e.target.classList.add("player-one");
      e.target.innerHTML = "X";
      currentBoard[e.target.dataset.squareId] = "X";
    } else {
      message.innerHTML = "Player One's Turn: 𝕏";
      e.target.classList.add("player-two");
      e.target.innerHTML = "O";
      currentBoard[e.target.dataset.squareId] = "O";
    }
    turns++;
    checkForWinner();
  });
});

//check winner from current board
function checkForWinner() {
  if (turns === 9 && !gameOver) {
    message.innerHTML = "It's a draw 🤷‍♀️";
    gameOver = true;
  }

  winningCombinations.forEach((combination) => {
    const squareOne = currentBoard[combination[0]];
    const squareTwo = currentBoard[combination[1]];
    const squareThree = currentBoard[combination[2]];

    if (squareOne === "X" && squareTwo === "X" && squareThree === "X") {
      message.innerHTML = "Player One Wins 🎉";
      winner();
    } else if (squareOne === "O" && squareTwo === "O" && squareThree === "O") {
      message.innerHTML = "Player Two Wins 🎉";
      winner();
    }
    function winner() {
      gameOver = true;
      squares.forEach((square) => {
        if (
          square.dataset.squareId == combination[0] ||
          square.dataset.squareId == combination[1] ||
          square.dataset.squareId == combination[2]
        ) {
          square.classList.add("green");
        }
      });
    }

    if (gameOver) {
      gameover.style.display = "block";
      return;
    }
  });
}

function reset() {
  turns = 0;
  gameOver = false;
  currentBoard = [];
  gameover.style.display = "none";

  squares.forEach((square) => {
    square.innerHTML = "";
    square.classList.remove("player-one");
    square.classList.remove("player-two");
    square.classList.remove("green");
  });
}

resetBtn.addEventListener("click", reset);

reset();
