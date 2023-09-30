"use strict";

const editBtn = document.getElementById("submit-btn");
const editContent = document.getElementById("container-form");

renderTable(JSON.parse(getFromStorage("petArr")));

// Criteria #5******************************************************************************************
// Display Pet's list
function renderTable(petArr) {
  //Delete all information in render table
  tableBodyEl.innerHTML = "";
  if (petArr === null) return false;

  //Display pet's information; Delete Button -> Edit Button
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${petArr[i].id}</th>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight}kg</td>
      <td>${petArr[i].long}cm</td>
      <td>${petArr[i].breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${
        petArr[i].color
      }"></i></td>
      <td><i class="bi ${
        petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      } "></i></td>
      <td><i class="bi ${
        petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      } "></i></td>
      <td><i class="bi ${
        petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      } "></i></td>
      <td>${petArr[i].date}</td>
    <td>
    <button class="btn btn-warning" onclick="editPet('${
      petArr[i].id
    }')">Edit</button>
  </td>
      `;
    tableBodyEl.appendChild(row);
  }
}

//Creat Event when Click on "Submit"
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    long: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date:
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear(),
    bmi: "?",
  };
  const validate = validateData(data);
  if (validate) {
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        data.date = petArr[i].date;
        petArr[i] = data;
        saveToStorage("petArr", JSON.stringify(petArr));
        clearInput();
        renderTable(JSON.parse(getFromStorage("petArr")));
        editContent.classList.add("hide");
      }
    }
  }
});

//Validata input data
function validateData(data) {
  //Check if Name has been inputted
  if (!data.name) {
    alert("Please input for Name");
    return false;
  }
  //Check if Age is valid
  else if (!(data.age >= 1 && data.age <= 15)) {
    alert("Age must be between 1 and 15!");
    return false;
  }
  //Check if Type is valid
  else if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  //Check if Weight is valid
  else if (!(data.weight >= 1 && data.weight <= 15)) {
    alert("Weight must be between 1 and 15!");
    return false;
  }
  //Check if Length is valid
  else if (!(data.long >= 1 && data.long <= 100)) {
    alert("Length must be between 1 and 100!");
    return false;
  }
  //Check if Breed is valid
  else if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }
  return true;
}

function editPet(petId) {
  for (let i = 0; i < petArr.length; i++) {
    if (petId === petArr[i].id) {
      editContent.classList.remove("hide");
      const choosen = petArr[i];
      idInput.value = petId;
      nameInput.value = choosen.name;
      ageInput.value = choosen.age;
      typeInput.value = choosen.type;
      weightInput.value = choosen.weight;
      lengthInput.value = choosen.long;
      colorInput.value = choosen.color;
      vaccinatedInput.checked = choosen.vaccinated;
      dewormedInput.checked = choosen.dewormed;
      sterilizedInput.checked = choosen.sterilized;
      breedOption();
      typeInput.addEventListener("click", breedOption);
    }
  }
}

//Criteria #4 *********************************************************************************************
//Show Breed corresponding to the Pet's Type
typeInput.addEventListener("click", breedOption);
function breedOption() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  if (typeInput.value === "Dog") {
    const breedDog = breedArr.filter((breedItem) => breedItem.type == "Dog");
    breedDog.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      console.log(`${breedItem.breed}`);
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    const breedCat = breedArr.filter((breedItem) => breedItem.type == "Cat");
    breedCat.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      console.log(`${breedItem.breed}`);
      breedInput.appendChild(option);
    });
  }
}
