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
const DOMInteraction = () => {
  const shipLengths = [5, 4, 3, 3, 2];
  let shipIndex = 0;
  let shipDimension = "row";
  localStorage.setItem("shipDimension", shipDimension);
  let shipPlacementPossible = false;

  const textDisplay = document.getElementById("textContent").firstElementChild;

  textDisplay.textContent = `Place your ships on the board! Current ship length: ${shipLengths[shipIndex]} places`;

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

      localStorage.setItem("shipDimension", shipDimension);
    });

    humanMainDiv.appendChild(button);
  })();

  return {
    addRestartButton,
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

  const DOMActivity = (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.DOMInteraction)();

  const humanBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  const computerBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_0__.gameBoard)();
  const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.player)(computerBoard);
  const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.player)(humanBoard);

  const shipLengths = [5, 4, 3, 3, 2];
  let shipIndex = 0;
  let shipPlacementPossible = false;

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
    const shipDimension = localStorage.getItem("shipDimension");

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
    const shipDimension = localStorage.getItem("shipDimension");

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
    const shipDimension = localStorage.getItem("shipDimension");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVzQjs7Ozs7OztVQ3BDdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjRCO0FBQ0E7O0FBRWtCOztBQUU5QywyREFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcz9kZDUxIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3N0eWxlLmNzcz8yMzk0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9ET01JbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IERPTUludGVyYWN0aW9uID0gKCkgPT4ge1xuICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgbGV0IHNoaXBJbmRleCA9IDA7XG4gIGxldCBzaGlwRGltZW5zaW9uID0gXCJyb3dcIjtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzaGlwRGltZW5zaW9uXCIsIHNoaXBEaW1lbnNpb24pO1xuICBsZXQgc2hpcFBsYWNlbWVudFBvc3NpYmxlID0gZmFsc2U7XG5cbiAgY29uc3QgdGV4dERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRDb250ZW50XCIpLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgc2hpcHMgb24gdGhlIGJvYXJkISBDdXJyZW50IHNoaXAgbGVuZ3RoOiAke3NoaXBMZW5ndGhzW3NoaXBJbmRleF19IHBsYWNlc2A7XG5cbiAgY29uc3QgYWRkUmVzdGFydEJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaW1lbnNpb25CdXR0b25cIik7XG4gICAgcmVzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIHJlc3RhcnRCdXR0b24udGV4dENvbnRlbnQgPSBcIlBsYXkgYWdhaW4/XCI7XG4gICAgcmVzdGFydEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gbG9jYXRpb24ucmVsb2FkKCk7XG4gIH07XG5cbiAgKGZ1bmN0aW9uIGFkZERpbWVuc2lvbkJ1dHRvbigpIHtcbiAgICBjb25zdCBodW1hbk1haW5EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRDb250ZW50XCIpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgICBidXR0b24uaWQgPSBcImRpbWVuc2lvbkJ1dHRvblwiO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGBDaGFuZ2UgcGxhY2VtZW50IHRvICR7XG4gICAgICBzaGlwRGltZW5zaW9uID09PSBcInJvd1wiID8gXCJyb3dcIiA6IFwiY29sdW1uXCJcbiAgICB9YDtcblxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGltZW5zaW9uQnV0dG9uXCIpO1xuXG4gICAgICBpZiAoY3VycmVudFRleHQudGV4dENvbnRlbnQuaW5jbHVkZXMoXCJyb3dcIikpIHtcbiAgICAgICAgc2hpcERpbWVuc2lvbiA9IFwiY29sdW1uXCI7XG4gICAgICAgIGN1cnJlbnRUZXh0LnRleHRDb250ZW50ID0gXCJDaGFuZ2UgcGxhY2VtZW50IHRvIGNvbHVtblwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcERpbWVuc2lvbiA9IFwicm93XCI7XG4gICAgICAgIGN1cnJlbnRUZXh0LnRleHRDb250ZW50ID0gXCJDaGFuZ2UgcGxhY2VtZW50IHRvIHJvd1wiO1xuICAgICAgfVxuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNoaXBEaW1lbnNpb25cIiwgc2hpcERpbWVuc2lvbik7XG4gICAgfSk7XG5cbiAgICBodW1hbk1haW5EaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfSkoKTtcblxuICByZXR1cm4ge1xuICAgIGFkZFJlc3RhcnRCdXR0b24sXG4gIH07XG59O1xuXG5leHBvcnQgeyBET01JbnRlcmFjdGlvbiB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgQk9BUkRfU0laRSA9IDEwO1xuXG5jb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW107XG5cbiAgKGZ1bmN0aW9uIGluaXRpbGlhemVCb2FyZCgpIHtcbiAgICBmb3IgKGxldCBvdXRlckluZGV4ID0gMDsgb3V0ZXJJbmRleCA8IEJPQVJEX1NJWkU7IG91dGVySW5kZXgrKykge1xuICAgICAgY29uc3QgdG9BZGQgPSBbXTtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIHRvQWRkLnB1c2goe1xuICAgICAgICAgIGhhc1NoaXA6IGZhbHNlLFxuICAgICAgICAgIGhhc0hpdDogZmFsc2UsXG4gICAgICAgICAgc2hpcDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBib2FyZC5wdXNoKHRvQWRkKTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAoY29vcmRzKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRzLmxlbmd0aCwgY29vcmRzKTtcbiAgICBuZXdTaGlwLmFsbENvb3JkcygpLmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICBjb25zdCBjb29yZGluYXRlID0gYm9hcmRbcG9pbnRbMF1dW3BvaW50WzFdXTtcbiAgICAgIGNvb3JkaW5hdGUuaGFzU2hpcCA9IHRydWU7XG4gICAgICBjb29yZGluYXRlLnNoaXAgPSBuZXdTaGlwO1xuICAgIH0pO1xuICAgIGFsbFNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICBjb25zdCBpc0hpdCA9IGJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXTtcbiAgICBpc0hpdC5oYXNIaXQgPSB0cnVlO1xuICAgIGlmIChpc0hpdC5oYXNTaGlwKSB7XG4gICAgICBpc0hpdC5zaGlwLmhpdChjb29yZHMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4ge1xuICAgIGNvbnN0IG1pc3NlZENvb3JkaW5hdGVzID0gW107XG4gICAgZm9yIChsZXQgb3V0ZXJJbmRleCA9IDA7IG91dGVySW5kZXggPCBCT0FSRF9TSVpFOyBvdXRlckluZGV4KyspIHtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBib2FyZFtvdXRlckluZGV4XVtpbm5lckluZGV4XTtcbiAgICAgICAgaWYgKGNvb3JkaW5hdGUuaGFzSGl0ICYmICFjb29yZGluYXRlLmhhc1NoaXApIHtcbiAgICAgICAgICBtaXNzZWRDb29yZGluYXRlcy5wdXNoKFtvdXRlckluZGV4LCBpbm5lckluZGV4XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1pc3NlZENvb3JkaW5hdGVzO1xuICB9O1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgYWxsU2hpcFN0YXR1cyA9IGFsbFNoaXBzLm1hcCgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG5cbiAgICByZXR1cm4gYWxsU2hpcFN0YXR1cy5ldmVyeSgoc3RhdHVzKSA9PiBzdGF0dXMpO1xuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgcmVuZGVyR2FtZUJvYXJkID0gKERPTUVsZW1lbnQsIHNob3dTaGlwKSA9PiB7XG4gICAgZm9yIChsZXQgb3V0ZXJJbmRleCA9IDA7IG91dGVySW5kZXggPCBCT0FSRF9TSVpFOyBvdXRlckluZGV4KyspIHtcbiAgICAgIGZvciAobGV0IGlubmVySW5kZXggPSAwOyBpbm5lckluZGV4IDwgQk9BUkRfU0laRTsgaW5uZXJJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHRvQWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdG9BZGQuZGF0YXNldC5yb3cgPSBvdXRlckluZGV4O1xuICAgICAgICB0b0FkZC5kYXRhc2V0LmNvbHVtbiA9IGlubmVySW5kZXg7XG5cbiAgICAgICAgY29uc3QgY29vcmRTdGF0dXMgPSBib2FyZFtvdXRlckluZGV4XVtpbm5lckluZGV4XTtcblxuICAgICAgICBpZiAoc2hvd1NoaXApIHtcbiAgICAgICAgICBpZiAoY29vcmRTdGF0dXMuaGFzU2hpcCkge1xuICAgICAgICAgICAgdG9BZGQuc3R5bGUuYmFja2dyb3VuZCA9IFwiIzQ3NjA3MlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb29yZFN0YXR1cy5oYXNTaGlwICYmIGNvb3JkU3RhdHVzLmhhc0hpdCkge1xuICAgICAgICAgIHRvQWRkLnN0eWxlLmJhY2tncm91bmQgPSBcImluZGlhbnJlZFwiO1xuICAgICAgICAgIGlmIChjb29yZFN0YXR1cy5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICB0b0FkZC50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjb29yZFN0YXR1cy5oYXNIaXQpIHtcbiAgICAgICAgICB0b0FkZC5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjNTA4OUM2XCI7XG4gICAgICAgIH1cblxuICAgICAgICBET01FbGVtZW50LmFwcGVuZENoaWxkKHRvQWRkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRNaXNzZWRBdHRhY2tzLFxuICAgIGFsbFN1bmssXG4gICAgZ2V0Qm9hcmQsXG4gICAgcmVuZGVyR2FtZUJvYXJkLFxuICB9O1xufTtcblxuZXhwb3J0IHsgZ2FtZUJvYXJkLCBCT0FSRF9TSVpFIH07XG4iLCJpbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcbmltcG9ydCB7IHBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgRE9NSW50ZXJhY3Rpb24gfSBmcm9tIFwiLi9ET01JbnRlcmFjdGlvblwiO1xuXG5jb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcbiAgY29uc3QgaHVtYW5ET01Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHVtYW5Cb2FyZFwiKTtcbiAgY29uc3QgY29tcHV0ZXJET01Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXJCb2FyZFwiKTtcbiAgY29uc3QgdGV4dERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRDb250ZW50XCIpLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gIGNvbnN0IERPTUFjdGl2aXR5ID0gRE9NSW50ZXJhY3Rpb24oKTtcblxuICBjb25zdCBodW1hbkJvYXJkID0gZ2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBnYW1lQm9hcmQoKTtcbiAgY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXIoY29tcHV0ZXJCb2FyZCk7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gcGxheWVyKGh1bWFuQm9hcmQpO1xuXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xuICBsZXQgc2hpcEluZGV4ID0gMDtcbiAgbGV0IHNoaXBQbGFjZW1lbnRQb3NzaWJsZSA9IGZhbHNlO1xuXG4gIGNvbnN0IGNoZWNrV2lubmVyID0gKCkgPT4ge1xuICAgIGlmIChodW1hbkJvYXJkLmFsbFN1bmsoKSB8fCBjb21wdXRlckJvYXJkLmFsbFN1bmsoKSkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGJvYXJkTGlzdGVuZXIgPSAoZXZlbnQsIGJvYXJkKSA9PiB7XG4gICAgaWYgKGh1bWFuUGxheWVyLmN1cnJlbnRUdXJuKCkpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhldmVudC50YXJnZXQuZGF0YXNldCkubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBbXG4gICAgICAgIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC5yb3cpLFxuICAgICAgICBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uKSxcbiAgICAgIF07XG5cbiAgICAgIGlmIChcbiAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPT09IFwiYmx1ZVwiIHx8XG4gICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID09PSBcInJlZFwiXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlKTtcblxuICAgICAgY29tcHV0ZXJET01Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgY29tcHV0ZXJCb2FyZC5yZW5kZXJHYW1lQm9hcmQoY29tcHV0ZXJET01Cb2FyZCwgZmFsc2UpO1xuXG4gICAgICBpZiAoY2hlY2tXaW5uZXIoKSkge1xuICAgICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgXCJDb25ncmF0dWxhdGlvbnMhIFlvdSd2ZSB3b24gYW5kIHNhbmsgYWxsIHRoZSBzaGlwcyFcIjtcbiAgICAgICAgdGV4dERpc3BsYXkuc3R5bGUuZm9udFdlaWdodCA9IFwiYm9sZFwiO1xuICAgICAgICBET01BY3Rpdml0eS5hZGRSZXN0YXJ0QnV0dG9uKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaHVtYW5QbGF5ZXIuY2hhbmdlVHVybigpO1xuXG4gICAgICB0ZXh0RGlzcGxheS50ZXh0Q29udGVudCA9IFwiV2FpdCBmb3IgdGhlIGNvbXB1dGVyJ3MgdHVybiFcIjtcblxuICAgICAgY29tcHV0ZXJQbGF5ZXIuY2hhbmdlVHVybigpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbXB1dGVyUGxheWVyLm1ha2VSYW5kb21Nb3ZlKCk7XG4gICAgICAgIGh1bWFuRE9NQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgaHVtYW5Cb2FyZC5yZW5kZXJHYW1lQm9hcmQoaHVtYW5ET01Cb2FyZCwgdHJ1ZSk7XG4gICAgICAgIGlmIChjaGVja1dpbm5lcigpKSB7XG4gICAgICAgICAgdGV4dERpc3BsYXkudGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgXCJPaCBubyEgWW91J3ZlIGxvc3QgYW5kIGFsbCB5b3VyIHNoaXBzIGhhdmUgc3VuayFcIjtcbiAgICAgICAgICB0ZXh0RGlzcGxheS5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XG4gICAgICAgICAgRE9NQWN0aXZpdHkuYWRkUmVzdGFydEJ1dHRvbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb21wdXRlclBsYXllci5jaGFuZ2VUdXJuKCk7XG4gICAgICAgIGh1bWFuUGxheWVyLmNoYW5nZVR1cm4oKTtcbiAgICAgICAgdGV4dERpc3BsYXkudGV4dENvbnRlbnQgPVxuICAgICAgICAgIFwiWW91ciB0dXJuIGFnYWluISBUcnkgdG8gc2luayB5b3VyIG9wcG9uZW50J3Mgc2hpcHMhXCI7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gIH07XG5cbiAgY29tcHV0ZXJET01Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PlxuICAgIGJvYXJkTGlzdGVuZXIoZXZlbnQsIGNvbXB1dGVyQm9hcmQpXG4gICk7XG5cbiAgLy8gU2V0IHVwIGZvciBpbml0aWFsIGdhbWVwbGF5XG4gIChmdW5jdGlvbiBpbml0aWFsaXphdGlvblNoaXBzKCkge1xuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFsxLCAxXSxcbiAgICAgIFsxLCAyXSxcbiAgICAgIFsxLCAzXSxcbiAgICAgIFsxLCA0XSxcbiAgICAgIFsxLCA1XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFszLCAzXSxcbiAgICAgIFszLCA0XSxcbiAgICAgIFszLCA1XSxcbiAgICAgIFszLCA2XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFs1LCA0XSxcbiAgICAgIFs2LCA0XSxcbiAgICAgIFs3LCA0XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFs2LCA3XSxcbiAgICAgIFs3LCA3XSxcbiAgICAgIFs4LCA3XSxcbiAgICBdKTtcblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKFtcbiAgICAgIFs4LCAxXSxcbiAgICAgIFs4LCAyXSxcbiAgICBdKTtcbiAgfSkoKTtcblxuICBjb25zdCBtb3VzZU92ZXJIdW1hbkJvYXJkID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBzaGlwRGltZW5zaW9uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzaGlwRGltZW5zaW9uXCIpO1xuXG4gICAgaWYgKHNoaXBJbmRleCA9PT0gc2hpcExlbmd0aHMubGVuZ3RoKSB7XG4gICAgICBodW1hbkRPTUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgbW91c2VPdmVySHVtYW5Cb2FyZCk7XG4gICAgICBodW1hbkRPTUJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBtb3VzZU91dEh1bWFuQm9hcmQpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW91c2VDbGlja0h1bWFuQm9hcmQpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaW1lbnNpb25CdXR0b25cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgaHVtYW5QbGF5ZXIuY2hhbmdlVHVybigpO1xuICAgICAgdGV4dERpc3BsYXkudGV4dENvbnRlbnQgPSBcIllvdXIgdHVybiEgVHJ5IHRvIHNpbmsgeW91ciBvcHBvbmVudCdzIHNoaXBzIVwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlckJvYXJkXCIpLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCkge1xuICAgICAgY29uc3Qgc2hpcFRvUGFpbnQgPSBzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdO1xuXG4gICAgICBjb25zdCBkaXZzVG9QYWludCA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgc2hpcFRvUGFpbnQ7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgbmV3Q29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgcm93OiBOdW1iZXIoZWxlbWVudC5kYXRhc2V0LnJvdyksXG4gICAgICAgICAgY29sdW1uOiBOdW1iZXIoZWxlbWVudC5kYXRhc2V0LmNvbHVtbiksXG4gICAgICAgIH07XG4gICAgICAgIG5ld0Nvb3JkaW5hdGVzW3NoaXBEaW1lbnNpb25dID0gbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gKyBpbmRleDtcbiAgICAgICAgbGV0IHRvQ29sb3JFbGVtZW50O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdG9Db2xvckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYFtkYXRhLXJvdz1cIiR7bmV3Q29vcmRpbmF0ZXMucm93fVwiXVtkYXRhLWNvbHVtbj1cIiR7bmV3Q29vcmRpbmF0ZXMuY29sdW1ufVwiXWBcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHRvQ29sb3JFbGVtZW50ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9Db2xvckVsZW1lbnQgJiYgIXRvQ29sb3JFbGVtZW50LnN0eWxlLmJhY2tncm91bmQpIHtcbiAgICAgICAgICBkaXZzVG9QYWludC5wdXNoKHRvQ29sb3JFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkaXZzVG9QYWludC5sZW5ndGggPT09IHNoaXBUb1BhaW50IC0gMSkge1xuICAgICAgICAgIGRpdnNUb1BhaW50LmZvckVhY2goXG4gICAgICAgICAgICAocGFpbnRFbGVtZW50KSA9PlxuICAgICAgICAgICAgICAocGFpbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcInJnYig4NCwgMTQwLCAxNjgpXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcInJnYig4NCwgMTQwLCAxNjgpXCI7XG4gICAgICAgICAgc2hpcFBsYWNlbWVudFBvc3NpYmxlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50LmlkICE9PSBcImh1bWFuQm9hcmRcIikge1xuICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwiaW5kaWFucmVkXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbW91c2VPdXRIdW1hbkJvYXJkID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBzaGlwRGltZW5zaW9uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzaGlwRGltZW5zaW9uXCIpO1xuXG4gICAgaWYgKFxuICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID09PSBcInJnYig4NCwgMTQwLCAxNjgpXCIgfHxcbiAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9PT0gXCJpbmRpYW5yZWRcIlxuICAgICkge1xuICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcblxuICAgICAgY29uc3Qgc2hpcFRvUGFpbnQgPSBzaGlwTGVuZ3Roc1tzaGlwSW5kZXhdO1xuXG4gICAgICBpZiAoc2hpcFBsYWNlbWVudFBvc3NpYmxlKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBzaGlwVG9QYWludDsgaW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgcm93OiBOdW1iZXIoZWxlbWVudC5kYXRhc2V0LnJvdyksXG4gICAgICAgICAgICBjb2x1bW46IE51bWJlcihlbGVtZW50LmRhdGFzZXQuY29sdW1uKSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzW3NoaXBEaW1lbnNpb25dID0gbmV3Q29vcmRpbmF0ZXNbc2hpcERpbWVuc2lvbl0gKyBpbmRleDtcbiAgICAgICAgICBjb25zdCB0b0NvbG9yRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcm93PVwiJHtuZXdDb29yZGluYXRlcy5yb3d9XCJdW2RhdGEtY29sdW1uPVwiJHtuZXdDb29yZGluYXRlcy5jb2x1bW59XCJdYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdG9Db2xvckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgbW91c2VDbGlja0h1bWFuQm9hcmQgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgIGNvbnN0IHNoaXBEaW1lbnNpb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNoaXBEaW1lbnNpb25cIik7XG4gICAgY29uc3QgcGxhY2VtZW50Q29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGlmIChzaGlwUGxhY2VtZW50UG9zc2libGUpIHtcbiAgICAgIGNvbnN0IHNoaXBUb1BhaW50ID0gc2hpcExlbmd0aHNbc2hpcEluZGV4XTtcbiAgICAgIGNvbnN0IHN0cmluZ0Nvb3JkaW5hdGUgPSBlbGVtZW50LmRhdGFzZXQ7XG4gICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZSA9IFtcbiAgICAgICAgTnVtYmVyKHN0cmluZ0Nvb3JkaW5hdGUucm93KSxcbiAgICAgICAgTnVtYmVyKHN0cmluZ0Nvb3JkaW5hdGUuY29sdW1uKSxcbiAgICAgIF07XG4gICAgICBwbGFjZW1lbnRDb29yZGluYXRlcy5wdXNoKGN1cnJlbnRDb29yZGluYXRlKTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IHNoaXBUb1BhaW50OyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5leHRDb29yZGluYXRlID0gWy4uLmN1cnJlbnRDb29yZGluYXRlXTtcbiAgICAgICAgY29uc3QgZGltZW5zaW9uID0gc2hpcERpbWVuc2lvbiA9PT0gXCJyb3dcIiA/IDAgOiAxO1xuICAgICAgICBuZXh0Q29vcmRpbmF0ZVtkaW1lbnNpb25dID0gbmV4dENvb3JkaW5hdGVbZGltZW5zaW9uXSArIGluZGV4O1xuICAgICAgICBwbGFjZW1lbnRDb29yZGluYXRlcy5wdXNoKG5leHRDb29yZGluYXRlKTtcbiAgICAgIH1cblxuICAgICAgaHVtYW5Cb2FyZC5wbGFjZVNoaXAocGxhY2VtZW50Q29vcmRpbmF0ZXMpO1xuICAgICAgaHVtYW5ET01Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgaHVtYW5Cb2FyZC5yZW5kZXJHYW1lQm9hcmQoaHVtYW5ET01Cb2FyZCwgdHJ1ZSk7XG4gICAgICBzaGlwSW5kZXgrKztcbiAgICAgIHRleHREaXNwbGF5LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgc2hpcHMgb24gdGhlIGJvYXJkISBDdXJyZW50IHNoaXAgbGVuZ3RoOiAke3NoaXBMZW5ndGhzW3NoaXBJbmRleF19IHBsYWNlc2A7XG4gICAgICBzaGlwUGxhY2VtZW50UG9zc2libGUgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgaHVtYW5ET01Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG1vdXNlT3Zlckh1bWFuQm9hcmQpO1xuICBodW1hbkRPTUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBtb3VzZU91dEh1bWFuQm9hcmQpO1xuICBodW1hbkRPTUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb3VzZUNsaWNrSHVtYW5Cb2FyZCk7XG5cbiAgaHVtYW5Cb2FyZC5yZW5kZXJHYW1lQm9hcmQoaHVtYW5ET01Cb2FyZCwgdHJ1ZSk7XG4gIGNvbXB1dGVyQm9hcmQucmVuZGVyR2FtZUJvYXJkKGNvbXB1dGVyRE9NQm9hcmQsIGZhbHNlKTtcbn07XG5cbmV4cG9ydCB7IGdhbWVMb29wIH07XG4iLCJpbXBvcnQgeyBCT0FSRF9TSVpFIH0gZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5cbmNvbnN0IHBsYXllciA9IChnYW1lQm9hcmQpID0+IHtcbiAgY29uc3QgZW5lbXlCb2FyZCA9IGdhbWVCb2FyZDtcbiAgY29uc3QgbW92ZXNNYWRlID0gW107XG4gIGxldCBsYXN0TW92ZUhpdCA9IGZhbHNlO1xuICBsZXQgcGxheWVyVHVybiA9IGZhbHNlO1xuXG4gIGNvbnN0IHJhbmRvbU1vdmUgPSAoKSA9PiBbXG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQk9BUkRfU0laRSksXG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQk9BUkRfU0laRSksXG4gIF07XG5cbiAgY29uc3Qgc21hcnRNb3ZlID0gKGNvb3JkcykgPT4ge1xuICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFsuLi5jb29yZHNdO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbMSwgLTFdO1xuICAgIGxldCBzaW5nbGVDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgIG5ld0Nvb3Jkc1tzaW5nbGVDb29yZF0gPVxuICAgICAgY29vcmRzW3NpbmdsZUNvb3JkXSArIG9wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xuXG4gICAgd2hpbGUgKG5ld0Nvb3Jkcy5pbmNsdWRlcygtMSkgfHwgbmV3Q29vcmRzLmluY2x1ZGVzKDEwKSkge1xuICAgICAgbmV3Q29vcmRzW3NpbmdsZUNvb3JkXSA9XG4gICAgICAgIGNvb3Jkc1tzaW5nbGVDb29yZF0gKyBvcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0Nvb3JkcztcbiAgfTtcblxuICBjb25zdCBtYWtlTW92ZSA9IChjb29yZHMpID0+IHtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBtYWtlUmFuZG9tTW92ZSA9ICgpID0+IHtcbiAgICBsZXQgbW92ZTtcbiAgICBsZXQgbW92ZVRyaWVzID0gMDtcbiAgICBpZiAobGFzdE1vdmVIaXQpIHtcbiAgICAgIG1vdmUgPSBzbWFydE1vdmUobW92ZXNNYWRlW21vdmVzTWFkZS5sZW5ndGggLSAxXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vdmUgPSByYW5kb21Nb3ZlKCk7XG4gICAgfVxuXG4gICAgd2hpbGUgKFxuICAgICAgbW92ZXNNYWRlLnNvbWUoXG4gICAgICAgIChvbGRNb3ZlKSA9PiBvbGRNb3ZlWzBdID09PSBtb3ZlWzBdICYmIG9sZE1vdmVbMV0gPT09IG1vdmVbMV1cbiAgICAgIClcbiAgICApIHtcbiAgICAgIGlmIChsYXN0TW92ZUhpdCAmJiBtb3ZlVHJpZXMgPCA2KSB7XG4gICAgICAgIG1vdmUgPSBzbWFydE1vdmUobW92ZXNNYWRlW21vdmVzTWFkZS5sZW5ndGggLSAxXSk7XG4gICAgICAgIG1vdmVUcmllcysrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW92ZSA9IHJhbmRvbU1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbW92ZXNNYWRlLnB1c2gobW92ZSk7XG4gICAgY29uc3QgaXNIaXQgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2sobW92ZSk7XG4gICAgaWYgKGlzSGl0KSB7XG4gICAgICBsYXN0TW92ZUhpdCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RNb3ZlSGl0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vdmU7XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+IHtcbiAgICBwbGF5ZXJUdXJuID0gIXBsYXllclR1cm47XG4gIH07XG5cbiAgY29uc3QgY3VycmVudFR1cm4gPSAoKSA9PiBwbGF5ZXJUdXJuO1xuXG4gIHJldHVybiB7XG4gICAgbWFrZU1vdmUsXG4gICAgbWFrZVJhbmRvbU1vdmUsXG4gICAgY3VycmVudFR1cm4sXG4gICAgY2hhbmdlVHVybixcbiAgfTtcbn07XG5cbmV4cG9ydCB7IHBsYXllciB9O1xuIiwiY29uc3QgY3JlYXRlU2hpcCA9IChsZW5ndGgsIGFycmF5Q29vcmRzKSA9PiB7XG4gIGNvbnN0IHNoaXBMZW5ndGggPSBsZW5ndGg7XG4gIGxldCBzaGlwQ29vcmRzID0gYXJyYXlDb29yZHMubWFwKChzcG90KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvb3JkczogW3Nwb3RbMF0sIHNwb3RbMV1dLFxuICAgICAgaXNIaXQ6IGZhbHNlLFxuICAgIH07XG4gIH0pO1xuXG4gIGNvbnN0IGhpdCA9IChjb29yZHMpID0+IHtcbiAgICBzaGlwQ29vcmRzID0gc2hpcENvb3Jkcy5tYXAoKHNwb3QpID0+XG4gICAgICBzcG90LmNvb3Jkc1swXSA9PT0gY29vcmRzWzBdICYmIHNwb3QuY29vcmRzWzFdID09PSBjb29yZHNbMV1cbiAgICAgICAgPyB7IC4uLnNwb3QsIGlzSGl0OiB0cnVlIH1cbiAgICAgICAgOiBzcG90XG4gICAgKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBzaGlwQ29vcmRzLmV2ZXJ5KChjb29yZCkgPT4gY29vcmQuaXNIaXQpO1xuXG4gIGNvbnN0IGhpdENvb3JkcyA9ICgpID0+IHNoaXBDb29yZHMuZmlsdGVyKChjb29yZHMpID0+IGNvb3Jkcy5pc0hpdCk7XG5cbiAgY29uc3QgZ2V0U2hpcExlbmd0aCA9ICgpID0+IHNoaXBMZW5ndGg7XG5cbiAgY29uc3QgYWxsQ29vcmRzID0gKCkgPT5cbiAgICBzaGlwQ29vcmRzLm1hcCgocG9pbnQpID0+IFtwb2ludC5jb29yZHNbMF0sIHBvaW50LmNvb3Jkc1sxXV0pO1xuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgICBoaXRDb29yZHMsXG4gICAgZ2V0U2hpcExlbmd0aCxcbiAgICBhbGxDb29yZHMsXG4gIH07XG59O1xuXG5leHBvcnQgeyBjcmVhdGVTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL3Jlc2V0LmNzc1wiO1xuaW1wb3J0IFwiLi9zdHlsZXMvc3R5bGUuY3NzXCI7XG5cbmltcG9ydCB7IGdhbWVMb29wIH0gZnJvbSBcIi4vc2NyaXB0cy9nYW1lTG9vcFwiO1xuXG5nYW1lTG9vcCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9