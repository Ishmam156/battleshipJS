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
            toAdd.style.background = "#476072";
          }
        }

        if (coordStatus.hasShip && coordStatus.hasHit) {
          toAdd.style.background = "indianred";
          if (coordStatus.ship.isSunk()) {
            toAdd.textContent = "X";
          }
        } else if (coordStatus.hasHit) {
          toAdd.style.background = "#5089C6";
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
  const textDisplay = document.getElementById("textContent").firstElementChild;

  const humanBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  const computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.player)(computerBoard);
  const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.player)(humanBoard);

  const shipLengths = [5, 4, 3, 3, 2];
  let shipIndex = 0;
  let shipDimension = "row";
  let shipPlacementPossible = false;

  textDisplay.textContent = `Place your ships on the board! Current ship length: ${shipLengths[shipIndex]} places`;

  const checkWinner = () => {
    if (humanBoard.allSunk() || computerBoard.allSunk()) return true;
    return false;
  };

  const addRestartButton = () => {
    const restartButton = document.getElementById("dimensionButton");
    restartButton.style.display = "block";
    restartButton.textContent = "Play again?";
    restartButton.onclick = () => location.reload();
  };

  (function addDimensionButton() {
    const humanMainDiv = document.getElementById("textContent");
    const button = document.createElement("button");

    button.id = "dimensionButton";
    button.textContent = `Change placement to ${
      shipDimension === "row" ? "row" : "column"
    }`;

    button.addEventListener("click", (event) => {
      const currentText = document.getElementById("dimensionButton");

      if (currentText.textContent.includes("row")) {
        shipDimension = "column";
        currentText.textContent = "Change placement to column";
      } else {
        shipDimension = "row";
        currentText.textContent = "Change placement to row";
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
        textDisplay.textContent =
          "Congratulations! You've won and sank all the ships!";
        textDisplay.style.fontWeight = "bold";
        addRestartButton();
        return;
      }

      humanPlayer.changeTurn();

      textDisplay.textContent = "Wait for the computer's turn!";

      computerPlayer.changeTurn();
      setTimeout(() => {
        computerPlayer.makeRandomMove();
        humanDOMBoard.innerHTML = "";
        humanBoard.renderGameBoard(humanDOMBoard, true);
        if (checkWinner()) {
          textDisplay.textContent =
            "Oh no! You've lost and all your ships have sunk!";
          textDisplay.style.fontWeight = "bold";
          addRestartButton();
          return;
        }
        computerPlayer.changeTurn();
        humanPlayer.changeTurn();
        textDisplay.textContent =
          "Your turn again! Try to sink your opponent's ships!";
      }, 1000);
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
      textDisplay.textContent = "Your turn! Try to sink your opponent's ships!";
      document.getElementById("computerBoard").classList.add("hover");
    }

    if (!element.style.background) {
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
            (paintElement) =>
              (paintElement.style.background = "rgb(84, 140, 168)")
          );
          element.style.background = "rgb(84, 140, 168)";
          shipPlacementPossible = true;
        } else if (element.id !== "humanBoard") {
          element.style.background = "indianred";
        }
      }
    }
  };

  const mouseOutHumanBoard = (event) => {
    const element = event.target;
    if (
      element.style.background === "rgb(84, 140, 168)" ||
      element.style.background === "indianred"
    ) {
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
      textDisplay.textContent = `Place your ships on the board! Current ship length: ${shipLengths[shipIndex]} places`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBb0M7O0FBRXBDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIseUJBQXlCO0FBQ3REO0FBQ0EsK0JBQStCLHlCQUF5QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0Esb0JBQW9CLGlEQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2Qix5QkFBeUI7QUFDdEQsK0JBQStCLHlCQUF5QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDZCQUE2Qix5QkFBeUI7QUFDdEQsK0JBQStCLHlCQUF5QjtBQUN4RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4R21CO0FBQ2xCOztBQUVsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscURBQVM7QUFDOUIsd0JBQXdCLHFEQUFTO0FBQ2pDLHNCQUFzQiwrQ0FBTTtBQUM1Qix5QkFBeUIsK0NBQU07O0FBRS9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1GQUFtRix3QkFBd0I7O0FBRTNHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSwwQkFBMEIscUJBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLG1CQUFtQixrQkFBa0Isc0JBQXNCO0FBQ3JGO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw0QkFBNEIscUJBQXFCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtQkFBbUIsa0JBQWtCLHNCQUFzQjtBQUNyRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUZBQXVGLHdCQUF3QjtBQUMvRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFb0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0UXFCOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLGtEQUFVO0FBQ3pDLCtCQUErQixrREFBVTtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7QUM5RWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVzQjs7Ozs7OztVQ3BDdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjRCO0FBQ0E7O0FBRWtCOztBQUU5QywyREFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcz9kZDUxIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlLmNzcz8yMzk0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgQk9BUkRfU0laRSA9IDEwO1xuXG5jb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW107XG5cbiAgKGZ1bmN0aW9uIGluaXRpbGlhemVCb2FyZCgpIHtcbiAgICBmb3IgKGxldCBvdXRlckluZGV4ID0gMDsgb3V0ZXJJbmRleCA8IEJPQVJEX1NJWkU7IG91dGVySW5kZXgrKykge1xuICAgICAgY29uc3QgdG9BZGQgPSBbXTtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIHRvQWRkLnB1c2goe1xuICAgICAgICAgIGhhc1NoaXA6IGZhbHNlLFxuICAgICAgICAgIGhhc0hpdDogZmFsc2UsXG4gICAgICAgICAgc2hpcDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBib2FyZC5wdXNoKHRvQWRkKTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoY29vcmRzKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRzLmxlbmd0aCwgY29vcmRzKTtcbiAgICBuZXdTaGlwLmFsbENvb3JkcygpLmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gYm9hcmRbcG9pbnRbMF1dW3BvaW50WzFdXTtcbiAgICAgIGNvb3JkaW5hdGUuaGFzU2hpcCA9IHRydWU7XG4gICAgICBjb29yZGluYXRlLnNoaXAgPSBuZXdTaGlwO1xuICAgIH0pO1xuICAgIGFsbFNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICBjb25zdCBpc0hpdCA9IGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXTtcbiAgICBpc0hpdC5oYXNIaXQgPSB0cnVlO1xuICAgIGlmIChpc0hpdC5oYXNTaGlwKSB7XG4gICAgICBpc0hpdC5zaGlwLmhpdChjb29yZHMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4ge1xuICAgIGNvbnN0IG1pc3NlZENvb3JkaW5hdGVzID0gW107XG4gICAgZm9yIChsZXQgb3V0ZXJJbmRleCA9IDA7IG91dGVySW5kZXggPCBCT0FSRF9TSVpFOyBvdXRlckluZGV4KyspIHtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBib2FyZFtvdXRlckluZGV4XVtpbm5lckluZGV4XTtcbiAgICAgICAgaWYgKGNvb3JkaW5hdGUuaGFzSGl0ICYmICFjb29yZGluYXRlLmhhc1NoaXApIHtcbiAgICAgICAgICBtaXNzZWRDb29yZGluYXRlcy5wdXNoKFtvdXRlckluZGV4LCBpbm5lckluZGV4XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1pc3NlZENvb3JkaW5hdGVzO1xuICB9O1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgYWxsU2hpcFN0YXR1cyA9IGFsbFNoaXBzLm1hcCgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG5cbiAgICByZXR1cm4gYWxsU2hpcFN0YXR1cy5ldmVyeSgoc3RhdHVzKSA9PiBzdGF0dXMpO1xuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgcmVuZGVyR2FtZUJvYXJkID0gKERPTUVsZW1lbnQsIHNob3dTaGlwKSA9PiB7XG4gICAgZm9yIChsZXQgb3V0ZXJJbmRleCA9IDA7IG91dGVySW5kZXggPCBCT0FSRF9TSVpFOyBvdXRlckluZGV4KyspIHtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHRvQWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdG9BZGQuZGF0YXNldC5yb3cgPSBvdXRlckluZGV4O1xuICAgICAgICB0b0FkZC5kYXRhc2V0LmNvbHVtbiA9IGlubmVySW5kZXg7XG5cbiAgICAgICAgY29uc3QgY29vcmRTdGF0dXMgPSBib2FyZFtvdXRlckluZGV4XVtpbm5lckluZGV4XTtcblxuICAgICAgICBpZiAoc2hvd1NoaXApIHtcbiAgICAgICAgICBpZiAoY29vcmRTdGF0dXMuaGFzU2hpcCkge1xuICAgICAgICAgICAgdG9BZGQuc3R5bGUuYmFja2dyb3VuZCA9IFwiIzQ3NjA3MlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb29yZFN0YXR1cy5oYXNTaGlwICYmIGNvb3JkU3RhdHVzLmhhc0hpdCkge1xuICAgICAgICAgIHRvQWRkLnN0eWxlLmJhY2tncm91bmQgPSBcImluZGlhbnJlZFwiO1xuICAgICAgICAgIGlmIChjb29yZFN0YXR1cy5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICB0b0FkZC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjb29yZFN0YXR1cy5oYXNIaXQpIHtcbiAgICAgICAgICB0b0FkZC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjNTA4OUM2XCI7XG4gICAgICAgIH1cblxuICAgICAgICBET01FbGVtZW50LmFwcGVuZENoaWxkKHRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRNaXNzZWRBdHRhY2tzLFxuICAgIGFsbFN1bmssXG4gICAgZ2V0Qm9hcmQsXG4gICAgcmVuZGVyR2FtZUJvYXJkLFxuICB9O1xufTtcblxuZXhwb3J0IHsgZ2FtZUJvYXJkLCBCT0FSRF9TSVpFIH07XG4iLCJpbXBvcnQgeyBnYW1lQm9hcmQsIEJPQVJEX1NJWkUgfSBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcbmltcG9ydCB7IHBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuXG5jb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcbiAgY29uc3QgaHVtYW5ET01Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHVtYW5Cb2FyZFwiKTtcbiAgY29uc3QgY29tcHV0ZXJET01Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXJCb2FyZFwiKTtcbiAgY29uc3QgdGV4dERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRDb250ZW50XCIpLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gIGNvbnN0IGh1bWFuQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICBjb25zdCBodW1hblBsYXllciA9IHBsYXllcihjb21wdXRlckJvYXJkKTtcbiAgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXIoaHVtYW5Cb2FyZCk7XG5cbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gIGxldCBzaGlwSW5kZXggPSAwO1xuICBsZXQgc2hpcERpbWVuc2lvbiA9IFwicm93XCI7XG4gIGxldCBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcblxuICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzIG9uIHRoZSBib2FyZCEgQ3VycmVudCBzaGlwIGxlbmd0aDogJHtzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdfSBwbGFjZXNgO1xuXG4gIGNvbnN0IGNoZWNrV2lubmVyID0gKCkgPT4ge1xuICAgIGlmIChodW1hbkJvYXJkLmFsbFN1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFN1bmsoKSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGFkZFJlc3RhcnRCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGltZW5zaW9uQnV0dG9uXCIpO1xuICAgIHJlc3RhcnRCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJQbGF5IGFnYWluP1wiO1xuICAgIHJlc3RhcnRCdXR0b24ub25jbGljayA9ICgpID0+IGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9O1xuXG4gIChmdW5jdGlvbiBhZGREaW1lbnNpb25CdXR0b24oKSB7XG4gICAgY29uc3QgaHVtYW5NYWluRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0Q29udGVudFwiKTtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgYnV0dG9uLmlkID0gXCJkaW1lbnNpb25CdXR0b25cIjtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBgQ2hhbmdlIHBsYWNlbWVudCB0byAke1xuICAgICAgc2hpcERpbWVuc2lvbiA9PT0gXCJyb3dcIiA/IFwicm93XCIgOiBcImNvbHVtblwiXG4gICAgfWA7XG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpbWVuc2lvbkJ1dHRvblwiKTtcblxuICAgICAgaWYgKGN1cnJlbnRUZXh0LnRleHRDb250ZW50LmluY2x1ZGVzKFwicm93XCIpKSB7XG4gICAgICAgIHNoaXBEaW1lbnNpb24gPSBcImNvbHVtblwiO1xuICAgICAgICBjdXJyZW50VGV4dC50ZXh0Q29udGVudCA9IFwiQ2hhbmdlIHBsYWNlbWVudCB0byBjb2x1bW5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBEaW1lbnNpb24gPSBcInJvd1wiO1xuICAgICAgICBjdXJyZW50VGV4dC50ZXh0Q29udGVudCA9IFwiQ2hhbmdlIHBsYWNlbWVudCB0byByb3dcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGh1bWFuTWFpbkRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICB9KSgpO1xuXG4gIGNvbnN0IGJvYXJkTGlzdGVuZXIgPSAoZXZlbnQsIGJvYXJkKSA9PiB7XG4gICAgaWYgKGh1bWFuUGxheWVyLmN1cnJlbnRUdXJuKCkpIHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBbXG4gICAgICAgIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC5yb3cpLFxuICAgICAgICBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uKSxcbiAgICAgIF07XG5cbiAgICAgIGlmIChcbiAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPT09IFwiYmx1ZVwiIHx8XG4gICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID09PSBcInJlZFwiXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlKTtcblxuICAgICAgY29tcHV0ZXJET01Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgY29tcHV0ZXJCb2FyZC5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJET01Cb2FyZCwgZmFsc2UpO1xuXG4gICAgICBpZiAoY2hlY2tXaW5uZXIoKSkge1xuICAgICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgXCJDb25ncmF0dWxhdGlvbnMhIFlvdSd2ZSB3b24gYW5kIHNhbmsgYWxsIHRoZSBzaGlwcyFcIjtcbiAgICAgICAgdGV4dERpc3BsYXkuc3R5bGUuZm9udFdlaWdodCA9IFwiYm9sZFwiO1xuICAgICAgICBhZGRSZXN0YXJ0QnV0dG9uKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaHVtYW5QbGF5ZXIuY2hhbmdlVHVybigpO1xuXG4gICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9IFwiV2FpdCBmb3IgdGhlIGNvbXB1dGVyJ3MgdHVybiFcIjtcblxuICAgICAgY29tcHV0ZXJQbGF5ZXIuY2hhbmdlVHVybigpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbXB1dGVyUGxheWVyLm1ha2VSYW5kb21Nb3ZlKCk7XG4gICAgICAgIGh1bWFuRE9NQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgaHVtYW5Cb2FyZC5yZW5kZXJHYW1lQm9hcmQoaHVtYW5ET01Cb2FyZCwgdHJ1ZSk7XG4gICAgICAgIGlmIChjaGVja1dpbm5lcigpKSB7XG4gICAgICAgICAgdGV4dERpc3BsYXkudGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgXCJPaCBubyEgWW91J3ZlIGxvc3QgYW5kIGFsbCB5b3VyIHNoaXBzIGhhdmUgc3VuayFcIjtcbiAgICAgICAgICB0ZXh0RGlzcGxheS5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XG4gICAgICAgICAgYWRkUmVzdGFydEJ1dHRvbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb21wdXRlclBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgICAgIGh1bWFuUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgdGV4dERpc3BsYXkudGV4dENvbnRlbnQgPVxuICAgICAgICAgIFwiWW91ciB0dXJuIGFnYWluISBUcnkgdG8gc2luayB5b3VyIG9wcG9uZW50J3Mgc2hpcHMhXCI7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gIH07XG5cbiAgY29tcHV0ZXJET01Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PlxuICAgIGJvYXJkTGlzdGVuZXIoZXZlbnQsIGNvbXB1dGVyQm9hcmQpXG4gICk7XG5cbiAgLy8gU2V0IHVwIGZvciBpbml0aWFsIGdhbWVwbGF5XG4gIChmdW5jdGlvbiBpbml0aWFsaXphdGlvblNoaXBzKCkge1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFsxLCAxXSxcbiAgICAgIFsxLCAyXSxcbiAgICAgIFsxLCAzXSxcbiAgICAgIFsxLCA0XSxcbiAgICAgIFsxLCA1XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFszLCAzXSxcbiAgICAgIFszLCA0XSxcbiAgICAgIFszLCA1XSxcbiAgICAgIFszLCA2XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFs1LCA0XSxcbiAgICAgIFs2LCA0XSxcbiAgICAgIFs3LCA0XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFs2LCA3XSxcbiAgICAgIFs3LCA3XSxcbiAgICAgIFs4LCA3XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFs4LCAxXSxcbiAgICAgIFs4LCAyXSxcbiAgICBdKTtcbiAgfSkoKTtcblxuICBjb25zdCBtb3VzZU92ZXJIdW1hbkJvYXJkID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcblxuICAgIGlmIChzaGlwSW5kZXggPT09IHNoaXBMZW5ndGhzLmxlbmd0aCkge1xuICAgICAgaHVtYW5ET01Cb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG1vdXNlT3Zlckh1bWFuQm9hcmQpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgbW91c2VPdXRIdW1hbkJvYXJkKTtcbiAgICAgIGh1bWFuRE9NQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vdXNlQ2xpY2tIdW1hbkJvYXJkKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGltZW5zaW9uQnV0dG9uXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGh1bWFuUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gXCJZb3VyIHR1cm4hIFRyeSB0byBzaW5rIHlvdXIgb3Bwb25lbnQncyBzaGlwcyFcIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXJCb2FyZFwiKS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgfVxuXG4gICAgaWYgKCFlbGVtZW50LnN0eWxlLmJhY2tncm91bmQpIHtcbiAgICAgIGNvbnN0IHNoaXBUb1BhaW50ID0gc2hpcExlbmd0aHNbc2hpcEluZGV4XTtcblxuICAgICAgY29uc3QgZGl2c1RvUGFpbnQgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBUb1BhaW50OyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0ge1xuICAgICAgICAgIHJvdzogTnVtYmVyKGVsZW1lbnQuZGF0YXNldC5yb3cpLFxuICAgICAgICAgIGNvbHVtbjogTnVtYmVyKGVsZW1lbnQuZGF0YXNldC5jb2x1bW4pLFxuICAgICAgICB9O1xuICAgICAgICBuZXdDb29yZGluYXRlc1tzaGlwRGltZW5zaW9uXSA9IG5ld0Nvb3JkaW5hdGVzW3NoaXBEaW1lbnNpb25dICsgaW5kZXg7XG4gICAgICAgIGxldCB0b0NvbG9yRWxlbWVudDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRvQ29sb3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1yb3c9XCIke25ld0Nvb3JkaW5hdGVzLnJvd31cIl1bZGF0YS1jb2x1bW49XCIke25ld0Nvb3JkaW5hdGVzLmNvbHVtbn1cIl1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0b0NvbG9yRWxlbWVudCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvQ29sb3JFbGVtZW50ICYmICF0b0NvbG9yRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgZGl2c1RvUGFpbnQucHVzaCh0b0NvbG9yRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGl2c1RvUGFpbnQubGVuZ3RoID09PSBzaGlwVG9QYWludCAtIDEpIHtcbiAgICAgICAgICBkaXZzVG9QYWludC5mb3JFYWNoKFxuICAgICAgICAgICAgKHBhaW50RWxlbWVudCkgPT5cbiAgICAgICAgICAgICAgKHBhaW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2IoODQsIDE0MCwgMTY4KVwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2IoODQsIDE0MCwgMTY4KVwiO1xuICAgICAgICAgIHNoaXBQbGFjZW1lbnRQb3NzaWJsZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5pZCAhPT0gXCJodW1hbkJvYXJkXCIpIHtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcImluZGlhbnJlZFwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG1vdXNlT3V0SHVtYW5Cb2FyZCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKFxuICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID09PSBcInJnYig4NCwgMTQwLCAxNjgpXCIgfHxcbiAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9PT0gXCJpbmRpYW5yZWRcIlxuICAgICkge1xuICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcblxuICAgICAgY29uc3Qgc2hpcFRvUGFpbnQgPSBzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdO1xuXG4gICAgICBpZiAoc2hpcFBsYWNlbWVudFBvc3NpYmxlKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBzaGlwVG9QYWludDsgaW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgcm93OiBOdW1iZXIoZWxlbWVudC5kYXRhc2V0LnJvdyksXG4gICAgICAgICAgICBjb2x1bW46IE51bWJlcihlbGVtZW50LmRhdGFzZXQuY29sdW1uKSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzW3NoaXBEaW1lbnNpb25dID0gbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gKyBpbmRleDtcbiAgICAgICAgICBjb25zdCB0b0NvbG9yRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcm93PVwiJHtuZXdDb29yZGluYXRlcy5yb3d9XCJdW2RhdGEtY29sdW1uPVwiJHtuZXdDb29yZGluYXRlcy5jb2x1bW59XCJdYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdG9Db2xvckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbW91c2VDbGlja0h1bWFuQm9hcmQgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHBsYWNlbWVudENvb3JkaW5hdGVzID0gW107XG5cbiAgICBpZiAoc2hpcFBsYWNlbWVudFBvc3NpYmxlKSB7XG4gICAgICBjb25zdCBzaGlwVG9QYWludCA9IHNoaXBMZW5ndGhzW3NoaXBJbmRleF07XG4gICAgICBjb25zdCBzdHJpbmdDb29yZGluYXRlID0gZWxlbWVudC5kYXRhc2V0O1xuICAgICAgY29uc3QgY3VycmVudENvb3JkaW5hdGUgPSBbXG4gICAgICAgIE51bWJlcihzdHJpbmdDb29yZGluYXRlLnJvdyksXG4gICAgICAgIE51bWJlcihzdHJpbmdDb29yZGluYXRlLmNvbHVtbiksXG4gICAgICBdO1xuICAgICAgcGxhY2VtZW50Q29vcmRpbmF0ZXMucHVzaChjdXJyZW50Q29vcmRpbmF0ZSk7XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBzaGlwVG9QYWludDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBuZXh0Q29vcmRpbmF0ZSA9IFsuLi5jdXJyZW50Q29vcmRpbmF0ZV07XG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IHNoaXBEaW1lbnNpb24gPT09IFwicm93XCIgPyAwIDogMTtcbiAgICAgICAgbmV4dENvb3JkaW5hdGVbZGltZW5zaW9uXSA9IG5leHRDb29yZGluYXRlW2RpbWVuc2lvbl0gKyBpbmRleDtcbiAgICAgICAgcGxhY2VtZW50Q29vcmRpbmF0ZXMucHVzaChuZXh0Q29vcmRpbmF0ZSk7XG4gICAgICB9XG5cbiAgICAgIGh1bWFuQm9hcmQucGxhY2VTaGlwKHBsYWNlbWVudENvb3JkaW5hdGVzKTtcbiAgICAgIGh1bWFuRE9NQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIGh1bWFuQm9hcmQucmVuZGVyR2FtZUJvYXJkKGh1bWFuRE9NQm9hcmQsIHRydWUpO1xuICAgICAgc2hpcEluZGV4Kys7XG4gICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzIG9uIHRoZSBib2FyZCEgQ3VycmVudCBzaGlwIGxlbmd0aDogJHtzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdfSBwbGFjZXNgO1xuICAgICAgc2hpcFBsYWNlbWVudFBvc3NpYmxlID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGh1bWFuRE9NQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBtb3VzZU92ZXJIdW1hbkJvYXJkKTtcbiAgaHVtYW5ET01Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgbW91c2VPdXRIdW1hbkJvYXJkKTtcbiAgaHVtYW5ET01Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW91c2VDbGlja0h1bWFuQm9hcmQpO1xuXG4gIGh1bWFuQm9hcmQucmVuZGVyR2FtZUJvYXJkKGh1bWFuRE9NQm9hcmQsIHRydWUpO1xuICBjb21wdXRlckJvYXJkLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckRPTUJvYXJkLCBmYWxzZSk7XG59O1xuXG5leHBvcnQgeyBnYW1lTG9vcCB9O1xuIiwiaW1wb3J0IHsgQk9BUkRfU0laRSB9IGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuXG5jb25zdCBwbGF5ZXIgPSAoZ2FtZUJvYXJkKSA9PiB7XG4gIGNvbnN0IGVuZW15Qm9hcmQgPSBnYW1lQm9hcmQ7XG4gIGNvbnN0IG1vdmVzTWFkZSA9IFtdO1xuICBsZXQgbGFzdE1vdmVIaXQgPSBmYWxzZTtcbiAgbGV0IHBsYXllclR1cm4gPSBmYWxzZTtcblxuICBjb25zdCByYW5kb21Nb3ZlID0gKCkgPT4gW1xuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX1NJWkUpLFxuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX1NJWkUpLFxuICBdO1xuXG4gIGNvbnN0IHNtYXJ0TW92ZSA9IChjb29yZHMpID0+IHtcbiAgICBjb25zdCBuZXdDb29yZHMgPSBbLi4uY29vcmRzXTtcbiAgICBjb25zdCBvcHRpb25zID0gWzEsIC0xXTtcbiAgICBsZXQgc2luZ2xlQ29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICBuZXdDb29yZHNbc2luZ2xlQ29vcmRdID1cbiAgICAgIGNvb3Jkc1tzaW5nbGVDb29yZF0gKyBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcblxuICAgIHdoaWxlIChuZXdDb29yZHMuaW5jbHVkZXMoLTEpIHx8IG5ld0Nvb3Jkcy5pbmNsdWRlcygxMCkpIHtcbiAgICAgIG5ld0Nvb3Jkc1tzaW5nbGVDb29yZF0gPVxuICAgICAgICBjb29yZHNbc2luZ2xlQ29vcmRdICsgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgfVxuICAgIHJldHVybiBuZXdDb29yZHM7XG4gIH07XG5cbiAgY29uc3QgbWFrZU1vdmUgPSAoY29vcmRzKSA9PiB7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgbWFrZVJhbmRvbU1vdmUgPSAoKSA9PiB7XG4gICAgbGV0IG1vdmU7XG4gICAgbGV0IG1vdmVUcmllcyA9IDA7XG4gICAgaWYgKGxhc3RNb3ZlSGl0KSB7XG4gICAgICBtb3ZlID0gc21hcnRNb3ZlKG1vdmVzTWFkZVttb3Zlc01hZGUubGVuZ3RoIC0gMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3ZlID0gcmFuZG9tTW92ZSgpO1xuICAgIH1cblxuICAgIHdoaWxlIChcbiAgICAgIG1vdmVzTWFkZS5zb21lKFxuICAgICAgICAob2xkTW92ZSkgPT4gb2xkTW92ZVswXSA9PT0gbW92ZVswXSAmJiBvbGRNb3ZlWzFdID09PSBtb3ZlWzFdXG4gICAgICApXG4gICAgKSB7XG4gICAgICBpZiAobGFzdE1vdmVIaXQgJiYgbW92ZVRyaWVzIDwgNikge1xuICAgICAgICBtb3ZlID0gc21hcnRNb3ZlKG1vdmVzTWFkZVttb3Zlc01hZGUubGVuZ3RoIC0gMV0pO1xuICAgICAgICBtb3ZlVHJpZXMrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vdmUgPSByYW5kb21Nb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIG1vdmVzTWFkZS5wdXNoKG1vdmUpO1xuICAgIGNvbnN0IGlzSGl0ID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKG1vdmUpO1xuICAgIGlmIChpc0hpdCkge1xuICAgICAgbGFzdE1vdmVIaXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0TW92ZUhpdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtb3ZlO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG4gICAgcGxheWVyVHVybiA9ICFwbGF5ZXJUdXJuO1xuICB9O1xuXG4gIGNvbnN0IGN1cnJlbnRUdXJuID0gKCkgPT4gcGxheWVyVHVybjtcblxuICByZXR1cm4ge1xuICAgIG1ha2VNb3ZlLFxuICAgIG1ha2VSYW5kb21Nb3ZlLFxuICAgIGN1cnJlbnRUdXJuLFxuICAgIGNoYW5nZVR1cm4sXG4gIH07XG59O1xuXG5leHBvcnQgeyBwbGF5ZXIgfTtcbiIsImNvbnN0IGNyZWF0ZVNoaXAgPSAobGVuZ3RoLCBhcnJheUNvb3JkcykgPT4ge1xuICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICBsZXQgc2hpcENvb3JkcyA9IGFycmF5Q29vcmRzLm1hcCgoc3BvdCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBjb29yZHM6IFtzcG90WzBdLCBzcG90WzFdXSxcbiAgICAgIGlzSGl0OiBmYWxzZSxcbiAgICB9O1xuICB9KTtcblxuICBjb25zdCBoaXQgPSAoY29vcmRzKSA9PiB7XG4gICAgc2hpcENvb3JkcyA9IHNoaXBDb29yZHMubWFwKChzcG90KSA9PlxuICAgICAgc3BvdC5jb29yZHNbMF0gPT09IGNvb3Jkc1swXSAmJiBzcG90LmNvb3Jkc1sxXSA9PT0gY29vcmRzWzFdXG4gICAgICAgID8geyAuLi5zcG90LCBpc0hpdDogdHJ1ZSB9XG4gICAgICAgIDogc3BvdFxuICAgICk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gc2hpcENvb3Jkcy5ldmVyeSgoY29vcmQpID0+IGNvb3JkLmlzSGl0KTtcblxuICBjb25zdCBoaXRDb29yZHMgPSAoKSA9PiBzaGlwQ29vcmRzLmZpbHRlcigoY29vcmRzKSA9PiBjb29yZHMuaXNIaXQpO1xuXG4gIGNvbnN0IGdldFNoaXBMZW5ndGggPSAoKSA9PiBzaGlwTGVuZ3RoO1xuXG4gIGNvbnN0IGFsbENvb3JkcyA9ICgpID0+XG4gICAgc2hpcENvb3Jkcy5tYXAoKHBvaW50KSA9PiBbcG9pbnQuY29vcmRzWzBdLCBwb2ludC5jb29yZHNbMV1dKTtcblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgaGl0Q29vcmRzLFxuICAgIGdldFNoaXBMZW5ndGgsXG4gICAgYWxsQ29vcmRzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgY3JlYXRlU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy9yZXNldC5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0eWxlLmNzc1wiO1xuXG5pbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gXCIuL3NjcmlwdHMvZ2FtZUxvb3BcIjtcblxuZ2FtZUxvb3AoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==