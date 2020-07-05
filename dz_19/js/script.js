const USER_URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users";
const USER_ITEM_CLASS = ".user-item-wrap";
const DELETE_BTN_CLASS = ".delete-btn";

const $taskNameInput = $("#taskNameInput");
const $userList = $("#wrap-tb");
const $addUser = $("#addUser");
const $taskItemTemplate = $("#tbItemTemplate").html();

const $nameInput = $("#name");
const $surnameInput = $("#surname");
const $emailInput = $("#email");
const $phoneInput = $("#phone");
const $dialogForm = $("#dialog-form");

let autoOpen = false;
let userForm = {
  id: "",
  name: "",
  surname: "",
  phone: "",
  email: "",
};

initDialog(userForm);
getUsers();
initEvents();

function initDialog(userForm, title, $el) {
  $nameInput.val(userForm.name);
  $surnameInput.val(userForm.surname);
  $emailInput.val(userForm.email);
  $phoneInput.val(userForm.phone);

  const dialog = $dialogForm.dialog({
    autoOpen: autoOpen,
    height: 600,
    width: 350,
    modal: true,
    buttons: {
      Apply: onClickBtnApply,
      Cancel: function () {
        dialog.dialog("close");
      },
    },
    close: function () {
      form[0].reset();
    },
  });

  form = dialog.find("form").on("submit", function (event) {
    event.preventDefault();
    onClickBtnApply();
  });
  changeTitleForm("Change user");
  $addUser.button().on("click", function () {
    changeTitleForm("Create new user");
    dialog.dialog("open");
    userFormInit("", "", "", "", "");
  });
}
function changeTitleForm(title) {
  $("#ui-id-1").text(title);
}

function onClickBtnApply() {
  userFormInit(
    $nameInput.val(),
    $surnameInput.val(),
    $phoneInput.val(),
    $emailInput.val(),
    userForm.id
  );
  if (userForm.id) {
    requestPut(userForm.id);
  } else {
    requestPost(userForm.id);
  }
}

function requestPost(id) {
  fetch(USER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm),
  })
    .then((resp) => resp.json())
    .then(addUser);
}

function addUser(user) {
  $userList.append(generateTodoHtml(user));
}

function requestPut(id) {
  const $elTd = $($userList.children(`[data-id = "${id}"]`));
  fetch(`${USER_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm),
  })
    .then((res) => res.json())
    .then((data) => {
      $elTd.children(".name").text(data.name);
      $elTd.children(".surname").text(data.surname);
      $elTd.children(".phone").text(data.phone);
      $elTd.children(".email").text(data.email);
    });
}
function onUserDeleteClick(event) {
  event.stopPropagation();
  deleteUser($(event.target.closest(USER_ITEM_CLASS)).data("id"));
}

function onUserItemClick(event) {
  const $elEvent = $(event.target.closest(USER_ITEM_CLASS));
  changeUser($elEvent.data("id"), $elEvent);
}

function initEvents() {
  $userList.on("click", DELETE_BTN_CLASS, onUserDeleteClick);

  $userList.on("click", USER_ITEM_CLASS, onUserItemClick);
}

function getUsers() {
  return fetch(USER_URL)
    .then((resp) => resp.json())
    .then(renderUsers);
}

function renderUsers(data) {
  $userList.html(data.map(generateTodoHtml).join("\n"));
}

function generateTodoHtml(user) {
  return $taskItemTemplate
    .replace(/{{id}}/g, user.id)
    .replace("{{name}}", user.name)
    .replace("{{surname}}", user.surname)
    .replace("{{phone}}", user.phone)
    .replace("{{email}}", user.email);
}

function changeUser(id, $el) {
  autoOpen = true;
  userFormInit(
    $($el.children(".name")).text(),
    $($el.children(".surname")).text(),
    $($el.children(".phone")).text(),
    $($el.children(".email")).text(),
    id
  );

  initDialog(userForm);
}

function userFormInit(name, surname, phone, email, id) {
  userForm = {
    id: id,
    name: name,
    surname: surname,
    phone: phone,
    email: email,
  };
}
function deleteUser(id) {
  fetch(`${USER_URL}/${id}`, {
    method: "DELETE",
  });

  $userList.children(`[data-id = "${id}"]`).remove();
}
