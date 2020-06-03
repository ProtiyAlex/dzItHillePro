const el = function (element) {
  return document.querySelector(element);
};

const input = el("#colorInput"),
  select = el("#select"),
  wrap = el("#wrap");
let leftMotion = 0,
  topMotion = 130;

loadEvents();

function loadEvents() {
  console.log(select);
  select.addEventListener("change", onChangeSelect);
  document.addEventListener("keydown", onKeyDownDoc);
  input.addEventListener("change", onChangeInput);
}
function onChangeInput(event) {
  wrap.style.backgroundColor = event.target.value;
}

function onKeyDownDoc(event) {
  switch (event.key) {
    case "ArrowUp":
      topMotion -= 10;
      return (wrap.style.top = topMotion + "px");
    case "ArrowDown":
      topMotion += 10;
      return (wrap.style.top = topMotion + "px");
    case "ArrowLeft":
      leftMotion -= 10;
      return (wrap.style.left = leftMotion + "px");
    case "ArrowRight":
      leftMotion += 10;
      return (wrap.style.left = leftMotion + "px");
  }
}

function onChangeSelect(event) {
  switch (select.value) {
    case "circle":
      return (wrap.className = "circle");
    case "square":
      return (wrap.className = "square");
    case "rectangle":
      return (wrap.className = "rectangle");
  }
}
