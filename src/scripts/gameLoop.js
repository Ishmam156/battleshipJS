import { gameBoard, BOARD_SIZE } from "./gameBoard";
import { player } from "./player";

const gameLoop = () => {
  const humanDOMBoard = document.getElementById("humanBoard");
  const computerDOMBoard = document.getElementById("computerBoard");

  const humanBoard = gameBoard();
  const computerBoard = gameBoard();
  const humanPlayer = player(computerBoard);
  const computerPlayer = player(humanBoard);

  humanPlayer.changeTurn();

  const checkWinner = () => {
    if (humanBoard.allSunk() || computerBoard.allSunk()) return true;
    return false;
  };

  const boardListener = (event, board) => {
    if (humanPlayer.currentTurn()) {
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
      board.receiveAttack(coordinate);

      computerDOMBoard.innerHTML = "";
      computerBoard.renderGameBoard(computerDOMBoard, false);

      if (checkWinner()) {
        alert("You Win!");
        return;
      }

      humanPlayer.changeTurn();

      computerPlayer.changeTurn();
      computerPlayer.makeRandomMove();
      humanDOMBoard.innerHTML = "";
      humanBoard.renderGameBoard(humanDOMBoard, true);
      if (checkWinner()) {
        alert("Computer Wins");
        return;
      }
      computerPlayer.changeTurn();
      humanPlayer.changeTurn();
    }
  };

  computerDOMBoard.addEventListener("click", (event) =>
    boardListener(event, computerBoard)
  );

  // Set up for initial gameplay
  (function initializationShips() {
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
  })();

  humanBoard.renderGameBoard(humanDOMBoard, true);
  computerBoard.renderGameBoard(computerDOMBoard, false);
};

export { gameLoop };
