import { gameBoard } from "../gameBoard";

describe("Tests for Game Board Function", () => {
  const coordinates = [
    [1, 2],
    [1, 3],
    [1, 4],
  ];

  const otherCoordinates = [
    [2, 3],
    [4, 5],
    [6, 7],
    [7, 8],
    [1, 5],
  ];

  test("Gameboards should be able to place ships at specific coordinates by calling the ship factory function. ", () => {
    const newGame = gameBoard();
    expect(newGame.placeShip(coordinates)).toBe(true);
  });

  test("Gameboards takes coordinates for receiveAttack and hits ship if valid attack", () => {
    const newGame = gameBoard();
    newGame.placeShip(coordinates);
    expect(newGame.receiveAttack([1, 2])).toBe(true);
  });

  test("Gameboards takes coordinates for receiveAttack and records missed attack if invalid move", () => {
    const newGame = gameBoard();
    newGame.placeShip(coordinates);
    const singleCoordinate = [2, 3];
    expect(newGame.receiveAttack(singleCoordinate)).toBe(false);
    expect(newGame.getMissedAttacks()).toHaveLength(1);
    expect(newGame.getMissedAttacks()).toContain(singleCoordinate);
  });

  test("Gameboards should be able to report board of single ship has been sunk.", () => {
    const newGame = gameBoard();
    newGame.placeShip(coordinates);
    coordinates.forEach((coord) => newGame.receiveAttack(coord));
    expect(newGame.allSunk()).toBe(true);
  });

  test("Gameboards should be able to report board of multiple ships has been sunk.", () => {
    const newGame = gameBoard();
    newGame.placeShip(coordinates);
    newGame.placeShip(otherCoordinates);
    coordinates.forEach((coord) => newGame.receiveAttack(coord));
    otherCoordinates.forEach((coord) => newGame.receiveAttack(coord));
    expect(newGame.allSunk()).toBe(true);
  });

  test("Gameboards should be able to report board of single ship has not been sunk.", () => {
    const newGame = gameBoard();
    newGame.placeShip(coordinates);
    newGame.receiveAttack([1, 2]);
    expect(newGame.allSunk()).toBe(false);
  });

  test("Gameboards should be able to report board of multiple ship has not been sunk.", () => {
    const newGame = gameBoard();
    newGame.placeShip(coordinates);
    newGame.placeShip(otherCoordinates);
    newGame.receiveAttack([1, 2]);
    newGame.receiveAttack([4, 5]);
    expect(newGame.allSunk()).toBe(false);
  });
});
