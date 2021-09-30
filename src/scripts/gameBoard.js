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
