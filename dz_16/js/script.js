fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    new Todolist(
      data,
      document.getElementById("wrap-todo"),
      document.getElementById("taskItemTemplate").innerHTML,
      document.getElementById("taskNameInput"),
      document.getElementById("addTaskBtn")
    );
  });
