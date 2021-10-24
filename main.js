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

/***/ "./src/scripts/DOMInteraction.js":
/*!***************************************!*\
  !*** ./src/scripts/DOMInteraction.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOMInteraction": () => (/* binding */ DOMInteraction)
/* harmony export */ });
const DOMInteraction = (humanBoard, humanDOMBoard, humanPlayer) => {
  const shipLengths = [5, 4, 3, 3, 2];
  let shipIndex = 0;
  let shipDimension = "row";
  let shipPlacementPossible = false;

  const computerDOMBoard = document.getElementById("computerBoard");
  const textDisplay = document.getElementById("textContent").firstElementChild;
  textDisplay.textContent = `Place your ships on the board! Current ship length: ${shipLengths[shipIndex]} places`;

  computerDOMBoard.parentElement.style.display = "none";

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

  const mouseOverHumanBoard = (event) => {
    const element = event.target;

    if (shipIndex === shipLengths.length) {
      humanDOMBoard.removeEventListener("mouseover", mouseOverHumanBoard);
      humanDOMBoard.removeEventListener("mouseout", mouseOutHumanBoard);
      humanDOMBoard.removeEventListener("click", mouseClickHumanBoard);
      document.getElementById("dimensionButton").style.display = "none";
      document.getElementById("computerBoard").classList.add("hover");
      computerDOMBoard.parentElement.style.display = "block";
      textDisplay.textContent = "Your turn! Try to sink your opponent's ships!";
      humanPlayer.changeTurn();
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
          element.style.background = "rgb(205, 92, 92)";
        }
      }
    }
  };

  const mouseOutHumanBoard = (event) => {
    const element = event.target;
    let elementBackgroundStyle = element.style.background.split(")")[0];
    elementBackgroundStyle += ")";

    if (
      elementBackgroundStyle === "rgb(84, 140, 168)" ||
      elementBackgroundStyle === "rgb(205, 92, 92)"
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

  const addMouseOverListener = (boardDOM) => {
    boardDOM.addEventListener("mouseover", mouseOverHumanBoard);
  };

  const addMouseOutListener = (boardDOM) => {
    boardDOM.addEventListener("mouseout", mouseOutHumanBoard);
  };

  const addMouseClickListener = (boardDOM) => {
    boardDOM.addEventListener("click", mouseClickHumanBoard);
  };

  return {
    addRestartButton,
    addMouseOverListener,
    addMouseOutListener,
    addMouseClickListener,
  };
};




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
          toAdd.style.background = "rgb(205, 92, 92)";
          if (coordStatus.ship.isSunk()) {
            toAdd.textContent = "X";
          }
        } else if (coordStatus.hasHit) {
          toAdd.style.background = "rgb(80, 137, 198)";
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
/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOMInteraction */ "./src/scripts/DOMInteraction.js");




const gameLoop = () => {
  const humanDOMBoard = document.getElementById("humanBoard");
  const computerDOMBoard = document.getElementById("computerBoard");
  const textDisplay = document.getElementById("textContent").firstElementChild;

  const humanBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  const computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.player)(computerBoard);
  const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.player)(humanBoard);

  const DOMActivity = (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.DOMInteraction)(humanBoard, humanDOMBoard, humanPlayer);

  const checkWinner = () => {
    if (humanBoard.allSunk() || computerBoard.allSunk()) return true;
    return false;
  };

  const boardListener = (event, board) => {
    if (humanPlayer.currentTurn()) {
      if (Object.keys(event.target.dataset).length === 0) return;

      const coordinate = [
        Number(event.target.dataset.row),
        Number(event.target.dataset.column),
      ];

      if (
        event.target.style.background === "rgb(80, 137, 198)" ||
        event.target.style.background === "rgb(205, 92, 92)"
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
        DOMActivity.addRestartButton();
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
          DOMActivity.addRestartButton();
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

  (function initalizeComputerShips() {
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

  DOMActivity.addMouseOverListener(humanDOMBoard);
  DOMActivity.addMouseOutListener(humanDOMBoard);
  DOMActivity.addMouseClickListener(humanDOMBoard);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXNCOzs7Ozs7O1VDcEN0QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNONEI7QUFDQTs7QUFFa0I7O0FBRTlDLDJEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvcmVzZXQuY3NzP2RkNTEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzPzIzOTQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL0RPTUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgRE9NSW50ZXJhY3Rpb24gPSAoaHVtYW5Cb2FyZCwgaHVtYW5ET01Cb2FyZCwgaHVtYW5QbGF5ZXIpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gIGxldCBzaGlwSW5kZXggPSAwO1xuICBsZXQgc2hpcERpbWVuc2lvbiA9IFwicm93XCI7XG4gIGxldCBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcblxuICBjb25zdCBjb21wdXRlckRPTUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlckJvYXJkXCIpO1xuICBjb25zdCB0ZXh0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dENvbnRlbnRcIikuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgc2hpcHMgb24gdGhlIGJvYXJkISBDdXJyZW50IHNoaXAgbGVuZ3RoOiAke3NoaXBMZW5ndGhzW3NoaXBJbmRleF19IHBsYWNlc2A7XG5cbiAgY29tcHV0ZXJET01Cb2FyZC5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBjb25zdCBhZGRSZXN0YXJ0QnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpbWVuc2lvbkJ1dHRvblwiKTtcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUGxheSBhZ2Fpbj9cIjtcbiAgICByZXN0YXJ0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfTtcblxuICAoZnVuY3Rpb24gYWRkRGltZW5zaW9uQnV0dG9uKCkge1xuICAgIGNvbnN0IGh1bWFuTWFpbkRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dENvbnRlbnRcIik7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgIGJ1dHRvbi5pZCA9IFwiZGltZW5zaW9uQnV0dG9uXCI7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gYENoYW5nZSBwbGFjZW1lbnQgdG8gJHtcbiAgICAgIHNoaXBEaW1lbnNpb24gPT09IFwicm93XCIgPyBcInJvd1wiIDogXCJjb2x1bW5cIlxuICAgIH1gO1xuXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaW1lbnNpb25CdXR0b25cIik7XG5cbiAgICAgIGlmIChjdXJyZW50VGV4dC50ZXh0Q29udGVudC5pbmNsdWRlcyhcInJvd1wiKSkge1xuICAgICAgICBzaGlwRGltZW5zaW9uID0gXCJjb2x1bW5cIjtcbiAgICAgICAgY3VycmVudFRleHQudGV4dENvbnRlbnQgPSBcIkNoYW5nZSBwbGFjZW1lbnQgdG8gY29sdW1uXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwRGltZW5zaW9uID0gXCJyb3dcIjtcbiAgICAgICAgY3VycmVudFRleHQudGV4dENvbnRlbnQgPSBcIkNoYW5nZSBwbGFjZW1lbnQgdG8gcm93XCI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBodW1hbk1haW5EaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfSkoKTtcblxuICBjb25zdCBtb3VzZU92ZXJIdW1hbkJvYXJkID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcblxuICAgIGlmIChzaGlwSW5kZXggPT09IHNoaXBMZW5ndGhzLmxlbmd0aCkge1xuICAgICAgaHVtYW5ET01Cb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG1vdXNlT3Zlckh1bWFuQm9hcmQpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgbW91c2VPdXRIdW1hbkJvYXJkKTtcbiAgICAgIGh1bWFuRE9NQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vdXNlQ2xpY2tIdW1hbkJvYXJkKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGltZW5zaW9uQnV0dG9uXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXJCb2FyZFwiKS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICBjb21wdXRlckRPTUJvYXJkLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gXCJZb3VyIHR1cm4hIFRyeSB0byBzaW5rIHlvdXIgb3Bwb25lbnQncyBzaGlwcyFcIjtcbiAgICAgIGh1bWFuUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCkge1xuICAgICAgY29uc3Qgc2hpcFRvUGFpbnQgPSBzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdO1xuXG4gICAgICBjb25zdCBkaXZzVG9QYWludCA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgc2hpcFRvUGFpbnQ7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgcm93OiBOdW1iZXIoZWxlbWVudC5kYXRhc2V0LnJvdyksXG4gICAgICAgICAgY29sdW1uOiBOdW1iZXIoZWxlbWVudC5kYXRhc2V0LmNvbHVtbiksXG4gICAgICAgIH07XG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzW3NoaXBEaW1lbnNpb25dID0gbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gKyBpbmRleDtcbiAgICAgICAgbGV0IHRvQ29sb3JFbGVtZW50O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdG9Db2xvckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXJvdz1cIiR7bmV3Q29vcmRpbmF0ZXMucm93fVwiXVtkYXRhLWNvbHVtbj1cIiR7bmV3Q29vcmRpbmF0ZXMuY29sdW1ufVwiXWBcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHRvQ29sb3JFbGVtZW50ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9Db2xvckVsZW1lbnQgJiYgIXRvQ29sb3JFbGVtZW50LnN0eWxlLmJhY2tncm91bmQpIHtcbiAgICAgICAgICBkaXZzVG9QYWludC5wdXNoKHRvQ29sb3JFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXZzVG9QYWludC5sZW5ndGggPT09IHNoaXBUb1BhaW50IC0gMSkge1xuICAgICAgICAgIGRpdnNUb1BhaW50LmZvckVhY2goXG4gICAgICAgICAgICAocGFpbnRFbGVtZW50KSA9PlxuICAgICAgICAgICAgICAocGFpbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcInJnYig4NCwgMTQwLCAxNjgpXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcInJnYig4NCwgMTQwLCAxNjgpXCI7XG4gICAgICAgICAgc2hpcFBsYWNlbWVudFBvc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50LmlkICE9PSBcImh1bWFuQm9hcmRcIikge1xuICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwicmdiKDIwNSwgOTIsIDkyKVwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG1vdXNlT3V0SHVtYW5Cb2FyZCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgbGV0IGVsZW1lbnRCYWNrZ3JvdW5kU3R5bGUgPSBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQuc3BsaXQoXCIpXCIpWzBdO1xuICAgIGVsZW1lbnRCYWNrZ3JvdW5kU3R5bGUgKz0gXCIpXCI7XG5cbiAgICBpZiAoXG4gICAgICBlbGVtZW50QmFja2dyb3VuZFN0eWxlID09PSBcInJnYig4NCwgMTQwLCAxNjgpXCIgfHxcbiAgICAgIGVsZW1lbnRCYWNrZ3JvdW5kU3R5bGUgPT09IFwicmdiKDIwNSwgOTIsIDkyKVwiXG4gICAgKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcIlwiO1xuXG4gICAgICBjb25zdCBzaGlwVG9QYWludCA9IHNoaXBMZW5ndGhzW3NoaXBJbmRleF07XG5cbiAgICAgIGlmIChzaGlwUGxhY2VtZW50UG9zc2libGUpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBUb1BhaW50OyBpbmRleCsrKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgICByb3c6IE51bWJlcihlbGVtZW50LmRhdGFzZXQucm93KSxcbiAgICAgICAgICAgIGNvbHVtbjogTnVtYmVyKGVsZW1lbnQuZGF0YXNldC5jb2x1bW4pLFxuICAgICAgICAgIH07XG4gICAgICAgICAgbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gPSBuZXdDb29yZGluYXRlc1tzaGlwRGltZW5zaW9uXSArIGluZGV4O1xuICAgICAgICAgIGNvbnN0IHRvQ29sb3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1yb3c9XCIke25ld0Nvb3JkaW5hdGVzLnJvd31cIl1bZGF0YS1jb2x1bW49XCIke25ld0Nvb3JkaW5hdGVzLmNvbHVtbn1cIl1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0b0NvbG9yRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaXBQbGFjZW1lbnRQb3NzaWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBtb3VzZUNsaWNrSHVtYW5Cb2FyZCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgcGxhY2VtZW50Q29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGlmIChzaGlwUGxhY2VtZW50UG9zc2libGUpIHtcbiAgICAgIGNvbnN0IHNoaXBUb1BhaW50ID0gc2hpcExlbmd0aHNbc2hpcEluZGV4XTtcbiAgICAgIGNvbnN0IHN0cmluZ0Nvb3JkaW5hdGUgPSBlbGVtZW50LmRhdGFzZXQ7XG4gICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZSA9IFtcbiAgICAgICAgTnVtYmVyKHN0cmluZ0Nvb3JkaW5hdGUucm93KSxcbiAgICAgICAgTnVtYmVyKHN0cmluZ0Nvb3JkaW5hdGUuY29sdW1uKSxcbiAgICAgIF07XG4gICAgICBwbGFjZW1lbnRDb29yZGluYXRlcy5wdXNoKGN1cnJlbnRDb29yZGluYXRlKTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBUb1BhaW50OyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5leHRDb29yZGluYXRlID0gWy4uLmN1cnJlbnRDb29yZGluYXRlXTtcbiAgICAgICAgY29uc3QgZGltZW5zaW9uID0gc2hpcERpbWVuc2lvbiA9PT0gXCJyb3dcIiA/IDAgOiAxO1xuICAgICAgICBuZXh0Q29vcmRpbmF0ZVtkaW1lbnNpb25dID0gbmV4dENvb3JkaW5hdGVbZGltZW5zaW9uXSArIGluZGV4O1xuICAgICAgICBwbGFjZW1lbnRDb29yZGluYXRlcy5wdXNoKG5leHRDb29yZGluYXRlKTtcbiAgICAgIH1cblxuICAgICAgaHVtYW5Cb2FyZC5wbGFjZVNoaXAocGxhY2VtZW50Q29vcmRpbmF0ZXMpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgaHVtYW5Cb2FyZC5yZW5kZXJHYW1lQm9hcmQoaHVtYW5ET01Cb2FyZCwgdHJ1ZSk7XG4gICAgICBzaGlwSW5kZXgrKztcbiAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgc2hpcHMgb24gdGhlIGJvYXJkISBDdXJyZW50IHNoaXAgbGVuZ3RoOiAke3NoaXBMZW5ndGhzW3NoaXBJbmRleF19IHBsYWNlc2A7XG4gICAgICBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWRkTW91c2VPdmVyTGlzdGVuZXIgPSAoYm9hcmRET00pID0+IHtcbiAgICBib2FyZERPTS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG1vdXNlT3Zlckh1bWFuQm9hcmQpO1xuICB9O1xuXG4gIGNvbnN0IGFkZE1vdXNlT3V0TGlzdGVuZXIgPSAoYm9hcmRET00pID0+IHtcbiAgICBib2FyZERPTS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgbW91c2VPdXRIdW1hbkJvYXJkKTtcbiAgfTtcblxuICBjb25zdCBhZGRNb3VzZUNsaWNrTGlzdGVuZXIgPSAoYm9hcmRET00pID0+IHtcbiAgICBib2FyZERPTS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW91c2VDbGlja0h1bWFuQm9hcmQpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYWRkUmVzdGFydEJ1dHRvbixcbiAgICBhZGRNb3VzZU92ZXJMaXN0ZW5lcixcbiAgICBhZGRNb3VzZU91dExpc3RlbmVyLFxuICAgIGFkZE1vdXNlQ2xpY2tMaXN0ZW5lcixcbiAgfTtcbn07XG5cbmV4cG9ydCB7IERPTUludGVyYWN0aW9uIH07XG4iLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBCT0FSRF9TSVpFID0gMTA7XG5cbmNvbnN0IGdhbWVCb2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcblxuICAoZnVuY3Rpb24gaW5pdGlsaWF6ZUJvYXJkKCkge1xuICAgIGZvciAobGV0IG91dGVySW5kZXggPSAwOyBvdXRlckluZGV4IDwgQk9BUkRfU0laRTsgb3V0ZXJJbmRleCsrKSB7XG4gICAgICBjb25zdCB0b0FkZCA9IFtdO1xuICAgICAgZm9yIChsZXQgaW5uZXJJbmRleCA9IDA7IGlubmVySW5kZXggPCBCT0FSRF9TSVpFOyBpbm5lckluZGV4KyspIHtcbiAgICAgICAgdG9BZGQucHVzaCh7XG4gICAgICAgICAgaGFzU2hpcDogZmFsc2UsXG4gICAgICAgICAgaGFzSGl0OiBmYWxzZSxcbiAgICAgICAgICBzaGlwOiBudWxsLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLnB1c2godG9BZGQpO1xuICAgIH1cbiAgfSkoKTtcblxuICBjb25zdCBhbGxTaGlwcyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChjb29yZHMpID0+IHtcbiAgICBjb25zdCBuZXdTaGlwID0gY3JlYXRlU2hpcChjb29yZHMubGVuZ3RoLCBjb29yZHMpO1xuICAgIG5ld1NoaXAuYWxsQ29vcmRzKCkuZm9yRWFjaCgocG9pbnQpID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBib2FyZFtwb2ludFswXV1bcG9pbnRbMV1dO1xuICAgICAgY29vcmRpbmF0ZS5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgIGNvb3JkaW5hdGUuc2hpcCA9IG5ld1NoaXA7XG4gICAgfSk7XG4gICAgYWxsU2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgIGNvbnN0IGlzSGl0ID0gYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dO1xuICAgIGlzSGl0Lmhhc0hpdCA9IHRydWU7XG4gICAgaWYgKGlzSGl0Lmhhc1NoaXApIHtcbiAgICAgIGlzSGl0LnNoaXAuaGl0KGNvb3Jkcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGdldE1pc3NlZEF0dGFja3MgPSAoKSA9PiB7XG4gICAgY29uc3QgbWlzc2VkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICBmb3IgKGxldCBvdXRlckluZGV4ID0gMDsgb3V0ZXJJbmRleCA8IEJPQVJEX1NJWkU7IG91dGVySW5kZXgrKykge1xuICAgICAgZm9yIChsZXQgaW5uZXJJbmRleCA9IDA7IGlubmVySW5kZXggPCBCT0FSRF9TSVpFOyBpbm5lckluZGV4KyspIHtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGJvYXJkW291dGVySW5kZXhdW2lubmVySW5kZXhdO1xuICAgICAgICBpZiAoY29vcmRpbmF0ZS5oYXNIaXQgJiYgIWNvb3JkaW5hdGUuaGFzU2hpcCkge1xuICAgICAgICAgIG1pc3NlZENvb3JkaW5hdGVzLnB1c2goW291dGVySW5kZXgsIGlubmVySW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWlzc2VkQ29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgY29uc3QgYWxsU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBhbGxTaGlwU3RhdHVzID0gYWxsU2hpcHMubWFwKChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKTtcblxuICAgIHJldHVybiBhbGxTaGlwU3RhdHVzLmV2ZXJ5KChzdGF0dXMpID0+IHN0YXR1cyk7XG4gIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICBjb25zdCByZW5kZXJHYW1lQm9hcmQgPSAoRE9NRWxlbWVudCwgc2hvd1NoaXApID0+IHtcbiAgICBmb3IgKGxldCBvdXRlckluZGV4ID0gMDsgb3V0ZXJJbmRleCA8IEJPQVJEX1NJWkU7IG91dGVySW5kZXgrKykge1xuICAgICAgZm9yIChsZXQgaW5uZXJJbmRleCA9IDA7IGlubmVySW5kZXggPCBCT0FSRF9TSVpFOyBpbm5lckluZGV4KyspIHtcbiAgICAgICAgY29uc3QgdG9BZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0b0FkZC5kYXRhc2V0LnJvdyA9IG91dGVySW5kZXg7XG4gICAgICAgIHRvQWRkLmRhdGFzZXQuY29sdW1uID0gaW5uZXJJbmRleDtcblxuICAgICAgICBjb25zdCBjb29yZFN0YXR1cyA9IGJvYXJkW291dGVySW5kZXhdW2lubmVySW5kZXhdO1xuXG4gICAgICAgIGlmIChzaG93U2hpcCkge1xuICAgICAgICAgIGlmIChjb29yZFN0YXR1cy5oYXNTaGlwKSB7XG4gICAgICAgICAgICB0b0FkZC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjNDc2MDcyXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvb3JkU3RhdHVzLmhhc1NoaXAgJiYgY29vcmRTdGF0dXMuaGFzSGl0KSB7XG4gICAgICAgICAgdG9BZGQuc3R5bGUuYmFja2dyb3VuZCA9IFwicmdiKDIwNSwgOTIsIDkyKVwiO1xuICAgICAgICAgIGlmIChjb29yZFN0YXR1cy5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICB0b0FkZC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjb29yZFN0YXR1cy5oYXNIaXQpIHtcbiAgICAgICAgICB0b0FkZC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2IoODAsIDEzNywgMTk4KVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgRE9NRWxlbWVudC5hcHBlbmRDaGlsZCh0b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0TWlzc2VkQXR0YWNrcyxcbiAgICBhbGxTdW5rLFxuICAgIGdldEJvYXJkLFxuICAgIHJlbmRlckdhbWVCb2FyZCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IGdhbWVCb2FyZCwgQk9BUkRfU0laRSB9O1xuIiwiaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5pbXBvcnQgeyBwbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IERPTUludGVyYWN0aW9uIH0gZnJvbSBcIi4vRE9NSW50ZXJhY3Rpb25cIjtcblxuY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XG4gIGNvbnN0IGh1bWFuRE9NQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWFuQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyRE9NQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyQm9hcmRcIik7XG4gIGNvbnN0IHRleHREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0Q29udGVudFwiKS5maXJzdEVsZW1lbnRDaGlsZDtcblxuICBjb25zdCBodW1hbkJvYXJkID0gZ2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXIoY29tcHV0ZXJCb2FyZCk7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gcGxheWVyKGh1bWFuQm9hcmQpO1xuXG4gIGNvbnN0IERPTUFjdGl2aXR5ID0gRE9NSW50ZXJhY3Rpb24oaHVtYW5Cb2FyZCwgaHVtYW5ET01Cb2FyZCwgaHVtYW5QbGF5ZXIpO1xuXG4gIGNvbnN0IGNoZWNrV2lubmVyID0gKCkgPT4ge1xuICAgIGlmIChodW1hbkJvYXJkLmFsbFN1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFN1bmsoKSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGJvYXJkTGlzdGVuZXIgPSAoZXZlbnQsIGJvYXJkKSA9PiB7XG4gICAgaWYgKGh1bWFuUGxheWVyLmN1cnJlbnRUdXJuKCkpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhldmVudC50YXJnZXQuZGF0YXNldCkubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBbXG4gICAgICAgIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC5yb3cpLFxuICAgICAgICBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uKSxcbiAgICAgIF07XG5cbiAgICAgIGlmIChcbiAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPT09IFwicmdiKDgwLCAxMzcsIDE5OClcIiB8fFxuICAgICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9PT0gXCJyZ2IoMjA1LCA5MiwgOTIpXCJcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGUpO1xuXG4gICAgICBjb21wdXRlckRPTUJvYXJkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICBjb21wdXRlckJvYXJkLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckRPTUJvYXJkLCBmYWxzZSk7XG5cbiAgICAgIGlmIChjaGVja1dpbm5lcigpKSB7XG4gICAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID1cbiAgICAgICAgICBcIkNvbmdyYXR1bGF0aW9ucyEgWW91J3ZlIHdvbiBhbmQgc2FuayBhbGwgdGhlIHNoaXBzIVwiO1xuICAgICAgICB0ZXh0RGlzcGxheS5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XG4gICAgICAgIERPTUFjdGl2aXR5LmFkZFJlc3RhcnRCdXR0b24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBodW1hblBsYXllci5jaGFuZ2VUdXJuKCk7XG5cbiAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gXCJXYWl0IGZvciB0aGUgY29tcHV0ZXIncyB0dXJuIVwiO1xuXG4gICAgICBjb21wdXRlclBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29tcHV0ZXJQbGF5ZXIubWFrZVJhbmRvbU1vdmUoKTtcbiAgICAgICAgaHVtYW5ET01Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBodW1hbkJvYXJkLnJlbmRlckdhbWVCb2FyZChodW1hbkRPTUJvYXJkLCB0cnVlKTtcbiAgICAgICAgaWYgKGNoZWNrV2lubmVyKCkpIHtcbiAgICAgICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICBcIk9oIG5vISBZb3UndmUgbG9zdCBhbmQgYWxsIHlvdXIgc2hpcHMgaGF2ZSBzdW5rIVwiO1xuICAgICAgICAgIHRleHREaXNwbGF5LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcbiAgICAgICAgICBET01BY3Rpdml0eS5hZGRSZXN0YXJ0QnV0dG9uKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbXB1dGVyUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgaHVtYW5QbGF5ZXIuY2hhbmdlVHVybigpO1xuICAgICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgXCJZb3VyIHR1cm4gYWdhaW4hIFRyeSB0byBzaW5rIHlvdXIgb3Bwb25lbnQncyBzaGlwcyFcIjtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfTtcblxuICBjb21wdXRlckRPTUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+XG4gICAgYm9hcmRMaXN0ZW5lcihldmVudCwgY29tcHV0ZXJCb2FyZClcbiAgKTtcblxuICAoZnVuY3Rpb24gaW5pdGFsaXplQ29tcHV0ZXJTaGlwcygpIHtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbMSwgMV0sXG4gICAgICBbMSwgMl0sXG4gICAgICBbMSwgM10sXG4gICAgICBbMSwgNF0sXG4gICAgICBbMSwgNV0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbMywgM10sXG4gICAgICBbMywgNF0sXG4gICAgICBbMywgNV0sXG4gICAgICBbMywgNl0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbNSwgNF0sXG4gICAgICBbNiwgNF0sXG4gICAgICBbNywgNF0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbNiwgN10sXG4gICAgICBbNywgN10sXG4gICAgICBbOCwgN10sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbOCwgMV0sXG4gICAgICBbOCwgMl0sXG4gICAgXSk7XG4gIH0pKCk7XG5cbiAgRE9NQWN0aXZpdHkuYWRkTW91c2VPdmVyTGlzdGVuZXIoaHVtYW5ET01Cb2FyZCk7XG4gIERPTUFjdGl2aXR5LmFkZE1vdXNlT3V0TGlzdGVuZXIoaHVtYW5ET01Cb2FyZCk7XG4gIERPTUFjdGl2aXR5LmFkZE1vdXNlQ2xpY2tMaXN0ZW5lcihodW1hbkRPTUJvYXJkKTtcblxuICBodW1hbkJvYXJkLnJlbmRlckdhbWVCb2FyZChodW1hbkRPTUJvYXJkLCB0cnVlKTtcbiAgY29tcHV0ZXJCb2FyZC5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJET01Cb2FyZCwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImltcG9ydCB7IEJPQVJEX1NJWkUgfSBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcblxuY29uc3QgcGxheWVyID0gKGdhbWVCb2FyZCkgPT4ge1xuICBjb25zdCBlbmVteUJvYXJkID0gZ2FtZUJvYXJkO1xuICBjb25zdCBtb3Zlc01hZGUgPSBbXTtcbiAgbGV0IGxhc3RNb3ZlSGl0ID0gZmFsc2U7XG4gIGxldCBwbGF5ZXJUdXJuID0gZmFsc2U7XG5cbiAgY29uc3QgcmFuZG9tTW92ZSA9ICgpID0+IFtcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9TSVpFKSxcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9TSVpFKSxcbiAgXTtcblxuICBjb25zdCBzbWFydE1vdmUgPSAoY29vcmRzKSA9PiB7XG4gICAgY29uc3QgbmV3Q29vcmRzID0gWy4uLmNvb3Jkc107XG4gICAgY29uc3Qgb3B0aW9ucyA9IFsxLCAtMV07XG4gICAgbGV0IHNpbmdsZUNvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgbmV3Q29vcmRzW3NpbmdsZUNvb3JkXSA9XG4gICAgICBjb29yZHNbc2luZ2xlQ29vcmRdICsgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG5cbiAgICB3aGlsZSAobmV3Q29vcmRzLmluY2x1ZGVzKC0xKSB8fCBuZXdDb29yZHMuaW5jbHVkZXMoMTApKSB7XG4gICAgICBuZXdDb29yZHNbc2luZ2xlQ29vcmRdID1cbiAgICAgICAgY29vcmRzW3NpbmdsZUNvb3JkXSArIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xuICAgIH1cbiAgICByZXR1cm4gbmV3Q29vcmRzO1xuICB9O1xuXG4gIGNvbnN0IG1ha2VNb3ZlID0gKGNvb3JkcykgPT4ge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IG1ha2VSYW5kb21Nb3ZlID0gKCkgPT4ge1xuICAgIGxldCBtb3ZlO1xuICAgIGxldCBtb3ZlVHJpZXMgPSAwO1xuICAgIGlmIChsYXN0TW92ZUhpdCkge1xuICAgICAgbW92ZSA9IHNtYXJ0TW92ZShtb3Zlc01hZGVbbW92ZXNNYWRlLmxlbmd0aCAtIDFdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW92ZSA9IHJhbmRvbU1vdmUoKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoXG4gICAgICBtb3Zlc01hZGUuc29tZShcbiAgICAgICAgKG9sZE1vdmUpID0+IG9sZE1vdmVbMF0gPT09IG1vdmVbMF0gJiYgb2xkTW92ZVsxXSA9PT0gbW92ZVsxXVxuICAgICAgKVxuICAgICkge1xuICAgICAgaWYgKGxhc3RNb3ZlSGl0ICYmIG1vdmVUcmllcyA8IDYpIHtcbiAgICAgICAgbW92ZSA9IHNtYXJ0TW92ZShtb3Zlc01hZGVbbW92ZXNNYWRlLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgbW92ZVRyaWVzKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb3ZlID0gcmFuZG9tTW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBtb3Zlc01hZGUucHVzaChtb3ZlKTtcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhtb3ZlKTtcbiAgICBpZiAoaXNIaXQpIHtcbiAgICAgIGxhc3RNb3ZlSGl0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdE1vdmVIaXQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW92ZTtcbiAgfTtcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuICAgIHBsYXllclR1cm4gPSAhcGxheWVyVHVybjtcbiAgfTtcblxuICBjb25zdCBjdXJyZW50VHVybiA9ICgpID0+IHBsYXllclR1cm47XG5cbiAgcmV0dXJuIHtcbiAgICBtYWtlTW92ZSxcbiAgICBtYWtlUmFuZG9tTW92ZSxcbiAgICBjdXJyZW50VHVybixcbiAgICBjaGFuZ2VUdXJuLFxuICB9O1xufTtcblxuZXhwb3J0IHsgcGxheWVyIH07XG4iLCJjb25zdCBjcmVhdGVTaGlwID0gKGxlbmd0aCwgYXJyYXlDb29yZHMpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgbGV0IHNoaXBDb29yZHMgPSBhcnJheUNvb3Jkcy5tYXAoKHNwb3QpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29vcmRzOiBbc3BvdFswXSwgc3BvdFsxXV0sXG4gICAgICBpc0hpdDogZmFsc2UsXG4gICAgfTtcbiAgfSk7XG5cbiAgY29uc3QgaGl0ID0gKGNvb3JkcykgPT4ge1xuICAgIHNoaXBDb29yZHMgPSBzaGlwQ29vcmRzLm1hcCgoc3BvdCkgPT5cbiAgICAgIHNwb3QuY29vcmRzWzBdID09PSBjb29yZHNbMF0gJiYgc3BvdC5jb29yZHNbMV0gPT09IGNvb3Jkc1sxXVxuICAgICAgICA/IHsgLi4uc3BvdCwgaXNIaXQ6IHRydWUgfVxuICAgICAgICA6IHNwb3RcbiAgICApO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHNoaXBDb29yZHMuZXZlcnkoKGNvb3JkKSA9PiBjb29yZC5pc0hpdCk7XG5cbiAgY29uc3QgaGl0Q29vcmRzID0gKCkgPT4gc2hpcENvb3Jkcy5maWx0ZXIoKGNvb3JkcykgPT4gY29vcmRzLmlzSGl0KTtcblxuICBjb25zdCBnZXRTaGlwTGVuZ3RoID0gKCkgPT4gc2hpcExlbmd0aDtcblxuICBjb25zdCBhbGxDb29yZHMgPSAoKSA9PlxuICAgIHNoaXBDb29yZHMubWFwKChwb2ludCkgPT4gW3BvaW50LmNvb3Jkc1swXSwgcG9pbnQuY29vcmRzWzFdXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGhpdENvb3JkcyxcbiAgICBnZXRTaGlwTGVuZ3RoLFxuICAgIGFsbENvb3JkcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvcmVzZXQuY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9zdHlsZS5jc3NcIjtcblxuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9zY3JpcHRzL2dhbWVMb29wXCI7XG5cbmdhbWVMb29wKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=