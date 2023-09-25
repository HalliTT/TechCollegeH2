const uri = "https://cityinfo.buchwaldshave34.dk/api/City";
const Languri = "https://cityinfo.buchwaldshave34.dk/api/CityLanguage";
const pointUri = "https://cityinfo.buchwaldshave34.dk​/api/PointOfInterest";
let todos = [];
let ThisUserName = "UserHaraldur";

async function fetchData() {
  countries = await getCountry();
  languages = await getLanguage();
  point = await getPoint();
  populateSelects();
}

//get country and language data once
fetchData();

//----------------------POPULATE SELECT----------------------//

function populateSelects() {
  const addCountryTextbox = document.getElementById("add-country");
  const editCountryTextbox = document.getElementById("edit-country");
  const addLangTextbox = document.getElementById("add-lang");
  const editLangTextbox = document.getElementById("edit-lang");

  //Clear Country
  editCountryTextbox.value = "";
  addCountryTextbox.value = "";
  // Add options to the "add-country" and "edit-country" selects
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.text = country.countryName;
    option.value = country.countryID;
    addCountryTextbox.add(option);
    editCountryTextbox.add(option.cloneNode(true));
  });

  //Clear Lang
  editLangTextbox.value = "";
  addLangTextbox.value = "";
  // Add options to the "add-lang" and "edit-lang" selects
  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.text = lang.languageName;
    option.value = lang.languageId;
    addLangTextbox.add(option);
    editLangTextbox.add(option.cloneNode(true));
  });
}

//----------------------GET----------------------//

function getItems() {
  fetch(uri + "?UserName=" + ThisUserName)
    .then((response) => response.json())
    .then((data) => _displayItems(data))
    .catch((error) => console.error("Unable to get items.", error));
}

async function getCountry() {
  let respsonse = await fetch(
    "https://cityinfo.buchwaldshave34.dk/api/Country" +
      "?UserName=" +
      ThisUserName
  );
  let data = await respsonse.json();
  return data;
}

async function getLanguage() {
  let respsonse = await fetch(
    "https://cityinfo.buchwaldshave34.dk/api/Language" +
      "?UserName=" +
      ThisUserName
  );
  let data = await respsonse.json();
  return data;
}

async function getPoint() {
  let response = await fetch(
    "https://cityinfo.buchwaldshave34.dk/api/PointOfInterest" +
      "?UserName=" +
      ThisUserName
  );
  let data = await response.json();
  return data;
}

async function deleteCityLanguageOnId(id, allLangIdSelected) {
  let response = await fetch(
    "https://cityinfo.buchwaldshave34.dk/api/CityLanguage/" +
      id +
      "," +
      "?CityId=" +
      id +
      "&LanguageId=" +
      allLangIdSelected +
      "&UserName=" +
      ThisUserName,
    {
      method: "DELETE",
    }
  );
  if (response.status === 500) {
    // The language doesn't exist, handle this case as needed
    return {
      success: false,
      message: `Language ${allLangIdSelected} not found.`,
    };
  } else if (response.status === 204) {
    // Successfully deleted the CityLanguage entry, return a success message or data
    return {
      success: true,
      message: `Language ${allLangIdSelected} deleted successfully.`,
    };
  } else if (response.status === 404) {
    // The language doesn't exist, handle this case as needed
    return {
      success: false,
      message: `Language ${allLangIdSelected} not found.`,
    };
  } else {
    // Handle other response statuses as needed
    throw new Error(
      `Failed to delete language ${allLangIdSelected}. Status: ${response.status}`
    );
  }
}

//----------------------ADD----------------------//

//Add city
function addItem() {
  const addNameTextbox = document.getElementById("add-name");
  const addDescTextbox = document.getElementById("add-desc");
  const addCountryTextbox = document.getElementById("add-country");

  const item = {
    name: addNameTextbox.value.trim(),
    description: addDescTextbox.value.trim(),
    countryID: addCountryTextbox.value,
  };

  fetch(uri + "?UserName=" + ThisUserName, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      addLanguage(data);
      addPoint(data);
    })
    .then(() => {
      getItems();
      addNameTextbox.value = "";
      addDescTextbox.value = "";
    })
    .catch((error) => console.error("Unable to add item.", error));
}

//Add lang
async function addLanguage(response) {
  response = await response;

  const addLangTextbox = document.getElementById("add-lang");

  const allLangIdSelected = Array.from(addLangTextbox.selectedOptions).map(
    (option) => option.value
  );

  //Foreach selected lang
  allLangIdSelected.forEach((lang) => {
    const langItem = {
      cityId: response,
      languageId: lang,
    };

    fetch(Languri + "?UserName=" + ThisUserName, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(langItem),
    })
      .then((response) => response.json())
      .then(() => {
        getItems();
      })
      .catch((error) => console.error("Unable to add item.", error));
  });
}

//Add point
async function addPoint(response) {
  response = await response;

  const addPointTextboxName = document.getElementById("add-point-name");
  const addPointTextboxDesc = document.getElementById("add-point-desc");

  const item = {
    name: addPointTextboxName.value.trim(),
    description: addPointTextboxDesc.value.trim(),
    cityId: response,
  };

  fetch(pointUri + "?UserName=" + ThisUserName, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((response) => {
      return response.json();
    })
    .then(() => {
      getItems();
      addPointTextboxName.value = "";
      addPointTextboxDesc.value = "";
    })
    .catch((error) => console.error("Unable to add item.", error));
}

//----------------------DELETE----------------------//

//Delete
function deleteItem(id) {
  fetch(`${uri}/${id}` + "?UserName=" + ThisUserName, {
    method: "DELETE",
  })
    .then(() => getItems())
    .catch((error) => console.error("Unable to delete item.", error));
}

//----------------------EDIT----------------------//

//Edit Disply
function displayEditForm(id) {
  const item = todos.find((item) => item.cityId === id);

  document.getElementById("edit").hidden = false;
  document.getElementById("edit-name").value = item.name;
  document.getElementById("edit-desc").value = item.description;

  // edit-country
  const addCountryTextbox = document.getElementById("edit-country");
  const option = Array.from(addCountryTextbox);
  const optionToSelect = option.find((items) => items.value == item.countryID);
  addCountryTextbox.value = optionToSelect.value;

  // edit-lang
  const addLangTextbox = document.getElementById("edit-lang");
  const optionLang = Array.from(addLangTextbox);
  // Extract the languageIds from item.cityLanguages
  const cityLanguageIds = item.cityLanguages.map(
    (cityLang) => cityLang.languageId
  );
  // Filter optionLang to select <option> elements with matching value attributes
  const selectedOptions = [...optionLang].filter((option) => {
    const optionValue = parseInt(option.value, 10);
    return cityLanguageIds.includes(optionValue);
  });
  // Set the selected attribute on the matching <option> elements
  Array.from(addLangTextbox.options).forEach((option) => {
    if (selectedOptions.includes(option)) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  });

  // edit-point
  const addPointTextbox = document.getElementById("edit-point-name");
  const addPointTextboxDesc = document.getElementById("edit-point-desc");
  if (item?.pointsOfInterest && item.pointsOfInterest.length > 0) {
    addPointTextbox.value = item.pointsOfInterest[0].name;
    addPointTextboxDesc.value = item.pointsOfInterest[0].description;
  }

  // Set the value attribute on the hidden <input> element
  document
    .getElementById("edit-id")
    .setAttribute(
      "value",
      `${id},${optionToSelect.value},${item.pointsOfInterest[0].pointOfInterestId}`
    );
}

//Edit
function updateItem() {
  const itemId = document.getElementById("edit-id").value;
  const newItemId = itemId.split(",")[0];
  const newContId = itemId.split(",")[1];
  const newPointId = itemId.split(",")[2];

  const item = {
    name: document.getElementById("edit-name").value.trim(),
    description: document.getElementById("edit-desc").value,
    countryID: parseInt(newContId, 10),
    cityId: parseInt(newItemId, 10),
  };

  fetch(`${uri}/${newItemId}` + "?UserName=" + ThisUserName, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(() => {
      updateLanguage(newItemId);
      updatePoint(newItemId, newPointId);
    })
    .then(() => getItems())
    .catch((error) => console.error("Unable to update item.", error));

  closeInput();

  return false;
}

//update lang
async function updateLanguage(id) {
  const addLangTextbox = document.getElementById("edit-lang");

  const allLangIdSelected = Array.from(addLangTextbox.selectedOptions).map(
    (option) => option.value
  );

  const allOptions = addLangTextbox.options;
  const allLangIdNotSelected = [];
  for (let i = 0; i < allOptions.length; i++) {
    const option = allOptions[i];
    if (!option.selected) {
      allLangIdNotSelected.push(option.value);
    }
  }

  //Delete all lang not selected
  const languagePromises = allLangIdNotSelected.map(async (lang) => {
    return await deleteCityLanguageOnId(id, lang);
  });
  await Promise.all(languagePromises);

  //Add all lang selected
  allLangIdSelected.map(async (lang) => {
    const langItem = {
      cityId: id,
      languageId: lang,
    };

    return await fetch(Languri + "?UserName=" + ThisUserName, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(langItem),
    })
      .then(() => getItems())
      .catch((error) => console.error("Unable to update item.", error));
  });
}

async function updatePoint(id, newPointId) {
  const item = {
    name: document.getElementById("edit-point-name").value.trim(),
    description: document.getElementById("edit-point-desc").value,
    cityId: parseInt(id, 10),
    pointOfInterestId: parseInt(newPointId, 10),
  };

  fetch(`${pointUri}/${newPointId}` + "?UserName=" + ThisUserName, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(() => getItems())
    .catch((error) => console.error("Unable to update item.", error));
}

//----------------------DISPLAY----------------------//

function closeInput() {
  document.getElementById("edit").hidden = "true";
}

function _displayCount(itemCount) {
  const name = itemCount === 1 ? "to-do" : "to-dos";

  document.getElementById("counter").innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById("todos");
  tBody.innerHTML = "";

  _displayCount(data.length);

  const button = document.createElement("button");

  data.forEach((item) => {
    //Edit
    let editButton = button.cloneNode(false);
    editButton.innerText = "Edit";
    editButton.setAttribute("onclick", `displayEditForm(${item.cityId})`);

    //Delete
    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", `deleteItem(${item.cityId})`);

    //Create row
    let tr = tBody.insertRow();

    //Name
    let td1 = tr.insertCell(0);
    let textName = document.createTextNode(item.name);
    td1.appendChild(textName);

    //Description
    let td2 = tr.insertCell(1);
    let textDesc = document.createTextNode(item.description);
    td2.appendChild(textDesc);

    //Country
    let td3 = tr.insertCell(2);
    let textCountryName = document.createTextNode(item.country.countryName);
    td3.appendChild(textCountryName);

    //Language
    let td4 = tr.insertCell(3);
    if (!item?.cityLanguages) {
      let textLangName = document.createTextNode("");
      td4.appendChild(textLangName);
    }
    if (item?.cityLanguages && item.cityLanguages.length > 0) {
      item.cityLanguages.forEach((lang) => {
        let textLangName = document.createTextNode(lang.languageName);
        td4.appendChild(textLangName);
        let br = document.createElement("br");
        td4.appendChild(br);
      });
    }
    td4.style.textAlign = "center";

    //Points
    let td5 = tr.insertCell(4);
    let td6 = tr.insertCell(5);
    if (!item?.pointsOfInterest) {
      let textPointName = document.createTextNode("");
      let textPointDesc = document.createTextNode("");
      td5.appendChild(textPointName);
      td6.appendChild(textPointDesc);
    }
    if (item?.pointsOfInterest && item.pointsOfInterest.length > 0) {
      let textPointName = document.createTextNode(
        item.pointsOfInterest[0].name
      );
      let textPointDesc = document.createTextNode(
        item.pointsOfInterest[0].description
      );
      td5.appendChild(textPointName);
      td6.appendChild(textPointDesc);
    }

    //Edit
    let tdEdit = tr.insertCell(6);
    tdEdit.appendChild(editButton);

    //Delete
    let tdDelete = tr.insertCell(7);
    tdDelete.appendChild(deleteButton);
  });

  todos = data;
}
