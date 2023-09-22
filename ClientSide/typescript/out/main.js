"use strict";
var Calculator = /** @class */ (function () {
    // constructor
    function Calculator() {
        var _this = this;
        // initailize variables
        this.currentInput = "";
        this.previousInput = "";
        this.currentOperation = null;
        this.currentOperand = null;
        this.previousOperand = null;
        // get elements
        this.currentOperand = document.getElementById("current-operand");
        this.previousOperand = document.getElementById("previous-operand");
        var clearButton = document.getElementById("clear");
        var deleteButton = document.getElementById("delete");
        var operationButtons = document.querySelectorAll(".operation-button");
        var numberButtons = document.querySelectorAll(".number-button");
        var calculateButton = document.getElementById("calculate");
        this.updateDisplay();
        // Button click
        numberButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                _this.numberButtonClick(button.textContent || "");
            });
        });
        operationButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                _this.operationButtonClick(button.textContent || "");
            });
        });
        clearButton.addEventListener("click", function () {
            _this.clear();
        });
        deleteButton.addEventListener("click", function () {
            _this.delete();
        });
        calculateButton.addEventListener("click", function () {
            _this.calculate();
        });
    }
    Calculator.prototype.updateDisplay = function () {
        if (this.currentOperand && this.previousOperand) {
            this.currentOperand.textContent = this.currentInput;
            if (this.currentOperation) {
                this.previousOperand.textContent = "".concat(this.previousInput, " ").concat(this.currentOperation);
            }
            else {
                this.previousOperand.textContent = "";
            }
        }
    };
    Calculator.prototype.numberButtonClick = function (value) {
        if (this.currentInput === "0" && value === "0") {
            return;
        }
        this.currentInput += value;
        this.updateDisplay();
    };
    Calculator.prototype.operationButtonClick = function (operation) {
        if (this.currentInput === "") {
            return;
        }
        if (this.currentOperation) {
            this.previousInput = this.currentInput;
            this.currentInput = "";
            this.currentOperation = operation;
            this.updateDisplay();
        }
        else {
            this.currentOperation = operation;
            this.previousInput = this.currentInput;
            this.currentInput = "";
            this.updateDisplay();
        }
    };
    Calculator.prototype.clear = function () {
        this.currentInput = "";
        this.previousInput = "";
        this.currentOperation = null;
        this.updateDisplay();
    };
    Calculator.prototype.delete = function () {
        this.currentInput = this.currentInput.slice(0, -1);
        this.updateDisplay();
    };
    Calculator.prototype.calculate = function () {
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
                }
                else {
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
    };
    return Calculator;
}());
var calculator = new Calculator();
