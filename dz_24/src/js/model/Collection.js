import Model from "./Model";
export default class Collection {
  constructor(url) {
    this.url = url;
    this.list = [];
  }

  fetch() {
    return fetch(this.url)
      .then((resp) => resp.json())
      .then(this.setData.bind(this));
  }

  setData(data) {
    return (this.list = data.map((item) => {
      const model = new Model(this.url);
      model.setData(item);
      return model;
    }));
  }

  delete(id) {
    const model = this.list.find((item) => item.id == id);
    return model.delete().then(() => {
      this.list = this.list.filter((item) => item !== model);
    });
  }

  createTask(title) {
    const model = new Model(this.url);
    return model.create(title).then((data) => {
      this.list.push(model.setData(data));
    });
  }
  changeTaskCol(id) {
    const model = this.list.find((todo) => todo.id == id);
    model.isDone = !model.isDone;

    return model.toggle(model);
  }
}
