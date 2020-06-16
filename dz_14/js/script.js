fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    new Jsonconfig(
      data,
      document.getElementById("container"),
      document.getElementById("taskItemTemplate").innerHTML
    );
  });
