var ButtonCounter = 0;
var TextBoxElement;
var DocumentButton;

function SetupDOMElements() {
  TextBoxElement = document.getElementById("txtButtonContextJs");
  TextBoxElement.disabled = true;
}

//paginaton
var pagination = [];
var itemsPerPage = 3;
var currentPage = 1;

//Add buttons to array
function AddNewButtonJs() {
  var pre = document.createElement("pre");
  document.getElementsByClassName("ButtonsAdded")[0].appendChild(pre);

  var label = document.createElement("label");
  document.getElementsByClassName("ButtonsAdded")[0].appendChild(label);

  // var name = ["Button", "Delete", "Edit"];
  // for (var i = 0; i < name.length; i++) {
  //   btnAdded(`Name:Js - ${name[i]}. Id:${i}. Row:${ButtonCounter}.`);
  // }
  label.innerHTML = "Row: " + [ButtonCounter + 1];
  label.setAttribute("Id", `Row:${ButtonCounter + 1}`);
  ButtonCounter++;

  //Pagination test
  pagination.push(ButtonCounter);
  UpdatePagination();
  DisplayButtonForPage(currentPage);
  console.log(pagination);
}

function btnAdded(Name) {
  //Find Name:
  var extractedName = Name.split(".")[0].split(":")[1];

  var button = document.createElement("input");
  button.setAttribute("type", "button");
  button.setAttribute("ID", Name);
  button.setAttribute("value", extractedName);

  //onClick
  button.setAttribute("onclick", "btnClicked('" + Name + "')");

  button.style.background = "hsl(190deg, 30%, 15%)";
  button.style.border = "solid 2px black";
  button.style.padding = ".375em 1.125em";
  button.style.fontSize = "2rem";
  button.style.color = "hsl(190deg, 10%, 95%)";
  button.style.margin = "0 10px 10px 10px";
  button.style.boxShadow = "0 0px 0px hsla(190deg, 15%, 5%, .2)";
  button.style.transform = "translateY(0)";
  button.style.borderTopLeftRadius = "0px";
  button.style.borderTopRightRadius = "0px";
  button.style.borderBottomLeftRadius = "0px";
  button.style.borderBottomRightRadius = "0px";

  button.style.transition = `
    border-top-left-radius var(--dur) var(--delay) ease-out,
    border-top-right-radius var(--dur) calc(var(--delay) * 2) ease-out,
    border-bottom-right-radius var(--dur) calc(var(--delay) * 3) ease-out,
    border-bottom-left-radius var(--dur) calc(var(--delay) * 4) ease-out,
    box-shadow calc(var(--dur) * 4) ease-out,
    transform calc(var(--dur) * 4) ease-out,
    background calc(var(--dur) * 4) steps(4, jump-end)
`;

  button.addEventListener("mouseover", function () {
    button.style.boxShadow = "0 4px 8px hsla(190deg, 15%, 5%, .2)";
    button.style.transform = "translateY(-4px)";
    button.style.background = "hsl(230deg, 50%, 45%)";
    button.style.borderTopLeftRadius = "var(--radius)";
    button.style.borderTopRightRadius = "var(--radius)";
    button.style.borderBottomLeftRadius = "var(--radius)";
    button.style.borderBottomRightRadius = "var(--radius)";
  });

  button.addEventListener("mouseout", function () {
    button.style.boxShadow = "0 0px 0px hsla(190deg, 15%, 5%, .2)";
    button.style.transform = "translateY(0)";
    button.style.background = "hsl(190deg, 30%, 15%)";
    button.style.borderTopLeftRadius = "0px";
    button.style.borderTopRightRadius = "0px";
    button.style.borderBottomLeftRadius = "0px";
    button.style.borderBottomRightRadius = "0px";
  });

  document.getElementsByClassName("ButtonsAdded")[0].appendChild(button);
}

function btnClicked(Name) {
  //Find Id:
  var extractedId = Name.split(".")[1].split(":")[1];
  //Find Row:
  var extractedRow = Name.split(".")[2].split(":")[1];

  if (extractedId == 1) {
    DeleteButtonClicked(extractedRow);
  } else if (extractedId == 2) {
    EditButtonClicked(extractedRow);
  }
}

function DeleteButtonClicked(row) {
  TextBoxElement.style.display = "none";
  TextBoxElement.value = "";
  TextBoxElement.disabled = true;

  //Remove from DOM
  var DocumentButton = document.querySelectorAll(
    `[id*='Name:Js'][id*='Row:${row}.']`
  );
  DocumentButton.forEach((element) => {
    element.remove();
  });

  //Need to remove the label as well
  let rowAsNumber = parseInt(row) + 1;
  var DocumentLabel = document.querySelectorAll(`[id='Row:${rowAsNumber}']`);
  DocumentLabel.forEach((element) => {
    element.remove();
  });

  //Remove from pagination
  var indexToDelete = pagination.indexOf(rowAsNumber);
  if (indexToDelete !== -1) {
    pagination.splice(indexToDelete, 1);
  }

  //Update pagination
  DisplayButtonForPage(currentPage);
  UpdatePagination();
}

function EditButtonClicked(row) {
  TextBoxElement.style.display = "block";
  var getButton = `Name:Js - Button. Id:0. Row:${row}.`;
  DocumentButton = document.getElementById(getButton);
  TextBoxElement.value = DocumentButton.value;
  TextBoxElement.disabled = false;
  TextBoxElement.focus();
}

function TextboxValueChanged() {
  DocumentButton.value = TextBoxElement.value;
  TextBoxElement.disabled = true;
  TextBoxElement.value = "";
  TextBoxElement.style.display = "none";
}

function UpdatePagination() {
  var paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";

  // Calculate total pages
  var totalPages = Math.ceil(pagination.length / itemsPerPage);

  // Add buttons for each page
  if (totalPages > 1) {
    for (var i = 1; i <= totalPages; i++) {
      var pageButton = document.createElement("button");

      pageButton.style.color = "#f3f3f3";
      pageButton.style.fontFamily ? "inherit" : "sans-serif";
      pageButton.style.fontSize = "16px";
      pageButton.style.fontWeight = "400";
      pageButton.style.verticalAlign = "middle";
      pageButton.style.borderRadius = "6px";
      pageButton.style.backgroundColor = "#202020";
      pageButton.style.cursor = "pointer";
      pageButton.style.padding = "0 6px";

      pageButton.addEventListener("mouseover", function () {
        pageButton.style.boxShadow = "0 4px 8px hsla(190deg, 15%, 5%, .2)";
        pageButton.style.background = "lighten(#202020, 3%)";
      });

      // pageButton.addEventListener("mouseout", function () {
      //   button.style.boxShadow = "0 0px 0px hsla(190deg, 15%, 5%, .2)";
      //   button.style.transform = "translateY(0)";
      //   button.style.background = "hsl(190deg, 30%, 15%)";
      //   button.style.borderTopLeftRadius = "0px";
      //   button.style.borderTopRightRadius = "0px";
      //   button.style.borderBottomLeftRadius = "0px";
      //   button.style.borderBottomRightRadius = "0px";
      // });

      pageButton.textContent = i;
      pageButton.addEventListener("click", function (event) {
        currentPage = parseInt(event.target.textContent);
        DisplayButtonForPage(currentPage);
        UpdatePagination();
      });
      paginationContainer.appendChild(pageButton);
    }
  }
}

function DisplayButtonForPage(pageNumber) {
  // Calculate start and end index of buttons to display on current page
  var startIndex = (pageNumber - 1) * itemsPerPage;
  var endIndex = Math.min(startIndex + itemsPerPage, ButtonCounter);

  // Clear existing buttons
  var buttonsContainer = document.getElementsByClassName("ButtonsAdded")[0];
  buttonsContainer.innerHTML = "";

  // Add buttons for current page
  for (var i = startIndex; i < endIndex; i++) {
    if (pagination.includes(i + 1)) {
      var label = document.createElement("label");
      label.innerHTML = "Row: " + (i + 1);
      label.setAttribute("Id", `Row:${i + 1}`);
      buttonsContainer.appendChild(label);

      btnAdded(`Name:Js - Button. Id:0. Row:${i}.`);
      btnAdded(`Name:Js - Delete. Id:1. Row:${i}.`);
      btnAdded(`Name:Js - Edit. Id:2. Row:${i}.`);

      buttonsContainer.appendChild(document.createElement("br"));
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var TextBoxElement = document.getElementById("txtButtonContextJs");
  TextBoxElement.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      TextboxValueChanged();
    }
  });
});
