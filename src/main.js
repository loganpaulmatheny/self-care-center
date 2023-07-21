// ===== QUERY SELECTORS =====
var receiveMessage = document.querySelector("#message-button");

var zenImage = document.querySelector(".meditation-emoji");

var meditationMessageBlock = document.querySelector(".meditation-message");

var meditationMessage = document.querySelector("#message");

var clearButton = document.querySelector("#clear-button");

// ===== EVENT LISTENERS AND DATA MODEL =====
window.addEventListener("load", createDataModel);
var currentMessage;
var messages = [];

receiveMessage.addEventListener("click", function () {
  var selectionMade = selectionCheck();
  if (selectionMade === false) {
    elementHidden(zenImage);
  } else if (selectionMade === true) {
    elementHidden(zenImage);
    elementVisible(clearButton);
    displayRandomMessage();
  }
});

clearButton.addEventListener("click", function () {
  currentMessage = "";
  displayMessage();
  elementVisible(zenImage);
  elementHidden(clearButton);
});

// ===== FUNCTIONS =====

function createDataModel() {
  // GDcP - C
  // create an array of objects (mantras and affirmations)
  // working with arrays, will be creating objects with properties of (type, message, favorite, id - length or date now)
  for (let i = 0; i < affirmations.length; i++) {
    var message = {
      type: "affirmation",
      message: affirmations[i],
      favorite: false,
      id: Date.now(),
    };
    messages.push(message);
  }
  for (let i = 0; i < mantras.length; i++) {
    var message = {
      type: "mantra",
      message: mantras[i],
      favorite: false,
      id: Date.now(),
    };
    messages.push(message);
  }
  return messages;
}

function displayRandomMessage() {
  var formSelection = document.querySelector('input[name="formInput"]:checked');
  currentMessage = randomMessage(messages, formSelection.value);
  displayMessage();
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
    // console.log(message);
    meditationMessage.innerHTML = `<p id="message" class="message">${message}</p>`;
  } else {
    meditationMessage.innerHTML = "";
  }
}

function selectionCheck() {
  var formSelection = document.querySelector('input[name="formInput"]:checked');
  try {
    if (formSelection === null) throw "Please make a selection";
    return true;
  } catch (err) {
    currentMessage = err;
    meditationMessage.innerHTML = `<p id="message" class="errorMessage">${currentMessage}</p>`;
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
