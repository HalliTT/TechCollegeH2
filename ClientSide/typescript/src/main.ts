class Calculator {
    // initailize variables
    private currentInput: string = "";
    private previousInput: string = "";
    private currentOperation: string | null = null;
    private currentOperand: HTMLDivElement | null = null;
    private previousOperand: HTMLDivElement | null = null;

    // constructor
    constructor() {
        // get elements
        this.currentOperand = document.getElementById("current-operand") as HTMLDivElement;
        this.previousOperand = document.getElementById("previous-operand") as HTMLDivElement;

        const clearButton = document.getElementById("clear") as HTMLButtonElement;
        const deleteButton = document.getElementById("delete") as HTMLButtonElement;
        const operationButtons = document.querySelectorAll(".operation-button") as NodeListOf<HTMLButtonElement>;
        const numberButtons = document.querySelectorAll(".number-button") as NodeListOf<HTMLButtonElement>;
        const calculateButton = document.getElementById("calculate") as HTMLButtonElement;

        this.updateDisplay();

        // Button click
        numberButtons.forEach((button) => {
            button.addEventListener("click", () => {
                this.numberButtonClick(button.textContent || "");
            });
        });

        operationButtons.forEach((button) => {
            button.addEventListener("click", () => {
                this.operationButtonClick(button.textContent || "");
            });
        });

        clearButton.addEventListener("click", () => {
            this.clear();
        });

        deleteButton.addEventListener("click", () => {
            this.delete();
        });

        calculateButton.addEventListener("click", () => {
            this.calculate();
        });
    }

    private updateDisplay() {
        if (this.currentOperand && this.previousOperand) {
            this.currentOperand.textContent = this.currentInput;
            if (this.currentOperation) {
                this.previousOperand.textContent = `${this.previousInput} ${this.currentOperation}`;
            } else {
                this.previousOperand.textContent = "";
            }
        }
    }

    private numberButtonClick(value: string) {
        if (this.currentInput === "0" && value === "0") {
            return;
        }
        this.currentInput += value;
        this.updateDisplay();
    }

    private operationButtonClick(operation: string) {
        if (this.currentInput === "") {
            return;
        }
        if (this.currentOperation) {
            this.previousInput = this.currentInput;
            this.currentInput = "";
            this.currentOperation = operation;
            this.updateDisplay();
        } else {
            this.currentOperation = operation;
            this.previousInput = this.currentInput;
            this.currentInput = "";
            this.updateDisplay();
        }
    }

    private clear() {
        this.currentInput = "";
        this.previousInput = "";
        this.currentOperation = null;
        this.updateDisplay();
    }

    private delete() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.updateDisplay();
    }

    private calculate() {
        if (this.currentInput === "" || this.previousInput === "" || this.currentOperation === null) {
            return;
        }

        switch (this.currentOperation) {
            case "+":
                this.currentInput = (parseFloat(this.previousInput) + parseFloat(this.currentInput)).toString();
                break;
            case "-":
                this.currentInput = (parseFloat(this.previousInput) - parseFloat(this.currentInput)).toString();
                break;
            case "*":
                this.currentInput = (parseFloat(this.previousInput) * parseFloat(this.currentInput)).toString();
                break;
            case "÷":
                if (this.currentInput === "0") {
                    this.currentInput = "Error - Division by zero ";
                } else {
                    this.currentInput = (parseFloat(this.previousInput) / parseFloat(this.currentInput)).toString();
                }
                break;
            default:
                this.currentInput = "Error";
                break;
        }

        this.previousInput = "";
        this.currentOperation = null;
        this.updateDisplay();
    }
}

const calculator = new Calculator();
