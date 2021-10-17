import { gameBoard, BOARD_SIZE } from "./gameBoard";
import { player } from "./player";

const gameLoop = () => {
  const humanBoard = gameBoard();
  const computerBoard = gameBoard();
  let currentPlayer;

  const humanDOMBoard = document.getElementById("humanBoard");
  const computerDOMBoard = document.getElementById("computerBoard");

  const checkWinner = () => {
    if (humanBoard.allSunk() || computerBoard.allSunk()) return true;
    return false;
  };

  const boardListener = (event, board) => {
    if (currentPlayer === humanPlayer) {
      const coordinate = [
        Number(event.target.dataset.row),
        Number(event.target.dataset.column),
      ];

      if (
        event.target.style.background === "blue" ||
        event.target.style.background === "red"
      ) {
        return;
      }
      const isHit = computerBoard.receiveAttack(coordinate);

      if (isHit) {
        event.target.style.background = "red";
      } else {
        event.target.style.background = "blue";
      }

      if (checkWinner()) {
        alert("You Win!");
        return;
      }

      currentPlayer = computerPlayer;
      computerPlayer.makeRandomMove();
      humanDOMBoard.innerHTML = "";
      renderHumanBoard();
      currentPlayer = humanPlayer;
      if (checkWinner()) {
        alert("Computer Wins");
        return;
      }
    }
  };

  humanDOMBoard.addEventListener("click", (event) =>
    boardListener(event, humanBoard)
  );
  computerDOMBoard.addEventListener("click", (event) =>
    boardListener(event, computerBoard)
  );

  const humanPlayer = player(computerBoard);
  const computerPlayer = player(humanBoard);

  currentPlayer = humanPlayer;

  humanBoard.placeShip([
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
  ]);

  humanBoard.placeShip([
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
  ]);

  humanBoard.placeShip([
    [5, 4],
    [6, 4],
    [7, 4],
  ]);

  humanBoard.placeShip([
    [6, 7],
    [7, 7],
    [8, 7],
  ]);

  humanBoard.placeShip([
    [8, 1],
    [8, 2],
  ]);

  computerBoard.placeShip([
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
  ]);

  computerBoard.placeShip([
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
  ]);

  computerBoard.placeShip([
    [5, 4],
    [6, 4],
    [7, 4],
  ]);

  computerBoard.placeShip([
    [6, 7],
    [7, 7],
    [8, 7],
  ]);

  computerBoard.placeShip([
    [8, 1],
    [8, 2],
  ]);

  const displayHumanBoard = humanBoard.getBoard();

  const renderHumanBoard = () => {
    for (let outerIndex = 0; outerIndex < BOARD_SIZE; outerIndex++) {
      for (let innerIndex = 0; innerIndex < BOARD_SIZE; innerIndex++) {
        const toAdd = document.createElement("div");
        toAdd.dataset.row = outerIndex;
        toAdd.dataset.column = innerIndex;
        const coordStatus = displayHumanBoard[outerIndex][innerIndex];
        if (coordStatus.hasShip && coordStatus.hasHit) {
          toAdd.style.background = "red";
        } else if (coordStatus.hasHit) {
          toAdd.style.background = "blue";
        } else if (coordStatus.hasShip) {
          toAdd.style.background = "purple";
        }

        humanDOMBoard.appendChild(toAdd);
      }
    }
  };

  renderHumanBoard();
  const displayComputerBoard = computerBoard.getBoard();

  for (let outerIndex = 0; outerIndex < BOARD_SIZE; outerIndex++) {
    for (let innerIndex = 0; innerIndex < BOARD_SIZE; innerIndex++) {
      const toAdd = document.createElement("div");
      toAdd.dataset.row = outerIndex;
      toAdd.dataset.column = innerIndex;

      computerDOMBoard.appendChild(toAdd);
    }
  }
};

export { gameLoop };
