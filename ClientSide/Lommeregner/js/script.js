const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const historyList = document.getElementById("history-list");
const showHistoryButton = document.getElementById("show-history-button");
const calHistoryDiv = document.querySelector(".cal-history");

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delet() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.saveToHistory(computation);
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerNumber = parseFloat(stringNumber.split(".")[0]);
    const decimalNumber = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerNumber)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerNumber.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalNumber != null) {
      return `${integerDisplay}.${decimalNumber}`;
    } else {
      return integerDisplay;
    }
  }

  //--- Save to history ---//
  saveToHistory(result) {
    const historyItem = {
      calculation: `${this.getDisplayNumber(this.previousOperand)} ${
        this.operation
      } ${this.getDisplayNumber(this.currentOperand)}`,
      result: result,
    };

    calculationHistory.push(historyItem);

    this.updateHistoryDisplay();
  }

  updateHistoryDisplay() {
    historyList.innerHTML = "";
    calculationHistory.forEach((historyItem, index) => {
      const listItems = document.createElement("p");
      listItems.textContent = `[ ${historyItem.calculation} ] = [ ${historyItem.result} ]`;
      historyList.appendChild(listItems);
    });
  }

  restoreFromHistory(index) {
    const selectedHistoryItem = calculationHistory[index];
    this.currentOperand = selectedHistoryItem.result.toString();

    const [prevOperand, operation, currentOperand] =
      selectedHistoryItem.calculation.split(" ");
    this.previousOperand = prevOperand;
    this.operation = operation;
    this.currentOperand = currentOperand;

    // Update the display with the restored calculation
    this.updateDisplay();
  }
}

//--- Event listner ---//
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//Delete the last number
deleteButton.addEventListener("click", (button) => {
  calculator.delet();
  calculator.updateDisplay();
});

//Add a number to the display
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

//Choose an operation
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//Compute the result
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

//All clear
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

//--- History ---//
const calculationHistory = [];

historyList.addEventListener("click", (e) => {
  if (e.target.tagName === "P") {
    const selectedHistoryIndex = Array.from(historyList.children).indexOf(
      e.target
    );
    calculator.restoreFromHistory(selectedHistoryIndex);
  }
});

showHistoryButton.addEventListener("click", function () {
  if (calculationHistory.length === 0) {
    alert("Dine regnestykker og resultater vises her, så du kan genbruge dem ");
    return;
  }
  if (calHistoryDiv.style.display === "none") {
    calHistoryDiv.style.display = "block";
    showHistoryButton.textContent = "Skjule historie";
  } else {
    calHistoryDiv.style.display = "none";
    showHistoryButton.textContent = "Vis historie";
  }
});

document.addEventListener(
  "keypress",
  (event) => {
    var name = event.key;

    const acceptableNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const acceptableOperation = ["+", "-", "*", "/", "="];

    if (acceptableNumber.includes(Number(name))) {
      calculator.appendNumber(name);
      calculator.updateDisplay();
    }
    if (acceptableOperation.includes(name)) {
      if (name === "/") {
        name = "÷";
      }
      calculator.chooseOperation(name);
      calculator.updateDisplay();
    }
    if (name === "Enter") {
      calculator.compute();
      calculator.updateDisplay();
    } else return;
  },
  false
);
