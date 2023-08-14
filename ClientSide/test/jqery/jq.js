var ButtonCounter = 0;
var TextBoxElement;
var DocumentButton;

$(document).ready(function () {
  SetupDOMElements();

  $("#btnAddNewButtonJq").click(function () {
    AddNewButtonJq();
  });

  // Add buttons to array
  function AddNewButtonJq() {
    var pre = $("<pre>");
    $(".ButtonsAdded").append(pre);

    var name = ["Button", "Delete", "Edit"];
    for (var i = 0; i < name.length; i++) {
      btnAdded(`Name:${name[i]}. Id:${i}. Row:${ButtonCounter}.`);
    }
    ButtonCounter++;
  }

  // Create button
  function btnAdded(Name) {
    var partsName = Name.split(".");
    var extractedName = partsName[0].split(":")[1];

    var button = $("<input>");
    button.attr("type", "button");
    button.attr("ID", Name);
    button.attr("value", extractedName);

    button.css({
      backgroundColor: "Blue",
      color: "White",
      height: "40px",
    });

    button.click(function () {
      btnClicked(Name);
    });

    $(".ButtonsAdded").append(button);
  }

  // Button clicked
  function btnClicked(Name) {
    var partsId = Name.split(".");
    var extractedId = partsId[1].split(":")[1];

    var partsRow = Name.split(".");
    var extractedRow = partsRow[2].split(":")[1];

    if (extractedId == 1) {
      DeleteButtonClicked(extractedRow);
    } else if (extractedId == 2) {
      EditButtonClicked(extractedRow);
    }
  }

  function AddedButtonClicked(ButtonCounter) {
    DocumentButton = $("#btn" + ButtonCounter.toString());
    TextBoxElement.val(DocumentButton.val());
  }

  function DeleteButtonClicked(row) {
    var DocumentButton = $('[id*="Row:' + row + '."]');
    DocumentButton.each(function () {
      $(this).remove();
    });
  }

  function EditButtonClicked(row) {
    var getButton = `Name:Button. Id:0. Row:${row}.`;
    DocumentButton = $("#" + getButton);
    TextBoxElement.val(DocumentButton.val());
    TextBoxElement.prop("disabled", false);
  }

  function TextboxValueChanged() {
    DocumentButton.val(TextBoxElement.val());
    TextBoxElement.prop("disabled", true);
  }

  var TextBoxElement = $("#txtButtonContext");
  TextBoxElement.on("keyup", function (event) {
    if (event.key === "Enter") {
      TextboxValueChanged();
    }
  });
});
