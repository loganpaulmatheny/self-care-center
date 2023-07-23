var favoriteMessagesSection = document.querySelector(".liked-messages");

var homeButton = document.querySelector(".home-button");

window.addEventListener("load", function () {
  displayFavoriteMessages();
});

homeButton.addEventListener("click", navHomePage);

favoriteMessagesSection.addEventListener("click", function (event) {
  deleteFav(event);
  displayFavoriteMessages();
});

function displayFavoriteMessages() {
  var parseFavorites = JSON.parse(localStorage.getItem("favorites"));
  var favoritesString = "";
  for (let i = 0; i < parseFavorites.length; i++) {
    favoritesString += `<p class="message"> ${parseFavorites[i].message}</p> \
    <button class="button" id="${parseFavorites[i].id}">Delete</button>`;
  }
  favoriteMessagesSection.innerHTML = favoritesString;
}

function navHomePage() {
  location.href = "../index.html";
}

function deleteFav(event) {
  // x create event target that prints id on click
  // x parse favorites
  // x loop through to get index that matches button click
  // x splice the array of the item print array to console
  // reset the local storage
  // run display favorites
  var deleteItem = event.target.id;
  console.log(deleteItem);
  var parseFavorites = JSON.parse(localStorage.getItem("favorites"));
  console.log(parseFavorites);
  for (let i = 0; i < parseFavorites.length; i++) {
    if (deleteItem === parseFavorites[i].id.toString()) {
      var indexDelete = i;
    }
  }
  parseFavorites.splice(indexDelete, 1);
  console.log(parseFavorites);
  localStorage.setItem("favorites", JSON.stringify(parseFavorites));
}
