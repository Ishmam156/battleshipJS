import { gameBoard } from "./gameBoard";
import { player } from "./player";
import { DOMInteraction } from "./DOMInteraction";
import { blueColor, redColor } from "./helper";

// Factory function for gameLoop to keep track of game
const gameLoop = () => {
  const humanDOMBoard = document.getElementById("humanBoard");
  const computerDOMBoard = document.getElementById("computerBoard");
  const textDisplay = document.getElementById("textContent").firstElementChild;

  // Initialize human and computer players alongside their boards
  const humanBoard = gameBoard();
  const computerBoard = gameBoard();
  const humanPlayer = player(computerBoard);
  const computerPlayer = player(humanBoard);

  // Initialize the DOM with human gameBoard
  const DOMActivity = DOMInteraction(humanBoard, humanDOMBoard, humanPlayer);

  const checkWinner = () => {
    if (humanBoard.allSunk() || computerBoard.allSunk()) return true;
    return false;
  };

  const boardListener = (event, board) => {
    // Allow placement of cells until there is no winner
    if (humanPlayer.currentTurn() && !checkWinner()) {
      if (Object.keys(event.target.dataset).length === 0) return;

      const coordinate = [
        Number(event.target.dataset.row),
        Number(event.target.dataset.column),
      ];

      let elementBackgroundStyle = event.target.style.background.split(")")[0];
      elementBackgroundStyle += ")";

      // Check if cell already was hit before
      if (
        elementBackgroundStyle === blueColor ||
        elementBackgroundStyle === redColor
      ) {
        return;
      }
      board.receiveAttack(coordinate);

      // Render computerBoard with new status with hit in it
      computerDOMBoard.innerHTML = "";
      computerBoard.renderGameBoard(computerDOMBoard, false);

      // If hit resulted in human winning, show win message with restart button
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

      // Add 1 second artificial delay to computer making a move
      setTimeout(() => {
        computerPlayer.makeRandomMove();
        humanDOMBoard.innerHTML = "";
        humanBoard.renderGameBoard(humanDOMBoard, true);
        // If move leads to computer winning, show win message with restart button
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

  // Place all ships of computer
  // ToDo: Make random placement of ships possible for computer on each game
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
