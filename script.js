//your JS code here. If required.

// Players form submission
let player1 = "";
let player2 = "";

let playersForm = document.getElementById("players-form");

playersForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // get player names
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  // switch screens
  document.getElementById("player-setup-screen").style.display = "none";
  document.getElementById("game-board-screen").style.display = "block";

  // Show turn message
  document.querySelector(".message").textContent = `${player1}, you're up`;
});

// ------------------------------------------------------------------

// Game logic

// Select all grid cells to track current cell
let gridCells = document.querySelectorAll(".cell");

// Track current turn
let isPlayer1Turn = true;

gridCells.forEach((cell) => {
  cell.addEventListener("click", function () {
    // Prevent overwriting
    if (cell.textContent != "") return;

    if (isPlayer1Turn) {
      cell.textContent = "x";
      // check if player 1 wins
      if (checkWinner("x", winningCombos)) {
        document.querySelector(".message").textContent = `${player1} congratulations you won!`;
        return; // stop further moves
      } else {
        document.querySelector(
          ".message"
        ).textContent = `${player2}, you're up`;
      }
    } else {
      cell.textContent = "o";
      // check if player 2 wins
      if (checkWinner("o", winningCombos)) {
        document.querySelector(".message").textContent = `${player2} congratulations you won!`;
        return;
      } else {
        document.querySelector(
          ".message"
        ).textContent = `${player1}, you're up`;
      }
    }
    isPlayer1Turn = !isPlayer1Turn;
  });
});

// Win detection Logic
const winningCombos = [
  [1, 2, 3], // Row 1
  [4, 5, 6], // Row 2
  [7, 8, 9], // Row 3
  [1, 4, 7], // Column 1
  [2, 5, 8], // Column 2
  [3, 6, 9], // Column 3
  [1, 5, 9], // Diagonal
  [3, 5, 7], // Diagonal
];

function checkWinner(currentSymbol, winningCombos) {
  for (let combo of winningCombos) {
    let [a, b, c] = combo;
    let cellA = document.getElementById(a).textContent;
    let cellB = document.getElementById(b).textContent;
    let cellC = document.getElementById(c).textContent;

    if (
      cellA === currentSymbol &&
      cellB === currentSymbol &&
      cellC === currentSymbol
    ) {
      return true;
    }
  }
  return false;
}
