const grids = Array.from(document.querySelectorAll(".grid"));
const status = document.querySelector("#status-txt");
const restart = document.querySelector("#restart-btn");

const winMode = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let game = ["", "", "", "", "", "", "", "", ""];
let playerTurn = "X";
let runningGame = false;


function renderBoard() {
  grids.forEach((grid, index) => {
    grid.textContent = game[index];
  });
}


function startGame() {

  grids.forEach(grid => grid.addEventListener("click", () => clickGrid(grid)));

  renderBoard()

  restart.addEventListener("click", restartGame);
  status.textContent = `It's ${playerTurn}'s turn!`;
  runningGame = true;

}

/**
 * @param {Element} grid 
 */
function clickGrid(grid) {
  const gridLocal = grid.getAttribute("data-local");

  if (game[gridLocal] != "" || !runningGame) {
    return;
  }
  game[gridLocal] = playerTurn;
  renderBoard()
  winnerCheck();
}

function changePlayer() {
  playerTurn = (playerTurn == "X") ? "O" : "X";
  status.textContent = `It's ${playerTurn}'s turn!`;
}

function restartGame() {
  game = ["", "", "", "", "", "", "", "", ""];
  runningGame = false;
}

function winnerCheck() {
  let winner = false;
  for (let i = 0; i < winMode.length; i++) {
    const condition = winMode[i];

    const gridA = game[condition[0]];
    const gridB = game[condition[1]];
    const gridC = game[condition[2]];

    if (gridA != "" && gridA == gridB && gridB == gridC) {
      winner = true;
      break;
    }
  }
  if (winner) {
    status.textContent = `${playerTurn} Wins!`
    runningGame = false;
  } else if (!game.includes("")) {
    status.textContent = `It's a draw!`
    runningGame = false;
  } else {
    changePlayer();
  }
}


startGame();
