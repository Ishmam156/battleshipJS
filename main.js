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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBb0M7O0FBRXBDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIseUJBQXlCO0FBQ3REO0FBQ0EsK0JBQStCLHlCQUF5QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0Esb0JBQW9CLGlEQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2Qix5QkFBeUI7QUFDdEQsK0JBQStCLHlCQUF5QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDZCQUE2Qix5QkFBeUI7QUFDdEQsK0JBQStCLHlCQUF5QjtBQUN4RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4R21CO0FBQ2xCOztBQUVsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscURBQVM7QUFDOUIsd0JBQXdCLHFEQUFTO0FBQ2pDLHNCQUFzQiwrQ0FBTTtBQUM1Qix5QkFBeUIsK0NBQU07O0FBRS9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1GQUFtRix3QkFBd0I7O0FBRTNHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQixtQkFBbUIsa0JBQWtCLHNCQUFzQjtBQUNyRjtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsNEJBQTRCLHFCQUFxQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUJBQW1CLGtCQUFrQixzQkFBc0I7QUFDckY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1Rix3QkFBd0I7QUFDL0c7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRW9COzs7Ozs7Ozs7Ozs7Ozs7O0FDclFxQjs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQixrREFBVTtBQUN6QywrQkFBK0Isa0RBQVU7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7O0FDOUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFc0I7Ozs7Ozs7VUNwQ3RCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ040QjtBQUNBOztBQUVrQjs7QUFFOUMsMkRBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9yZXNldC5jc3M/ZGQ1MSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3M/MjM5NCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IEJPQVJEX1NJWkUgPSAxMDtcblxuY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuXG4gIChmdW5jdGlvbiBpbml0aWxpYXplQm9hcmQoKSB7XG4gICAgZm9yIChsZXQgb3V0ZXJJbmRleCA9IDA7IG91dGVySW5kZXggPCBCT0FSRF9TSVpFOyBvdXRlckluZGV4KyspIHtcbiAgICAgIGNvbnN0IHRvQWRkID0gW107XG4gICAgICBmb3IgKGxldCBpbm5lckluZGV4ID0gMDsgaW5uZXJJbmRleCA8IEJPQVJEX1NJWkU7IGlubmVySW5kZXgrKykge1xuICAgICAgICB0b0FkZC5wdXNoKHtcbiAgICAgICAgICBoYXNTaGlwOiBmYWxzZSxcbiAgICAgICAgICBoYXNIaXQ6IGZhbHNlLFxuICAgICAgICAgIHNoaXA6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYm9hcmQucHVzaCh0b0FkZCk7XG4gICAgfVxuICB9KSgpO1xuXG4gIGNvbnN0IGFsbFNoaXBzID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGNvb3JkcykgPT4ge1xuICAgIGNvbnN0IG5ld1NoaXAgPSBjcmVhdGVTaGlwKGNvb3Jkcy5sZW5ndGgsIGNvb3Jkcyk7XG4gICAgbmV3U2hpcC5hbGxDb29yZHMoKS5mb3JFYWNoKChwb2ludCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGJvYXJkW3BvaW50WzBdXVtwb2ludFsxXV07XG4gICAgICBjb29yZGluYXRlLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgY29vcmRpbmF0ZS5zaGlwID0gbmV3U2hpcDtcbiAgICB9KTtcbiAgICBhbGxTaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgY29uc3QgaXNIaXQgPSBib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV07XG4gICAgaXNIaXQuaGFzSGl0ID0gdHJ1ZTtcbiAgICBpZiAoaXNIaXQuaGFzU2hpcCkge1xuICAgICAgaXNIaXQuc2hpcC5oaXQoY29vcmRzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IHtcbiAgICBjb25zdCBtaXNzZWRDb29yZGluYXRlcyA9IFtdO1xuICAgIGZvciAobGV0IG91dGVySW5kZXggPSAwOyBvdXRlckluZGV4IDwgQk9BUkRfU0laRTsgb3V0ZXJJbmRleCsrKSB7XG4gICAgICBmb3IgKGxldCBpbm5lckluZGV4ID0gMDsgaW5uZXJJbmRleCA8IEJPQVJEX1NJWkU7IGlubmVySW5kZXgrKykge1xuICAgICAgICBjb25zdCBjb29yZGluYXRlID0gYm9hcmRbb3V0ZXJJbmRleF1baW5uZXJJbmRleF07XG4gICAgICAgIGlmIChjb29yZGluYXRlLmhhc0hpdCAmJiAhY29vcmRpbmF0ZS5oYXNTaGlwKSB7XG4gICAgICAgICAgbWlzc2VkQ29vcmRpbmF0ZXMucHVzaChbb3V0ZXJJbmRleCwgaW5uZXJJbmRleF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtaXNzZWRDb29yZGluYXRlcztcbiAgfTtcblxuICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGFsbFNoaXBTdGF0dXMgPSBhbGxTaGlwcy5tYXAoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpO1xuXG4gICAgcmV0dXJuIGFsbFNoaXBTdGF0dXMuZXZlcnkoKHN0YXR1cykgPT4gc3RhdHVzKTtcbiAgfTtcblxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gIGNvbnN0IHJlbmRlckdhbWVCb2FyZCA9IChET01FbGVtZW50LCBzaG93U2hpcCkgPT4ge1xuICAgIGZvciAobGV0IG91dGVySW5kZXggPSAwOyBvdXRlckluZGV4IDwgQk9BUkRfU0laRTsgb3V0ZXJJbmRleCsrKSB7XG4gICAgICBmb3IgKGxldCBpbm5lckluZGV4ID0gMDsgaW5uZXJJbmRleCA8IEJPQVJEX1NJWkU7IGlubmVySW5kZXgrKykge1xuICAgICAgICBjb25zdCB0b0FkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvQWRkLmRhdGFzZXQucm93ID0gb3V0ZXJJbmRleDtcbiAgICAgICAgdG9BZGQuZGF0YXNldC5jb2x1bW4gPSBpbm5lckluZGV4O1xuXG4gICAgICAgIGNvbnN0IGNvb3JkU3RhdHVzID0gYm9hcmRbb3V0ZXJJbmRleF1baW5uZXJJbmRleF07XG5cbiAgICAgICAgaWYgKHNob3dTaGlwKSB7XG4gICAgICAgICAgaWYgKGNvb3JkU3RhdHVzLmhhc1NoaXApIHtcbiAgICAgICAgICAgIHRvQWRkLnN0eWxlLmJhY2tncm91bmQgPSBcIiM0NzYwNzJcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29vcmRTdGF0dXMuaGFzU2hpcCAmJiBjb29yZFN0YXR1cy5oYXNIaXQpIHtcbiAgICAgICAgICB0b0FkZC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJpbmRpYW5yZWRcIjtcbiAgICAgICAgICBpZiAoY29vcmRTdGF0dXMuc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgdG9BZGQudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY29vcmRTdGF0dXMuaGFzSGl0KSB7XG4gICAgICAgICAgdG9BZGQuc3R5bGUuYmFja2dyb3VuZCA9IFwiIzUwODlDNlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgRE9NRWxlbWVudC5hcHBlbmRDaGlsZCh0b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0TWlzc2VkQXR0YWNrcyxcbiAgICBhbGxTdW5rLFxuICAgIGdldEJvYXJkLFxuICAgIHJlbmRlckdhbWVCb2FyZCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IGdhbWVCb2FyZCwgQk9BUkRfU0laRSB9O1xuIiwiaW1wb3J0IHsgZ2FtZUJvYXJkLCBCT0FSRF9TSVpFIH0gZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5pbXBvcnQgeyBwbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XG4gIGNvbnN0IGh1bWFuRE9NQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWFuQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyRE9NQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyQm9hcmRcIik7XG4gIGNvbnN0IHRleHREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0Q29udGVudFwiKS5maXJzdEVsZW1lbnRDaGlsZDtcblxuICBjb25zdCBodW1hbkJvYXJkID0gZ2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXIoY29tcHV0ZXJCb2FyZCk7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gcGxheWVyKGh1bWFuQm9hcmQpO1xuXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xuICBsZXQgc2hpcEluZGV4ID0gMDtcbiAgbGV0IHNoaXBEaW1lbnNpb24gPSBcInJvd1wiO1xuICBsZXQgc2hpcFBsYWNlbWVudFBvc3NpYmxlID0gZmFsc2U7XG5cbiAgdGV4dERpc3BsYXkudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciBzaGlwcyBvbiB0aGUgYm9hcmQhIEN1cnJlbnQgc2hpcCBsZW5ndGg6ICR7c2hpcExlbmd0aHNbc2hpcEluZGV4XX0gcGxhY2VzYDtcblxuICBjb25zdCBjaGVja1dpbm5lciA9ICgpID0+IHtcbiAgICBpZiAoaHVtYW5Cb2FyZC5hbGxTdW5rKCkgfHwgY29tcHV0ZXJCb2FyZC5hbGxTdW5rKCkpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBhZGRSZXN0YXJ0QnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpbWVuc2lvbkJ1dHRvblwiKTtcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUGxheSBhZ2Fpbj9cIjtcbiAgICByZXN0YXJ0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfTtcblxuICAoZnVuY3Rpb24gYWRkRGltZW5zaW9uQnV0dG9uKCkge1xuICAgIGNvbnN0IGh1bWFuTWFpbkRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dENvbnRlbnRcIik7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgIGJ1dHRvbi5pZCA9IFwiZGltZW5zaW9uQnV0dG9uXCI7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gYENoYW5nZSBwbGFjZW1lbnQgdG8gJHtcbiAgICAgIHNoaXBEaW1lbnNpb24gPT09IFwicm93XCIgPyBcInJvd1wiIDogXCJjb2x1bW5cIlxuICAgIH1gO1xuXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaW1lbnNpb25CdXR0b25cIik7XG5cbiAgICAgIGlmIChjdXJyZW50VGV4dC50ZXh0Q29udGVudC5pbmNsdWRlcyhcInJvd1wiKSkge1xuICAgICAgICBzaGlwRGltZW5zaW9uID0gXCJjb2x1bW5cIjtcbiAgICAgICAgY3VycmVudFRleHQudGV4dENvbnRlbnQgPSBcIkNoYW5nZSBwbGFjZW1lbnQgdG8gY29sdW1uXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwRGltZW5zaW9uID0gXCJyb3dcIjtcbiAgICAgICAgY3VycmVudFRleHQudGV4dENvbnRlbnQgPSBcIkNoYW5nZSBwbGFjZW1lbnQgdG8gcm93XCI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBodW1hbk1haW5EaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfSkoKTtcblxuICBjb25zdCBib2FyZExpc3RlbmVyID0gKGV2ZW50LCBib2FyZCkgPT4ge1xuICAgIGlmIChodW1hblBsYXllci5jdXJyZW50VHVybigpKSB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gW1xuICAgICAgICBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KSxcbiAgICAgICAgTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbHVtbiksXG4gICAgICBdO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID09PSBcImJsdWVcIiB8fFxuICAgICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9PT0gXCJyZWRcIlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZSk7XG5cbiAgICAgIGNvbXB1dGVyRE9NQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIGNvbXB1dGVyQm9hcmQucmVuZGVyR2FtZUJvYXJkKGNvbXB1dGVyRE9NQm9hcmQsIGZhbHNlKTtcblxuICAgICAgaWYgKGNoZWNrV2lubmVyKCkpIHtcbiAgICAgICAgdGV4dERpc3BsYXkudGV4dENvbnRlbnQgPVxuICAgICAgICAgIFwiQ29uZ3JhdHVsYXRpb25zISBZb3UndmUgd29uIGFuZCBzYW5rIGFsbCB0aGUgc2hpcHMhXCI7XG4gICAgICAgIHRleHREaXNwbGF5LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcbiAgICAgICAgYWRkUmVzdGFydEJ1dHRvbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGh1bWFuUGxheWVyLmNoYW5nZVR1cm4oKTtcblxuICAgICAgdGV4dERpc3BsYXkudGV4dENvbnRlbnQgPSBcIldhaXQgZm9yIHRoZSBjb21wdXRlcidzIHR1cm4hXCI7XG5cbiAgICAgIGNvbXB1dGVyUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb21wdXRlclBsYXllci5tYWtlUmFuZG9tTW92ZSgpO1xuICAgICAgICBodW1hbkRPTUJvYXJkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGh1bWFuQm9hcmQucmVuZGVyR2FtZUJvYXJkKGh1bWFuRE9NQm9hcmQsIHRydWUpO1xuICAgICAgICBpZiAoY2hlY2tXaW5uZXIoKSkge1xuICAgICAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIFwiT2ggbm8hIFlvdSd2ZSBsb3N0IGFuZCBhbGwgeW91ciBzaGlwcyBoYXZlIHN1bmshXCI7XG4gICAgICAgICAgdGV4dERpc3BsYXkuc3R5bGUuZm9udFdlaWdodCA9IFwiYm9sZFwiO1xuICAgICAgICAgIGFkZFJlc3RhcnRCdXR0b24oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29tcHV0ZXJQbGF5ZXIuY2hhbmdlVHVybigpO1xuICAgICAgICBodW1hblBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID1cbiAgICAgICAgICBcIllvdXIgdHVybiBhZ2FpbiEgVHJ5IHRvIHNpbmsgeW91ciBvcHBvbmVudCdzIHNoaXBzIVwiO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbXB1dGVyRE9NQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT5cbiAgICBib2FyZExpc3RlbmVyKGV2ZW50LCBjb21wdXRlckJvYXJkKVxuICApO1xuXG4gIC8vIFNldCB1cCBmb3IgaW5pdGlhbCBnYW1lcGxheVxuICAoZnVuY3Rpb24gaW5pdGlhbGl6YXRpb25TaGlwcygpIHtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbMSwgMV0sXG4gICAgICBbMSwgMl0sXG4gICAgICBbMSwgM10sXG4gICAgICBbMSwgNF0sXG4gICAgICBbMSwgNV0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbMywgM10sXG4gICAgICBbMywgNF0sXG4gICAgICBbMywgNV0sXG4gICAgICBbMywgNl0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbNSwgNF0sXG4gICAgICBbNiwgNF0sXG4gICAgICBbNywgNF0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbNiwgN10sXG4gICAgICBbNywgN10sXG4gICAgICBbOCwgN10sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbOCwgMV0sXG4gICAgICBbOCwgMl0sXG4gICAgXSk7XG4gIH0pKCk7XG5cbiAgY29uc3QgbW91c2VPdmVySHVtYW5Cb2FyZCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG5cbiAgICBpZiAoc2hpcEluZGV4ID09PSBzaGlwTGVuZ3Rocy5sZW5ndGgpIHtcbiAgICAgIGh1bWFuRE9NQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBtb3VzZU92ZXJIdW1hbkJvYXJkKTtcbiAgICAgIGh1bWFuRE9NQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIG1vdXNlT3V0SHVtYW5Cb2FyZCk7XG4gICAgICBodW1hbkRPTUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb3VzZUNsaWNrSHVtYW5Cb2FyZCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpbWVuc2lvbkJ1dHRvblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBodW1hblBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9IFwiWW91ciB0dXJuISBUcnkgdG8gc2luayB5b3VyIG9wcG9uZW50J3Mgc2hpcHMhXCI7XG4gICAgfVxuXG4gICAgaWYgKCFlbGVtZW50LnN0eWxlLmJhY2tncm91bmQpIHtcbiAgICAgIGNvbnN0IHNoaXBUb1BhaW50ID0gc2hpcExlbmd0aHNbc2hpcEluZGV4XTtcblxuICAgICAgY29uc3QgZGl2c1RvUGFpbnQgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBUb1BhaW50OyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0ge1xuICAgICAgICAgIHJvdzogTnVtYmVyKGVsZW1lbnQuZGF0YXNldC5yb3cpLFxuICAgICAgICAgIGNvbHVtbjogTnVtYmVyKGVsZW1lbnQuZGF0YXNldC5jb2x1bW4pLFxuICAgICAgICB9O1xuICAgICAgICBuZXdDb29yZGluYXRlc1tzaGlwRGltZW5zaW9uXSA9IG5ld0Nvb3JkaW5hdGVzW3NoaXBEaW1lbnNpb25dICsgaW5kZXg7XG4gICAgICAgIGxldCB0b0NvbG9yRWxlbWVudDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRvQ29sb3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1yb3c9XCIke25ld0Nvb3JkaW5hdGVzLnJvd31cIl1bZGF0YS1jb2x1bW49XCIke25ld0Nvb3JkaW5hdGVzLmNvbHVtbn1cIl1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0b0NvbG9yRWxlbWVudCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvQ29sb3JFbGVtZW50ICYmICF0b0NvbG9yRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgZGl2c1RvUGFpbnQucHVzaCh0b0NvbG9yRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGl2c1RvUGFpbnQubGVuZ3RoID09PSBzaGlwVG9QYWludCAtIDEpIHtcbiAgICAgICAgICBkaXZzVG9QYWludC5mb3JFYWNoKFxuICAgICAgICAgICAgKHBhaW50RWxlbWVudCkgPT5cbiAgICAgICAgICAgICAgKHBhaW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2IoODQsIDE0MCwgMTY4KVwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2IoODQsIDE0MCwgMTY4KVwiO1xuICAgICAgICAgIHNoaXBQbGFjZW1lbnRQb3NzaWJsZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5pZCAhPT0gXCJodW1hbkJvYXJkXCIpIHtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcImluZGlhbnJlZFwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG1vdXNlT3V0SHVtYW5Cb2FyZCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKFxuICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID09PSBcInJnYig4NCwgMTQwLCAxNjgpXCIgfHxcbiAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9PT0gXCJpbmRpYW5yZWRcIlxuICAgICkge1xuICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcblxuICAgICAgY29uc3Qgc2hpcFRvUGFpbnQgPSBzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdO1xuXG4gICAgICBpZiAoc2hpcFBsYWNlbWVudFBvc3NpYmxlKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBzaGlwVG9QYWludDsgaW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgcm93OiBOdW1iZXIoZWxlbWVudC5kYXRhc2V0LnJvdyksXG4gICAgICAgICAgICBjb2x1bW46IE51bWJlcihlbGVtZW50LmRhdGFzZXQuY29sdW1uKSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzW3NoaXBEaW1lbnNpb25dID0gbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gKyBpbmRleDtcbiAgICAgICAgICBjb25zdCB0b0NvbG9yRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcm93PVwiJHtuZXdDb29yZGluYXRlcy5yb3d9XCJdW2RhdGEtY29sdW1uPVwiJHtuZXdDb29yZGluYXRlcy5jb2x1bW59XCJdYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdG9Db2xvckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbW91c2VDbGlja0h1bWFuQm9hcmQgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHBsYWNlbWVudENvb3JkaW5hdGVzID0gW107XG5cbiAgICBpZiAoc2hpcFBsYWNlbWVudFBvc3NpYmxlKSB7XG4gICAgICBjb25zdCBzaGlwVG9QYWludCA9IHNoaXBMZW5ndGhzW3NoaXBJbmRleF07XG4gICAgICBjb25zdCBzdHJpbmdDb29yZGluYXRlID0gZWxlbWVudC5kYXRhc2V0O1xuICAgICAgY29uc3QgY3VycmVudENvb3JkaW5hdGUgPSBbXG4gICAgICAgIE51bWJlcihzdHJpbmdDb29yZGluYXRlLnJvdyksXG4gICAgICAgIE51bWJlcihzdHJpbmdDb29yZGluYXRlLmNvbHVtbiksXG4gICAgICBdO1xuICAgICAgcGxhY2VtZW50Q29vcmRpbmF0ZXMucHVzaChjdXJyZW50Q29vcmRpbmF0ZSk7XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBzaGlwVG9QYWludDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBuZXh0Q29vcmRpbmF0ZSA9IFsuLi5jdXJyZW50Q29vcmRpbmF0ZV07XG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IHNoaXBEaW1lbnNpb24gPT09IFwicm93XCIgPyAwIDogMTtcbiAgICAgICAgbmV4dENvb3JkaW5hdGVbZGltZW5zaW9uXSA9IG5leHRDb29yZGluYXRlW2RpbWVuc2lvbl0gKyBpbmRleDtcbiAgICAgICAgcGxhY2VtZW50Q29vcmRpbmF0ZXMucHVzaChuZXh0Q29vcmRpbmF0ZSk7XG4gICAgICB9XG5cbiAgICAgIGh1bWFuQm9hcmQucGxhY2VTaGlwKHBsYWNlbWVudENvb3JkaW5hdGVzKTtcbiAgICAgIGh1bWFuRE9NQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIGh1bWFuQm9hcmQucmVuZGVyR2FtZUJvYXJkKGh1bWFuRE9NQm9hcmQsIHRydWUpO1xuICAgICAgc2hpcEluZGV4Kys7XG4gICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzIG9uIHRoZSBib2FyZCEgQ3VycmVudCBzaGlwIGxlbmd0aDogJHtzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdfSBwbGFjZXNgO1xuICAgICAgc2hpcFBsYWNlbWVudFBvc3NpYmxlID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGh1bWFuRE9NQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBtb3VzZU92ZXJIdW1hbkJvYXJkKTtcbiAgaHVtYW5ET01Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgbW91c2VPdXRIdW1hbkJvYXJkKTtcbiAgaHVtYW5ET01Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW91c2VDbGlja0h1bWFuQm9hcmQpO1xuXG4gIGh1bWFuQm9hcmQucmVuZGVyR2FtZUJvYXJkKGh1bWFuRE9NQm9hcmQsIHRydWUpO1xuICBjb21wdXRlckJvYXJkLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckRPTUJvYXJkLCBmYWxzZSk7XG59O1xuXG5leHBvcnQgeyBnYW1lTG9vcCB9O1xuIiwiaW1wb3J0IHsgQk9BUkRfU0laRSB9IGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuXG5jb25zdCBwbGF5ZXIgPSAoZ2FtZUJvYXJkKSA9PiB7XG4gIGNvbnN0IGVuZW15Qm9hcmQgPSBnYW1lQm9hcmQ7XG4gIGNvbnN0IG1vdmVzTWFkZSA9IFtdO1xuICBsZXQgbGFzdE1vdmVIaXQgPSBmYWxzZTtcbiAgbGV0IHBsYXllclR1cm4gPSBmYWxzZTtcblxuICBjb25zdCByYW5kb21Nb3ZlID0gKCkgPT4gW1xuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX1NJWkUpLFxuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX1NJWkUpLFxuICBdO1xuXG4gIGNvbnN0IHNtYXJ0TW92ZSA9IChjb29yZHMpID0+IHtcbiAgICBjb25zdCBuZXdDb29yZHMgPSBbLi4uY29vcmRzXTtcbiAgICBjb25zdCBvcHRpb25zID0gWzEsIC0xXTtcbiAgICBsZXQgc2luZ2xlQ29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICBuZXdDb29yZHNbc2luZ2xlQ29vcmRdID1cbiAgICAgIGNvb3Jkc1tzaW5nbGVDb29yZF0gKyBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcblxuICAgIHdoaWxlIChuZXdDb29yZHMuaW5jbHVkZXMoLTEpIHx8IG5ld0Nvb3Jkcy5pbmNsdWRlcygxMCkpIHtcbiAgICAgIG5ld0Nvb3Jkc1tzaW5nbGVDb29yZF0gPVxuICAgICAgICBjb29yZHNbc2luZ2xlQ29vcmRdICsgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgfVxuICAgIHJldHVybiBuZXdDb29yZHM7XG4gIH07XG5cbiAgY29uc3QgbWFrZU1vdmUgPSAoY29vcmRzKSA9PiB7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgbWFrZVJhbmRvbU1vdmUgPSAoKSA9PiB7XG4gICAgbGV0IG1vdmU7XG4gICAgbGV0IG1vdmVUcmllcyA9IDA7XG4gICAgaWYgKGxhc3RNb3ZlSGl0KSB7XG4gICAgICBtb3ZlID0gc21hcnRNb3ZlKG1vdmVzTWFkZVttb3Zlc01hZGUubGVuZ3RoIC0gMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3ZlID0gcmFuZG9tTW92ZSgpO1xuICAgIH1cblxuICAgIHdoaWxlIChcbiAgICAgIG1vdmVzTWFkZS5zb21lKFxuICAgICAgICAob2xkTW92ZSkgPT4gb2xkTW92ZVswXSA9PT0gbW92ZVswXSAmJiBvbGRNb3ZlWzFdID09PSBtb3ZlWzFdXG4gICAgICApXG4gICAgKSB7XG4gICAgICBpZiAobGFzdE1vdmVIaXQgJiYgbW92ZVRyaWVzIDwgNikge1xuICAgICAgICBtb3ZlID0gc21hcnRNb3ZlKG1vdmVzTWFkZVttb3Zlc01hZGUubGVuZ3RoIC0gMV0pO1xuICAgICAgICBtb3ZlVHJpZXMrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vdmUgPSByYW5kb21Nb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIG1vdmVzTWFkZS5wdXNoKG1vdmUpO1xuICAgIGNvbnN0IGlzSGl0ID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKG1vdmUpO1xuICAgIGlmIChpc0hpdCkge1xuICAgICAgbGFzdE1vdmVIaXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0TW92ZUhpdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtb3ZlO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG4gICAgcGxheWVyVHVybiA9ICFwbGF5ZXJUdXJuO1xuICB9O1xuXG4gIGNvbnN0IGN1cnJlbnRUdXJuID0gKCkgPT4gcGxheWVyVHVybjtcblxuICByZXR1cm4ge1xuICAgIG1ha2VNb3ZlLFxuICAgIG1ha2VSYW5kb21Nb3ZlLFxuICAgIGN1cnJlbnRUdXJuLFxuICAgIGNoYW5nZVR1cm4sXG4gIH07XG59O1xuXG5leHBvcnQgeyBwbGF5ZXIgfTtcbiIsImNvbnN0IGNyZWF0ZVNoaXAgPSAobGVuZ3RoLCBhcnJheUNvb3JkcykgPT4ge1xuICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICBsZXQgc2hpcENvb3JkcyA9IGFycmF5Q29vcmRzLm1hcCgoc3BvdCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBjb29yZHM6IFtzcG90WzBdLCBzcG90WzFdXSxcbiAgICAgIGlzSGl0OiBmYWxzZSxcbiAgICB9O1xuICB9KTtcblxuICBjb25zdCBoaXQgPSAoY29vcmRzKSA9PiB7XG4gICAgc2hpcENvb3JkcyA9IHNoaXBDb29yZHMubWFwKChzcG90KSA9PlxuICAgICAgc3BvdC5jb29yZHNbMF0gPT09IGNvb3Jkc1swXSAmJiBzcG90LmNvb3Jkc1sxXSA9PT0gY29vcmRzWzFdXG4gICAgICAgID8geyAuLi5zcG90LCBpc0hpdDogdHJ1ZSB9XG4gICAgICAgIDogc3BvdFxuICAgICk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gc2hpcENvb3Jkcy5ldmVyeSgoY29vcmQpID0+IGNvb3JkLmlzSGl0KTtcblxuICBjb25zdCBoaXRDb29yZHMgPSAoKSA9PiBzaGlwQ29vcmRzLmZpbHRlcigoY29vcmRzKSA9PiBjb29yZHMuaXNIaXQpO1xuXG4gIGNvbnN0IGdldFNoaXBMZW5ndGggPSAoKSA9PiBzaGlwTGVuZ3RoO1xuXG4gIGNvbnN0IGFsbENvb3JkcyA9ICgpID0+XG4gICAgc2hpcENvb3Jkcy5tYXAoKHBvaW50KSA9PiBbcG9pbnQuY29vcmRzWzBdLCBwb2ludC5jb29yZHNbMV1dKTtcblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgaGl0Q29vcmRzLFxuICAgIGdldFNoaXBMZW5ndGgsXG4gICAgYWxsQ29vcmRzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgY3JlYXRlU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy9yZXNldC5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0eWxlLmNzc1wiO1xuXG5pbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gXCIuL3NjcmlwdHMvZ2FtZUxvb3BcIjtcblxuZ2FtZUxvb3AoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==