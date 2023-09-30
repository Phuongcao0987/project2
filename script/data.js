"use strict";
const btnImport = document.getElementById("import-btn");
const btnExport = document.getElementById("export-btn");
const fileImport = document.getElementById("input-file");
btnImport.addEventListener("click", function () {
  importFile();
  fileImport.value = "";
});
btnExport.addEventListener("click", function () {
  saveToFile();
});

function importFile() {
  //Check if import file is inputted, if true => import file
  if (!fileImport.value) alert("Please input file!");
  else {
    const file = fileImport.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      saveToStorage("petArr", JSON.parse(reader.result));
    });

    if (file) {
      reader.readAsText(file);
    }
  }
}

function saveToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });

  saveAs(blob, "petData.json");
}
