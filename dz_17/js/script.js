const URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers";

const DEL_BTN_CLASS = "del-sticker";

const strikerWrap = document.getElementById("sticker-wrap");
const addStickerBtnEl = document.getElementById("btn-add");

const stickerTemplate = document.getElementById("stickerTemplate").innerHTML;

let list = [];

init();
eventInit();

function onCardFocusOut(event) {
  changeSticker(event.target.closest(".card").dataset.id, event.target.value);
}

function changeSticker(id, valueTextArea) {
  const sticker = list.find((stik) => stik.id === id);
  sticker.description = valueTextArea;

  fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sticker),
  })
    .then((res) => res.json())
    .then((data) => {
      getList();
    });
}

function init() {
  getList();
}

function eventInit() {
  strikerWrap.addEventListener("focusout", onCardFocusOut);
  strikerWrap.addEventListener("click", onDelStickClick);
  addStickerBtnEl.addEventListener("click", onAddStickerClick);
}
function getList() {
  fetch(URL)
    .then((res) => res.json())
    .then(setData)
    .then(renderList);
}

function setData(data) {
  return (list = data);
}

function renderList(data) {
  strikerWrap.innerHTML = data.map(getItemElementHtml).join("");
}

function getItemElementHtml(item) {
  return stickerTemplate
    .replace("{{id}}", item.id)
    .replace("{{text}}", item.description);
}

function onDelStickClick(event) {
  if (event.target.classList.contains(DEL_BTN_CLASS)) {
    deleteSticker(event.target.closest(".card").dataset.id);
  }
}

function deleteSticker(id) {
  fetch(`${URL}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      getList();
    });
}

function onAddStickerClick() {
  const item = {
    description: "",
    x: "",
    y: "",
  };

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => res.json())
    .then((data) => {
      list.push(data);
      renderList(list);
    });
}
