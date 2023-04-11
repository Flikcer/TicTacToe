//set to true so game will start with playerclick
var playerTurn = true;
var computerMoveTimeout = 0;
var usedIndexes = 0;

//possible winning combinations
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//load dom
window.addEventListener("DOMContentLoaded", domLoaded);

//get cells in table
function domLoaded() {
  let newBtn = document.getElementById("newGameButton");
  newBtn.addEventListener("click", newGame);
  let cells = getGameBoard();
  for (let cell of cells) {
    cell.addEventListener("click", function () {
      cellClicked(this);
    });
  }

  newGame();
}

//return the array of the game board to correspond with combinations and display
function getGameBoard() {
  return Array.from(document.querySelectorAll("#gameBoard td"));
}

//clear and reset to new game
function newGame() {
  clearTimeout(computerMoveTimeout);
  computerMoveTimeout = 0;
  usedIndexes = 0;
  var spaces = getGameBoard();
  spaces.forEach((space) => (space.textContent = ""));
  playerTurn = true;
  document.getElementById("turnInfo").textContent = "Your turn";
}

//mark with red x for player click
function cellClicked(cell) {
  if (playerTurn && cellIsEmpty(cell)) {
    markCell(cell, "X", "red");
    usedIndexes++;
    switchTurn();
  }
}

//display for empty cell
function cellIsEmpty(cell) {
  return cell.textContent.trim() === "";
}

//function call to mark cell with param of color letter and where
function markCell(cell, symbol, color) {
  cell.textContent = symbol;
  cell.style.color = color;
}

//if not playerturn call computer move after 1 second
function switchTurn() {
  if (checkForWin()) {
    return;
  }
  if (playerTurn) {
    playerTurn = false;
    document.getElementById("turnInfo").textContent = "Computer's turn";
    computerMoveTimeout = setTimeout(makeComputerMove, 1000);
  } else {
    playerTurn = true;
    document.getElementById("turnInfo").textContent = "Your turn";
  }
}

//check winning combinations array and then display winner, if 9 boxes full display tie
function checkForWin() {
  const board = getGameBoard();
  for (let i = 0; i < winCombinations.length; i++) {
    const [a, b, c] = winCombinations[i];
    if (
      board[a].textContent === board[b].textContent &&
      board[b].textContent === board[c].textContent &&
      !cellIsEmpty(board[a])
    ) {
      endGame(board[a].textContent === "X" ? "You win!" : "Computer wins!");
      return true;
    }
  }
  if (usedIndexes === 9) {
    endGame("It's a tie!");
    return true;
  }
  return false;
}

//message of who won to be called above as callback
function endGame(message) {
  playerTurn = false;
  document.getElementById("turnInfo").textContent = message;
}

//random computer move
function makeComputerMove() {
  if (!playerTurn) {
    const board = getGameBoard();
    const emptyCells = board.filter(cellIsEmpty);
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    markCell(randomCell, "O", "black");
    usedIndexes++;
    switchTurn();
  }
}
