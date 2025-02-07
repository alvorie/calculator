import { keyMap } from "./keyMap.js";

document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector(".calculator__screen");
  const buttons = document.querySelectorAll(".calculator__button");
  let expression = "";

  const handleButtonPress = (value) => {
    if (expression === "Error") {
      expression = "";
    }
    if (value === "C") {
      expression = "";
    } else if (value === "=") {
      // polish notation :)..
      try {
        expression = eval(expression).toString();
      } catch (error) {
        expression = "Error";
      }
    } else if (value === "Backspace") {
      expression = expression.slice(0, -1);
    } else if (["+", "-", "*", "/", "^"].includes(value)) {
      // replace the last character if it is an operator
      const lastChar = expression[expression.length - 1];
      if (["+", "-", "*", "/", "^"].includes(lastChar)) {
        expression = expression.slice(0, -1) + value;
      } else {
        expression += value;
      }
    } else {
      expression += value;
    }
    screen.value = expression;
  };

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const value = button.getAttribute("value");
      handleButtonPress(value);
    });
  };

  // keydown event listeners for keyboard input
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (keyMap[key]) {
      handleButtonPress(keyMap[key]);

      const button = Array.from(buttons).find(
        (btn) => btn.getAttribute("value") === keyMap[key]
      );

      // simulate actual clicking
      button.classList.add("pressed");
      setTimeout(() => {
        button.classList.remove("pressed");
      }, 100);
    }
  });
});
