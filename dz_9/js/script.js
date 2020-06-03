const el = function (element) {
  return document.querySelector(element);
};

const
  inputTask = el("#task"),
  addTaskBtn = el("#addTaskBtn"),
  ulContainer = el("ul"),
  resultTask = el("#result"),
  clearBtn = el("#clear"),
  liTaskTemplate = el("#templateLiTask").innerHTML;


addTaskBtn.addEventListener("click", onTaskBtnClick);
clearBtn.addEventListener("click", onСlearBtnClick);
ulContainer.addEventListener("click", onUlContainerClick);


function onUlContainerClick(event) {
  event.target.classList.toggle("performed");
}

function delBtnEvent(element) {
  if (element) element.addEventListener("click", onDelBtnClick);
}

function onDelBtnClick(event) {
  event.target.parentNode.remove();
  if (!el("li")) {
    resultTask.hidden = true;
  }
}

function onСlearBtnClick() {

  ulContainer.innerHTML = "";
  resultTask.hidden = true;
}

function onTaskBtnClick() {

  addTask(inputTask.value);
  inputTask.value = "";
}

function addTask(task) {

  ulContainer.insertAdjacentHTML("afterBegin", liTaskTemplate.replace("{{Task}}", task));
  delBtnEvent(el("#delBtn"));
  resultTask.hidden = false;
}




