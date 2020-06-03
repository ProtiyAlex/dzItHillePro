const el = function (element) {
  return document.querySelector(element);
};

const calc = el(".calc"),
  operandOne = el("#operandOne"),
  operandTwo = el("#operandTwo"),
  mathOperat = el("#mathOperat"),
  ul = el("ul"),
  resultSlect = el(".result"),
  clear = el(".clear");

loadEvents();

function loadEvents() {
  calc.addEventListener("click", onCalcBtnClick);
  clear.addEventListener("click", onСlearBtnClick);
}

function delBtnEvent(element) {
  if (element) element.addEventListener("click", onDelBtnClick);
}

function onDelBtnClick(event) {
  event.target.parentNode.remove();

  if (!el("li")) {
    resultSlect.hidden = true;
    errorDel();
  }
}

function onСlearBtnClick() {
  while (ul.firstChild) {
    el("li").remove();
  }
  errorDel();
  resultSlect.hidden = true;
}
function errorDel() {
  let error = el(".error");
  if (error) error.classList.remove("error");
}

function onCalcBtnClick() {
  errorDel();

  const calcObjekt = {
    "-": (operandsA, operandsB) =>
      `${operandsA} - ${operandsB} = ${operandsA - operandsB}`,
    "+": (operandsA, operandsB) =>
      `${operandsA} + ${operandsB} = ${operandsA + operandsB}`,
    "*": (operandsA, operandsB) =>
      `${operandsA} * ${operandsB} = ${operandsA * operandsB}`,
    "/": (operandsA, operandsB) =>
      `${operandsA} / ${operandsB} = ${operandsA / operandsB}`,
    min: (operandsA, operandsB) =>
      `${operandsA}, ${operandsB} min ${Math.min(operandsA, operandsB)}`,
    max: (operandsA, operandsB) =>
      `${operandsA}, ${operandsB} max ${Math.max(operandsA, operandsB)}`,
    Error: (operandsA, operandsB) => "Error!",
  };

  let result = calcObjekt[chekMathOperat(mathOperat)](
    +operandOne.value,
    +operandTwo.value
  );

  addResult(result);
}

function addResult(result) {
  let li = document.createElement("li");
  li.innerHTML = `${result} <button class="delBtn">Del</button>`;
  ul.prepend(li);
  delBtnEvent(el(".delBtn"));
  resultSlect.hidden = false;
}

function chekMathOperat(item) {
  if (item.value == "Choose an operation") return error(item);
  else {
    if (chekOperand(operandOne) == "Error") return "Error";
    if (chekOperand(operandTwo) == "Error") return "Error";
    return item.value;
  }
}

function chekOperand(item) {
  if (item.value == "" || isNaN(item.value)) return error(item);
}

function error(item) {
  item.classList.add("error");
  return "Error";
}
