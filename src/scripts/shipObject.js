// Begin your app by creating the Ship factory function.
// Your ‘ships’ will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk.
// REMEMBER you only have to test your object’s public interface. Only methods or properties that are used
// outside of your ‘ship’ object need unit tests.
// Ships should have a hit() function that takes a number and then marks that position as ‘hit’.
// isSunk() should be a function that calculates it based on their length and whether all of their positions are ‘hit’.

const createShip = (length, arrayCoords) => {
  const shipLength = length;
  let shipCoords = arrayCoords.map((spot) => {
    return {
      coords: [spot[0], spot[1]],
      isHit: false,
    };
  });

  const hit = (coords) => {
    shipCoords = shipCoords.map((spot) =>
      spot.coords[0] === coords[0] && spot.coords[1] === coords[1]
        ? { ...spot, isHit: true }
        : spot
    );
    return true;
  };

  const isSunk = () => shipCoords.every((coord) => coord.isHit);

  const hitCoords = () => shipCoords.filter((coords) => coords.isHit);

  const getShipLength = () => shipLength;

  const allCoords = () =>
    shipCoords.map((point) => [point.coords[0], point.coords[1]]);

  return {
    hit,
    isSunk,
    hitCoords,
    getShipLength,
    allCoords,
  };
};

export { createShip };
