"use strict";
//Lưu dữ liệu Pet dưới LocalStorage
function savePetDataToStorage() {
  localStorage.setItem("petArr_ls", JSON.stringify(petArr));
}
//Lưu dữ liệu Breed Pet dưới LocalStorage
function saveBreedDataToStorage() {
  localStorage.setItem("breedArr_ls", JSON.stringify(breedArr));
}
//lấy dữ liệu Pet từ LocalStorage
function getPetDataFromStorage() {
  petArr = JSON.parse(localStorage.getItem("petArr_ls"));
}
//Lấy dữ liệu Breed Pet từ LocalStorage
function getBreedDataFromStorage() {
  breedArr = JSON.parse(localStorage.getItem("breedArr_ls"));
}
