// function to evaluate RPN using stack
function count(s) {
  const stack = [];
  const tokens = s.split("");

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === "+") {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      stack.push(operand1 + operand2);
    } else if (token === "-") {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      stack.push(operand1 - operand2);
    } else if (token === "*") {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      stack.push(operand1 * operand2);
    } else if (token === "^") {
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      stack.push(Math.pow(operand1, operand2));
    }
  }
  return stack[0];
}

// function to convert a string into RPN and process it
// 
function validateAndProcessExpression(input) {
  const s = input.split("");
  let bracketCount = 0;

  let expression = s.join("");
  let i = 0;
  const length = expression.length;

  while (i < length) {
    // Binary operation check
    if (
      expression[i] === "+" ||
      expression[i] === "*" ||
      expression[i] === "-" ||
      expression[i] === "^"
    ) {
      if (
        !(
          i > 0 &&
          i < length - 1 &&
          (!isNaN(expression[i - 1]) || expression[i - 1] === ")") &&
          (!isNaN(expression[i + 1]) || expression[i + 1] === "(")
        )
      ) {
        correct = false;
        break;
      }
    }
    // Brackets check
    else if (expression[i] === "(") {
      if (i < length - 1 && expression[i + 1] === "-") {
        expression = expression.slice(0, i + 1) + "0" + expression.slice(i + 1);
        i++;
      }
      bracketCount++;
    } else if (expression[i] === ")") {
      bracketCount--;
    } else if (isNaN(expression[i])) {
      correct = false;
      break;
    }
    i++;
  }

  if (bracketCount !== 0 || !correct) {
    return "Error";
  } else {
    const stack = [];
    let polishNotation = "";

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (!isNaN(char)) {
        polishNotation += char;
        if (i < expression.length - 1 && isNaN(expression[i + 1])) {
          polishNotation += " ";
        }
      } else if (char === "+" || char === "-") {
        while (
          stack.length > 0 &&
          ["*", "-", "+", "^"].includes(stack[stack.length - 1])
        ) {
          polishNotation += stack.pop() + " ";
        }
        stack.push(char);
      } else if (char === "*") {
        while (
          stack.length > 0 &&
          ["*", "^"].includes(stack[stack.length - 1])
        ) {
          polishNotation += stack.pop() + " ";
        }
        stack.push(char);
      } else if (char === "^") {
        while (stack.length > 0 && stack[stack.length - 1] === "^") {
          polishNotation += stack.pop() + " ";
        }
        stack.push(char);
      } else if (char === "(") {
        stack.push(char);
      } else if (char === ")") {
        while (stack.length > 0 && stack[stack.length - 1] !== "(") {
          polishNotation += stack.pop() + " ";
        }
        stack.pop();
      }
    }

    while (stack.length > 0) {
      polishNotation += " " + stack.pop();
    }

    return count(polishNotation.trim());
  }
}
