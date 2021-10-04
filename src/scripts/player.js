import { BOARD_SIZE } from "./gameBoard";

const player = (gameBoard) => {
  const enemyBoard = gameBoard;
  const movesMade = [];

  const randomMove = () => [
    Math.floor(Math.random() * BOARD_SIZE),
    Math.floor(Math.random() * BOARD_SIZE),
  ];

  const makeMove = (coords) => {};

  const makeRandomMove = () => {
    let move = randomMove();

    while (
      movesMade.some(
        (oldMove) => oldMove[0] === move[0] && oldMove[1] === move[1]
      )
    ) {
      move = randomMove();
    }
    enemyBoard.receiveAttack(move);
    return true;
  };

  return {
    makeMove,
    makeRandomMove,
  };
};

export { player };
