"use strict";
// Criteria #3******************************************************************************************
//Get Breed information from LocalStorage and render in a table
const submitBreedBtn = document.getElementById("submit-btn");

renderBreed(breedArr);

//Creat a new Breed when Click on "Submit"
submitBreedBtn.addEventListener("click", function () {
  //Get Informations from Input Form
  const breedData = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  //Validata input data & render data to table
  const validate = validateData(breedData);
  if (validate) {
    breedArr.push(breedData);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    clearInput();
    renderBreed(JSON.parse(getFromStorage("breedArr")));
  }
});

//APPLICABLE FUNCTIONS******************************************************************************************
//Validate function
function validateData(breedData) {
  for (let i = 0; i < breedArr.length; i++) {
    if (breedData.breed === breedArr[i].breed) {
      alert("This breed is already in system! Please input new one");
      clearInput();
      return false;
    }
  }
  if (!breedData.breed) {
    alert("Please input for Breed");
    return false;
  } else if (breedData.type === "Select Type") {
    alert("Please select Type!");
    return false;
  } else {
    return true;
  }
}

//Refresh input Form function
function clearInput() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

//Display breed list fucntion
function renderBreed(petArr) {
  //Delete all information in render table
  tableBodyEl.innerHTML = "";
  if (petArr === null) return false;

  //Create a new row for a breed
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${i + 1}</th>
      <td>${petArr[i].breed}</td>   
      <td>${petArr[i].type}</td>
    <td>
    <button class="btn btn-danger" onclick="deleteBreed('${
      petArr[i].breed
    }')">Delete</button>
  </td>
      `;
    tableBodyEl.appendChild(row);
  }
}

// Delete a Breed function
function deleteBreed(breed) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        renderBreed(breedArr);
        saveToStorage("breedArr", JSON.stringify(breedArr));
      }
    }
  }
}
