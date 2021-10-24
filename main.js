/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/reset.css":
/*!******************************!*\
  !*** ./src/styles/reset.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/gameBoard.js":
/*!**********************************!*\
  !*** ./src/scripts/gameBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard),
/* harmony export */   "BOARD_SIZE": () => (/* binding */ BOARD_SIZE)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/scripts/ship.js");


const BOARD_SIZE = 10;

const gameBoard = () => {
  const board = [];

  (function initiliazeBoard() {
    for (let outerIndex = 0; outerIndex < BOARD_SIZE; outerIndex++) {
      const toAdd = [];
      for (let innerIndex = 0; innerIndex < BOARD_SIZE; innerIndex++) {
        toAdd.push({
          hasShip: false,
          hasHit: false,
          ship: null,
        });
      }
      board.push(toAdd);
    }
  })();

  const allShips = [];

  const placeShip = (coords) => {
    const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createShip)(coords.length, coords);
    newShip.allCoords().forEach((point) => {
      const coordinate = board[point[0]][point[1]];
      coordinate.hasShip = true;
      coordinate.ship = newShip;
    });
    allShips.push(newShip);
    return true;
  };

  const receiveAttack = (coords) => {
    const isHit = board[coords[0]][coords[1]];
    isHit.hasHit = true;
    if (isHit.hasShip) {
      isHit.ship.hit(coords);
      return true;
    }
    return false;
  };

  const getMissedAttacks = () => {
    const missedCoordinates = [];
    for (let outerIndex = 0; outerIndex < BOARD_SIZE; outerIndex++) {
      for (let innerIndex = 0; innerIndex < BOARD_SIZE; innerIndex++) {
        const coordinate = board[outerIndex][innerIndex];
        if (coordinate.hasHit && !coordinate.hasShip) {
          missedCoordinates.push([outerIndex, innerIndex]);
        }
      }
    }
    return missedCoordinates;
  };

  const allSunk = () => {
    const allShipStatus = allShips.map((ship) => ship.isSunk());

    return allShipStatus.every((status) => status);
  };

  const getBoard = () => board;

  const renderGameBoard = (DOMElement, showShip) => {
    for (let outerIndex = 0; outerIndex < BOARD_SIZE; outerIndex++) {
      for (let innerIndex = 0; innerIndex < BOARD_SIZE; innerIndex++) {
        const toAdd = document.createElement("div");
        toAdd.dataset.row = outerIndex;
        toAdd.dataset.column = innerIndex;

        const coordStatus = board[outerIndex][innerIndex];

        if (showShip) {
          if (coordStatus.hasShip) {
            toAdd.style.background = "purple";
          }
        }

        if (coordStatus.hasShip && coordStatus.hasHit) {
          toAdd.style.background = "red";
          if (coordStatus.ship.isSunk()) {
            toAdd.textContent = "X";
          }
        } else if (coordStatus.hasHit) {
          toAdd.style.background = "blue";
        }

        DOMElement.appendChild(toAdd);
      }
    }
  };

  return {
    placeShip,
    receiveAttack,
    getMissedAttacks,
    allSunk,
    getBoard,
    renderGameBoard,
  };
};




/***/ }),

/***/ "./src/scripts/gameLoop.js":
/*!*********************************!*\
  !*** ./src/scripts/gameLoop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLoop": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/scripts/gameBoard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");



const gameLoop = () => {
  const humanDOMBoard = document.getElementById("humanBoard");
  const computerDOMBoard = document.getElementById("computerBoard");

  const humanBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  const computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.player)(computerBoard);
  const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.player)(humanBoard);

  const shipLengths = [5, 4, 3, 3, 2];
  let shipIndex = 0;
  let shipDimension = "row";
  let shipPlacementPossible = false;

  const checkWinner = () => {
    if (humanBoard.allSunk() || computerBoard.allSunk()) return true;
    return false;
  };

  (function addDimensionButton() {
    const humanMainDiv = document.querySelector("main").firstElementChild;
    const button = document.createElement("button");

    button.id = "dimensionButton";
    button.textContent = `Change to ${
      shipDimension === "row" ? "row" : "column"
    }`;

    button.addEventListener("click", (event) => {
      const currentText = document.getElementById("dimensionButton");

      if (currentText.textContent.includes("row")) {
        shipDimension = "column";
        currentText.textContent = "Change to column";
      } else {
        shipDimension = "row";
        currentText.textContent = "Change to row";
      }
    });

    humanMainDiv.appendChild(button);
  })();

  const boardListener = (event, board) => {
    if (humanPlayer.currentTurn()) {
      const coordinate = [
        Number(event.target.dataset.row),
        Number(event.target.dataset.column),
      ];

      if (
        event.target.style.background === "blue" ||
        event.target.style.background === "red"
      ) {
        return;
      }
      board.receiveAttack(coordinate);

      computerDOMBoard.innerHTML = "";
      computerBoard.renderGameBoard(computerDOMBoard, false);

      if (checkWinner()) {
        alert("You Win!");
        return;
      }

      humanPlayer.changeTurn();

      computerPlayer.changeTurn();
      computerPlayer.makeRandomMove();
      humanDOMBoard.innerHTML = "";
      humanBoard.renderGameBoard(humanDOMBoard, true);
      if (checkWinner()) {
        alert("Computer Wins");
        return;
      }
      computerPlayer.changeTurn();
      humanPlayer.changeTurn();
    }
  };

  computerDOMBoard.addEventListener("click", (event) =>
    boardListener(event, computerBoard)
  );

  // Set up for initial gameplay
  (function initializationShips() {
    computerBoard.placeShip([
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
    ]);

    computerBoard.placeShip([
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
    ]);

    computerBoard.placeShip([
      [5, 4],
      [6, 4],
      [7, 4],
    ]);

    computerBoard.placeShip([
      [6, 7],
      [7, 7],
      [8, 7],
    ]);

    computerBoard.placeShip([
      [8, 1],
      [8, 2],
    ]);
  })();

  const mouseOverHumanBoard = (event) => {
    const element = event.target;

    if (shipIndex === shipLengths.length) {
      humanDOMBoard.removeEventListener("mouseover", mouseOverHumanBoard);
      humanDOMBoard.removeEventListener("mouseout", mouseOutHumanBoard);
      humanDOMBoard.removeEventListener("click", mouseClickHumanBoard);
      document.getElementById("dimensionButton").style.display = "none";
      humanPlayer.changeTurn();
    }

    if (!element.style.background) {
      element.style.background = "lightgrey";
      const shipToPaint = shipLengths[shipIndex];

      const divsToPaint = [];

      for (let index = 1; index < shipToPaint; index++) {
        const newCoordinates = {
          row: Number(element.dataset.row),
          column: Number(element.dataset.column),
        };
        newCoordinates[shipDimension] = newCoordinates[shipDimension] + index;
        let toColorElement;

        try {
          toColorElement = document.querySelector(
            `[data-row="${newCoordinates.row}"][data-column="${newCoordinates.column}"]`
          );
        } catch (error) {
          toColorElement = false;
        }

        if (toColorElement && !toColorElement.style.background) {
          divsToPaint.push(toColorElement);
        }

        if (divsToPaint.length === shipToPaint - 1) {
          divsToPaint.forEach(
            (paintElement) => (paintElement.style.background = "lightgrey")
          );
          shipPlacementPossible = true;
        }
      }
    }
  };

  const mouseOutHumanBoard = (event) => {
    const element = event.target;
    if (element.style.background === "lightgrey") {
      element.style.background = "";

      const shipToPaint = shipLengths[shipIndex];

      if (shipPlacementPossible) {
        for (let index = 1; index < shipToPaint; index++) {
          const newCoordinates = {
            row: Number(element.dataset.row),
            column: Number(element.dataset.column),
          };
          newCoordinates[shipDimension] = newCoordinates[shipDimension] + index;
          const toColorElement = document.querySelector(
            `[data-row="${newCoordinates.row}"][data-column="${newCoordinates.column}"]`
          );
          toColorElement.style.background = "";
        }

        shipPlacementPossible = false;
      }
    }
  };

  const mouseClickHumanBoard = (event) => {
    const element = event.target;
    const placementCoordinates = [];

    if (shipPlacementPossible) {
      const shipToPaint = shipLengths[shipIndex];
      const stringCoordinate = element.dataset;
      const currentCoordinate = [
        Number(stringCoordinate.row),
        Number(stringCoordinate.column),
      ];
      placementCoordinates.push(currentCoordinate);

      for (let index = 1; index < shipToPaint; index++) {
        const nextCoordinate = [...currentCoordinate];
        const dimension = shipDimension === "row" ? 0 : 1;
        nextCoordinate[dimension] = nextCoordinate[dimension] + index;
        placementCoordinates.push(nextCoordinate);
      }

      humanBoard.placeShip(placementCoordinates);
      humanDOMBoard.innerHTML = "";
      humanBoard.renderGameBoard(humanDOMBoard, true);
      shipIndex++;
      shipPlacementPossible = false;
    }
  };

  humanDOMBoard.addEventListener("mouseover", mouseOverHumanBoard);
  humanDOMBoard.addEventListener("mouseout", mouseOutHumanBoard);
  humanDOMBoard.addEventListener("click", mouseClickHumanBoard);

  humanBoard.renderGameBoard(humanDOMBoard, true);
  computerBoard.renderGameBoard(computerDOMBoard, false);
};




/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/scripts/gameBoard.js");


const player = (gameBoard) => {
  const enemyBoard = gameBoard;
  const movesMade = [];
  let lastMoveHit = false;
  let playerTurn = false;

  const randomMove = () => [
    Math.floor(Math.random() * _gameBoard__WEBPACK_IMPORTED_MODULE_0__.BOARD_SIZE),
    Math.floor(Math.random() * _gameBoard__WEBPACK_IMPORTED_MODULE_0__.BOARD_SIZE),
  ];

  const smartMove = (coords) => {
    const newCoords = [...coords];
    const options = [1, -1];
    let singleCoord = Math.floor(Math.random() * 2);
    newCoords[singleCoord] =
      coords[singleCoord] + options[Math.floor(Math.random() * 2)];

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
    if (lastMoveHit) {
      move = smartMove(movesMade[movesMade.length - 1]);
    } else {
      move = randomMove();
    }

    while (
      movesMade.some(
        (oldMove) => oldMove[0] === move[0] && oldMove[1] === move[1]
      )
    ) {
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




/***/ }),

/***/ "./src/scripts/ship.js":
/*!*****************************!*\
  !*** ./src/scripts/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShip": () => (/* binding */ createShip)
/* harmony export */ });
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/reset.css */ "./src/styles/reset.css");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/style.css */ "./src/styles/style.css");
/* harmony import */ var _scripts_gameLoop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/gameLoop */ "./src/scripts/gameLoop.js");





(0,_scripts_gameLoop__WEBPACK_IMPORTED_MODULE_2__.gameLoop)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBb0M7O0FBRXBDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIseUJBQXlCO0FBQ3REO0FBQ0EsK0JBQStCLHlCQUF5QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0Esb0JBQW9CLGlEQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2Qix5QkFBeUI7QUFDdEQsK0JBQStCLHlCQUF5QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDZCQUE2Qix5QkFBeUI7QUFDdEQsK0JBQStCLHlCQUF5QjtBQUN4RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4R21CO0FBQ2xCOztBQUVsQztBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLHFEQUFTO0FBQzlCLHdCQUF3QixxREFBUztBQUNqQyxzQkFBc0IsK0NBQU07QUFDNUIseUJBQXlCLCtDQUFNOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwwQkFBMEIscUJBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLG1CQUFtQixrQkFBa0Isc0JBQXNCO0FBQ3JGO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDRCQUE0QixxQkFBcUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1CQUFtQixrQkFBa0Isc0JBQXNCO0FBQ3JGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIscUJBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFb0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2T3FCOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLGtEQUFVO0FBQ3pDLCtCQUErQixrREFBVTtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7QUM5RWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVzQjs7Ozs7OztVQ3BDdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjRCO0FBQ0E7O0FBRWtCOztBQUU5QywyREFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcz9kZDUxIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlLmNzcz8yMzk0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgQk9BUkRfU0laRSA9IDEwO1xuXG5jb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW107XG5cbiAgKGZ1bmN0aW9uIGluaXRpbGlhemVCb2FyZCgpIHtcbiAgICBmb3IgKGxldCBvdXRlckluZGV4ID0gMDsgb3V0ZXJJbmRleCA8IEJPQVJEX1NJWkU7IG91dGVySW5kZXgrKykge1xuICAgICAgY29uc3QgdG9BZGQgPSBbXTtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIHRvQWRkLnB1c2goe1xuICAgICAgICAgIGhhc1NoaXA6IGZhbHNlLFxuICAgICAgICAgIGhhc0hpdDogZmFsc2UsXG4gICAgICAgICAgc2hpcDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBib2FyZC5wdXNoKHRvQWRkKTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoY29vcmRzKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRzLmxlbmd0aCwgY29vcmRzKTtcbiAgICBuZXdTaGlwLmFsbENvb3JkcygpLmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gYm9hcmRbcG9pbnRbMF1dW3BvaW50WzFdXTtcbiAgICAgIGNvb3JkaW5hdGUuaGFzU2hpcCA9IHRydWU7XG4gICAgICBjb29yZGluYXRlLnNoaXAgPSBuZXdTaGlwO1xuICAgIH0pO1xuICAgIGFsbFNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICBjb25zdCBpc0hpdCA9IGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXTtcbiAgICBpc0hpdC5oYXNIaXQgPSB0cnVlO1xuICAgIGlmIChpc0hpdC5oYXNTaGlwKSB7XG4gICAgICBpc0hpdC5zaGlwLmhpdChjb29yZHMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4ge1xuICAgIGNvbnN0IG1pc3NlZENvb3JkaW5hdGVzID0gW107XG4gICAgZm9yIChsZXQgb3V0ZXJJbmRleCA9IDA7IG91dGVySW5kZXggPCBCT0FSRF9TSVpFOyBvdXRlckluZGV4KyspIHtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBib2FyZFtvdXRlckluZGV4XVtpbm5lckluZGV4XTtcbiAgICAgICAgaWYgKGNvb3JkaW5hdGUuaGFzSGl0ICYmICFjb29yZGluYXRlLmhhc1NoaXApIHtcbiAgICAgICAgICBtaXNzZWRDb29yZGluYXRlcy5wdXNoKFtvdXRlckluZGV4LCBpbm5lckluZGV4XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1pc3NlZENvb3JkaW5hdGVzO1xuICB9O1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgYWxsU2hpcFN0YXR1cyA9IGFsbFNoaXBzLm1hcCgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG5cbiAgICByZXR1cm4gYWxsU2hpcFN0YXR1cy5ldmVyeSgoc3RhdHVzKSA9PiBzdGF0dXMpO1xuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgcmVuZGVyR2FtZUJvYXJkID0gKERPTUVsZW1lbnQsIHNob3dTaGlwKSA9PiB7XG4gICAgZm9yIChsZXQgb3V0ZXJJbmRleCA9IDA7IG91dGVySW5kZXggPCBCT0FSRF9TSVpFOyBvdXRlckluZGV4KyspIHtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHRvQWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdG9BZGQuZGF0YXNldC5yb3cgPSBvdXRlckluZGV4O1xuICAgICAgICB0b0FkZC5kYXRhc2V0LmNvbHVtbiA9IGlubmVySW5kZXg7XG5cbiAgICAgICAgY29uc3QgY29vcmRTdGF0dXMgPSBib2FyZFtvdXRlckluZGV4XVtpbm5lckluZGV4XTtcblxuICAgICAgICBpZiAoc2hvd1NoaXApIHtcbiAgICAgICAgICBpZiAoY29vcmRTdGF0dXMuaGFzU2hpcCkge1xuICAgICAgICAgICAgdG9BZGQuc3R5bGUuYmFja2dyb3VuZCA9IFwicHVycGxlXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvb3JkU3RhdHVzLmhhc1NoaXAgJiYgY29vcmRTdGF0dXMuaGFzSGl0KSB7XG4gICAgICAgICAgdG9BZGQuc3R5bGUuYmFja2dyb3VuZCA9IFwicmVkXCI7XG4gICAgICAgICAgaWYgKGNvb3JkU3RhdHVzLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIHRvQWRkLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNvb3JkU3RhdHVzLmhhc0hpdCkge1xuICAgICAgICAgIHRvQWRkLnN0eWxlLmJhY2tncm91bmQgPSBcImJsdWVcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIERPTUVsZW1lbnQuYXBwZW5kQ2hpbGQodG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldE1pc3NlZEF0dGFja3MsXG4gICAgYWxsU3VuayxcbiAgICBnZXRCb2FyZCxcbiAgICByZW5kZXJHYW1lQm9hcmQsXG4gIH07XG59O1xuXG5leHBvcnQgeyBnYW1lQm9hcmQsIEJPQVJEX1NJWkUgfTtcbiIsImltcG9ydCB7IGdhbWVCb2FyZCwgQk9BUkRfU0laRSB9IGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuaW1wb3J0IHsgcGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5cbmNvbnN0IGdhbWVMb29wID0gKCkgPT4ge1xuICBjb25zdCBodW1hbkRPTUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodW1hbkJvYXJkXCIpO1xuICBjb25zdCBjb21wdXRlckRPTUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlckJvYXJkXCIpO1xuXG4gIGNvbnN0IGh1bWFuQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICBjb25zdCBodW1hblBsYXllciA9IHBsYXllcihjb21wdXRlckJvYXJkKTtcbiAgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXIoaHVtYW5Cb2FyZCk7XG5cbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gIGxldCBzaGlwSW5kZXggPSAwO1xuICBsZXQgc2hpcERpbWVuc2lvbiA9IFwicm93XCI7XG4gIGxldCBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcblxuICBjb25zdCBjaGVja1dpbm5lciA9ICgpID0+IHtcbiAgICBpZiAoaHVtYW5Cb2FyZC5hbGxTdW5rKCkgfHwgY29tcHV0ZXJCb2FyZC5hbGxTdW5rKCkpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAoZnVuY3Rpb24gYWRkRGltZW5zaW9uQnV0dG9uKCkge1xuICAgIGNvbnN0IGh1bWFuTWFpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBidXR0b24uaWQgPSBcImRpbWVuc2lvbkJ1dHRvblwiO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGBDaGFuZ2UgdG8gJHtcbiAgICAgIHNoaXBEaW1lbnNpb24gPT09IFwicm93XCIgPyBcInJvd1wiIDogXCJjb2x1bW5cIlxuICAgIH1gO1xuXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaW1lbnNpb25CdXR0b25cIik7XG5cbiAgICAgIGlmIChjdXJyZW50VGV4dC50ZXh0Q29udGVudC5pbmNsdWRlcyhcInJvd1wiKSkge1xuICAgICAgICBzaGlwRGltZW5zaW9uID0gXCJjb2x1bW5cIjtcbiAgICAgICAgY3VycmVudFRleHQudGV4dENvbnRlbnQgPSBcIkNoYW5nZSB0byBjb2x1bW5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBEaW1lbnNpb24gPSBcInJvd1wiO1xuICAgICAgICBjdXJyZW50VGV4dC50ZXh0Q29udGVudCA9IFwiQ2hhbmdlIHRvIHJvd1wiO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaHVtYW5NYWluRGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH0pKCk7XG5cbiAgY29uc3QgYm9hcmRMaXN0ZW5lciA9IChldmVudCwgYm9hcmQpID0+IHtcbiAgICBpZiAoaHVtYW5QbGF5ZXIuY3VycmVudFR1cm4oKSkge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IFtcbiAgICAgICAgTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyksXG4gICAgICAgIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC5jb2x1bW4pLFxuICAgICAgXTtcblxuICAgICAgaWYgKFxuICAgICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9PT0gXCJibHVlXCIgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPT09IFwicmVkXCJcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGUpO1xuXG4gICAgICBjb21wdXRlckRPTUJvYXJkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICBjb21wdXRlckJvYXJkLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckRPTUJvYXJkLCBmYWxzZSk7XG5cbiAgICAgIGlmIChjaGVja1dpbm5lcigpKSB7XG4gICAgICAgIGFsZXJ0KFwiWW91IFdpbiFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaHVtYW5QbGF5ZXIuY2hhbmdlVHVybigpO1xuXG4gICAgICBjb21wdXRlclBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgICBjb21wdXRlclBsYXllci5tYWtlUmFuZG9tTW92ZSgpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgaHVtYW5Cb2FyZC5yZW5kZXJHYW1lQm9hcmQoaHVtYW5ET01Cb2FyZCwgdHJ1ZSk7XG4gICAgICBpZiAoY2hlY2tXaW5uZXIoKSkge1xuICAgICAgICBhbGVydChcIkNvbXB1dGVyIFdpbnNcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbXB1dGVyUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICAgIGh1bWFuUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICB9XG4gIH07XG5cbiAgY29tcHV0ZXJET01Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PlxuICAgIGJvYXJkTGlzdGVuZXIoZXZlbnQsIGNvbXB1dGVyQm9hcmQpXG4gICk7XG5cbiAgLy8gU2V0IHVwIGZvciBpbml0aWFsIGdhbWVwbGF5XG4gIChmdW5jdGlvbiBpbml0aWFsaXphdGlvblNoaXBzKCkge1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFsxLCAxXSxcbiAgICAgIFsxLCAyXSxcbiAgICAgIFsxLCAzXSxcbiAgICAgIFsxLCA0XSxcbiAgICAgIFsxLCA1XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFszLCAzXSxcbiAgICAgIFszLCA0XSxcbiAgICAgIFszLCA1XSxcbiAgICAgIFszLCA2XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFs1LCA0XSxcbiAgICAgIFs2LCA0XSxcbiAgICAgIFs3LCA0XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFs2LCA3XSxcbiAgICAgIFs3LCA3XSxcbiAgICAgIFs4LCA3XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFs4LCAxXSxcbiAgICAgIFs4LCAyXSxcbiAgICBdKTtcbiAgfSkoKTtcblxuICBjb25zdCBtb3VzZU92ZXJIdW1hbkJvYXJkID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcblxuICAgIGlmIChzaGlwSW5kZXggPT09IHNoaXBMZW5ndGhzLmxlbmd0aCkge1xuICAgICAgaHVtYW5ET01Cb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG1vdXNlT3Zlckh1bWFuQm9hcmQpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgbW91c2VPdXRIdW1hbkJvYXJkKTtcbiAgICAgIGh1bWFuRE9NQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vdXNlQ2xpY2tIdW1hbkJvYXJkKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGltZW5zaW9uQnV0dG9uXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGh1bWFuUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCkge1xuICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJsaWdodGdyZXlcIjtcbiAgICAgIGNvbnN0IHNoaXBUb1BhaW50ID0gc2hpcExlbmd0aHNbc2hpcEluZGV4XTtcblxuICAgICAgY29uc3QgZGl2c1RvUGFpbnQgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBUb1BhaW50OyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0ge1xuICAgICAgICAgIHJvdzogTnVtYmVyKGVsZW1lbnQuZGF0YXNldC5yb3cpLFxuICAgICAgICAgIGNvbHVtbjogTnVtYmVyKGVsZW1lbnQuZGF0YXNldC5jb2x1bW4pLFxuICAgICAgICB9O1xuICAgICAgICBuZXdDb29yZGluYXRlc1tzaGlwRGltZW5zaW9uXSA9IG5ld0Nvb3JkaW5hdGVzW3NoaXBEaW1lbnNpb25dICsgaW5kZXg7XG4gICAgICAgIGxldCB0b0NvbG9yRWxlbWVudDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRvQ29sb3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1yb3c9XCIke25ld0Nvb3JkaW5hdGVzLnJvd31cIl1bZGF0YS1jb2x1bW49XCIke25ld0Nvb3JkaW5hdGVzLmNvbHVtbn1cIl1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0b0NvbG9yRWxlbWVudCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvQ29sb3JFbGVtZW50ICYmICF0b0NvbG9yRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgZGl2c1RvUGFpbnQucHVzaCh0b0NvbG9yRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGl2c1RvUGFpbnQubGVuZ3RoID09PSBzaGlwVG9QYWludCAtIDEpIHtcbiAgICAgICAgICBkaXZzVG9QYWludC5mb3JFYWNoKFxuICAgICAgICAgICAgKHBhaW50RWxlbWVudCkgPT4gKHBhaW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJsaWdodGdyZXlcIilcbiAgICAgICAgICApO1xuICAgICAgICAgIHNoaXBQbGFjZW1lbnRQb3NzaWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbW91c2VPdXRIdW1hbkJvYXJkID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICBpZiAoZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID09PSBcImxpZ2h0Z3JleVwiKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcIlwiO1xuXG4gICAgICBjb25zdCBzaGlwVG9QYWludCA9IHNoaXBMZW5ndGhzW3NoaXBJbmRleF07XG5cbiAgICAgIGlmIChzaGlwUGxhY2VtZW50UG9zc2libGUpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBUb1BhaW50OyBpbmRleCsrKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgICByb3c6IE51bWJlcihlbGVtZW50LmRhdGFzZXQucm93KSxcbiAgICAgICAgICAgIGNvbHVtbjogTnVtYmVyKGVsZW1lbnQuZGF0YXNldC5jb2x1bW4pLFxuICAgICAgICAgIH07XG4gICAgICAgICAgbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gPSBuZXdDb29yZGluYXRlc1tzaGlwRGltZW5zaW9uXSArIGluZGV4O1xuICAgICAgICAgIGNvbnN0IHRvQ29sb3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1yb3c9XCIke25ld0Nvb3JkaW5hdGVzLnJvd31cIl1bZGF0YS1jb2x1bW49XCIke25ld0Nvb3JkaW5hdGVzLmNvbHVtbn1cIl1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0b0NvbG9yRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaXBQbGFjZW1lbnRQb3NzaWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBtb3VzZUNsaWNrSHVtYW5Cb2FyZCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgcGxhY2VtZW50Q29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGlmIChzaGlwUGxhY2VtZW50UG9zc2libGUpIHtcbiAgICAgIGNvbnN0IHNoaXBUb1BhaW50ID0gc2hpcExlbmd0aHNbc2hpcEluZGV4XTtcbiAgICAgIGNvbnN0IHN0cmluZ0Nvb3JkaW5hdGUgPSBlbGVtZW50LmRhdGFzZXQ7XG4gICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZSA9IFtcbiAgICAgICAgTnVtYmVyKHN0cmluZ0Nvb3JkaW5hdGUucm93KSxcbiAgICAgICAgTnVtYmVyKHN0cmluZ0Nvb3JkaW5hdGUuY29sdW1uKSxcbiAgICAgIF07XG4gICAgICBwbGFjZW1lbnRDb29yZGluYXRlcy5wdXNoKGN1cnJlbnRDb29yZGluYXRlKTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBUb1BhaW50OyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5leHRDb29yZGluYXRlID0gWy4uLmN1cnJlbnRDb29yZGluYXRlXTtcbiAgICAgICAgY29uc3QgZGltZW5zaW9uID0gc2hpcERpbWVuc2lvbiA9PT0gXCJyb3dcIiA/IDAgOiAxO1xuICAgICAgICBuZXh0Q29vcmRpbmF0ZVtkaW1lbnNpb25dID0gbmV4dENvb3JkaW5hdGVbZGltZW5zaW9uXSArIGluZGV4O1xuICAgICAgICBwbGFjZW1lbnRDb29yZGluYXRlcy5wdXNoKG5leHRDb29yZGluYXRlKTtcbiAgICAgIH1cblxuICAgICAgaHVtYW5Cb2FyZC5wbGFjZVNoaXAocGxhY2VtZW50Q29vcmRpbmF0ZXMpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgaHVtYW5Cb2FyZC5yZW5kZXJHYW1lQm9hcmQoaHVtYW5ET01Cb2FyZCwgdHJ1ZSk7XG4gICAgICBzaGlwSW5kZXgrKztcbiAgICAgIHNoaXBQbGFjZW1lbnRQb3NzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBodW1hbkRPTUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgbW91c2VPdmVySHVtYW5Cb2FyZCk7XG4gIGh1bWFuRE9NQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIG1vdXNlT3V0SHVtYW5Cb2FyZCk7XG4gIGh1bWFuRE9NQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vdXNlQ2xpY2tIdW1hbkJvYXJkKTtcblxuICBodW1hbkJvYXJkLnJlbmRlckdhbWVCb2FyZChodW1hbkRPTUJvYXJkLCB0cnVlKTtcbiAgY29tcHV0ZXJCb2FyZC5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJET01Cb2FyZCwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImltcG9ydCB7IEJPQVJEX1NJWkUgfSBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcblxuY29uc3QgcGxheWVyID0gKGdhbWVCb2FyZCkgPT4ge1xuICBjb25zdCBlbmVteUJvYXJkID0gZ2FtZUJvYXJkO1xuICBjb25zdCBtb3Zlc01hZGUgPSBbXTtcbiAgbGV0IGxhc3RNb3ZlSGl0ID0gZmFsc2U7XG4gIGxldCBwbGF5ZXJUdXJuID0gZmFsc2U7XG5cbiAgY29uc3QgcmFuZG9tTW92ZSA9ICgpID0+IFtcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9TSVpFKSxcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9TSVpFKSxcbiAgXTtcblxuICBjb25zdCBzbWFydE1vdmUgPSAoY29vcmRzKSA9PiB7XG4gICAgY29uc3QgbmV3Q29vcmRzID0gWy4uLmNvb3Jkc107XG4gICAgY29uc3Qgb3B0aW9ucyA9IFsxLCAtMV07XG4gICAgbGV0IHNpbmdsZUNvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgbmV3Q29vcmRzW3NpbmdsZUNvb3JkXSA9XG4gICAgICBjb29yZHNbc2luZ2xlQ29vcmRdICsgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG5cbiAgICB3aGlsZSAobmV3Q29vcmRzLmluY2x1ZGVzKC0xKSB8fCBuZXdDb29yZHMuaW5jbHVkZXMoMTApKSB7XG4gICAgICBuZXdDb29yZHNbc2luZ2xlQ29vcmRdID1cbiAgICAgICAgY29vcmRzW3NpbmdsZUNvb3JkXSArIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xuICAgIH1cbiAgICByZXR1cm4gbmV3Q29vcmRzO1xuICB9O1xuXG4gIGNvbnN0IG1ha2VNb3ZlID0gKGNvb3JkcykgPT4ge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IG1ha2VSYW5kb21Nb3ZlID0gKCkgPT4ge1xuICAgIGxldCBtb3ZlO1xuICAgIGxldCBtb3ZlVHJpZXMgPSAwO1xuICAgIGlmIChsYXN0TW92ZUhpdCkge1xuICAgICAgbW92ZSA9IHNtYXJ0TW92ZShtb3Zlc01hZGVbbW92ZXNNYWRlLmxlbmd0aCAtIDFdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW92ZSA9IHJhbmRvbU1vdmUoKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoXG4gICAgICBtb3Zlc01hZGUuc29tZShcbiAgICAgICAgKG9sZE1vdmUpID0+IG9sZE1vdmVbMF0gPT09IG1vdmVbMF0gJiYgb2xkTW92ZVsxXSA9PT0gbW92ZVsxXVxuICAgICAgKVxuICAgICkge1xuICAgICAgaWYgKGxhc3RNb3ZlSGl0ICYmIG1vdmVUcmllcyA8IDYpIHtcbiAgICAgICAgbW92ZSA9IHNtYXJ0TW92ZShtb3Zlc01hZGVbbW92ZXNNYWRlLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgbW92ZVRyaWVzKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb3ZlID0gcmFuZG9tTW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBtb3Zlc01hZGUucHVzaChtb3ZlKTtcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhtb3ZlKTtcbiAgICBpZiAoaXNIaXQpIHtcbiAgICAgIGxhc3RNb3ZlSGl0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdE1vdmVIaXQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW92ZTtcbiAgfTtcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuICAgIHBsYXllclR1cm4gPSAhcGxheWVyVHVybjtcbiAgfTtcblxuICBjb25zdCBjdXJyZW50VHVybiA9ICgpID0+IHBsYXllclR1cm47XG5cbiAgcmV0dXJuIHtcbiAgICBtYWtlTW92ZSxcbiAgICBtYWtlUmFuZG9tTW92ZSxcbiAgICBjdXJyZW50VHVybixcbiAgICBjaGFuZ2VUdXJuLFxuICB9O1xufTtcblxuZXhwb3J0IHsgcGxheWVyIH07XG4iLCJjb25zdCBjcmVhdGVTaGlwID0gKGxlbmd0aCwgYXJyYXlDb29yZHMpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgbGV0IHNoaXBDb29yZHMgPSBhcnJheUNvb3Jkcy5tYXAoKHNwb3QpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29vcmRzOiBbc3BvdFswXSwgc3BvdFsxXV0sXG4gICAgICBpc0hpdDogZmFsc2UsXG4gICAgfTtcbiAgfSk7XG5cbiAgY29uc3QgaGl0ID0gKGNvb3JkcykgPT4ge1xuICAgIHNoaXBDb29yZHMgPSBzaGlwQ29vcmRzLm1hcCgoc3BvdCkgPT5cbiAgICAgIHNwb3QuY29vcmRzWzBdID09PSBjb29yZHNbMF0gJiYgc3BvdC5jb29yZHNbMV0gPT09IGNvb3Jkc1sxXVxuICAgICAgICA/IHsgLi4uc3BvdCwgaXNIaXQ6IHRydWUgfVxuICAgICAgICA6IHNwb3RcbiAgICApO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHNoaXBDb29yZHMuZXZlcnkoKGNvb3JkKSA9PiBjb29yZC5pc0hpdCk7XG5cbiAgY29uc3QgaGl0Q29vcmRzID0gKCkgPT4gc2hpcENvb3Jkcy5maWx0ZXIoKGNvb3JkcykgPT4gY29vcmRzLmlzSGl0KTtcblxuICBjb25zdCBnZXRTaGlwTGVuZ3RoID0gKCkgPT4gc2hpcExlbmd0aDtcblxuICBjb25zdCBhbGxDb29yZHMgPSAoKSA9PlxuICAgIHNoaXBDb29yZHMubWFwKChwb2ludCkgPT4gW3BvaW50LmNvb3Jkc1swXSwgcG9pbnQuY29vcmRzWzFdXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGhpdENvb3JkcyxcbiAgICBnZXRTaGlwTGVuZ3RoLFxuICAgIGFsbENvb3JkcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvcmVzZXQuY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9zdHlsZS5jc3NcIjtcblxuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9zY3JpcHRzL2dhbWVMb29wXCI7XG5cbmdhbWVMb29wKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=