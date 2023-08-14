var ButtonCounter = 0;
var TextBoxElement;
var DocumentButton;

function SetupDOMElements() {
  TextBoxElement = document.getElementById("txtButtonContext");
  TextBoxElement.disabled = true;
}

//Add buttons to array
function AddNewButtonJs() {
  var pre = document.createElement("pre");
  document.getElementsByClassName("ButtonsAdded")[0].appendChild(pre);

  var name = ["Button", "Delete", "Edit"];
  for (var i = 0; i < name.length; i++) {
    btnAdded(`Name:${name[i]}. Id:${i}. Row:${ButtonCounter}.`);
  }
  ButtonCounter++;
}

//Create button
function btnAdded(Name) {
  //Find Name:
  var partsName = Name.split(".");
  var extractedName = partsName[0].split(":")[1];

  var button = document.createElement("input");
  button.setAttribute("type", "button");
  button.setAttribute("ID", Name);
  button.setAttribute("value", extractedName);

  //onClick
  button.setAttribute("onclick", "btnClicked('" + Name + "')");

  button.style.backgroundColor = "Blue";
  button.style.color = "White";
  button.style.height = "40px";

  document.getElementsByClassName("ButtonsAdded")[0].appendChild(button);
}

//Button clicked
function btnClicked(Name) {
  //Find Id:
  var partsId = Name.split(".");
  var extractedId = partsId[1].split(":")[1];

  //Find Row:
  var partsRow = Name.split(".");
  var extractedRow = partsRow[2].split(":")[1];

  if (extractedId == 1) {
    DeleteButtonClicked(extractedRow);
  } else if (extractedId == 2) {
    EditButtonClicked(extractedRow);
  }
}

function AddedButtonClicked(ButtonCounter) {
  DocumentButton = document.getElementById("btn" + ButtonCounter.toString());
  TextBoxElement.value = DocumentButton.value;
}

function DeleteButtonClicked(row) {
  var DocumentButton = document.querySelectorAll(`[id*='Row:${row}.']`);
  DocumentButton.forEach((element) => {
    element.remove();
  });
}

function EditButtonClicked(row) {
  var getButton = `Name:Button. Id:0. Row:${row}.`;
  DocumentButton = document.getElementById(getButton);
  TextBoxElement.value = DocumentButton.value;
  TextBoxElement.disabled = false;
}

function TextboxValueChanged() {
  DocumentButton.value = TextBoxElement.value;
  TextBoxElement.disabled = true;
  TextBoxElement.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  var TextBoxElement = document.getElementById("txtButtonContext"); // Replace with the actual ID of your text box element
  TextBoxElement.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      TextboxValueChanged();
    }
  });
});
