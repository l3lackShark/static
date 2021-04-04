function createNewTitleDiv(title) {
  var titleDiv = document.createElement("div");
  titleDiv.className = "title";
  titleDiv.style = "transform: translateY(-100px)";

  var titlep = document.createElement("p");
  titlep.innerText = title;
  titlep.id = "titlep";

  titleDiv.appendChild(titlep);

  return titleDiv;
}
