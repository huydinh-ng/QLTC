"use strict";

const sidebar = document.getElementById("sidebar");
const sidebarTitle = document.getElementById("sidebar-title");
const import_btn = document.getElementById("import-btn");
const export_btn = document.getElementById("export-btn");

// Bổ sung Animation cho Sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
// khai báo và lưu dữ liệu dưới LocalStorage
let petArr = JSON.parse(localStorage.getItem("petArr_ls")) ?? [];
let breedArr = JSON.parse(localStorage.getItem("breedArr_ls")) ?? [];
// Doc data tu File source
let text;
async function readText(event) {
  const file = event.target.files.item(0);
  text = await file.text();
}
// Import pet data
import_btn.addEventListener("click", function () {
  petArr = JSON.parse(text);
  localStorage.setItem("petArr_ls", JSON.stringify(petArr));
});
// Export pet data
export_btn.addEventListener("click", function saveToFile() {
  var blob = new Blob([`${JSON.stringify(petArr)}`], {
    type: "application/json;charset=utf-8,",
  });
  saveAs(blob, "myPetArr.json");
});
