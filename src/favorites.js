var favoriteMessagesSection = document.querySelector(".liked-messages");

window.addEventListener("load", function () {
  displayFavoriteMessages();
});

function displayFavoriteMessages() {
  var parseFavorites = JSON.parse(localStorage.getItem("favorites"));
  var favoritesString = "";
  for (let i = 0; i < parseFavorites.length; i++) {
    favoritesString += `<p class="message"> ${parseFavorites[i].message}</p>`;
  }
  favoriteMessagesSection.innerHTML = favoritesString;
}
