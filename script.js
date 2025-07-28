
const board = document.getElementById("board");
const statusText = document.getElementById("statusText");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

function handleClick(index) {
  if (gameState[index] !== "" || !gameActive) return;
  gameState[index] = currentPlayer;
  renderBoard();
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => handleClick(index));
    board.appendChild(cellDiv);
  });
}

function checkWin() {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function restartGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

renderBoard();
