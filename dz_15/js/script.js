const ALBUMS_URL = "https://jsonplaceholder.typicode.com/albums",
  PHOTOS_URL = "https://jsonplaceholder.typicode.com/photos",
  ACTIVE_CLASS = "active",
  DATA_ID_ATR = "data-id",
  MENU_WRAP_CLASS = "menu-wrap",
  BODY_WRAP_CLASS = "body-wrap",
  ITEM_MENU_CLASS = "item-menu",
  PHOTO_ITEM_TEMP_ID = "photoItemTemplate",
  MENU_ITEM_TEMP_ID = "menuItemTemplate";

let wrap = document.getElementById(MENU_WRAP_CLASS);
let template = document.getElementById(MENU_ITEM_TEMP_ID).innerHTML;
let cloneTemplate;
let renderBoolean = false;
let activeMenu;
let url = ALBUMS_URL;

getData(url);

document
  .getElementById(MENU_WRAP_CLASS)
  .addEventListener("click", onclickMenuTitle);

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then(setData);
}

function setData(data) {
  if (!renderBoolean) {
    render(data);
  } else {
    renderBody(data);
  }
}

function render(data) {
  renderMenu(data);
  changeTemplate();
  getData(url);
}

function changeTemplate() {
  albomIDUrl();
  template = document.getElementById(PHOTO_ITEM_TEMP_ID).innerHTML;
  wrap = document.getElementById(BODY_WRAP_CLASS);
}

function albomIDUrl() {
  url = PHOTOS_URL + "?albumId=" + activeMenu;
}

function renderBody(data) {
  wrap.innerHTML = "";
  data.forEach((item) => {
    cloneTemplate = template.replace("{{url}}", item.thumbnailUrl);
    htmlToElement();
  });
}

function renderMenu(data) {
  data.forEach((item) => {
    cloneTemplate = template
      .replace("{{id}}", item.id)
      .replace("{{title}}", item.title);

    htmlToElement();

    if (!renderBoolean) {
      wrap.firstChild.nextElementSibling.classList.add(ACTIVE_CLASS);
      activeMenu = item.id;
    }
    renderBoolean = true;
  });
}

function htmlToElement() {
  wrap.insertAdjacentHTML("beforeend", cloneTemplate);
}

function onclickMenuTitle(event) {
  if (event.target.classList.contains(ITEM_MENU_CLASS)) {
    idAlbums = event.target.getAttribute(DATA_ID_ATR);

    activeChanges(event.target);
  }

  albomIDUrl();
  getData(url);
}

function activeChanges(el) {
  el.classList.add(ACTIVE_CLASS);

  Array.prototype.some.call(el.parentNode.children, (element) => {
    if (element.getAttribute(DATA_ID_ATR) == activeMenu) {
      return element.classList.remove(ACTIVE_CLASS);
    }
  });

  activeMenu = el.getAttribute(DATA_ID_ATR);
}
