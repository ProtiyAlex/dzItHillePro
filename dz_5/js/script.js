const mathOperat = getAction();
const arrlist = getOperands();

calc(mathOperat, arrlist);

function calc(operation, arrNum) {
  const calcObjekt = {
    "-": (operandsA, operandsB) => operandsA - operandsB,
    "+": (operandsA, operandsB) => operandsA + operandsB,
    "*": (operandsA, operandsB) => operandsA * operandsB,
    "/": (operandsA, operandsB) => operandsA / operandsB,
  };

  const resultStr = arrNum.join(` ${operation} `);

  const result = arrNum.reduce((result, item) =>
    calcObjekt[operation](result, item)
  );

  console.log(`${resultStr} = ${result}`);
}

function getOperands() {
  let userInput;
  do {
    userInput = prompt("Введите числа через пробел")
      .trim()
      .split(/\s+/g)
      .filter((item) => !isNaN(item))
      .map((string) => +string);
  } while (userInput.length < 2);

  return userInput;
}

function getAction() {
  let act;

  let actObjekt = { "+": true, "-": true, "*": true, "/": true };

  do {
    act = prompt("Введите операцию для калькулятора +, - , * , / ");
  } while (actObjekt[act] == undefined);

  return act;
}
