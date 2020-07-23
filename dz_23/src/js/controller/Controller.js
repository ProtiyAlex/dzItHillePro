const TODO_URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/todos";
class Controller {
  constructor() {
    console.log("contorller started");

    this.todoCollection = new Collection(TODO_URL);
    this.todoCollection.fetch().then(() => {
      this.listView.render(this.todoCollection.list);
    });
    this.listView = new List({
      onDelete: this.onDelete.bind(this),
      addTask: this.addTask.bind(this),
      changeTask: this.changeTask.bind(this),
    });

    console.log(this.todoCollection);
  }
  onDelete(id) {
    // стрелоч

    this.todoCollection.delete(id).then(() => {
      this.listView.render(this.todoCollection.list);
    });
  }
  addTask(title) {
    this.todoCollection.createTask(title).then(() => {
      this.listView.render(this.todoCollection.list);
    });
  }
  changeTask(id) {
    this.todoCollection.changeTaskCol(id).then(() => {
      this.listView.toggleTodo(id);
    });
  }
}
