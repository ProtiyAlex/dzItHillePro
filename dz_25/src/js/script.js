import $ from "jquery";
import {
  $checkboxStatus,
  $wrapChat,
  $mesInput,
  $nameInput,
  $sendMessageBtn,
} from "./config";
export default function meChat() {
  let socket = {};
  const obj = {
    type: "message",
    payload: {
      username: "",
      message: "Сonnected",
    },
  };

  $checkboxStatus.on("change", onclickCheckboxStatus);
  $sendMessageBtn.on("click", onclickSendMessage);

  init();
  openWS();

  function init() {
    obj.payload.username = prompt("Enter your name");
    $nameInput.val(obj.payload.username);
  }

  function openWS() {
    socket = new WebSocket("wss://fep-app.herokuapp.com/");

    socket.onopen = () => {
      $checkboxStatus.prop("checked", true);
      socketSend();
    };
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // console.log(data.payload.message);
      if (data.payload.username == obj.payload.username) {
        template("from-me", data.payload.username, data.payload.message);
      } else {
        template("from-them", data.payload.username, data.payload.message);
      }
    };

    socket.onerror = () => {
      template("from-me", "Status", "Server error");
    };

    socket.onclose = () => {
      template("from-me", "Status", "Connection closed");
      $checkboxStatus.prop("checked", false);
    };

    function template(from, username, message) {
      $wrapChat.append(
        `<div class="p ${from}"> <label  class="label-name"> ${username}:</label>${message}</div>`
      );
    }
  }

  function onclickSendMessage() {
    obj.payload.message = $mesInput.val();
    obj.payload.username = $nameInput.val();
    socketSend();
  }
  function onclickCheckboxStatus() {
    if ($(this).is(":checked")) {
      connectDisconnectText("Сonnected");
      openWS();
    } else {
      connectDisconnectText("Disconnected");
      socketSend();
      socket.close();
      connectDisconnectText("Сonnected");
    }
  }
  function connectDisconnectText(val) {
    obj.payload.message = val;
  }
  function socketSend() {
    socket.send(JSON.stringify(obj));
  }
}
