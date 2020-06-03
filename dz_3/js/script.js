const act = prompt(
  "Введите операцию для калькулятора +, - , * , / , exp -(степень), cos, sin, tan"
);

const valueCalcOne = +prompt("Введите число");

switch (act) {
  case "+":
    addition(valueCalcOne, valueCalcTwo());
    break;
  case "*":
    multiplication(valueCalcOne, valueCalcTwo());
    break;
  case "-":
    subtraction(valueCalcOne, valueCalcTwo());
    break;
  case "/":
    division(valueCalcOne, valueCalcTwo());
    break;
  case "exp":
    exp(valueCalcOne, valueCalcTwo());
    break;
  case "cos":
    cos(valueCalcOne);
    break;
  case "sin":
    sin(valueCalcOne);
    break;
  case "tan":
    tan(valueCalcOne);
    break;
  default:
    console.log("Что-то пошло не так");
    break;
}

// ____________________________________________________________

function valueCalcTwo() {
  return +prompt("Введите второе число");
}

function addition(valueOne, valueTwo) {
  //сложение
  const result = valueOne + valueTwo;
  console.log(`${valueOne} + ${valueTwo} = ${result}`);
}
function multiplication(valueOne, valueTwo) {
  //умножение
  const result = valueOne * valueTwo;
  console.log(`${valueOne} * ${valueTwo} = ${result}`);
}
function subtraction(valueOne, valueTwo) {
  //вычитание
  const result = valueOne - valueTwo;
  console.log(`${valueOne} - ${valueTwo} = ${result}`);
}
function division(valueOne, valueTwo) {
  // деление
  const result = valueOne / valueTwo;
  console.log(`${valueOne} / ${valueTwo} = ${result}`);
}
function exp(valueOne, valueTwo) {
  // степень
  const result = Math.pow(valueOne, valueTwo);
  console.log(`${valueOne} в степени (${valueTwo})  = ${result}`);
}
function cos(valueOne) {
  // cos
  const result = Math.cos((valueOne * Math.PI) / 180);
  console.log(
    `cos(${valueOne}) = ${result},  где ${valueOne} - это градус угла.`
  );
}
function sin(valueOne) {
  // sin
  const result = Math.sin((valueOne * Math.PI) / 180);
  console.log(
    `sin(${valueOne}) = ${result}, где ${valueOne} - это градус угла.`
  );
}
function tan(valueOne) {
  // tan
  const result = Math.tan((valueOne * Math.PI) / 180);
  console.log(
    `tan(${valueOne}) = ${result}, где ${valueOne} - это градус угла.`
  );
}
