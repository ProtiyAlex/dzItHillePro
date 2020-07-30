import $ from "jquery";

const TODO_ITEM_CLASS = ".task-item-wrap";
const DELETE_BTN_CLASS = ".delete-btn";

const $taskNameInput = $("#taskNameInput");
const $taskList = $("#wrap-todo");
const $addTaskBtn = $("#addTaskBtn");
const $taskItemTemplate = $("#taskItemTemplate").html();

export default class List {
  constructor(config) {
    this.config = config;
    this.$taskList = $taskList;
    this.$addTaskBtn = $addTaskBtn;
    this.$taskNameInput = $taskNameInput;
    this.$taskItemTemplate = $taskItemTemplate;
    this.$taskList.on("click", DELETE_BTN_CLASS, this.onDelClick.bind(this));
    this.$taskList.on("click", TODO_ITEM_CLASS, this.onTaskClick.bind(this));

    this.$addTaskBtn.on("click", this.onclickAddTask.bind(this));
  }

  render(list) {
    this.$taskList.empty();
    list.forEach(this.renderModel.bind(this));
  }

  renderModel(todo) {
    this.$taskList.append(this.templateReplace(this.$taskItemTemplate, todo));
  }

  templateReplace(template, todo) {
    return template
      .replace("{{id}}", todo.id)
      .replace("{{title}}", todo.title)
      .replace("{{completeClass}}", todo.isDone ? "done" : "");
  }
  onDelClick(event) {
    event.stopPropagation();
    const id = $(event.target).closest(TODO_ITEM_CLASS).data("id");
    this.config.onDelete(id);
  }
  onclickAddTask() {
    this.config.addTask(this.$taskNameInput.val());
  }

  onTaskClick(event) {
    const id = $(event.target).closest(TODO_ITEM_CLASS).data("id");
    this.config.changeTask(id);
  }

  toggleTodo(id) {
    this.$taskList.children(`[data-id = "${id}"]`).toggleClass("done");
  }
}
