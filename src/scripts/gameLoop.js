// Create the main game loop and a module for DOM interaction.

// At this point it is appropriate to begin crafting your User Interface.
// The game loop should set up a new game by creating Players and Gameboards.
// For now just populate each Gameboard with predetermined coordinates.
// You can implement a system for allowing players to place their ships later.
// We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards
// and render them using information from the Gameboard class.
// You need methods to render the gameboards and to take user input for attacking.
// For attacks, let the user click on a coordinate in the enemy Gameboard.
// The game loop should step through the game turn by turn using only methods from other objects.
// If at any point you are tempted to write a new function inside the game loop,
// step back and figure out which class or module that function should belong to.
// Create conditions so that the game ends once one players ships have all been sunk.
// This function is appropriate for the Game module.

import { gameBoard, BOARD_SIZE } from "./gameBoard";
import { player } from "./player";

const gameLoop = () => {
  const humanBoard = gameBoard();
  const computerBoard = gameBoard();

  const humanDOMBoard = document.getElementById("humanBoard");
  const computerDOMBoard = document.getElementById("computerBoard");

  const boardListener = (event, board) => {
    const coordinate = [
      Number(event.target.dataset.row),
      Number(event.target.dataset.column),
    ];

    const isHit = board.receiveAttack(coordinate);
    console.log(coordinate);
    console.log(isHit);

    if (isHit) {
      event.target.style.background = "red";
    } else {
      event.target.style.background = "blue";
    }
  };

  humanDOMBoard.addEventListener("click", (event) =>
    boardListener(event, humanBoard)
  );
  computerDOMBoard.addEventListener("click", (event) =>
    boardListener(event, computerBoard)
  );

  const humanPlayer = player(humanBoard);
  const computerPlayer = player(computerBoard);

  humanBoard.placeShip([
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
  ]);

  computerBoard.placeShip([
    [2, 1],
    [2, 2],
    [2, 3],
  ]);

  humanBoard.placeShip([
    [3, 3],
    [3, 4],
    [3, 5],
  ]);

  computerBoard.placeShip([
    [5, 2],
    [6, 2],
    [7, 2],
    [8, 2],
  ]);

  const displayHumanBoard = humanBoard.getBoard();

  for (let outerIndex = 0; outerIndex < BOARD_SIZE; outerIndex++) {
    for (let innerIndex = 0; innerIndex < BOARD_SIZE; innerIndex++) {
      const toAdd = document.createElement("div");
      toAdd.dataset.row = outerIndex;
      toAdd.dataset.column = innerIndex;
      const coordStatus = displayHumanBoard[outerIndex][innerIndex];
      if (coordStatus.hasShip) {
        toAdd.style.background = "purple";
      }

      humanDOMBoard.appendChild(toAdd);
    }
  }

  const displayComputerBoard = computerBoard.getBoard();

  for (let outerIndex = 0; outerIndex < BOARD_SIZE; outerIndex++) {
    for (let innerIndex = 0; innerIndex < BOARD_SIZE; innerIndex++) {
      const toAdd = document.createElement("div");
      toAdd.dataset.row = outerIndex;
      toAdd.dataset.column = innerIndex;
      const coordStatus = displayComputerBoard[outerIndex][innerIndex];
      if (coordStatus.hasShip) {
        toAdd.style.background = "purple";
      }

      computerDOMBoard.appendChild(toAdd);
    }
  }
};

export { gameLoop };
