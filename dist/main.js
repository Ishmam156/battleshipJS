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
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/scripts/helper.js");


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
            (paintElement) => (paintElement.style.background = _helper__WEBPACK_IMPORTED_MODULE_0__.hoverColor)
          );
          element.style.background = _helper__WEBPACK_IMPORTED_MODULE_0__.hoverColor;
          shipPlacementPossible = true;
        } else if (element.id !== "humanBoard") {
          element.style.background = _helper__WEBPACK_IMPORTED_MODULE_0__.redColor;
        }
      }
    }
  };

  const mouseOutHumanBoard = (event) => {
    const element = event.target;
    let elementBackgroundStyle = element.style.background.split(")")[0];
    elementBackgroundStyle += ")";

    if (
      elementBackgroundStyle === _helper__WEBPACK_IMPORTED_MODULE_0__.hoverColor ||
      elementBackgroundStyle === _helper__WEBPACK_IMPORTED_MODULE_0__.redColor
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
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/scripts/helper.js");



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
            toAdd.style.background = _helper__WEBPACK_IMPORTED_MODULE_1__.shipColor;
          }
        }

        if (coordStatus.hasShip && coordStatus.hasHit) {
          toAdd.style.background = _helper__WEBPACK_IMPORTED_MODULE_1__.redColor;
          if (coordStatus.ship.isSunk()) {
            toAdd.textContent = "X";
          }
        } else if (coordStatus.hasHit) {
          toAdd.style.background = _helper__WEBPACK_IMPORTED_MODULE_1__.blueColor;
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
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper */ "./src/scripts/helper.js");





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
    if (humanPlayer.currentTurn() && !checkWinner()) {
      if (Object.keys(event.target.dataset).length === 0) return;

      const coordinate = [
        Number(event.target.dataset.row),
        Number(event.target.dataset.column),
      ];

      let elementBackgroundStyle = event.target.style.background.split(")")[0];
      elementBackgroundStyle += ")";

      if (
        elementBackgroundStyle === _helper__WEBPACK_IMPORTED_MODULE_3__.blueColor ||
        elementBackgroundStyle === _helper__WEBPACK_IMPORTED_MODULE_3__.redColor
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

/***/ "./src/scripts/helper.js":
/*!*******************************!*\
  !*** ./src/scripts/helper.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "redColor": () => (/* binding */ redColor),
/* harmony export */   "blueColor": () => (/* binding */ blueColor),
/* harmony export */   "hoverColor": () => (/* binding */ hoverColor),
/* harmony export */   "shipColor": () => (/* binding */ shipColor)
/* harmony export */ });
const redColor = "rgb(205, 92, 92)";
const blueColor = "rgb(80, 137, 198)";
const hoverColor = "rgb(84, 140, 168)";
const shipColor = "rgb(71, 96, 114)";


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7QUM5RWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVzQjs7Ozs7OztVQ3BDdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjRCO0FBQ0E7O0FBRWtCOztBQUU5QywyREFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcz9kZDUxIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlLmNzcz8yMzk0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9ET01JbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvaGVscGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgcmVkQ29sb3IsIGhvdmVyQ29sb3IgfSBmcm9tIFwiLi9oZWxwZXJcIjtcblxuY29uc3QgRE9NSW50ZXJhY3Rpb24gPSAoaHVtYW5Cb2FyZCwgaHVtYW5ET01Cb2FyZCwgaHVtYW5QbGF5ZXIpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gIGxldCBzaGlwSW5kZXggPSAwO1xuICBsZXQgc2hpcERpbWVuc2lvbiA9IFwicm93XCI7XG4gIGxldCBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcblxuICBjb25zdCBjb21wdXRlckRPTUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlckJvYXJkXCIpO1xuICBjb25zdCB0ZXh0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dENvbnRlbnRcIikuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgc2hpcHMgb24gdGhlIGJvYXJkISBDdXJyZW50IHNoaXAgbGVuZ3RoOiAke3NoaXBMZW5ndGhzW3NoaXBJbmRleF19IHBsYWNlc2A7XG5cbiAgY29tcHV0ZXJET01Cb2FyZC5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBjb25zdCBhZGRSZXN0YXJ0QnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpbWVuc2lvbkJ1dHRvblwiKTtcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgcmVzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUGxheSBhZ2Fpbj9cIjtcbiAgICByZXN0YXJ0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfTtcblxuICAoZnVuY3Rpb24gYWRkRGltZW5zaW9uQnV0dG9uKCkge1xuICAgIGNvbnN0IGh1bWFuTWFpbkRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dENvbnRlbnRcIik7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgIGJ1dHRvbi5pZCA9IFwiZGltZW5zaW9uQnV0dG9uXCI7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gYENoYW5nZSBwbGFjZW1lbnQgdG8gJHtcbiAgICAgIHNoaXBEaW1lbnNpb24gPT09IFwicm93XCIgPyBcInJvd1wiIDogXCJjb2x1bW5cIlxuICAgIH1gO1xuXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaW1lbnNpb25CdXR0b25cIik7XG5cbiAgICAgIGlmIChjdXJyZW50VGV4dC50ZXh0Q29udGVudC5pbmNsdWRlcyhcInJvd1wiKSkge1xuICAgICAgICBzaGlwRGltZW5zaW9uID0gXCJjb2x1bW5cIjtcbiAgICAgICAgY3VycmVudFRleHQudGV4dENvbnRlbnQgPSBcIkNoYW5nZSBwbGFjZW1lbnQgdG8gY29sdW1uXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwRGltZW5zaW9uID0gXCJyb3dcIjtcbiAgICAgICAgY3VycmVudFRleHQudGV4dENvbnRlbnQgPSBcIkNoYW5nZSBwbGFjZW1lbnQgdG8gcm93XCI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBodW1hbk1haW5EaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfSkoKTtcblxuICBjb25zdCBtb3VzZU92ZXJIdW1hbkJvYXJkID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcblxuICAgIGlmIChzaGlwSW5kZXggPT09IHNoaXBMZW5ndGhzLmxlbmd0aCkge1xuICAgICAgaHVtYW5ET01Cb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG1vdXNlT3Zlckh1bWFuQm9hcmQpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgbW91c2VPdXRIdW1hbkJvYXJkKTtcbiAgICAgIGh1bWFuRE9NQm9hcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vdXNlQ2xpY2tIdW1hbkJvYXJkKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGltZW5zaW9uQnV0dG9uXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXJCb2FyZFwiKS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICBjb21wdXRlckRPTUJvYXJkLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gXCJZb3VyIHR1cm4hIFRyeSB0byBzaW5rIHlvdXIgb3Bwb25lbnQncyBzaGlwcyFcIjtcbiAgICAgIGh1bWFuUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCkge1xuICAgICAgY29uc3Qgc2hpcFRvUGFpbnQgPSBzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdO1xuXG4gICAgICBjb25zdCBkaXZzVG9QYWludCA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgc2hpcFRvUGFpbnQ7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgcm93OiBOdW1iZXIoZWxlbWVudC5kYXRhc2V0LnJvdyksXG4gICAgICAgICAgY29sdW1uOiBOdW1iZXIoZWxlbWVudC5kYXRhc2V0LmNvbHVtbiksXG4gICAgICAgIH07XG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzW3NoaXBEaW1lbnNpb25dID0gbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gKyBpbmRleDtcbiAgICAgICAgbGV0IHRvQ29sb3JFbGVtZW50O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdG9Db2xvckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXJvdz1cIiR7bmV3Q29vcmRpbmF0ZXMucm93fVwiXVtkYXRhLWNvbHVtbj1cIiR7bmV3Q29vcmRpbmF0ZXMuY29sdW1ufVwiXWBcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHRvQ29sb3JFbGVtZW50ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9Db2xvckVsZW1lbnQgJiYgIXRvQ29sb3JFbGVtZW50LnN0eWxlLmJhY2tncm91bmQpIHtcbiAgICAgICAgICBkaXZzVG9QYWludC5wdXNoKHRvQ29sb3JFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXZzVG9QYWludC5sZW5ndGggPT09IHNoaXBUb1BhaW50IC0gMSkge1xuICAgICAgICAgIGRpdnNUb1BhaW50LmZvckVhY2goXG4gICAgICAgICAgICAocGFpbnRFbGVtZW50KSA9PiAocGFpbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBob3ZlckNvbG9yKVxuICAgICAgICAgICk7XG4gICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gaG92ZXJDb2xvcjtcbiAgICAgICAgICBzaGlwUGxhY2VtZW50UG9zc2libGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQuaWQgIT09IFwiaHVtYW5Cb2FyZFwiKSB7XG4gICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gcmVkQ29sb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbW91c2VPdXRIdW1hbkJvYXJkID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICBsZXQgZWxlbWVudEJhY2tncm91bmRTdHlsZSA9IGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZC5zcGxpdChcIilcIilbMF07XG4gICAgZWxlbWVudEJhY2tncm91bmRTdHlsZSArPSBcIilcIjtcblxuICAgIGlmIChcbiAgICAgIGVsZW1lbnRCYWNrZ3JvdW5kU3R5bGUgPT09IGhvdmVyQ29sb3IgfHxcbiAgICAgIGVsZW1lbnRCYWNrZ3JvdW5kU3R5bGUgPT09IHJlZENvbG9yXG4gICAgKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcIlwiO1xuXG4gICAgICBjb25zdCBzaGlwVG9QYWludCA9IHNoaXBMZW5ndGhzW3NoaXBJbmRleF07XG5cbiAgICAgIGlmIChzaGlwUGxhY2VtZW50UG9zc2libGUpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBUb1BhaW50OyBpbmRleCsrKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgICByb3c6IE51bWJlcihlbGVtZW50LmRhdGFzZXQucm93KSxcbiAgICAgICAgICAgIGNvbHVtbjogTnVtYmVyKGVsZW1lbnQuZGF0YXNldC5jb2x1bW4pLFxuICAgICAgICAgIH07XG4gICAgICAgICAgbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gPSBuZXdDb29yZGluYXRlc1tzaGlwRGltZW5zaW9uXSArIGluZGV4O1xuICAgICAgICAgIGNvbnN0IHRvQ29sb3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1yb3c9XCIke25ld0Nvb3JkaW5hdGVzLnJvd31cIl1bZGF0YS1jb2x1bW49XCIke25ld0Nvb3JkaW5hdGVzLmNvbHVtbn1cIl1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0b0NvbG9yRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaXBQbGFjZW1lbnRQb3NzaWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBtb3VzZUNsaWNrSHVtYW5Cb2FyZCA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgcGxhY2VtZW50Q29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGlmIChzaGlwUGxhY2VtZW50UG9zc2libGUpIHtcbiAgICAgIGNvbnN0IHNoaXBUb1BhaW50ID0gc2hpcExlbmd0aHNbc2hpcEluZGV4XTtcbiAgICAgIGNvbnN0IHN0cmluZ0Nvb3JkaW5hdGUgPSBlbGVtZW50LmRhdGFzZXQ7XG4gICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZSA9IFtcbiAgICAgICAgTnVtYmVyKHN0cmluZ0Nvb3JkaW5hdGUucm93KSxcbiAgICAgICAgTnVtYmVyKHN0cmluZ0Nvb3JkaW5hdGUuY29sdW1uKSxcbiAgICAgIF07XG4gICAgICBwbGFjZW1lbnRDb29yZGluYXRlcy5wdXNoKGN1cnJlbnRDb29yZGluYXRlKTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBUb1BhaW50OyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5leHRDb29yZGluYXRlID0gWy4uLmN1cnJlbnRDb29yZGluYXRlXTtcbiAgICAgICAgY29uc3QgZGltZW5zaW9uID0gc2hpcERpbWVuc2lvbiA9PT0gXCJyb3dcIiA/IDAgOiAxO1xuICAgICAgICBuZXh0Q29vcmRpbmF0ZVtkaW1lbnNpb25dID0gbmV4dENvb3JkaW5hdGVbZGltZW5zaW9uXSArIGluZGV4O1xuICAgICAgICBwbGFjZW1lbnRDb29yZGluYXRlcy5wdXNoKG5leHRDb29yZGluYXRlKTtcbiAgICAgIH1cblxuICAgICAgaHVtYW5Cb2FyZC5wbGFjZVNoaXAocGxhY2VtZW50Q29vcmRpbmF0ZXMpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgaHVtYW5Cb2FyZC5yZW5kZXJHYW1lQm9hcmQoaHVtYW5ET01Cb2FyZCwgdHJ1ZSk7XG4gICAgICBzaGlwSW5kZXgrKztcbiAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgc2hpcHMgb24gdGhlIGJvYXJkISBDdXJyZW50IHNoaXAgbGVuZ3RoOiAke3NoaXBMZW5ndGhzW3NoaXBJbmRleF19IHBsYWNlc2A7XG4gICAgICBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWRkTW91c2VPdmVyTGlzdGVuZXIgPSAoYm9hcmRET00pID0+IHtcbiAgICBib2FyZERPTS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG1vdXNlT3Zlckh1bWFuQm9hcmQpO1xuICB9O1xuXG4gIGNvbnN0IGFkZE1vdXNlT3V0TGlzdGVuZXIgPSAoYm9hcmRET00pID0+IHtcbiAgICBib2FyZERPTS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgbW91c2VPdXRIdW1hbkJvYXJkKTtcbiAgfTtcblxuICBjb25zdCBhZGRNb3VzZUNsaWNrTGlzdGVuZXIgPSAoYm9hcmRET00pID0+IHtcbiAgICBib2FyZERPTS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW91c2VDbGlja0h1bWFuQm9hcmQpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYWRkUmVzdGFydEJ1dHRvbixcbiAgICBhZGRNb3VzZU92ZXJMaXN0ZW5lcixcbiAgICBhZGRNb3VzZU91dExpc3RlbmVyLFxuICAgIGFkZE1vdXNlQ2xpY2tMaXN0ZW5lcixcbiAgfTtcbn07XG5cbmV4cG9ydCB7IERPTUludGVyYWN0aW9uIH07XG4iLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgc2hpcENvbG9yLCByZWRDb2xvciwgYmx1ZUNvbG9yIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5cbmNvbnN0IEJPQVJEX1NJWkUgPSAxMDtcblxuY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuXG4gIChmdW5jdGlvbiBpbml0aWxpYXplQm9hcmQoKSB7XG4gICAgZm9yIChsZXQgb3V0ZXJJbmRleCA9IDA7IG91dGVySW5kZXggPCBCT0FSRF9TSVpFOyBvdXRlckluZGV4KyspIHtcbiAgICAgIGNvbnN0IHRvQWRkID0gW107XG4gICAgICBmb3IgKGxldCBpbm5lckluZGV4ID0gMDsgaW5uZXJJbmRleCA8IEJPQVJEX1NJWkU7IGlubmVySW5kZXgrKykge1xuICAgICAgICB0b0FkZC5wdXNoKHtcbiAgICAgICAgICBoYXNTaGlwOiBmYWxzZSxcbiAgICAgICAgICBoYXNIaXQ6IGZhbHNlLFxuICAgICAgICAgIHNoaXA6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYm9hcmQucHVzaCh0b0FkZCk7XG4gICAgfVxuICB9KSgpO1xuXG4gIGNvbnN0IGFsbFNoaXBzID0gW107XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGNvb3JkcykgPT4ge1xuICAgIGNvbnN0IG5ld1NoaXAgPSBjcmVhdGVTaGlwKGNvb3Jkcy5sZW5ndGgsIGNvb3Jkcyk7XG4gICAgbmV3U2hpcC5hbGxDb29yZHMoKS5mb3JFYWNoKChwb2ludCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IGJvYXJkW3BvaW50WzBdXVtwb2ludFsxXV07XG4gICAgICBjb29yZGluYXRlLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgY29vcmRpbmF0ZS5zaGlwID0gbmV3U2hpcDtcbiAgICB9KTtcbiAgICBhbGxTaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgY29uc3QgaXNIaXQgPSBib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV07XG4gICAgaXNIaXQuaGFzSGl0ID0gdHJ1ZTtcbiAgICBpZiAoaXNIaXQuaGFzU2hpcCkge1xuICAgICAgaXNIaXQuc2hpcC5oaXQoY29vcmRzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IHtcbiAgICBjb25zdCBtaXNzZWRDb29yZGluYXRlcyA9IFtdO1xuICAgIGZvciAobGV0IG91dGVySW5kZXggPSAwOyBvdXRlckluZGV4IDwgQk9BUkRfU0laRTsgb3V0ZXJJbmRleCsrKSB7XG4gICAgICBmb3IgKGxldCBpbm5lckluZGV4ID0gMDsgaW5uZXJJbmRleCA8IEJPQVJEX1NJWkU7IGlubmVySW5kZXgrKykge1xuICAgICAgICBjb25zdCBjb29yZGluYXRlID0gYm9hcmRbb3V0ZXJJbmRleF1baW5uZXJJbmRleF07XG4gICAgICAgIGlmIChjb29yZGluYXRlLmhhc0hpdCAmJiAhY29vcmRpbmF0ZS5oYXNTaGlwKSB7XG4gICAgICAgICAgbWlzc2VkQ29vcmRpbmF0ZXMucHVzaChbb3V0ZXJJbmRleCwgaW5uZXJJbmRleF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtaXNzZWRDb29yZGluYXRlcztcbiAgfTtcblxuICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGFsbFNoaXBTdGF0dXMgPSBhbGxTaGlwcy5tYXAoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpO1xuXG4gICAgcmV0dXJuIGFsbFNoaXBTdGF0dXMuZXZlcnkoKHN0YXR1cykgPT4gc3RhdHVzKTtcbiAgfTtcblxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gIGNvbnN0IHJlbmRlckdhbWVCb2FyZCA9IChET01FbGVtZW50LCBzaG93U2hpcCkgPT4ge1xuICAgIGZvciAobGV0IG91dGVySW5kZXggPSAwOyBvdXRlckluZGV4IDwgQk9BUkRfU0laRTsgb3V0ZXJJbmRleCsrKSB7XG4gICAgICBmb3IgKGxldCBpbm5lckluZGV4ID0gMDsgaW5uZXJJbmRleCA8IEJPQVJEX1NJWkU7IGlubmVySW5kZXgrKykge1xuICAgICAgICBjb25zdCB0b0FkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvQWRkLmRhdGFzZXQucm93ID0gb3V0ZXJJbmRleDtcbiAgICAgICAgdG9BZGQuZGF0YXNldC5jb2x1bW4gPSBpbm5lckluZGV4O1xuXG4gICAgICAgIGNvbnN0IGNvb3JkU3RhdHVzID0gYm9hcmRbb3V0ZXJJbmRleF1baW5uZXJJbmRleF07XG5cbiAgICAgICAgaWYgKHNob3dTaGlwKSB7XG4gICAgICAgICAgaWYgKGNvb3JkU3RhdHVzLmhhc1NoaXApIHtcbiAgICAgICAgICAgIHRvQWRkLnN0eWxlLmJhY2tncm91bmQgPSBzaGlwQ29sb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvb3JkU3RhdHVzLmhhc1NoaXAgJiYgY29vcmRTdGF0dXMuaGFzSGl0KSB7XG4gICAgICAgICAgdG9BZGQuc3R5bGUuYmFja2dyb3VuZCA9IHJlZENvbG9yO1xuICAgICAgICAgIGlmIChjb29yZFN0YXR1cy5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICB0b0FkZC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjb29yZFN0YXR1cy5oYXNIaXQpIHtcbiAgICAgICAgICB0b0FkZC5zdHlsZS5iYWNrZ3JvdW5kID0gYmx1ZUNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgRE9NRWxlbWVudC5hcHBlbmRDaGlsZCh0b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0TWlzc2VkQXR0YWNrcyxcbiAgICBhbGxTdW5rLFxuICAgIGdldEJvYXJkLFxuICAgIHJlbmRlckdhbWVCb2FyZCxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IGdhbWVCb2FyZCwgQk9BUkRfU0laRSB9O1xuIiwiaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5pbXBvcnQgeyBwbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IERPTUludGVyYWN0aW9uIH0gZnJvbSBcIi4vRE9NSW50ZXJhY3Rpb25cIjtcbmltcG9ydCB7IGJsdWVDb2xvciwgcmVkQ29sb3IgfSBmcm9tIFwiLi9oZWxwZXJcIjtcblxuY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XG4gIGNvbnN0IGh1bWFuRE9NQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWFuQm9hcmRcIik7XG4gIGNvbnN0IGNvbXB1dGVyRE9NQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyQm9hcmRcIik7XG4gIGNvbnN0IHRleHREaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0Q29udGVudFwiKS5maXJzdEVsZW1lbnRDaGlsZDtcblxuICBjb25zdCBodW1hbkJvYXJkID0gZ2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXIoY29tcHV0ZXJCb2FyZCk7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gcGxheWVyKGh1bWFuQm9hcmQpO1xuXG4gIGNvbnN0IERPTUFjdGl2aXR5ID0gRE9NSW50ZXJhY3Rpb24oaHVtYW5Cb2FyZCwgaHVtYW5ET01Cb2FyZCwgaHVtYW5QbGF5ZXIpO1xuXG4gIGNvbnN0IGNoZWNrV2lubmVyID0gKCkgPT4ge1xuICAgIGlmIChodW1hbkJvYXJkLmFsbFN1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFN1bmsoKSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGJvYXJkTGlzdGVuZXIgPSAoZXZlbnQsIGJvYXJkKSA9PiB7XG4gICAgaWYgKGh1bWFuUGxheWVyLmN1cnJlbnRUdXJuKCkgJiYgIWNoZWNrV2lubmVyKCkpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhldmVudC50YXJnZXQuZGF0YXNldCkubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBbXG4gICAgICAgIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC5yb3cpLFxuICAgICAgICBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uKSxcbiAgICAgIF07XG5cbiAgICAgIGxldCBlbGVtZW50QmFja2dyb3VuZFN0eWxlID0gZXZlbnQudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQuc3BsaXQoXCIpXCIpWzBdO1xuICAgICAgZWxlbWVudEJhY2tncm91bmRTdHlsZSArPSBcIilcIjtcblxuICAgICAgaWYgKFxuICAgICAgICBlbGVtZW50QmFja2dyb3VuZFN0eWxlID09PSBibHVlQ29sb3IgfHxcbiAgICAgICAgZWxlbWVudEJhY2tncm91bmRTdHlsZSA9PT0gcmVkQ29sb3JcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGUpO1xuXG4gICAgICBjb21wdXRlckRPTUJvYXJkLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICBjb21wdXRlckJvYXJkLnJlbmRlckdhbWVCb2FyZChjb21wdXRlckRPTUJvYXJkLCBmYWxzZSk7XG5cbiAgICAgIGlmIChjaGVja1dpbm5lcigpKSB7XG4gICAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID1cbiAgICAgICAgICBcIkNvbmdyYXR1bGF0aW9ucyEgWW91J3ZlIHdvbiBhbmQgc2FuayBhbGwgdGhlIHNoaXBzIVwiO1xuICAgICAgICB0ZXh0RGlzcGxheS5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XG4gICAgICAgIERPTUFjdGl2aXR5LmFkZFJlc3RhcnRCdXR0b24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBodW1hblBsYXllci5jaGFuZ2VUdXJuKCk7XG5cbiAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gXCJXYWl0IGZvciB0aGUgY29tcHV0ZXIncyB0dXJuIVwiO1xuXG4gICAgICBjb21wdXRlclBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29tcHV0ZXJQbGF5ZXIubWFrZVJhbmRvbU1vdmUoKTtcbiAgICAgICAgaHVtYW5ET01Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBodW1hbkJvYXJkLnJlbmRlckdhbWVCb2FyZChodW1hbkRPTUJvYXJkLCB0cnVlKTtcbiAgICAgICAgaWYgKGNoZWNrV2lubmVyKCkpIHtcbiAgICAgICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICBcIk9oIG5vISBZb3UndmUgbG9zdCBhbmQgYWxsIHlvdXIgc2hpcHMgaGF2ZSBzdW5rIVwiO1xuICAgICAgICAgIHRleHREaXNwbGF5LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcbiAgICAgICAgICBET01BY3Rpdml0eS5hZGRSZXN0YXJ0QnV0dG9uKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbXB1dGVyUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgaHVtYW5QbGF5ZXIuY2hhbmdlVHVybigpO1xuICAgICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgXCJZb3VyIHR1cm4gYWdhaW4hIFRyeSB0byBzaW5rIHlvdXIgb3Bwb25lbnQncyBzaGlwcyFcIjtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfTtcblxuICBjb21wdXRlckRPTUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+XG4gICAgYm9hcmRMaXN0ZW5lcihldmVudCwgY29tcHV0ZXJCb2FyZClcbiAgKTtcblxuICAoZnVuY3Rpb24gaW5pdGFsaXplQ29tcHV0ZXJTaGlwcygpIHtcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbMSwgMV0sXG4gICAgICBbMSwgMl0sXG4gICAgICBbMSwgM10sXG4gICAgICBbMSwgNF0sXG4gICAgICBbMSwgNV0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbMywgM10sXG4gICAgICBbMywgNF0sXG4gICAgICBbMywgNV0sXG4gICAgICBbMywgNl0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbNSwgNF0sXG4gICAgICBbNiwgNF0sXG4gICAgICBbNywgNF0sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbNiwgN10sXG4gICAgICBbNywgN10sXG4gICAgICBbOCwgN10sXG4gICAgXSk7XG5cbiAgICBjb21wdXRlckJvYXJkLnBsYWNlU2hpcChbXG4gICAgICBbOCwgMV0sXG4gICAgICBbOCwgMl0sXG4gICAgXSk7XG4gIH0pKCk7XG5cbiAgRE9NQWN0aXZpdHkuYWRkTW91c2VPdmVyTGlzdGVuZXIoaHVtYW5ET01Cb2FyZCk7XG4gIERPTUFjdGl2aXR5LmFkZE1vdXNlT3V0TGlzdGVuZXIoaHVtYW5ET01Cb2FyZCk7XG4gIERPTUFjdGl2aXR5LmFkZE1vdXNlQ2xpY2tMaXN0ZW5lcihodW1hbkRPTUJvYXJkKTtcblxuICBodW1hbkJvYXJkLnJlbmRlckdhbWVCb2FyZChodW1hbkRPTUJvYXJkLCB0cnVlKTtcbiAgY29tcHV0ZXJCb2FyZC5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJET01Cb2FyZCwgZmFsc2UpO1xufTtcblxuZXhwb3J0IHsgZ2FtZUxvb3AgfTtcbiIsImV4cG9ydCBjb25zdCByZWRDb2xvciA9IFwicmdiKDIwNSwgOTIsIDkyKVwiO1xuZXhwb3J0IGNvbnN0IGJsdWVDb2xvciA9IFwicmdiKDgwLCAxMzcsIDE5OClcIjtcbmV4cG9ydCBjb25zdCBob3ZlckNvbG9yID0gXCJyZ2IoODQsIDE0MCwgMTY4KVwiO1xuZXhwb3J0IGNvbnN0IHNoaXBDb2xvciA9IFwicmdiKDcxLCA5NiwgMTE0KVwiO1xuIiwiaW1wb3J0IHsgQk9BUkRfU0laRSB9IGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuXG5jb25zdCBwbGF5ZXIgPSAoZ2FtZUJvYXJkKSA9PiB7XG4gIGNvbnN0IGVuZW15Qm9hcmQgPSBnYW1lQm9hcmQ7XG4gIGNvbnN0IG1vdmVzTWFkZSA9IFtdO1xuICBsZXQgbGFzdE1vdmVIaXQgPSBmYWxzZTtcbiAgbGV0IHBsYXllclR1cm4gPSBmYWxzZTtcblxuICBjb25zdCByYW5kb21Nb3ZlID0gKCkgPT4gW1xuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX1NJWkUpLFxuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX1NJWkUpLFxuICBdO1xuXG4gIGNvbnN0IHNtYXJ0TW92ZSA9IChjb29yZHMpID0+IHtcbiAgICBjb25zdCBuZXdDb29yZHMgPSBbLi4uY29vcmRzXTtcbiAgICBjb25zdCBvcHRpb25zID0gWzEsIC0xXTtcbiAgICBsZXQgc2luZ2xlQ29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICBuZXdDb29yZHNbc2luZ2xlQ29vcmRdID1cbiAgICAgIGNvb3Jkc1tzaW5nbGVDb29yZF0gKyBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcblxuICAgIHdoaWxlIChuZXdDb29yZHMuaW5jbHVkZXMoLTEpIHx8IG5ld0Nvb3Jkcy5pbmNsdWRlcygxMCkpIHtcbiAgICAgIG5ld0Nvb3Jkc1tzaW5nbGVDb29yZF0gPVxuICAgICAgICBjb29yZHNbc2luZ2xlQ29vcmRdICsgb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgfVxuICAgIHJldHVybiBuZXdDb29yZHM7XG4gIH07XG5cbiAgY29uc3QgbWFrZU1vdmUgPSAoY29vcmRzKSA9PiB7XG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgbWFrZVJhbmRvbU1vdmUgPSAoKSA9PiB7XG4gICAgbGV0IG1vdmU7XG4gICAgbGV0IG1vdmVUcmllcyA9IDA7XG4gICAgaWYgKGxhc3RNb3ZlSGl0KSB7XG4gICAgICBtb3ZlID0gc21hcnRNb3ZlKG1vdmVzTWFkZVttb3Zlc01hZGUubGVuZ3RoIC0gMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3ZlID0gcmFuZG9tTW92ZSgpO1xuICAgIH1cblxuICAgIHdoaWxlIChcbiAgICAgIG1vdmVzTWFkZS5zb21lKFxuICAgICAgICAob2xkTW92ZSkgPT4gb2xkTW92ZVswXSA9PT0gbW92ZVswXSAmJiBvbGRNb3ZlWzFdID09PSBtb3ZlWzFdXG4gICAgICApXG4gICAgKSB7XG4gICAgICBpZiAobGFzdE1vdmVIaXQgJiYgbW92ZVRyaWVzIDwgNikge1xuICAgICAgICBtb3ZlID0gc21hcnRNb3ZlKG1vdmVzTWFkZVttb3Zlc01hZGUubGVuZ3RoIC0gMV0pO1xuICAgICAgICBtb3ZlVHJpZXMrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vdmUgPSByYW5kb21Nb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIG1vdmVzTWFkZS5wdXNoKG1vdmUpO1xuICAgIGNvbnN0IGlzSGl0ID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKG1vdmUpO1xuICAgIGlmIChpc0hpdCkge1xuICAgICAgbGFzdE1vdmVIaXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0TW92ZUhpdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtb3ZlO1xuICB9O1xuXG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7XG4gICAgcGxheWVyVHVybiA9ICFwbGF5ZXJUdXJuO1xuICB9O1xuXG4gIGNvbnN0IGN1cnJlbnRUdXJuID0gKCkgPT4gcGxheWVyVHVybjtcblxuICByZXR1cm4ge1xuICAgIG1ha2VNb3ZlLFxuICAgIG1ha2VSYW5kb21Nb3ZlLFxuICAgIGN1cnJlbnRUdXJuLFxuICAgIGNoYW5nZVR1cm4sXG4gIH07XG59O1xuXG5leHBvcnQgeyBwbGF5ZXIgfTtcbiIsImNvbnN0IGNyZWF0ZVNoaXAgPSAobGVuZ3RoLCBhcnJheUNvb3JkcykgPT4ge1xuICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICBsZXQgc2hpcENvb3JkcyA9IGFycmF5Q29vcmRzLm1hcCgoc3BvdCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBjb29yZHM6IFtzcG90WzBdLCBzcG90WzFdXSxcbiAgICAgIGlzSGl0OiBmYWxzZSxcbiAgICB9O1xuICB9KTtcblxuICBjb25zdCBoaXQgPSAoY29vcmRzKSA9PiB7XG4gICAgc2hpcENvb3JkcyA9IHNoaXBDb29yZHMubWFwKChzcG90KSA9PlxuICAgICAgc3BvdC5jb29yZHNbMF0gPT09IGNvb3Jkc1swXSAmJiBzcG90LmNvb3Jkc1sxXSA9PT0gY29vcmRzWzFdXG4gICAgICAgID8geyAuLi5zcG90LCBpc0hpdDogdHJ1ZSB9XG4gICAgICAgIDogc3BvdFxuICAgICk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gc2hpcENvb3Jkcy5ldmVyeSgoY29vcmQpID0+IGNvb3JkLmlzSGl0KTtcblxuICBjb25zdCBoaXRDb29yZHMgPSAoKSA9PiBzaGlwQ29vcmRzLmZpbHRlcigoY29vcmRzKSA9PiBjb29yZHMuaXNIaXQpO1xuXG4gIGNvbnN0IGdldFNoaXBMZW5ndGggPSAoKSA9PiBzaGlwTGVuZ3RoO1xuXG4gIGNvbnN0IGFsbENvb3JkcyA9ICgpID0+XG4gICAgc2hpcENvb3Jkcy5tYXAoKHBvaW50KSA9PiBbcG9pbnQuY29vcmRzWzBdLCBwb2ludC5jb29yZHNbMV1dKTtcblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgaGl0Q29vcmRzLFxuICAgIGdldFNoaXBMZW5ndGgsXG4gICAgYWxsQ29vcmRzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgY3JlYXRlU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy9yZXNldC5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGVzL3N0eWxlLmNzc1wiO1xuXG5pbXBvcnQgeyBnYW1lTG9vcCB9IGZyb20gXCIuL3NjcmlwdHMvZ2FtZUxvb3BcIjtcblxuZ2FtZUxvb3AoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==