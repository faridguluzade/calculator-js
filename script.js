"use strict";

const display = document.querySelector(".calculator-screen");
const keys = document.querySelector(".calculator-keys");

const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

/////

const updateDisplay = function () {
  display.value = calculator.displayValue;
};
updateDisplay();

const resetCalculator = function () {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
};

//////

const calculate = function (firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+": {
      return firstOperand + secondOperand;
    }
    case "-": {
      return firstOperand - secondOperand;
    }
    case "*": {
      return firstOperand * secondOperand;
    }
    case "/": {
      return firstOperand / secondOperand;
    }
    default: {
      return secondOperand;
    }
  }
};

///////

const inputDigit = function (digit) {
  let { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
};

/////

const inputDecimal = function (dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
};

//////

const handleOperator = function (nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;

  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  }

  if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = parseFloat(result.toFixed(7));
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
};

keys.addEventListener("click", function (event) {
  const { target } = event;

  if (!target.matches("button")) return;

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("all-clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
