var ButtonCounter = 0;
var TextBoxElement;
var DocumentButton;

function SetupDOMElements() {
  TextBoxElement = document.getElementById("txtButtonContextJs");
  TextBoxElement.disabled = true;
}

//Add buttons to array
function AddNewButtonJs() {
  var pre = document.createElement("pre");
  document.getElementsByClassName("ButtonsAdded")[0].appendChild(pre);

  var name = ["Button", "Delete", "Edit"];
  for (var i = 0; i < name.length; i++) {
    btnAdded(`Name:Js - ${name[i]}. Id:${i}. Row:${ButtonCounter}.`);
  }
  ButtonCounter++;
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

  button.style.backgroundColor = "Blue";
  button.style.color = "White";
  button.style.height = "40px";

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

  var DocumentButton = document.querySelectorAll(
    `[id*='Name:Js'][id*='Row:${row}.']`
  );
  DocumentButton.forEach((element) => {
    element.remove();
  });
}

function EditButtonClicked(row) {
  TextBoxElement.style.display = "block";
  var getButton = `Name:Js - Button. Id:0. Row:${row}.`;
  DocumentButton = document.getElementById(getButton);
  console.log(TextBoxElement);
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

document.addEventListener("DOMContentLoaded", function () {
  var TextBoxElement = document.getElementById("txtButtonContextJs");
  TextBoxElement.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      TextboxValueChanged();
    }
  });
});
