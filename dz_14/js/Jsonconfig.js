class Jsonconfig {
  static ITEM_JSON_CLASS = "item-json";
  static TITLE_JSON_DONE_CLASS = "done";
  static DELETE_BTN_CLASS = "delete-btn";
  static ATTRIBUTE = "data-id";

  constructor(arrJson, elContainer, itemTemplate) {
    this.arrJson = arrJson;
    this.elContainer = elContainer;
    this.itemTemplate = itemTemplate;
    this.itemTemplateClone;
    this.initJson();
  }
  initJson() {
    this.createCloneTemplate();
    this.addTask();
    this.elContainer.addEventListener("click", this.onclickDelTitle.bind(this));
  }

  addTask() {
    this.arrJson.forEach((item) => {
      this.itemTemplateClone.innerHTML = this.itemTemplate.replace(
        "{{title}}",
        item.title
      );

      if (item.completed) {
        this.itemTemplateClone.classList.add(Jsonconfig.TITLE_JSON_DONE_CLASS);
      }

      this.itemTemplateClone.setAttribute(Jsonconfig.ATTRIBUTE, item.id);
      this.elContainer.append(this.itemTemplateClone);
      this.createCloneTemplate();
    });
  }

  onclickDelTitle(event) {
    if (event.target.classList.contains(Jsonconfig.DELETE_BTN_CLASS)) {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);
      this.deleteItemJson(event.target);
    }
  }

  deleteItemJson(el) {
    this.arrJson.some((item, i) => {
      if (item.id == el.parentNode.getAttribute(Jsonconfig.ATTRIBUTE)) {
        return this.arrJson.splice(i, 1);
      }
    });
  }

  createCloneTemplate() {
    this.template = document.createElement("div");
    this.template.classList.add(Jsonconfig.ITEM_JSON_CLASS);
    this.template.innerHTML = this.itemTemplate;
    this.itemTemplateClone = this.template.cloneNode(true);
  }
}
