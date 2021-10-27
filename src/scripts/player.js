import { BOARD_SIZE } from "./gameBoard";

// Factory function to handle player selection
const player = (gameBoard) => {
  const enemyBoard = gameBoard;
  const movesMade = [];
  let lastMoveHit = false;
  let playerTurn = false;

  const randomMove = () => [
    Math.floor(Math.random() * BOARD_SIZE),
    Math.floor(Math.random() * BOARD_SIZE),
  ];

  // Generate a move if previous move was a hit on a ship
  const smartMove = (coords) => {
    const newCoords = [...coords];
    // Randomly selecting between increasing/decreasing co-ordinate and randomly selecting between rows/columns
    const options = [1, -1];
    let singleCoord = Math.floor(Math.random() * 2);
    newCoords[singleCoord] =
      coords[singleCoord] + options[Math.floor(Math.random() * 2)];
    // Checking if suggested new coordinate is out of bounds of the board
    while (newCoords.includes(-1) || newCoords.includes(10)) {
      newCoords[singleCoord] =
        coords[singleCoord] + options[Math.floor(Math.random() * 2)];
    }
    return newCoords;
  };

  const makeMove = (coords) => {
    enemyBoard.receiveAttack(coords);
    return true;
  };

  const makeRandomMove = () => {
    let move;
    let moveTries = 0;
    // Check whether a smart move needs to be made
    if (lastMoveHit) {
      move = smartMove(movesMade[movesMade.length - 1]);
    } else {
      move = randomMove();
    }

    // Check if current suggested move is empty on the board
    while (
      movesMade.some(
        (oldMove) => oldMove[0] === move[0] && oldMove[1] === move[1]
      )
    ) {
      // If all surrounding blocks of a hit cell is already filled, then make random move
      if (lastMoveHit && moveTries < 6) {
        move = smartMove(movesMade[movesMade.length - 1]);
        moveTries++;
      } else {
        move = randomMove();
      }
    }
    movesMade.push(move);
    const isHit = enemyBoard.receiveAttack(move);

    if (isHit) {
      lastMoveHit = true;
    } else {
      lastMoveHit = false;
    }

    return move;
  };

  const changeTurn = () => {
    playerTurn = !playerTurn;
  };

  const currentTurn = () => playerTurn;

  return {
    makeMove,
    makeRandomMove,
    currentTurn,
    changeTurn,
  };
};

export { player };
