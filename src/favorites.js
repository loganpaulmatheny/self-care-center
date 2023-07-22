window.addEventListener("load", function () {
  console.log("getting here");
  var parseJson = JSON.parse(localStorage.getItem("favorites"));
  console.log(parseJson);
});
