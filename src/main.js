// ===== QUERY SELECTORS =====
var receiveMessage = document.querySelector("#message-button");

var zenImage = document.querySelector(".meditation-emoji");

var meditationMessageBlock = document.querySelector(".meditation-message");

var meditationMessage = document.querySelector("#message");

var clearButton = document.querySelector("#clear-button");

var likeButton = document.querySelector("#like");

var addMessageButton = document.querySelector("#add-message");

var form = document.querySelector("form");

var submitForm = document.querySelector("#submit");

var messageText = document.querySelector("#message");

// ===== EVENT LISTENERS AND DATA MODEL =====
window.addEventListener("load", createDataModel);
var currentMessage;
var messages = [];

receiveMessage.addEventListener("click", function () {
  var selectionMade = selectionCheck();
  if (selectionMade === false) {
    displayMessage();
    errorClass();
    elementHidden(zenImage);
  } else if (selectionMade === true) {
    elementHidden(zenImage);
    elementVisible(clearButton);
    generateRandomMessage();
    displayMessage();
  }
});

likeButton.addEventListener("click", function () {
  var selectionMade = selectionCheck();
  if (selectionMade === false) {
    elementHidden(zenImage);
  } else if (selectionMade === true) {
    // ADD LIKE FUNCTIONALITY HERE
  }
});

addMessageButton.addEventListener("click", function () {
  elementHidden(messageText);
  elementHidden(zenImage);
  elementVisible(form);
});

submitForm.addEventListener("click", function (event) {
  event.preventDefault();
  var messageType = document.querySelector("#type");
  var messageInput = document.querySelector("#message-input");
  var check = formCheck(messageInput.value);
  if (check === false) {
    displayMessage();
    errorClass();
    elementHidden(form);
    elementVisible(clearButton);
    form.reset();
  } else if (check === true) {
    currentMessage = createMessage(messageType.value, messageInput.value);
    displayMessage();
    elementHidden(form);
    elementVisible(clearButton);
    form.reset();
  }
});

clearButton.addEventListener("click", function () {
  currentMessage = "";
  displayMessage();
  elementVisible(zenImage);
  elementHidden(clearButton);
  elementHidden(form);
});

// ===== FUNCTIONS =====

function createDataModel() {
  // GDcP - C
  // create an array of objects (mantras and affirmations)
  // working with arrays, will be creating objects with properties of (type, message, favorite, id - length or date now)
  for (let i = 0; i < affirmations.length; i++) {
    createMessage("affirmation", affirmations[i]);
  }
  for (let i = 0; i < mantras.length; i++) {
    createMessage("mantra", mantras[i]);
  }
  return messages;
}

function generateRandomMessage() {
  var formSelection = document.querySelector('input[name="formInput"]:checked');
  currentMessage = randomMessage(messages, formSelection.value);
}

function randomMessage(messages, type) {
  var messageType = [];
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].type === type) {
      messageType.push(messages[i]);
    }
  }
  var random = Math.floor(Math.random() * messageType.length + 1);
  return messageType[random];
}

function displayMessage() {
  // add a paragraph element inside meditation-message
  if (currentMessage !== "") {
    var message = currentMessage.message;
    meditationMessage.innerHTML = `<p id="message" class="message">${message}</p>`;
    elementVisible(messageText);
    errorClassOff();
  } else {
    meditationMessage.innerHTML = "";
    elementHidden(messageText);
    errorClassOff;
  }
}

function selectionCheck() {
  var formSelection = document.querySelector('input[name="formInput"]:checked');
  try {
    if (formSelection === null) throw "Please make a selection";
    return true;
  } catch (err) {
    currentMessage = { type: "error", message: err };
    return false;
  }
}

function formCheck(checkInput) {
  try {
    if (checkInput === "")
      throw "Please double check the type, and enter a message";
    return true;
  } catch (err) {
    console.log(err);
    currentMessage = { type: "error", message: err };
    return false;
  }
}

function elementVisible(selector) {
  selector.classList.toggle("hidden", false);
  // console.log(selector);
}
function elementHidden(selector) {
  selector.classList.toggle("hidden", true);
  // console.log(selector);
}

function errorClass() {
  messageText.classList.toggle("errorMessage", true);
}

function errorClassOff() {
  messageText.classList.toggle("errorMessage", false);
}

function createMessage(type, message) {
  // console.log(type);
  // console.log(message);
  var newMessage = {
    type: type,
    message: message,
    favorite: false,
    id: Date.now(),
  };
  messages.push(newMessage);
  return newMessage;
}
