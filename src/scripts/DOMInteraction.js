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

export { DOMInteraction };
