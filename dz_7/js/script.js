loadEvents();

const ry = 6;

function loadEvents() {
  document.querySelector("#addBtn").addEventListener("click", onAddBtnClick);
  document.querySelector("#clear").addEventListener("click", onСlearBtnClick);
  if (document.querySelector(".delBtn"))
    document.querySelector(".delBtn").addEventListener("click", onDelBtnClick);
}
function onDelBtnClick(event) {
  event.target.parentNode.remove();
  getHiddenTBoard();
}
function onСlearBtnClick() {
  while (document.querySelector("ul").firstChild) {
    document.querySelector("li").remove();
  }
  getHiddenTBoard();
}
function onAddBtnClick() {
  let input = document.querySelector("input");
  if (input.value != "") addTask(input.value);
  input.value = "";
}

function addTask(task) {
  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  li.innerHTML = `${task}<button class="delBtn">Del</button>`;
  ul.prepend(li);
  loadEvents();
  getHiddenTBoard();
}

function getHiddenTBoard() {
  if (document.querySelector("li"))
    document.querySelector(".tasksBoard").hidden = false;
  else document.querySelector(".tasksBoard").hidden = true;
}
