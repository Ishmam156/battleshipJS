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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFc0I7Ozs7Ozs7VUNwQ3RCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ040QjtBQUNBOztBQUVrQjs7QUFFOUMsMkRBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9yZXNldC5jc3M/ZGQ1MSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3M/MjM5NCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvRE9NSW50ZXJhY3Rpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJjb25zdCBET01JbnRlcmFjdGlvbiA9IChodW1hbkJvYXJkLCBodW1hbkRPTUJvYXJkLCBodW1hblBsYXllcikgPT4ge1xuICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgbGV0IHNoaXBJbmRleCA9IDA7XG4gIGxldCBzaGlwRGltZW5zaW9uID0gXCJyb3dcIjtcbiAgbGV0IHNoaXBQbGFjZW1lbnRQb3NzaWJsZSA9IGZhbHNlO1xuXG4gIGNvbnN0IGNvbXB1dGVyRE9NQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyQm9hcmRcIik7XG4gIGNvbnN0IHRleHREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0Q29udGVudFwiKS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgdGV4dERpc3BsYXkudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciBzaGlwcyBvbiB0aGUgYm9hcmQhIEN1cnJlbnQgc2hpcCBsZW5ndGg6ICR7c2hpcExlbmd0aHNbc2hpcEluZGV4XX0gcGxhY2VzYDtcblxuICBjb21wdXRlckRPTUJvYXJkLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gIGNvbnN0IGFkZFJlc3RhcnRCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGltZW5zaW9uQnV0dG9uXCIpO1xuICAgIHJlc3RhcnRCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICByZXN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJQbGF5IGFnYWluP1wiO1xuICAgIHJlc3RhcnRCdXR0b24ub25jbGljayA9ICgpID0+IGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9O1xuXG4gIChmdW5jdGlvbiBhZGREaW1lbnNpb25CdXR0b24oKSB7XG4gICAgY29uc3QgaHVtYW5NYWluRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0Q29udGVudFwiKTtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgYnV0dG9uLmlkID0gXCJkaW1lbnNpb25CdXR0b25cIjtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBgQ2hhbmdlIHBsYWNlbWVudCB0byAke1xuICAgICAgc2hpcERpbWVuc2lvbiA9PT0gXCJyb3dcIiA/IFwicm93XCIgOiBcImNvbHVtblwiXG4gICAgfWA7XG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpbWVuc2lvbkJ1dHRvblwiKTtcblxuICAgICAgaWYgKGN1cnJlbnRUZXh0LnRleHRDb250ZW50LmluY2x1ZGVzKFwicm93XCIpKSB7XG4gICAgICAgIHNoaXBEaW1lbnNpb24gPSBcImNvbHVtblwiO1xuICAgICAgICBjdXJyZW50VGV4dC50ZXh0Q29udGVudCA9IFwiQ2hhbmdlIHBsYWNlbWVudCB0byBjb2x1bW5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBEaW1lbnNpb24gPSBcInJvd1wiO1xuICAgICAgICBjdXJyZW50VGV4dC50ZXh0Q29udGVudCA9IFwiQ2hhbmdlIHBsYWNlbWVudCB0byByb3dcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGh1bWFuTWFpbkRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICB9KSgpO1xuXG4gIGNvbnN0IG1vdXNlT3Zlckh1bWFuQm9hcmQgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgaWYgKHNoaXBJbmRleCA9PT0gc2hpcExlbmd0aHMubGVuZ3RoKSB7XG4gICAgICBodW1hbkRPTUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgbW91c2VPdmVySHVtYW5Cb2FyZCk7XG4gICAgICBodW1hbkRPTUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBtb3VzZU91dEh1bWFuQm9hcmQpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW91c2VDbGlja0h1bWFuQm9hcmQpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaW1lbnNpb25CdXR0b25cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlckJvYXJkXCIpLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgIGNvbXB1dGVyRE9NQm9hcmQucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgdGV4dERpc3BsYXkudGV4dENvbnRlbnQgPSBcIllvdXIgdHVybiEgVHJ5IHRvIHNpbmsgeW91ciBvcHBvbmVudCdzIHNoaXBzIVwiO1xuICAgICAgaHVtYW5QbGF5ZXIuY2hhbmdlVHVybigpO1xuICAgIH1cblxuICAgIGlmICghZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kKSB7XG4gICAgICBjb25zdCBzaGlwVG9QYWludCA9IHNoaXBMZW5ndGhzW3NoaXBJbmRleF07XG5cbiAgICAgIGNvbnN0IGRpdnNUb1BhaW50ID0gW107XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBzaGlwVG9QYWludDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBuZXdDb29yZGluYXRlcyA9IHtcbiAgICAgICAgICByb3c6IE51bWJlcihlbGVtZW50LmRhdGFzZXQucm93KSxcbiAgICAgICAgICBjb2x1bW46IE51bWJlcihlbGVtZW50LmRhdGFzZXQuY29sdW1uKSxcbiAgICAgICAgfTtcbiAgICAgICAgbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gPSBuZXdDb29yZGluYXRlc1tzaGlwRGltZW5zaW9uXSArIGluZGV4O1xuICAgICAgICBsZXQgdG9Db2xvckVsZW1lbnQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0b0NvbG9yRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcm93PVwiJHtuZXdDb29yZGluYXRlcy5yb3d9XCJdW2RhdGEtY29sdW1uPVwiJHtuZXdDb29yZGluYXRlcy5jb2x1bW59XCJdYFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgdG9Db2xvckVsZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b0NvbG9yRWxlbWVudCAmJiAhdG9Db2xvckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCkge1xuICAgICAgICAgIGRpdnNUb1BhaW50LnB1c2godG9Db2xvckVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpdnNUb1BhaW50Lmxlbmd0aCA9PT0gc2hpcFRvUGFpbnQgLSAxKSB7XG4gICAgICAgICAgZGl2c1RvUGFpbnQuZm9yRWFjaChcbiAgICAgICAgICAgIChwYWludEVsZW1lbnQpID0+XG4gICAgICAgICAgICAgIChwYWludEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwicmdiKDg0LCAxNDAsIDE2OClcIilcbiAgICAgICAgICApO1xuICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwicmdiKDg0LCAxNDAsIDE2OClcIjtcbiAgICAgICAgICBzaGlwUGxhY2VtZW50UG9zc2libGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuaWQgIT09IFwiaHVtYW5Cb2FyZFwiKSB7XG4gICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJpbmRpYW5yZWRcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBtb3VzZU91dEh1bWFuQm9hcmQgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgaWYgKFxuICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID09PSBcInJnYig4NCwgMTQwLCAxNjgpXCIgfHxcbiAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9PT0gXCJpbmRpYW5yZWRcIlxuICAgICkge1xuICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcblxuICAgICAgY29uc3Qgc2hpcFRvUGFpbnQgPSBzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdO1xuXG4gICAgICBpZiAoc2hpcFBsYWNlbWVudFBvc3NpYmxlKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBzaGlwVG9QYWludDsgaW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgcm93OiBOdW1iZXIoZWxlbWVudC5kYXRhc2V0LnJvdyksXG4gICAgICAgICAgICBjb2x1bW46IE51bWJlcihlbGVtZW50LmRhdGFzZXQuY29sdW1uKSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzW3NoaXBEaW1lbnNpb25dID0gbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gKyBpbmRleDtcbiAgICAgICAgICBjb25zdCB0b0NvbG9yRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcm93PVwiJHtuZXdDb29yZGluYXRlcy5yb3d9XCJdW2RhdGEtY29sdW1uPVwiJHtuZXdDb29yZGluYXRlcy5jb2x1bW59XCJdYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdG9Db2xvckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbW91c2VDbGlja0h1bWFuQm9hcmQgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHBsYWNlbWVudENvb3JkaW5hdGVzID0gW107XG5cbiAgICBpZiAoc2hpcFBsYWNlbWVudFBvc3NpYmxlKSB7XG4gICAgICBjb25zdCBzaGlwVG9QYWludCA9IHNoaXBMZW5ndGhzW3NoaXBJbmRleF07XG4gICAgICBjb25zdCBzdHJpbmdDb29yZGluYXRlID0gZWxlbWVudC5kYXRhc2V0O1xuICAgICAgY29uc3QgY3VycmVudENvb3JkaW5hdGUgPSBbXG4gICAgICAgIE51bWJlcihzdHJpbmdDb29yZGluYXRlLnJvdyksXG4gICAgICAgIE51bWJlcihzdHJpbmdDb29yZGluYXRlLmNvbHVtbiksXG4gICAgICBdO1xuICAgICAgcGxhY2VtZW50Q29vcmRpbmF0ZXMucHVzaChjdXJyZW50Q29vcmRpbmF0ZSk7XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBzaGlwVG9QYWludDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBuZXh0Q29vcmRpbmF0ZSA9IFsuLi5jdXJyZW50Q29vcmRpbmF0ZV07XG4gICAgICAgIGNvbnN0IGRpbWVuc2lvbiA9IHNoaXBEaW1lbnNpb24gPT09IFwicm93XCIgPyAwIDogMTtcbiAgICAgICAgbmV4dENvb3JkaW5hdGVbZGltZW5zaW9uXSA9IG5leHRDb29yZGluYXRlW2RpbWVuc2lvbl0gKyBpbmRleDtcbiAgICAgICAgcGxhY2VtZW50Q29vcmRpbmF0ZXMucHVzaChuZXh0Q29vcmRpbmF0ZSk7XG4gICAgICB9XG5cbiAgICAgIGh1bWFuQm9hcmQucGxhY2VTaGlwKHBsYWNlbWVudENvb3JkaW5hdGVzKTtcbiAgICAgIGh1bWFuRE9NQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIGh1bWFuQm9hcmQucmVuZGVyR2FtZUJvYXJkKGh1bWFuRE9NQm9hcmQsIHRydWUpO1xuICAgICAgc2hpcEluZGV4Kys7XG4gICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzIG9uIHRoZSBib2FyZCEgQ3VycmVudCBzaGlwIGxlbmd0aDogJHtzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdfSBwbGFjZXNgO1xuICAgICAgc2hpcFBsYWNlbWVudFBvc3NpYmxlID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFkZE1vdXNlT3Zlckxpc3RlbmVyID0gKGJvYXJkRE9NKSA9PiB7XG4gICAgYm9hcmRET00uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBtb3VzZU92ZXJIdW1hbkJvYXJkKTtcbiAgfTtcblxuICBjb25zdCBhZGRNb3VzZU91dExpc3RlbmVyID0gKGJvYXJkRE9NKSA9PiB7XG4gICAgYm9hcmRET00uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIG1vdXNlT3V0SHVtYW5Cb2FyZCk7XG4gIH07XG5cbiAgY29uc3QgYWRkTW91c2VDbGlja0xpc3RlbmVyID0gKGJvYXJkRE9NKSA9PiB7XG4gICAgYm9hcmRET00uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vdXNlQ2xpY2tIdW1hbkJvYXJkKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGFkZFJlc3RhcnRCdXR0b24sXG4gICAgYWRkTW91c2VPdmVyTGlzdGVuZXIsXG4gICAgYWRkTW91c2VPdXRMaXN0ZW5lcixcbiAgICBhZGRNb3VzZUNsaWNrTGlzdGVuZXIsXG4gIH07XG59O1xuXG5leHBvcnQgeyBET01JbnRlcmFjdGlvbiB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgQk9BUkRfU0laRSA9IDEwO1xuXG5jb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW107XG5cbiAgKGZ1bmN0aW9uIGluaXRpbGlhemVCb2FyZCgpIHtcbiAgICBmb3IgKGxldCBvdXRlckluZGV4ID0gMDsgb3V0ZXJJbmRleCA8IEJPQVJEX1NJWkU7IG91dGVySW5kZXgrKykge1xuICAgICAgY29uc3QgdG9BZGQgPSBbXTtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIHRvQWRkLnB1c2goe1xuICAgICAgICAgIGhhc1NoaXA6IGZhbHNlLFxuICAgICAgICAgIGhhc0hpdDogZmFsc2UsXG4gICAgICAgICAgc2hpcDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBib2FyZC5wdXNoKHRvQWRkKTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoY29vcmRzKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRzLmxlbmd0aCwgY29vcmRzKTtcbiAgICBuZXdTaGlwLmFsbENvb3JkcygpLmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gYm9hcmRbcG9pbnRbMF1dW3BvaW50WzFdXTtcbiAgICAgIGNvb3JkaW5hdGUuaGFzU2hpcCA9IHRydWU7XG4gICAgICBjb29yZGluYXRlLnNoaXAgPSBuZXdTaGlwO1xuICAgIH0pO1xuICAgIGFsbFNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICBjb25zdCBpc0hpdCA9IGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXTtcbiAgICBpc0hpdC5oYXNIaXQgPSB0cnVlO1xuICAgIGlmIChpc0hpdC5oYXNTaGlwKSB7XG4gICAgICBpc0hpdC5zaGlwLmhpdChjb29yZHMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4ge1xuICAgIGNvbnN0IG1pc3NlZENvb3JkaW5hdGVzID0gW107XG4gICAgZm9yIChsZXQgb3V0ZXJJbmRleCA9IDA7IG91dGVySW5kZXggPCBCT0FSRF9TSVpFOyBvdXRlckluZGV4KyspIHtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBib2FyZFtvdXRlckluZGV4XVtpbm5lckluZGV4XTtcbiAgICAgICAgaWYgKGNvb3JkaW5hdGUuaGFzSGl0ICYmICFjb29yZGluYXRlLmhhc1NoaXApIHtcbiAgICAgICAgICBtaXNzZWRDb29yZGluYXRlcy5wdXNoKFtvdXRlckluZGV4LCBpbm5lckluZGV4XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1pc3NlZENvb3JkaW5hdGVzO1xuICB9O1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgYWxsU2hpcFN0YXR1cyA9IGFsbFNoaXBzLm1hcCgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG5cbiAgICByZXR1cm4gYWxsU2hpcFN0YXR1cy5ldmVyeSgoc3RhdHVzKSA9PiBzdGF0dXMpO1xuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgcmVuZGVyR2FtZUJvYXJkID0gKERPTUVsZW1lbnQsIHNob3dTaGlwKSA9PiB7XG4gICAgZm9yIChsZXQgb3V0ZXJJbmRleCA9IDA7IG91dGVySW5kZXggPCBCT0FSRF9TSVpFOyBvdXRlckluZGV4KyspIHtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHRvQWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdG9BZGQuZGF0YXNldC5yb3cgPSBvdXRlckluZGV4O1xuICAgICAgICB0b0FkZC5kYXRhc2V0LmNvbHVtbiA9IGlubmVySW5kZXg7XG5cbiAgICAgICAgY29uc3QgY29vcmRTdGF0dXMgPSBib2FyZFtvdXRlckluZGV4XVtpbm5lckluZGV4XTtcblxuICAgICAgICBpZiAoc2hvd1NoaXApIHtcbiAgICAgICAgICBpZiAoY29vcmRTdGF0dXMuaGFzU2hpcCkge1xuICAgICAgICAgICAgdG9BZGQuc3R5bGUuYmFja2dyb3VuZCA9IFwiIzQ3NjA3MlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb29yZFN0YXR1cy5oYXNTaGlwICYmIGNvb3JkU3RhdHVzLmhhc0hpdCkge1xuICAgICAgICAgIHRvQWRkLnN0eWxlLmJhY2tncm91bmQgPSBcImluZGlhbnJlZFwiO1xuICAgICAgICAgIGlmIChjb29yZFN0YXR1cy5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICB0b0FkZC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjb29yZFN0YXR1cy5oYXNIaXQpIHtcbiAgICAgICAgICB0b0FkZC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjNTA4OUM2XCI7XG4gICAgICAgIH1cblxuICAgICAgICBET01FbGVtZW50LmFwcGVuZENoaWxkKHRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRNaXNzZWRBdHRhY2tzLFxuICAgIGFsbFN1bmssXG4gICAgZ2V0Qm9hcmQsXG4gICAgcmVuZGVyR2FtZUJvYXJkLFxuICB9O1xufTtcblxuZXhwb3J0IHsgZ2FtZUJvYXJkLCBCT0FSRF9TSVpFIH07XG4iLCJpbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcbmltcG9ydCB7IHBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgRE9NSW50ZXJhY3Rpb24gfSBmcm9tIFwiLi9ET01JbnRlcmFjdGlvblwiO1xuXG5jb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcbiAgY29uc3QgaHVtYW5ET01Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHVtYW5Cb2FyZFwiKTtcbiAgY29uc3QgY29tcHV0ZXJET01Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXJCb2FyZFwiKTtcbiAgY29uc3QgdGV4dERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRDb250ZW50XCIpLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gIGNvbnN0IGh1bWFuQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGdhbWVCb2FyZCgpO1xuICBjb25zdCBodW1hblBsYXllciA9IHBsYXllcihjb21wdXRlckJvYXJkKTtcbiAgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXIoaHVtYW5Cb2FyZCk7XG5cbiAgY29uc3QgRE9NQWN0aXZpdHkgPSBET01JbnRlcmFjdGlvbihodW1hbkJvYXJkLCBodW1hbkRPTUJvYXJkLCBodW1hblBsYXllcik7XG5cbiAgY29uc3QgY2hlY2tXaW5uZXIgPSAoKSA9PiB7XG4gICAgaWYgKGh1bWFuQm9hcmQuYWxsU3VuaygpIHx8IGNvbXB1dGVyQm9hcmQuYWxsU3VuaygpKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgYm9hcmRMaXN0ZW5lciA9IChldmVudCwgYm9hcmQpID0+IHtcbiAgICBpZiAoaHVtYW5QbGF5ZXIuY3VycmVudFR1cm4oKSkge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGV2ZW50LnRhcmdldC5kYXRhc2V0KS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IFtcbiAgICAgICAgTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyksXG4gICAgICAgIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC5jb2x1bW4pLFxuICAgICAgXTtcblxuICAgICAgaWYgKFxuICAgICAgICBldmVudC50YXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9PT0gXCJibHVlXCIgfHxcbiAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPT09IFwicmVkXCJcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGUpO1xuXG4gICAgICBjb21wdXRlckRPTUJvYXJkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICBjb21wdXRlckJvYXJkLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckRPTUJvYXJkLCBmYWxzZSk7XG5cbiAgICAgIGlmIChjaGVja1dpbm5lcigpKSB7XG4gICAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID1cbiAgICAgICAgICBcIkNvbmdyYXR1bGF0aW9ucyEgWW91J3ZlIHdvbiBhbmQgc2FuayBhbGwgdGhlIHNoaXBzIVwiO1xuICAgICAgICB0ZXh0RGlzcGxheS5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XG4gICAgICAgIERPTUFjdGl2aXR5LmFkZFJlc3RhcnRCdXR0b24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBodW1hblBsYXllci5jaGFuZ2VUdXJuKCk7XG5cbiAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gXCJXYWl0IGZvciB0aGUgY29tcHV0ZXIncyB0dXJuIVwiO1xuXG4gICAgICBjb21wdXRlclBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29tcHV0ZXJQbGF5ZXIubWFrZVJhbmRvbU1vdmUoKTtcbiAgICAgICAgaHVtYW5ET01Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBodW1hbkJvYXJkLnJlbmRlckdhbWVCb2FyZChodW1hbkRPTUJvYXJkLCB0cnVlKTtcbiAgICAgICAgaWYgKGNoZWNrV2lubmVyKCkpIHtcbiAgICAgICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICBcIk9oIG5vISBZb3UndmUgbG9zdCBhbmQgYWxsIHlvdXIgc2hpcHMgaGF2ZSBzdW5rIVwiO1xuICAgICAgICAgIHRleHREaXNwbGF5LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcbiAgICAgICAgICBET01BY3Rpdml0eS5hZGRSZXN0YXJ0QnV0dG9uKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbXB1dGVyUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgaHVtYW5QbGF5ZXIuY2hhbmdlVHVybigpO1xuICAgICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgXCJZb3VyIHR1cm4gYWdhaW4hIFRyeSB0byBzaW5rIHlvdXIgb3Bwb25lbnQncyBzaGlwcyFcIjtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfTtcblxuICBjb21wdXRlckRPTUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+XG4gICAgYm9hcmRMaXN0ZW5lcihldmVudCwgY29tcHV0ZXJCb2FyZClcbiAgKTtcblxuICAoZnVuY3Rpb24gaW5pdGFsaXplQ29tcHV0ZXJTaGlwcygpIHtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbMSwgMV0sXG4gICAgICBbMSwgMl0sXG4gICAgICBbMSwgM10sXG4gICAgICBbMSwgNF0sXG4gICAgICBbMSwgNV0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbMywgM10sXG4gICAgICBbMywgNF0sXG4gICAgICBbMywgNV0sXG4gICAgICBbMywgNl0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbNSwgNF0sXG4gICAgICBbNiwgNF0sXG4gICAgICBbNywgNF0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbNiwgN10sXG4gICAgICBbNywgN10sXG4gICAgICBbOCwgN10sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbOCwgMV0sXG4gICAgICBbOCwgMl0sXG4gICAgXSk7XG4gIH0pKCk7XG5cbiAgRE9NQWN0aXZpdHkuYWRkTW91c2VPdmVyTGlzdGVuZXIoaHVtYW5ET01Cb2FyZCk7XG4gIERPTUFjdGl2aXR5LmFkZE1vdXNlT3V0TGlzdGVuZXIoaHVtYW5ET01Cb2FyZCk7XG4gIERPTUFjdGl2aXR5LmFkZE1vdXNlQ2xpY2tMaXN0ZW5lcihodW1hbkRPTUJvYXJkKTtcblxuICBodW1hbkJvYXJkLnJlbmRlckdhbWVCb2FyZChodW1hbkRPTUJvYXJkLCB0cnVlKTtcbiAgY29tcHV0ZXJCb2FyZC5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJET01Cb2FyZCwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImltcG9ydCB7IEJPQVJEX1NJWkUgfSBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcblxuY29uc3QgcGxheWVyID0gKGdhbWVCb2FyZCkgPT4ge1xuICBjb25zdCBlbmVteUJvYXJkID0gZ2FtZUJvYXJkO1xuICBjb25zdCBtb3Zlc01hZGUgPSBbXTtcbiAgbGV0IGxhc3RNb3ZlSGl0ID0gZmFsc2U7XG4gIGxldCBwbGF5ZXJUdXJuID0gZmFsc2U7XG5cbiAgY29uc3QgcmFuZG9tTW92ZSA9ICgpID0+IFtcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9TSVpFKSxcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9TSVpFKSxcbiAgXTtcblxuICBjb25zdCBzbWFydE1vdmUgPSAoY29vcmRzKSA9PiB7XG4gICAgY29uc3QgbmV3Q29vcmRzID0gWy4uLmNvb3Jkc107XG4gICAgY29uc3Qgb3B0aW9ucyA9IFsxLCAtMV07XG4gICAgbGV0IHNpbmdsZUNvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG4gICAgbmV3Q29vcmRzW3NpbmdsZUNvb3JkXSA9XG4gICAgICBjb29yZHNbc2luZ2xlQ29vcmRdICsgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG5cbiAgICB3aGlsZSAobmV3Q29vcmRzLmluY2x1ZGVzKC0xKSB8fCBuZXdDb29yZHMuaW5jbHVkZXMoMTApKSB7XG4gICAgICBuZXdDb29yZHNbc2luZ2xlQ29vcmRdID1cbiAgICAgICAgY29vcmRzW3NpbmdsZUNvb3JkXSArIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xuICAgIH1cbiAgICByZXR1cm4gbmV3Q29vcmRzO1xuICB9O1xuXG4gIGNvbnN0IG1ha2VNb3ZlID0gKGNvb3JkcykgPT4ge1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IG1ha2VSYW5kb21Nb3ZlID0gKCkgPT4ge1xuICAgIGxldCBtb3ZlO1xuICAgIGxldCBtb3ZlVHJpZXMgPSAwO1xuICAgIGlmIChsYXN0TW92ZUhpdCkge1xuICAgICAgbW92ZSA9IHNtYXJ0TW92ZShtb3Zlc01hZGVbbW92ZXNNYWRlLmxlbmd0aCAtIDFdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW92ZSA9IHJhbmRvbU1vdmUoKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoXG4gICAgICBtb3Zlc01hZGUuc29tZShcbiAgICAgICAgKG9sZE1vdmUpID0+IG9sZE1vdmVbMF0gPT09IG1vdmVbMF0gJiYgb2xkTW92ZVsxXSA9PT0gbW92ZVsxXVxuICAgICAgKVxuICAgICkge1xuICAgICAgaWYgKGxhc3RNb3ZlSGl0ICYmIG1vdmVUcmllcyA8IDYpIHtcbiAgICAgICAgbW92ZSA9IHNtYXJ0TW92ZShtb3Zlc01hZGVbbW92ZXNNYWRlLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgbW92ZVRyaWVzKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb3ZlID0gcmFuZG9tTW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBtb3Zlc01hZGUucHVzaChtb3ZlKTtcbiAgICBjb25zdCBpc0hpdCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhtb3ZlKTtcbiAgICBpZiAoaXNIaXQpIHtcbiAgICAgIGxhc3RNb3ZlSGl0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdE1vdmVIaXQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW92ZTtcbiAgfTtcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuICAgIHBsYXllclR1cm4gPSAhcGxheWVyVHVybjtcbiAgfTtcblxuICBjb25zdCBjdXJyZW50VHVybiA9ICgpID0+IHBsYXllclR1cm47XG5cbiAgcmV0dXJuIHtcbiAgICBtYWtlTW92ZSxcbiAgICBtYWtlUmFuZG9tTW92ZSxcbiAgICBjdXJyZW50VHVybixcbiAgICBjaGFuZ2VUdXJuLFxuICB9O1xufTtcblxuZXhwb3J0IHsgcGxheWVyIH07XG4iLCJjb25zdCBjcmVhdGVTaGlwID0gKGxlbmd0aCwgYXJyYXlDb29yZHMpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgbGV0IHNoaXBDb29yZHMgPSBhcnJheUNvb3Jkcy5tYXAoKHNwb3QpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29vcmRzOiBbc3BvdFswXSwgc3BvdFsxXV0sXG4gICAgICBpc0hpdDogZmFsc2UsXG4gICAgfTtcbiAgfSk7XG5cbiAgY29uc3QgaGl0ID0gKGNvb3JkcykgPT4ge1xuICAgIHNoaXBDb29yZHMgPSBzaGlwQ29vcmRzLm1hcCgoc3BvdCkgPT5cbiAgICAgIHNwb3QuY29vcmRzWzBdID09PSBjb29yZHNbMF0gJiYgc3BvdC5jb29yZHNbMV0gPT09IGNvb3Jkc1sxXVxuICAgICAgICA/IHsgLi4uc3BvdCwgaXNIaXQ6IHRydWUgfVxuICAgICAgICA6IHNwb3RcbiAgICApO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHNoaXBDb29yZHMuZXZlcnkoKGNvb3JkKSA9PiBjb29yZC5pc0hpdCk7XG5cbiAgY29uc3QgaGl0Q29vcmRzID0gKCkgPT4gc2hpcENvb3Jkcy5maWx0ZXIoKGNvb3JkcykgPT4gY29vcmRzLmlzSGl0KTtcblxuICBjb25zdCBnZXRTaGlwTGVuZ3RoID0gKCkgPT4gc2hpcExlbmd0aDtcblxuICBjb25zdCBhbGxDb29yZHMgPSAoKSA9PlxuICAgIHNoaXBDb29yZHMubWFwKChwb2ludCkgPT4gW3BvaW50LmNvb3Jkc1swXSwgcG9pbnQuY29vcmRzWzFdXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGhpdENvb3JkcyxcbiAgICBnZXRTaGlwTGVuZ3RoLFxuICAgIGFsbENvb3JkcyxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvcmVzZXQuY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9zdHlsZS5jc3NcIjtcblxuaW1wb3J0IHsgZ2FtZUxvb3AgfSBmcm9tIFwiLi9zY3JpcHRzL2dhbWVMb29wXCI7XG5cbmdhbWVMb29wKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=