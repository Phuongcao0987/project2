"use strict";

renderTable(petArr);

//Criteria #4 **********************************************************************************************
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

//From Assignment 01****************************************************************************************
//1. Creat Event when Click on "Submit"
submitBtn.addEventListener("click", function () {
  //2. Get Informations from Input Form
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
    // bmi: "?",
  };

  // 3, 4. Validata input data & render data to table
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", JSON.stringify(petArr));
    clearInput();
    renderTable(JSON.parse(getFromStorage("petArr")));
  }
});

//Validata input data
function validateData(data) {
  //check if ID is already existed
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      return false;
    }
  }
  //Check if ID has been inputted
  if (!data.id) {
    alert("Please input for ID");
    return false;
  }
  //Check if Name has been inputted
  else if (!data.name) {
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

// 5. Display Pet's list
function renderTable(petArr) {
  //Delete all information in render table
  tableBodyEl.innerHTML = "";
  if (petArr === null) return false;

  //Create a new row for a pet
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
    <button class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
  </td>
      `;
    tableBodyEl.appendChild(row);
  }
}

// 7. Delete a Pet
function deletePet(petId) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        renderTable(petArr);
        saveToStorage("petArr", JSON.stringify(petArr));
      }
    }
  }
}

// 8. Display Healthy Pets
let healthyCheck = true;

showHealthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    let healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTable(healthyPetArr);
    showHealthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    showHealthyBtn.textContent = "Show Healthy Pet";
    renderTable(petArr);
    healthyCheck = true;
  }
});

// 9. BMI Calculation
// calculateBMIBtn.addEventListener("click", function () {
//   for (let i = 0; i < petArr.length; i++) {
//     petArr[i].bmi =
//       petArr[i].type === "Dog"
//         ? ((petArr[i].weight * 703) / petArr[i].long ** 2).toFixed(2)
//         : ((petArr[i].weight * 886) / petArr[i].long ** 2).toFixed(2);
//   }
//   saveToStorage("petArr", JSON.stringify(petArr));
//   renderTable(JSON.parse(getFromStorage("petArr")));
// });
