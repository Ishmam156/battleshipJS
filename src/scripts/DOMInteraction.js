import { redColor, hoverColor } from "./helper";

// Factory Function to handle main DOM Interaction
const DOMInteraction = (humanBoard, humanDOMBoard, humanPlayer) => {
  const shipLengths = [5, 4, 3, 3, 2];
  let shipIndex = 0;
  let shipDimension = "row";
  let shipPlacementPossible = false;

  // Initial text display to guide placement of ships
  const computerDOMBoard = document.getElementById("computerBoard");
  const textDisplay = document.getElementById("textContent").firstElementChild;
  textDisplay.textContent = `Place your ships on the board! Current ship length: ${shipLengths[shipIndex]} places`;

  // Show only the humanBoard at initial stage
  computerDOMBoard.parentElement.style.display = "none";

  const addRestartButton = () => {
    const restartButton = document.getElementById("dimensionButton");
    restartButton.style.display = "block";
    restartButton.textContent = "Play again?";
    restartButton.onclick = () => location.reload();
  };

  // Button that enables switching between row and column placement
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

    // Once all ships have been placed, clear up the current listeners and start the game
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

      // Generate list of co-ordinates based on shipLength and current hovered over cell
      for (let index = 1; index < shipToPaint; index++) {
        const newCoordinates = {
          row: Number(element.dataset.row),
          column: Number(element.dataset.column),
        };
        newCoordinates[shipDimension] = newCoordinates[shipDimension] + index;
        let toColorElement;

        // Check if current ship placement is possible
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
        // If placement possible, color the cells with hoverColor
        if (divsToPaint.length === shipToPaint - 1) {
          divsToPaint.forEach(
            (paintElement) => (paintElement.style.background = hoverColor)
          );
          element.style.background = hoverColor;
          shipPlacementPossible = true;
        } else if (element.id !== "humanBoard") {
          element.style.background = redColor;
        }
      }
    }
  };

  const mouseOutHumanBoard = (event) => {
    const element = event.target;
    let elementBackgroundStyle = element.style.background.split(")")[0];
    elementBackgroundStyle += ")";

    // Remove the color of the previously highlighted cell
    if (
      elementBackgroundStyle === hoverColor ||
      elementBackgroundStyle === redColor
    ) {
      element.style.background = "";

      const shipToPaint = shipLengths[shipIndex];

      // If the previous highlighted cell was a legal move, then also remove the other highlighted cells
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

    // If highlighted cell ends up as legal move, create full co-ordinate list and place ship
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

export { DOMInteraction };
