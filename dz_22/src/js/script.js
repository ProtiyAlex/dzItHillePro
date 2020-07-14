const TODOS_URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos";
const TODO_ITEM_CLASS = ".task-item-wrap";
const DELETE_BTN_CLASS = ".delete-btn";

const $taskNameInput = $("#taskNameInput");
const $taskList = $("#wrap-todo");
const $addTaskBtn = $("#addTaskBtn");
const $taskItemTemplate = $("#taskItemTemplate").html();

let todos = [];

getTodos();
initEvents();

function onclickAddTask(event) {
  switch (true) {
    case Boolean(event.target.closest(DELETE_BTN_CLASS)):
      deleteTodo($(event.target.closest(TODO_ITEM_CLASS)).data("id"));
      break;
    case Boolean(event.target.closest(TODO_ITEM_CLASS)):
      toggleTodo($(event.target.closest(TODO_ITEM_CLASS)).data("id"));
      break;
  }
}

function initEvents() {
  $addTaskBtn.on("click", onTaskListClick);
  $taskList.on("click", onclickAddTask);
}

function onTaskListClick() {
  const todo = { title: $taskNameInput.val(), isDone: false };

  fetch(TODOS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((resp) => resp.json())
    .then(addTodo);
}

function getTodos() {
  return fetch(TODOS_URL)
    .then((resp) => resp.json())
    .then(setTodos)
    .then(renderTodos);
}

function setTodos(data) {
  return (todos = data);
}

function renderTodos(data) {
  $taskList.html(data.map(generateTodoHtml).join("\n"));
}

function generateTodoHtml(todo) {
  return $taskItemTemplate
    .replace("{{id}}", todo.id)
    .replace("{{title}}", todo.title)
    .replace("{{completeClass}}", todo.isDone ? "done" : "");
}

function toggleTodo(id) {
  const todo = todos.find((todo) => todo.id == id);

  todo.isDone = !todo.isDone;

  fetch(`${TODOS_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  $taskList.children(`[data-id = "${id}"]`).toggleClass("done");
}

function deleteTodo(id) {
  fetch(`${TODOS_URL}/${id}`, {
    method: "DELETE",
  });

  todos = todos.filter((item) => item.id != id);

  $taskList.children(`[data-id = "${id}"]`).remove();
}

function addTodo(todo) {
  todos.push(todo);
  $taskList.append(generateTodoHtml(todo));
}
