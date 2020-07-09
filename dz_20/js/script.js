$(function () {
  const URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers";

  const DEL_BTN_CLASS = "del-sticker";
  const CARD_TEXT_CLASS = "card-text";
  const CARD_CLASS = ".card";
  const CARD_HEADER_CLASS = ".card-header";

  const heightStick = 200;
  const widthStick = 300;

  const $strikerWrap = $("#sticker-wrap");
  const $addStickerBtnEl = $("#btn-add");

  const stickerTemplate = $("#stickerTemplate").html();

  let list = [];

  init();
  eventInit();

  function onCardFocusOut(event) {
    changeSticker(
      event.target.closest(CARD_CLASS).dataset.id,
      event.target.value
    );
  }

  function changeSticker(id, valueTextArea) {
    const sticker = searchStickerId(id);

    sticker.description = valueTextArea;

    requestPut(id, sticker);
  }

  function requestPut(id, sticker) {
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
    $strikerWrap.on("focusout", "." + CARD_TEXT_CLASS, onCardFocusOut);
    $strikerWrap.on("click", "." + DEL_BTN_CLASS, onDelStickClick);
    $addStickerBtnEl.on("click", onAddStickerClick);
  }
  function getList() {
    fetch(URL)
      .then((res) => res.json())
      .then(setData)
      .then(renderList);
  }

  function setData(data) {
    list = data.map((item) => sizeСheck(item));

    function sizeСheck(item) {
      item.height < heightStick - 1 ? (item.height = heightStick) : "";
      item.width < widthStick - 1 ? (item.width = widthStick) : "";
      return item;
    }

    return list;
  }

  function renderList(data) {
    $strikerWrap.html(data.map(getItemElementHtml).join(""));

    draggableWidget();
    resizableWidget();
  }

  function draggableWidget() {
    $(CARD_CLASS).draggable({
      handle: CARD_HEADER_CLASS,
      stack: CARD_CLASS,
      zIndex: 100,
      stop: (event, ui) => {
        eventsStopDragRes(event.type, ui);
      },
    });
  }

  function resizableWidget() {
    $(CARD_CLASS).resizable({
      autoHide: true,
      minHeight: heightStick,
      minWidth: widthStick,
      stop: (event, ui) => {
        eventsStopDragRes(event.type, ui);
      },
    });
  }

  function eventsStopDragRes(type, ui) {
    const sticker = searchStickerId($(ui.helper).data("id"));

    if (type == "resizestop") {
      sticker.width = ui.size.width;
      sticker.height = ui.size.height;
    } else {
      sticker.x = ui.position.left;
      sticker.y = ui.position.top;
    }

    requestPut($(ui.helper).data("id"), sticker);
  }

  function getItemElementHtml(item) {
    return stickerTemplate
      .replace("{{id}}", item.id)
      .replace("{{text}}", item.description)
      .replace("{{x}}", item.x)
      .replace("{{y}}", item.y)
      .replace("{{width}}", item.width)
      .replace("{{height}}", item.height);
  }

  function onDelStickClick(event) {
    deleteSticker(event.target.closest(CARD_CLASS).dataset.id);
  }

  function searchStickerId(id) {
    return list.find((stik) => stik.id == id);
  }

  function deleteSticker(id) {
    fetch(`${URL}/${id}`, {
      method: "DELETE",
    });

    list = list.filter((el) => el.id != id);
    $strikerWrap.children(`[data-id = "${id}"]`).remove();
  }

  function onAddStickerClick() {
    const item = {
      description: "Новая заметка",
      x: "",
      y: "",
      height: heightStick,
      width: widthStick,
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

        setData(list);
        renderList(list);
      });
  }
});
