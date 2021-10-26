import { gameBoard } from "./gameBoard";
import { player } from "./player";
import { DOMInteraction } from "./DOMInteraction";
import { blueColor, redColor } from "./helper";

const gameLoop = () => {
  const humanDOMBoard = document.getElementById("humanBoard");
  const computerDOMBoard = document.getElementById("computerBoard");
  const textDisplay = document.getElementById("textContent").firstElementChild;

  const humanBoard = gameBoard();
  const computerBoard = gameBoard();
  const humanPlayer = player(computerBoard);
  const computerPlayer = player(humanBoard);

  const DOMActivity = DOMInteraction(humanBoard, humanDOMBoard, humanPlayer);

  const checkWinner = () => {
    if (humanBoard.allSunk() || computerBoard.allSunk()) return true;
    return false;
  };

  const boardListener = (event, board) => {
    if (humanPlayer.currentTurn() && !checkWinner()) {
      if (Object.keys(event.target.dataset).length === 0) return;

      const coordinate = [
        Number(event.target.dataset.row),
        Number(event.target.dataset.column),
      ];

      let elementBackgroundStyle = event.target.style.background.split(")")[0];
      elementBackgroundStyle += ")";

      if (
        elementBackgroundStyle === blueColor ||
        elementBackgroundStyle === redColor
      ) {
        return;
      }
      board.receiveAttack(coordinate);

      computerDOMBoard.innerHTML = "";
      computerBoard.renderGameBoard(computerDOMBoard, false);

      if (checkWinner()) {
        textDisplay.textContent =
          "Congratulations! You've won and sank all the ships!";
        textDisplay.style.fontWeight = "bold";
        DOMActivity.addRestartButton();
        return;
      }

      humanPlayer.changeTurn();

      textDisplay.textContent = "Wait for the computer's turn!";

      computerPlayer.changeTurn();
      setTimeout(() => {
        computerPlayer.makeRandomMove();
        humanDOMBoard.innerHTML = "";
        humanBoard.renderGameBoard(humanDOMBoard, true);
        if (checkWinner()) {
          textDisplay.textContent =
            "Oh no! You've lost and all your ships have sunk!";
          textDisplay.style.fontWeight = "bold";
          DOMActivity.addRestartButton();
          return;
        }
        computerPlayer.changeTurn();
        humanPlayer.changeTurn();
        textDisplay.textContent =
          "Your turn again! Try to sink your opponent's ships!";
      }, 1000);
    }
  };

  computerDOMBoard.addEventListener("click", (event) =>
    boardListener(event, computerBoard)
  );

  (function initalizeComputerShips() {
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

  DOMActivity.addMouseOverListener(humanDOMBoard);
  DOMActivity.addMouseOutListener(humanDOMBoard);
  DOMActivity.addMouseClickListener(humanDOMBoard);

  humanBoard.renderGameBoard(humanDOMBoard, true);
  computerBoard.renderGameBoard(computerDOMBoard, false);
};

export { gameLoop };
