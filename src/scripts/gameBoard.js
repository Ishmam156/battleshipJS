// Create Gameboard factory.
// Note that we have not yet created any User Interface. We should know our code is coming together by running the tests.
// You shouldn’t be relying on console.logs or DOM methods to make sure your code is doing what you expect it to.
// Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
// Gameboards should have a receiveAttack function that takes a pair of coordinates,
// determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

// Gameboards should keep track of missed attacks so they can display them properly.
// Gameboards should be able to report whether or not all of their ships have been sunk.
import { createShip } from "./shipObject";

const gameBoard = () => {
  const allShipCoords = [];
  const allShips = [];
  const missedAttacks = [];

  const placeShip = (coords) => {
    const newShip = createShip(coords.length, coords);
    newShip.allCoords().forEach((point) =>
      allShipCoords.push({
        coords: [point[0], point[1]],
        ship: newShip,
      })
    );
    allShips.push(newShip);
    return true;
  };

  const receiveAttack = (coords) => {
    const isHit = allShipCoords.find(
      (point) => point.coords[0] === coords[0] && point.coords[1] === coords[1]
    );
    if (isHit) {
      isHit.ship.hit(coords);
      return true;
    }
    missedAttacks.push(coords);
    return false;
  };

  const getMissedAttacks = () => missedAttacks;

  const allSunk = () => {
    const allShipStatus = allShips.map((ship) => ship.isSunk());

    return allShipStatus.every((status) => status);
  };

  return {
    placeShip,
    receiveAttack,
    getMissedAttacks,
    allSunk,
  };
};

export { gameBoard };
