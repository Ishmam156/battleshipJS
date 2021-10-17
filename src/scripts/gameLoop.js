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
      humanBoard.renderGameBoard(humanDOMBoard, true);
      currentPlayer = humanPlayer;
      if (checkWinner()) {
        alert("Computer Wins");
        return;
      }
    }
  };

  computerDOMBoard.addEventListener("click", (event) =>
    boardListener(event, computerBoard)
  );

  const humanPlayer = player(computerBoard);
  const computerPlayer = player(humanBoard);

  currentPlayer = humanPlayer;

  const initializationShips = () => {
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
  };

  initializationShips();

  humanBoard.renderGameBoard(humanDOMBoard, true);
  computerBoard.renderGameBoard(computerDOMBoard, false);
};

export { gameLoop };
