"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const showHealthyBtn = document.getElementById("healthy-btn");
const calculateBMIBtn = document.getElementById("calculate-bmi-btn");
const tableBodyEl = document.getElementById("tbody");

// Criteria #1*******************************************************************************************
//Toggle class active when click on navbar
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

// Criteria #2 ******************************************************************************************
//Get data from Storage && Save data to Storage
//Set sample data for first time access page, so there's no need to input form => save time
//Sample data
const sample1 = {
  id: "P001",
  name: "Vàng",
  age: 3,
  type: "Dog",
  weight: 5,
  long: 50,
  breed: "Chó Phú Quốc",
  color: "#d99a2e",
  vaccinated: true,
  dewormed: true,
  sterilized: false,
  date:
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear(),
  bmi: "?",
};

const sample2 = {
  id: "P002",
  name: "Lu",
  age: 5,
  type: "Dog",
  weight: 5,
  long: 40,
  breed: "Chó Bắc Kinh",
  color: "#222",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date:
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear(),
  bmi: "?",
};

const sample3 = {
  id: "P003",
  name: "Chuối",
  age: 2,
  type: "Cat",
  weight: 3,
  long: 30,
  breed: "Mèo mướp",
  color: "#ffb300",
  vaccinated: false,
  dewormed: false,
  sterilized: true,
  date:
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear(),
  bmi: "?",
};

const sample4 = {
  id: "P004",
  name: "Happy",
  age: 8,
  type: "Cat",
  weight: 5,
  long: 40,
  breed: "Tabby",
  color: "#111",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date:
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear(),
  bmi: "?",
};

const breedSample = [
  {
    type: sample1.type,
    breed: sample1.breed,
  },
  {
    type: sample2.type,
    breed: sample2.breed,
  },
  {
    type: sample3.type,
    breed: sample3.breed,
  },
  {
    type: sample4.type,
    breed: sample4.breed,
  },
];
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", JSON.stringify([sample1, sample2, sample3, sample4]));
}
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", JSON.stringify(breedSample));
}
const petArr = JSON.parse(getFromStorage("petArr"));
const breedArr = JSON.parse(getFromStorage("breedArr"));

//Function Creation for Save/Get data to/from Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

//Mutual function for Edit Tab and Home Tab
// Refresh input Form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  colorInput.number = "#000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
