const mathOperat = dataInput(); // запрос оператор калькулятора
const numArg = +promtArgum(); //запрос кол-ва цифр
const arrlist = operands(numArg); // массив с цифрами

calc(mathOperat, arrlist);

function calc(operation, arrNum) {
  let result = arrNum[0];
  let resultStr = `${arrNum[0]} ${operation} `;
  for (let i = 1; i < arrNum.length; i++) {
    switch (operation) {
      // посчитал не нужным выводить каждую операцию в функцию
      // т.к. слишком мало кода будет в них
      case "+":
        result = result + arrNum[i];
        break;
      case "*":
        result = result * arrNum[i];
        break;
      case "-":
        result = result - arrNum[i];
        break;
      case "/":
        if (arrNum[i] == 0) {
          return alert("Ошибка! Делить на 0 не получиться!");
        }
        result = result / arrNum[i];
        break;
    }

    if (i == arrNum.length - 1) resultStr = resultStr + arrNum[i];
    else resultStr = resultStr + arrNum[i] + ` ${operation} `;
  }
  console.log(`${resultStr} = ${result}`);
}
//______________________________________________________________________

function operands(numArg) {
  // запрос цифр
  let arr = [];

  for (let i = 0; i < numArg; i++) {
    arr[i] = +prompt(`Введите операнд №${i + 1}`);
  }
  return arr;
}

function promtArgum() {
  // запрос кол-ва цифр
  let num;
  do {
    num = prompt("Введите количество операндов. Значение должно быть больше 1");
  } while (num > 1 ? false : true);
  return num;
}
//________________________________________________________________________
function dataInput() {
  // запрос оператор калькулятора
  let act;
  do {
    act = prompt("Введите операцию для калькулятора +, - , * , / ");
  } while (check(act));
  return act;
}

function check(value) {
  // проверка на операцию кальк.
  switch (value) {
    case "+":
      return false;
    case "-":
      return false;
    case "*":
      return false;
    case "/":
      return false;
    default:
      alert("Ошибка! Введите операцию для калькулятора +, - , * , / ");
      return true;
  }
}
// ____________________________________________________________________________________________________
