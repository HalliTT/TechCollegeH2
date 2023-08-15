$(document).ready(function () {
  var buttonCounter = 0;
  var textBoxElement;
  var documentButton;

  SetupDOMElements();

  function SetupDOMElements() {
    textBoxElement = $("#txtButtonContextJq");

    $("#btnAddNewButtonJq").click(function () {
      AddNewButtonJq();
    });

    textBoxElement.on("keyup", function (event) {
      if (event.key === "Enter") {
        TextboxValueChanged();
      }
    });

    $("#txtButtonContextJq").on("blur", function () {
      TextboxValueChanged();
    });
  }

  function AddNewButtonJq() {
    var pre = $("<pre>");
    $(".ButtonsAdded").append(pre);

    var name = ["Button", "Delete", "Edit"];
    for (var i = 0; i < name.length; i++) {
      btnAdded(`Name:Jq - ${name[i]}. Id:${i}. Row:${buttonCounter}.`);
    }
    buttonCounter++;
  }

  function btnAdded(name) {
    var extractedName = name.split(".")[0].split(":")[1];

    var button = $("<input>", {
      type: "button",
      id: name,
      value: extractedName,
      css: {
        backgroundColor: "Blue",
        color: "White",
        height: "40px",
      },
    });

    button.click(function () {
      btnClicked(name);
    });

    $(".ButtonsAdded").append(button);
  }

  function btnClicked(name) {
    var extractedId = name.split(".")[1].split(":")[1];
    var extractedRow = name.split(".")[2].split(":")[1];

    if (extractedId == 1) {
      deleteButtonClicked(extractedRow);
    } else if (extractedId == 2) {
      editButtonClicked(extractedRow);
    }
  }

  function deleteButtonClicked(row) {
    textBoxElement.prop("disabled", true).val("").hide();

    $('[id*="Name:Jq"][id*="Row:' + row + '."]').each(function () {
      $(this).remove();
    });
  }

  function editButtonClicked(row) {
    var getButton = `Name:Jq - Button. Id:0. Row:${row}.`;
    var escapedId = getButton.replace(/(:|\.|\s)/g, "\\$1");
    documentButton = $(`#${escapedId}`);
    textBoxElement
      .prop("disabled", false)
      .val(documentButton.val())
      .show()
      .focus();
  }

  function TextboxValueChanged() {
    documentButton.val(textBoxElement.val());
    textBoxElement.prop("disabled", true).val("").hide();
  }
});
