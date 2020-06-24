class Todolist {
  static ITEM_JSON_CLASS = "item-json";
  static TITLE_JSON_DONE_CLASS = "done";
  static DELETE_BTN_CLASS = "delete-btn";
  static ATTRIBUTE = "data-id";

  constructor(arrJson, elContainer, itemTemplate, taskNameInput, addTaskBtn) {
    this.arrJson = arrJson;
    this.elContainer = elContainer;
    this.itemTemplate = itemTemplate;
    this.elTaskNameInput = taskNameInput;
    this.elAddTaskBtn = addTaskBtn;
    this.itemTemplateClone;
    this.task = {
      title: "",
      completed: "",
    };
    this.init();
  }

  init() {
    this.createCloneTemplate();
    this.addTask();
    this.elContainer.addEventListener("click", this.onTaskListClick.bind(this));

    this.elAddTaskBtn.addEventListener("click", this.onclickAddTask.bind(this));
  }

  onclickAddTask() {
    this.task.title = this.elTaskNameInput.value;
    this.task.completed = false;

    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.task),
    })
      .then((res) => res.json())
      .then((data) => {
        this.taskToHtml(this.elTaskNameInput.value);
        this.addAttribut(data.id);
        this.prependTemplate(this.itemTemplateClone);
        this.createCloneTemplate(this.itemTemplateClone);
      });
  }

  onTaskListClick(event) {
    switch (true) {
      case event.target.classList.contains(Todolist.DELETE_BTN_CLASS):
        this.deleteTask(event.target.parentElement);
        break;

      case event.target.closest(`.${Todolist.ITEM_JSON_CLASS}`) != null:
        this.toggleTaskState(
          event.target.closest(`.${Todolist.ITEM_JSON_CLASS}`)
        );
        break;
    }
  }

  addTask() {
    this.arrJson.forEach((item) => {
      this.taskToHtml(item.title);

      if (item.completed) {
        this.itemTemplateClone.classList.toggle(Todolist.TITLE_JSON_DONE_CLASS);
      }

      this.addAttribut(item.id);

      this.prependTemplate(this.itemTemplateClone);

      this.createCloneTemplate();
    });
  }

  toggleTaskState(el) {
    this.task.title = el.children[0].textContent;
    this.task.completed = !el.classList.contains(
      Todolist.TITLE_JSON_DONE_CLASS
    );

    fetch(`https://jsonplaceholder.typicode.com/todos/${el.dataset.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.task),
    })
      .then((res) => res.json())
      .catch(() => alert("Server error"))
      .then(el.classList.toggle(Todolist.TITLE_JSON_DONE_CLASS));
  }

  taskToHtml(task) {
    this.itemTemplateClone.innerHTML = this.itemTemplate.replace(
      "{{title}}",
      task
    );
  }
  prependTemplate(el) {
    this.elContainer.prepend(el);
  }

  addAttribut(id) {
    this.itemTemplateClone.setAttribute(Todolist.ATTRIBUTE, id);
  }

  deleteTask(el) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${el.dataset.id}`, {
      method: "DELETE",
    });

    el.remove();
  }

  createCloneTemplate() {
    this.template = document.createElement("div");
    this.template.classList.add(Todolist.ITEM_JSON_CLASS);
    this.template.innerHTML = this.itemTemplate;
    this.itemTemplateClone = this.template.cloneNode(true);
  }
}
