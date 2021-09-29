import { createShip } from "../shipObject";

describe("Ensure Ship Factory Function is working", () => {
  const coordinates = [
    [1, 2],
    [1, 3],
    [1, 4],
  ];

  test("Ship object should take a coord number, add it as a hit and return true", () => {
    const testingShip = createShip(3, coordinates);

    expect(testingShip.hit([1, 2])).toBe(true);
  });

  test("Fully hit ship returns true on isSunk() call", () => {
    const testingShip = createShip(3, coordinates);
    coordinates.forEach((coord) => testingShip.hit(coord));

    expect(testingShip.isSunk()).toBe(true);
  });

  test("Partially hit ship returns false on isSunk() call", () => {
    const testingShip = createShip(3, coordinates);
    testingShip.hit([1, 2]);

    expect(testingShip.isSunk()).toBe(false);
  });
});
