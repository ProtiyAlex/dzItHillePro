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

function onDelClick(event) {
  event.stopPropagation();
  deleteTodo($(event.target.closest(TODO_ITEM_CLASS)).data("id"));
}

function onTaskClick(event) {
  toggleTodo($(event.target.closest(TODO_ITEM_CLASS)).data("id"));
}

function initEvents() {
  $addTaskBtn.on("click", onclickAddTask);
  $taskList.on("click", DELETE_BTN_CLASS, onDelClick);
  $taskList.on("click", TODO_ITEM_CLASS, onTaskClick);
}

function onclickAddTask() {
  const todo = { title: $taskNameInput.val(), isDone: false };

  api.create(TODOS_URL, todo).then(addTodo);
}

function getTodos() {
  return api.requestGet(TODOS_URL).then(setTodos).then(renderTodos);
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

  api.change(`${TODOS_URL}/${todo.id}`, todo);

  $taskList.children(`[data-id = "${id}"]`).toggleClass("done");
}

function deleteTodo(id) {
  api.delete(`${TODOS_URL}/${id}`);

  todos = todos.filter((item) => item.id != id);

  $taskList.children(`[data-id = "${id}"]`).remove();
}

function addTodo(todo) {
  todos.push(todo);
  $taskList.append(generateTodoHtml(todo));
}
