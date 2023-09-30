"use strict";
const findBtn = document.getElementById("find-btn");

//Display all pets information
renderTableSearch(petArr);

//Creat Event when Click on "Find" button
findBtn.addEventListener("click", function () {
  let petSearchArr = petArr;
  //Filter Data with ID input value
  if (idInput.value) {
    petSearchArr = petSearchArr.filter((pet) => pet.id.includes(idInput.value));
  }
  //Filter Data with name input value
  if (nameInput.value) {
    petSearchArr = petSearchArr.filter((pet) =>
      pet.name.includes(nameInput.value)
    );
  }
  //Filter Data with Type input value
  if (typeInput.value !== "Select Type") {
    petSearchArr = petSearchArr.filter((pet) =>
      pet.type.includes(typeInput.value)
    );
  }
  //Filter Data with Breed input value
  if (breedInput.value !== "Select Breed") {
    petSearchArr = petSearchArr.filter((pet) =>
      pet.breed.includes(breedInput.value)
    );
  }
  //Filter Data with Check input values
  if (vaccinatedInput.checked === true) {
    petSearchArr = petSearchArr.filter((pet) => pet.vaccinated === true);
  }
  if (dewormedInput.checked === true) {
    petSearchArr = petSearchArr.filter((pet) => pet.dewormed === true);
  }
  if (sterilizedInput.checked === true) {
    petSearchArr = petSearchArr.filter((pet) => pet.sterilized === true);
  }

  //Display find Results
  renderTableSearch(petSearchArr);
});

//Show all breed list, no matter cat or dog;
breedOptionSearch();

//APPLICABLE FUNCTIONS******************************************************************************************

//Display pet table
function renderTableSearch(petArr) {
  //Delete all information in render table
  tableBodyEl.innerHTML = "";
  if (petArr === null) return false;

  //Create Pet Table
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
      `;
    tableBodyEl.appendChild(row);
  }
}

//Function: Show all breed list, no matter cat or dog;
function breedOptionSearch() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    console.log(`${breedItem.breed}`);
    breedInput.appendChild(option);
  });
}
