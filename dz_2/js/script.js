const valueCalcOne = prompt("Введите первое число");
const valueCalcTwo = prompt("Введите второе число");
// ________________________Вариант №1____________________________________

console.log("Вариант №1");
console.log(
  valueCalcOne,
  "+",
  valueCalcTwo,
  "=",
  addition(valueCalcOne, valueCalcTwo)
);

console.log(
  valueCalcOne,
  "*",
  valueCalcTwo,
  "=",
  multiplication(valueCalcOne, valueCalcTwo)
);

console.log(
  valueCalcOne,
  "-",
  valueCalcTwo,
  "=",
  subtraction(valueCalcOne, valueCalcTwo)
);

console.log(
  valueCalcOne,
  "/",
  valueCalcTwo,
  "=",
  division(valueCalcOne, valueCalcTwo)
);

// ________________________Вариант №2______________________________

const act = ["+", "*", "-", "/"];

console.log("Вариант №2");
consoleLog(act[0], addition(valueCalcOne, valueCalcTwo));
consoleLog(act[1], multiplication(valueCalcOne, valueCalcTwo));
consoleLog(act[2], subtraction(valueCalcOne, valueCalcTwo));
consoleLog(act[3], division(valueCalcOne, valueCalcTwo));

function consoleLog(calcAct, result) {
  console.log(valueCalcOne + calcAct + valueCalcTwo + "=" + result);
}
//пытался сделать еще проще, без нижеприведенных функций, чтобы все делала одна функция, но как преобразовать строку
// valueCalcOne + calcAct + valueCalcTwo в математическое выражение так и не разобрался
// ____________________________________________________________

function addition(valueOne, valueTwo) {
  //сложение
  return Number(valueOne) + Number(valueTwo);
}
function multiplication(valueOne, valueTwo) {
  //умножение
  return Number(valueOne) * Number(valueTwo);
}
function subtraction(valueOne, valueTwo) {
  //вычитание
  return Number(valueOne) - Number(valueTwo);
}
function division(valueOne, valueTwo) {
  // деление
  return Number(valueOne) / Number(valueTwo);
}
