import { createShip } from "../shipObject";

describe("Tests for Ship Factory Function", () => {
  const coordinates = [
    [1, 2],
    [1, 3],
    [1, 4],
  ];

  test("Ship object should take a coord number, add it as a hit and return true", () => {
    const testingShip = createShip(3, coordinates);

    expect(testingShip.hit([1, 2])).toBe(true);
  });

  test("Ship object should return coords where hit single time when called with hitCoords", () => {
    const testingShip = createShip(3, coordinates);
    testingShip.hit([1, 2]);

    const response = testingShip.hitCoords();
    expect(response).toHaveLength(1);
    expect(response[0]).toHaveProperty("coords");
    expect(response[0]).toHaveProperty("coords", [1, 2]);
    expect(response[0]).toHaveProperty("isHit");
    expect(response[0]).toHaveProperty("isHit", true);
  });

  test("Ship object should return coords where hit multiple times when called with hitCoords", () => {
    const testingShip = createShip(3, coordinates);
    testingShip.hit([1, 2]);
    testingShip.hit([1, 3]);

    const response = testingShip.hitCoords();
    expect(response).toHaveLength(2);
    expect(response[0]).toHaveProperty("coords");
    expect(response[1]).toHaveProperty("coords");
    expect(response[0]).toHaveProperty("coords", [1, 2]);
    expect(response[1]).toHaveProperty("coords", [1, 3]);
    expect(response[0]).toHaveProperty("isHit");
    expect(response[0]).toHaveProperty("isHit", true);
    expect(response[1]).toHaveProperty("isHit");
    expect(response[1]).toHaveProperty("isHit", true);
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

  test("Returns correct length of ship with getShipLength() call", () => {
    const testingShip = createShip(3, coordinates);

    expect(testingShip.getShipLength()).toBe(3);
  });

  test("Returns correct co-ordinates of ship with allCoords() call", () => {
    const testingShip = createShip(3, coordinates);

    expect(testingShip.allCoords()).toStrictEqual(coordinates);
  });
});
