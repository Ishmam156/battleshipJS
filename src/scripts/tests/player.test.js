import { gameBoard } from "../gameBoard";
import { player } from "../player";

describe("Tests for Player function", () => {
  test("Computer player should be able to make random move", () => {
    const humanBoard = gameBoard();
    const computerPlayer = player(humanBoard);
    expect(computerPlayer.makeRandomMove()).toBe(true);
    expect(humanBoard.getMissedAttacks()).toHaveLength(1);
  });

  test("Computer player should not hit the same spot twice", () => {
    const humanBoard = gameBoard();
    const computerPlayer = player(humanBoard);
    computerPlayer.makeRandomMove();
    computerPlayer.makeRandomMove();
    const hitMoves = humanBoard.getMissedAttacks();
    expect(hitMoves).toHaveLength(2);
    expect(hitMoves[0]).not.toStrictEqual(hitMoves[1]);
  });
});
