// Set initial game state variables
var playerTurn = true;
var computerMoveTimeout = 0;
var usedIndexes = 0;
var gameBoardTable = document.getElementById("gameBoard");
var turnInfo = document.getElementById("turnInfo");

// Attach click event listener to game board
gameBoardTable.addEventListener("click", cellClicked);

// Attach click event listener to "New Game" button
document.getElementById("newGameButton").addEventListener("click", newGame);

// Function to start a new game
function newGame() {
  // Reset game state variables
  clearTimeout(computerMoveTimeout);
  computerMoveTimeout = 0;
  usedIndexes = 0;

  // Clear the game board
  var spaces = gameBoardTable.getElementsByTagName("td");
  for (var i = 0; i < spaces.length; i++) {
    spaces[i].innerHTML = "&nbsp;";
  }

  // Set the starting player and turn information
  playerTurn = true;
  turnInfo.textContent = "Your turn";
}

// Function to handle a click on a game board cell
function cellClicked(event) {
  var target = event.target;

  // Check that the clicked element is a game board cell, it's the player's turn,
  // and the cell hasn't already been filled
  if (target.tagName !== "TD" || !playerTurn || target.textContent !== "\u00a0") {
    return;
  }

  // Fill the cell with an "X" and switch to the next turn
  target.textContent = "X";
  target.style.color = "red";
  usedIndexes += 1;
  switchTurn();
}

// Function to switch to the next turn
function switchTurn() {
  var board = gameBoardTable.getElementsByTagName("td");
  var draw = true;
  var winLookup = {
    "012": "X",
    "345": "X",
    "678": "X",
    "036": "X",
    "147": "X",
    "258": "X",
    "048": "X",
    "246": "X",
    "012": "O",
    "345": "O",
    "678": "O",
    "036": "O",
    "147": "O",
    "258": "O",
    "048": "O",
    "246": "O",
  };

  // Check if the player or computer has won the game
  for (var key in winLookup) {
    if (
      board[key[0]].textContent === winLookup[key] &&
      board[key[1]].textContent === winLookup[key] &&
      board[key[2]].textContent === winLookup[key]
    ) {
      playerTurn = false;
      gameOver = true;
      turnInfo.textContent =
        winLookup[key] === "X" ? "You win!" : "Computer wins!";
      return;
    }
  }

  // Check if the game is a draw
  for (var i = 0; i < board.length; i++) {
    if (board[i].textContent === "\u00a0") {
      draw = false;
      break;
    }
  }

  if (draw) {
    playerTurn = false;
    gameOver = true;
    turnInfo.textContent = "Draw!";
    return;
  }

  // If the game is still in progress, switch to the next player's turn
  if (playerTurn) {
    playerTurn = false;
    turnInfo.textContent = "Computer's turn";
    computerMoveTimeout = setTimeout(makeComputerMove, 1000);
  } else {
    playerTurn = true;
    turnInfo.textContent = "Your turn";
  }



// Set initial game state variables
var playerTurn = true;
var computerMoveTimeout = 0;
var usedIndexes = 0;
var gameBoardTable = document.getElementById("gameBoard");
var turnInfo = document.getElementById("turnInfo");

// Attach click event listener to game board
gameBoardTable.addEventListener("click", cellClicked);

// Attach click event listener to "New Game" button
document.getElementById("newGameButton").addEventListener("click", newGame);

// Function to start a new game
function newGame() {
  // Reset game state variables
  clearTimeout(computerMoveTimeout);
  computerMoveTimeout = 0;
  usedIndexes = 0;

  // Clear the game board
  var spaces = gameBoardTable.getElementsByTagName("td");
  for (var i = 0; i < spaces.length; i++) {
    spaces[i].innerHTML = "&nbsp;";
  }

  // Set the starting player and turn information
  playerTurn = true;
  turnInfo.textContent = "Your turn";
}

// Function to handle a click on a game board cell
function cellClicked(event) {
  var target = event.target;

  // Check that the clicked element is a game board cell, it's the player's turn,
  // and the cell hasn't already been filled
  if (target.tagName !== "TD" || !playerTurn || target.textContent !== "\u00a0") {
    return;
  }

  // Fill the cell with an "X" and switch to the next turn
  target.textContent = "X";
  target.style.color = "red";
  usedIndexes += 1;
  switchTurn();
}

// Function to switch to the next turn
function switchTurn() {
  var board = gameBoardTable.getElementsByTagName("td");
  var draw = true;
  var winLookup = {
    "0": ["012", "036", "048"],
    "1": ["012", "147"],
    "2": ["012", "258", "246"],
    "3": ["345", "036"],
    "4": ["345", "147", "258", "048"],
    "5": ["345", "258"],
    "6": ["678", "036", "246"],
    "7": ["678", "147"],
    "8": ["678", "258", "048"]
  };

  // Check if the player or computer has won the game
  for (var key in winLookup) {
    if (
      board[key].textContent === "X" &&
      board[winLookup[key][0]].textContent === "X" &&
      board[winLookup[key][1]].textContent === "X"
    ) {
      playerTurn = false;
      gameOver = true;
      turnInfo.textContent = "You win!";
      return;
    }
    if (
      board[key].textContent === "O" &&
      board[winLookup[key][0]].textContent === "O" &&
      board[winLookup[key][1]].textContent === "O"
    ) {
      playerTurn = false;
      gameOver = true;
      turnInfo.textContent = "Computer wins!";
      return;
    }
  }

  // Check if the game is a draw
  for (var i = 0; i < board.length; i++) {
    if (board[i].textContent === "\u00a0") {
      draw = false;
      break;
    }
  }

  if (draw) {
    playerTurn = false;
    gameOver = true;
    turnInfo.textContent = "Draw!";
    return;
  }

  // If the game is still in progress, switch to the next player's turn
  if (playerTurn) {
    playerTurn = false;
    turnInfo.textContent = "Computer's turn";
    computerMoveTimeout = setTimeout(makeComputerMove, 1000);
  } else {
    playerTurn = true;
    turnInfo.textContent = "Your turn";
  }
